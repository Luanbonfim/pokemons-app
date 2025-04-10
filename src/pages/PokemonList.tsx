import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import './PokemonList.css';
import { Pokemon } from '../types/Pokemon';
import { fetchPokemons } from '../store/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const PokemonList: React.FC = () => {
    const appDispatch = useAppDispatch();
    const { pokemons, loading, error, hasMore, offset } = useAppSelector(state => state.pokemon);
    const navigate = useNavigate();
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        appDispatch(fetchPokemons(0));
    }, [appDispatch]);

    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                appDispatch(fetchPokemons(offset));
            }
        }, { threshold: 0.5 });
        
        const sentinel = document.getElementById('sentinel');
        if (sentinel) {
            observer.current.observe(sentinel);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [hasMore, loading, offset, appDispatch]);

    const handlePokemonClick = (id: number) => {
        navigate(`/pokemon/${id}`);
    };

    if (loading && pokemons.length === 0) return <Loading />;
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
            
            {loading && pokemons.length > 0 && (
                <div className="loading-more">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default PokemonList; 