import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import CartNavLink from "@/components/layout/CartNavLink";
import HeaderLogoutButton from "@/components/layout/HeaderLogoutButton";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-stone-900">
          Minimal Home
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-stone-600">
          <Link href="/products" className="transition hover:text-stone-900">
            Products
          </Link>

          {user ? (
            <>
              <CartNavLink />

              <Link href="/orders" className="transition hover:text-stone-900">
                Orders
              </Link>

              <Link href="/profile" className="transition hover:text-stone-900">
                Profile
              </Link>

              <HeaderLogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="transition hover:text-stone-900">
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-stone-900 px-4 py-2 text-white transition hover:bg-stone-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}