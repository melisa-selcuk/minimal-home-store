import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export default async function OrdersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div style={{ marginBottom: "32px" }}>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
          Orders
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900">
          My orders
        </h1>

        <p className="mt-4 max-w-2xl text-stone-600">
          Review your previous orders and their current status.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-stone-900">
            No orders yet
          </h2>

          <p className="mt-2 text-sm text-stone-500">
            Your completed orders will appear here.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border border-stone-200 bg-white p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-stone-500">Order number</p>

                  <h2 className="mt-1 text-lg font-semibold text-stone-900">
                    {order.orderNumber}
                  </h2>

                  <p className="mt-2 text-sm text-stone-500">
                    {order.items.length} item
                    {order.items.length > 1 ? "s" : ""} ·{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US")}
                  </p>
                </div>

                <div className="flex flex-col gap-3 md:items-end">
                  <p className="text-xl font-bold text-stone-900">
                    ${order.totalAmount.toFixed(2)}
                  </p>

                  <span className="w-fit rounded-full bg-stone-100 px-4 py-2 text-sm font-medium capitalize text-stone-600">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={`/orders/${order.id}`}
                  className="inline-flex rounded-full border border-stone-300 px-5 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-900 hover:text-stone-900"
                >
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}