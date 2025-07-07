"use client";

import { useCartStore } from "../app/store/cartStore";
import { Button } from "./ui/button";

export default function PaymentButton() {
  const { items } = useCartStore();

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items })
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

  return <Button onClick={handleCheckout}>Finalizar Compra</Button>;
}
