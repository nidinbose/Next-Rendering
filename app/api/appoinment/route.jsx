import dbConnect from '../../../lib/dbconnect';
import Appointment from '@/modeles/Appointment.model';

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, date, time, status, doctorId, doctorName } = body;

    if (!name || !date || !time || !status || !doctorId || !doctorName) {
      return new Response(JSON.stringify({
        success: false,
        message: "All fields are required"
      }), { status: 400 });
    }

    const existing = await Appointment.findOne({ doctorId, date, time });
    if (existing) {
      return new Response(JSON.stringify({
        success: false,
        message: "Slot already booked"
      }), { status: 409 });
    }

    const newAppointment = await Appointment.create({
      name,
      date,
      time,
      status,
      doctorId,
      doctorName
    });

    return new Response(JSON.stringify({
      success: true,
      message: "Appointment booked successfully",
      booking: newAppointment
    }), { status: 200 });

  } catch (error) {
    console.error("POST Error:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error while booking appointment"
    }), { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const bookings = await Appointment.find();
    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(JSON.stringify({
      message: "Failed to fetch bookings",
      error: error.message
    }), { status: 500 });
  }
}


 