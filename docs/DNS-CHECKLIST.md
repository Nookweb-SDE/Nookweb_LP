# DNS — checklist antes do deploy (nookweb.com.br)

O [`docker-stack.yml`](../docker-stack.yml) pede certificado Let’s Encrypt para **apex** e **www**. Ambos precisam de resolver para a VPS **antes** do Traefik conseguir validar o HTTP-01.

## No cPanel (Zone Editor)

1. **A** `nookweb.com.br` → IP da VPS (ex.: `5.78.90.166`) — já deves ter.
2. **A** `www.nookweb.com.br` → **o mesmo IP** (ou **CNAME** `www` → `nookweb.com.`).

Sem o passo 2, o certificado pode **falhar** ou o browser em `https://www...` não bate no Traefik.

## Verificar no PC

```text
nslookup nookweb.com.br
nslookup www.nookweb.com.br
```

Ambos devem mostrar o IP da VPS.

## Só apex (sem www)

Se **não** quiseres `www` de momento, no `docker-stack.yml` usa só a regra com o host `nookweb.com.br` nos dois routers (remove a parte `|| Host(www.nookweb.com.br)`), commit e deploy.
