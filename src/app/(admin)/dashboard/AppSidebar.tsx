import { Button } from "@/src/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/src/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { HomeIcon } from "components/ui/home";
import Link from "next/link";
import { UserRoundPlusIcon } from "@/components/ui/user-round-plus";
import { BoxesIcon } from "@/components/ui/boxes";
import { PlusIcon } from "@/components/ui/plus";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: HomeIcon
  },
  {
    title: "Cadastro",
    url: "/dashboard/cadastro",
    icon: PlusIcon
  },
  {
    title: "Pedidos",
    url: "/dashboard/pedidos",
    icon: BoxesIcon
  },
  {
    title: "Usuarios",
    url: "/dashboard/usuarios",
    icon: UserRoundPlusIcon
  }
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="flex justify-between p-4">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard - Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarMenu>
            <form className="max-w-fit">
              <Button variant="ghost">
                <LogOut />
                Sair
              </Button>
            </form>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
