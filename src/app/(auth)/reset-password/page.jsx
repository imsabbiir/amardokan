
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Package,
  ShieldCheck,
  X,
} from "lucide-react";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
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

  const passwordRequirements = [
    {
      label: "At least 8 characters",
      valid: formData.password.length >= 8,
    },
    {
      label: "Contains a number",
      valid: /\d/.test(formData.password),
    },
    {
      label: "Passwords match",
      valid:
        formData.password.length > 0 &&
        formData.password === formData.confirmPassword,
    },
  ];

  const passwordIsValid =
    formData.password.length >= 8 &&
    /\d/.test(formData.password) &&
    formData.password === formData.confirmPassword;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!formData.password || !formData.confirmPassword) {
      setError("Please enter your new password.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!/\d/.test(formData.password)) {
      setError("Password must contain at least one number.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    /*
      Connect your password reset API here.

      Example:

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          otp,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to reset your password.");
        setLoading(false);
        return;
      }

      router.push("/login");
    */

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setSuccess(true);
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
          {!success ? (
            <>
              {/* Icon */}
              <div className="mb-6 flex size-11 items-center justify-center rounded-xl border border-bd bg-bg text-ac">
                <LockKeyhole className="size-5" />
              </div>

              {/* Heading */}
              <div>
                <div className="flex w-fit items-center gap-2 rounded-full border border-bd bg-bg px-3 py-1.5 text-[11px] font-semibold">
                  <span className="size-1.5 rounded-full bg-ac" />
                  Secure your account
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                  Reset your password.
                </h1>

                <p className="mt-3 text-sm leading-6 text-mut">
                  Create a new password for your AmarDokan account. Make sure
                  it&apos;s strong and easy for you to remember.
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

                {/* New password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-semibold"
                  >
                    New password
                  </label>

                  <div className="group relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-mut transition group-focus-within:text-ac" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your new password"
                      autoComplete="new-password"
                      required
                      className="h-12 w-full rounded-xl border border-bd bg-bg pl-11 pr-12 text-sm outline-none transition placeholder:text-mut/70 hover:border-fg/15 focus:border-ac focus:ring-4 focus:ring-ac/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-mut transition hover:bg-bg2 hover:text-fg"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password requirements */}
                <div className="mt-4 rounded-xl border border-bd bg-bg px-4 py-3.5">
                  <p className="mb-3 text-[11px] font-semibold text-fg">
                    Password requirements
                  </p>

                  <div className="space-y-2">
                    {passwordRequirements.map((requirement) => (
                      <div
                        key={requirement.label}
                        className="flex items-center gap-2"
                      >
                        <div
                          className={`flex size-4 items-center justify-center rounded-full border transition ${
                            requirement.valid
                              ? "border-ac bg-ac text-slate-950"
                              : "border-bd text-transparent"
                          }`}
                        >
                          <Check className="size-2.5" strokeWidth={3} />
                        </div>

                        <span
                          className={`text-[11px] transition ${
                            requirement.valid
                              ? "text-fg"
                              : "text-mut"
                          }`}
                        >
                          {requirement.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confirm password */}
                <div className="mt-5">
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-xs font-semibold"
                  >
                    Confirm new password
                  </label>

                  <div className="group relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-mut transition group-focus-within:text-ac" />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat your new password"
                      autoComplete="new-password"
                      required
                      className={`h-12 w-full rounded-xl border bg-bg pl-11 pr-12 text-sm outline-none transition placeholder:text-mut/70 hover:border-fg/15 focus:ring-4 ${
                        formData.confirmPassword &&
                        formData.password === formData.confirmPassword
                          ? "border-ac focus:border-ac focus:ring-ac/10"
                          : "border-bd focus:border-ac focus:ring-ac/10"
                      }`}
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
                      className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-mut transition hover:bg-bg2 hover:text-fg"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {formData.confirmPassword && (
                    <div
                      className={`mt-2 flex items-center gap-1.5 text-[11px] ${
                        formData.password === formData.confirmPassword
                          ? "text-ac"
                          : "text-red-500"
                      }`}
                    >
                      {formData.password === formData.confirmPassword ? (
                        <>
                          <CheckCircle2 className="size-3.5" />
                          Passwords match
                        </>
                      ) : (
                        <>
                          <X className="size-3.5" />
                          Passwords do not match
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !passwordIsValid}
                  className="group mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ac px-5 text-sm font-bold text-slate-950 transition hover:bg-[#91c63c] hover:shadow-[0_8px_30px_rgba(163,219,74,0.12)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                      Updating password...
                    </>
                  ) : (
                    <>
                      Reset password
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
                Password updated.
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-mut">
                Your AmarDokan password has been successfully changed. You can
                now sign in with your new password.
              </p>

              <Link
                href="/login"
                className="group mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ac px-5 text-sm font-bold text-slate-950 transition hover:bg-[#91c63c] hover:shadow-[0_8px_30px_rgba(163,219,74,0.12)]"
              >
                Continue to sign in
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
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
