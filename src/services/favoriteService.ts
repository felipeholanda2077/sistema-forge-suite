import { Pokemon } from './pokemonApi';

const API_BASE_URL = 'https://backend-sitema-forge-suite.vercel.app/api';

interface ApiErrorResponse {
  message?: string;
  error?: {
    message?: string;
    code?: string;
  };
}

class ApiError extends Error {
  response?: ApiErrorResponse;

  constructor(message: string, response?: ApiErrorResponse) {
    super(message);
    this.name = 'ApiError';
    this.response = response;
  }
}

export const favoriteService = {
  async getFavorites(token: string): Promise<Pokemon[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/favorites`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new ApiError(
          responseData.message || 'Failed to fetch favorites',
          responseData
        );
      }

      return responseData.data || [];
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  },

  async toggleFavorite(token: string, pokemon: Pokemon): Promise<{ isFavorited: boolean }> {
    try {
      const essentialData = {
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
        types: pokemon.types || []
      };

      const response = await fetch(`${API_BASE_URL}/favorites/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ pokemonData: essentialData })
      });

      if (!response.ok) {
        throw new Error('Failed to toggle favorite');
      }

      const responseData = await response.json();
      return responseData.data || { isFavorited: false };
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  },

  async isPokemonFavorited(token: string, pokemonId: number): Promise<{ isFavorited: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/favorites/check/${pokemonId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        // If not found, return not favorited instead of throwing
        if (response.status === 404) {
          return { isFavorited: false };
        }
        throw new ApiError(
          responseData.message || 'Failed to check favorite status',
          responseData
        );
      }

      return responseData.data || { isFavorited: false };
    } catch (error) {
      console.error('Error checking favorite status:', error);
      // Return not favorited as fallback
      return { isFavorited: false };
    }
  },
};
