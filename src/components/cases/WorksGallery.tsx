import { useState } from "react"
import { VideoCard } from "./VideoCard"
import { CustomCursor } from "./CustomCursor"

const projects = [
  {
    id: 1,
    title: "MONOSPHERA",
    category: "PROTEÇÃO INTELIGENTE",
    year: "2024",
    thumbnail: "/cases/monosphera-cover.webp",
    video: "",
  },
  {
    id: 2,
    title: "BLACK ICE",
    category: "E-COMMERCE FASHION",
    year: "2024",
    thumbnail: "/blackice-preview.webp",
    video: "",
  },
  {
    id: 3,
    title: "IZAI STUDIO",
    category: "SAAS · MARKETING IA",
    year: "2024",
    thumbnail: "/izai-preview.webp",
    video: "",
  },
  {
    id: 4,
    title: "TECNOPANO",
    category: "IA CORPORATIVA LOCAL",
    year: "2025",
    thumbnail: "/tecnopano-ia-preview.webp",
    video: "",
  },
  {
    id: 5,
    title: "LOW-CODE",
    category: "MVP · NO-CODE",
    year: "2024",
    thumbnail: "/lowcode-preview.webp",
    video: "",
  },
]

export function WorksGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <>
      <CustomCursor isActive={hoveredId !== null} />
      <div className="w-full px-4 md:px-6">
        {/* Desktop: horizontal flex gallery */}
        <div className="hidden md:flex flex-col gap-8">
          {[0].map((row) => (
            <div key={row} className="flex gap-12 items-stretch">
              {projects.map((project) => (
                <VideoCard
                  key={`${row}-${project.id}`}
                  project={project}
                  isHovered={hoveredId === project.id}
                  onHoverChange={(hovered) => setHoveredId(hovered ? project.id : null)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-4 md:hidden">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative rounded-[2rem] overflow-hidden h-[300px]"
            >
              <img
                src={project.thumbnail || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="backdrop-blur-xl bg-black/30 rounded-xl p-4 border border-white/10">
                  <h3 className="text-white font-mono text-sm tracking-[0.3em] uppercase font-medium">
                    {project.title}
                  </h3>
                  <p className="text-white/80 font-mono text-xs tracking-[0.2em] uppercase mt-1">
                    {project.category}
                  </p>
                  <div className="pt-2 mt-2 border-t border-white/10">
                    <p className="text-white/60 font-mono text-xs tracking-widest">{project.year}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
