"use server";
import db from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PaymentStatus, OrderStatus } from "@prisma/client";
import { logger } from "@/src/lib/logger";
import { custom } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function POST(request: NextRequest) {
  try {
    const { items, orderId, userId, email } = await request.json();

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
      line_items,
      mode: "payment",
      payment_method_types: ["card"],
      metadata: {
        orderId,
        userId
      },
      customer_email: email,
      success_url:
        "http://localhost:3000/payment-confirmed?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/payment-canceled?order_id=${orderId}"
    });

    await db.order.update({
      where: {
        id: orderId
      },
      data: {
        stripeSessionId: session.id
      }
    });

    await logger.logCheckoutSessionCreation({
      customerEmail: email,
      plan: "Carrinho de Compras",
      paymentGateway: "Stripe",
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      url: session.url,
      id: session.id
    });
  } catch (e) {
    return Response.json(e, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "ID da sessão ausente" },
      { status: 400 }
    );
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === "paid") {
    await db.order.updateMany({
      where: { stripeSessionId: sessionId },
      data: {
        paymentStatus: PaymentStatus.SUCCEEDED,
        orderStatus: OrderStatus.PAID
      }
    });
  }

  await logger.logPurchase({
    customerEmail: session.customer_email,
    plan: "Carrinho de Compras",
    paymentGateway: "Stripe",
    timestamp: new Date().toISOString()
  });

  return NextResponse.json({
    status: session.payment_status,
    orderId: session.metadata?.orderId
  });
}
