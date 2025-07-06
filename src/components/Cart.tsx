"use client";

import { DialogDescription } from "@radix-ui/react-dialog";
import { Minus, PackageCheck, Plus, Trash, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";

export default function Orders({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [isError, setIsError] = useState(false);

  // const handleCreateOrder = async () => {
  //   setIsLoading(true);
  //   try {
  //     const order = await createOrder({
  //       userId: userId,
  //       items: items.map((item) => ({
  //         coffeeId: item.id,
  //         quantity: item.quantity
  //       })),
  //       total
  //     });

  //     console.log(order);

  //     setDialogTitle("Compra Realizada com Sucesso!");
  //     setDialogMessage("Seu pedido foi realizado com sucesso!");
  //     setIsError(false);
  //     setIsDialogOpen(true);

  //     setTimeout(() => {
  //       clearCart();
  //       setTimeout(() => {
  //         setIsDialogOpen(false);
  //       }, 3000);
  //     }, 2000);
  //   } catch (err) {
  //     console.log(err);

  //     setDialogTitle("Erro ao Realizar Pedido");
  //     setDialogMessage(error || "Ocorreu um erro inesperado. Tente novamente.");
  //     setIsError(true);
  //     setIsDialogOpen(true);

  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="flex flex-col h-[calc(100%-50px)] justify-between">
      {/* <ScrollArea className="px-3">
        <div className="py-2 overflow-y-auto">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="flex py-2 justify-between">
                <div className="flex">
                  <picture>
                    <img
                      className="w-20 h-20 object-cover rounded-sm"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                  </picture>
                  <div className="ml-3">
                    <p>{item.name}</p>
                    <p>R${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <Button
                    className="text-red-600"
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash />
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus />
                    </Button>
                    <p>{item.quantity}</p>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Seu carrinho está vazio. :(</p>
          )}
        </div>
      </ScrollArea> */}
      <div className="flex flex-col gap-2 py-2">
        <div className="flex justify-between">
          <p className="text-sm">Pagamento Total</p>
          <p className="text-sm">R$Total</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Quantidade Total</p>
          <p className="text-sm">
            {/* {items.reduce((acc, item) => acc + item.quantity, 0)} */}
          </p>
        </div>
        <div className="flex">
          <Input type="text" placeholder="Cupom de Desconto" />
          <Button variant={"outline"}>Aplicar</Button>
        </div>
        <Button
          variant={"outline"}
          className="w-full mt-2 bg-blue-600 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Finalizando Pedido..." : `Finalizar Compra R$`}
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center">
                {isError ? (
                  <X className="w-6 h-6 text-red-600" />
                ) : (
                  <PackageCheck className="w-6 h-6 text-green-600" />
                )}
                {dialogTitle}
              </div>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>{dialogMessage}</DialogDescription>
          <DialogFooter>
            <Button
              onClick={() => setIsDialogOpen(false)}
              className={isError ? "bg-red-600" : "bg-green-600"}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
