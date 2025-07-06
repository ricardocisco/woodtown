import db from "@/src/lib/db";
import { Product } from "../model/schemaModel";

export async function getAllProducts() {
  return await db.product.findMany();
}

export async function createProduct(data: Product) {
  return await db.product.create({
    data: {
      ...data,
      createdAt: new Date()
    }
  });
}

export async function deleteProduct(id: string) {
  if (!id) throw new Error("ID not found");
  return await db.product.delete({
    where: { id }
  });
}

export async function editProduct(id: string, data: Product) {
  console.log("ID recebido:", id);
  console.log("Dados recebido:", data);

  return await db.product.update({
    where: { id },
    data: { ...data }
  });
}
