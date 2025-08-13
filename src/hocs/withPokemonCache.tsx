import React from 'react';
import { usePokemon } from '../contexts/PokemonContext';

interface WithPokemonCacheProps {
  cacheKey: string;
  isCached?: boolean;
}

/**
 * Higher-Order Component to handle Pokémon data caching
 * Automatically updates the cache status in the PokemonContext
 */
const withPokemonCache = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithPokemonCacheProps>
) => {
  const WithCache: React.FC<Omit<P, keyof WithPokemonCacheProps> & { cacheKey: string }> = (props) => {
    const { cacheKey, ...restProps } = props;
    const { updateCacheStatus } = usePokemon();
    const [isCached, setIsCached] = React.useState<boolean>(false);

    // Update cache status in the context
    React.useEffect(() => {
      if (cacheKey) {
        updateCacheStatus(cacheKey, isCached);
      }
    }, [cacheKey, isCached, updateCacheStatus]);

    // Handle cache status from the wrapped component
    const handleCacheStatus = React.useCallback((cached: boolean) => {
      setIsCached(cached);
    }, []);

    return (
      <WrappedComponent
        {...(restProps as P)}
        cacheKey={cacheKey}
        isCached={isCached}
        onCacheStatusChange={handleCacheStatus}
      />
    );
  };

  // Set a display name for the HOC for better debugging
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithCache.displayName = `withPokemonCache(${displayName})`;

  return WithCache;
};

export default withPokemonCache;
