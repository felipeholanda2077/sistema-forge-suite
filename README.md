# 🏰 Arcane Forge - Sistema de Gerenciamento Pokémon

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## Links importantes 

- Swagger(https://api-back-bdc17262bab6.herokuapp.com/api-docs/)
- Link do Front em produção(https://sistema-forge-suite.vercel.app/)
- Link de verificação de status do Back(https://api-back-bdc17262bab6.herokuapp.com/api/health)

Uma plataforma completa para explorar, gerenciar e interagir com Pokémon, construída com tecnologias modernas e arquitetura escalável.

## 📋 Índice

- [✨ Funcionalidades Principais](#-funcionalidades-principais)
- [🚀 Começando](#-começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Configuração do Ambiente](#-configuração-do-ambiente)
- [⚙️ Configuração](#️-configuração)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Variáveis de Ambiente](#variáveis-de-ambiente)
- [🏗️ Arquitetura](#️-arquitetura)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [📦 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔌 Integrações](#-integrações)
- [🧪 Testes](#-testes)
- [🐳 Docker](#-docker)
- [🔄 CI/CD](#-cicd)
- [📚 Documentação](#-documentação)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## ✨ Funcionalidades Principais

- **Autenticação Segura**
  - Login/Registro de usuários
  - Recuperação de senha
  - Tokens JWT para autenticação
  - Rotas protegidas

- **Exploração Pokémon**
  - Listagem completa de Pokémon
  - Busca avançada
  - Filtros por tipo, região e atributos
  - Detalhes completos de cada Pokémon

- **Sistema de Favoritos**
  - Adicionar/remover favoritos
  - Lista pessoal de Pokémon favoritos
  - Sincronização em tempo real

- **Perfil do Usuário**
  - Gerenciamento de dados pessoais
  - Histórico de atividades
  - Preferências de exibição

## 🚀 Começando

### Pré-requisitos

- Node.js (v18+)
- npm (v9+) ou yarn (v1.22+)
- MongoDB (v6+)
- Redis (v7+) - Opcional
- Git

### Configuração do Ambiente

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/seu-usuario/arcane-forge.git
   cd arcane-forge
   ```

2. **Instalar dependências globais (opcional)**
   ```bash
   npm install -g typescript ts-node nodemon
   ```

---

## ⚙️ Configuração

### Backend

```bash
cd backend
npm install
# ou
yarn
```

- Configure o arquivo `.env` (veja [Variáveis de Ambiente](#variáveis-de-ambiente))
- Inicie o servidor:
```bash
npm run dev
# ou
yarn dev
```

### Frontend

```bash
cd frontend
npm install
# ou
yarn
```

- Configure o arquivo `.env` (veja [Variáveis de Ambiente](#variáveis-de-ambiente))
- Inicie o servidor:
```bash
npm run dev
# ou
yarn dev
```
- Acesse [http://localhost:8080](http://localhost:8080)

---

## Variáveis de Ambiente

### Backend (.env)
```env
PORT=3001
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/arcane_forge
MONGODB_TEST_URI=mongodb://localhost:27017/arcane_forge_test

JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=outra_chave_secreta_aqui
REFRESH_TOKEN_EXPIRES_IN=30d

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

CORS_ORIGIN=http://localhost:8080

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3002/api
VITE_ENV=development

VITE_AUTH_TOKEN_KEY=authToken
VITE_REFRESH_TOKEN_KEY=refreshToken

VITE_RECAPTCHA_SITE_KEY=sua_chave_recaptcha
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

---

## 🏗️ Arquitetura

### Backend
- **API Gateway**: Rotas RESTful organizadas por domínio
- **Serviços**: Lógica de negócios isolada
- **Banco**: MongoDB + Mongoose
- **Cache**: Redis ou fallback em memória
- **Segurança**: JWT, Rate limiting, Sanitização

### Frontend
- **Estrutura**: Components, Pages, Services, Hooks
- **Estado**: Context API + React Query
- **Estilo**: Tailwind CSS + shadcn/ui
- **Performance**: Code splitting, Lazy loading

---

## 🛠️ Tecnologias Utilizadas

**Backend**:
Node.js, Express, TypeScript, MongoDB, Mongoose, Redis, JWT, Jest, Swagger

**Frontend**:
React, TypeScript, Vite, React Router, React Query, Tailwind CSS, shadcn/ui, Axios, Zod

**DevOps**:
Docker, GitHub Actions, ESLint, Prettier, Husky

---

## 📦 Estrutura do Projeto
```plaintext
arcane-forge/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.ts
│   └── tests/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       └── utils/
├── docs/
├── .github/
└── docker/
```

---

## 🔌 Integrações
- **PokeAPI**

---

## 🧪 Testes
```bash
# Backend
cd backend
npm test
npm run test:coverage

# Frontend
cd frontend
npm test
npm run test:coverage
```

---

## 🐳 Docker

**Desenvolvimento**
```bash
docker-compose up -d
docker-compose down
```

**Produção**
```bash
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🔄 CI/CD
- **Lint**: ESLint
- **Testes**: Jest
- **Build** Heroku
- **Deploy**: GitHub Actions

---

## 📚 Documentação
- Documentação da API
- Guia de Estilo
- Guia de Contribuição

---

## 🤝 Contribuição
1. Faça um fork
2. Crie uma branch (`feature/MinhaFeature`)
3. Commit (`git commit -m 'MinhaFeature'`)
4. Push (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença
Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
