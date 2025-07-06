"use server";
import { deleteProduct } from "@/src/backend/service/productService";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    if (!id) {
      return NextResponse.json({ error: "ID não informado" }, { status: 400 });
    }

    const result = await deleteProduct(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao deletar usuário" },
      { status: 500 }
    );
  }
}
