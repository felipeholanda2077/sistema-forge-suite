# Sistema Arcane Forge - Explorador Pokémon

Uma aplicação web moderna para explorar e gerenciar seus Pokémon favoritos, construída com React, TypeScript e Node.js.

## 🚀 Começando

### Pré-requisitos

- Node.js (v16+)
- npm (v8+) ou yarn
- MongoDB (v5+)
- Redis (v6+) - Opcional, utiliza cache em memória como fallback

## 🛠️ Configuração

### Backend

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```

3. Crie um arquivo `.env` no diretório do backend:
   ```env
   MONGODB_URI=mongodb://localhost:27017/kirvano
   JWT_SECRET=sua_chave_secreta_aqui
   PORT=5000
   # Configuração opcional do Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   REDIS_DB=0
   ```

4. Inicie o servidor backend:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

### Frontend

1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```

3. Crie um arquivo `.env` no diretório do frontend:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   # ou
   yarn start
   ```

5. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🏗️ Arquitetura

### Backend

1. **Padrão API Gateway**
   - Rotas centralizadas através do prefixo `/api`
   - Rotas organizadas em endpoints públicos e protegidos
   - Tratamento de autenticação e autorização

2. **BFF (Backend for Frontend)**
   - Camada de serviço dedicada para dados de Pokémon
   - Transforma e filtra dados para consumo do frontend
   - Implementa rate limiting e validação de requisições

3. **Estratégia de Cache**
   - Cache em múltiplas camadas (Redis + fallback em memória)
   - TTL configurável para diferentes endpoints
   - Invalidação automática de cache

4. **Banco de Dados**
   - MongoDB para esquema flexível
   - Índices otimizados para campos frequentemente consultados
   - Validação de dados no nível do esquema

### Frontend

1. **Arquitetura Baseada em Componentes**
   - Componentes de UI reutilizáveis
   - Princípios do Atomic Design
   - Documentação de componentes com Storybook

2. **Gerenciamento de Estado**
   - Context API do React para estado global
   - Hooks personalizados para busca e cache de dados
   - Atualizações otimistas da interface

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Redis** - Armazenamento em memória (cache)
- **JWT** - Autenticação
- **Mongoose** - Modelagem de objetos MongoDB

### Frontend
- **React** - Biblioteca de UI
- **TypeScript** - Verificação de tipos
- **Axios** - Cliente HTTP
- **React Query** - Busca e cache de dados
- **Tailwind CSS** - Estilização
- **Storybook** - Documentação de componentes

### DevOps
- **Docker** - Containerização
- **GitHub Actions** - CI/CD
- **ESLint & Prettier** - Qualidade de código

## 📚 Documentação da API

Consulte o arquivo [API_DOCS.md](API_DOCS.md) para a documentação completa da API.

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

## 🙏 Agradecimentos

- Dados de Pokémon fornecidos por [PokeAPI](https://pokeapi.co/)
- Ícones do [React Icons](https://react-icons.github.io/react-icons/)
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

