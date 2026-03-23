# `NET::ERR_CERT_AUTHORITY_INVALID` (Traefik)

O browser **chega ao servidor** (DNS ok), mas o certificado **não é o Let’s Encrypt** — é o **certificado por defeito do Traefik** (não confiável).

## Causas mais comuns

1. **`tls.certresolver` com nome errado** — no `docker-stack.yml` está `letsencrypt`, mas o teu Traefik pode usar outro (ex.: `le`, `default`).
2. **Nomes dos entrypoints errados** — no stack usamos `web` (HTTP) e `websecure` (HTTPS). O teu Traefik pode usar `http` / `https` ou outros.
3. **Let’s Encrypt a falhar** — muitas vezes porque **`www` está no router mas o DNS do `www` não aponta para a VPS** (validação HTTP-01 falha).
4. **Traefik e o serviço em redes diferentes** — confirma `traefik.swarm.network` e a rede overlay certa.

## Na VPS — comandos (copiar/colar)

```bash
# 1) Erros recentes de ACME / certificados
docker service logs traefik_traefik --tail 120 2>&1 | grep -iE 'acme|certificate|error|unable'

# 2) Nome real do certresolver (procura certificatesresolvers.NOME)
docker service inspect traefik_traefik --format '{{range .Spec.TaskTemplate.ContainerSpec.Args}}{{.}} {{end}}'

# 3) Se usares Env em vez de Args:
docker service inspect traefik_traefik --format '{{range .Spec.TaskTemplate.ContainerSpec.Env}}{{println .}}{{end}}' | grep -i traefik

# 4) O serviço da LP está a correr?
docker service ps nookweb-lp_nookweb-lp --no-trunc
```

Ajusta no [`docker-stack.yml`](../docker-stack.yml):

- `traefik.http.routers.nookweb-lp.entrypoints` → o nome do **HTTPS** que vires no Traefik (muitas vezes `websecure`).
- `traefik.http.routers.nookweb-lp.tls.certresolver` → o **NOME** depois de `--certificatesresolvers.` nos Args.

Depois: `docker stack deploy -c docker-stack.yml nookweb-lp` (ou o teu script de deploy).

## Teste rápido de DNS a partir da própria VPS

```bash
getent hosts nookweb.com.br
getent hosts www.nookweb.com.br
```

O IP deve ser o da máquina onde corre o Traefik (ex.: `5.78.90.166`).

## Ainda falha?

- Espera **alguns minutos** após corrigir labels e redeploy (emissão ACME).
- Evita repetir falhas em massa (rate limit Let’s Encrypt).
- Se usares **Cloudflare** “orange cloud”, HTTP-01 pode exigir configuração extra (DNS challenge ou desativar proxy só para validar).
