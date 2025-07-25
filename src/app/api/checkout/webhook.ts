"use server";
import db from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PaymentStatus, OrderStatus } from "@prisma/client";
import { logger } from "@/src/lib/logger";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY ?? "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      console.error("❌ Assinatura do webhook ausente");
      return NextResponse.json(
        { error: "Assinatura ausente" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      console.error("❌ Erro na verificação da assinatura:", err);
      return NextResponse.json(
        { error: `Erro na verificação: ${err}` },
        { status: 400 }
      );
    }

    console.log(`🔔 Webhook recebido: ${event.type} - ${event.id}`);

    // Processar diferentes tipos de eventos
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case "checkout.session.expired":
        await handleCheckoutSessionExpired(
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case "payment_intent.canceled":
        await handlePaymentCanceled(event.data.object as Stripe.PaymentIntent);
        break;

      //   case "charge.dispute.created":
      //     await handleChargeDispute(event.data.object as Stripe.Dispute);
      //     break;

      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(
          event.data.object as Stripe.Invoice
        );
        break;

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`⚠️ Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Erro no processamento do webhook:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// Handler para checkout session completada
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  try {
    console.log("💰 Checkout session completada:", session.id);

    const orderId = session.metadata?.orderId;

    if (!orderId) {
      console.error("❌ Order ID não encontrado nos metadados");
      return;
    }

    // Atualizar order no banco de dados
    await db.order.update({
      where: {
        id: orderId,
        stripeSessionId: session.id
      },
      data: {
        paymentStatus: PaymentStatus.SUCCEEDED,
        orderStatus: OrderStatus.PAID,
        updatedAt: new Date()
      }
    });

    // Log da compra
    await logger.logPurchase({
      customerEmail:
        session.customer_email ||
        session.customer_details?.email ||
        "email@desconhecido.com",
      plan: "Carrinho de Compras",
      paymentGateway: "Stripe",
      timestamp: new Date().toISOString()
    });

    console.log(`✅ Order ${orderId} atualizada para PAID via webhook`);
  } catch (error) {
    console.error("❌ Erro ao processar checkout session completada:", error);
    throw error; // Re-throw para que o Stripe tente novamente
  }
}

// Handler para checkout session expirada
async function handleCheckoutSessionExpired(session: Stripe.Checkout.Session) {
  try {
    console.log("⏰ Checkout session expirada:", session.id);

    const orderId = session.metadata?.orderId;

    if (!orderId) {
      console.error("❌ Order ID não encontrado nos metadados");
      return;
    }

    // Atualizar order como expirada
    await db.order.update({
      where: {
        id: orderId,
        stripeSessionId: session.id
      },
      data: {
        paymentStatus: PaymentStatus.FAILED,
        orderStatus: OrderStatus.CANCELED,
        updatedAt: new Date()
      }
    });

    // Log da expiração
    await logger.logCheckoutSessionCreation({
      customerEmail:
        session.customer_email ||
        session.customer_details?.email ||
        "email@desconhecido.com",
      plan: "Carrinho de Compras - EXPIRADO",
      paymentGateway: "Stripe",
      timestamp: new Date().toISOString()
    });

    console.log(`⏰ Order ${orderId} marcada como expirada`);
  } catch (error) {
    console.error("❌ Erro ao processar checkout session expirada:", error);
    throw error;
  }
}

// Handler para pagamento bem-sucedido
async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log("💰 Payment Intent bem-sucedido:", paymentIntent.id);

    const orderId = paymentIntent.metadata?.orderId;

    if (!orderId) {
      console.error(
        "❌ Order ID não encontrado nos metadados do Payment Intent"
      );
      return;
    }

    // Confirmar que a order ainda não foi processada
    const existingOrder = await db.order.findUnique({
      where: { id: orderId }
    });

    if (existingOrder?.paymentStatus === PaymentStatus.SUCCEEDED) {
      console.log(`ℹ️ Order ${orderId} já processada, ignorando`);
      return;
    }

    await db.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.SUCCEEDED,
        orderStatus: OrderStatus.PAID,
        updatedAt: new Date()
      }
    });

    console.log(`✅ Order ${orderId} confirmada via Payment Intent`);
  } catch (error) {
    console.error("❌ Erro ao processar payment succeeded:", error);
    throw error;
  }
}

// Handler para falha no pagamento
async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log("❌ Payment Intent falhou:", paymentIntent.id);

    const orderId = paymentIntent.metadata?.orderId;

    if (!orderId) {
      console.error("❌ Order ID não encontrado nos metadados");
      return;
    }

    await db.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.FAILED,
        orderStatus: OrderStatus.CANCELED,
        updatedAt: new Date()
      }
    });

    // Log da falha
    const errorMessage =
      paymentIntent.last_payment_error?.message || "Erro desconhecido";
    console.error(`💳 Falha no pagamento - Order ${orderId}: ${errorMessage}`);
  } catch (error) {
    console.error("❌ Erro ao processar payment failed:", error);
    throw error;
  }
}

// Handler para pagamento cancelado
async function handlePaymentCanceled(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log("🚫 Payment Intent cancelado:", paymentIntent.id);

    const orderId = paymentIntent.metadata?.orderId;

    if (!orderId) {
      console.error("❌ Order ID não encontrado nos metadados");
      return;
    }

    await db.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: PaymentStatus.CANCELED,
        orderStatus: OrderStatus.CANCELED,
        updatedAt: new Date()
      }
    });

    console.log(`🚫 Order ${orderId} cancelada`);
  } catch (error) {
    console.error("❌ Erro ao processar payment canceled:", error);
    throw error;
  }
}

// Handler para contestação/dispute
// async function handleChargeDispute(dispute: Stripe.Dispute) {
//   try {
//     console.log("⚠️ Contestação criada:", dispute.id);

//     // Buscar a charge relacionada
//     const charge = await stripe.charges.retrieve(dispute.charge as string);

//     if (charge.metadata?.orderId) {
//       await db.order.update({
//         where: { id: charge.metadata.orderId },
//         data: {
//           paymentStatus: PaymentStatus.DISPUTED,
//           orderStatus: OrderStatus.DISPUTED,
//           updatedAt: new Date()
//         }
//       });

//       console.log(`⚠️ Order ${charge.metadata.orderId} marcada como DISPUTED`);
//     }

//     // Log crítico para equipe
//     console.error(`🚨 CONTESTAÇÃO CRÍTICA - Dispute ID: ${dispute.id}, Valor: ${dispute.amount/100}, Motivo: ${dispute.reason}`);

//   } catch (error) {
//     console.error("❌ Erro ao processar dispute:", error);
//     throw error;
//   }
// }

// Handler para invoice payment succeeded (para assinaturas futuras)
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    console.log("📄 Invoice paga:", invoice.id);

    // Aqui você pode implementar lógica para assinaturas
    // Por exemplo, ativar recursos premium
  } catch (error) {
    console.error("❌ Erro ao processar invoice payment succeeded:", error);
    throw error;
  }
}

// Handler para invoice payment failed (para assinaturas futuras)
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  try {
    console.log("📄❌ Falha no pagamento da invoice:", invoice.id);

    // Aqui você pode implementar lógica para assinaturas
    // Por exemplo, notificar sobre falha na renovação
  } catch (error) {
    console.error("❌ Erro ao processar invoice payment failed:", error);
    throw error;
  }
}
