import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900">
      <Card className="max-w-sm w-full rounded-2xl mt-12 bg-zinc-800 border-none">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-amber-400">
            Entrar
          </CardTitle>
          <CardDescription className="text-center text-white">
            Crie uma conta gratuitamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
