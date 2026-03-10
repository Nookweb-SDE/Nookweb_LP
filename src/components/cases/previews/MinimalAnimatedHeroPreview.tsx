/* ═══════════════════════════════════════════════
   SITE DE ALTO IMPACTO 2 — Minimal Animated Hero (v0)
   Versão compacta para preview (420px container)
═══════════════════════════════════════════════ */

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { FlowingRaysBackground } from "./MinimalAnimatedHero/FlowingRaysBackground";

export function MinimalAnimatedHeroPreview() {
  const [activePanel, setActivePanel] = useState<"obras" | "artistas" | "colecoes">("obras");

  return (
    <div className="min-h-[420px] relative overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <FlowingRaysBackground />

      {/* Main — compacto */}
      <main className="relative z-10 flex flex-col items-start px-3 pt-6 pb-4 sm:px-5 sm:pt-8 sm:pb-6">
        <div className="inline-flex items-center bg-white/10 border border-white/20 rounded-full px-2 py-1 mb-2">
          <span className="text-white text-[10px] sm:text-xs">Compre arte digital</span>
        </div>

        <h1 className="text-white font-bold leading-snug text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-5 text-balance">
          Onde artistas{" "}
          <span className="italic font-light text-white/95">vendem obras</span>
        </h1>

        <p className="text-white/70 text-[11px] sm:text-xs md:text-sm mb-2 sm:mb-3 max-w-md text-pretty leading-relaxed">
          Comunidade onde artistas vendem obras e se conectam com colecionadores.
        </p>

        <button
          type="button"
          onClick={() => setActivePanel("obras")}
          className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-1.5 border border-orange-400/30 shadow-md inline-flex"
        >
          Explorar obras
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>

        <div className="mt-3 flex gap-2 flex-wrap">
          {[
            { key: "obras", label: "Obras" },
            { key: "artistas", label: "Artistas" },
            { key: "colecoes", label: "Coleções" },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActivePanel(item.key as "obras" | "artistas" | "colecoes")}
              className={`px-2 py-1 rounded text-[10px] border transition ${
                activePanel === item.key
                  ? "bg-white text-black border-white"
                  : "bg-white/10 text-white border-white/30 hover:bg-white/20"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-3 w-full max-w-md rounded border border-white/20 bg-black/30 px-3 py-2 text-[11px] text-white/85">
          {activePanel === "obras" && "Webview: grade de obras em destaque com filtro por estilo e preço."}
          {activePanel === "artistas" && "Webview: perfil de artistas, seguidores e coleções lançadas."}
          {activePanel === "colecoes" && "Webview: coleções sazonais, curadoria e lançamentos da semana."}
        </div>
      </main>
    </div>
  );
}
