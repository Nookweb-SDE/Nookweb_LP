import { Routes, Route, useLocation } from 'react-router-dom'
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

export default function App() {
  const location = useLocation()
  const isSuperAdminPreview = location.pathname.startsWith('/superadmin-preview')

  return (
    <>
      <Helmet>
        <title>Nookweb — Holding Digital | Sistema Certo, Na Hora Certa</title>
        <meta name="description" content="Apps inteligentes até 90% mais barato e 10x mais rápido. Sites, E-commerce, SaaS, ERP, IA." />
      </Helmet>
      {!isSuperAdminPreview && <Navbar />}
      <div className="min-h-screen min-h-[100dvh] flex flex-col main-safe-top">
        <Routes>
          <Route path="/superadmin-preview/*" element={<SuperAdminMonospheraCopy />} />
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<ServicosIndex />} />
          <Route path="/servicos/:slug" element={<ServicoDetalhe />} />
          <Route path="/cases" element={<CasesIndex />} />
          <Route path="/cases/:slug" element={<CaseDetalhe />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isSuperAdminPreview && <Footer />}
    </>
  )
}
