"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CartNavLink() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="transition hover:text-stone-900">
      Cart ({totalItems})
    </Link>
  );
}