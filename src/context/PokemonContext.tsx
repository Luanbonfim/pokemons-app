import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pokemon } from '../types/Pokemon';
import { PokemonError } from '../types/PokemonError';
import { getPokemonList, getPokemonDetails } from '../services/pokemonService';

interface PokemonContextType {
  pokemons: Pokemon[];
  loading: boolean;
  error: PokemonError | null;
  selectedPokemon: Pokemon | null;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
  fetchPokemonDetails: (id: string | number) => Promise<void>;
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

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await getPokemonList();
        const pokemonDetails = await Promise.all(
          response.results.map(pokemon => getPokemonDetails(pokemon.name))
        );
        setPokemons(pokemonDetails);
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
      }
    };

    fetchPokemons();
  }, []);

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
    fetchPokemonDetails
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
}; 