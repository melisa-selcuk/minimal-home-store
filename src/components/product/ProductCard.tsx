import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square bg-stone-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-stone-400">
              No image
            </div>
          )}
        </div>

        <div className="space-y-3 p-5">
          <div>
            <p className="text-sm text-stone-500">
              {product.category?.name ?? "Uncategorized"}
            </p>

            <h2 className="mt-1 line-clamp-1 text-lg font-semibold text-stone-900">
              {product.name}
            </h2>
          </div>

          <p className="line-clamp-2 text-sm leading-6 text-stone-600">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-stone-900">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-sm text-stone-500">{product.stock} in stock</p>
          </div>
        </div>
      </Link>
    </article>
  );
}