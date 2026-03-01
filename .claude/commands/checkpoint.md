# /checkpoint — Salvar estado atual com git

Salvar o progresso atual da sessão:

1. Rodar `git status` para ver o que mudou
2. Mostrar ao usuário a lista de arquivos alterados
3. Gerar mensagem de commit descritiva baseada no que foi feito
4. Perguntar: "Posso fazer o commit com esta mensagem?"
5. Após confirmação: `git add` nos arquivos relevantes + `git commit`
6. Confirmar que o commit foi feito

## Regras do commit:
- Mensagem em português, direta
- Formato: `tipo: descrição curta do que foi feito`
- Tipos: `feat` (nova feature), `fix` (correção), `style` (visual/CSS), `refactor`, `chore`
- Nunca commitar `node_modules/`, `dist/`, `.env`
- Sempre incluir: `Co-Authored-By: Claude <noreply@anthropic.com>`
