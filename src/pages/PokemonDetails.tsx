import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import { usePokemon } from '../context/PokemonContext';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import './PokemonDetails.css';

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedPokemon, loading, error, fetchPokemonDetails } = usePokemon();

  useEffect(() => {
    if (id) {
      fetchPokemonDetails(id);
    }
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!selectedPokemon) return <div className="not-found">Pokemon not found</div>;

  return (
    <div className="pokemon-details">
      <button className="back-button" onClick={() => navigate('/')}>
        &larr; Back to List
      </button>
      
      <div className="pokemon-details-container">
        <PokemonCard 
          pokemon={selectedPokemon} 
          className="detailed"
        />
        
        <div className="pokemon-stats">
          <h3>Stats</h3>
          <div className="stats-grid">
            {selectedPokemon.stats?.map((stat: any) => (
              <div key={stat.stat.name} className="stat-item">
                <span className="stat-name">{stat.stat.name}</span>
                <span className="stat-value">{stat.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails; 