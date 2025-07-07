import { createOrder, getAllOrders } from "@/src/backend/service/orderService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await getAllOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao buscar Café" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const order = await createOrder(data);
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      const message =
        error.message === "Produto não encontrado"
          ? "O Produto solicitado não existe"
          : error.message === "Estoque insuficiente"
          ? "Estoque insuficiente para o produto solicitado"
          : "Erro interno ao criar pedido";

      return NextResponse.json(
        { error: message },
        { status: error.message === "Erro interno ao criar pedido" ? 500 : 400 }
      );
    }

    return NextResponse.json(
      { error: error, message: "Erro ao criar Produto" },
      { status: 500 }
    );
  }
}
