import React from "react";
import Pagina from "../Pagina";
import { Label } from "@/src/components/ui/label";
import ProductForm from "./cadastro";

export default function Page() {
  return (
    <Pagina>
      <Label>Cadastrar um novo produto</Label>
      <ProductForm />
    </Pagina>
  );
}
