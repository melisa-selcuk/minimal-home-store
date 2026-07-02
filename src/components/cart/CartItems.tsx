"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";

type CartItemsProps = {
  products: Product[];
};

export default function CartItems({ products }: CartItemsProps) {
  const { items, increaseItem, decreaseItem, removeItem, clearCart } = useCart();

  const cartProducts = items
    .map((item) => {
      const product = products.find((currentProduct) => {
        return currentProduct.id === item.productId;
      });

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter((product) => product !== null);

  const subtotal = cartProducts.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  if (cartProducts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
        <h2 className="text-lg font-semibold text-stone-900">
          Your cart is empty
        </h2>

        <p className="mt-2 text-sm text-stone-500">
          Add some products before checking out.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        {cartProducts.map((product) => (
          <article
            key={product.id}
            className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-5 sm:flex-row sm:items-center"
          >
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-center text-xs font-medium text-stone-400">
              Image
            </div>

            <div className="flex-1">
              <p className="text-sm text-stone-500">
                {product.category?.name ?? "Uncategorized"}
              </p>

              <h2 className="mt-1 font-semibold text-stone-900">
                {product.name}
              </h2>

              <p className="mt-1 text-sm text-stone-500">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => decreaseItem(product.id)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition hover:border-stone-900"
              >
                -
              </button>

              <span className="w-6 text-center text-sm font-semibold">
                {product.quantity}
              </span>

              <button
                type="button"
                onClick={() => increaseItem(product.id)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition hover:border-stone-900"
              >
                +
              </button>
            </div>

            <div className="text-right sm:w-24">
              <p className="font-semibold text-stone-900">
                ${(product.price * product.quantity).toFixed(2)}
              </p>

              <button
                type="button"
                onClick={() => removeItem(product.id)}
                className="mt-2 text-sm font-medium text-red-600 transition hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-900">Order summary</h2>

        <div className="mt-6 space-y-3 border-b border-stone-200 pb-6">
          <div className="flex justify-between text-sm text-stone-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm text-stone-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between text-base font-semibold text-stone-900">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <Link
          href="/checkout"
          className="mt-6 flex w-full justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
        >
          Continue to checkout
        </Link>

        <button
          type="button"
          onClick={clearCart}
          className="mt-3 w-full rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-900 hover:text-stone-900"
        >
          Clear cart
        </button>
      </aside>
    </div>
  );
}