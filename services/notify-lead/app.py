"""Microserviço de notificação de leads — recebe webhook e envia email via SMTP."""

import os, json, smtplib, hmac, hashlib, logging, time as _time
from http.server import HTTPServer, BaseHTTPRequestHandler
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timezone, timedelta
from collections import defaultdict

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("notify-lead")

SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASS = os.environ.get("SMTP_PASS", "")
SMTP_FROM = os.environ.get("SMTP_FROM", SMTP_USER)
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@nookweb.com.br")
WEBHOOK_SECRET = os.environ.get("WEBHOOK_SECRET", "")

BRT = timezone(timedelta(hours=-3))

# Simple in-memory rate limit: max 5 emails per minute
_rate_bucket: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT = 5
RATE_WINDOW = 60

def is_rate_limited(ip: str) -> bool:
    now = _time.time()
    bucket = _rate_bucket[ip]
    _rate_bucket[ip] = [t for t in bucket if now - t < RATE_WINDOW]
    if len(_rate_bucket[ip]) >= RATE_LIMIT:
        return True
    _rate_bucket[ip].append(now)
    return False


def verify_signature(body: bytes, signature: str) -> bool:
    if not WEBHOOK_SECRET:
        return True
    expected = hmac.new(WEBHOOK_SECRET.encode(), body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)


def escape(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def build_html(lead: dict) -> str:
    fields = [
        ("Nome", lead.get("name")),
        ("Email", lead.get("email")),
        ("Telefone", lead.get("phone")),
        ("Empresa", lead.get("company")),
        ("Serviço", lead.get("service")),
        ("Orçamento", lead.get("budget")),
        ("Mensagem", lead.get("message")),
        ("Fonte", lead.get("source")),
        ("Data", datetime.now(BRT).strftime("%d/%m/%Y %H:%M")),
    ]
    rows = ""
    for label, val in fields:
        if val:
            rows += (
                f'<tr><td style="padding:8px 12px;font-weight:600;color:#555;'
                f'vertical-align:top">{label}</td>'
                f'<td style="padding:8px 12px">{escape(str(val))}</td></tr>'
            )
    return f"""
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#FF4500">Novo lead — Nookweb</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee">
        {rows}
      </table>
      <p style="margin-top:16px;font-size:12px;color:#999">ID: {lead.get('id','?')}</p>
    </div>"""


def send_email(lead: dict):
    msg = MIMEMultipart("alternative")
    name = lead.get("name", "Sem nome")
    company = lead.get("company")
    msg["Subject"] = f"Novo lead: {name}" + (f" — {company}" if company else "")
    msg["From"] = SMTP_FROM
    msg["To"] = ADMIN_EMAIL
    msg["Reply-To"] = lead.get("email", "")
    msg.attach(MIMEText(build_html(lead), "html", "utf-8"))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as srv:
        srv.starttls()
        srv.login(SMTP_USER, SMTP_PASS)
        srv.sendmail(SMTP_FROM, [ADMIN_EMAIL], msg.as_string())
    log.info("Email sent to %s for lead %s", ADMIN_EMAIL, lead.get("id"))


class Handler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_POST(self):
        if self.path != "/webhook/lead":
            self.send_response(404)
            self.end_headers()
            return

        client_ip = self.headers.get("X-Forwarded-For", self.client_address[0]).split(",")[0].strip()
        if is_rate_limited(client_ip):
            self.send_response(429)
            self._cors()
            self.end_headers()
            self.wfile.write(b'{"error":"rate limited"}')
            return

        length = int(self.headers.get("Content-Length", 0))
        if length > 10_000:
            self.send_response(413)
            self.end_headers()
            return

        body = self.rfile.read(length)

        sig = self.headers.get("X-Webhook-Signature", "")
        if not verify_signature(body, sig):
            self.send_response(401)
            self._cors()
            self.end_headers()
            self.wfile.write(b'{"error":"invalid signature"}')
            return

        try:
            payload = json.loads(body)
        except json.JSONDecodeError:
            self.send_response(400)
            self._cors()
            self.end_headers()
            self.wfile.write(b'{"error":"invalid json"}')
            return

        lead = payload.get("record", payload)

        if not lead.get("name") or not lead.get("email"):
            self.send_response(400)
            self._cors()
            self.end_headers()
            self.wfile.write(b'{"error":"name and email required"}')
            return

        try:
            send_email(lead)
            self.send_response(200)
            self._cors()
            self.end_headers()
            self.wfile.write(b'{"ok":true}')
        except Exception as e:
            log.error("Email send failed: %s", e)
            self.send_response(502)
            self._cors()
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

    def do_GET(self):
        if self.path == "/health":
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b'{"status":"ok"}')
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, fmt, *args):
        log.info(fmt, *args)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8090"))
    srv = HTTPServer(("0.0.0.0", port), Handler)
    log.info("notify-lead listening on :%d", port)
    srv.serve_forever()
