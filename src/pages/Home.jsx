import React from 'react';
import MovieList from '../components/MovieList';
import movies from '../data/movies';

const Home = () => {
  return (
    <div className="home-container">
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;