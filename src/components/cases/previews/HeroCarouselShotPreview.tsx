/* ═══════════════════════════════════════════════
   Imagem alinhada ao item do Hero (public/sites/siteN.jpg)
   CasesSection — variante por vertical
═══════════════════════════════════════════════ */

import React from "react";

interface Props {
  src: string;
  label: string;
}

export function HeroCarouselShotPreview({ src, label }: Props) {
  return (
    <div
      style={{
        width: "100%",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          padding: "12px 10px",
          boxSizing: "border-box",
        }}
      >
        <img
          src={src}
          alt={label}
          style={{
            maxWidth: "100%",
            maxHeight: "min(420px, 58vh)",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            objectPosition: "center",
            display: "block",
          }}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
