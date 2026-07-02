import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-6 py-12">
      <div
        className="rounded-2xl border border-stone-200 bg-white text-center"
        style={{
          padding: "40px",
          maxWidth: "520px",
          width: "100%",
        }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
          404
        </p>

        <h1
          className="text-3xl font-bold text-stone-900"
          style={{ marginTop: "18px" }}
        >
          Page not found
        </h1>

        <p
          className="text-sm leading-6 text-stone-500"
          style={{ marginTop: "18px" }}
        >
          The page you are looking for does not exist or may have been moved.
        </p>

        <div style={{ marginTop: "32px" }}>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}