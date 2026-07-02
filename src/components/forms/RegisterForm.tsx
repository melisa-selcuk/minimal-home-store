"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setErrorMessage(data.message ?? "Registration failed.");
        return;
      }

      setSuccessMessage("Account created successfully. You can now log in.");
      event.currentTarget.reset();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage ? (
        <div
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          style={{ marginBottom: "20px" }}
        >
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div
          className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          style={{ marginBottom: "20px" }}
        >
          {successMessage}
        </div>
      ) : null}

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="name"
          className="text-sm font-medium text-stone-700"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Full name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          className="rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
          style={{ display: "block", width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="email"
          className="text-sm font-medium text-stone-700"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
          style={{ display: "block", width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label
          htmlFor="password"
          className="text-sm font-medium text-stone-700"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
          style={{ display: "block", width: "100%" }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      <p className="mt-6 text-sm text-stone-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-stone-900 underline">
          Log in
        </Link>
      </p>
    </form>
  );
}