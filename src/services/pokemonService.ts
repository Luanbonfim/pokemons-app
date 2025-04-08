import { Pokemon, PokemonListResponse } from '../types/Pokemon';
import { API_CONFIG } from '../config/api';
import { getPokemonError } from '../types/PokemonError';

export const getPokemonList = async (offset: number = 0, limit: number = 20): Promise<PokemonListResponse> => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
        
        if (!response.ok) {
            throw getPokemonError(
                'Failed to fetch Pokemon list', 
                'FETCH_ERROR', 
                response.status
            );
        }
        
        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw getPokemonError(error.message, 'FETCH_ERROR');
        }
        throw getPokemonError('An unknown error occurred while fetching Pokemon list');
    }
};

export const getPokemonDetails = async (nameOrId: string | number): Promise<Pokemon> => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/pokemon/${nameOrId}`);
        
        if (!response.ok) {
            throw getPokemonError(
                'Failed to fetch Pokemon details', 
                'FETCH_ERROR', 
                response.status
            );
        }
        
        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw getPokemonError(error.message, 'FETCH_ERROR');
        }
        throw getPokemonError('An unknown error occurred while fetching Pokemon details');
    }
}; 