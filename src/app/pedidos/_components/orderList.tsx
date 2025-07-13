"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Order } from "@/src/backend/model/schemaModel";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import useUsers from "@/src/hooks/useUser";
import { ChevronDown, Info, ShoppingBasket } from "lucide-react";
import React, { useEffect } from "react";

const paymentLabels = {
  PENDING: "Aguardando pagamento",
  SUCCEEDED: "Pago",
  FAILED: "Pagamento falhou",
  CANCELED: "Pagamento cancelado",
  PROCESSING: "Processando pagamento"
};

const orderLabels = {
  AWAITING: "Aguardando confirmação",
  PAID: "Pagamento aprovado",
  PREPARING: "Sendo preparado",
  SHIPPED: "Enviado",
  DELIVERED: "Entregue",
  CANCELED: "Pedido cancelado"
};

export default function OrderList({ userId }: { userId: string }) {
  const { fetchUserOrder, userOrders, loading, error } = useUsers();
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserOrder(userId);
    }
  }, [userId]);

  if (loading) return <p>Carregando pedidos...</p>;
  if (error) return <p>{error}</p>;

  console.log("Pedidos do usuario: ", userOrders);

  return (
    <div className="font-sans">
      <Label className="text-2xl my-2">
        <ShoppingBasket className="h-10 w-10" /> Meus Pedidos
      </Label>
      {userOrders.length === 0 ? (
        <p>Você ainda não fez nenhum pedido. :(</p>
      ) : (
        userOrders.map((order) => (
          <div
            key={order.id}
            className="bg-secondary mb-4 p-4 border rounded-xl"
          >
            <div className="flex items-center gap-4">
              <Label>
                Pedido: <span>{order.id}</span>
              </Label>
              <span>-</span>
              <Label>
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString("pt-BR", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric"
                    })
                  : ""}
              </Label>
            </div>
            <p>
              Status:{" "}
              {paymentLabels[order.paymentStatus as keyof typeof paymentLabels]}
            </p>
            <p>
              Status:{" "}
              {orderLabels[order.orderStatus as keyof typeof orderLabels]}
            </p>
            <Label className="text-lg">Total: R$ {order.total}</Label>
            <div className="border-[1px] rounded-md px-3 mt-2">
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="flex w-full flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-4 px-4">
                  <div className="flex items-center gap-2">
                    <Info />
                    <h4 className="text-sm font-semibold">
                      Detalhes do pedido
                    </h4>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <ChevronDown
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="">
                  {order.items.map((item: Order) => (
                    <div key={item.id} className="flex items-center gap-2 my-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-24 w-24"
                      />
                      <span className="font-bold text-sm">
                        {item.product.name} - R${item.product.price}
                      </span>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
