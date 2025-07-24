"use client";

import { useSession } from "next-auth/react";
import { useCartStore } from "../app/store/cartStore";
import { Button } from "./ui/button";
import useOrder from "../hooks/useOrder";
import { toast } from "sonner";

export default function PaymentButton() {
  const { items, total } = useCartStore();
  const { createOrder } = useOrder();
  const { data: session, status } = useSession();

  const email = session?.user?.email;

  const handleCheckout = async () => {
    if (status !== "authenticated" || !email) {
      toast.error("Você precisa estar logado para prosseguir com a compra!", {
        position: "top-center"
      });
      return;
    }

    try {
      const orderRes = await createOrder({
        userId: session.user.id,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        })),
        total,
        email: session.user.email
      });

      console.log(orderRes);

      const order = orderRes;

      if (!order?.id) {
        console.log("error ao criar pedido");
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items, orderId: order.id, email })
      });

      const data = await response.json();

      if (data.url) {
        window.open(data.url, "_blank");
      } else {
        alert("Erro ao criar sessão de pagamento");
      }
    } catch (err) {
      console.error("Erro no checkout:", err);
      alert("Ocorreu um erro ao processar o pagamento.");
    }
  };

  return (
    <Button
      className="bg-amber-600 hover:bg-amber-700 text-white"
      onClick={handleCheckout}
    >
      Finalizar Compra
    </Button>
  );
}
