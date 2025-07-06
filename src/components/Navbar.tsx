"use server";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { auth } from "@/auth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet";
import Count from "./CountCart";
import Cart from "./Cart";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id ?? "";

  return (
    <header className="bg-zinc-800 border-b border-zinc-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-2xl font-bold text-white">Woodtown</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-white hover:text-amber-400 transition-colors"
            >
              Início
            </Link>
            <Link
              href="/produtos"
              className="text-white hover:text-amber-400 transition-colors"
            >
              Produtos
            </Link>
            <Link
              href="/sobre"
              className="text-white hover:text-amber-400 transition-colors"
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className="text-white hover:text-amber-400 transition-colors"
            >
              Contato
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger>
                <div className="flex relative">
                  <ShoppingCart className="w-6 h-6 text-amber-400" />
                  <Count />
                </div>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px] bg-zinc-800 border-none p-4">
                <SheetHeader>
                  <SheetTitle className="text-white">Carrinho</SheetTitle>
                </SheetHeader>
                <div className="h-full">
                  <Cart userId={userId} />
                </div>
              </SheetContent>
            </Sheet>
            <Button
              asChild
              variant="outline"
              className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white bg-transparent"
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
