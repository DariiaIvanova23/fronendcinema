import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-description">{movie.description}</p>
        <div className="movie-details">
          <span className="movie-genre">Жанр: {movie.genre}</span>
          <span className="movie-time">Час сеансу: {movie.showtime}</span>
        </div>
        <Link to={`/booking/${movie.id}`} className="booking-link">
          Забронювати
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;