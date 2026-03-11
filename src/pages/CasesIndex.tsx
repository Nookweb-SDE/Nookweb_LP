import { WorksGallery } from '../components/cases/WorksGallery'

export function CasesIndex() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden" data-dark-section>
      {/* Header com navegação interna da galeria */}
      <header className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 pt-24 sm:pt-28 pb-6 sm:pb-8">
        <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-8 text-xs md:text-sm font-mono tracking-wider">
          <span className="text-white font-semibold">NOOKWEB®</span>
          <span className="text-white/60">PORTFOLIO</span>
          <span className="text-white/60">PROJECTS</span>
          <span className="text-white/60">SERVICES</span>
          <button className="w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="8" height="8" fill="white" />
              <rect x="12" width="8" height="8" fill="white" />
              <rect y="12" width="8" height="8" fill="white" />
              <rect x="12" y="12" width="8" height="8" fill="white" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Galeria Interativa */}
      <main className="pb-8 sm:pb-16 px-2 sm:px-0">
        <WorksGallery />
      </main>
    </div>
  )
}
