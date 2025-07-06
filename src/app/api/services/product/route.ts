"use server";
import {
  createProduct,
  getAllProducts
} from "@/src/backend/service/productService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const products = await createProduct(data);
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao criar produto" },
      { status: 500 }
    );
  }
}
