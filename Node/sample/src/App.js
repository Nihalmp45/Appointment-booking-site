import React, { useState, useEffect } from 'react';
import DateSelector from './Components/DateSelector';
import SlotGrid from './Components/SlotGrid';
import BookingForm from './Components/BookingForm';
import './index.css';

const App = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (date) {
      fetchAvailableSlots(date);
    }
  }, [date]);

  const fetchAvailableSlots = async (selectedDate) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/slots/${selectedDate}`);
      const data = await response.json();
      if (response.ok) {
        setAvailableSlots(data.availableSlots);
        setError("");
      } else {
        setError(data.error || "Failed to fetch slots.");
      }
    } catch (error) {
      setError("Error fetching available slots.");
    }
  };

  return (
    <div className="app-container">
      <h2>Appointment Booking</h2>

      <DateSelector date={date} setDate={setDate} />

      {/* Display available slots */}
      {date && availableSlots.length > 0 && (
        <SlotGrid
          availableSlots={availableSlots}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
      )}

      {/* Display booking form */}
      {selectedSlot && (
        <BookingForm
          date={date}
          selectedSlot={selectedSlot}
          setMessage={setMessage}
          setError={setError}
        />
      )}

      {/* Error message */}
      {error && <div className="error">{error}</div>}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default App;
