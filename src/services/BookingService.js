class BookingService {
    saveBooking(booking) {
      try {
        const bookings = this.getAllBookings();
        bookings.push({
          ...booking,
          id: Date.now(),
          createdAt: new Date().toISOString()
        });

        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        return {
          success: true,
          message: 'Бронювання успішно збережено'
        };
      } catch (error) {
        console.error('Помилка при збереженні бронювання:', error);
        return {
          success: false,
          message: 'Не вдалося зберегти бронювання'
        };
      }
    }

    getAllBookings() {
      try {
        const bookingsData = localStorage.getItem('bookings');
        return bookingsData ? JSON.parse(bookingsData) : [];
      } catch (error) {
        console.error('Помилка при отриманні бронювань:', error);
        return [];
      }
    }

    getBookingsByMovieId(movieId) {
      try {
        const bookings = this.getAllBookings();
        return bookings.filter(booking => booking.movieId === parseInt(movieId));
      } catch (error) {
        console.error(`Помилка при отриманні бронювань для фільму ${movieId}:`, error);
        return [];
      }
    }

    getBookedSeatsByMovieId(movieId) {
      try {
        const bookings = this.getBookingsByMovieId(movieId);
        
        // Збираємо всі заброньовані місця з усіх бронювань для цього фільму
        let bookedSeats = [];
        bookings.forEach(booking => {
          if (booking.seats && Array.isArray(booking.seats)) {
            bookedSeats = [...bookedSeats, ...booking.seats];
          }
        });
        
        return bookedSeats;
      } catch (error) {
        console.error(`Помилка при отриманні заброньованих місць для фільму ${movieId}:`, error);
        return [];
      }
    }

    deleteBooking(bookingId) {
      try {
        const bookings = this.getAllBookings();
        const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        
        return {
          success: true,
          message: 'Бронювання успішно видалено'
        };
      } catch (error) {
        console.error(`Помилка при видаленні бронювання ${bookingId}:`, error);
        return {
          success: false,
          message: 'Не вдалося видалити бронювання'
        };
      }
    }
  }

  export default new BookingService();