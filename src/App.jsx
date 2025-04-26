import React from 'react';
import MovieList from './components/MovieList';
import movies from './data/movies';
import './index.css';

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <h1>| ~ Forum Cinema ~ |</h1>
      </header>
      
      <main>
        <MovieList movies={movies} />
      </main>
      
      <footer className="footer">
        <p>© 2025 Кінотеатр Форум. Всі права захищено.</p>
      </footer>
    </div>
  );
};

export default App;