import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemonList, getPokemonDetails } from '../services/pokemonService';
import { Pokemon } from '../types/Pokemon';
import { PokemonError } from '../types/Interfaces/PokemonError';

// Simple state interface
interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: PokemonError | null;
  selectedPokemon: Pokemon | null;
  offset: number;
  hasMore: boolean;
}

// Initial state
const initialState: PokemonState = {
  pokemons: [],
  loading: true,
  error: null,
  selectedPokemon: null,
  offset: 0,
  hasMore: true,
};

const limit = 20;

// Simple async thunks that use pokemonService
export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (offset: number = 0) => {
    // Use pokemonService for the API request
    const response = await getPokemonList(offset, limit);
    
    // Get details for each Pokemon
    const pokemonDetails = await Promise.all(
      response.results.map(pokemon => getPokemonDetails(pokemon.name))
    );
    
    return {
      pokemons: pokemonDetails,
      hasMore: response.next !== null,
      offset,
      nextOffset: offset + limit, // Calculate the next offset
    };
  }
);

export const fetchPokemonDetails = createAsyncThunk(
  'pokemon/fetchPokemonDetails',
  async (id: string | number) => {
    // Use pokemonService for the API request
    return await getPokemonDetails(id);
  }
);

// Simple slice with reducers
const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Pokemons
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        if (action.meta.arg === 0) {
          state.pokemons = action.payload.pokemons;
        } else {
          state.pokemons = [...state.pokemons, ...action.payload.pokemons];
        }
        state.hasMore = action.payload.hasMore;
        state.offset = action.payload.nextOffset; // Update to the next offset
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          message: action.error.message || 'Failed to fetch Pokemon data',
          code: 'FETCH_ERROR',
        };
      })
      // Fetch Pokemon Details
      .addCase(fetchPokemonDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        state.selectedPokemon = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPokemonDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          message: action.error.message || 'Failed to fetch Pokemon details',
          code: 'FETCH_ERROR',
        };
      });
  },
});

export const { setSelectedPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer; 