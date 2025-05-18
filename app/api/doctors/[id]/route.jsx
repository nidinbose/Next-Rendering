import { ObjectId } from 'mongodb';
import clientPromise from '../../../../lib/dbconnect';

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('next-appointment');

    const doctor = await db.collection('doctors').findOne({
      _id: new ObjectId(params.id),
    });

    if (!doctor) {
      return new Response(JSON.stringify({ error: 'Doctor not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(doctor), { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}


export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { name, email, contact, location, stream, image } = body;

    const client = await clientPromise;
    const db = client.db('next-appointment');

    const result = await db.collection('doctors').updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          name,
          email,
          contact,
          location,
          stream,
          image,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: 'Doctor not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Doctor updated' }), { status: 200 });
  } catch (error) {
    console.error('PUT Error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('next-appointment');

    const result = await db.collection('doctors').deleteOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: 'Doctor not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Doctor deleted' }), { status: 200 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
