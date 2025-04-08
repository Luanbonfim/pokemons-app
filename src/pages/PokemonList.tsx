import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import { usePokemon } from '../context/PokemonContext';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import './PokemonList.css';
import { Pokemon } from '../types/Pokemon';

const PokemonList: React.FC = () => {
    const { pokemons, loading, error, loadMorePokemons, hasMore, isLoadingMore } = usePokemon();
    const navigate = useNavigate();
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Create the observer
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                loadMorePokemons();
            }
        }, { threshold: 0.5 });

        // Start observing the sentinel element
        const sentinel = document.getElementById('sentinel');
        if (sentinel) {
            observer.current.observe(sentinel);
        }

        // Cleanup function runs before the effect runs again or when component unmounts
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [hasMore, loading, loadMorePokemons]);

    const handlePokemonClick = (id: number) => {
        navigate(`/pokemon/${id}`);
    };

    if (loading  && pokemons.length === 0) return <Loading />;
    if (error) return <ErrorMessage error={error} />;

    return (
        <div className="pokemon-list-page">
            <div className="pokemon-grid">
                {pokemons.map((pokemon: Pokemon) => (
                    <PokemonCard 
                        key={pokemon.id}
                        pokemon={pokemon}
                        onClick={handlePokemonClick}
                    />
                ))}
            </div>
            
            {/* Sentinel element for infinite scrolling */}
            <div id="sentinel" className="sentinel"></div>
            
            {(loading || isLoadingMore) && pokemons.length > 0 && (
                <div className="loading-more">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default PokemonList; 