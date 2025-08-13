/**
 * Microfrontend de API Pokémon com Cache Avançado
 * Demonstra integração com API externa e estratégias de cache
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card/card';
import { Button } from '@/components/ui/Button/button';
import { Input } from '@/components/ui/Input/input';
import { Badge } from '@/components/ui/Badge/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs/tabs';
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
import { useAuth } from '@/hooks/useAuth';
import { favoriteService } from '@/services/favoriteService';
import { apiCache } from '@/lib/cache';
import { toast as _toast } from '@/hooks/use-toast';

// Type assertion to ensure toast is callable
const toast = _toast as unknown as (props: { title: string; description: string; variant?: 'default' | 'destructive' }) => void;

const PokemonMicrofrontend: React.FC = () => {
  const { state, dispatch } = useMicrofrontend();
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  // Atualiza estatísticas do cache periodicamente
  useEffect(() => {
    const updateCacheStats = () => {
      const stats = apiCache.getStats();
      dispatch({
        type: 'UPDATE_CACHE_STATS',
        payload: {
          hits: stats.hits || 0,
          misses: stats.misses || 0,
          size: stats.size || 0,
          hitRate: stats.hitRate || 0,
          totalRequests: stats.totalRequests || 0
        },
      });
    };

    updateCacheStats();
    const interval = setInterval(updateCacheStats, 2000); // Atualiza a cada 2 segundos
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
    setIsGenerating(true);
    try {
      // Show loading animation for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      const pokemon = await pokemonApi.getRandomPokemon();
      setRandomPokemon(pokemon);
      
      // Show success toast with pokemon name
      toast({
        title: `#${pokemon.id.toString().padStart(3, '0')} ${pokemon.name}`,
        description: `Um ${pokemon.name} selvagem apareceu!`,
      });
    } catch (error) {
      toast({
        title: '❌ Falha ao carregar Pokémon',
        description: 'Não foi possível buscar um Pokémon aleatório. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };



  // Load favorites when component mounts and when authentication state changes
  useEffect(() => {
    const loadFavorites = async () => {
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem('authToken');
          if (token) {
            const favorites = await favoriteService.getFavorites(token);
            dispatch({ type: 'SET_FAVORITE_POKEMONS', payload: favorites });
          }
        } catch (error) {
          console.error('Error loading favorites:', error);
          toast({
            title: '❌ Erro',
            description: 'Não foi possível carregar seus Pokémon favoritos.',
            variant: 'destructive',
          });
        }
      }
    };

    loadFavorites();
  }, [isAuthenticated, dispatch]);

  const toggleFavorite = async (pokemon: Pokemon) => {
    if (!isAuthenticated) {
      toast({
        title: '🔒 Login necessário',
        description: 'Faça login para salvar seus Pokémon favoritos.',
        variant: 'destructive',
      });
      return;
    }

    if (isTogglingFavorite) return;
    
    setIsTogglingFavorite(true);
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      toast({
        title: '❌ Erro de autenticação',
        description: 'Sessão expirada. Faça login novamente.',
        variant: 'destructive',
      });
      setIsTogglingFavorite(false);
      return;
    }

    try {
      const result = await favoriteService.toggleFavorite(token, pokemon);
      
      if (result.isFavorited) {
        dispatch({ type: 'ADD_FAVORITE_POKEMON', payload: pokemon });
        toast({
          title: '❤️ Adicionado aos favoritos',
          description: `${pokemon.name} foi adicionado aos seus favoritos!`,
        });
      } else {
        dispatch({ type: 'REMOVE_FAVORITE_POKEMON', payload: pokemon.id });
        toast({
          title: '💔 Removido dos favoritos',
          description: `${pokemon.name} foi removido dos seus favoritos.`,
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: '❌ Erro',
        description: 'Não foi possível atualizar seus favoritos. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsTogglingFavorite(false);
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
            Estatísticas em tempo real do sistema de cache
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold text-primary">{state.cacheStats?.size || 0}</div>
              <div className="text-sm text-muted-foreground">Itens em Cache</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{state.cacheStats?.hits || 0}</div>
              <div className="text-sm text-muted-foreground">Cache Hits</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">{state.cacheStats?.misses || 0}</div>
              <div className="text-sm text-muted-foreground">Chamadas API</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{state.cacheStats?.hitRate || 0}%</div>
              <div className="text-sm text-muted-foreground">Taxa de Acerto</div>
            </div>
          </div>
          
          {/* Barra de progresso da taxa de acerto */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Eficiência do Cache</span>
              <span>{state.cacheStats?.hitRate || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${state.cacheStats?.hitRate || 0}%` }}
              ></div>
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
            Pokedex
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

        <TabsContent value="random" className="space-y-4">
          <div className="bg-red-600 rounded-xl p-6 shadow-2xl border-4 border-red-800">
            {/* Pokedex Screen */}
            <div className="bg-white rounded-lg p-4 border-4 border-gray-800 mb-4">
              {/* Pokedex Header */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 border border-red-700"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-600"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 border border-green-700"></div>
                </div>
                <div className="text-xs font-mono font-bold text-gray-600">POKéDEX</div>
              </div>
              
              {/* Main Pokedex Screen */}
              <div className="bg-green-100 rounded p-4 border-2 border-green-300 min-h-[400px] flex flex-col items-center justify-center">
                {randomPokemon ? (
                  <div className="w-full text-center">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold capitalize">{randomPokemon.name}</h3>
                      <span className="text-gray-600 font-mono">
                        #{randomPokemon.id.toString().padStart(3, '0')}
                      </span>
                    </div>
                    
                    <div className="bg-white rounded-lg p-2 mb-3 border-2 border-gray-300">
                      <img 
                        src={randomPokemon.sprites.front_default} 
                        alt={randomPokemon.name}
                        className="w-48 h-48 mx-auto object-contain"
                      />
                    </div>
                    
                    <div className="flex justify-center gap-2 mb-3">
                      {randomPokemon.types.map(type => (
                        <Badge 
                          key={type.type.name} 
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ backgroundColor: getPokemonTypeColor(type.type.name) }}
                        >
                          {type.type.name}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-left bg-gray-100 p-2 rounded-lg mb-3">
                      <div className="font-semibold">Altura:</div>
                      <div>{(randomPokemon.height / 10).toFixed(1)} m</div>
                      <div className="font-semibold">Peso:</div>
                      <div>{(randomPokemon.weight / 10).toFixed(1)} kg</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <div className="text-4xl mb-2">???</div>
                    <p className="text-gray-600">Pressione o botão para encontrar um Pokémon!</p>
                  </div>
                )}
              </div>
              
              {/* Pokedex Controls */}
              <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-700"></div>
                  <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-yellow-600"></div>
                </div>
                
                <Button 
                  onClick={handleRandomPokemon} 
                  disabled={isGenerating}
                  className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full 
                    ${isGenerating ? 'opacity-70 cursor-not-allowed' : 'animate-pulse'}`}
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Buscando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Encontrar Pokémon
                    </div>
                  )}
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => randomPokemon && toggleFavorite(randomPokemon)}
                    className="text-red-500 hover:bg-red-100"
                  >
                    {randomPokemon && state.favoritePokemons.some(p => p.id === randomPokemon.id) ? (
                      <Heart className="w-6 h-6 fill-red-500" />
                    ) : (
                      <Heart className="w-6 h-6" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Pokedex Bottom */}
            <div className="flex justify-between items-center mt-2">
              <div className="w-12 h-2 bg-gray-800 rounded-full"></div>
              <div className="text-xs font-mono text-white">POKéMON DISCOVERY SYSTEM v1.0</div>
            </div>
          </div>
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
                  <h3 className="text-lg font-medium mb-2">Colecione seus Pokémon favoritos aqui</h3>
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