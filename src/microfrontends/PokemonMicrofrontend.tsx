/**
 * Microfrontend de API Pokémon com Cache Avançado
 * Demonstra integração com API externa e estratégias de cache
 */

import React, { useState, useEffect, useMemo } from 'react';
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
import { mongoFavoriteService } from '@/services/mongoFavoriteService';
import { toast as _toast } from '@/hooks/use-toast';

// Type assertion to ensure toast is callable
const toast = _toast as unknown as (props: { title: string; description: string; variant?: 'default' | 'destructive' }) => void;

const PokemonMicrofrontend: React.FC = () => {
  const { state, dispatch } = useMicrofrontend();
  const { isAuthenticated } = useAuth();
  const userId = state.user?.id || 'anonymous';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  const [activeTab, setActiveTab] = useState('search');

  // Carrega os favoritos quando o componente é montado ou quando o estado de autenticação muda
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setIsLoadingFavorites(true);
        console.log('Carregando favoritos...');
        const favorites = await mongoFavoriteService.getFavorites();
        console.log('Favoritos carregados:', favorites);
        
        // Verifica se os favoritos têm a estrutura correta
        const validatedFavorites = favorites.map(pokemon => {
          // Garante que o Pokémon tenha as propriedades necessárias
          const validatedPokemon: Pokemon = {
            ...pokemon,
            id: pokemon.id,
            name: pokemon.name,
            sprites: {
              front_default: pokemon.sprites?.front_default || '',
              front_shiny: pokemon.sprites?.front_shiny || '',
              back_default: pokemon.sprites?.back_default || '',
              back_shiny: pokemon.sprites?.back_shiny || '',
              other: {
                'official-artwork': {
                  front_default: pokemon.sprites?.other?.['official-artwork']?.front_default || ''
                }
              }
            },
            // Preserva os valores originais de height e weight ou usa 0 se não existirem
            height: pokemon.height !== undefined ? pokemon.height : 0,
            weight: pokemon.weight !== undefined ? pokemon.weight : 0,
            types: Array.isArray(pokemon.types) ? pokemon.types : [],
            base_experience: pokemon.base_experience || 0,
            abilities: Array.isArray(pokemon.abilities) ? pokemon.abilities : [],
            stats: Array.isArray(pokemon.stats) ? pokemon.stats : []
          };
          
          console.log(`Pokémon validado: ${validatedPokemon.name}`, validatedPokemon);
          return validatedPokemon;
        });
        
        dispatch({ type: 'SET_FAVORITE_POKEMONS', payload: validatedFavorites });
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        toast({
          title: '❌ Erro',
          description: 'Não foi possível carregar seus Pokémon favoritos.',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingFavorites(false);
      }
    };

    loadFavorites();
  }, [isAuthenticated, dispatch]);

  // Cache is now handled by the backend
  // No need for frontend cache status updates

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



  // Load favorites when component mounts, when authentication state changes, or when the tab becomes visible
  useEffect(() => {
    const loadFavorites = async () => {
      console.log('Iniciando carregamento de favoritos...', { isAuthenticated });
      
      // If not authenticated, clear favorites and don't try to load
      if (!isAuthenticated) {
        console.log('Usuário não autenticado, limpando favoritos');
        dispatch({ type: 'SET_FAVORITE_POKEMONS', payload: [] });
        return;
      }

      try {
        console.log('Buscando favoritos do usuário autenticado...');
        const favorites = await mongoFavoriteService.getFavorites();
        console.log('Favoritos recebidos da API:', favorites);
        
        if (!Array.isArray(favorites)) {
          throw new Error('Formato de resposta inválido dos favoritos');
        }
        
        // Mapeia os favoritos para garantir que tenham o formato correto
        const validFavorites = favorites
          .map(pokemon => {
            if (!pokemon || !pokemon.id || !pokemon.name) {
              console.warn('Pokémon inválido encontrado:', pokemon);
              return null;
            }
            return {
              ...pokemon,
              // Garante que os sprites estejam sempre definidos
              sprites: {
                front_default: pokemon.sprites?.front_default || '',
                front_shiny: pokemon.sprites?.front_shiny || '',
                back_default: pokemon.sprites?.back_default || '',
                back_shiny: pokemon.sprites?.back_shiny || '',
                other: {
                  'official-artwork': {
                    front_default: pokemon.sprites?.other?.['official-artwork']?.front_default || 
                                  pokemon.sprites?.front_default ||
                                  ''
                  }
                }
              },
              types: Array.isArray(pokemon.types) ? pokemon.types : [],
              abilities: Array.isArray(pokemon.abilities) ? pokemon.abilities : [],
              stats: Array.isArray(pokemon.stats) ? pokemon.stats : [],
              height: pokemon.height || 0,
              weight: pokemon.weight || 0,
              base_experience: pokemon.base_experience || 0
            };
          })
          .filter(Boolean); // Remove quaisquer valores nulos
          
        console.log('Favoritos válidos processados:', validFavorites);
        
        // Atualiza o estado com os favoritos válidos
        dispatch({ 
          type: 'SET_FAVORITE_POKEMONS', 
          payload: validFavorites 
        });
        
      } catch (error: unknown) {
        console.error('Erro ao carregar favoritos:', error);
        
        // Define o tipo para o erro esperado
        type ApiError = {
          response?: {
            status?: number;
            data?: {
              error?: {
                code?: string;
                message?: string;
              };
              message?: string;
            };
          };
          message?: string;
        };
        
        const apiError = error as ApiError;
        
        // Se for um erro de autenticação, limpa os favoritos
        if (apiError.response?.status === 401) {
          dispatch({ type: 'SET_FAVORITE_POKEMONS', payload: [] });
          toast({
            title: '🔒 Sessão expirada',
            description: 'Sua sessão expirou. Por favor, faça login novamente.',
            variant: 'destructive',
          });
        } else {
          console.error('Erro ao carregar favoritos:', error);
          toast({
            title: '❌ Erro',
            description: 'Não foi possível carregar seus Pokémon favoritos. Tente novamente mais tarde.',
            variant: 'destructive',
          });
        }
      }
    };

    // Carrega os favoritos imediatamente
    loadFavorites();
    
    // Configura um event listener para recarregar quando a aba se tornar visível
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('A aba está visível, recarregando favoritos...');
        loadFavorites();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Limpa o event listener quando o componente é desmontado
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated, dispatch]); // Adiciona dispatch como dependência

  const toggleFavorite = async (pokemon: Pokemon) => {
    if (isTogglingFavorite) return;
    
    // Verifica se o usuário está autenticado antes de tentar favoritar
    if (!isAuthenticated) {
      toast({
        title: '🔒 Autenticação necessária',
        description: 'Você precisa fazer login para adicionar Pokémon aos favoritos.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsTogglingFavorite(true);

    try {
      console.log('Chamando toggleFavorite para o Pokémon:', pokemon.name, 'ID:', pokemon.id);
      
      // Atualização otimista - atualiza a UI antes da resposta da API
      const isCurrentlyFavorite = state.favoritePokemons.some(p => p.id === pokemon.id);
      
      if (isCurrentlyFavorite) {
        dispatch({ type: 'REMOVE_FAVORITE_POKEMON', payload: pokemon.id });
      } else {
        dispatch({ type: 'ADD_FAVORITE_POKEMON', payload: pokemon });
      }
      
      // Chama a API para atualizar o favorito no MongoDB
      const { isFavorited } = await mongoFavoriteService.toggleFavorite(pokemon);
      
      // Se a resposta da API for diferente da nossa atualização otimista, sincroniza
      if (isFavorited === isCurrentlyFavorite) {
        console.log('Sincronizando estado com o servidor...');
        const updatedFavorites = await mongoFavoriteService.getFavorites();
        dispatch({ type: 'SET_FAVORITE_POKEMONS', payload: updatedFavorites });
      }
      
      // Mostra o toast apropriado
      toast({
        title: isFavorited ? '❤️ Adicionado aos favoritos' : '💔 Removido dos favoritos',
        description: isFavorited 
          ? `${pokemon.name} foi adicionado aos seus favoritos!`
          : `${pokemon.name} foi removido dos seus favoritos.`,
      });
      
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
      
      // Recarrega a lista de favoritos para garantir consistência
      try {
        const updatedFavorites = await mongoFavoriteService.getFavorites();
        dispatch({ type: 'SET_FAVORITE_POKEMONS', payload: updatedFavorites });
      } catch (e) {
        console.error('Falha ao sincronizar favoritos após erro:', e);
      }
      
      // Mensagem de erro genérica
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
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full animate-fade-in"
      >
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="search" className="flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Buscar
          </TabsTrigger>
          <TabsTrigger value="random" className="flex items-center justify-center gap-2">
            <Shuffle className="w-4 h-4" />
            Pokedex
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center justify-center gap-2">
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
                      key={`search-${pokemon.id}-${state.favoritePokemons.some(p => p.id === pokemon.id) ? 'fav' : 'not-fav'}`}
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
                {isAuthenticated 
                  ? "Sua coleção pessoal de Pokémon salvos" 
                  : "Visualização dos Pokémon favoritos (faça login para salvar sua coleção)"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingFavorites ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-muted-foreground">Carregando seus Pokémon favoritos...</p>
                </div>
              ) : state.favoritePokemons.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground animate-fade-in">
                  <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">
                    {isAuthenticated ? '💫 Nenhum favorito ainda' : 'Nenhum Pokémon favorito encontrado'}
                  </h3>
                  <p className="mb-4">
                    {isAuthenticated 
                      ? 'Explore e descubra Pokémon incríveis para adicionar aos seus favoritos!' 
                      : 'Adicione Pokémon aos favoritos para vê-los aqui!'}
                  </p>
                  {!isAuthenticated ? (
                    <Button 
                      variant="outline" 
                      onClick={() => window.location.href = '/login'}
                      className="mt-2"
                    >
                      Fazer login para salvar sua coleção
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('search-tab')?.click()}
                      className="mt-2"
                    >
                      🔍 Procurar Pokémon
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-muted-foreground">
                      {state.favoritePokemons.length} Pokémon{state.favoritePokemons.length !== 1 ? 's' : ''} favoritado{state.favoritePokemons.length !== 1 ? 's' : ''}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => document.getElementById('search-tab')?.click()}
                      className="flex items-center gap-1"
                    >
                      <Search className="w-4 h-4" />
                      Adicionar mais
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {state.favoritePokemons
                      .filter(pokemon => pokemon && pokemon.id && pokemon.name)
                      .map((pokemon, index) => (
                        <div 
                          key={`favorite-${pokemon.id}-${index}`}
                          className="animate-fade-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <PokemonCard
                            pokemon={pokemon}
                            isFavorite={true}
                            onToggleFavorite={() => toggleFavorite(pokemon)}
                            featured={index === 0}
                          />
                        </div>
                      ))
                    }
                  </div>
                  
                  {state.favoritePokemons.filter(p => p && p.id && p.name).length === 0 && (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      <p>Nenhum Pokémon favorito válido encontrado.</p>
                      <p className="text-sm mt-2">Tente adicionar alguns Pokémon aos favoritos novamente.</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => document.getElementById('search-tab')?.click()}
                      >
                        🔍 Procurar Pokémon
                      </Button>
                    </div>
                  )}
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
  pokemon: pokemonProp, 
  isFavorite, 
  onToggleFavorite, 
  featured = false 
}) => {
  // Ensure pokemon object has all required fields with fallbacks
  const pokemon = useMemo(() => {
    // If pokemonProp is undefined or null, return a default pokemon object
    if (!pokemonProp) {
      return {
        id: 0,
        name: 'Unknown Pokémon',
        height: 0,
        weight: 0,
        base_experience: 0,
        types: [],
        abilities: [],
        stats: [],
        sprites: {
          front_default: '',
          front_shiny: null,
          back_default: null,
          back_shiny: null,
          other: {
            'official-artwork': { front_default: '' }
          }
        }
      };
    }

    // Otherwise, return the pokemon with fallbacks for all required fields
    return {
      id: pokemonProp.id || 0,
      name: pokemonProp.name || 'Unknown Pokémon',
      height: pokemonProp.height || 0,
      weight: pokemonProp.weight || 0,
      base_experience: pokemonProp.base_experience || 0,
      types: Array.isArray(pokemonProp.types) ? pokemonProp.types : [],
      abilities: Array.isArray(pokemonProp.abilities) ? pokemonProp.abilities : [],
      stats: Array.isArray(pokemonProp.stats) ? pokemonProp.stats : [],
      sprites: {
        front_default: pokemonProp.sprites?.front_default || '',
        front_shiny: pokemonProp.sprites?.front_shiny || null,
        back_default: pokemonProp.sprites?.back_default || null,
        back_shiny: pokemonProp.sprites?.back_shiny || null,
        other: {
          'official-artwork': {
            front_default: pokemonProp.sprites?.other?.['official-artwork']?.front_default || 
                          pokemonProp.sprites?.front_default ||
                          ''
          }
        }
      }
    };
  }, [pokemonProp]);
  // Função para obter a imagem principal do Pokémon
  const getMainImage = () => {
    return pokemon.sprites.other?.['official-artwork']?.front_default || 
           pokemon.sprites.front_default || 
           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/0.png';
  };

  // Função para formatar o ID do Pokémon
  const formatPokemonId = (id: number) => {
    return `#${id.toString().padStart(3, '0')}`;
  };

  // Função para formatar o nome do Pokémon
  const formatPokemonName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <Card 
      className={`transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${featured ? 'ring-2 ring-primary shadow-lg' : ''} h-full flex flex-col`}
    >
      <CardHeader className="pb-2 pt-4">
        <div className="relative">
          <div className="w-full flex justify-center">
            <img
              src={getMainImage()}
              alt={pokemon.name}
              className="w-32 h-32 object-contain transition-transform duration-300 hover:scale-110"
              loading="lazy"
              onError={(e) => {
                // Fallback para imagem padrão em caso de erro
                const target = e.target as HTMLImageElement;
                target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/0.png';
              }}
            />
          </div>
          
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-0 right-0 p-2 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorite ? (
              <Heart className="w-5 h-5 text-red-500 fill-current animate-pulse" />
            ) : (
              <HeartOff className="w-5 h-5 text-muted-foreground hover:text-red-500" />
            )}
          </Button>
        </div>
        
        <div className="mt-2">
          <CardTitle className="text-xl font-bold text-foreground">
            {formatPokemonName(pokemon.name)}
          </CardTitle>
          <CardDescription className="font-mono text-sm">
            {formatPokemonId(pokemon.id)}
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Tipos */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-3">
          {pokemon?.types?.filter(type => type?.type?.name).map((type, index) => {
            const typeName = type?.type?.name || 'unknown';
            return (
              <Badge
                key={`${typeName}-${index}`}
                className={`${getPokemonTypeColor(typeName)} text-xs font-medium px-2 py-1`}
                variant="secondary"
              >
                {typeName.toUpperCase()}
              </Badge>
            );
          })}
          {(!pokemon.types || pokemon.types.length === 0) && (
            <Badge className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1">
              UNKNOWN
            </Badge>
          )}
        </div>
        
        {/* Estatísticas básicas */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-muted/30 p-3 rounded-lg text-center hover:shadow-sm transition-shadow">
            <div className="text-2xl font-bold text-foreground">
              {pokemon?.height ? (pokemon.height / 10).toFixed(1) + 'm' : '???'}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Altura
            </div>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg text-center hover:shadow-sm transition-shadow">
            <div className="text-2xl font-bold text-foreground">
              {pokemon?.weight ? (pokemon.weight / 10).toFixed(1) + 'kg' : '???'}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Peso
            </div>
          </div>
        </div>

        {/* Habilidades */}
        {pokemon.abilities && pokemon.abilities.length > 0 && (
          <div className="mt-auto pt-3 border-t border-border">
            <div className="text-sm font-medium text-foreground/90 mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-1.5 text-yellow-500" />
              Habilidades
            </div>
            <div className="flex flex-wrap gap-1.5">
              {pokemon.abilities.slice(0, 3).map((ability, index) => (
                <Badge 
                  key={`${ability.ability.name}-${index}`} 
                  variant="outline" 
                  className="text-xs px-2 py-0.5 font-normal bg-background/50 hover:bg-muted/50"
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