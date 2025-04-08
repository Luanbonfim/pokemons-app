import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';
import './App.css';

function App() {
  return (
    <PokemonProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Pokemon List</h1>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pokemon/:id" element={<PokemonDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </PokemonProvider>
  );
}

export default App;
