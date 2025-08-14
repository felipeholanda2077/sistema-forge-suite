import type { Pokemon } from './pokemonApi';
import { pokemonApi } from './pokemonApi';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

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

interface TokenPayload {
  userId: string;
  email: string;
  exp: number;
  iat: number;
}

const TOKEN_REFRESH_THRESHOLD = 300; // 5 minutos antes de expirar

const parseJwt = (token: string): TokenPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  const payload = parseJwt(token);
  if (!payload) return true;
  
  // Verifica se o token expirou ou está perto de expirar
  const now = Date.now() / 1000;
  return payload.exp < now - TOKEN_REFRESH_THRESHOLD;
};

const getAuthToken = (): string | null => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  
  // Se o token estiver válido, retorna ele
  if (!isTokenExpired(token)) {
    return token;
  }
  
  // Se o token estiver expirado, tenta renovar
  return refreshToken();
};

const refreshToken = (): string | null => {
  // Tenta renovar o token usando o refresh token se disponível
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    // Se não tiver refresh token, limpa os tokens e redireciona para o login
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    return null;
  }
  
  // Aqui você implementaria a lógica para renovar o token
  // Por enquanto, vamos apenas retornar null para forçar o login
  console.warn('Token expirado. Por favor, faça login novamente.');
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
  return null;
};

const getUserIdFromToken = (): string => {
  const token = getAuthToken();
  if (!token) return 'anonymous';
  
  const payload = parseJwt(token);
  return payload?.userId?.toString() || 'anonymous';
};

const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const authToken = getAuthToken();
  const userId = getUserIdFromToken();

  // Configuração dos headers
  const headers = new Headers(options.headers);
  
  // Adiciona o token de autorização se existir
  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }
  
  // Headers padrão
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  // Create URL object to handle query parameters properly
  const urlObj = new URL(url, window.location.origin);
  
  // Add userId to query parameters if not already present
  if (userId && !urlObj.searchParams.has('userId')) {
    urlObj.searchParams.set('userId', userId);
  } else if (!urlObj.searchParams.has('userId')) {
    urlObj.searchParams.set('userId', 'anonymous');
  }

  const finalUrl = urlObj.toString();
  console.log('Fetching URL:', finalUrl);
  
  try {
    const fetchOptions: RequestInit = {
      ...options,
      headers,
      // Use 'include' for credentials to ensure cookies are sent with CORS
      credentials: 'include',
      mode: 'cors',
      cache: 'no-cache'
    };

    console.log('Fetch options:', {
      method: fetchOptions.method || 'GET',
      headers: Object.fromEntries(headers.entries()),
      credentials: fetchOptions.credentials
    });

    try {
      // Convert Headers to a plain object
      const headers: Record<string, string> = {};
      if (fetchOptions.headers) {
        if (fetchOptions.headers instanceof Headers) {
          // Handle Headers object
          fetchOptions.headers.forEach((value, key) => {
            headers[key] = value;
          });
        } else if (Array.isArray(fetchOptions.headers)) {
          // Handle array of [key, value] tuples
          fetchOptions.headers.forEach(([key, value]) => {
            headers[key] = value;
          });
        } else if (typeof fetchOptions.headers === 'object') {
          // Handle plain object
          Object.entries(fetchOptions.headers).forEach(([key, value]) => {
            headers[key] = String(value);
          });
        }
      }

      const response = await axios({
        url: finalUrl,
        method: (fetchOptions.method as string) || 'GET',
        headers,
        data: fetchOptions.body,
        withCredentials: true,
        responseType: 'json'
      });
      
      console.log('Response status:', response.status, response.statusText);
      
      // Convert Axios response to Fetch-like response
      return {
        ok: response.status >= 200 && response.status < 300,
        status: response.status,
        statusText: response.statusText,
        json: async () => response.data,
        text: async () => JSON.stringify(response.data),
        headers: new Headers(response.headers as Record<string, string>),
        url: finalUrl
      } as unknown as Response;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        console.error('API Error:', data);
        
        if (status === 401) {
          console.log('Authentication failed, redirecting to login');
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        
        throw new ApiError(
          data?.message || `Request failed with status ${status}`,
          error.response,
          data
        );
      }
      
      throw error;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network request failed',
      new Response(null, { status: 0 })
    );
  }
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
  // Get user-specific favorites (supports anonymous users)
  async getFavoritesForUser(userId: string): Promise<Pokemon[]> {
    // If no user ID is provided, default to 'anonymous'
    if (!userId) {
      userId = 'anonymous';
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
      if (error instanceof ApiError) {
        if (error.status === 401 && userId !== 'anonymous') {
          console.log('[getFavoritesForUser] Unauthorized, redirecting to login');
          window.location.href = '/login';
        } else if (error.status === 404) {
          console.log('[getFavoritesForUser] No favorites found for user:', userId);
        }
      }
      return [];
    }
  },
  
  // Get favorites for the current user (supports anonymous users)
  async getFavorites(): Promise<Pokemon[]> {
    // Get user ID from token or use 'anonymous' if not authenticated
    const userId = getUserIdFromToken() || 'anonymous';
    
    try {
      return await this.getFavoritesForUser(userId);
    } catch (error) {
      console.error('[getFavorites] Error fetching favorites:', error);
      // Don't redirect to login for anonymous users
      if (error instanceof ApiError && error.status === 401 && userId !== 'anonymous') {
        window.location.href = '/login';
      }
      return [];
    }
  },

  async toggleFavorite(pokemon: Pokemon): Promise<{ isFavorited: boolean; error?: string }> {
    // Get user ID from token or use 'anonymous' if not authenticated
    const userId = getUserIdFromToken() || 'anonymous';
    
    console.log(`[toggleFavorite] Toggling favorite for user: ${userId}, Pokémon: ${pokemon.id}`);

    try {
      // Prepare the request URL with userId as a query parameter
      const url = new URL(`${API_BASE_URL}/favorites/toggle`);
      url.searchParams.append('userId', userId);

      // Prepare the request body with the pokemon data
      const requestBody = {
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
    // Get user ID from token or use 'anonymous' if not authenticated
    const userId = getUserIdFromToken() || 'anonymous';
    
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
      return result.isFavorited || false;
    } catch (error) {
      console.error('Failed to check if Pokemon is favorited:', error);
      // Don't redirect to login for anonymous users
      if (error instanceof ApiError && error.status === 401 && userId !== 'anonymous') {
        window.location.href = '/login';
      }
      return false;
    }
  }
};
