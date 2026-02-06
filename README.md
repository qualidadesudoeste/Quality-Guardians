# 🛡️ Quality Guardians Dashboard

> Sistema completo de gamificação para equipes de Qualidade e Testes de Software

[![Live Demo](https://img.shields.io/badge/demo-online-success)](https://qualidadesudoeste.github.io/Quality-Guardians/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## 📋 Sobre o Projeto

O **Quality Guardians Dashboard** é uma plataforma de gamificação desenvolvida para transformar métricas de qualidade em uma experiência engajadora e motivadora para equipes de QA (Quality Assurance).

### 🎯 Objetivo

Aumentar o engajamento da equipe, reconhecer conquistas individuais e coletivas, e promover uma cultura de qualidade através de:

- 🏆 Sistema de pontuação baseado em atividades de qualidade
- 🎖️ Badges e conquistas desbloqueadas automaticamente
- 📊 Rankings mensal e trimestral com visualização de progresso
- 🎁 Loja de recompensas com sistema de resgate
- 👥 Missões coletivas para incentivar trabalho em equipe
- 📈 Avaliação de competências técnicas por níveis de senioridade

---

## ✨ Funcionalidades

### 🎮 Sistema de Gamificação

#### Rankings
- **Ranking Mensal**: Acompanhamento de pontuação do mês atual
- **Ranking Trimestral**: Visão de longo prazo do desempenho
- **Visualização de Progresso**: Gráficos e indicadores de evolução

#### Badges e Conquistas
15+ badges distribuídos em 5 categorias:

- **🐛 Bug Hunting**: Caçador de Bugs, Exterminador Crítico
- **⚙️ Automação**: Automatizador, Mestre da Automação
- **👁️ Code Review**: Revisor, Guardião do Código
- **📖 Documentação**: Documentador, Mestre dos Docs
- **👥 Colaboração**: Guardião do Mês

Cada badge possui níveis (Bronze, Prata, Ouro, Platina) desbloqueados automaticamente conforme critérios.

#### Loja de Recompensas
- Sistema de resgate com validação de pontos
- Apenas participantes do ranking podem resgatar
- Histórico de resgates
- Recompensas variadas: café premium, cursos, livros, equipamentos

#### Missões Coletivas
- Objetivos de equipe com recompensas compartilhadas
- Progresso em tempo real
- Incentivo à colaboração

---

### 📊 Gestão de Qualidade

#### Registro de Atividades
Coordenadores podem registrar ações dos analistas:
- 🔴 Defeitos encontrados (Crítico, Alto, Médio, Baixo)
- 📝 Testes criados e executados
- ⚙️ Testes automatizados
- 👁️ Code reviews realizados
- 📖 Documentações criadas

Cada atividade gera pontos automaticamente conforme configuração.

#### Avaliação de Competências
- Sistema de **50+ competências** distribuídas em **10 níveis de senioridade**:
  - Jr 1, Jr 2, Jr 3
  - Pl 1, Pl 2, Pl 3
  - Sr 1, Sr 2, Sr 3
  - Especialista

- **Cálculo automático** do nível baseado nas competências marcadas
- Competências granulares por área: testes, automação, metodologias, ferramentas, soft skills
- Atualização em tempo real durante avaliação

#### Métricas Acompanhadas
- Defeitos encontrados por severidade
- Testes criados e executados
- Taxa de automação
- Code reviews realizados
- Documentações produzidas

---

### 👥 Gestão de Equipe

#### Gerenciamento de Usuários
- **CRUD completo** de usuários
- **3 perfis de acesso**:
  - **Admin**: Acesso total ao sistema
  - **Coordenador**: Gerencia atividades e avaliações
  - **Analista**: Visualiza seu progresso e resgata recompensas

- Controle de participação no ranking
- Atribuição de níveis de senioridade

#### Perfis Personalizados
- Upload de foto de perfil
- Edição de dados pessoais
- Alteração de senha
- Visualização de badges conquistados
- Histórico de atividades

#### Onboarding
- Fluxo de primeiro acesso
- Questionário de competências para definir nível inicial
- Tutorial do sistema

---

### ⚙️ Configurações

#### Metas Editáveis
- Personalização de objetivos mensais
- Definição de metas trimestrais
- Acompanhamento de progresso

#### Pontuação Configurável
Ajuste de pontos por tipo de atividade:
- Defeitos (por severidade)
- Testes (criação e execução)
- Automação
- Code review
- Documentação

#### Questionário Parametrizável
- Customização de competências por nível
- Adição/remoção de competências
- Ajuste de critérios de avaliação

---

## 🎨 Design Futurista

O sistema possui um design único e moderno com:

### Visual
- **Glassmorphism**: Efeito de vidro fosco em todos os cards
- **Bordas Neon**: Brilho verde característico (#00ff41)
- **Gradientes Animados**: Background dinâmico com transições suaves (roxo, azul, rosa, verde)
- **Hover Effects**: Interações suaves com transformações e intensificação de brilho

### Tipografia
- **Textos**: Inter (clean e legível)
- **Títulos**: Orbitron (futurista)

### Responsividade
- Layout adaptável para desktop, tablet e mobile
- Componentes otimizados para diferentes tamanhos de tela

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca UI com recursos modernos
- **TypeScript 5** - Tipagem estática para maior segurança
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes reutilizáveis e acessíveis
- **Wouter** - Roteamento leve e performático
- **Recharts** - Gráficos e visualizações de dados
- **Lucide React** - Ícones modernos e consistentes

### Backend & Dados
- **Express** - Servidor de desenvolvimento
- **LocalStorage** - Persistência de dados no navegador

### Build & Deploy
- **GitHub Actions** - CI/CD automático
- **GitHub Pages** - Hospedagem estática gratuita

---

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- pnpm 8+ (recomendado) ou npm 9+

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/qualidadesudoeste/Quality-Guardians.git
cd Quality-Guardians
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
pnpm dev
```

4. **Acesse no navegador**
```
http://localhost:3000
```

---

## 🏗️ Build para Produção

```bash
pnpm build
```

Os arquivos otimizados serão gerados em `dist/public/`

---

## 🌐 Deploy

Este projeto está configurado para deploy automático no GitHub Pages via GitHub Actions.

### Deploy Automático
1. Faça push para a branch `main`
2. GitHub Actions fará o build automaticamente
3. Site será publicado em: `https://qualidadesudoeste.github.io/Quality-Guardians/`

### Deploy Manual
```bash
pnpm build
# Faça upload dos arquivos de dist/public/ para seu servidor
```

---

## 🔐 Credenciais Padrão

**Administrador:**
- Email: `admin@empresa.com`
- Senha: `admin123`

**Coordenadora:**
- Email: `beatriz.costa@empresa.com`
- Senha: `coordenador123`

**Analista:**
- Email: `ana.silva@empresa.com`
- Senha: `analista123`

⚠️ **IMPORTANTE**: Troque as senhas após o primeiro acesso!

---

## 📊 Sistema de Pontuação

| Atividade | Pontos |
|-----------|--------|
| 🔴 Defeito Crítico | +100 |
| 🟠 Defeito Alto | +50 |
| 🟡 Defeito Médio | +25 |
| 🟢 Defeito Baixo | +10 |
| 📝 Teste Criado | +20 |
| ▶️ Teste Executado | +5 |
| ⚙️ Teste Automatizado | +150 |
| 👁️ Code Review | +30 |
| 📖 Documentação | +40 |

*Valores configuráveis em Configurações*

---

## 📁 Estrutura do Projeto

```
quality-guardians-dashboard/
├── client/                      # Código-fonte React
│   ├── src/
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── ui/              # Componentes shadcn/ui
│   │   │   ├── Header.tsx
│   │   │   ├── BadgeCard.tsx
│   │   │   └── ...
│   │   ├── contexts/            # Gerenciamento de estado
│   │   │   ├── AuthContext.tsx
│   │   │   ├── UsersContext.tsx
│   │   │   └── ...
│   │   ├── pages/               # Páginas da aplicação
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Badges.tsx
│   │   │   └── ...
│   │   ├── data/                # Dados mockados
│   │   └── styles/              # CSS global
│   └── index.html
├── dist/                        # Build de produção
├── .github/workflows/           # GitHub Actions
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🛠️ Desenvolvimento

### Comandos Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento

# Build
pnpm build            # Gera build de produção

# Verificação
pnpm tsc --noEmit     # Verifica erros TypeScript
```

### Adicionar Nova Página

1. Crie o componente em `client/src/pages/`
2. Adicione a rota em `client/src/App.tsx`
3. Atualize o menu em `client/src/components/Header.tsx`

### Adicionar Novo Badge

1. Edite `client/src/data/mockData.ts`
2. Adicione o badge no array `badges`
3. Defina critérios de desbloqueio
4. Adicione ícone correspondente

---

## 🐛 Troubleshooting

### Site não carrega após deploy
- Verifique se GitHub Pages está ativado
- Certifique-se de que `base` em `vite.config.ts` está correto
- Limpe o cache do navegador

### Login não funciona
- Certifique-se de acessar via HTTPS
- Habilite cookies no navegador
- Não use modo anônimo/privado

### Estilos não aparecem
- Verifique se os arquivos CSS foram carregados (F12 → Network)
- Faça hard reload (Ctrl+Shift+R)

---

## 📈 Roadmap

### Versão 2.1 (Próxima)
- [ ] Exportação de relatórios em PDF/Excel
- [ ] Gráficos de evolução individual
- [ ] Notificações push
- [ ] Modo claro/escuro

### Versão 2.2
- [ ] Integração com Jira/Azure DevOps
- [ ] API REST para integração externa
- [ ] Dashboard de métricas gerenciais
- [ ] Sistema de comentários em atividades

### Versão 3.0
- [ ] Backend real com banco de dados
- [ ] Autenticação OAuth (Google, Microsoft)
- [ ] Multi-tenancy (múltiplas empresas)
- [ ] Mobile app (React Native)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Equipe

Desenvolvido com ❤️ pela equipe Quality Guardians

---

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/qualidadesudoeste/Quality-Guardians/issues)
- **Discussões**: [GitHub Discussions](https://github.com/qualidadesudoeste/Quality-Guardians/discussions)

---

## 🌟 Mostre seu Apoio

Se este projeto te ajudou, dê uma ⭐️!

---

**Transforme a cultura de qualidade da sua equipe! 🚀**

---

**Versão**: 2.0  
**Última atualização**: Novembro 2025  
**Status**: ✅ Produção
