import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
        Minimal Home Store
      </p>

      <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
        Modern home essentials for simple and beautiful spaces.
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-stone-600">
        Discover carefully selected furniture, lighting, decor and workspace
        products for a calmer everyday life.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/products"
          className="rounded-full bg-stone-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
        >
          Shop Products
        </Link>

        <Link
          href="/register"
          className="rounded-full border border-stone-300 px-8 py-3 text-sm font-semibold text-stone-900 transition hover:bg-white"
        >
          Create Account
        </Link>
      </div>
    </section>
  );
}
