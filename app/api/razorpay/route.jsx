// app/api/razorpay/route.js

import Razorpay from "razorpay";
import crypto from "crypto";
import dbConnect from "../../../lib/dbconnect";
import DoctorBooking from "../../../modeles/razorpay.model";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { doctorId, patientName, email, phone, amount, receipt } = body;

    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: receipt || `receipt_${Math.random().toString(36).substring(2, 10)}`,
    };

    const order = await razorpay.orders.create(options);


    const booking = new DoctorBooking({
      doctorId,
      patientName,
      email,
      phone,
      amount,
      orderId: order.id,
      status: 'created',
    });

    await booking.save();

    return new Response(JSON.stringify({ success: true, order }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return new Response(JSON.stringify({ error: "Failed to create Razorpay order" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const booking = await DoctorBooking.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        status: "paid",
        paymentId: razorpay_payment_id,
      },
      { new: true }
    );

    if (!booking) {
      return new Response(JSON.stringify({ error: "Booking not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true, booking }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
