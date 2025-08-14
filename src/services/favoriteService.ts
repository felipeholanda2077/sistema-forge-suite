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
  [key: string]: unknown; // Allow additional properties with unknown type for better type safety
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
  const token = localStorage.getItem('authToken');
  console.log('getAuthToken - Token from localStorage:', token ? 'Token found' : 'No token found');
  return token;
};

// Helper function to handle API requests with token
const fetchWithAuth = async (url: string, options: RequestInit = {}, token?: string): Promise<Response> => {
  try {
    // Get token from parameter or storage
    const authToken = token || getAuthToken();
    console.log('fetchWithAuth - Using token:', authToken ? 'Token available' : 'No token available');
    
    if (!authToken) {
      console.error('fetchWithAuth - No authentication token available');
      const errorResponse: ApiErrorResponse = {
        data: { error: { code: 'MISSING_TOKEN', message: 'Authentication token is missing' } },
        status: 401,
        statusText: 'Unauthorized'
      };
      throw new ApiError('No authentication token available', errorResponse);
    }

    // Create headers object, ensuring our auth and content type headers are set correctly
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${authToken}`);
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const response = await fetch(url, { 
      ...options,
      headers,
      credentials: 'include', // Important for cookies if using httpOnly
      body: options.body // Ensure body is passed through correctly
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
    console.log('🔍 getFavorites - Iniciando busca por favoritos');
    console.log('📡 Fazendo requisição para:', `${API_BASE_URL}/favorites`);
    
    try {
      // Use fetchWithAuth which will handle the token and headers automatically
      const response = await fetchWithAuth(
        `${API_BASE_URL}/favorites`,
        { 
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        },
        token // Pass the token if provided, otherwise fetchWithAuth will get it from storage
      );
      
      console.log('✅ getFavorites - Resposta recebida, status:', response.status);
      const result = await response.json();
      console.log('📦 getFavorites - Dados brutos da resposta:', JSON.stringify(result, null, 2));
      
      // Handle different response formats
      if (result.success === false) {
        console.warn('⚠️ getFavorites - API retornou success:false:', result.message);
        return [];
      }
      
      // Extrair os dados dos Pokémon da resposta
      const data = Array.isArray(result.data) ? result.data : [];
      console.log(`📊 getFavorites - Encontrados ${data.length} itens de dados`);
      
      if (data.length === 0) {
        console.log('ℹ️ getFavorites - Nenhum favorito encontrado');
        return [];
      }
      
      // Mapear para o formato esperado pelo frontend
      const favorites = data.map((item, index) => {
        console.log(`🔹 Processando item ${index + 1}/${data.length}`, item);
        
        // Se tiver pokemonData, extrai os dados do Pokémon
        if (item.pokemonData) {
          console.log(`🔄 Processando pokemonData para o Pokémon ${item.pokemonData.name || 'sem nome'}`);
          const pokemon = {
            ...item.pokemonData,
            id: item.pokemonId || item.pokemonData.id,
            name: item.pokemonData.name,
            sprites: {
              ...item.pokemonData.sprites,
              front_default: item.pokemonData.sprites?.front_default || '',
              front_shiny: item.pokemonData.sprites?.front_shiny || '',
              back_default: item.pokemonData.sprites?.back_default || '',
              back_shiny: item.pokemonData.sprites?.back_shiny || '',
              other: {
                ...item.pokemonData.sprites?.other,
                'official-artwork': {
                  front_default: item.pokemonData.sprites?.other?.['official-artwork']?.front_default || ''
                }
              }
            },
            types: Array.isArray(item.pokemonData.types) 
              ? item.pokemonData.types 
              : []
          };
          console.log(`✅ Pokémon processado:`, pokemon);
          return pokemon as Pokemon;
        }
        
        // Se não tiver pokemonData, tenta extrair do item diretamente
        console.log('ℹ️ Processando item sem pokemonData');
        const pokemon = {
          ...item,
          id: item.pokemonId || item.id,
          name: item.name,
          sprites: {
            front_default: item.sprites?.front_default || '',
            front_shiny: item.sprites?.front_shiny || '',
            back_default: item.sprites?.back_default || '',
            back_shiny: item.sprites?.back_shiny || '',
            other: {
              'official-artwork': {
                front_default: item.sprites?.other?.['official-artwork']?.front_default || ''
              }
            }
          },
          types: Array.isArray(item.types) ? item.types : [],
          height: item.height || 0,
          weight: item.weight || 0,
          base_experience: item.base_experience || 0,
          abilities: Array.isArray(item.abilities) ? item.abilities : [],
          stats: Array.isArray(item.stats) ? item.stats : []
        };
        console.log(`✅ Pokémon processado (diretamente do item):`, pokemon);
        return pokemon as Pokemon;
      });
      
      console.log('getFavorites - Processed favorites:', favorites);
      return favorites;
      
    } catch (error) {
      console.error('getFavorites - Error fetching favorites:', error);
      
      // For ApiError, we might want to handle specific error codes differently
      if (error instanceof ApiError) {
        // If it's an authentication error, we might want to clear the token
        if (error.response?.status === 401) {
          console.warn('getFavorites - Authentication error, clearing token');
          localStorage.removeItem('authToken');
        }
        // Re-throw to let the caller handle it
        throw error;
      }
      
      // For other errors, just return an empty array as before
      return [];
    }
  },

  async toggleFavorite(pokemon: Pokemon): Promise<{ isFavorited: boolean }> {
    console.log('toggleFavorite - Starting to toggle favorite for pokemon:', pokemon.id);
    
    // Prepare the request data
    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      })
    };

    try {
      // Usar fetch diretamente para ter mais controle sobre o fluxo
      const authToken = getAuthToken();
      const headers = new Headers(requestData.headers);
      
      if (authToken) {
        headers.set('Authorization', `Bearer ${authToken}`);
      }
      
      const response = await fetch(`${API_BASE_URL}/favorites/toggle`, {
        ...requestData,
        headers,
        credentials: 'include'
      });
      
      // Verificar se a resposta foi bem-sucedida
      if (!response.ok) {
        let errorMessage = 'Erro ao atualizar favoritos';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          
          // Se for erro de autenticação, limpar o token
          if (response.status === 401) {
            localStorage.removeItem('authToken');
            errorMessage = 'Sua sessão expirou. Por favor, faça login novamente.';
          }
          
          throw new ApiError(errorMessage, {
            status: response.status,
            statusText: response.statusText,
            data: errorData
          });
        } catch (e) {
          // Se não conseguir ler o JSON de erro
          throw new ApiError(errorMessage, {
            status: response.status,
            statusText: response.statusText,
            data: {}
          });
        }
      }
      
      // Se chegou aqui, a requisição foi bem-sucedida
      const result = await response.json();
      console.log('✅ toggleFavorite - Favorite toggled successfully:', result);
      
      // Garantir que retornamos um booleano
      return { 
        isFavorited: result.isFavorited === true || result.isFavorited === 'true' || false 
      };
      
    } catch (error) {
      console.error('❌ toggleFavorite - Error toggling favorite:', error);
      
      if (error instanceof ApiError) {
        console.error('API Error details:', error.response);
        throw error;
      }
      
      // Para outros tipos de erros, lançar uma mensagem amigável
      throw new Error('Não foi possível atualizar seus favoritos. Verifique sua conexão e tente novamente.');
    }
  },

  async isPokemonFavorited(pokemonId: number, token?: string): Promise<{ isFavorited: boolean }> {
    console.log(`🔍 isPokemonFavorited - Verificando se o Pokémon ${pokemonId} está favoritado`);
    
    try {
      // Usar fetch diretamente para ter mais controle sobre o fluxo
      const authToken = token || getAuthToken();
      const headers = new Headers({
        'Accept': 'application/json',
      });
      
      if (authToken) {
        headers.set('Authorization', `Bearer ${authToken}`);
      }
      
      const response = await fetch(`${API_BASE_URL}/favorites/check/${pokemonId}`, {
        method: 'GET',
        headers,
        credentials: 'include'
      });
      
      // Se a resposta for 404, o Pokémon não está favoritado
      if (response.status === 404) {
        console.log(`ℹ️  isPokemonFavorited - Pokémon ${pokemonId} não encontrado nos favoritos`);
        return { isFavorited: false };
      }
      
      // Verificar se a resposta foi bem-sucedida
      if (!response.ok) {
        let errorMessage = 'Erro ao verificar favorito';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          
          // Se for erro de autenticação, limpar o token
          if (response.status === 401) {
            console.warn('🔒 isPokemonFavorited - Erro de autenticação, limpando token');
            localStorage.removeItem('authToken');
            errorMessage = 'Sua sessão expirou. Por favor, faça login novamente.';
          }
          
          throw new ApiError(errorMessage, {
            status: response.status,
            statusText: response.statusText,
            data: errorData
          });
        } catch (e) {
          // Se não conseguir ler o JSON de erro
          throw new ApiError(errorMessage, {
            status: response.status,
            statusText: response.statusText,
            data: {}
          });
        }
      }
      
      // Se chegou aqui, a requisição foi bem-sucedida
      const result = await response.json();
      console.log(`✅ isPokemonFavorited - Verificação concluída para o Pokémon ${pokemonId}:`, result);
      
      // Verificar diferentes formatos de resposta
      if (result.success === false) {
        console.warn(`⚠️  isPokemonFavorited - API retornou success:false para o Pokémon ${pokemonId}:`, result.message);
        return { isFavorited: false };
      }
      
      // O isFavorited pode estar em result.data ou diretamente em result
      const isFavorited = result.isFavorited === true || 
                         result.isFavorited === 'true' || 
                         (result.data && (result.data.isFavorited === true || result.data.isFavorited === 'true'));
      
      console.log(`ℹ️  isPokemonFavorited - Pokémon ${pokemonId} está favoritado?`, isFavorited);
      return { isFavorited };
      
    } catch (error) {
      console.error(`❌ isPokemonFavorited - Erro ao verificar se o Pokémon ${pokemonId} está favoritado:`, error);
      
      if (error instanceof ApiError) {
        console.error('Detalhes do erro da API:', error.response);
        
        // Para erros de autenticação, já tratamos no bloco try
        // Para 404, o Pokémon não está favoritado
        if (error.response?.status === 404) {
          return { isFavorited: false };
        }
        
        // Se for um erro de autenticação, já limpamos o token
        if (error.response?.status === 401) {
          return { isFavorited: false };
        }
      }
      
      // Para outros erros, assumir que não está favoritado para não bloquear a UI
      return { isFavorited: false };
    }
  },
};
