
import clientPromise from '../../../lib/dbconnect';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, contact, location, stream, image } = body;

    if (!name || !email || !contact || !location || !stream || !image) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = await clientPromise;
    const db = client.db('next-appointment');

    const result = await db.collection('doctors').insertOne({
      name,
      email,
      contact,
      location,
      stream,
      image,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: 'Doctor added', doctorId: result.insertedId }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ POST /api/doctors error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('next-appointment');
    const doctors = await db.collection('doctors').find({}).toArray();

    return new Response(JSON.stringify(doctors), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('❌ GET /api/doctors error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch doctors' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}