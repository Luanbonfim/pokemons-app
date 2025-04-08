import React from 'react';
import './ErrorMessage.css';
import { PokemonError } from '../types/Interfaces/PokemonError';

interface ErrorMessageProps {
  error: PokemonError;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, className = '' }) => {
  return (
    <div className={`error-message ${className}`}>
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3 className="error-title">Error</h3>
        <p className="error-text">{error.message}</p>
        {error.code && <p className="error-code">Error code: {error.code}</p>}
        {error.status && <p className="error-status">Status: {error.status}</p>}
      </div>
    </div>
  );
};

export default ErrorMessage; 