import clientPromise from '../../../lib/dbconnect';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, date, time, status, doctorId, doctorName } = body;

    if (!name || !date || !time || !status || !doctorId || !doctorName) {
      return new Response(JSON.stringify({ success: false, message: "All fields are required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('next-appointment');

    const existing = await db.collection('bookings').findOne({ doctorId, date, time });
    if (existing) {
      return new Response(JSON.stringify({ success: false, message: "Slot already booked" }), { status: 409 });
    }

    const result = await db.collection('bookings').insertOne({
      name,
      date,
      time,
      status,
      doctorId,
      doctorName,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({
      success: true,
      message: "Appointment booked successfully",
      booking: { _id: result.insertedId, name, date, time, status, doctorId, doctorName },
    }), { status: 200 });
  } catch (error) {
    console.error("Appointment booking error:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error while booking appointment",
    }), { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('next-appointment');

    const bookings = await db.collection('bookings').find({}).toArray();
    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch bookings", error }), { status: 500 });
  }
}
