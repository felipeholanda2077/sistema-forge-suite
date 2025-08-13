# Documentação da API - Sistema Arcane Forge

## Índice
- [Visão Geral](#visão-geral)
- [Autenticação](#autenticação)
- [Endpoints](#endpoints)
  - [Autenticação](#autenticação-1)
  - [Pokémon](#pokémon)
  - [Favoritos](#favoritos)
- [Respostas de Erro](#respostas-de-erro)
- [Exemplos de Uso](#exemplos-de-uso)
- [Limitações de Taxa](#limitações-de-taxa)

## Visão Geral

A API do Sistema Arcane Forge fornece acesso aos recursos de Pokémon, permitindo que os usuários explorem informações detalhadas sobre Pokémon e gerenciem seus favoritos.

**URL Base:** `https://api.arcaneforgesuite.com/v1`

## Autenticação

A autenticação é feita através de tokens JWT (JSON Web Tokens). Para obter um token, faça login usando o endpoint de autenticação.

```http
POST /auth/login
```

Inclua o token nas requisições subsequentes no cabeçalho `Authorization`:

```
Authorization: Bearer seu_token_aqui
```

## Endpoints

### Autenticação

#### Registrar Novo Usuário

```http
POST /auth/register
```

**Corpo da Requisição:**
```json
{
  "username": "nomeusuario",
  "email": "usuario@exemplo.com",
  "password": "senhasegura123"
}
```

**Respostas:**
- `201 Created`: Usuário registrado com sucesso
- `400 Bad Request`: Dados inválidos ou faltando
- `409 Conflict`: E-mail já cadastrado

#### Login

```http
POST /auth/login
```

**Corpo da Requisição:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senhasegura123"
}
```

**Resposta de Sucesso (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "nomeusuario",
    "email": "usuario@exemplo.com"
  }
}
```

### Pokémon

#### Listar Pokémon

```http
GET /pokemon
```

**Parâmetros de Consulta:**
- `limite` (opcional, padrão: 20): Número de itens por página
- `deslocamento` (opcional, padrão: 0): Número de itens para pular

**Exemplo de Resposta (200 OK):**
```json
{
  "contagem": 1281,
  "proximo": "/pokemon?limite=20&deslocamento=20",
  "anterior": null,
  "resultados": [
    {
      "id": 1,
      "nome": "bulbasaur",
      "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    },
    ...
  ],
  "emCache": true
}
```

#### Obter Detalhes do Pokémon

```http
GET /pokemon/{id_ou_nome}
```

**Exemplo de Resposta (200 OK):**
```json
{
  "id": 1,
  "nome": "bulbasaur",
  "tipos": [
    {
      "slot": 1,
      "tipo": {
        "nome": "grama",
        "url": "https://pokeapi.co/api/v2/type/12/"
      }
    },
    {
      "slot": 2,
      "tipo": {
        "nome": "veneno",
        "url": "https://pokeapi.co/api/v2/type/4/"
      }
    }
  ],
  "estatisticas": [
    {
      "estatistica": {
        "nome": "hp",
        "url": "https://pokeapi.co/api/v2/stat/1/"
      },
      "esforco": 0,
      "base_stat": 45
    },
    ...
  ],
  "imagens": {
    "padrao": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "oficial": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
  },
  "altura": 7,
  "peso": 69,
  "especies": {
    "nome": "bulbasaur",
    "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
  },
  "emCache": false
}
```

#### Buscar Pokémon

```http
GET /pokemon/buscar
```

**Parâmetros de Consulta:**
- `q`: Termo de busca (obrigatório)
- `limite` (opcional, padrão: 10): Número máximo de resultados

**Exemplo de Resposta (200 OK):**
```json
{
  "resultados": [
    {
      "id": 1,
      "nome": "bulbasaur",
      "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    },
    ...
  ],
  "emCache": true
}
```

### Favoritos

#### Listar Favoritos do Usuário

```http
GET /favoritos
```

**Cabeçalho de Autenticação Obrigatório**

**Exemplo de Resposta (200 OK):**
```json
[
  {
    "usuarioId": "507f1f77bcf86cd799439011",
    "pokemonId": 1,
    "nome": "bulbasaur",
    "adicionadoEm": "2025-08-11T05:45:17.000Z"
  },
  ...
]
```

#### Adicionar aos Favoritos

```http
POST /favoritos
```

**Cabeçalho de Autenticação Obrigatório**

**Corpo da Requisição:**
```json
{
  "pokemonId": 1
}
```

**Respostas:**
- `201 Created`: Adicionado aos favoritos com sucesso
- `400 Bad Request`: ID do Pokémon inválido
- `401 Unauthorized`: Não autenticado
- `409 Conflict`: Pokémon já está nos favoritos

#### Remover dos Favoritos

```http
DELETE /favoritos/{pokemonId}
```

**Cabeçalho de Autenticação Obrigatório**

**Respostas:**
- `204 No Content`: Removido com sucesso
- `404 Not Found`: Pokémon não encontrado nos favoritos

## Respostas de Erro

A API retorna respostas de erro padronizadas no seguinte formato:

```json
{
  "erro": "Mensagem de erro descritiva",
  "codigo": "CODIGO_DO_ERRO",
  "detalhes": {
    "campo": "Descrição do erro específico do campo"
  }
}
```

### Códigos de Erro Comuns

| Código HTTP | Código do Erro         | Descrição                               |
|-------------|-------------------------|-----------------------------------------|
| 400         | `DADOS_INVALIDOS`      | Dados de entrada inválidos              |
| 401         | `NAO_AUTORIZADO`       | Autenticação necessária                 |
| 403         | `ACESSO_NEGADO`        | Permissão insuficiente                  |
| 404         | `NAO_ENCONTRADO`       | Recurso não encontrado                  |
| 409         | `CONFLITO`             | Conflito com o estado atual do recurso  |
| 429         | `MUITAS_REQUISICOES`   | Muitas requisições em um curto período  |
| 500         | `ERRO_INTERNO`         | Erro interno do servidor                |

## Exemplos de Uso

### Exemplo 1: Buscar Pokémon

**Requisição:**
```http
GET /pokemon?limite=5
```

**Resposta:**
```json
{
  "contagem": 1281,
  "proximo": "/pokemon?limite=5&deslocamento=5",
  "anterior": null,
  "resultados": [
    {
      "id": 1,
      "nome": "bulbasaur",
      "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    },
    ...
  ],
  "emCache": true
}
```

### Exemplo 2: Adicionar aos Favoritos

**Requisição:**
```http
POST /favoritos
Authorization: Bearer seu_token_aqui
Content-Type: application/json

{
  "pokemonId": 25
}
```

**Resposta (201 Created):**
```json
{
  "mensagem": "Pikachu adicionado aos favoritos",
  "pokemonId": 25
}
```

## Limitações de Taxa

A API possui limitações de taxa para evitar abuso:

- **Endpoints Públicos:** 100 requisições por minuto por IP
- **Endpoints Autenticados:** 1000 requisições por minuto por usuário

Ao exceder o limite, você receberá uma resposta `429 Too Many Requests` com o cabeçalho `Retry-After` indicando quantos segundos esperar antes de tentar novamente.

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
Content-Type: application/json

{
  "erro": "Muitas requisições. Tente novamente em 60 segundos.",
  "codigo": "MUITAS_REQUISICOES"
}
```
