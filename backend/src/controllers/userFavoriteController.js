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
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Usuário não autenticado'
        }
      });
    }

    const favorites = await UserFavorite.find({ userId: req.user.id });
    
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
    next(error);
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

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Usuário não autenticado'
        }
      });
    }

    const { pokemon } = req.body;
    const userId = req.user.id;

    if (!pokemon || !pokemon.id) {
      return res.status(400).json({ 
        success: false, 
        error: {
          code: 'INVALID_INPUT',
          message: 'Dados do Pokémon são obrigatórios'
        }
      });
    }

    const essentialData = extractEssentialPokemonData(pokemon);

    let favorite = await UserFavorite.findOne({ 
      userId: new mongoose.Types.ObjectId(userId),
      'pokemonData.id': pokemon.id
    });

    if (favorite) {
      // Remove from favorites
      await UserFavorite.deleteOne({ _id: favorite._id });
      return res.status(200).json({ 
        success: true, 
        isFavorite: false,
        message: 'Pokémon removido dos favoritos com sucesso'
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
        isFavorite: true,
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

    const isFavorited = await UserFavorite.isFavorited(req.user.id, pokemonId);
    
    res.status(200).json({
      success: true,
      data: { isFavorited }
    });
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    next(error);
  }
};
