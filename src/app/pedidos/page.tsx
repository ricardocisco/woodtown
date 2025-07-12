import { auth } from "@/auth";
import { Label } from "@/src/components/ui/label";
import React from "react";
import OrderList from "./_components/orderList";

export default async function PedidosPage() {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;

  if (!session?.user?.id) {
    return <p>Carregando sessão...</p>;
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="lg:w-[1040px] w-full mx-auto p-4">
        <Label className="text-2xl">Meus Pedidos</Label>
        <div>
          {userId ? (
            <OrderList userId={userId} />
          ) : (
            <div>Usuário não encontrado</div>
          )}
        </div>
      </div>
    </div>
  );
}
