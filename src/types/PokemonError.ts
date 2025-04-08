export interface PokemonError {
  message: string;
  code?: string;
  status?: number;
}

export const getPokemonError = (message: string, code?: string, status?: number): PokemonError => {
  return {
    message,
    code,
    status
  };
}; 