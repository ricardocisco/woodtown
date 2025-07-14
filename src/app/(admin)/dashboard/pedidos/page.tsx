import React from "react";
import Pagina from "../Pagina";
import { Label } from "@/src/components/ui/label";
import OrderList from "./orderList";

export default function Page() {
  return (
    <Pagina>
      <Label>Pedidos</Label>
      <OrderList />
    </Pagina>
  );
}
