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
import React, { useEffect, useState } from "react";

const paymentLabels = {
  PENDING: "Aguardando pagamento",
  SUCCEEDED: "Pago",
  FAILED: "Pagamento falhou",
  CANCELED: "Pagamento cancelado",
  PROCESSING: "Processando pagamento"
};

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
      <Card className="bg-secondary">
        <CardHeader>
          <CardTitle className="">Gerenciar Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="">
                <TableHead className="">Pedido</TableHead>
                <TableHead className="">Cliente</TableHead>
                <TableHead className="">Data</TableHead>
                <TableHead className="">Items</TableHead>
                <TableHead className="">Total</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderFilter.map((order) => (
                <TableRow key={order.id} className="">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell className="">{order.name}</TableCell>
                  <TableCell className="">{order.date}</TableCell>
                  <TableCell className="">{order.items?.length ?? 0}</TableCell>
                  <TableCell className="font-medium">
                    R$ {order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className="">
                      {
                        paymentLabels[
                          order.paymentStatus as keyof typeof paymentLabels
                        ]
                      }
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
