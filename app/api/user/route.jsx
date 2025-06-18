import dbConnect from "@/lib/dbconnect";
import User from "@/modeles/User.model";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken'

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { userName, password, email,role } = body;

    if (!email || !userName || !password || !role) {
      return new Response(JSON.stringify({ error: "Fields are empty" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const hpassword = await bcrypt.hash(password, 10);

    const data = await User.create({
      email,
      password: hpassword,
      userName,
      role
    });

    if (!data) {
      return new Response(JSON.stringify({ error: "Failed in process" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: "User created successfully" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Registration Error:", error); 
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

