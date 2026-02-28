import { Link } from 'react-router-dom'

const navLinks = [
  { to: '/servicos', label: 'Serviços' },
  { to: '/cases', label: 'Cases' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
]

export function Footer() {
  return (
    <footer className="bg-heavy text-pure py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="font-serif text-2xl text-pure">
              Nookweb
            </Link>
            <p className="mt-4 text-pure/70 text-sm leading-relaxed max-w-xs">
              Holding Digital do Grupo ImpulsoTech. Sistema Certo, Na Hora Certa.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-pure/50 mb-4">Navegação</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-pure/80 hover:text-pure transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-pure/50 mb-4">Contato</p>
            <a href="mailto:contato@nookweb.com.br" className="text-pure/80 hover:text-pure block">
              contato@nookweb.com.br
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-pure/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-pure/50 text-sm">© {new Date().getFullYear()} Nookweb. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-sm">
            <Link to="/politica-privacidade" className="text-pure/50 hover:text-pure">Privacidade</Link>
            <Link to="/termos" className="text-pure/50 hover:text-pure">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
