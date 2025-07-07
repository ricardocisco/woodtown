"use server";

import { signIn } from "@/auth";
import AuthError from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginAction(_prevState: any, formData: FormData) {
  const entries = Array.from(formData.entries());
  const { email, password } = Object.fromEntries(entries) as {
    email: string;
    password: string;
  };

  try {
    const res = await signIn("credentials", { email, password });
    console.log("dados res", res);
    return { success: true, res };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          error: "Credenciais inválidas. Por favor, tente novamente.",
          success: false
        };
      }
      return {
        error: "Erro ao autenticar. Por favor, tente novamente mais tarde.",
        success: false
      };
    }
  }

  redirect("/dashboard");
}
