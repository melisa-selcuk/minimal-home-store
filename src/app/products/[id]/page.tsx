import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { prisma } from "@/lib/db";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/products"
        className="text-sm font-medium text-stone-500 transition hover:text-stone-900"
      >
        ← Back to products
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-stone-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-stone-400">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
            {product.category.name}
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
            {product.name}
          </h1>

          <p className="mt-6 text-lg leading-8 text-stone-600">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-6">
            <p className="text-3xl font-bold text-stone-900">
              ${product.price.toFixed(2)}
            </p>

            <p className="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-600">
              {product.stock} in stock
            </p>
          </div>

          <div className="mt-10">
            <AddToCartButton productId={product.id} />

            <p className="mt-4 text-sm text-stone-500">
              This product will be saved to your cart.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}