"use server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
          images: item.imageUrl ? [item.imageUrl] : []
        },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      //   ui_mode: "embedded",
      line_items,
      mode: "payment",
      payment_method_types: ["card"],
      //   return_url: `${request.headers.get(
      //     "origin"
      //   )}/payment-confimartion?session_id={CHECKOUT_SESSION_ID}`,
      success_url:
        "http://localhost:3000/payment-confirmed?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/payment-canceled?order_id=${orderId}"
    });

    return NextResponse.json({
      url: session.url,
      id: session.id
      //   client_secret: session.client_secret
    });
  } catch (e) {
    return Response.json(e, { status: 400 });
  }
}
