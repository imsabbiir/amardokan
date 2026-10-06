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
  Mail,
  Package,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const benefits = [
  {
    icon: Package,
    title: "Sell without inventory",
    description:
      "Choose products from our catalog without buying or storing stock yourself.",
  },
  {
    icon: TrendingUp,
    title: "Focus on growing",
    description:
      "Spend more time getting customers while we handle fulfillment and delivery.",
  },
  {
    icon: ShieldCheck,
    title: "Everything in one place",
    description:
      "Manage products, orders, deliveries and your seller business from one dashboard.",
  },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
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

    if (!formData.phone || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    /*
      Connect your authentication API here.

      Example:

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to sign in.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
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

            {/* Main visual */}
            <div className="relative my-auto max-w-xl py-20">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-bd bg-bg/60 px-3.5 py-2 text-xs font-semibold backdrop-blur">
                <Sparkles className="size-3.5 text-ac" />
                Your business, simplified
              </div>

              <h1 className="text-5xl font-bold leading-[1.04] tracking-[-0.055em] xl:text-6xl">
                Turn your
                <br />
                <span className="text-mut">ideas into sales.</span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-mut xl:text-lg xl:leading-8">
                AmarDokan gives online sellers the products, fulfillment and
                delivery infrastructure they need to build a business without
                the complexity of traditional inventory management.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-4">
                {benefits.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-start gap-3.5">
                      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-ac/10 text-ac">
                        <Icon className="size-3.5" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold">{item.title}</p>
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

                <Link href="/terms" className="transition hover:text-fg">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            RIGHT — LOGIN
        ========================================================= */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {/* Mobile-only background */}
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
            <div className="mb-12 lg:hidden">
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
            <div className="space-y-5">
              <Link
                href="/"
                className="group left-5 top-5 flex w-fit items-center gap-2 rounded-lg border border-bd bg-bg/60 px-3 py-2 text-xs font-medium text-mut backdrop-blur-sm transition-all hover:border-fg/15 hover:bg-bg2 hover:text-fg sm:left-8 sm:top-8"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                <span>Back to Home</span>
              </Link>
              <div className="flex w-fit items-center gap-2 rounded-full border border-bd bg-bg2 px-3 py-1.5 text-[11px] font-semibold">
                <span className="size-1.5 rounded-full bg-ac" />
                Seller account
              </div>

              <h2 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                Welcome back.
              </h2>

              <p className="mt-3 text-sm leading-6 text-mut">
                Sign in to continue managing your AmarDokan business.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-9">
              {/* Error */}
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
                    className="h-12 w-full rounded-xl border border-bd bg-bg2 pl-17 pr-4 text-sm outline-none transition placeholder:text-mut/70 hover:border-fg/15 focus:border-ac focus:ring-4 focus:ring-ac/10"
                  />
                </div>

                <p className="mt-2 text-[11px] text-mut">
                  Use the phone number connected to your AmarDokan account.
                </p>
              </div>

              {/* Password */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-mut transition hover:text-ac"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="group relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-mut transition group-focus-within:text-ac" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
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
              </div>

              {/* Remember */}
              <div className="mt-5 flex items-center">
                <label className="group flex cursor-pointer items-center gap-2.5">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={rememberMe}
                    onClick={() => setRememberMe((prev) => !prev)}
                    className={`flex size-4 items-center justify-center rounded-[5px] border transition ${
                      rememberMe
                        ? "border-ac bg-ac text-slate-950"
                        : "border-bd bg-bg2"
                    }`}
                  >
                    {rememberMe && <Check className="size-3" strokeWidth={3} />}
                  </button>

                  <span className="text-xs text-mut transition group-hover:text-fg">
                    Remember me
                  </span>
                </label>
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
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Signup */}
            <div className="mt-8 text-center">
              <p className="text-sm text-mut">
                Don&rsquo;t have an AmarDokan account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-fg underline decoration-bd underline-offset-4 transition hover:text-ac hover:decoration-ac"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Security */}
            <div className="mt-10 flex items-center justify-center gap-2 text-[11px] text-mut">
              <ShieldCheck className="size-3.5 text-ac" />
              Your account information is protected
            </div>

            {/* Mobile legal */}
            <div className="mt-8 flex items-center justify-center gap-4 text-[10px] text-mut lg:hidden">
              <Link href="/privacy-policy" className="transition hover:text-fg">
                Privacy Policy
              </Link>

              <span className="size-1 rounded-full bg-bd" />

              <Link href="/terms" className="transition hover:text-fg">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

