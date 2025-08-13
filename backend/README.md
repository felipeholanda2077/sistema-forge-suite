# Arcane Forge Backend

This is the backend service for the Sistema Arcane Forge application.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3001
   NODE_ENV=development
   ```

### Running the Application

- **Development mode**:
  ```bash
  npm run dev
  ```

- **Production mode**:
  ```bash
  npm start
  ```

The server will start on `http://localhost:3001` by default.

### API Endpoints

- `GET /api/health` - Health check endpoint

## Project Structure

```
backend/
├── src/
│   └── index.js         # Main application entry point
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
└── package.json         # Project configuration
```

## Development

### Linting

```bash
npm run lint
```

### Testing

```bash
npm test
```
