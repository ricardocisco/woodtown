"use client";

import {
  formData,
  formSchema,
  userFormData
} from "@/src/backend/model/formSchema";
import { AlertDialogFooter } from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import { DialogClose, DialogFooter } from "@/src/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import useProduct from "@/src/hooks/useProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm
} from "react-hook-form";

export default function Form() {
  const { createProduct } = useProduct();
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
    <div>
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="border-zinc-600">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent className="border-zinc-600">
                    <SelectItem value="Shapes">Shapes</SelectItem>
                    <SelectItem value="Rolamentos">Rolamentos</SelectItem>
                    <SelectItem value="Roupas">Roupas</SelectItem>
                    <SelectItem value="Acessorios">Acessórios</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
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
              <p className="text-red-500">{errors.description.message}</p>
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
              <p className="text-red-500">{errors.imageUrl.message}</p>
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
    </div>
  );
}
