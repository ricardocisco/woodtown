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
      <Card className="bg-secondary">
        <CardHeader>
          <CardTitle className="">Gerenciar Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="">
                <TableHead className="">Id</TableHead>
                <TableHead className="">Nome</TableHead>
                <TableHead className="">Email</TableHead>
                <TableHead className="">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="">
                  <TableCell className="">{user.id}</TableCell>
                  <TableCell className="">{user.name}</TableCell>
                  <TableCell className="">{user.email}</TableCell>
                  <TableCell className="">{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
