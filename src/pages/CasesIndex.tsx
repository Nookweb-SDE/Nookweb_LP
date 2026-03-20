import { WorksGallery } from '../components/cases/WorksGallery'

export function CasesIndex() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden" data-dark-section>
      {/* Ação compacta apenas no mobile */}
      <header className="md:hidden flex items-center justify-end px-4 sm:px-6 pt-24 sm:pt-28 pb-4">
        <button className="w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="8" height="8" fill="white" />
            <rect x="12" width="8" height="8" fill="white" />
            <rect y="12" width="8" height="8" fill="white" />
            <rect x="12" y="12" width="8" height="8" fill="white" />
          </svg>
        </button>
      </header>

      {/* Galeria Interativa */}
      <main className="pt-5 sm:pt-7 md:pt-10 pb-20 sm:pb-28 md:pb-36 px-2 sm:px-0">
        <WorksGallery />
      </main>
    </div>
  )
}
