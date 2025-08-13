# Guia do Desenvolvedor - Sistema Arcane Forge

## Índice
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Padrões de Código](#padrões-de-código)
- [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
- [Testes](#testes)
- [Deploy](#deploy)
- [Depuração](#depuração)
- [Boas Práticas](#boas-práticas)

## Configuração do Ambiente

### Pré-requisitos

- Node.js 18+ (recomendado LTS)
- npm 9+ ou Yarn 1.22+
- MongoDB 6.0+
- Redis 7.0+ (opcional, mas recomendado para produção)
- Git

### Instalação

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/seu-usuario/arcane-forge-suite.git
   cd arcane-forge-suite
   ```

2. **Instalar dependências**
   ```bash
   # Instalar dependências do backend
   cd backend
   npm install
   
   # Instalar dependências do frontend
   cd ../frontend
   npm install
   ```

3. **Configurar variáveis de ambiente**
   - Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`
   - Preencha as variáveis necessárias (MongoDB, JWT_SECRET, etc.)

4. **Iniciar serviços**
   ```bash
   # Iniciar MongoDB (certifique-se que está rodando em segundo plano)
   sudo systemctl start mongod
   
   # Iniciar Redis (opcional)
   sudo systemctl start redis
   ```

## Estrutura do Projeto

```
arcane-forge-suite/
├── backend/                  # Backend Node.js/Express
│   ├── src/
│   │   ├── config/          # Configurações (banco, autenticação, etc.)
│   │   ├── controllers/     # Lógica dos controladores
│   │   ├── middleware/      # Middlewares do Express
│   │   ├── models/          # Modelos do Mongoose
│   │   ├── routes/          # Definição de rotas
│   │   ├── services/        # Lógica de negócios
│   │   │   ├── cache/       # Serviços de cache
│   │   │   └── bff/         # Backend for Frontend services
│   │   └── utils/           # Utilitários
│   ├── tests/               # Testes do backend
│   └── app.js               # Aplicação principal
│
├── frontend/                # Frontend React/TypeScript
│   ├── public/              # Arquivos estáticos
│   └── src/
│       ├── assets/          # Imagens, fontes, etc.
│       ├── components/      # Componentes reutilizáveis
│       ├── hooks/           # Custom hooks
│       ├── pages/           # Componentes de página
│       ├── services/        # Serviços de API
│       ├── store/           # Gerenciamento de estado
│       └── styles/          # Estilos globais
│
├── docs/                    # Documentação adicional
└── scripts/                 # Scripts úteis
```

## Padrões de Código

### Backend (Node.js/Express)

- **Estilo de código**: Airbnb JavaScript Style Guide
- **Linting**: ESLint com configuração Airbnb
- **Formatação**: Prettier
- **Banco de Dados**: Mongoose com schemas tipados

### Frontend (React/TypeScript)

- **Componentes**: Function components com Hooks
- **Estilização**: CSS Modules ou Styled Components
- **Gerenciamento de Estado**: Context API para estado global
- **Tipagem**: TypeScript estrito

### Convenções de Commits

Usamos Conventional Commits:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Exemplos:
```
feat: adiciona página de detalhes do Pokémon
fix(cache): corrige problema de expiração do cache
chore: atualiza dependências
```

## Fluxo de Desenvolvimento

1. **Criar uma branch**
   ```bash
   git checkout -b feature/nome-da-feature
   ```

2. **Desenvolver a funcionalidade**
   - Escreva testes para novas funcionalidades
   - Atualize a documentação quando necessário
   - Siga os padrões de código definidos

3. **Executar testes**
   ```bash
   # Backend
   cd backend
   npm test
   
   # Frontend
   cd ../frontend
   npm test
   ```

4. **Fazer commit das mudanças**
   ```bash
   git add .
   git commit -m "tipo: mensagem descritiva"
   ```

5. **Enviar alterações**
   ```bash
   git push origin feature/nome-da-feature
   ```

6. **Abrir um Pull Request**
   - Descreva as mudanças
   - Adicione revisores
   - Aguarde aprovação e CI passar

## Testes

### Backend

- **Testes Unitários**: Testes de funções individuais
- **Testes de Integração**: Testes de rotas e serviços
- **Testes E2E**: Testes de ponta a ponta

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm test -- --watch

# Gerar cobertura de código
npm run test:coverage
```

### Frontend

- **Testes de Componentes**: Testes de renderização e interação
- **Testes de Integração**: Testes de fluxos completos
- **Testes E2E**: Cypress para testes de ponta a ponta

```bash
# Executar testes
npm test

# Executar testes em modo watch
npm test -- --watch

# Executar testes E2E
npm run test:e2e
```

## Deploy

### Ambiente de Desenvolvimento

```bash
# Iniciar backend
cd backend
npm run dev

# Iniciar frontend (em outro terminal)
cd ../frontend
npm start
```

### Produção

1. **Build do frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Configurar variáveis de ambiente de produção**
   - Atualizar `.env` com configurações de produção
   - Configurar NODE_ENV=production

3. **Iniciar servidor de produção**
   ```bash
   # Usando PM2 (recomendado)
   pm2 start ecosystem.config.js
   ```

4. **Configurar Nginx (opcional)**
   ```nginx
   server {
       listen 80;
       server_name seudominio.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Depuração

### Backend

- Use `console.log` para depuração simples
- Para depuração avançada, use `node --inspect`
- Visualize logs com:
  ```bash
  # Logs em tempo real
  tail -f logs/error.log
  
  # Logs do PM2
  pm2 logs
  ```

### Frontend

- Use as DevTools do navegador
- React DevTools para inspecionar componentes
- Redux DevTools para gerenciamento de estado

### Banco de Dados

```javascript
// Conectar ao MongoDB via shell
mongo "mongodb://usuario:senha@localhost:27017/arcane-forge-suite"

// Consultar coleções
db.getCollectionNames()

// Consultar documentos
db.usuarios.find()
```

## Boas Práticas

### Segurança

- Sempre valide entrada do usuário
- Use parâmetros preparados para consultas ao banco de dados
- Armazene senhas com hash (bcrypt)
- Use HTTPS em produção
- Implemente rate limiting
- Atualize dependências regularmente

### Performance

- Use cache sempre que possível
- Otimize consultas ao banco de dados
- Carregamento preguiçoso (lazy loading) de componentes
- Code splitting no frontend

### Manutenibilidade

- Escreva código limpo e legível
- Documente funções complexas
- Mantenha um histórico de commits limpo
- Siga o princípio da responsabilidade única
