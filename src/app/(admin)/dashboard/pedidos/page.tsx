import React from "react";
import Pagina from "../Pagina";
import { Label } from "@/src/components/ui/label";
import OrderList from "./orderList";

export default function Page() {
  return (
    <Pagina>
      <div className="mb-1">
        <h1 className="text-3xl font-bold text-white mb-2">
          Painel Administrativo
        </h1>
        <p className="text-zinc-400">Gerenciar Pedidos</p>
      </div>
      <OrderList />
    </Pagina>
  );
}
