import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/dbconnect';

export async function GET(request, { params }) {
  try {
    const {id} = params; 
    
    if (!id) {
      return NextResponse.json(
        { error: 'Doctor ID is required' }, 
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('next-appoinment');

    const appointments = await db
      .collection('bookings')
      .find({ doctorId: id })
      .toArray();

    return NextResponse.json(appointments, { status: 200 });
  } catch (e) {
    console.error('Error fetching appointments:', e);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' }, 
      { status: 500 }
    );
  }
}
