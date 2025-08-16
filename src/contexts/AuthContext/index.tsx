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
  
  const [user, setUser] = React.useState<UserData | null>(() => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
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
      // Normalize user data - handle both id and _id
      const userId = userData.id || userData._id;
      if (!userId) {
        console.error('No user ID found in login data');
        return;
      }
      
      // Ensure favoritePokemons is always an array of numbers
      const favoritePokemons = Array.isArray(userData.favoritePokemons) 
        ? userData.favoritePokemons.filter((fav): fav is number => typeof fav === 'number')
        : [];
      
      // Create normalized user object with both id and _id for compatibility
      const normalizedUser: UserData & { id: string; _id: string } = {
        ...userData,
        id: userId,
        _id: userId, // Ensure _id is always set
        favoritePokemons
      };
      
      console.log('User data to be stored:', normalizedUser);
      localStorage.setItem('userData', JSON.stringify(normalizedUser));
      setUser(normalizedUser);
      
      // Dispatch to update global state
      dispatch({ 
        type: 'SET_USER', 
        payload: {
          id: userId,
          _id: userId,
          email: normalizedUser.email,
          name: normalizedUser.name,
          favoritePokemons: normalizedUser.favoritePokemons
        }
      });
    }
    
    setIsAuthenticated(true);
    console.log('AuthProvider - login - isAuthenticated set to true');
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

  const logout = () => {
    console.log('AuthProvider - logout - Clearing auth data');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    dispatch({ type: 'LOGOUT' });
    setIsAuthenticated(false);
    console.log('AuthProvider - logout - isAuthenticated set to false');
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
