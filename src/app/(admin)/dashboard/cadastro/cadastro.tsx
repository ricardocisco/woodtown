"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog";
import useProduct from "@/src/hooks/useProduct";
import { Edit, Eye, Plus, PlusCircle, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Form from "./form";
import { columns as generateColumns } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function ProductForm() {
  const { products, deleteProduct, loading, error } = useProduct();

  const columns = generateColumns(deleteProduct);

  return (
    <div className="w-full py-2 gap-2">
      <div className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="">
              <PlusCircle />
              Adicionar Item
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Criar um novo anuncio</DialogTitle>
              <DialogDescription>
                Preencha os campos para criar um novo anuncio
              </DialogDescription>
            </DialogHeader>
            <Form />
          </DialogContent>
        </Dialog>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4 w-full">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-[250px]" />
                <Skeleton className="h-6 w-[200px]" />
              </div>
            </div>
          ))
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red-600">
            Erro ao carregar os pedidos
          </div>
        ) : (
          <DataTable columns={columns} data={products} />
        )}
      </div>
    </div>
  );
}
