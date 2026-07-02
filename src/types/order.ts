import type { Product } from "./product";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "credit_card";

export type Order = {
  id: number;
  userId: number;
  orderNumber: string;
  totalAmount: number;
  status: OrderStatus;
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
  paymentMethod?: PaymentMethod | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  product?: Product;
};

export type OrderWithItems = Order & {
  items: OrderItem[];
};