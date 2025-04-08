import React from 'react';
import './PokemonCard.css';
import { Pokemon } from '../types/Pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (id: number) => void;
  className?: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ 
  pokemon, 
  onClick, 
  className = '' 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(pokemon.id);
    }
  };

  return (
    <div 
      className={`pokemon-card ${className}`}
      onClick={handleClick}
    >
      <img 
        src={pokemon.sprites.front_default} 
        alt={pokemon.name}
        className="pokemon-image"
      />
      <h3 className="pokemon-name">{pokemon.name}</h3>
      <div className="pokemon-types">
        {pokemon.types.map(type => (
          <span 
            key={type.type.name} 
            className={`type-badge ${type.type.name}`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard; 