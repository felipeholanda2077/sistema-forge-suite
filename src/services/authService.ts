const API_BASE_URL = 'https://back-end-projetokirvano-b30617960bd0.herokuapp.com/api';

interface ApiErrorResponse {
  data: {
    message?: string;
    error?: {
      message?: string;
      code?: string;
    };
    errors?: Array<{
      msg: string;
      param: string;
      location?: string;
    }>;
  };
  status: number;
  statusText: string;
}

// Extend Error type to include response
class ApiError extends Error {
  response?: ApiErrorResponse;

  constructor(message: string, response?: ApiErrorResponse) {
    super(message);
    this.name = 'ApiError';
    this.response = response;
  }
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export const authService = {
  async register(data: RegisterData): Promise<LoginResponse> {
    try {
      console.log('Attempting to register user:', { ...data, password: '***' });
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        }),
        credentials: 'include' // Important for cookies if using sessions
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
        throw new Error('Resposta inválida do servidor');
      }
      
      console.log('Registration response:', { 
        status: response.status, 
        statusText: response.statusText,
        ok: response.ok,
        data: responseData 
      });

      if (!response.ok) {
        console.error('Registration failed:', {
          status: response.status,
          statusText: response.statusText,
          response: responseData
        });
        
        // Handle different error statuses
        if (response.status === 400) {
          // Handle duplicate email error
          if (responseData.error?.code === 'EMAIL_EXISTS') {
            throw new ApiError(
              'Este e-mail já está em uso. Por favor, utilize outro e-mail ou faça login.',
              {
                data: responseData,
                status: response.status,
                statusText: response.statusText
              }
            );
          }
          
          // Handle validation errors
          if (responseData.errors && Array.isArray(responseData.errors)) {
            // Format validation errors into a user-friendly message
            const errorMessages = responseData.errors
              .map((error: { msg: string; param: string }) => 
                `- ${error.msg} (${error.param})`
              )
              .join('\n');
            
            throw new ApiError(
              `Erro de validação:\n${errorMessages}`,
              {
                data: responseData,
                status: response.status,
                statusText: response.statusText
              }
            );
          }
          
          // Handle other 400 errors
          throw new ApiError(
            responseData.error?.message || 
            responseData.message || 
            'Dados inválidos. Verifique as informações e tente novamente.',
            {
              data: responseData,
              status: response.status,
              statusText: response.statusText
            }
          );
        }
        
        // Handle other error statuses
        throw new ApiError(
          responseData.message || 
          responseData.error?.message || 
          'Falha no registro. Por favor, tente novamente mais tarde.',
          {
            data: responseData,
            status: response.status,
            statusText: response.statusText
          }
        );
      }



      // Log the full response for debugging
      console.log('Registration successful, response data:', responseData);
      
      // Check if we have the expected data structure
      if (!responseData.data || !responseData.data.token || !responseData.data.user) {
        console.error('Unexpected response format:', responseData);
        // Try to handle the response even if the structure is not exactly as expected
        if (responseData.token) {
          return {
            token: responseData.token,
            user: {
              id: responseData.user?._id || '',
              name: responseData.user?.name || '',
              email: responseData.user?.email || responseData.email || ''
            }
          };
        }
        throw new Error('Formato de resposta inesperado do servidor');
      }

      // Handle the expected response format
      return {
        token: responseData.data.token,
        user: {
          id: responseData.data.user._id || responseData.data.user.id,
          name: responseData.data.user.name,
          email: responseData.data.user.email
        }
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new ApiError(
          responseData.message || 
          responseData.error?.message || 
          'Falha no login. Verifique suas credenciais.',
          {
            data: responseData,
            status: response.status,
            statusText: response.statusText
          }
        );
      }

      // Check the actual response structure and adjust accordingly
      const userData = responseData.data?.user || responseData.user || {};
      const token = responseData.token || responseData.data?.token;
      
      if (!token) {
        throw new Error('No authentication token received');
      }
      
      return {
        token,
        user: {
          id: userData._id || userData.id,
          email: userData.email,
          name: userData.name || ''
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async forgotPassword(email: string): Promise<{ 
    success: boolean; 
    message: string; 
    resetToken?: string; 
    resetUrl?: string 
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new ApiError(
          responseData.message || 'Não foi possível processar a solicitação de recuperação de senha.',
          {
            data: responseData,
            status: response.status,
            statusText: response.statusText,
          }
        );
      }

      return {
        success: true,
        message: responseData.message || 'Se o e-mail estiver cadastrado, você receberá um link para redefinição de senha.'
      };
    } catch (error) {
      console.error('Error in forgotPassword:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Erro inesperado ao processar a solicitação de recuperação de senha.');
    }
  },
  
  async logout(): Promise<{ success: boolean; message: string }> {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        credentials: 'include'
      });

      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Logout failed:', errorData);
        return {
          success: false,
          message: errorData.message || 'Falha ao fazer logout. Por favor, tente novamente.'
        };
      }
      
      return {
        success: true,
        message: 'Logout realizado com sucesso.'
      };
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      return {
        success: false,
        message: 'Ocorreu um erro ao tentar fazer logout. Suas credenciais locais foram removidas.'
      };
    }
  }
};
