"use server";

import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import Pagina from "./Pagina";
import { Label } from "@/src/components/ui/label";

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

export default async function AdminPage() {
  return (
    <Pagina>
      <Label>Dashboard</Label>
      <h1>Teste</h1>
    </Pagina>
  );
}
