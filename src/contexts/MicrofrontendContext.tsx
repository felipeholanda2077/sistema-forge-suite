/**
 * Global state management for microfrontend communication
 * Demonstrates how different microfrontends can communicate
 */

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Import Pokemon type from API service to maintain consistency
import { Pokemon } from '@/services/pokemonApi';

interface User {
  id: string;
  email: string;
  name: string;
  favoritePokemons: number[];
}

interface AppState {
  // Auth microfrontend state
  user: User | null;
  isAuthenticated: boolean;
  
  // Pokemon microfrontend state
  favoritePokemons: Pokemon[];
  searchHistory: string[];
  
  // Cache statistics
  cacheStats: {
    hits: number;
    misses: number;
    size: number;
  };
}

// Action types for state management
type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_FAVORITE_POKEMON'; payload: Pokemon }
  | { type: 'REMOVE_FAVORITE_POKEMON'; payload: number }
  | { type: 'ADD_SEARCH_TERM'; payload: string }
  | { type: 'UPDATE_CACHE_STATS'; payload: { hits: number; misses: number; size: number } };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  favoritePokemons: [],
  searchHistory: [],
  cacheStats: {
    hits: 0,
    misses: 0,
    size: 0,
  },
};

// Reducer for state management
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        favoritePokemons: [],
      };
    
    case 'ADD_FAVORITE_POKEMON':
      if (state.favoritePokemons.some(p => p.id === action.payload.id)) {
        return state; // Already in favorites
      }
      return {
        ...state,
        favoritePokemons: [...state.favoritePokemons, action.payload],
      };
    
    case 'REMOVE_FAVORITE_POKEMON':
      return {
        ...state,
        favoritePokemons: state.favoritePokemons.filter(p => p.id !== action.payload),
      };
    
    case 'ADD_SEARCH_TERM':
      const newHistory = [action.payload, ...state.searchHistory.filter(term => term !== action.payload)].slice(0, 10);
      return {
        ...state,
        searchHistory: newHistory,
      };
    
    case 'UPDATE_CACHE_STATS':
      return {
        ...state,
        cacheStats: action.payload,
      };
    
    default:
      return state;
  }
}

// Context
const MicrofrontendContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
export function MicrofrontendProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <MicrofrontendContext.Provider value={{ state, dispatch }}>
      {children}
    </MicrofrontendContext.Provider>
  );
}

// Custom hook to use the context
export function useMicrofrontend() {
  const context = useContext(MicrofrontendContext);
  if (!context) {
    throw new Error('useMicrofrontend must be used within a MicrofrontendProvider');
  }
  return context;
}

// Export types for other microfrontends
export type { Pokemon, User, AppState, AppAction };