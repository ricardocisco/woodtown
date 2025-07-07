import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card";
import { ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function CheckoutReturnPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <Card className="max-w-lg bg-zinc-800 border-none">
        <CardContent>
          <CardHeader className="text-center">
            <X className="text-red-600 mx-auto mb-4 h-12 w-12" />
            <CardTitle className="text-white">Compra cancelada</CardTitle>
            <CardDescription className="text-white">
              sua compra foi cancelada! :(
            </CardDescription>
          </CardHeader>
          <div className="mt-10 space-y-2 text-center">
            <p className="text-white">
              Você pode visualizar o status da sua compra em meus pedidos
            </p>
            <Button asChild className="bg-amber-600">
              <Link href="/">Voltar para a home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
