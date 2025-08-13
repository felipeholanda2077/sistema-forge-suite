import { useState, useEffect, useCallback } from 'react';
import { pokemonService } from '../services/api/pokemon.service';

interface UsePokemonDataProps {
  limit?: number;
  offset?: number;
}

export const usePokemonData = ({ limit = 20, offset = 0 }: UsePokemonDataProps = {}) => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [cached, setCached] = useState<boolean>(false);

  const fetchPokemonList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await pokemonService.getPokemonList(limit, offset);
      
      setPokemonList(prev => {
        // If offset is 0, replace the list, otherwise append
        return offset === 0 ? data.results : [...prev, ...data.results];
      });
      
      setTotalCount(data.count);
      setHasMore(data.next !== null);
      setCached(!!data.cached);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [limit, offset]);

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  return {
    pokemonList,
    loading,
    error,
    hasMore,
    totalCount,
    cached,
    refetch: fetchPokemonList,
  };
};

export const usePokemonDetails = (identifier: string | number) => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [cached, setCached] = useState<boolean>(false);

  const fetchPokemonDetails = useCallback(async () => {
    if (!identifier) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await pokemonService.getPokemonDetails(identifier);
      
      setPokemon(data);
      setCached(!!data.cached);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [identifier]);

  useEffect(() => {
    fetchPokemonDetails();
  }, [fetchPokemonDetails]);

  return {
    pokemon,
    loading,
    error,
    cached,
    refetch: fetchPokemonDetails,
  };
};

export const useFavoritePokemon = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const data = await pokemonService.getFavorites();
      setFavorites(data.map((fav: any) => fav.pokemonId));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = async (pokemonId: number) => {
    try {
      setLoading(true);
      await pokemonService.addFavorite(pokemonId);
      setFavorites(prev => [...prev, pokemonId]);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (pokemonId: number) => {
    try {
      setLoading(true);
      await pokemonService.removeFavorite(pokemonId);
      setFavorites(prev => prev.filter(id => id !== pokemonId));
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (pokemonId: number) => {
    return favorites.includes(pokemonId);
  };

  return {
    favorites,
    loading,
    error,
    isFavorite,
    addFavorite,
    removeFavorite,
    refetch: fetchFavorites,
  };
};
