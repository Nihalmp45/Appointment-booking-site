import Appointment from '../models/appointment.js';
import dayjs from 'dayjs';

const slots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM"
];

// Utility function to validate date
const isValidDate = (date) => {
  return dayjs(date, "YYYY-MM-DD", true).isValid();
};

// Utility function to validate name
const isValidName = (name) => {
  const nameRegex = /^[A-Za-z\s]{1,50}$/;
  return nameRegex.test(name);
};

// Utility function to validate phone number
const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^\d{10}$/; // Adjust for your region
  return phoneRegex.test(phone);
};

// Get available slots for a specific date
export const getAvailableSlots = async (req, res) => {
  const { date } = req.params;

  if (!isValidDate(date)) {
    return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
  }

  try {
    const bookedAppointments = await Appointment.find({ date });
    const bookedSlots = bookedAppointments.map((appointment) => appointment.time);
    const availableSlots = slots.filter((slot) => !bookedSlots.includes(slot));

    res.status(200).json({ date, availableSlots });
  } catch (error) {
    console.error("Error retrieving available slots:", error);
    res.status(500).json({ error: "Error retrieving available slots." });
  }
};

// Book a slot
export const bookSlot = async (req, res) => {
  const { date, time, name, phone } = req.body;

  if (!date || !time || !name || !phone) {
    return res.status(400).json({ error: "All fields (date, time, name, phone) are required." });
  }

  if (!isValidDate(date)) {
    return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
  }

  if (!slots.includes(time)) {
    return res.status(400).json({ error: "Invalid time slot." });
  }

  if (!isValidName(name)) {
    return res.status(400).json({ error: "Invalid name. Only alphabets and spaces are allowed, up to 50 characters." });
  }

  if (!isValidPhoneNumber(phone)) {
    return res.status(400).json({ error: "Invalid phone number. It must be a 10-digit numeric value." });
  }

  try {
    const existingAppointment = await Appointment.findOne({ date, time });
    if (existingAppointment) {
      return res.status(400).json({ error: "This time slot is already booked." });
    }

    const newAppointment = new Appointment({ date, time, name, phone });
    await newAppointment.save();

    res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: "Error booking appointment. Please try again later." });
  }
};

// Get all bookings for a specific date
export const getBookingsForDate = async (req, res) => {
  const { date } = req.params;

  if (!date) {
    return res.status(400).json({ error: "Date is required." });
  }

  if (!isValidDate(date)) {
    return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
  }

  try {
    const appointments = await Appointment.find({ date });
    if (appointments.length === 0) {
      return res.status(404).json({ message: "No bookings found for the given date." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ error: "Error retrieving bookings. Please try again later." });
  }
};
