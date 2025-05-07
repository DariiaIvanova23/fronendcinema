import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import BookingForm from '../components/BookingForm';
import BookingService from '../services/BookingService';
import movies from '../data/movies';

// Імпортуємо react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  useEffect(() => {
    // Знаходимо фільм за id
    const foundMovie = movies.find(m => m.id === parseInt(id));
    setMovie(foundMovie);
  }, [id]);
  
  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
    // Якщо користувач зняв вибір з усіх місць, ховаємо форму
    if (seats.length === 0) {
      setShowBookingForm(false);
    }
  };
  
  const handleShowBookingForm = () => {
    setShowBookingForm(true);
  };
  
  const handleBookingComplete = (bookingData) => {
    try {
      // Зберігаємо бронювання через BookingService
      const result = BookingService.saveBooking(bookingData);
      
      if (result.success) {
        // Показуємо повідомлення про успішне бронювання
        toast.success('Квитки успішно заброньовано!', {
          position: "top-center",
          autoClose: 3000
        });
        
        // Через 3 секунди перенаправляємо на головну сторінку
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        // Показуємо повідомлення про помилку
        toast.error('Помилка бронювання. Спробуйте ще раз.', {
          position: "top-center"
        });
      }
    } catch (error) {
      console.error('Помилка при бронюванні:', error);
      toast.error('Сталася непередбачена помилка. Спробуйте ще раз.', {
        position: "top-center"
      });
    }
  };
  
  
  if (!movie) {
    return <div className="loading">Завантаження...</div>;
  }

  return (
    <div className="booking-container">
      {/* Додаємо ToastContainer для сповіщень */}
      <ToastContainer />
      
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
      
      {selectedSeats.length > 0 && !showBookingForm && (
        <div className="booking-actions">
          <button 
            className="booking-button"
            onClick={handleShowBookingForm}
          >
            Забронювати {selectedSeats.length} місц{selectedSeats.length === 1 ? 'е' : selectedSeats.length < 5 ? 'я' : 'ь'}
          </button>
        </div>
      )}
      
      {showBookingForm && (
        <div className="booking-form-section">
          <BookingForm 
            selectedSeats={selectedSeats} 
            movieId={movie.id} 
            onBookingComplete={handleBookingComplete} 
          />
        </div>
      )}
    </div>
  );
};

export default Booking;