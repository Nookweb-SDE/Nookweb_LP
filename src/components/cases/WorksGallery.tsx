import { useState } from "react"
import { VideoCard } from "./VideoCard"
import { CustomCursor } from "./CustomCursor"

const projects = [
  {
    id: 1,
    title: "MONOSPHERA",
    category: "PROTEÇÃO INTELIGENTE",
    year: "2024",
    thumbnail: "/monosphera-screenshot.png",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 2,
    title: "APPS",
    category: "MOBILE APPLICATIONS",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=900&fit=crop&q=80",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 3,
    title: "SAAS",
    category: "MULTI-TENANT PLATFORMS",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=900&fit=crop&q=80",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: 4,
    title: "UI/UX",
    category: "DESIGN SYSTEMS",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=900&fit=crop&q=80",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: 5,
    title: "IA",
    category: "AI INTEGRATION",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=900&fit=crop&q=80",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
]

export function WorksGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <>
      <CustomCursor isActive={hoveredId !== null} />
      <div className="w-full px-4 md:px-6">
        {/* Desktop: horizontal flex gallery */}
        <div className="hidden md:flex gap-4 items-stretch">
          {projects.map((project) => (
            <VideoCard
              key={project.id}
              project={project}
              isHovered={hoveredId === project.id}
              onHoverChange={(hovered) => setHoveredId(hovered ? project.id : null)}
            />
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
