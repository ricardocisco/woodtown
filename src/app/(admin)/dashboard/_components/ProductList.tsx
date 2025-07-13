"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/src/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/src/components/ui/table";
import { TabsContent } from "@/src/components/ui/tabs";
import { Textarea } from "@/src/components/ui/textarea";
import useProduct from "@/src/hooks/useProduct";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formData, formSchema } from "@/src/backend/model/formSchema";

export default function ProductList() {
  const { createProduct, products, deleteProduct, loading } = useProduct();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm<formData>({
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

  const onSubmit = async (data: formData) => {
    try {
      await createProduct(data);
      setError(null);
      reset();
    } catch (error) {
      console.error(error);
      setError("Erro ao criar anuncio");
    }
  };

  return (
    <TabsContent value="products">
      <Card className="bg-secondary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="">Gerenciar Produtos</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Produto
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-secondary max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Produto</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome do Produto</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        className=" border-zinc-600"
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label>Categoria</Label>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="border-zinc-600">
                              <SelectValue placeholder="Selecione uma categoria" />
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
                        )}
                      />
                      {errors.category && (
                        <p className="text-red-500 text-sm">
                          {errors.category.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="price">Preço (R$)</Label>
                      <Input
                        id="price"
                        {...register("price", { valueAsNumber: true })}
                        className=" border-zinc-600"
                      />
                      {errors.price && (
                        <p className="text-red-500">{errors.price.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="stock">Estoque</Label>
                      <Input
                        id="stock"
                        {...register("stock", { valueAsNumber: true })}
                        className=" border-zinc-600"
                      />
                      {errors.stock && (
                        <p className="text-red-500">{errors.stock.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        {...register("description")}
                        className=" border-zinc-600 h-32"
                      />
                      {errors.description && (
                        <p className="text-red-500">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="imageUrl">URL da Imagem</Label>
                      <Input
                        id="imageUrl"
                        {...register("imageUrl")}
                        className=" border-zinc-600"
                      />
                      {errors.imageUrl && (
                        <p className="text-red-500">
                          {errors.imageUrl.message}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2 pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-amber-600 hover:bg-amber-700 flex-1"
                      >
                        {isSubmitting ? "Enviando..." : "Criar Produto"}
                      </Button>
                      <DialogClose asChild>
                        <Button variant="outline" className="">
                          Cancel
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="">
                <TableHead className="">Produto</TableHead>
                <TableHead className="">Preço</TableHead>
                <TableHead className="">Estoque</TableHead>
                <TableHead className="">Categoria</TableHead>
                <TableHead className="">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-lg"
                        unoptimized
                      />
                      <span className=" font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className=" font-medium">
                    R$ {product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="">{product.stock}</TableCell>
                  <TableCell className="">{product.category}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-zinc-600 hover:bg-zinc-700 bg-transparent"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                        onClick={() => deleteProduct(product.id as string)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
