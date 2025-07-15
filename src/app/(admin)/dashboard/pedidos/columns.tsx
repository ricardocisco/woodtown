"use client";

import { Order } from "@/src/backend/model/schemaModel";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { SortAscIcon } from "lucide-react";

const paymentLabels = {
  PENDING: "Aguardando pagamento",
  SUCCEEDED: "Pago",
  FAILED: "Pagamento falhou",
  CANCELED: "Pagamento cancelado",
  PROCESSING: "Processando pagamento"
};

export const columns = (): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "Pedido"
  },
  {
    accessorKey: "name",
    header: "Cliente"
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data <SortAscIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("date")}</div>
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(amount);
    }
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status <SortAscIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue(
        "paymentStatus"
      ) as keyof typeof paymentLabels;
      const label = paymentLabels[status] ?? "Desconhecido";
      return <div>{label}</div>;
    }
  }
];
