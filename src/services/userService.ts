import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:3002/api';

// Interface for the API response
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface UserProfile {
  id?: string;      // Frontend id (can be optional since _id will be used)
  _id?: string;     // MongoDB _id
  name: string;
  email: string;
  favoritePokemons?: number[];
  createdAt?: string;
  updatedAt?: string;
  error?: string;   // For error handling in the frontend
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for sending cookies/session
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
      return Promise.reject({
        status: error.response.status,
        message: error.response.data?.message || 'Ocorreu um erro inesperado',
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error Request:', error.request);
      return Promise.reject({
        status: 503,
        message: 'Servidor indisponível. Tente novamente mais tarde.',
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error:', error.message);
      return Promise.reject({
        status: 500,
        message: 'Erro ao processar a requisição',
      });
    }
  }
);

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  /**
   * Get user profile by ID
   * @param userId - The user ID (can be either id or _id)
   */
  async getProfile(userId: string): Promise<UserProfile> {
    try {
      // Use the correct endpoint with plural 'users'
      const response = await api.get(`/users/${userId}`);
      
      // The backend returns data in a { success, data } format
      if (response.data?.success && response.data.data) {
        const userData = response.data.data;
        return {
          ...userData,
          id: userData.id || userData._id || userId,
          _id: userData._id || userData.id || userId,
        };
      }
      
      throw new Error('Dados do usuário não encontrados na resposta');
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      
      // If we get a 404, try with the full URL as a last resort
      if (error.response?.status === 404) {
        console.log('Trying with full URL...');
        try {
          const altResponse = await axios.get(`http://localhost:3002/api/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (altResponse.data?.success && altResponse.data.data) {
            const userData = altResponse.data.data;
            return {
              ...userData,
              id: userData.id || userData._id || userId,
              _id: userData._id || userData.id || userId,
            };
          }
        } catch (altError) {
          console.error('Full URL attempt also failed:', altError);
        }
      }
      
      throw new Error('Não foi possível carregar o perfil do usuário. Verifique sua conexão e tente novamente.');
    }
  },

  /**
   * Update user profile
   * @param userId - The user ID (can be either id or _id)
   * @param data - The user data to update
   */
  async updateProfile(userId: string, data: { name: string }): Promise<UserProfile> {
    try {
      const response = await api.put<ApiResponse<UserProfile>>(`/users/${userId}`, data);
      
      if (!response.data.data) {
        throw new Error('Falha ao atualizar o perfil');
      }
      
      // Normalize the response to ensure we have both id and _id
      const userData = response.data.data;
      return {
        ...userData,
        id: userData.id || userData._id,
        _id: userData._id || userData.id,
      };
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  /**
   * Get the current user's profile using the authentication token
   */
  /**
   * Change user password
   * @param data - Object containing currentPassword and newPassword
   */
  async changePassword(data: ChangePasswordData): Promise<{ success: boolean; message: string }> {
    try {
      // Get the current user ID from the auth token
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Usuário não autenticado');
      }

      // Decode the token to get user ID
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload.userId || tokenPayload.sub;
      
      if (!userId) {
        throw new Error('ID do usuário não encontrado no token');
      }

      // Log the request payload for debugging (without sensitive data)
      console.log('Sending password change request for user ID:', userId);

      // Use the update profile endpoint with password fields
      // Note: The base URL already includes '/api', so we don't need to include it here
      const response = await api.put(`/users/${userId}`, {
        currentPassword: data.currentPassword,
        password: data.newPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        validateStatus: (status) => status < 500 // Don't throw for 4xx errors
      });

      console.log('Password change response:', {
        status: response.status,
        data: response.data
      });

      if (response.status === 200 || response.status === 201) {
        return {
          success: true,
          message: response.data?.message || 'Senha alterada com sucesso!'
        };
      }

      // Handle specific error cases
      if (response.status === 400) {
        const errorMessage = response.data?.message || 'Dados inválidos fornecidos';
        console.error('Validation error:', response.data);
        throw new Error(errorMessage);
      }

      if (response.status === 401) {
        throw new Error('Não autorizado. Por favor, faça login novamente.');
      }

      throw new Error(response.data?.message || 'Erro ao alterar a senha');

    } catch (error: any) {
      console.error('Error in changePassword:', {
        name: error.name,
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });

      // Handle network errors
      if (error.code === 'ECONNABORTED') {
        throw new Error('Tempo de conexão esgotado. Verifique sua conexão com a internet.');
      }

      if (!error.response) {
        throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
      }

      // Re-throw the error with a user-friendly message
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Ocorreu um erro inesperado ao alterar a senha. Tente novamente.'
      );
    }
  },

  /**
   * Get the current user's profile using the authentication token
   */
  async getCurrentUser(): Promise<UserProfile> {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        console.error('No authentication token found');
        throw new Error('Nenhum token de autenticação encontrado. Por favor, faça login novamente.');
      }
      
      let userId: string | undefined;
      
      try {
        // Safely decode the token
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
          throw new Error('Formato de token inválido');
        }
        
        const decodedToken = JSON.parse(atob(tokenParts[1]));
        userId = decodedToken.userId || decodedToken.sub;
        
        if (!userId) {
          console.error('No user ID found in token:', decodedToken);
          throw new Error('ID do usuário não encontrado no token');
        }
      } catch (tokenError) {
        console.error('Error decoding token:', tokenError);
        throw new Error('Erro ao processar o token de autenticação. Por favor, faça login novamente.');
      }
      
      try {
        // Try to get user data using the profile endpoint
        const response = await api.get(`/users/me`);
        
        if (response.data?.success && response.data.data) {
          const userData = response.data.data;
          return {
            ...userData,
            id: userData.id || userData._id || userId,
            _id: userData._id || userData.id || userId,
          };
        }
        
        throw new Error('Dados do usuário não encontrados na resposta');
      } catch (apiError: any) {
        console.error('Error fetching user with /users/me endpoint:', apiError);
        
        // Fallback to using the user ID directly if /users/me fails
        try {
          const response = await api.get(`/users/${userId}`);
          
          if (response.data?.success && response.data.data) {
            const userData = response.data.data;
            return {
              ...userData,
              id: userData.id || userData._id || userId,
              _id: userData._id || userData.id || userId,
            };
          }
        } catch (fallbackError) {
          console.error('Fallback user fetch also failed:', fallbackError);
        }
        
        // If we're here, both endpoints failed
        throw new Error(apiError.response?.data?.message || 'Não foi possível carregar o perfil do usuário. Tente novamente mais tarde.');
      }
    } catch (error: any) {
      console.error('Error in getCurrentUser:', error);
      
      // Return a minimal user object with the error
      return {
        id: '',
        _id: '',
        name: 'Usuário',
        email: '',
        error: error.message || 'Erro ao carregar perfil'
      };
    }
  },
};
