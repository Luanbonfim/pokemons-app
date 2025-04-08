import React from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import { usePokemon } from '../context/PokemonContext';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import './PokemonList.css';

const PokemonList: React.FC = () => {
    const { pokemons, loading, error } = usePokemon();
    const navigate = useNavigate();

    const handlePokemonClick = (id: number) => {
        navigate(`/pokemon/${id}`);
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <div className="pokemon-list-page">
            <div className="pokemon-grid">
                {pokemons.map(pokemon => (
                    <PokemonCard 
                        key={pokemon.id}
                        pokemon={pokemon}
                        onClick={handlePokemonClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default PokemonList; 