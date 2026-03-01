# /debug — Debug sistemático de erros

Quando houver um erro, seguir este protocolo:

## Passo 1 — Ler o erro completo
- Nunca assumir a causa sem ler a mensagem inteira
- Identificar: tipo do erro, arquivo, linha, stack trace

## Passo 2 — Localizar a causa raiz
- Não tratar o sintoma, tratar a origem
- Verificar: imports, tipos TypeScript, variáveis undefined, dependências

## Passo 3 — Propor e aplicar fix
- Explicar o que causou o erro em 1–2 linhas
- Aplicar correção cirúrgica (sem alterar o que não é necessário)

## Passo 4 — Confirmar resolução
- Releia o trecho corrigido
- Verifique se o fix não criou outro problema

## Formato de resposta:
```
🐛 ERRO IDENTIFICADO
Causa: [explicação direta]
Arquivo: [caminho]
Linha: [número]

🔧 FIX APLICADO:
[trecho do código corrigido]

✅ Verificado: [confirmação de que está correto]
```
