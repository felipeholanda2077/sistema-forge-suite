/**
 * Microfrontend de API Pokémon com Cache Avançado
 * Demonstra integração com API externa e estratégias de cache
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

  // Atualiza estatísticas do cache periodicamente
  useEffect(() => {
    const updateCacheStats = () => {
      const stats = apiCache.getStats();
      dispatch({
        type: 'UPDATE_CACHE_STATS',
        payload: {
          hits: 0, // Em uma implementação real, rastrearia isso
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
          title: '❌ Nenhum Pokémon encontrado',
          description: `Não encontramos nenhum Pokémon com o nome "${searchTerm}".`,
        });
      } else {
        toast({
          title: '✅ Busca realizada!',
          description: `Encontramos ${results.length} Pokémon${results.length > 1 ? 's' : ''} para "${searchTerm}".`,
        });
      }
    } catch (error) {
      toast({
        title: '❌ Erro na busca',
        description: 'Falha ao buscar Pokémon. Tente novamente.',
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
        title: '❌ Falha ao carregar Pokémon',
        description: 'Não foi possível buscar um Pokémon aleatório. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (pokemon: Pokemon) => {
    if (!state.isAuthenticated) {
      toast({
        title: '🔒 Login necessário',
        description: 'Faça login para salvar seus Pokémon favoritos.',
        variant: 'destructive',
      });
      return;
    }

    const isFavorite = state.favoritePokemons.some(p => p.id === pokemon.id);
    
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAVORITE_POKEMON', payload: pokemon.id });
      toast({
        title: '💔 Removido dos favoritos',
        description: `${pokemon.name} foi removido dos seus favoritos.`,
      });
    } else {
      dispatch({ type: 'ADD_FAVORITE_POKEMON', payload: pokemon });
      toast({
        title: '❤️ Adicionado aos favoritos',
        description: `${pokemon.name} foi adicionado aos seus favoritos!`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas do Cache */}
      <Card className="shadow-soft animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            📊 Performance do Cache
          </CardTitle>
          <CardDescription>
            Demonstração de cache inteligente para chamadas de API externa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold text-primary">{state.cacheStats.size}</div>
              <div className="text-sm text-muted-foreground">Itens em Cache</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{state.cacheStats.hits}</div>
              <div className="text-sm text-muted-foreground">Cache Hits</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">{state.cacheStats.misses}</div>
              <div className="text-sm text-muted-foreground">Chamadas API</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="search" className="w-full animate-fade-in">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Buscar
          </TabsTrigger>
          <TabsTrigger value="random" className="flex items-center gap-2">
            <Shuffle className="w-4 h-4" />
            Descobrir
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Favoritos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4 animate-fade-in">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                🔍 Busca de Pokémon
              </CardTitle>
              <CardDescription>
                Encontre Pokémon com cache inteligente e busca rápida
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Digite o nome do Pokémon..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="transition-smooth hover:border-primary focus:border-primary text-base"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="transition-bounce hover:shadow-glow hover:scale-105 px-6"
                >
                  {isSearching ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Histórico de Busca */}
              {state.searchHistory.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">🕒 Buscas recentes:</div>
                  <div className="flex flex-wrap gap-2">
                    {state.searchHistory.slice(0, 5).map((term, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-accent transition-bounce hover:scale-105"
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

              {/* Resultados da Busca */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((pokemon, index) => (
                  <div key={pokemon.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <PokemonCard
                      pokemon={pokemon}
                      isFavorite={state.favoritePokemons.some(p => p.id === pokemon.id)}
                      onToggleFavorite={() => toggleFavorite(pokemon)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="random" className="space-y-4 animate-fade-in">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shuffle className="w-5 h-5" />
                🎲 Descobrir Pokémon
              </CardTitle>
              <CardDescription>
                Encontre Pokémon aleatórios com dados em cache para performance otimizada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleRandomPokemon}
                disabled={isLoading}
                className="w-full transition-bounce hover:shadow-glow hover:scale-105 h-12 text-base"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Procurando Pokémon...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shuffle className="w-5 h-5" />
                    🎯 Buscar Pokémon Aleatório
                  </div>
                )}
              </Button>

              {randomPokemon && (
                <div className="animate-scale-in">
                  <PokemonCard
                    pokemon={randomPokemon}
                    isFavorite={state.favoritePokemons.some(p => p.id === randomPokemon.id)}
                    onToggleFavorite={() => toggleFavorite(randomPokemon)}
                    featured
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4 animate-fade-in">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                ⭐ Pokémon Favoritos
              </CardTitle>
              <CardDescription>
                Sua coleção pessoal de Pokémon salvos
                {!state.isAuthenticated && " (Login necessário)"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!state.isAuthenticated ? (
                <div className="text-center py-12 text-muted-foreground animate-fade-in">
                  <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">🔒 Faça login para salvar seus favoritos</h3>
                  <p>Entre na sua conta para começar a colecionar Pokémon!</p>
                </div>
              ) : state.favoritePokemons.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground animate-fade-in">
                  <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">💫 Nenhum favorito ainda</h3>
                  <p>Explore e descubra Pokémon incríveis para adicionar aos seus favoritos!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {state.favoritePokemons.map((pokemon, index) => (
                    <div key={pokemon.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <PokemonCard
                        pokemon={pokemon}
                        isFavorite={true}
                        onToggleFavorite={() => toggleFavorite(pokemon)}
                      />
                    </div>
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
    <Card className={`transition-smooth hover:shadow-medium hover:scale-105 ${featured ? 'ring-2 ring-primary shadow-glow' : ''} animate-fade-in`}>
      <CardHeader className="text-center pb-2">
        <div className="relative">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-24 h-24 mx-auto transition-bounce hover:scale-110"
            loading="lazy"
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-0 right-0 p-1 hover:shadow-glow transition-bounce hover:scale-110"
            onClick={onToggleFavorite}
          >
            {isFavorite ? (
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            ) : (
              <HeartOff className="w-4 h-4 hover:text-red-400" />
            )}
          </Button>
        </div>
        <CardTitle className="capitalize text-lg font-bold">{pokemon.name}</CardTitle>
        <CardDescription className="font-medium">#{pokemon.id.toString().padStart(3, '0')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1 justify-center">
          {pokemon.types.map((type) => (
            <Badge
              key={type.type.name}
              className={`${getPokemonTypeColor(type.type.name)} text-xs font-medium transition-bounce hover:scale-105`}
            >
              {type.type.name}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-center p-2 bg-gradient-to-br from-muted to-muted/70 rounded transition-smooth hover:shadow-soft">
            <div className="font-semibold text-primary">{pokemon.height / 10}m</div>
            <div className="text-xs text-muted-foreground">Altura</div>
          </div>
          <div className="text-center p-2 bg-gradient-to-br from-muted to-muted/70 rounded transition-smooth hover:shadow-soft">
            <div className="font-semibold text-primary">{pokemon.weight / 10}kg</div>
            <div className="text-xs text-muted-foreground">Peso</div>
          </div>
        </div>

        {featured && (
          <div className="space-y-2 animate-fade-in">
            <div className="text-sm font-medium text-primary">🎯 Habilidades:</div>
            <div className="flex flex-wrap gap-1">
              {pokemon.abilities.slice(0, 3).map((ability, index) => (
                <Badge 
                  key={ability.ability.name} 
                  variant="outline" 
                  className="text-xs transition-bounce hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
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