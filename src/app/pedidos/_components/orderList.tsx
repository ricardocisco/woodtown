"use client";

import useUsers from "@/src/hooks/useUser";
import React, { useEffect } from "react";

export default function OrderList({ userId }: { userId: string }) {
  const { fetchUserOrder, userOrders, loading, error } = useUsers();

  useEffect(() => {
    if (userId) {
      fetchUserOrder(userId);
    }
  }, [userId]);

  if (loading) return <p>Carregando pedidos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Meus Pedidos</h1>
      {userOrders.length === 0 ? (
        <p>Você ainda não fez nenhum pedido. :(</p>
      ) : (
        userOrders.map((order) => (
          <div key={order.id} className="mb-4 p-4 border">
            <p>Status: {order.paymentStatus}</p>
            <p>Status: {order.orderStatus}</p>
            <p>Total: R$ {order.total}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.product.name} — R${item.product.price} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
