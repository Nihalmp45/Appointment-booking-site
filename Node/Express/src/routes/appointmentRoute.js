import express from 'express'
import { getAvailableSlots,bookSlot,getBookingsForDate } from '../controllers/appointmentController.js';

const router = express.Router();


router.get('/slots/:date', getAvailableSlots); // Get available slots
router.post('/book', bookSlot);               // Book a slot
router.get('/bookings/:date', getBookingsForDate); // Get bookings for a date

export default router
