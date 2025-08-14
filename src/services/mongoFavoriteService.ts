import type { Pokemon } from './pokemonApi';
import { pokemonApi } from './pokemonApi';
import { toast } from '@/components/ui/use-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface FavoriteResponse {
  success: boolean;
  isFavorited: boolean;
  message?: string;
}

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
}

interface ApiErrorData {
  message?: string;
  code?: string;
  [key: string]: unknown;
}

export class ApiError extends Error {
  response: Response;
  status?: number;
  data?: ApiErrorData;

  constructor(message: string, response: Response, data?: ApiErrorData) {
    super(message);
    this.name = 'ApiError';
    this.response = response;
    this.status = response.status;
    this.data = data;
  }
}

const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const getUserIdFromToken = (): string => {
  const token = getAuthToken();
  if (!token) return '';
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || '';
  } catch (error) {
    console.error('Error decoding token:', error);
    return '';
  }
};

const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const authToken = getAuthToken();
  const userId = getUserIdFromToken();

  if (!authToken) {
    throw new ApiError('Authentication token is missing', new Response(
      JSON.stringify({ error: 'Authentication token is missing' }),
      {
        status: 401,
        statusText: 'Unauthorized',
        headers: { 'Content-Type': 'application/json' }
      }
    ));
  }

  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${authToken}`);
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  
  // Only add userId to the URL if it's not already in the path
  let finalUrl = url;
  if (userId && !url.includes('/user/')) {
    const separator = url.includes('?') ? '&' : '?';
    finalUrl = `${url}${separator}userId=${encodeURIComponent(userId)}`;
  }

  const response = await fetch(finalUrl, { 
    ...options,
    headers,
    credentials: 'include',
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    
    throw new ApiError(
      errorData.message || 'Request failed',
      response
    );
  }

  return response;
};

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface BaseSprite {
  front_default: string | null;
  front_shiny: string | null;
  front_female?: string | null;
  front_shiny_female?: string | null;
  back_default?: string | null;
  back_shiny?: string | null;
  back_female?: string | null;
  back_shiny_female?: string | null;
}

interface OfficialArtworkSprite {
  front_default: string | null;
  front_shiny: string | null;
}

interface DreamWorldSprite {
  front_default: string | null;
  front_female: string | null;
}

interface HomeSprite {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

interface ShowdownSprite extends BaseSprite {
  front_transparent?: string | null;
  back_transparent?: string | null;
}

type PokemonSprites = BaseSprite & {
  other?: {
    'official-artwork'?: OfficialArtworkSprite;
    dream_world?: DreamWorldSprite;
    home?: HomeSprite;
    showdown?: ShowdownSprite;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

interface PokemonData {
  id?: number;
  pokemonId?: number;
  name: string;
  sprites?: PokemonSprites;
  types?: PokemonType[];
  height?: number;
  weight?: number;
  base_experience?: number;
  abilities?: PokemonAbility[];
  stats?: PokemonStat[];
}

// Helper function to ensure we have proper default values for required fields
const ensurePokemonData = (data: PokemonData): Pokemon => {
  const sprites = data.sprites || {} as PokemonSprites;
  const officialArtwork = sprites.other?.['official-artwork'] || {} as OfficialArtworkSprite;
  
  return {
    id: data.pokemonId || data.id || 0,
    name: data.name,
    sprites: {
      ...sprites,
      front_default: sprites.front_default || '',
      front_shiny: sprites.front_shiny || '',
      back_default: sprites.back_default || '',
      back_shiny: sprites.back_shiny || '',
      other: {
        ...sprites.other,
        'official-artwork': {
          front_default: officialArtwork.front_default || '',
          front_shiny: officialArtwork.front_shiny || ''
        }
      }
    },
    types: data.types || [],
    height: data.height || 0,
    weight: data.weight || 0,
    base_experience: data.base_experience || 0,
    abilities: data.abilities || [],
    stats: data.stats || []
  } as Pokemon; // Safe cast as we're ensuring all required fields are present
};

const mapPokemonData = (data: PokemonData): Pokemon => {
  const sprites = data.sprites || {} as PokemonSprites;
  const other = sprites.other || {};
  
  return ensurePokemonData({
    ...data,
    id: data.pokemonId || data.id,
    sprites: {
      ...sprites,
      other: {
        ...other,
        'official-artwork': {
          ...(other['official-artwork'] || {} as OfficialArtworkSprite)
        }
      }
    },
    types: Array.isArray(data.types) ? data.types : [],
    height: data.height || 0,
    weight: data.weight || 0,
    base_experience: data.base_experience || 0,
    abilities: Array.isArray(data.abilities) ? data.abilities : [],
    stats: Array.isArray(data.stats) ? data.stats : []
  });
};

export const mongoFavoriteService = {
  // Get user-specific favorites
  async getFavoritesForUser(userId: string): Promise<Pokemon[]> {
    // Reject empty or 'anonymous' user IDs
    if (!userId || userId === 'anonymous') {
      console.error('Invalid or missing user ID provided to getFavoritesForUser:', userId);
      throw new Error('ID de usuário inválido ou não autenticado');
    }

    console.log(`[getFavoritesForUser] Fetching favorites for user: ${userId}`);
    
    try {
      // First try with query parameter format
      const response = await fetchWithAuth(`${API_BASE_URL}/favorites?userId=${encodeURIComponent(userId)}`);
      console.log('[getFavoritesForUser] Response status:', response.status);
      
      if (!response.ok) {
        console.error('[getFavoritesForUser] Error response:', await response.text().catch(() => 'Could not parse error response'));
        
        // If 404, try with the alternative endpoint format
        if (response.status === 404) {
          console.log('[getFavoritesForUser] Trying alternative endpoint format...');
          const altResponse = await fetchWithAuth(`${API_BASE_URL}/favorites/user/${encodeURIComponent(userId)}`);
          
          if (!altResponse.ok) {
            const errorText = await altResponse.text().catch(() => 'Unknown error');
            console.error(`[getFavoritesForUser] Alternative endpoint failed: ${altResponse.status} - ${errorText}`);
            throw new Error(`Failed to fetch favorites: ${altResponse.statusText}`);
          }
          
          const altResult = await altResponse.json();
          console.log('[getFavoritesForUser] Alternative endpoint result:', altResult);
          
          // Handle the response format: { success: true, data: [{ _id, userId, pokemonId, ... }] }
          const favoritesData = Array.isArray(altResult) ? altResult : (altResult.data || []);
          
          if (!Array.isArray(favoritesData)) {
            console.error('[getFavoritesForUser] Invalid favorites data format:', favoritesData);
            return [];
          }
          
          // Map the response to Pokemon objects with all details
          const pokemonPromises = favoritesData
            .filter((item: { pokemonId: number }) => item && item.pokemonId)
            .map(async (item: { pokemonId: number }) => {
              try {
                // Fetch full Pokémon details using the correct method
                const pokemon = await pokemonApi.getPokemon(item.pokemonId);
                return pokemon;
              } catch (error) {
                console.error(`Error fetching details for Pokémon ${item.pokemonId}:`, error);
                return null;
              }
            });
          
          // Wait for all Pokémon details to be fetched
          const pokemons = await Promise.all(pokemonPromises);
          
          // Filter out any failed fetches
          return pokemons.filter((p): p is Pokemon => p !== null);
        }
        
        throw new Error(`Failed to fetch favorites: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('[getFavoritesForUser] Favorites API response:', result);
      
      // Handle the response format: { success: true, data: [{ _id, userId, pokemonId, ... }] }
      const favoritesData = Array.isArray(result) ? result : (result.data || []);
      
      if (!Array.isArray(favoritesData)) {
        console.error('[getFavoritesForUser] Invalid favorites data format:', favoritesData);
        return [];
      }
      
      // Map the response to Pokemon objects with all details
      const pokemonPromises = favoritesData
        .filter((item: { pokemonId: number }) => item && item.pokemonId)
        .map(async (item: { pokemonId: number }) => {
          try {
            // Fetch full Pokémon details using the correct method
            const pokemon = await pokemonApi.getPokemon(item.pokemonId);
            return pokemon;
          } catch (error) {
            console.error(`Error fetching details for Pokémon ${item.pokemonId}:`, error);
            return null;
          }
        });
      
      // Wait for all Pokémon details to be fetched
      const pokemons = await Promise.all(pokemonPromises);
      
      // Filter out any failed fetches
      return pokemons.filter((p): p is Pokemon => p !== null);
        
    } catch (error) {
      console.error('[getFavoritesForUser] Failed to fetch user favorites:', error);
      if (error instanceof ApiError && error.status === 401) {
        console.log('[getFavoritesForUser] Unauthorized, redirecting to login');
        window.location.href = '/login';
      }
      return [];
    }
  },
  
  // Get favorites for the current user
  async getFavorites(): Promise<Pokemon[]> {
    const userId = getUserIdFromToken();
    
    // If no user ID or it's 'anonymous', return empty array
    if (!userId || userId === 'anonymous') {
      console.log('[getFavorites] No valid user ID, returning empty favorites');
      return [];
    }
    
    try {
      return await this.getFavoritesForUser(userId);
    } catch (error) {
      console.error('[getFavorites] Error fetching favorites:', error);
      return [];
    }
  },

  async toggleFavorite(pokemon: Pokemon): Promise<{ isFavorited: boolean; error?: string }> {
    const userId = getUserIdFromToken();
    
    // Ensure we have a valid user ID and it's not 'anonymous'
    if (!userId || userId === 'anonymous') {
      console.error('Invalid or missing user ID in token');
      throw new Error('Você precisa estar autenticado para favoritar um Pokémon');
    }
    
    console.log(`[toggleFavorite] Toggling favorite for user: ${userId}, Pokémon: ${pokemon.id}`);

    // First, check if the Pokémon is already favorited by any user
    try {
      const checkResponse = await fetchWithAuth(`${API_BASE_URL}/favorites/check-global/${pokemon.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (checkResponse.ok) {
        const checkResult = await checkResponse.json();
        if (checkResult.isFavorited && checkResult.userId && checkResult.userId !== userId) {
          // Pokémon is already favorited by another user
          return { 
            isFavorited: false, 
            error: `Este Pokémon já foi favoritado por outro usuário.`
          };
        }
      }
    } catch (error) {
      console.warn('Error checking global favorite status, continuing with toggle:', error);
    }
    try {
      const requestBody = {
        userId,
        pokemonId: pokemon.id,
        pokemon: {
          id: pokemon.id,
          name: pokemon.name,
          sprites: {
            front_default: pokemon.sprites?.front_default || '',
            front_shiny: pokemon.sprites?.front_shiny || '',
            back_default: pokemon.sprites?.back_default || '',
            back_shiny: pokemon.sprites?.back_shiny || '',
            other: {
              'official-artwork': {
                front_default: pokemon.sprites?.other?.['official-artwork']?.front_default || ''
              }
            }
          },
          types: Array.isArray(pokemon.types) ? pokemon.types : [],
          height: pokemon.height || 0,
          weight: pokemon.weight || 0,
          base_experience: pokemon.base_experience || 0,
          abilities: Array.isArray(pokemon.abilities) ? pokemon.abilities : [],
          stats: Array.isArray(pokemon.stats) ? pokemon.stats : []
        }
      };

      const response = await fetchWithAuth(`${API_BASE_URL}/favorites/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Request failed';
        try {
          const errorData = JSON.parse(errorText) as { message?: string };
          errorMessage = errorData?.message || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        throw new ApiError(errorMessage, response);
      }
      
      const result: FavoriteResponse = await response.json();
      return { 
        isFavorited: result.isFavorited,
        error: result.message
      };
      
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      if (error instanceof ApiError && error.status === 401) {
        // Handle unauthorized error (token expired, etc.)
        window.location.href = '/login';
      }
      throw error;
    }
  },

  async isPokemonFavorited(pokemonId: number): Promise<boolean> {
    const userId = getUserIdFromToken();
    if (!userId) return false;
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/favorites/check/${pokemonId}?userId=${userId}`);
      
      if (!response.ok) {
        // If the resource is not found, the Pokemon is not favorited
        if (response.status === 404) {
          return false;
        }
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || 'Failed to check favorite status',
          response,
          errorData
        );
      }
      
      const result: FavoriteResponse = await response.json();
      return result.isFavorited;
    } catch (error) {
      console.error('Failed to check if Pokemon is favorited:', error);
      if (error instanceof ApiError && error.status === 401) {
        window.location.href = '/login';
      }
      return false;
    }
  }
};
