"use server";

import { auth } from "@/auth";
import AppSidebar from "./AppSidebar";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { ModeToggle } from "@/src/components/ui/toggle-theme";

export interface PaginaProps {
  children?: React.ReactNode;
  className?: string;
}

async function checkAdmin() {
  const session = await auth();

  return session;
}

export default async function Pagina(props: PaginaProps) {
  const session = await checkAdmin();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <SidebarProvider className="font-sans">
      <AppSidebar />
      <main className={`flex-1 p-3 ${props.className ?? ""}`}>
        <div className="flex justify-between">
          <SidebarTrigger />
          <ModeToggle />
        </div>
        {props.children}
      </main>
    </SidebarProvider>
  );
}
