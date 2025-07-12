"use server";

import { User } from "@/src/backend/model/schemaModel";
import { updateStatusOrder } from "@/src/backend/service/orderService";
import { deleteUser, getUserById } from "@/src/backend/service/userService";
import { getOrderUserId } from "@/src/backend/service/userService";
import { NextResponse } from "next/server";

async function updateFun(id: string, data: Partial<User>) {
  if (!id) {
    throw new Error("ID não informado");
  }

  const orderStatus = (data as any).orderStatus as string;
  if (!orderStatus) {
    throw new Error("orderStatus não informado");
  }

  return await updateStatusOrder(id, orderStatus);
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

    const result = await deleteUser(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      const message =
        error.message === "ID nao informado"
          ? "ID nao informado"
          : "Erro ao buscar Café";

      return NextResponse.json(
        { error: message },
        { status: error.message === "Erro ao buscar Café" ? 500 : 400 }
      );
    }
    return NextResponse.json(
      { error: error, message: "Erro ao deletar usuário" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const idUser = (await params).id;
  try {
    const { ...data }: { idUser: string; data: Partial<User> } =
      await req.json();
    const update = await updateFun(idUser, data as Partial<User>);
    return NextResponse.json(update);
  } catch (error) {
    console.error(error);
  }
}

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const id = (await params).id;
//   try {
//     if (!id) {
//       return NextResponse.json({ error: "ID não informado" }, { status: 400 });
//     }

//     const user = await getUserById(id);
//     return NextResponse.json(user);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: error }, { status: 500 });
//   }
// }

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    if (!id) {
      return NextResponse.json({ error: "id não informado" }, { status: 400 });
    }

    const details = await getOrderUserId(id);
    return NextResponse.json(details);
  } catch (error) {
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
