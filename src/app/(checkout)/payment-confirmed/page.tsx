"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CheckoutReturnPage() {
  const [status, setStatus] = useState<"loading" | "paid" | "unpaid">(
    "loading"
  );
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/checkout/?session_id=${sessionId}`);

        if (!res.ok) {
          throw new Error("Resposta inválida do servidor");
        }

        const data = await res.json();

        if (data.status === "paid") {
          setStatus("paid");
        } else {
          setStatus("unpaid");
        }
      } catch (error) {
        console.error("erro ao verificar pagamento", error);
        setStatus("unpaid");
      }
    };

    checkStatus();
  }, [sessionId]);

  if (status === "loading") return <p>Verificando pagamento...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <Card className="max-w-lg bg-zinc-800 border-none">
        <CardContent>
          <CardHeader className="text-center">
            <ShoppingBag className="text-green-600 mx-auto mb-4 h-12 w-12" />
            <CardTitle className="text-white">
              Compra realiza com sucesso
            </CardTitle>
            <CardDescription className="text-white">
              Obrigado pela sua compra!
            </CardDescription>
          </CardHeader>
          <div className="mt-10 space-y-2 text-center">
            <p className="text-white">
              Você pode visualizar o status da sua compra em meus pedidos
            </p>
            <div>
              {status === "paid" ? (
                <h1>✅ Pagamento Confirmado!</h1>
              ) : (
                <h1>❌ Pagamento não realizado</h1>
              )}
            </div>
            <Button asChild className="bg-amber-600">
              <Link href="/">Voltar para a home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
