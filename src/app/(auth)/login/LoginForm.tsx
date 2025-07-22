"use client";

import Form from "next/form";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import LoginAction from "./loginAction";
import Link from "next/link";
import { useActionState } from "react";
import { cn } from "@/src/lib/utils";
import { Card, CardContent } from "@/src/components/ui/card";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(LoginAction, null);

  return (
    <>
      <div className="">
        <Card className="overflow-hidden p-0 bg-secondary">
          <CardContent className="">
            <Form action={formAction} className="p-6 md:p-4">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Woodtown account
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="sua senha"
                    required
                  />
                </div>
                <Button disabled={isPending} className="w-full">
                  Login
                </Button>
                {state?.success === false && (
                  <span className="text-red-700 ">{state?.error}</span>
                )}
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
