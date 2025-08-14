import express from 'express';
import { body, param } from 'express-validator';
import { 
  getUserFavorites, 
  toggleFavorite, 
  isPokemonFavorited 
} from '../controllers/userFavoriteController.js';

const router = express.Router();

// Todas as rotas de favoritos agora funcionam sem autenticação
// usando 'anonymous' como ID de usuário quando não houver autenticação

// Toggle favorite status
router.post(
  '/toggle',
  [
    body('pokemon').isObject().withMessage('Dados do Pokémon são obrigatórios'),
    body('pokemon.id').isNumeric().withMessage('ID do Pokémon é inválido')
  ],
  toggleFavorite
);

// Get all favorites for the user (ou anonymous)
router.get('/', getUserFavorites);

// Check if a specific Pokémon is favorited by the user (ou anonymous)
router.get(
  '/check/:pokemonId',
  [
    param('pokemonId').isNumeric().withMessage('ID do Pokémon deve ser um número')
  ],
  isPokemonFavorited
);

export default router;
