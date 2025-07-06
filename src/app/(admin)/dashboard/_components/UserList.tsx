"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/src/components/ui/table";
import { TabsContent } from "@/src/components/ui/tabs";
import useUsers from "@/src/hooks/useUser";
import { Users } from "lucide-react";
import React from "react";

export default function UserList() {
  const { users, deleteUser, updateUser, loading } = useUsers();

  return (
    <TabsContent value="customers">
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-white">Gerenciar Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-700">
                <TableHead className="text-zinc-300">Id</TableHead>
                <TableHead className="text-zinc-300">Nome</TableHead>
                <TableHead className="text-zinc-300">Email</TableHead>
                <TableHead className="text-zinc-300">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-zinc-700">
                  <TableCell className="text-white">{user.id}</TableCell>
                  <TableCell className="text-white">{user.name}</TableCell>
                  <TableCell className="text-zinc-300">{user.email}</TableCell>
                  <TableCell className="text-zinc-300">{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
