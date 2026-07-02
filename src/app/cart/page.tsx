import CartPageClient from "@/components/cart/CartPageClient";

export default function CartPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
          Cart
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900">
          Your shopping cart
        </h1>

        <p className="mt-4 max-w-2xl text-stone-600">
          Review your selected products before moving to checkout.
        </p>
      </div>

      <CartPageClient />
    </section>
  );
}