import React from 'react';
import './Loading.css';

interface LoadingProps {
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className = '' }) => {
  return (
    <div className={`loading-container ${className}`}>
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loading; 