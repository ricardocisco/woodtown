import { User } from "@/src/backend/model/schemaModel";
import { Button } from "@/src/components/ui/button";
import { ModeToggle } from "@/src/components/ui/toggle-theme";
import Link from "next/link";
import React from "react";

export default function Dashbar({ user }: User) {
  return (
    <header className="bg-secondary">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-xl">W</span>
            </div>
            <div>
              <span className="text-2xl font-bold">Woodtown</span>
              <span className="text-amber-400 ml-2 text-sm">Admin</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <h1 className="">Olá, {user.name}</h1>
            <Button
              asChild
              variant="outline"
              className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white bg-transparent"
            >
              <Link href={"/"}>Ver Loja </Link>
            </Button>
            <Button variant="outline" className="">
              Sair
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
