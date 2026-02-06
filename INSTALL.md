# 📚 Guia Completo de Instalação e Deploy - Quality Guardians Dashboard

> Instruções passo a passo para desenvolvedores

---

## 📋 Índice

1. [Requisitos do Sistema](#requisitos-do-sistema)
2. [Instalação Local](#instalação-local)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Desenvolvimento](#desenvolvimento)
5. [Build para Produção](#build-para-produção)
6. [Deploy no GitHub Pages](#deploy-no-github-pages)
7. [Configurações Avançadas](#configurações-avançadas)
8. [Troubleshooting](#troubleshooting)

---

## 🖥️ Requisitos do Sistema

### Obrigatórios
- **Node.js**: versão 18.0 ou superior
- **pnpm**: versão 8.0 ou superior (recomendado)
  - Alternativa: npm 9.0+ ou yarn 1.22+
- **Git**: para clonar o repositório
- **Navegador moderno**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Recomendados
- **VS Code**: editor de código com extensões TypeScript e React
- **GitHub Desktop**: para facilitar o gerenciamento Git (opcional)
- **Conta GitHub**: para deploy no GitHub Pages

### Verificar Instalações

```bash
# Verificar Node.js
node --version
# Deve retornar v18.x.x ou superior

# Verificar pnpm
pnpm --version
# Deve retornar 8.x.x ou superior

# Se pnpm não estiver instalado:
npm install -g pnpm

# Verificar Git
git --version
```

---

## 💻 Instalação Local

### Passo 1: Obter o Código-Fonte

#### Opção A: Clonar do GitHub (Após Upload)
```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/quality-guardians.git

# Entre no diretório
cd quality-guardians
```

#### Opção B: Extrair do Arquivo Fornecido
```bash
# Extrair o arquivo tar.gz
tar -xzf quality-guardians-source-code.tar.gz

# Entre no diretório
cd quality-guardians-dashboard
```

### Passo 2: Instalar Dependências

```bash
# Com pnpm (recomendado - mais rápido)
pnpm install

# OU com npm
npm install

# OU com yarn
yarn install
```

**Tempo estimado**: 2-5 minutos dependendo da conexão

### Passo 3: Verificar Instalação

```bash
# Listar dependências instaladas
pnpm list --depth=0

# Verificar se node_modules foi criado
ls -la node_modules
```

---

## 📁 Estrutura do Projeto

```
quality-guardians-dashboard/
│
├── 📂 client/                    # Código-fonte React
│   ├── 📂 src/
│   │   ├── 📂 components/        # Componentes reutilizáveis
│   │   │   ├── ui/               # Componentes shadcn/ui
│   │   │   ├── ActivityFeed.tsx
│   │   │   ├── BadgeCard.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── OnboardingFlow.tsx
│   │   │   ├── RankingCard.tsx
│   │   │   └── RewardCard.tsx
│   │   │
│   │   ├── 📂 contexts/          # Gerenciamento de estado
│   │   │   ├── ActivityContext.tsx
│   │   │   ├── AuthContext.tsx
│   │   │   ├── BadgeContext.tsx
│   │   │   ├── CompetencyContext.tsx
│   │   │   ├── QuestionnaireContext.tsx
│   │   │   ├── RewardContext.tsx
│   │   │   └── UserContext.tsx
│   │   │
│   │   ├── 📂 data/              # Dados mockados
│   │   │   ├── badges.ts
│   │   │   ├── competencies.ts
│   │   │   ├── initialUsers.ts
│   │   │   ├── questionnaire.ts
│   │   │   └── rewards.ts
│   │   │
│   │   ├── 📂 pages/             # Páginas da aplicação
│   │   │   ├── Activities.tsx    # Registro de atividades
│   │   │   ├── Badges.tsx        # Conquistas e badges
│   │   │   ├── Competencies.tsx  # Avaliação de competências
│   │   │   ├── Home.tsx          # Dashboard principal
│   │   │   ├── Login.tsx         # Tela de login
│   │   │   ├── Profile.tsx       # Perfil do usuário
│   │   │   ├── Rewards.tsx       # Loja de recompensas
│   │   │   ├── Settings.tsx      # Configurações
│   │   │   └── Users.tsx         # Gerenciamento de usuários
│   │   │
│   │   ├── 📂 styles/            # Estilos globais
│   │   │   └── index.css         # CSS futurista
│   │   │
│   │   ├── App.tsx               # Componente raiz
│   │   ├── main.tsx              # Entry point
│   │   └── vite-env.d.ts         # Types Vite
│   │
│   └── index.html                # HTML base
│
├── 📂 public/                    # Arquivos públicos
│   └── logo-qg.png               # Logo Quality Guardians
│
├── 📂 server/                    # Servidor Express (dev)
│   └── index.js
│
├── 📂 dist/                      # Build de produção (gerado)
│   └── public/
│       ├── index.html
│       └── assets/
│
├── 📄 package.json               # Dependências e scripts
├── 📄 vite.config.ts             # Configuração Vite
├── 📄 tsconfig.json              # Configuração TypeScript
├── 📄 components.json            # Configuração shadcn/ui
├── 📄 README.md                  # Documentação
└── 📄 LICENSE                    # Licença MIT
```

---

## 🛠️ Desenvolvimento

### Iniciar Servidor de Desenvolvimento

```bash
# Com pnpm
pnpm dev

# OU com npm
npm run dev

# OU com yarn
yarn dev
```

**Saída esperada:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3001/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Acessar a Aplicação

1. Abra o navegador em: `http://localhost:3001`
2. Faça login com as credenciais padrão:
   - **Email**: `admin@empresa.com`
   - **Senha**: `admin123`

### Hot Reload

O Vite oferece **Hot Module Replacement (HMR)**:
- Edite qualquer arquivo `.tsx`, `.ts`, `.css`
- As mudanças aparecem **instantaneamente** no navegador
- Não é necessário recarregar a página manualmente

### Comandos Úteis Durante Desenvolvimento

```bash
# Verificar erros de TypeScript
pnpm tsc --noEmit

# Formatar código (se tiver Prettier configurado)
pnpm format

# Limpar cache do Vite
rm -rf node_modules/.vite

# Reinstalar dependências
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 🏗️ Build para Produção

### Gerar Build Otimizado

```bash
# Com pnpm
pnpm build

# OU com npm
npm run build

# OU com yarn
yarn build
```

**Processo:**
1. TypeScript é compilado
2. Código é minificado
3. Assets são otimizados
4. Arquivos são gerados em `dist/public/`

**Saída esperada:**
```
vite v5.x.x building for production...
✓ xxx modules transformed.
dist/public/index.html                   x.xx kB
dist/public/assets/index-xxxxx.css      xx.xx kB │ gzip: xx.xx kB
dist/public/assets/index-xxxxx.js      xxx.xx kB │ gzip: xx.xx kB
✓ built in x.xxs
```

### Visualizar Build Localmente

```bash
# Instalar servidor HTTP simples
npm install -g serve

# Servir a pasta dist/public
serve -s dist/public -l 3002
```

Acesse: `http://localhost:3002`

### Verificar Build

```bash
# Listar arquivos gerados
ls -lh dist/public/

# Verificar tamanho total
du -sh dist/public/

# Deve mostrar ~700KB - 1MB
```

---

## 🌐 Deploy no GitHub Pages

### Método 1: GitHub Actions (Recomendado)

#### Passo 1: Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome do repositório: `quality-guardians`
3. Descrição: `Sistema de gamificação para equipes de QA`
4. Visibilidade: **Public** (para GitHub Pages grátis)
5. Clique em **Create repository**

#### Passo 2: Fazer Upload do Código

```bash
# Inicializar Git (se ainda não foi feito)
git init

# Adicionar remote
git remote add origin https://github.com/SEU_USUARIO/quality-guardians.git

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit - Quality Guardians Dashboard v2.0"

# Enviar para GitHub
git push -u origin main
```

#### Passo 3: Configurar GitHub Actions

1. No repositório, crie a pasta `.github/workflows/`
2. Crie o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Build
        run: pnpm build
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist/public'
          
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Passo 4: Ativar GitHub Pages

1. No repositório, vá em **Settings** → **Pages**
2. Em **Source**, selecione: **GitHub Actions**
3. Aguarde o deploy (1-3 minutos)
4. Acesse: `https://SEU_USUARIO.github.io/quality-guardians/`

#### Passo 5: Verificar Deploy

```bash
# Ver status do workflow
gh run list

# Ver logs do último deploy
gh run view --log
```

---

### Método 2: Deploy Manual com gh-pages

#### Passo 1: Instalar gh-pages

```bash
pnpm add -D gh-pages
```

#### Passo 2: Adicionar Script no package.json

```json
{
  "scripts": {
    "deploy": "pnpm build && gh-pages -d dist/public"
  }
}
```

#### Passo 3: Fazer Deploy

```bash
pnpm deploy
```

#### Passo 4: Configurar GitHub Pages

1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione: **Deploy from a branch**
3. Em **Branch**, selecione: **gh-pages** → **/ (root)**
4. Clique em **Save**
5. Aguarde 1-2 minutos
6. Acesse: `https://SEU_USUARIO.github.io/quality-guardians/`

---

## ⚙️ Configurações Avançadas

### Customizar Base URL

Se o repositório não estiver na raiz do GitHub Pages:

**vite.config.ts:**
```typescript
export default defineConfig({
  base: '/quality-guardians/', // Nome do repositório
  // ... resto da config
});
```

### Configurar Domínio Customizado

1. Compre um domínio (ex: `qualityguardians.com`)
2. No repositório, vá em **Settings** → **Pages**
3. Em **Custom domain**, digite: `qualityguardians.com`
4. No seu provedor de DNS, adicione:
   - **Tipo**: `CNAME`
   - **Nome**: `@` ou `www`
   - **Valor**: `SEU_USUARIO.github.io`
5. Aguarde propagação DNS (até 48h)

### Habilitar HTTPS

1. No GitHub Pages, marque: **Enforce HTTPS**
2. Aguarde certificado SSL ser emitido (automático)

### Otimizar Performance

**vite.config.ts:**
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-select'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
```

---

## 🐛 Troubleshooting

### Problema: `pnpm: command not found`

**Solução:**
```bash
npm install -g pnpm
```

### Problema: Erro ao instalar dependências

**Solução:**
```bash
# Limpar cache
pnpm store prune

# Deletar node_modules e lock file
rm -rf node_modules pnpm-lock.yaml

# Reinstalar
pnpm install
```

### Problema: Porta 3001 já está em uso

**Solução:**
```bash
# Matar processo na porta 3001
lsof -ti:3001 | xargs kill -9

# OU usar outra porta
pnpm dev --port 3002
```

### Problema: Build falha com erro de memória

**Solução:**
```bash
# Aumentar limite de memória do Node
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build
```

### Problema: GitHub Pages mostra 404

**Soluções:**
1. Verifique se `index.html` está em `dist/public/`
2. Certifique-se de que o branch `gh-pages` existe
3. Verifique se GitHub Pages está ativado nas Settings
4. Aguarde 5-10 minutos para propagação
5. Limpe cache do navegador (Ctrl+Shift+Delete)

### Problema: Estilos não carregam no GitHub Pages

**Solução:**
Verifique o `base` no `vite.config.ts`:
```typescript
base: '/quality-guardians/', // Deve ser o nome do repositório
```

### Problema: Login não funciona após deploy

**Solução:**
- GitHub Pages só funciona com HTTPS
- Certifique-se de acessar via `https://`
- Verifique se cookies estão habilitados
- Não use modo anônimo/privado

### Problema: Imagens não aparecem

**Solução:**
```bash
# Verificar se logo está no lugar certo
ls -la public/logo-qg.png

# Verificar se foi copiada para dist
ls -la dist/public/logo-qg.png

# Se não, copiar manualmente
cp public/logo-qg.png dist/public/
```

---

## 🔒 Segurança

### Trocar Credenciais Padrão

**IMPORTANTE**: As credenciais padrão são públicas. Troque-as!

1. Faça login como admin
2. Vá em **Gerenciar Usuários**
3. Clique no usuário admin
4. Clique em **Editar**
5. Altere a senha
6. Repita para todos os usuários padrão

### Backup de Dados

Os dados ficam no **localStorage** do navegador. Para fazer backup:

```javascript
// No console do navegador (F12)
const backup = {
  users: localStorage.getItem('qg_users'),
  activities: localStorage.getItem('qg_activities'),
  badges: localStorage.getItem('qg_badges'),
  rewards: localStorage.getItem('qg_rewards'),
  settings: localStorage.getItem('qg_settings')
};

console.log(JSON.stringify(backup));
// Copie o JSON e salve em um arquivo
```

Para restaurar:
```javascript
// Cole o JSON do backup
const backup = { /* ... */ };

Object.entries(backup).forEach(([key, value]) => {
  if (value) localStorage.setItem(key, value);
});

// Recarregue a página
location.reload();
```

---

## 📊 Monitoramento

### Google Analytics (Opcional)

1. Crie uma propriedade em: https://analytics.google.com
2. Copie o ID de medição (ex: `G-XXXXXXXXXX`)
3. Adicione no `client/index.html`:

```html
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

---

## 🎓 Próximos Passos

Após o deploy bem-sucedido:

1. ✅ Troque as senhas padrão
2. ✅ Cadastre os usuários reais da equipe
3. ✅ Configure as metas mensais/trimestrais
4. ✅ Ajuste os pontos por atividade
5. ✅ Personalize as competências do questionário
6. ✅ Comece a registrar atividades!
7. ✅ Acompanhe o engajamento da equipe

---

## 📞 Suporte

- **GitHub Issues**: Para reportar bugs
- **GitHub Discussions**: Para dúvidas e sugestões
- **Email**: qualityguardians@empresa.com

---

**Boa sorte com seu Quality Guardians Dashboard! 🚀**

**Versão do Guia**: 2.0  
**Última atualização**: Novembro 2025
