"use server";

import { Card, CardContent } from "@/src/components/ui/card";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import Dashbar from "./_components/Dashbar";
import TabItens from "./_components/TabItens";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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

async function checkAdmin() {
  const session = await auth();

  return session;
}

export default async function AdminPage() {
  const session = await checkAdmin();

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Dashbar user={session?.user} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
          <p className="">Gerencie sua loja Woodtown</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-secondary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <TabItens />
      </div>
    </div>
  );
}
