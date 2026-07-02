"use client";

import { useRouter } from "next/navigation";

export default function HeaderLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="transition hover:text-stone-900"
    >
      Log out
    </button>
  );
}