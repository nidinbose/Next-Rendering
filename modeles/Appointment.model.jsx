import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default Appointment;
