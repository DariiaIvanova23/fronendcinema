import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import movies from '../data/movies';

const Booking = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  useEffect(() => {
    // Знаходимо фільм за id
    const foundMovie = movies.find(m => m.id === parseInt(id));
    setMovie(foundMovie);
  }, [id]);
  
  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };
  
  
  if (!movie) {
    return <div className="loading">Завантаження...</div>;
  }

  return (
    <div className="booking-container">
      <div className="booking-header">
        <Link to="/" className="back-button">← Повернутися до списку фільмів</Link>
      </div>
      <div className="movie-info-booking">
        <img src={movie.image} alt={movie.title} className="movie-poster-booking" />
        <div className="movie-details-booking">
          <h3>{movie.title}</h3>
          <p className="movie-genre-booking">Жанр: {movie.genre}</p>
          <p className="movie-time-booking">Час сеансу: {movie.showtime}</p>
        </div>
      </div>
      
      <div className="hall-section">
        <CinemaHall movieId={movie.id} onSeatSelect={handleSeatSelect} />
      </div>
      
      {selectedSeats.length > 0 && (
        <div className="booking-actions">
          <button 
            className="booking-button"
          >
            Забронювати {selectedSeats.length} місц{selectedSeats.length === 1 ? 'е' : selectedSeats.length < 5 ? 'я' : 'ь'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Booking;