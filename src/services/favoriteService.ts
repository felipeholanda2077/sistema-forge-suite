import { Pokemon } from './pokemonApi';
import { authService } from './authService';

// Use environment variable if available, otherwise fall back to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

interface ApiErrorResponse {
  data: {
    error?: {
      code: string;
      message: string;
    };
    message?: string;
  };
  status: number;
  statusText: string;
  [key: string]: any; // Allow additional properties
}

export class ApiError extends Error {
  response?: ApiErrorResponse;

  constructor(message: string, response?: ApiErrorResponse) {
    super(message);
    this.name = 'ApiError';
    this.response = response;
  }
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper function to handle API requests with token
const fetchWithAuth = async (url: string, options: RequestInit = {}, token?: string): Promise<Response> => {
  try {
    // Get token from parameter or storage
    const authToken = token || getAuthToken();
    
    if (!authToken) {
      const errorResponse: ApiErrorResponse = {
        data: { error: { code: 'MISSING_TOKEN', message: 'Authentication token is missing' } },
        status: 401,
        statusText: 'Unauthorized'
      };
      throw new ApiError('No authentication token available', errorResponse);
    }

    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, { 
      ...options, 
      headers,
      credentials: 'include' // Important for cookies if using httpOnly
    });
    
    const data = await response.json().catch(() => ({}));

    // Handle token expiration or invalidation
    if (response.status === 401) {
      if (data.error?.code === 'INVALID_TOKEN' || data.error?.code === 'TOKEN_EXPIRED') {
        // Clear tokens and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        throw new ApiError('Sessão expirada. Por favor, faça login novamente.', data);
      }
      throw new ApiError(data.error?.message || 'Não autorizado', data);
    }

    if (!response.ok) {
      throw new ApiError(data.message || 'Erro na requisição', data);
    }

    return response;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Erro de conexão. Por favor, tente novamente.');
  }
};

export const favoriteService = {
  async getFavorites(token?: string): Promise<Pokemon[]> {
    try {
      if (!token) {
        console.warn('No authentication token provided');
        return [];
      }

      const response = await fetchWithAuth(
        `${API_BASE_URL}/favorites`,
        { 
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        },
        token
      );
      
      const { data, success } = await response.json();
      if (!success) {
        throw new Error('Failed to fetch favorites');
      }
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching favorites:', error);
      // Return empty array for any error
      return [];
    }
  },

  async toggleFavorite(pokemon: Pokemon, token?: string): Promise<{ isFavorited: boolean }> {
    try {
      if (!token) {
        console.warn('No authentication token provided');
        return { isFavorited: false };
      }

      const response = await fetchWithAuth(
        `${API_BASE_URL}/favorites/toggle`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ 
            pokemonData: {
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
              types: Array.isArray(pokemon.types) ? pokemon.types : []
            }
          }),
        },
        token
      );

      const { data, success } = await response.json();
      if (!success) {
        throw new Error('Failed to toggle favorite');
      }
      return data || { isFavorited: false };
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return { isFavorited: false };
    }
  },

  async isPokemonFavorited(pokemonId: number, token?: string): Promise<{ isFavorited: boolean }> {
    try {
      if (!token) {
        console.warn('No authentication token provided');
        return { isFavorited: false };
      }

      const response = await fetchWithAuth(
        `${API_BASE_URL}/favorites/check/${pokemonId}`,
        { 
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        },
        token
      );

      const { data, success } = await response.json();
      if (!success) {
        return { isFavorited: false };
      }
      return data || { isFavorited: false };
    } catch (error) {
      // For any error, assume not favorited
      return { isFavorited: false };
    }
  },
};
