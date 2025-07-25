"use client";

import { Order } from "@/src/backend/model/schemaModel";
import useOrder from "@/src/hooks/useOrder";
import React from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import CardInfo from "./CardProps";

const stats = [
  {
    title: "Total de Produtos",
    value: "156",
    icon: Package,
    color: "text-blue-400"
  },
  {
    title: "Pedidos Hoje",
    value: "23",
    icon: ShoppingCart,
    color: "text-green-400"
  },
  {
    title: "Clientes Ativos",
    value: "1,234",
    icon: Users,
    color: "text-purple-400"
  },
  {
    title: "Receita Mensal",
    value: "R$ 45,678",
    icon: DollarSign,
    color: "text-amber-400"
  }
];

export default function CardData() {
  const { order }: { order: Order[] } = useOrder();
  const { loading } = useOrder();

  const totalRevenue = order.reduce((acc, item) => acc + item.total, 0);
  const totalOrders = order.length;
  const totalUsers = order.map((item) => item.user).length;
  const totalCoffees = order.reduce((acc, item) => acc + item.items.length, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <CardInfo
          key={index}
          label={stat.title}
          icon={<stat.icon className={`h-6 w-6 ${stat.color}`} />}
          data={
            stat.title === "Receita Mensal"
              ? `R$ ${totalRevenue.toFixed(2)}`
              : stat.title === "Pedidos Hoje"
              ? totalOrders.toString()
              : stat.title === "Clientes Ativos"
              ? totalUsers.toString()
              : totalCoffees.toString()
          }
        />
      ))}
    </div>
  );
}
