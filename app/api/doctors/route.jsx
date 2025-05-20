
import dbConnect from '../../../lib/dbconnect';
import Doctor from '../../../modeles/Doctor.model';

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, contact, location, stream, image } = body;

    if (!name || !email || !contact || !location || !stream || !image) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newDoctor = await Doctor.create({
      name,
      email,
      contact,
      location,
      stream,
      image,
    });

    return new Response(
      JSON.stringify({ message: 'Doctor added', doctorId: newDoctor._id }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('POST Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const doctors = await Doctor.find();

    return new Response(JSON.stringify(doctors), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch doctors' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
