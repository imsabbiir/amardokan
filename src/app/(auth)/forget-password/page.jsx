"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Package,
  Phone,
  ShieldCheck,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setPhone(e.target.value);

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!phone) {
      setError("Please enter your phone number.");
      return;
    }

    if (phone.length !== 10) {
      setError("Please enter a valid Bangladesh phone number.");
      return;
    }

    setLoading(true);

    /*
      Connect your password reset API here.

      Example:

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to send reset code.");
        setLoading(false);
        return;
      }

      router.push(`/reset-password?phone=${phone}`);
    */

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setSubmitted(true);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-5 py-10 text-fg">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-96 rounded-full bg-ac/10 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-ac/5 blur-[110px]"
      />

      {/* Back to Home */}
      <Link
        href="/"
        className="group absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-lg border border-bd bg-bg/70 px-3 py-2 text-xs font-medium text-mut backdrop-blur-sm transition-all hover:border-fg/15 hover:bg-bg2 hover:text-fg sm:left-8 sm:top-8"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        <span>Back to Home</span>
      </Link>

      {/* Content */}
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Link
            href="/"
            className="group flex w-fit items-center gap-3"
            aria-label="AmarDokan home"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-ac text-slate-950 shadow-[0_0_35px_rgba(163,219,74,0.12)] transition-transform duration-300 group-hover:scale-105">
              <Package className="size-5" />
            </div>

            <div className="text-left">
              <p className="text-[15px] font-bold tracking-tight">
                AmarDokan
              </p>

              <p className="text-[10px] font-medium text-mut">
                Build Your Business
              </p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-bd bg-bg2/70 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:p-8">
          {!submitted ? (
            <>
              {/* Icon */}
              <div className="mb-6 flex size-11 items-center justify-center rounded-xl border border-bd bg-bg text-ac">
                <LockKeyhole className="size-5" />
              </div>

              {/* Heading */}
              <div>
                <div className="flex w-fit items-center gap-2 rounded-full border border-bd bg-bg px-3 py-1.5 text-[11px] font-semibold">
                  <span className="size-1.5 rounded-full bg-ac" />
                  Account recovery
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                  Forgot your password?
                </h1>

                <p className="mt-3 text-sm leading-6 text-mut">
                  Enter the phone number connected to your AmarDokan account.
                  We&apos;ll send you a verification code to reset your
                  password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8">
                {error && (
                  <div
                    role="alert"
                    className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-500"
                  >
                    {error}
                  </div>
                )}

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs font-semibold"
                  >
                    Phone number
                  </label>

                  <div className="group relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-1.5 text-mut transition group-focus-within:text-ac">
                      <Phone className="size-4" />
                      <span className="text-sm font-medium">+880</span>
                    </div>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={handleChange}
                      placeholder="1XXXXXXXXX"
                      autoComplete="tel"
                      inputMode="numeric"
                      maxLength={10}
                      required
                      className="h-12 w-full rounded-xl border border-bd bg-bg pl-25 pr-4 text-sm outline-none transition placeholder:text-mut/70 hover:border-fg/15 focus:border-ac focus:ring-4 focus:ring-ac/10"
                    />
                  </div>

                  <p className="mt-2 text-[11px] text-mut">
                    Example: 1712345678
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ac px-5 text-sm font-bold text-slate-950 transition hover:bg-[#91c63c] hover:shadow-[0_8px_30px_rgba(163,219,74,0.12)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                      Sending code...
                    </>
                  ) : (
                    <>
                      Send reset code
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Back to login */}
              <div className="mt-7 text-center">
                <Link
                  href="/login"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-mut transition hover:text-fg"
                >
                  <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                  Back to sign in
                </Link>
              </div>
            </>
          ) : (
            /* =========================================================
               SUCCESS STATE
            ========================================================= */

            <div className="py-5 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-ac/10 text-ac">
                <CheckCircle2 className="size-7" />
              </div>

              <h1 className="mt-6 text-3xl font-bold tracking-[-0.04em]">
                Check your phone.
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-mut">
                If an AmarDokan account exists for{" "}
                <span className="font-semibold text-fg">
                  +880 {phone}
                </span>
                , we&apos;ll send a verification code shortly.
              </p>

              <div className="mt-7 rounded-xl border border-bd bg-bg px-4 py-3 text-left">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-ac" />

                  <div>
                    <p className="text-xs font-semibold">
                      Verification code
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-mut">
                      Enter the code from your SMS to continue resetting your
                      password.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href={`/reset-password?phone=${phone}`}
                className="group mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ac px-5 text-sm font-bold text-slate-950 transition hover:bg-[#91c63c]"
              >
                Continue
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 text-xs font-semibold text-mut transition hover:text-fg"
              >
                Use a different number
              </button>
            </div>
          )}
        </div>

        {/* Security */}
        <div className="mt-7 flex items-center justify-center gap-2 text-[11px] text-mut">
          <ShieldCheck className="size-3.5 text-ac" />
          Your account information is protected
        </div>

        {/* Legal */}
        <div className="mt-7 flex items-center justify-center gap-4 text-[10px] text-mut">
          <p>© 2026 AmarDokan</p>

          <span className="size-1 rounded-full bg-bd" />

          <Link
            href="/privacy-policy"
            className="transition hover:text-fg"
          >
            Privacy Policy
          </Link>

          <span className="size-1 rounded-full bg-bd" />

          <Link
            href="/terms"
            className="transition hover:text-fg"
          >
            Terms
          </Link>
        </div>
      </div>
    </main>
  );
}