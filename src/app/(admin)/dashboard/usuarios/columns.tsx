import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/src/components/ui/alert-dialog";
import { User } from "@/src/backend/model/schemaModel";
import { deleteUser } from "@/src/backend/service/userService";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, EditIcon, SortAscIcon, TrashIcon, X } from "lucide-react";
import { toast } from "sonner";

export const columns = (
  handleEditUser: (user: User) => void
): ColumnDef<User>[] => [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email <SortAscIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role <SortAscIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("role")}</div>
  },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div>
          <Button
            onClick={() => handleEditUser(user)}
            className="h-8 w-8 p-0"
            variant="ghost"
          >
            <EditIcon className="h-4 w-4 text-blue-600" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="h-8 w-8 p-0" variant="ghost">
                <TrashIcon className="h-4 w-4 text-red-600" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deletar Usuário</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja deletar esse usuário?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      try {
                        deleteUser(user.id);
                        toast.success(
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1" />

                            <div className="flex-1">
                              <p className="font-medium">Sucesso</p>
                              <p className="text-sm mt-1">
                                Usuario atualizado com sucesso.
                              </p>
                            </div>
                          </div>,
                          {
                            action: {
                              label: <X className="h-4 w-4" />,
                              onClick: () => {}
                            },
                            position: "top-center"
                          }
                        );
                      } catch (error) {
                        console.log(error);
                        toast.error(
                          <div className="flex items-start gap-3">
                            <X className="h-5 w-5 text-red-500 mt-1" />

                            <div className="flex-1">
                              <p className="font-medium">Erro</p>
                              <p className="text-sm mt-1">
                                Erro ao deletar o usuario.
                              </p>
                            </div>
                          </div>,
                          {
                            action: {
                              label: <X className="h-4 w-4" />,
                              onClick: () => {}
                            },
                            position: "top-center"
                          }
                        );
                      }
                    }}
                  >
                    Deletar
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    }
  }
];
