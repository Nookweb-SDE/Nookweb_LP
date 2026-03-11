# Enviar este projeto para outro repositório Git

## 1. Criar o repositório novo no GitHub (ou GitLab, etc.)

- Crie um repositório **vazio** no GitHub (sem README, sem .gitignore).
- Copie a URL (ex.: `https://github.com/SEU-USUARIO/NOME-DO-REPO.git`).

## 2. Adicionar o novo remote e enviar

Abra o terminal **dentro da pasta** `codigo-nookweb-completo` e rode:

```bash
cd "c:\Users\felli\OneDrive\Desktop\Nookweb LP\codigo-nookweb-completo"

# Adicionar o novo repositório como remote (troque a URL pela do seu novo repo)
git remote add novo https://github.com/SEU-USUARIO/NOME-DO-REPO.git

# Enviar o branch master para o novo repo (cria o branch no remoto)
git push -u novo master
```

Se o repositório novo já tiver conteúdo (ex.: README) e pedir para fazer pull antes:

```bash
git push -u novo master --force
```

**Atenção:** `--force` sobrescreve o histórico no remoto. Use só se o repo novo estiver vazio ou você quiser substituir o que está lá.

## 3. Usar o novo repo como principal (opcional)

Para passar a usar só o novo repositório como `origin`:

```bash
git remote remove origin
git remote rename novo origin
git push -u origin master
```

## Remotes atuais (antes de mudar)

- **origin** → https://github.com/Furia300/Nookweb.git  
- **nookweb-sde** → https://github.com/Nookweb-SDE/Nookweb_LP.git  

O código que será enviado é o do **branch master** dentro de `codigo-nookweb-completo`.
