import { redirect } from "next/navigation";
import LogoutButton from "@/components/forms/LogoutButton";
import { getCurrentUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <div style={{ marginBottom: "32px" }}>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
          Profile
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900">
          My profile
        </h1>

        <p className="mt-4 text-stone-600">
          View your account information and manage your session.
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <div style={{ marginBottom: "24px" }}>
          <p className="text-sm text-stone-500">Full name</p>
          <p className="mt-1 text-lg font-semibold text-stone-900">
            {user.name}
          </p>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <p className="text-sm text-stone-500">Email</p>
          <p className="mt-1 text-lg font-semibold text-stone-900">
            {user.email}
          </p>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <p className="text-sm text-stone-500">Role</p>
          <p className="mt-1 text-lg font-semibold capitalize text-stone-900">
            {user.role}
          </p>
        </div>

        <LogoutButton />
      </div>
    </section>
  );
}