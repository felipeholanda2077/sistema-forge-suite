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

  const clearAllCaches = async () => {
    try {
      console.log('Clearing all platform caches...');
      
      // Clear localStorage
      localStorage.clear();
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Clear IndexedDB if it exists
      if ('indexedDB' in window) {
        try {
          const dbs = await window.indexedDB.databases();
          dbs.forEach(db => {
            if (db.name) {
              window.indexedDB.deleteDatabase(db.name);
            }
          });
        } catch (error) {
          console.error('Error clearing IndexedDB:', error);
        }
      }
      
      // Clear service worker caches if they exist
      if ('caches' in window) {
        try {
          const cacheKeys = await caches.keys();
          await Promise.all(cacheKeys.map(key => caches.delete(key)));
        } catch (error) {
          console.error('Error clearing service worker caches:', error);
        }
      }
      
      console.log('All platform caches cleared successfully');
    } catch (error) {
      console.error('Error clearing caches:', error);
    }
  };

  const logout = async () => {
    console.log('AuthProvider - logout - Starting logout process');
    
    try {
      // Call the authService to invalidate the token on the server
      const { authService } = await import('@/services/authService');
      await authService.logout();
      
      // Clear all caches
      await clearAllCaches();
      
      // Clear authentication data
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      
      // Clear user data in global state
      dispatch({ type: 'LOGOUT' });
      
      // Update authentication state
      setIsAuthenticated(false);
      
      console.log('AuthProvider - logout - Logout completed successfully');
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if there's an error, we still want to proceed with logout
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      dispatch({ type: 'LOGOUT' });
      setIsAuthenticated(false);
    }
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
