import React from "react";
import Pagina from "../Pagina";
import { Label } from "@/src/components/ui/label";
import UserList from "./usersList";

export default function Page() {
  return (
    <Pagina className="bg-secondary">
      <Label>Usuarios</Label>
      <UserList />
    </Pagina>
  );
}
