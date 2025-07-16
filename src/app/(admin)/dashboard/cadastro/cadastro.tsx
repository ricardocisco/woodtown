"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { formData, formSchema } from "@/src/backend/model/formSchema";
import useOrder from "@/src/hooks/useOrder";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/src/components/ui/select";
import { Product } from "@/src/backend/model/schemaModel";

export default function ProductForm() {
  const { products, deleteProduct, loading, error } = useProduct();
  const { updateProductId } = useOrder();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: undefined,
      price: 0,
      stock: 0,
      description: "",
      imageUrl: ""
    }
  });

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
    form.reset({
      name: product.name,
      category: product.category as
        | "Shapes"
        | "Rolamentos"
        | "Roupas"
        | "Acessorios",
      price: product.price,
      stock: product.stock,
      description: product.description,
      imageUrl: product.imageUrl
    });
  };

  const onSubmit: SubmitHandler<formData> = async (data: formData) => {
    if (!editingProduct || !editingProduct.id) {
      console.error("Produto em edição inválido.");
      return;
    }

    try {
      await updateProductId(editingProduct.id, data);
      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = generateColumns(handleEditProduct);

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
          <>
            <DataTable columns={columns} data={products} />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild></DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Editar Usuario</DialogTitle>
                  <DialogDescription>
                    Preencha os campos para editar o usuario
                  </DialogDescription>
                </DialogHeader>
                <FormProvider {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                      {error && <p className="text-red-500">{error}</p>}
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Imagem</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preço</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(Number(e.target.value));
                                }}
                                placeholder="Ex: 12.50"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estoque</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(Number(e.target.value));
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent className="border-zinc-600">
                                  <SelectItem value="Shapes">Shapes</SelectItem>
                                  <SelectItem value="Rolamentos">
                                    Rolamentos
                                  </SelectItem>
                                  <SelectItem value="Roupas">Roupas</SelectItem>
                                  <SelectItem value="Acessorios">
                                    Acessórios
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Salvar</Button>
                    </DialogFooter>
                  </form>
                </FormProvider>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
}
