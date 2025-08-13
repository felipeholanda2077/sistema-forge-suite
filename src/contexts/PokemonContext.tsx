import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { pokemonService } from '../services/api/pokemon.service';

interface PokemonContextType {
  // Cache state
  cacheStatus: Record<string, boolean>;
  updateCacheStatus: (key: string, isCached: boolean) => void;
  clearCacheStatus: () => void;
  
  // Favorites
  favorites: number[];
  isFavorite: (pokemonId: number) => boolean;
  toggleFavorite: (pokemonId: number, isFavorite: boolean) => Promise<boolean>;
  loadingFavorites: boolean;
  errorFavorites: Error | null;
  
  // Search
  searchPokemon: (query: string) => Promise<any[]>;
  searchLoading: boolean;
  searchError: Error | null;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cacheStatus, setCacheStatus] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState<boolean>(false);
  const [errorFavorites, setErrorFavorites] = useState<Error | null>(null);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<Error | null>(null);

  // Update cache status
  const updateCacheStatus = useCallback((key: string, isCached: boolean) => {
    setCacheStatus(prev => ({
      ...prev,
      [key]: isCached
    }));
  }, []);

  // Clear all cache status
  const clearCacheStatus = useCallback(() => {
    setCacheStatus({});
  }, []);

  // Check if a Pokémon is in favorites
  const isFavorite = useCallback((pokemonId: number) => {
    return favorites.includes(pokemonId);
  }, [favorites]);

  // Toggle favorite status
  const toggleFavorite = useCallback(async (pokemonId: number, isFav: boolean) => {
    try {
      setLoadingFavorites(true);
      
      if (isFav) {
        await pokemonService.removeFavorite(pokemonId);
        setFavorites(prev => prev.filter(id => id !== pokemonId));
      } else {
        await pokemonService.addFavorite(pokemonId);
        setFavorites(prev => [...prev, pokemonId]);
      }
      
      return true;
    } catch (error) {
      setErrorFavorites(error as Error);
      return false;
    } finally {
      setLoadingFavorites(false);
    }
  }, []);

  // Search Pokémon
  const searchPokemon = useCallback(async (query: string) => {
    if (!query.trim()) return [];
    
    try {
      setSearchLoading(true);
      setSearchError(null);
      
      const response = await pokemonService.searchPokemon(query);
      return response.results || [];
    } catch (error) {
      setSearchError(error as Error);
      return [];
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // Initial fetch of favorites
  const fetchFavorites = useCallback(async () => {
    try {
      setLoadingFavorites(true);
      const data = await pokemonService.getFavorites();
      setFavorites(data.map((fav: any) => fav.pokemonId));
    } catch (error) {
      setErrorFavorites(error as Error);
    } finally {
      setLoadingFavorites(false);
    }
  }, []);

  // Load favorites on mount
  React.useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <PokemonContext.Provider
      value={{
        cacheStatus,
        updateCacheStatus,
        clearCacheStatus,
        favorites,
        isFavorite,
        toggleFavorite,
        loadingFavorites,
        errorFavorites,
        searchPokemon,
        searchLoading,
        searchError,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};
