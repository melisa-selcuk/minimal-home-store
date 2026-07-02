import type { Product } from "./product";

export type CartItem = {
  productId: number;
  quantity: number;
};

export type CartProduct = Product & {
  quantity: number;
};

export type CartSummary = {
  totalItems: number;
  subtotal: number;
  total: number;
};