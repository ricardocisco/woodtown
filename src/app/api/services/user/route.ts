"use server";

import { getAllUser } from "@/src/backend/service/userService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await getAllUser();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}
