import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import SuperAdminMonospheraCopy from './superadmin-monosphera/SuperAdminApp'
import { ServicosIndex } from './pages/ServicosIndex'
import { ServicoDetalhe } from './pages/ServicoDetalhe'
import { CasesIndex } from './pages/CasesIndex'
import { CaseDetalhe } from './pages/CaseDetalhe'
import { Sobre } from './pages/Sobre'
import { BlogIndex } from './pages/BlogIndex'
import { BlogPost } from './pages/BlogPost'
import { Contato } from './pages/Contato'
import { PoliticaPrivacidade } from './pages/PoliticaPrivacidade'
import { Termos } from './pages/Termos'
import { NotFound } from './pages/NotFound'
import { isCasesModalRouteEnabled } from './config/casesModal'
import { useI18n } from './i18n/I18nProvider'

export default function App() {
  const location = useLocation()
  const { t } = useI18n()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const isSuperAdminPreview = location.pathname.startsWith('/superadmin-preview')
  const isHome = location.pathname === '/'
  const mainClass = `min-h-screen min-h-[100dvh] flex flex-col${isHome ? '' : ' main-safe-top'}`

  return (
    <>
      <Helmet>
        <title>{t('app.title')}</title>
        <meta name="description" content={t('app.description')} />
      </Helmet>
      {!isSuperAdminPreview && <Navbar />}
      <main className={mainClass}>
        <Routes>
          <Route path="/superadmin-preview/*" element={<SuperAdminMonospheraCopy />} />
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<ServicosIndex />} />
          <Route path="/servicos/:slug" element={<ServicoDetalhe />} />
          <Route
            path="/cases"
            element={
              isCasesModalRouteEnabled() ? (
                <CasesIndex />
              ) : (
                <Navigate to="/#cases" replace />
              )
            }
          />
          <Route path="/cases/:slug" element={<CaseDetalhe />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isSuperAdminPreview && <Footer />}
    </>
  )
}
