"use client";

import Form from "next/form";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import LoginAction from "./loginAction";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(LoginAction, null);

  return (
    <>
      {state?.success === false && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex flex-col mb-4">
          <strong className="font-bold">Erro!</strong>
          <span className="block sm:inline">{state?.error}</span>
        </div>
      )}
      <Form action={formAction} className="">
        <div className="py-2">
          <Label className="text-lg font-bold text-amber-600">E-mail</Label>
          <Input
            className=" text-white border-zinc-600"
            name="email"
            type="email"
            placeholder="example@gmail.com"
          ></Input>
        </div>
        <div className="py-2">
          <Label className="text-lg font-bold text-amber-600">Senha</Label>
          <Input
            className="text-white border-zinc-600"
            name="password"
            type="password"
            placeholder="sua senha"
          ></Input>
        </div>
        <div className="flex flex-col py-4 gap-4">
          <Button
            variant={"outline"}
            className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white bg-transparent"
            disabled={isPending}
          >
            Login
          </Button>
          <div className="flex justify-between">
            <Link className="text-sm text-white" href="/">
              Esqueci a senha
            </Link>
            <Link className="text-sm text-white" href="/register">
              Criar uma nova conta
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
}
