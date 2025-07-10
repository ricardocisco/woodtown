import db from "@/src/lib/db";
import { Order, OrderStatus, OrderStatusEnum } from "../model/schemaModel";
import { Prisma } from "@prisma/client";

export async function getOrderItensById(orderId: string) {
  if (!orderId) {
    throw new Error("ID not found");
  }

  return await db.orderItem.findMany({
    where: {
      orderId
    },
    include: {
      product: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });
}

export async function getOrderById(id: string) {
  if (!id) {
    throw new Error("ID not found");
  }

  return await db.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true
        },
        orderBy: {
          createdAt: "asc"
        }
      },
      user: true
    }
  });
}

export async function getAllOrders() {
  return await db.order.findMany({
    include: {
      items: true,
      user: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });
}

export async function createOrder(data: Order) {
  return await db.$transaction(async (client: Prisma.TransactionClient) => {
    if (!data.items) {
      throw new Error("Order items are required");
    }
    for (const item of data.items) {
      console.log("Produto sendo buscado:", item.productId);
      if (!item.productId) {
        throw new Error("ID do produto ausente em um dos itens do pedido");
      }

      const product = await client.product.findUnique({
        where: {
          id: item.productId
        }
      });

      if (!product) {
        throw new Error("Produto não encontrado");
      }
      if (product.stock <= 0) {
        throw new Error("Estoque insuficiente");
      }
      if (product.stock < item.quantity) {
        throw new Error("Estoque insuficiente");
      }
    }

    for (const item of data.items) {
      await client.product.update({
        where: {
          id: item.productId
        },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    return await db.order.create({
      data: {
        userId: data.userId,
        total: data.total,
        orderStatus: "AWAITING",
        paymentStatus: "PENDING",
        items: {
          create:
            data.items.map((item) => ({
              productId: item.productId
            })) ?? []
        },
        createdAt: new Date()
      }
    });
  });
}

export async function updateStatusOrder(id: string, orderStatus: string) {
  console.log("ID recebido:", id);
  console.log("Status recebido:", status);
  if (!Object.values(OrderStatusEnum).includes(orderStatus as OrderStatus))
    throw new Error("Status invalido: " + orderStatus);

  return await db.order.update({
    where: { id },
    data: {
      orderStatus: orderStatus as OrderStatus
    }
  });
}

export async function deleteOrder(id: string) {
  if (!id) {
    throw new Error("Id not found");
  }

  return await db.order.delete({ where: { id } });
}
