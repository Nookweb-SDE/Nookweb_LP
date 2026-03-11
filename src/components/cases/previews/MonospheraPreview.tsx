import { useRef, useCallback, useEffect } from "react";
import { hideSignatureAndDisableDownloadButton } from "./monospheraIframePatch";

export default function MonospheraPreview() {
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
    <div
      style={{
        background: "#0a0e14",
        minHeight: "420px",
        maxHeight: "594px",
        overflow: "hidden",
      }}
    >
      <iframe
        ref={iframeRef}
        src="/monosphera/index.html"
        title="Monosphera"
        style={{
          width: "100%",
          height: "594px",
          border: "none",
          overflow: "hidden",
        }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        onLoad={onLoad}
      />
    </div>
  );
}
