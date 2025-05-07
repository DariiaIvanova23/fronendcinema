import React, { useState } from 'react';

const BookingForm = ({ selectedSeats, movieId, onBookingComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Обробник зміни полів форми
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Валідація форми
  const validateForm = () => {
    const newErrors = {};
    
    // Валідація імені
    if (!formData.name.trim()) {
      newErrors.name = "Будь ласка, введіть ваше ім'я";
    }
    
    // Валідація телефону
    if (!formData.phone.trim()) {
      newErrors.phone = "Будь ласка, введіть номер телефону";
    } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.trim())) {
      newErrors.phone = "Введіть коректний номер телефону (10-12 цифр)";
    }
    
    // Валідація email
    if (!formData.email.trim()) {
      newErrors.email = "Будь ласка, введіть ваш email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Введіть коректний email";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Обробник відправки форми
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Підготовка даних для відправки
      const bookingData = {
        ...formData,
        movieId,
        seats: selectedSeats,
      };
      
      // Виклик функції для збереження бронювання
      onBookingComplete(bookingData);
      
      // Скидаємо форму
      setFormData({
        name: '',
        phone: '',
        email: ''
      });
      
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="booking-form-container">
      <h3>Введіть дані для бронювання:</h3>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="name">Ім'я:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "form-input error" : "form-input"}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Телефон:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "form-input error" : "form-input"}
            placeholder="+380XXXXXXXXX"
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "form-input error" : "form-input"}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        
        <button 
          type="submit" 
          className="booking-submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Обробка..." : "Забронювати"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;