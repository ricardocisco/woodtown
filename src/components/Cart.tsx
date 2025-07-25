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
import { ScrollArea } from "./ui/scroll-area";
import { useCartStore } from "../app/store/cartStore";
import PaymentButton from "./paymentButton";

export default function Cart({ userId }: { userId: string }) {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    total,
    clearCart
  } = useCartStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [isError, setIsError] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100%-50px)] justify-between">
      <ScrollArea className="px-3">
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
                    <p className="">{item.name}</p>
                    <p className="">R${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <Button
                    variant="destructive"
                    size={"sm"}
                    onClick={() => {
                      if (item.id) removeItem(item.id);
                    }}
                  >
                    <Trash />
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="bg-amber-600 text-white border-none"
                      onClick={() => {
                        if (item.id) decreaseQuantity(item.id);
                      }}
                    >
                      <Minus />
                    </Button>
                    <p className="">{item.quantity}</p>
                    <Button
                      variant="outline"
                      size={"sm"}
                      className="bg-amber-600 border-none"
                      onClick={() => {
                        if (item.id) increaseQuantity(item.id);
                      }}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="">Seu carrinho está vazio. :(</p>
          )}
        </div>
      </ScrollArea>
      <div className="flex flex-col gap-2 py-2">
        <div className="flex justify-between">
          <p className="text-sm">Pagamento Total</p>
          <p className="text-sm">R$ {total.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Quantidade Total</p>
          <p className="text-sm">
            {items.reduce((acc, item) => acc + item.quantity, 0)}
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Cupom de Desconto"
            className="focus:border-none border-amber-400"
          />
          <Button variant={"outline"}>Aplicar</Button>
        </div>
        <PaymentButton />
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
