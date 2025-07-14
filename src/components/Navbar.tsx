"use server";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ChevronDown, CircleUser, ShoppingCart } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu";
import logout from "../app/(auth)/logout/logout";
import { ModeToggle } from "./ui/toggle-theme";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id ?? "";

  return (
    <header className="border-b font-sans">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className=" font-bold text-xl">W</span>
            </div>
            <span className="text-2xl font-bold ">Woodtown</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className=" hover:text-amber-400 transition-colors">
              Início
            </Link>
            <Link
              href="/produtos"
              className=" hover:text-amber-400 transition-colors"
            >
              Produtos
            </Link>
            <Link
              href="/sobre"
              className=" hover:text-amber-400 transition-colors"
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className=" hover:text-amber-400 transition-colors"
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
              <SheetContent className="w-[400px] sm:w-[540px]  border-none p-4">
                <SheetHeader>
                  <SheetTitle className="">Carrinho</SheetTitle>
                </SheetHeader>
                <div className="h-full">
                  <Cart userId={userId} />
                </div>
              </SheetContent>
            </Sheet>
            {!user ? (
              <div>
                <Button
                  asChild
                  variant="outline"
                  className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white bg-transparent"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="">
                    <CircleUser />
                    {user.name}
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 border-none">
                  <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link className="w-full" href="/pedidos">
                        Meus Pedidos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Configurações</DropdownMenuItem>
                    <ModeToggle />
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <form action={logout}>
                    <Button className="w-full cursor-pointer" variant={"ghost"}>
                      Sair
                    </Button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
