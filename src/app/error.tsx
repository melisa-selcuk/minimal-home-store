"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-6 py-12">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
          Error
        </p>

        <h1
          className="text-3xl font-bold text-red-950"
          style={{ marginTop: "16px" }}
        >
          Something went wrong
        </h1>

        <p
          className="text-sm leading-6 text-red-700"
          style={{ marginTop: "16px" }}
        >
          {error.message || "An unexpected error occurred."}
        </p>

        <div style={{ marginTop: "28px" }}>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-red-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}