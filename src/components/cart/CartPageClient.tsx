"use client";

import { useEffect, useState } from "react";
import CartItems from "./CartItems";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";

export default function CartPageClient() {
  const { items } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const productIds = items.map((item) => item.productId);

    if (productIds.length === 0) {
      setProducts([]);
      return;
    }

    setIsLoading(true);

    fetch(`/api/products?ids=${productIds.join(",")}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [items]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center">
        <p className="text-sm font-medium text-stone-500">Loading cart...</p>
      </div>
    );
  }

  return <CartItems products={products} />;
}