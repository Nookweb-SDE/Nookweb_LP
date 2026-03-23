#!/usr/bin/env python3
"""
Deploy não interativo: git archive + SCP + SSH (senha via env VPS_SSH_PASSWORD).
Não commitar senhas. Uso:
  set VPS_SSH_PASSWORD=... && python scripts/deploy-vps-paramiko.py
"""
from __future__ import annotations

import os
import subprocess
import sys
import uuid

import paramiko
from scp import SCPClient

PROJECT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOST = os.environ.get("VPS_HOST", "5.78.90.166")
USER = os.environ.get("VPS_USER", "root")


def main() -> int:
    # Evita UnicodeEncodeError no console Windows (cp1252)
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8", errors="replace")
            sys.stderr.reconfigure(encoding="utf-8", errors="replace")
        except Exception:
            pass

    pwd = os.environ.get("VPS_SSH_PASSWORD")
    if not pwd:
        print("Defina a variável de ambiente VPS_SSH_PASSWORD.", file=sys.stderr)
        return 1

    tar_path = os.path.join(os.environ.get("TEMP", "/tmp"), f"nookweb-{uuid.uuid4().hex}.tar")
    print(f"[deploy] A empacotar repositorio (git archive HEAD) -> {tar_path}", flush=True)
    r = subprocess.run(
        ["git", "-C", PROJECT, "archive", "--format=tar", "-o", tar_path, "HEAD"],
        check=False,
    )
    if r.returncode != 0:
        return r.returncode
    try:
        tar_size = os.path.getsize(tar_path)
    except OSError:
        tar_size = 0
    print(
        f"[deploy] Ficheiro unico gerado: {tar_size / 1024 / 1024:.2f} MiB (um .tar, nao e upload ficheiro a ficheiro)",
        flush=True,
    )

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(
        HOST,
        username=USER,
        password=pwd,
        timeout=120,
        allow_agent=False,
        look_for_keys=False,
    )
    try:
        print(
            f"[deploy] A enviar por SCP para {USER}@{HOST}:/tmp/nookweb-lp-src.tar ...",
            flush=True,
        )
        with SCPClient(ssh.get_transport()) as scp:
            scp.put(tar_path, "/tmp/nookweb-lp-src.tar")
        print("[deploy] Upload concluido.", flush=True)

        remote = r"""set -e
rm -rf /tmp/nookweb-lp
mkdir -p /tmp/nookweb-lp
tar -xf /tmp/nookweb-lp-src.tar -C /tmp/nookweb-lp
rm -f /tmp/nookweb-lp-src.tar
cd /tmp/nookweb-lp
echo "=== Redes Docker (rede Traefik) ==="
docker network ls
echo "=== Build da imagem ==="
docker build -t nookweb-lp:latest .
echo "=== Swarm ==="
docker info 2>/dev/null | grep -q "Swarm: active" || docker swarm init
echo "=== Deploy stack nookweb-lp ==="
docker stack deploy -c docker-stack.yml nookweb-lp
echo "=== Servicos ==="
docker service ls
echo "=== Tarefa nookweb-lp (replicas) ==="
docker service ps nookweb-lp_nookweb-lp --no-trunc 2>/dev/null || true
echo "Deploy concluido."
"""
        stdin, stdout, stderr = ssh.exec_command(remote)
        out = stdout.read().decode("utf-8", errors="replace")
        err = stderr.read().decode("utf-8", errors="replace")
        sys.stdout.write(out)
        sys.stderr.write(err)
        code = stdout.channel.recv_exit_status()
        return code
    finally:
        ssh.close()
        try:
            os.remove(tar_path)
        except OSError:
            pass


if __name__ == "__main__":
    raise SystemExit(main())
