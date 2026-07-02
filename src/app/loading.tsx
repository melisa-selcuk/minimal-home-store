export default function Loading() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-6 py-12">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-stone-900" />

        <h1
          className="text-2xl font-bold text-stone-900"
          style={{ marginTop: "24px" }}
        >
          Loading...
        </h1>

        <p
          className="text-sm text-stone-500"
          style={{ marginTop: "8px" }}
        >
          Please wait while we prepare the page.
        </p>
      </div>
    </section>
  );
}