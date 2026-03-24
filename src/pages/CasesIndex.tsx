import { CasesModal } from '../components/cases/CasesModal'

/** Rota `/cases` — em produção sem flag, redireciona em `App.tsx`; aqui só monta `CasesModal` em modo teste. */
export function CasesIndex() {
  return <CasesModal />
}
