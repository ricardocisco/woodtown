"use client";

import { OrderItem } from "@/src/backend/model/schemaModel";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/src/components/ui/table";
import { TabsContent } from "@/src/components/ui/tabs";
import useOrder from "@/src/hooks/useOrder";
import { Edit, Eye } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function OrderList() {
  const { order, fetchById, loading, error, updateOrderId } = useOrder();
  const [orderDetails, setOrderDetails] = useState<{
    [key: string]: OrderItem[];
  }>({});

  const fetchOrderDetails = async (id: string) => {
    const details = await fetchById(id);
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [id]: details
    }));
  };

  useEffect(() => {
    order.forEach((item) => {
      if (item.id && !orderDetails[item.id]) {
        fetchOrderDetails(item.id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const orderFilter = order.map((item) => ({
    ...item,
    id: item.id,
    userId: item.user?.id,
    email: item.user?.email,
    name: item.user?.name,
    status: item.status,
    items: item.id ? orderDetails[item.id] : [],
    date: item.createdAt
      ? new Date(item.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
      : null
  }));

  return (
    <TabsContent value="orders">
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-white">Gerenciar Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-700">
                <TableHead className="text-zinc-300">Pedido</TableHead>
                <TableHead className="text-zinc-300">Cliente</TableHead>
                <TableHead className="text-zinc-300">Data</TableHead>
                <TableHead className="text-zinc-300">Items</TableHead>
                <TableHead className="text-zinc-300">Total</TableHead>
                <TableHead className="text-zinc-300">Status</TableHead>
                <TableHead className="text-zinc-300">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderFilter.map((order) => (
                <TableRow key={order.id} className="border-zinc-700">
                  <TableCell className="text-white font-medium">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {order.customer}
                  </TableCell>
                  <TableCell className="text-zinc-300">{order.date}</TableCell>
                  <TableCell className="text-zinc-300">{order.items}</TableCell>
                  <TableCell className="text-white font-medium">
                    R$ {order.total.toFixed(2)}
                  </TableCell>
                  {/* <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-zinc-600 text-white hover:bg-zinc-700 bg-transparent"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
