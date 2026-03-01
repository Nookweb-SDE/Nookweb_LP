# /revisar — Revisar o que foi alterado

Após qualquer conjunto de mudanças, execute esta revisão completa:

1. **Reler** cada arquivo que foi modificado nesta sessão
2. **Verificar** se há:
   - Erros de sintaxe ou TypeScript
   - Props/variáveis quebradas ou não utilizadas
   - Imports faltando ou incorretos
   - CSS classes referenciadas no TSX mas não definidas no CSS (ou vice-versa)
   - Inconsistências com o restante do projeto

3. **Resumir** no formato:
```
🔍 REVISÃO PÓS-MUDANÇA
━━━━━━━━━━━━━━━━━━━━━━━
Arquivos revisados: [lista]

✅ OK: [o que está correto]
⚠️  Atenção: [o que pode precisar de ajuste]
❌ Problemas encontrados: [erros, se houver]

Próximo passo sugerido: [ou "Nenhum — tudo limpo"]
━━━━━━━━━━━━━━━━━━━━━━━
```
