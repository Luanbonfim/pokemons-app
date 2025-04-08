import { PokemonError } from "./Interfaces/PokemonError";

export const getPokemonError = (message: string, code?: string, status?: number): PokemonError => {
  return {
    message,
    code,
    status
  };
}; 