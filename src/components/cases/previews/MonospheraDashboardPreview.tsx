/* Preview do Monosphera Dashboard — iframe para o build em public/monosphera-dashboard/
   Aplica patch (same-origin) para ocultar assinatura SHA-256 e desabilitar botão BAIXAR AGORA. */

import { useRef, useCallback, useEffect } from "react";
import { hideSignatureAndDisableDownloadButton } from "./monospheraIframePatch";

export default function MonospheraDashboardPreview() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const onLoad = useCallback(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!doc) return;

    cleanupRef.current?.();

    const run = () => {
      try {
        if (iframe?.contentDocument) hideSignatureAndDisableDownloadButton(iframe.contentDocument);
      } catch (_) {}
    };

    run();
    const t1 = window.setTimeout(run, 800);
    const t2 = window.setTimeout(run, 2000);

    const observer = new MutationObserver(run);
    observer.observe(doc.body, { childList: true, subtree: true });

    cleanupRef.current = () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
      cleanupRef.current = null;
    };
  }, []);

  useEffect(() => () => {
    cleanupRef.current?.();
  }, []);

  return (
    <div style={{ width: "100%", height: "594px", overflow: "hidden", background: "#0a0e14" }}>
      <iframe
        ref={iframeRef}
        src="/monosphera-dashboard/dashboard-preview"
        title="Monosphera Dashboard"
        style={{ width: "100%", height: "100%", border: "none" }}
        onLoad={onLoad}
      />
    </div>
  );
}
