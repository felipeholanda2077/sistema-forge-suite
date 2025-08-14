import React, { useEffect } from 'react';
import { AuthContext } from './context';
import type { AuthContextType } from './context';
import type { UserData } from '../AuthContext.types';
import { useMicrofrontend } from '../MicrofrontendContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    const token = localStorage.getItem('authToken');
    console.log('Initial auth state check - token exists:', !!token);
    return !!token;
  });
  
  // Get the MicrofrontendContext dispatch function
  const { dispatch } = useMicrofrontend();

  // Sync authentication state with MicrofrontendContext
  useEffect(() => {
    if (isAuthenticated) {
      // Get user data from localStorage or make an API call to get user data
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          dispatch({ 
            type: 'SET_USER', 
            payload: {
              id: user.id,
              email: user.email,
              name: user.name,
              favoritePokemons: user.favoritePokemons || []
            } 
          });
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    } else {
      // Clear user data when logging out
      dispatch({ type: 'LOGOUT' });
    }
  }, [isAuthenticated, dispatch]);

  const login = (token: string, userData?: UserData) => {
    console.log('AuthProvider - login - Setting auth token in localStorage');
    console.log('Token to be stored:', token);
    localStorage.setItem('authToken', token);
    
    if (userData) {
      console.log('User data to be stored:', userData);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Atualiza o estado do usuário imediatamente
      const user = userData;
      
      // Garante que favoritePokemons seja um array de números (IDs)
      let favoritePokemonIds: number[] = [];
      if (user.favoritePokemons && Array.isArray(user.favoritePokemons)) {
        favoritePokemonIds = user.favoritePokemons
          .map(fav => {
            if (typeof fav === 'number') return fav;
            if (fav && typeof fav === 'object' && 'id' in fav) return fav.id;
            return null;
          })
          .filter((id): id is number => id !== null);
      }
      
      console.log('Dispatching SET_USER with payload:', {
        id: user.id,
        email: user.email,
        name: user.name,
        favoritePokemons: favoritePokemonIds
      });
      
      dispatch({ 
        type: 'SET_USER', 
        payload: {
          id: user.id,
          email: user.email,
          name: user.name,
          favoritePokemons: favoritePokemonIds
        } 
      });
    } else {
      console.log('No user data provided to login function');
    }
    
    console.log('AuthProvider - login - Setting isAuthenticated to true');
    // Atualiza o estado de autenticação imediatamente
    setIsAuthenticated(true);
    console.log('isAuthenticated state updated to true');
  };

  const logout = () => {
    console.log('AuthProvider - logout - Removing auth data from localStorage');
    
    // Remove todos os itens relacionados à autenticação
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    
    // Limpa os dados do usuário no estado global
    dispatch({ type: 'LOGOUT' });
    
    // Atualiza o estado de autenticação
    setIsAuthenticated(false);
    
    console.log('AuthProvider - logout - Logout completed');
  };

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
