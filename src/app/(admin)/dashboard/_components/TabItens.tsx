"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/src/components/ui/tabs";
import { Users } from "lucide-react";
import OrderList from "./OrderList";
import ProductList from "./ProductList";
import UserList from "./UserList";

export default function TabItens() {
  return (
    <Tabs defaultValue="products" className="space-y-6">
      <TabsList className="bg-secondary">
        <TabsTrigger
          value="products"
          className="data-[state=active]:bg-amber-600"
        >
          Produtos
        </TabsTrigger>
        <TabsTrigger
          value="orders"
          className="data-[state=active]:bg-amber-600"
        >
          Pedidos
        </TabsTrigger>
        <TabsTrigger
          value="customers"
          className="data-[state=active]:bg-amber-600"
        >
          Clientes
        </TabsTrigger>
      </TabsList>

      {/* Products Tab */}
      <ProductList />

      {/* Orders Tab */}
      <OrderList />
      {/* Customers Tab */}
      <UserList />
    </Tabs>
  );
}
