import Link from "next/link";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";


type OrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const { id } = await params;
  const orderId = Number(id);

  if (Number.isNaN(orderId)) {
    notFound();
  }

 const order = await prisma.order.findFirst({
  where: {
    id: orderId,
    userId: currentUser.id,
  },
  include: {
      items: {
        include: {
          product: true,
        },
      },
      user: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <Link
        href="/orders"
        className="text-sm font-medium text-stone-500 transition hover:text-stone-900"
      >
        ← Back to orders
      </Link>

      <div style={{ marginBottom: "32px", marginTop: "32px" }}>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
          Order detail
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900">
          {order.orderNumber}
        </h1>

        <p className="mt-4 max-w-2xl text-stone-600">
          Review the products, shipping information and current order status.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-stone-900">
              Ordered products
            </h2>

            <div className="mt-6 space-y-4">
              {order.items.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 border-b border-stone-100 pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-center"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-xs font-medium text-stone-400">
                    Image
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-900">
                      {item.product.name}
                    </h3>

                    <p className="mt-1 text-sm text-stone-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm text-stone-500">
                      Unit price: ${item.unitPrice.toFixed(2)}
                    </p>

                    <p className="mt-1 font-semibold text-stone-900">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-stone-900">
              Shipping information
            </h2>

            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <p>
                <span className="font-medium text-stone-900">Name:</span>{" "}
                {order.shippingName}
              </p>

              <p>
                <span className="font-medium text-stone-900">Phone:</span>{" "}
                {order.shippingPhone}
              </p>

              <p>
                <span className="font-medium text-stone-900">Address:</span>{" "}
                {order.shippingAddress}
              </p>
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-stone-900">
            Order summary
          </h2>

          <div className="mt-6 space-y-4 border-b border-stone-200 pb-6 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Status</span>
              <span className="font-medium capitalize text-stone-900">
                {order.status}
              </span>
            </div>

            <div className="flex justify-between text-stone-600">
              <span>Date</span>
              <span className="font-medium text-stone-900">
                {new Date(order.createdAt).toLocaleDateString("en-US")}
              </span>
            </div>

            <div className="flex justify-between text-stone-600">
              <span>Payment</span>
              <span className="font-medium text-stone-900">
                {order.paymentMethod ?? "credit_card"}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-between text-lg font-bold text-stone-900">
            <span>Total</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}