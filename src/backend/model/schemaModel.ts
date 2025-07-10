import { z } from "zod";

export const RoleEnum = z.enum(["ADMIN", "USER"]);

export const PaymentStatusEnum = z.enum([
  "PENDING",
  "SUCCEEDED",
  "FAILED",
  "CANCELED",
  "PROCESSING"
]);

export const OrderStatusEnum = z.enum([
  "AWAITING",
  "PAID",
  "PREPARING",
  "SHIPPED",
  "DELIVERED",
  "CANCELED"
]);

export const Category = z.enum([
  "SHAPES",
  "ROLAMENTOS",
  "ROUPAS",
  "ACESSORIOS"
]);

export const UserSchema: z.ZodType<any> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: RoleEnum.optional(),
  Order: z.array(z.lazy(() => OrderSchema)).optional()
});

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  description: z.string().optional(),
  imageUrl: z.string(),
  category: z.string(),
  createdAt: z.coerce.date().optional(),
  quantity: z.number()
});

export const OrderItemSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  orderId: z.string(),
  createdAt: z.coerce.date().optional(),
  quantity: z.number()
  // Relacionamentos podem ser incluídos se necessário:
  // product: ProductSchema.optional(),
  // order: OrderSchema.optional(),
});

export const OrderSchema: z.ZodType<any> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  items: z.array(OrderItemSchema).optional(),
  total: z.number(),
  createdAt: z.coerce.date().optional(),
  paymentStatus: PaymentStatusEnum.optional(),
  orderStatus: OrderStatusEnum.optional(),
  user: z.lazy(() => UserSchema).optional(), // se quiser incluir o usuário
  stripeSessionId: z.string()
});

export type User = z.infer<typeof UserSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;

export type OrderStatus = z.infer<typeof OrderStatusEnum>;
export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;
