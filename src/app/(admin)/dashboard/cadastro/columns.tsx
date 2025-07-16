import { Product } from "@/src/backend/model/schemaModel";
import { deleteProduct } from "@/src/backend/service/productService";
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
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash, TrashIcon } from "lucide-react";

export const columns = (
  handleEditProduct: (data: Product) => void
): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "imageUrl",
    header: "Imagem",
    cell: ({ row }) => (
      <picture>
        <img
          className="w-[50px] h-[50px] rounded-sm"
          src={row.original.imageUrl}
          alt={row.original.name}
        />
      </picture>
    )
  },
  {
    accessorKey: "name",
    header: "Nome"
  },
  {
    accessorKey: "price",
    header: "Preco",
    cell: ({ row }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(row.original.price)
  },
  {
    accessorKey: "stock",
    header: "Quantidade"
  },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div>
          <Button
            onClick={() => handleEditProduct(product)}
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
                        deleteProduct(product.id);
                        // toast.success(
                        //   <div className="flex items-start gap-3">
                        //     <CheckCircle className="h-5 w-5 text-green-500 mt-1" />

                        //     <div className="flex-1">
                        //       <p className="font-medium">Sucesso</p>
                        //       <p className="text-sm mt-1">
                        //         Usuario atualizado com sucesso.
                        //       </p>
                        //     </div>
                        //   </div>,
                        //   {
                        //     action: {
                        //       label: <X className="h-4 w-4" />,
                        //       onClick: () => {}
                        //     },
                        //     position: "top-center"
                        //   }
                        // );
                      } catch (error) {
                        console.log(error);
                        // toast.error(
                        //   <div className="flex items-start gap-3">
                        //     <X className="h-5 w-5 text-red-500 mt-1" />

                        //     <div className="flex-1">
                        //       <p className="font-medium">Erro</p>
                        //       <p className="text-sm mt-1">
                        //         Erro ao deletar o usuario.
                        //       </p>
                        //     </div>
                        //   </div>,
                        //   {
                        //     action: {
                        //       label: <X className="h-4 w-4" />,
                        //       onClick: () => {}
                        //     },
                        //     position: "top-center"
                        //   }
                        // );
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
