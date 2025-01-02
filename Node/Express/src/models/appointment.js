import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  time: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
