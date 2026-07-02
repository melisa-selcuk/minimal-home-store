import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-xl px-6 py-12">
      <div style={{ marginBottom: "32px" }}>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
          Register
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900">
          Create your account
        </h1>

        <p className="mt-4 text-stone-600">
          Sign up to manage your profile and orders.
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <RegisterForm />
      </div>
    </section>
  );
}