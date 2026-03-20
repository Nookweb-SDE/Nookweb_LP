# Deploy Nookweb LP na VPS 5.78.90.166 (Docker Swarm + Traefik)
# Envia APENAS este projeto (codigo-nookweb-completo / Nookweb LP), nada mais.
# Uso: .\deploy-vps.ps1   (senha SSH sera pedida 2x: envio + deploy)

$VPS = "root@5.78.90.166"
$ProjectRoot = $PSScriptRoot
$SSH_OPTS = "-o StrictHostKeyChecking=no"

Write-Host "Escopo: apenas Nookweb LP (esta pasta). Nao envia outros projetos." -ForegroundColor Gray
Write-Host "1. Enviando codigo (git archive = so fonte, sem node_modules/.git)..." -ForegroundColor Cyan
Push-Location $ProjectRoot
# Uma unica conexao: cria dir e recebe o tar (menos demora, 1 senha)
git archive --format=tar HEAD | ssh $SSH_OPTS $VPS "mkdir -p /tmp/nookweb-lp && tar -x -C /tmp/nookweb-lp"
Pop-Location
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro no git archive. Fallback: scp desta pasta..." -ForegroundColor Yellow
    ssh $SSH_OPTS $VPS "mkdir -p /tmp/nookweb-lp"
    scp $SSH_OPTS -r "$ProjectRoot\*" "${VPS}:/tmp/nookweb-lp/"
}

Write-Host "2. Build e deploy na VPS (senha de novo)..." -ForegroundColor Cyan
$RemoteScript = @'
set -e
cd /tmp/nookweb-lp
echo "=== Redes Docker (confira o nome da rede do Traefik) ==="
docker network ls
echo "=== Build da imagem ==="
docker build -t nookweb-lp:latest .
echo "=== Swarm ==="
docker info 2>/dev/null | grep -q "Swarm: active" || docker swarm init
echo "=== Deploy stack nookweb-lp ==="
docker stack deploy -c docker-stack.yml nookweb-lp
echo "=== Servicos ==="
docker service ls
echo "Deploy concluido. Ajuste docker-stack.yml se a rede do Traefik for diferente de traefik_public."
'@

$RemoteScript | ssh $SSH_OPTS $VPS "bash -s"

Write-Host "Concluido." -ForegroundColor Green
