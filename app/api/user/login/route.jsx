import dbConnect from "@/lib/dbconnect";
import User from "@/modeles/User.model";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";

export async function POST(req) {
  await dbConnect();

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON input" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { email, password } = body;

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email and password required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: "Invalid password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create JWT payload with user details
    const payload = {
      id: user._id.toString(),
      email: user.email,
      userName: user.userName,
      role: user.role,
      
    };

    // Sign token
    const token = JWT.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    // Set HTTP-only cookie with secure flags (set Secure only in production)
    const cookieOptions = [
      `token=${token}`,
      "HttpOnly",
      "Path=/",
      "Max-Age=86400",
      "SameSite=Strict",
    ];
    if (process.env.NODE_ENV === "production") {
      cookieOptions.push("Secure");
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          userName: user.userName,
          role: user.role,
          token
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookieOptions.join("; "),
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(req) {
  try {
    // Extract token from cookies (Next.js 13+ app router way)
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - No token" },
        { status: 401 }
      );
    }

    // Verify token and extract payload
    const decoded = JWT.verify(token, JWT_SECRET);

    return NextResponse.json({
      success: true,
      message: `Welcome, ${decoded.email}`,
      user: {
        email: decoded.email,
        role: decoded.role,
        userName: decoded.userName,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
