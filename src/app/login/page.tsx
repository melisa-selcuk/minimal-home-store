import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-xl px-6 py-12">
      <div style={{ marginBottom: "32px" }}>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
          Login
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900">
          Welcome back
        </h1>

        <p className="mt-4 text-stone-600">
          Log in to manage your orders and profile.
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <LoginForm />
      </div>
    </section>
  );
}