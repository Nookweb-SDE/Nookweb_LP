# Deploy Nookweb LP na VPS (Docker Swarm + Traefik)
# Envia APENAS ficheiros versionados no Git (git archive), nunca a pasta inteira (evita node_modules / GB).
#
# Uso: .\deploy-vps.ps1
# Opcional: $env:VPS = "root@IP" antes de executar (default: root@5.78.90.166)

$ErrorActionPreference = "Stop"

if (-not $env:VPS) {
    $VPS = "root@5.78.90.166"
} else {
    $VPS = $env:VPS
}

$ProjectRoot = $PSScriptRoot
$SSH_OPTS = "-o StrictHostKeyChecking=no"

Write-Host "Escopo: apenas ficheiros Git (HEAD). Sem node_modules / .git / lixo local." -ForegroundColor Gray

Push-Location $ProjectRoot

# --- Validar repositório Git ---
if (-not (Test-Path ".git")) {
    Pop-Location
    Write-Host "ERRO: Esta pasta nao e um repositorio Git (.git ausente)." -ForegroundColor Red
    Write-Host "  Inicialize com: git init && git add . && git commit -m 'deploy'" -ForegroundColor Yellow
    exit 1
}

$null = git rev-parse HEAD 2>$null
if ($LASTEXITCODE -ne 0) {
    Pop-Location
    Write-Host "ERRO: Nenhum commit valido (HEAD). Faca pelo menos um commit antes do deploy." -ForegroundColor Red
    exit 1
}

# --- Arquivo tar local (evita pipe que mascara erros e fallback perigoso) ---
$archiveName = "nookweb-lp-deploy-$([guid]::NewGuid().ToString('n')).tar"
$archivePath = Join-Path $env:TEMP $archiveName

Write-Host "1. Gerando arquivo (git archive HEAD) -> $archivePath ..." -ForegroundColor Cyan
git archive --format=tar -o $archivePath HEAD
if ($LASTEXITCODE -ne 0) {
    Pop-Location
    Remove-Item -LiteralPath $archivePath -ErrorAction SilentlyContinue
    Write-Host "ERRO: git archive falhou. Corrija o repositorio e tente de novo." -ForegroundColor Red
    exit 1
}

try {
    Write-Host "2. Enviando tar para VPS ($VPS) ..." -ForegroundColor Cyan
    scp $SSH_OPTS -q $archivePath "${VPS}:/tmp/nookweb-lp-src.tar"
    if ($LASTEXITCODE -ne 0) {
        throw "scp falhou (codigo $LASTEXITCODE)"
    }

    Write-Host "3. Extraindo na VPS e build/deploy ..." -ForegroundColor Cyan
    $RemoteScript = @'
set -e
rm -rf /tmp/nookweb-lp
mkdir -p /tmp/nookweb-lp
tar -xf /tmp/nookweb-lp-src.tar -C /tmp/nookweb-lp
rm -f /tmp/nookweb-lp-src.tar
cd /tmp/nookweb-lp
echo "=== Redes Docker (rede Traefik) ==="
docker network ls
echo "=== Build da imagem ==="
docker build -t nookweb-lp:latest .
echo "=== Swarm ==="
docker info 2>/dev/null | grep -q "Swarm: active" || docker swarm init
echo "=== Deploy stack nookweb-lp ==="
docker stack deploy -c docker-stack.yml nookweb-lp
echo "=== Servicos ==="
docker service ls
echo "Deploy concluido. Ajuste docker-stack.yml se a rede Traefik nao for traefik_public."
'@

    $RemoteScript | ssh $SSH_OPTS $VPS "bash -s"
    if ($LASTEXITCODE -ne 0) {
        throw "SSH remoto falhou (codigo $LASTEXITCODE)"
    }
}
finally {
    Pop-Location
    Remove-Item -LiteralPath $archivePath -ErrorAction SilentlyContinue
}

Write-Host "Concluido." -ForegroundColor Green
