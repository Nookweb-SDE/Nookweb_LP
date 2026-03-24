/**
 * Galeria fullscreen em `/cases` — componente `CasesModal` (WorksGallery).
 *
 * - **Produção (build):** rota `/cases` desativada; link "Cases" vai para `/#cases` na home.
 * - **Dev (`npm run dev`):** rota `/cases` ativa para editar a galeria.
 * - **Build de teste:** defina `VITE_ENABLE_CASES_MODAL=true` no `.env` para habilitar a rota.
 */
export function isCasesModalRouteEnabled(): boolean {
  return import.meta.env.DEV || import.meta.env.VITE_ENABLE_CASES_MODAL === 'true'
}

/** Link do item "Cases" no header/footer: página de galeria (só modo teste) ou âncora na home. */
export function getCasesHref(): string {
  return isCasesModalRouteEnabled() ? '/cases' : '/#cases'
}
