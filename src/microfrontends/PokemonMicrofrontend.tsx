/**
 * Pokemon API Microfrontend with Advanced Caching
 * Demonstrates external API integration and cache strategies
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Heart, 
  HeartOff, 
  Shuffle, 
  Zap, 
  TrendingUp, 
  Database,
  Star,
  Target
} from 'lucide-react';
import { pokemonApi, Pokemon, getPokemonTypeColor } from '@/services/pokemonApi';
import { useMicrofrontend } from '@/contexts/MicrofrontendContext';
import { apiCache } from '@/lib/cache';
import { useToast } from '@/hooks/use-toast';

const PokemonMicrofrontend: React.FC = () => {
  const { state, dispatch } = useMicrofrontend();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Update cache stats periodically
  useEffect(() => {
    const updateCacheStats = () => {
      const stats = apiCache.getStats();
      dispatch({
        type: 'UPDATE_CACHE_STATS',
        payload: {
          hits: 0, // We'd track this in a real implementation
          misses: 0,
          size: stats.size,
        },
      });
    };

    updateCacheStats();
    const interval = setInterval(updateCacheStats, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    dispatch({ type: 'ADD_SEARCH_TERM', payload: searchTerm });

    try {
      const results = await pokemonApi.searchPokemon(searchTerm);
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: 'No Pokemon found',
          description: `No Pokemon matching "${searchTerm}" were found.`,
        });
      }
    } catch (error) {
      toast({
        title: 'Search failed',
        description: 'Failed to search Pokemon. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleRandomPokemon = async () => {
    setIsLoading(true);
    try {
      const pokemon = await pokemonApi.getRandomPokemon();
      setRandomPokemon(pokemon);
    } catch (error) {
      toast({
        title: 'Failed to load Pokemon',
        description: 'Could not fetch random Pokemon. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (pokemon: Pokemon) => {
    if (!state.isAuthenticated) {
      toast({
        title: 'Login required',
        description: 'Please login to save favorite Pokemon.',
        variant: 'destructive',
      });
      return;
    }

    const isFavorite = state.favoritePokemons.some(p => p.id === pokemon.id);
    
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAVORITE_POKEMON', payload: pokemon.id });
      toast({
        title: 'Removed from favorites',
        description: `${pokemon.name} was removed from your favorites.`,
      });
    } else {
      dispatch({ type: 'ADD_FAVORITE_POKEMON', payload: pokemon });
      toast({
        title: 'Added to favorites',
        description: `${pokemon.name} was added to your favorites!`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Cache Statistics */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Cache Performance
          </CardTitle>
          <CardDescription>
            Demonstrating intelligent caching for external API calls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{state.cacheStats.size}</div>
              <div className="text-sm text-muted-foreground">Cached Items</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600">{state.cacheStats.hits}</div>
              <div className="text-sm text-muted-foreground">Cache Hits</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{state.cacheStats.misses}</div>
              <div className="text-sm text-muted-foreground">API Calls</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="random">Discover</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Pokemon Search
              </CardTitle>
              <CardDescription>
                Search for Pokemon with intelligent caching
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter Pokemon name..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="transition-smooth"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="transition-bounce hover:shadow-glow"
                >
                  {isSearching ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Search History */}
              {state.searchHistory.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Recent searches:</div>
                  <div className="flex flex-wrap gap-2">
                    {state.searchHistory.slice(0, 5).map((term, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-accent transition-smooth"
                        onClick={() => {
                          setSearchTerm(term);
                          handleSearch();
                        }}
                      >
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    isFavorite={state.favoritePokemons.some(p => p.id === pokemon.id)}
                    onToggleFavorite={() => toggleFavorite(pokemon)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="random" className="space-y-4">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shuffle className="w-5 h-5" />
                Discover Pokemon
              </CardTitle>
              <CardDescription>
                Find random Pokemon with cached data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleRandomPokemon}
                disabled={isLoading}
                className="w-full transition-bounce hover:shadow-glow"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Finding Pokemon...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shuffle className="w-4 h-4" />
                    Get Random Pokemon
                  </div>
                )}
              </Button>

              {randomPokemon && (
                <PokemonCard
                  pokemon={randomPokemon}
                  isFavorite={state.favoritePokemons.some(p => p.id === randomPokemon.id)}
                  onToggleFavorite={() => toggleFavorite(randomPokemon)}
                  featured
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Favorite Pokemon
              </CardTitle>
              <CardDescription>
                Your saved Pokemon collection
                {!state.isAuthenticated && " (Login required)"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!state.isAuthenticated ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Login to save your favorite Pokemon!</p>
                </div>
              ) : state.favoritePokemons.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No favorite Pokemon yet. Start exploring!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {state.favoritePokemons.map((pokemon) => (
                    <PokemonCard
                      key={pokemon.id}
                      pokemon={pokemon}
                      isFavorite={true}
                      onToggleFavorite={() => toggleFavorite(pokemon)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  featured?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ 
  pokemon, 
  isFavorite, 
  onToggleFavorite, 
  featured = false 
}) => {
  return (
    <Card className={`transition-smooth hover:shadow-medium ${featured ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="text-center pb-2">
        <div className="relative">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-24 h-24 mx-auto transition-smooth hover:scale-110"
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-0 right-0 p-1 hover:shadow-glow"
            onClick={onToggleFavorite}
          >
            {isFavorite ? (
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            ) : (
              <HeartOff className="w-4 h-4" />
            )}
          </Button>
        </div>
        <CardTitle className="capitalize text-lg">{pokemon.name}</CardTitle>
        <CardDescription>#{pokemon.id.toString().padStart(3, '0')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1 justify-center">
          {pokemon.types.map((type) => (
            <Badge
              key={type.type.name}
              className={`${getPokemonTypeColor(type.type.name)} text-xs`}
            >
              {type.type.name}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-semibold">{pokemon.height / 10}m</div>
            <div className="text-xs text-muted-foreground">Height</div>
          </div>
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-semibold">{pokemon.weight / 10}kg</div>
            <div className="text-xs text-muted-foreground">Weight</div>
          </div>
        </div>

        {featured && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Abilities:</div>
            <div className="flex flex-wrap gap-1">
              {pokemon.abilities.slice(0, 3).map((ability) => (
                <Badge key={ability.ability.name} variant="outline" className="text-xs">
                  {ability.ability.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PokemonMicrofrontend;