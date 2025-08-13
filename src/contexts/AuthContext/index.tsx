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
    localStorage.setItem('authToken', token);
    
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
    
    console.log('AuthProvider - login - Setting isAuthenticated to true');
    // Force a new render cycle to ensure state is updated
    setTimeout(() => {
      console.log('AuthProvider - login - Forcing state update');
      setIsAuthenticated(true);
    }, 0);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
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
