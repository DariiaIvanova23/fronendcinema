import React, { useState, useEffect } from 'react';

const CinemaHall = ({ movieId, onSeatSelect }) => {
  // Кількість рядів і місць у залі
  const rows = 8;
  const seatsPerRow = 12;
  
  // Стейт для вибраних і заброньованих місць
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  
  // При першому рендері імітуємо певні місця як заброньовані
  useEffect(() => {
    // Імітуємо завантаження даних з сервера (заброньовані місця)
    // В майбутньому ці дані будуть приходити з BookingService
    const mockBookedSeats = [
      { row: 2, seat: 3 },
      { row: 2, seat: 4 },
      { row: 5, seat: 8 },
      { row: 5, seat: 9 },
      { row: 7, seat: 1 },
      { row: 7, seat: 2 },
      { row: 3, seat: 10 },
      { row: 3, seat: 11 }
    ];
    
    setBookedSeats(mockBookedSeats);
  }, [movieId]);
  
  // Обробка кліку на місце
  const handleSeatClick = (row, seat) => {
    // Перевіряємо, чи місце заброньоване
    const isBooked = bookedSeats.some(
      bookedSeat => bookedSeat.row === row && bookedSeat.seat === seat
    );
    
    if (isBooked) return; // Якщо заброньоване, нічого не робимо
    
    // Перевіряємо, чи місце вже вибране
    const seatIndex = selectedSeats.findIndex(
      selectedSeat => selectedSeat.row === row && selectedSeat.seat === seat
    );
    
    if (seatIndex >= 0) {
      // Якщо вже вибране, знімаємо вибір
      const newSelectedSeats = [...selectedSeats];
      newSelectedSeats.splice(seatIndex, 1);
      setSelectedSeats(newSelectedSeats);
    } else {
      // Якщо не вибране, додаємо до вибраних
      setSelectedSeats([...selectedSeats, { row, seat }]);
    }
  };
  
  // Визначення класу для місця на основі його стану
  const getSeatClass = (row, seat) => {
    const isBooked = bookedSeats.some(
      bookedSeat => bookedSeat.row === row && bookedSeat.seat === seat
    );
    
    const isSelected = selectedSeats.some(
      selectedSeat => selectedSeat.row === row && selectedSeat.seat === seat
    );
    
    if (isBooked) return 'seat booked';
    if (isSelected) return 'seat selected';
    return 'seat available';
  };
  
  // Відправляємо інформацію про вибрані місця батьківському компоненту
  useEffect(() => {
    onSeatSelect(selectedSeats);
  }, [selectedSeats, onSeatSelect]);
  
  // Створюємо схему залу
  const renderCinemaHall = () => {
    const hall = [];
    
    for (let row = 1; row <= rows; row++) {
      const seats = [];
      
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        seats.push(
          <div 
            key={`${row}-${seat}`}
            className={getSeatClass(row, seat)}
            onClick={() => handleSeatClick(row, seat)}
          >
            {seat}
          </div>
        );
      }
      
      hall.push(
        <div key={`row-${row}`} className="row">
          <div className="row-number">{row}</div>
          <div className="seats">{seats}</div>
        </div>
      );
    }
    
    return hall;
  };

  return (
    <div className="cinema-hall-container">
      <div className="screen">Екран</div>
      <div className="cinema-hall">{renderCinemaHall()}</div>
      
      <div className="legend">
        <div className="legend-item">
          <div className="seat-example available"></div>
          <span>Доступне</span>
        </div>
        <div className="legend-item">
          <div className="seat-example selected"></div>
          <span>Вибране</span>
        </div>
        <div className="legend-item">
          <div className="seat-example booked"></div>
          <span>Заброньоване</span>
        </div>
      </div>
      
      <div className="selected-seats-info">
        {selectedSeats.length > 0 ? (
          <>
            <h3>Вибрані місця:</h3>
            <ul>
              {selectedSeats.map(({ row, seat }) => (
                <li key={`selected-${row}-${seat}`}>
                  Ряд {row}, Місце {seat}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Виберіть місця для бронювання</p>
        )}
      </div>
    </div>
  );
};

export default CinemaHall;