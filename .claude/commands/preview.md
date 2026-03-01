# /preview — Abrir preview ao lado (como Replit)

Iniciar o servidor de desenvolvimento e mostrar o preview ao lado:

1. Usar `preview_start` com o servidor "Nookweb Dev" configurado em `.claude/launch.json`
2. Tirar screenshot do estado atual da página
3. Mostrar o preview ao lado de qualquer alteração visual

## Uso automático:
- Sempre que alterar CSS, componentes visuais ou layout → tirar screenshot após salvar
- Sempre que o usuário pedir para ver o resultado → mostrar screenshot atualizado
- Comparar antes/depois quando relevante

## Servidor configurado:
- Nome: Nookweb Dev
- Comando: `npm run dev`
- Porta: 5174
- URL: http://localhost:5174
