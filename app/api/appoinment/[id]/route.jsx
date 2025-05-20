import dbConnect from '../../../../lib/dbconnect';
import Appointment from '../../../../modeles/Appointment.model';

export async function GET(req, context) {
  try {
    const { id } = context.params;

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Doctor ID is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    await dbConnect();

    const appointments = await Appointment.find({ doctorId: id });

    if (!appointments.length) {
      return new Response(
        JSON.stringify({ message: 'No appointments found for this doctor.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify(appointments), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching appointments:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch appointments' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
