"use server";

import CardData from "./_components/CardData";
import Pagina from "./Pagina";

export default async function AdminPage() {
  return (
    <Pagina>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Painel Administrativo
        </h1>
        <p className="text-zinc-400">Gerencie sua loja Woodtown</p>
      </div>
      <CardData />
    </Pagina>
  );
}
