"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Package,
  ShieldCheck,
  UserRound,
  Phone,
  Store,
  Sparkles,
} from "lucide-react";

const benefits = [
  {
    icon: Package,
    title: "Start without inventory",
    description:
      "Choose products from our catalog without buying or storing stock yourself.",
  },
  {
    icon: Store,
    title: "Build your store",
    description:
      "Set your selling prices and start taking orders from your customers.",
  },
  {
    icon: ShieldCheck,
    title: "We handle fulfillment",
    description:
      "Packing, delivery, COD and returns are handled for you.",
  },
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (formData.phone.length !== 10) {
      setError("Please enter a valid Bangladesh phone number.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    /*
      Connect your registration API here.

      Example:

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create your account.");
        setLoading(false);
        return;
      }

      router.push("/login");
    */

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-bg text-fg">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* =========================================================
            LEFT — BRAND / PRODUCT EXPERIENCE
        ========================================================= */}

        <section className="relative hidden overflow-hidden border-r border-bd bg-bg2 lg:flex">
          {/* Background grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-10 size-120 rounded-full bg-ac/10 blur-[110px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 right-0 size-112 rounded-full bg-ac/5 blur-[100px]"
          />

          <div className="relative flex w-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <Link
              href="/"
              className="group flex w-fit items-center gap-3"
              aria-label="AmarDokan home"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-ac text-slate-950 shadow-[0_0_30px_rgba(163,219,74,0.15)] transition-transform duration-300 group-hover:scale-105">
                <Package className="size-5" />
              </div>

              <div>
                <p className="text-[15px] font-bold tracking-tight">
                  AmarDokan
                </p>

                <p className="text-[10px] font-medium text-mut">
                  Build Your Business
                </p>
              </div>
            </Link>

            {/* Main content */}
            <div className="relative my-auto max-w-xl py-20">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-bd bg-bg/60 px-3.5 py-2 text-xs font-semibold backdrop-blur">
                <Sparkles className="size-3.5 text-ac" />
                Start your journey
              </div>

              <h1 className="text-5xl font-bold leading-[1.04] tracking-[-0.055em] xl:text-6xl">
                Your business
                <br />
                <span className="text-mut">starts here.</span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-mut xl:text-lg xl:leading-8">
                Create your AmarDokan seller account and start selling
                products without worrying about inventory, packing or
                delivery.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-4">
                {benefits.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-3.5"
                    >
                      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-ac/10 text-ac">
                        <Icon className="size-3.5" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold">
                          {item.title}
                        </p>

                        <p className="mt-0.5 text-[11px] leading-5 text-mut">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-4 text-[11px] text-mut">
              <p>© 2026 AmarDokan</p>

              <div className="flex items-center gap-4">
                <Link
                  href="/privacy-policy"
                  className="transition hover:text-fg"
                >
                  Privacy
                </Link>

                <Link
                  href="/terms"
                  className="transition hover:text-fg"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            RIGHT — SIGN UP
        ========================================================= */}

        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-ac/10 blur-[90px] lg:hidden"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-ac/5 blur-[100px] lg:hidden"
          />

          <div className="relative w-full max-w-md px-5 py-10 sm:px-8 lg:max-w-120 lg:px-10 xl:px-12">
            {/* Mobile logo */}
            <div className="mb-10 lg:hidden">
              <Link
                href="/"
                className="flex w-fit items-center gap-3"
                aria-label="AmarDokan home"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-ac text-slate-950">
                  <Package className="size-5" />
                </div>

                <div>
                  <p className="text-[15px] font-bold tracking-tight">
                    AmarDokan
                  </p>

                  <p className="text-[10px] font-medium text-mut">
                    Build Your Business
                  </p>
                </div>
              </Link>
            </div>

            {/* Heading */}
            <div>
              <Link
                href="/"
                className="group mb-7 flex w-fit items-center gap-2 rounded-lg border border-bd bg-bg/60 px-3 py-2 text-xs font-medium text-mut backdrop-blur-sm transition-all hover:border-fg/15 hover:bg-bg2 hover:text-fg"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                <span>Back to Home</span>
              </Link>

              <div className="flex w-fit items-center gap-2 rounded-full border border-bd bg-bg2 px-3 py-1.5 text-[11px] font-semibold">
                <span className="size-1.5 rounded-full bg-ac" />
                Seller account
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                Create your account.
              </h2>

              <p className="mt-3 text-sm leading-6 text-mut">
                Start building your online business with AmarDokan.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8">
              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-500"
                >
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold"
                >
                  Full name
                </label>

                <div className="group relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-mut transition group-focus-within:text-ac" />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    className="h-12 w-full rounded-xl border border-bd bg-bg2 pl-11 pr-4 text-sm outline-none transition placeholder:text-mut/70 hover:border-fg/15 focus:border-ac focus:ring-4 focus:ring-ac/10"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mt-5">
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
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1XXXXXXXXX"
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={10}
                    required
                    className="h-12 w-full rounded-xl border border-bd bg-bg2 pl-25 pr-4 text-sm outline-none transition placeholder:text-mut/70 hover:border-fg/15 focus:border-ac focus:ring-4 focus:ring-ac/10"
                  />
                </div>

                <p className="mt-2 text-[11px] text-mut">
                  Use an active Bangladesh phone number.
                </p>
              </div>

              {/* Password */}
              <div className="mt-5">
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-semibold"
                >
                  Password
                </label>

                <div className="group relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-mut transition group-focus-within:text-ac" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                    className="h-12 w-full rounded-xl border border-bd bg-bg2 pl-11 pr-12 text-sm outline-none transition placeholder:text-mut/70 hover:border-fg/15 focus:border-ac focus:ring-4 focus:ring-ac/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-mut transition hover:bg-bg hover:text-fg"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-[11px] text-mut">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Confirm password */}
              <div className="mt-5">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-semibold"
                >
                  Confirm password
                </label>

                <div className="group relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-mut transition group-focus-within:text-ac" />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    required
                    className="h-12 w-full rounded-xl border border-bd bg-bg2 pl-11 pr-12 text-sm outline-none transition placeholder:text-mut/70 hover:border-fg/15 focus:border-ac focus:ring-4 focus:ring-ac/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-mut transition hover:bg-bg hover:text-fg"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="mt-5 flex items-start gap-2.5">
                <Check className="mt-0.5 size-3.5 shrink-0 text-ac" />

                <p className="text-[11px] leading-5 text-mut">
                  By creating an account, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-fg underline underline-offset-2 hover:text-ac"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-semibold text-fg underline underline-offset-2 hover:text-ac"
                  >
                    Privacy Policy
                  </Link>
                  .
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Login */}
            <div className="mt-7 text-center">
              <p className="text-sm text-mut">
                Already have an AmarDokan account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-fg underline decoration-bd underline-offset-4 transition hover:text-ac hover:decoration-ac"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Security */}
            <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-mut">
              <ShieldCheck className="size-3.5 text-ac" />
              Your account information is protected
            </div>

            {/* Mobile legal */}
            <div className="mt-8 flex items-center justify-center gap-4 text-[10px] text-mut lg:hidden">
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
                Terms & Conditions
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}