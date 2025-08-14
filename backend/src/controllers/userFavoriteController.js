import mongoose from 'mongoose';
import UserFavorite from '../models/UserFavorite.js';
import { validationResult } from 'express-validator';

// Extract only essential Pokémon data
const extractEssentialPokemonData = (pokemon) => ({
  id: pokemon.id,
  name: pokemon.name,
  sprites: {
    front_default: pokemon.sprites?.front_default || '',
    other: {
      'official-artwork': {
        front_default: pokemon.sprites?.other?.['official-artwork']?.front_default || ''
      }
    }
  },
  types: Array.isArray(pokemon.types) 
    ? pokemon.types.map(t => ({
        slot: t.slot,
        type: {
          name: t.type?.name || '',
          url: t.type?.url || ''
        }
      }))
    : []
});

export const getUserFavorites = async (req, res, next) => {
  try {
    // Get userId from query parameters or use the authenticated user's ID or 'anonymous'
    const userId = req.query.userId || req.user?.id || 'anonymous';
    
    // If no userId is provided, return an empty array
    if (!userId) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }
    
    const favorites = await UserFavorite.find({ userId });
    
    // Map to ensure we only return essential data
    const simplifiedFavorites = favorites.map(fav => ({
      _id: fav._id,
      userId: fav.userId,
      pokemonId: fav.pokemonId,
      addedAt: fav.addedAt,
      pokemonData: fav.pokemonData // Already filtered by the model
    }));
    
    res.status(200).json({
      success: true,
      data: simplifiedFavorites
    });
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    // Return empty array on error to ensure the frontend doesn't break
    res.status(200).json({
      success: true,
      data: []
    });
  }
};

export const toggleFavorite = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { pokemon } = req.body;
    
    // Get userId from query parameter or authenticated user or default to 'anonymous'
    const userId = req.query.userId || req.user?.id || 'anonymous';

    if (!pokemon || !pokemon.id) {
      return res.status(400).json({ 
        success: false, 
        error: {
          code: 'INVALID_INPUT',
          message: 'Dados do Pokémon são obrigatórios'
        }
      });
    }

    // Check if user has reached the maximum number of favorites (200)
    const favoritesCount = await UserFavorite.countDocuments({ userId });
    if (favoritesCount >= 200) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MAX_FAVORITES_REACHED',
          message: 'Limite máximo de 200 favoritos atingido'
        }
      });
    }

    const essentialData = extractEssentialPokemonData(pokemon);

    // Check if the Pokémon is already favorited
    let favorite = await UserFavorite.findOne({ 
      userId,
      pokemonId: pokemon.id
    });

    if (favorite) {
      // Remove from favorites
      await UserFavorite.deleteOne({ _id: favorite._id });
      return res.status(200).json({ 
        success: true, 
        isFavorited: false,
        message: 'Pokémon removido dos favoritos com sucesso',
        favorite: {
          ...favorite.toObject(),
          pokemonData: essentialData
        }
      });
    } else {
      // Add to favorites with only essential data
      favorite = new UserFavorite({
        userId,
        pokemonId: pokemon.id,
        pokemonData: essentialData
      });
      
      await favorite.save();
      
      return res.status(200).json({ 
        success: true, 
        isFavorited: true,
        message: 'Pokémon adicionado aos favoritos com sucesso',
        favorite: {
          ...favorite.toObject(),
          pokemonData: essentialData
        }
      });
    }
  } catch (error) {
    console.error('Erro ao alternar favorito:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro ao atualizar favoritos',
      error: error.message 
    });
  }
};

export const isPokemonFavorited = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(200).json({
        success: true,
        data: { isFavorited: false }
      });
    }

    const { pokemonId } = req.params;
    
    if (!pokemonId) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: 'ID do Pokémon é obrigatório'
        }
      });
    }

    // Usar o ID do usuário autenticado ou 'anonymous' se não estiver autenticado
    const userId = req.user?.id || 'anonymous';
    const isFavorited = await UserFavorite.isFavorited(userId, pokemonId);
    
    res.status(200).json({
      success: true,
      data: { isFavorited }
    });
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    next(error);
  }
};
