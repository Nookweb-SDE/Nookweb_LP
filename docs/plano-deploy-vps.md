# Deploy VPS — Nookweb LP (Docker Swarm + Traefik)

Este documento alinha com o script [`deploy-vps.ps1`](../deploy-vps.ps1) e com [`.dockerignore`](../.dockerignore).

## O que sobe para a VPS

| Método | Conteúdo | Seguro? |
|--------|----------|---------|
| **`deploy-vps.ps1`** | Só `git archive HEAD` (ficheiros **commitados**) empacotados num `.tar` | Sim — sem `node_modules`, sem `.git`, sem pastas temporárias não rastreadas |
| Copiar pasta inteira (`scp -r *`) | Tudo, incluindo `node_modules` | **Não** — pode levar horas e GB |

**Regra:** deploy sempre a partir de **Git com commit limpo**. Nunca usar fallback que envie a pasta do projeto inteira.

## Pré-requisitos locais

1. Repositório Git com `.git` e pelo menos um commit (`HEAD` válido).
2. Ficheiros necessários ao build **commitados**: `src/`, `public/`, `package.json`, `package-lock.json`, `vite.config.ts`, `index.html`, `nginx.conf`, `Dockerfile`, `docker-stack.yml`, configs Tailwind/PostCSS/TS se existirem.

## Limpeza local (opcional, antes de testar)

Não altera o comportamento do site; só liberta disco e evita caches estranhos:

```powershell
Remove-Item -Recurse -Force node_modules, dist, .vite -ErrorAction SilentlyContinue
npm ci
npm run build
```

## Fluxo do `deploy-vps.ps1`

1. Valida Git (`HEAD`).
2. Gera um `.tar` temporário com `git archive`.
3. Envia **só esse ficheiro** para `/tmp/nookweb-lp-src.tar` na VPS.
4. Na VPS: extrai para `/tmp/nookweb-lp`, `docker build`, `docker stack deploy`.

Variável opcional: `$env:VPS = "root@SEU_IP"` antes de executar (default no script: ver ficheiro).

## Traefik e rede Docker

O [`docker-stack.yml`](../docker-stack.yml) na VPS **Nooklead** usa a rede overlay **`NookNet`** (a mesma do serviço `traefik_traefik`). Na VPS:

```bash
docker network ls
```

Se o Traefik estiver noutra rede (ex.: `traefik_default`), edita `docker-stack.yml`:

```yaml
networks:
  traefik_public:
    external: true
    name: NOME_REAL_DA_REDE
```

Ou renomeia a chave `traefik_public` para corresponder ao `docker network` que o Traefik expõe (documentação do teu stack Traefik).

Labels do router devem bater com o Traefik da VPS:

- **`web`** = HTTP (porta 80). Só com isto, **`https://` não fica com certificado válido** — o browser mostra `NET::ERR_CERT_AUTHORITY_INVALID` (certificado por defeito do Traefik).
- **`websecure`** + **`tls.certresolver`** = HTTPS com Let’s Encrypt (ou outro ACME configurado no Traefik).

O [`docker-stack.yml`](../docker-stack.yml) usa `websecure` e `tls.certresolver: letsencryptresolver` (nome definido no Traefik desta VPS). Noutro servidor, confirma com `docker service inspect traefik_traefik` o valor de `--certificatesresolvers.NOME`.

**Descobrir o nome do certresolver na VPS:**

```bash
docker service inspect traefik_traefik --format '{{json .Spec.TaskTemplate.ContainerSpec.Env}}' | tr ',' '\n' | grep -i acme
# ou ver Args / comando completo do container Traefik
docker service inspect traefik_traefik --format '{{json .Spec.TaskTemplate.ContainerSpec.Args}}'
```

Procura por `--certificatesresolvers.NOME.acme` — o `NOME` é o que pões em `tls.certresolver`.

**DNS:** o domínio `nookweb.com.br` precisa de registo **A** para o IP da VPS (ex.: `5.78.90.166`) para o Let’s Encrypt HTTP-01 funcionar.

Se o browser mostrar **`NET::ERR_CERT_AUTHORITY_INVALID`**, vê o guia [SSL — certificado inválido](SSL-certificado-invalido.md).

## Verificação pós-deploy

1. **Local (antes de subir):** `npm run build` deve concluir sem erros.
2. **Imagem:** `docker build -t nookweb-lp:test .` na pasta do projeto (contexto respeita `.dockerignore`). Requer **Docker CLI** instalado (Docker Desktop no Windows ou testar diretamente na VPS).
3. **Na VPS:** `docker service ls` — serviço `nookweb-lp_nookweb-lp` (ou nome gerado) em execução.
4. **Browser:** acede ao domínio configurado no Traefik.

## Nginx e SPA

O [`nginx.conf`](../nginx.conf) define `try_files` para o bundle Vite. Não remover do repositório — a imagem final copia `nginx.conf` para o container Nginx.

## Segurança

- **Não** commitar passwords SSH, `.env` com segredos, nem chaves `service_role` do Supabase.
- Preferir **chave SSH** em vez de password no servidor.
- Rotacionar credenciais se tiverem sido partilhadas em chat ou capturas.

## MinIO / outros serviços na mesma VPS

A imagem da LP é só **Nginx + ficheiros estáticos** (`dist/`). MinIO ou outros stacks são **separados**; não misturar volumes sem necessidade.
