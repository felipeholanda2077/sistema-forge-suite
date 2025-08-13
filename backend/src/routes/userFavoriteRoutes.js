import express from 'express';
import { body, param } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { 
  getUserFavorites, 
  toggleFavorite, 
  isPokemonFavorited 
} from '../controllers/userFavoriteController.js';

const router = express.Router();

// Middleware to protect all favorite routes
router.use(authenticateToken);

// Get all favorites for the authenticated user
router.get('/', getUserFavorites);

// Toggle favorite status for a Pokémon
router.post(
  '/toggle',
  [
    body('pokemonData').isObject().withMessage('Dados do Pokémon são obrigatórios'),
    body('pokemonData.id').isNumeric().withMessage('ID do Pokémon é inválido')
  ],
  toggleFavorite
);

// Check if a specific Pokémon is favorited by the user
router.get(
  '/check/:pokemonId',
  [
    param('pokemonId').isNumeric().withMessage('ID do Pokémon deve ser um número')
  ],
  isPokemonFavorited
);

export default router;
