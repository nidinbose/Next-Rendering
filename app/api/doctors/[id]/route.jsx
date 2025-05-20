
import dbConnect from '../../../../lib/dbconnect';
import Doctor from '../../../../modeles/Doctor.model';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
    }

    const doctor = await Doctor.findById(id);

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
    await dbConnect();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
    }

    const body = await req.json();
    const { name, email, contact, location, stream, image } = body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {
        name,
        email,
        contact,
        location,
        stream,
        image,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedDoctor) {
      return new Response(JSON.stringify({ error: 'Doctor not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Doctor updated', doctor: updatedDoctor }), {
      status: 200,
    });
  } catch (error) {
    console.error('PUT Error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
    }

    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return new Response(JSON.stringify({ error: 'Doctor not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Doctor deleted' }), { status: 200 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
