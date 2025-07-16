import { Product } from "@/src/backend/model/schemaModel";
import {
  deleteOrder,
  getOrderItensById,
  updateStatusOrder
} from "@/src/backend/service/orderService";
import { editProduct } from "@/src/backend/service/productService";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    if (!id) {
      return NextResponse.json({ error: "ID não informado" }, { status: 400 });
    }
    const order = await getOrderItensById(id);
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      const message =
        error.message === "ID nao informado"
          ? "ID nao informado"
          : "Erro ao buscar Produto";

      return NextResponse.json(
        { error: message },
        { status: error.message === "Erro ao buscar Produto" ? 500 : 400 }
      );
    }
    return NextResponse.json(
      { error: error, message: "Erro ao buscar Produto" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    if (!id) {
      return NextResponse.json({ error: "ID não informado" }, { status: 400 });
    }
    const result = await deleteOrder(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      const message =
        error.message === "ID nao informado"
          ? "ID nao informado"
          : "Erro ao buscar Produto";

      return NextResponse.json(
        { error: message },
        { status: error.message === "Erro ao buscar Produto" ? 500 : 400 }
      );
    }
    return NextResponse.json(
      { error: error, message: "Erro ao deletar pedido" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const data = body.data;
    const update = await editProduct(id, data);
    return NextResponse.json(update);
  } catch (error) {
    console.error(error);
  }
}
