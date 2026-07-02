"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";

type OrderResponse = {
  order: {
    id: number;
    orderNumber: string;
    totalAmount: number;
  };
};

export default function CheckoutForm() {
  const { items, clearCart } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);

    const shippingName = String(formData.get("shippingName") ?? "");
    const shippingAddress = String(formData.get("shippingAddress") ?? "");
    const shippingPhone = String(formData.get("shippingPhone") ?? "");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          shippingName,
          shippingAddress,
          shippingPhone,
          paymentMethod: "credit_card",
        }),
      });

      const data = (await response.json()) as OrderResponse | { message: string };

      if (!response.ok) {
        setErrorMessage("message" in data ? data.message : "Order failed.");
        return;
      }

      if ("order" in data) {
        setOrderNumber(data.order.orderNumber);
        clearCart();
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (orderNumber) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-5">
        <h2 className="text-lg font-semibold text-green-900">
          Order created successfully
        </h2>

        <p className="mt-2 text-sm text-green-700">
          Your order number is <strong>{orderNumber}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage ? (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="shippingName"
          className="text-sm font-medium text-stone-700"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Full name
        </label>

        <input
          id="shippingName"
          name="shippingName"
          type="text"
          required
          className="rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
          style={{ display: "block", width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="shippingPhone"
          className="text-sm font-medium text-stone-700"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Phone
        </label>

        <input
          id="shippingPhone"
          name="shippingPhone"
          type="tel"
          required
          className="rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
          style={{ display: "block", width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label
          htmlFor="shippingAddress"
          className="text-sm font-medium text-stone-700"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Address
        </label>

        <textarea
          id="shippingAddress"
          name="shippingAddress"
          required
          rows={4}
          className="rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
          style={{ display: "block", width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h2 className="text-sm font-semibold text-stone-900">
          Mock payment
        </h2>

        <p className="mt-2 text-sm text-stone-500">
          This is a simulated credit card payment. No real payment is processed.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Card number"
            required
            className="rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900 md:col-span-3"
          />

          <input
            type="text"
            placeholder="MM/YY"
            required
            className="rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
          />

          <input
            type="text"
            placeholder="CVV"
            required
            className="rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-400"
        style={{ marginTop: "8px" }}
      >
        {isSubmitting ? "Creating order..." : "Place order"}
      </button>
    </form>
  );
}