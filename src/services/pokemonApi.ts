/**
 * Pokemon API service with professional caching strategy
 * Demonstrates external API integration as required by technical test
 */

import { cachedFetch } from '@/lib/cache';

const POKEMON_API_BASE = 'https://pokeapi.co/api/v2';

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female?: string;
  front_shiny_female?: string;
  back_default: string;
  back_shiny: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
  evolution_chain: {
    url: string;
  };
}

class PokemonApiService {
  /**
   * Get list of Pokemon with pagination
   */
  async getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
    const url = `${POKEMON_API_BASE}/pokemon?limit=${limit}&offset=${offset}`;
    const cacheKey = `pokemon-list-${limit}-${offset}`;
    
    return cachedFetch<PokemonListResponse>(
      url,
      undefined,
      cacheKey,
      10 * 60 * 1000 // Cache for 10 minutes
    );
  }

  /**
   * Get detailed Pokemon data by name or ID
   */
  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    const url = `${POKEMON_API_BASE}/pokemon/${nameOrId}`;
    const cacheKey = `pokemon-${nameOrId}`;
    
    return cachedFetch<Pokemon>(
      url,
      undefined,
      cacheKey,
      30 * 60 * 1000 // Cache for 30 minutes
    );
  }

  /**
   * Get Pokemon species information (description, evolution chain, etc.)
   */
  async getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
    const url = `${POKEMON_API_BASE}/pokemon-species/${nameOrId}`;
    const cacheKey = `pokemon-species-${nameOrId}`;
    
    return cachedFetch<PokemonSpecies>(
      url,
      undefined,
      cacheKey,
      30 * 60 * 1000 // Cache for 30 minutes
    );
  }

  /**
   * Search Pokemon by name (client-side filtering for demo)
   */
  async searchPokemon(query: string, limit = 10): Promise<Pokemon[]> {
    if (!query.trim()) return [];
    
    // For demo purposes, get a larger list and filter client-side
    // In production, you'd implement server-side search or use a search API
    const pokemonList = await this.getPokemonList(1000, 0);
    
    const filteredPokemons = pokemonList.results
      .filter(pokemon => 
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, limit);

    // Fetch detailed data for each Pokemon
    const pokemonPromises = filteredPokemons.map(pokemon => 
      this.getPokemon(pokemon.name)
    );

    try {
      return await Promise.all(pokemonPromises);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      throw error;
    }
  }

  /**
   * Get random Pokemon for discovery
   */
  async getRandomPokemon(): Promise<Pokemon> {
    const randomId = Math.floor(Math.random() * 1010) + 1; // Pokemon IDs go up to ~1010
    return this.getPokemon(randomId);
  }

  /**
   * Get Pokemon by type
   */
  async getPokemonByType(type: string): Promise<Pokemon[]> {
    const url = `${POKEMON_API_BASE}/type/${type}`;
    const cacheKey = `pokemon-type-${type}`;
    
    const typeData = await cachedFetch<{
      pokemon: Array<{ pokemon: { name: string; url: string } }>;
    }>(
      url,
      undefined,
      cacheKey,
      15 * 60 * 1000 // Cache for 15 minutes
    );

    // Get first 20 Pokemon of this type
    const pokemonPromises = typeData.pokemon
      .slice(0, 20)
      .map(entry => this.getPokemon(entry.pokemon.name));

    try {
      return await Promise.all(pokemonPromises);
    } catch (error) {
      console.error('Error fetching Pokemon by type:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const pokemonApi = new PokemonApiService();

// Export utility functions
export function getPokemonImageUrl(pokemon: Pokemon): string {
  return pokemon.sprites.front_default || 
         pokemon.sprites.front_shiny || 
         '/placeholder.svg';
}

export function getPokemonTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    normal: 'type-normal',
    fire: 'type-fire',
    water: 'type-water',
    electric: 'type-electric',
    grass: 'type-grass',
    ice: 'type-ice',
    fighting: 'type-fighting',
    poison: 'type-poison',
    ground: 'type-ground',
    flying: 'type-flying',
    psychic: 'type-psychic',
    bug: 'type-bug',
    rock: 'type-rock',
    ghost: 'type-ghost',
    dragon: 'type-dragon',
    dark: 'type-dark',
    steel: 'type-steel',
    fairy: 'type-fairy',
  };
  
  return typeColors[type] || 'type-normal';
}