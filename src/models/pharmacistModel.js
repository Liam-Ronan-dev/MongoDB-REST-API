import mongoose from 'mongoose';

const pharmacistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

export const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);
