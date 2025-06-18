

import mongoose from "mongoose";

const doctorBookingSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientName: String,
  email: String,
  phone: String,
  amount: Number,
  orderId: String,
  paymentId: String,
  status: { type: String, enum: ["created", "paid"], default: "created" },
}, { timestamps: true });

export default mongoose.models.DoctorBooking || mongoose.model("DoctorBooking", doctorBookingSchema);
