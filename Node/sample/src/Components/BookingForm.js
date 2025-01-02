import React, { useState } from 'react';

// Utility functions for validation
const isValidPhoneNumber = (phone) => /^\d{10}$/.test(phone);
const isValidName = (name) => /^[A-Za-z\s]{1,50}$/.test(name);

const BookingForm = ({ date, selectedSlot, setMessage, setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleBooking = async (event) => {
    event.preventDefault();

    if (!name || !phone) {
      setError("Both name and phone are required.");
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      setError("Phone number must be a 10-digit number.");
      return;
    }
    if (!isValidName(name)) {
      setError("Name can only contain alphabets and spaces.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:4000/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time: selectedSlot, name, phone }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Booking successful!");
        setName(""); // Reset form
        setPhone("");
      } else {
        setError(data.error || "Booking failed.");
      }
    } catch (error) {
      setError("Error while booking.");
    }
  };

  return (
    <div className="booking-form">
      <h3>Book Your Appointment</h3>
      <form onSubmit={handleBooking}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookingForm;
