import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle caching headers
api.interceptors.response.use(
  (response) => {
    // You can access cache headers here if needed
    // const cacheStatus = response.headers['x-cache'];
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const pokemonService = {
  /**
   * Get a list of Pokémon with pagination
   */
  async getPokemonList(limit = 20, offset = 0) {
    try {
      const response = await api.get('/public/pokemon', {
        params: { limit, offset },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokémon list:', error);
      throw error;
    }
  },

  /**
   * Get details for a specific Pokémon by ID or name
   */
  async getPokemonDetails(identifier: string | number) {
    try {
      const response = await api.get(`/public/pokemon/${identifier}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokémon details for ${identifier}:`, error);
      throw error;
    }
  },

  /**
   * Search Pokémon by name
   */
  async searchPokemon(query: string) {
    try {
      const response = await api.get('/public/pokemon/search', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching Pokémon:', error);
      throw error;
    }
  },

  /**
   * Get user's favorite Pokémon
   */
  async getFavorites() {
    try {
      const response = await api.get('/protected/favorites');
      return response.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  },

  /**
   * Add a Pokémon to favorites
   */
  async addFavorite(pokemonId: number) {
    try {
      const response = await api.post('/protected/favorites', { pokemonId });
      return response.data;
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  },

  /**
   * Remove a Pokémon from favorites
   */
  async removeFavorite(pokemonId: number) {
    try {
      const response = await api.delete(`/protected/favorites/${pokemonId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  },

  /**
   * Check if a Pokémon is in favorites
   */
  async checkFavoriteStatus(pokemonId: number) {
    try {
      const response = await api.get(`/protected/favorites/check/${pokemonId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      throw error;
    }
  },
};

export default pokemonService;
