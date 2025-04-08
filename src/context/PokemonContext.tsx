import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { getPokemonList, getPokemonDetails } from '../services/pokemonService';
import { Pokemon, PokemonListResponse } from '../types/Pokemon';
import { PokemonError } from '../types/Interfaces/PokemonError';

interface PokemonContextType {
  pokemons: Pokemon[];
  loading: boolean;
  error: PokemonError | null;
  selectedPokemon: Pokemon | null;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
  fetchPokemonDetails: (id: string | number) => Promise<void>;
  loadMorePokemons: () => Promise<void>;
  hasMore: boolean;
  isLoadingMore: boolean;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const usePokemon = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PokemonError | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const limit = 20;

  const fetchPokemons = async (currentOffset: number = 0) => {
    try {
      if (currentOffset === 0) {
        setLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      
      const response = await getPokemonList(currentOffset, limit);
      
      // Check if there are more Pokemon to load
      setHasMore(response.next !== null);
      
      const pokemonDetails = await Promise.all(
        response.results.map(pokemon => getPokemonDetails(pokemon.name))
      );
      
      if (currentOffset === 0) {
        setPokemons(pokemonDetails);
      } else {
        setPokemons(prevPokemons => [...prevPokemons, ...pokemonDetails]);
      }
      
      setError(null);
    } catch (err) {

      if (err instanceof Error) {
        setError({
          message: err.message,
          code: 'FETCH_ERROR'
        });

      } else {

        setError({
          message: 'Failed to fetch Pokemon data',
          code: 'UNKNOWN_ERROR'
        });

      }
    } finally {

      setLoading(false);
      setIsLoadingMore(false);
      
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const loadMorePokemons = async () => {
    if (!hasMore || isLoadingMore) return;
    
    const nextOffset = offset + limit;
    setOffset(nextOffset);
    await fetchPokemons(nextOffset);
  };

  const fetchPokemonDetails = async (id: string | number) => {
    try {
      setLoading(true);
      const data = await getPokemonDetails(id);
      setSelectedPokemon(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError({
          message: err.message,
          code: 'FETCH_ERROR'
        });
      } else {
        setError({
          message: 'Failed to fetch Pokemon details',
          code: 'UNKNOWN_ERROR'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const value = {
    pokemons,
    loading,
    error,
    selectedPokemon,
    setSelectedPokemon,
    fetchPokemonDetails,
    loadMorePokemons,
    hasMore,
    isLoadingMore
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
}; 