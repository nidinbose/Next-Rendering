
import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  stream: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);

export default Doctor;
