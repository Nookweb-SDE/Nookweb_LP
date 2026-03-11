/**
 * Patch aplicado ao iframe do Monosphera (same-origin):
 * - Oculta o bloco "SHA-256 ASSINATURA"
 * - Torna o botão "BAIXAR AGORA" não clicável
 */
export function hideSignatureAndDisableDownloadButton(iframeDoc: Document): void {
  const findAndHideSignature = (): void => {
    const walk = (node: Node): boolean => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        if (text.includes("SHA-256") && text.includes("ASSINATURA")) {
          let el = node.parentElement;
          while (el && el !== iframeDoc.body) {
            (el as HTMLElement).style.display = "none";
            return true;
          }
        }
        return false;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        const text = el.textContent || "";
        if (
          text.includes("SHA-256") &&
          text.includes("ASSINATURA") &&
          !el.querySelector("[style*='display: none']")
        ) {
          (el as HTMLElement).style.display = "none";
          return true;
        }
        for (let i = 0; i < node.childNodes.length; i++) {
          if (walk(node.childNodes[i]!)) return true;
        }
      }
      return false;
    };
    walk(iframeDoc.body);
  };

  const findAndDisableBaixarAgora = (): void => {
    const walk = (node: Node): boolean => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = (node.textContent || "").trim();
        if (text === "BAIXAR AGORA" || text.includes("BAIXAR AGORA")) {
          let el = node.parentElement;
          while (el && el !== iframeDoc.body) {
            const tag = el.tagName?.toLowerCase();
            if (
              tag === "button" ||
              tag === "a" ||
              (el as HTMLElement).onclick !== null ||
              el.getAttribute("href")
            ) {
              el.setAttribute("disabled", "true");
              (el as HTMLElement).style.pointerEvents = "none";
              (el as HTMLElement).style.cursor = "not-allowed";
              (el as HTMLElement).style.opacity = "0.7";
              if (tag === "a") el.removeAttribute("href");
              return true;
            }
            el = el.parentElement;
          }
        }
        return false;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        for (let i = 0; i < node.childNodes.length; i++) {
          if (walk(node.childNodes[i]!)) return true;
        }
      }
      return false;
    };
    walk(iframeDoc.body);
  };

  try {
    findAndHideSignature();
    findAndDisableBaixarAgora();
  } catch {
    // cross-origin or not ready
  }
}
