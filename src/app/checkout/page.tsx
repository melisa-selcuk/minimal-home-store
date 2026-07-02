import CheckoutForm from "@/components/forms/CheckoutForm";

export default function CheckoutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <div style={{ marginBottom: "32px" }}>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
          Checkout
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900">
          Complete your order
        </h1>

        <p className="mt-4 text-stone-600">
          Enter your details to prepare your order.
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <CheckoutForm />
      </div>

      <aside
        className="rounded-2xl border border-stone-200 bg-white p-6"
        style={{ marginTop: "24px" }}
      >
        <h2 className="text-lg font-semibold text-stone-900">
          Checkout note
        </h2>

        <p className="mt-3 text-sm leading-6 text-stone-600">
          This page uses a simulated payment form. When you place an order, the
          order and order items are saved to the database.
        </p>
      </aside>
    </section>
  );
}