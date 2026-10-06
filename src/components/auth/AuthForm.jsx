"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Phone,
  User,
} from "lucide-react";

export default function AuthForm({ mode = "login" }) {
  const isLogin = mode === "login";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#faf9f6] px-4 py-8 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_20px_70px_rgba(28,25,23,0.08)] lg:grid-cols-2">
          {/* Left Side */}
          <div className="relative hidden min-h-170 overflow-hidden bg-[#e9efdc] p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex text-2xl font-bold tracking-[-0.04em]"
              >
                Style<span className="text-[#7aaa32]">Pulse</span>
              </Link>

              <div className="mt-28 max-w-md">
                <span className="rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#526b2b]">
                  Wholesale fashion
                </span>

                <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tighter">
                  Grow your fashion business with StylePulse.
                </h1>

                <p className="mt-6 max-w-sm text-sm leading-7 text-stone-600">
                  Discover quality clothing, flexible wholesale pricing, and
                  products made for modern fashion businesses.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#a3db4a]/50 blur-2xl" />

              <div className="relative rounded-2xl border border-white/70 bg-white/60 p-5 backdrop-blur">
                <p className="text-sm font-semibold">
                  Everything your store needs.
                </p>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {["Quality", "Wholesale", "Support"].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl bg-white/70 px-3 py-4 text-center"
                    >
                      <p className="text-xs font-medium text-stone-600">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex min-h-170 flex-col justify-center p-6 sm:p-10 lg:p-14">
            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-12 inline-flex w-fit text-2xl font-bold tracking-[-0.04em] lg:hidden"
            >
              Style<span className="text-[#7aaa32]">Pulse</span>
            </Link>

            <div className="mx-auto w-full max-w-md">
              {/* Heading */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7aaa32]">
                  {isLogin ? "Welcome back" : "Get started"}
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  {isLogin
                    ? "Sign in to your account"
                    : "Create your account"}
                </h2>

                <p className="mt-3 text-sm leading-6 text-stone-500">
                  {isLogin
                    ? "Sign in to continue to your StylePulse account."
                    : "Create your StylePulse account and start shopping."}
                </p>
              </div>

              {/* Google Button */}
              <button
                type="button"
                className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-stone-200 text-xs font-bold">
                  G
                </span>

                Continue with Google
              </button>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-stone-200" />

                <span className="text-xs font-medium text-stone-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-stone-200" />
              </div>

              <form className="space-y-5">
                {/* Name - Signup only */}
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Full name
                    </label>

                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                      />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        className="h-12 w-full rounded-xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-[#8fbd42] focus:bg-white focus:ring-4 focus:ring-[#a3db4a]/15"
                      />
                    </div>
                  </div>
                )}

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Phone number
                  </label>

                  <div className="flex h-12 overflow-hidden rounded-xl border border-stone-200 bg-stone-50 transition focus-within:border-[#8fbd42] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#a3db4a]/15">
                    <div className="flex items-center gap-2 border-r border-stone-200 px-3 text-sm font-medium text-stone-700">
                      <span>🇧🇩</span>
                      <span>+880</span>
                    </div>

                    <div className="relative flex-1">
                      <Phone
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                      />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="1XXXXXXXXX"
                        inputMode="numeric"
                        autoComplete="tel"
                        className="h-full w-full bg-transparent pl-10 pr-4 text-sm outline-none placeholder:text-stone-400"
                      />
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-stone-400">
                    Enter your 10-digit mobile number without +880.
                  </p>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete={
                        isLogin ? "current-password" : "new-password"
                      }
                      className="h-12 w-full rounded-xl border border-stone-200 bg-stone-50 pl-11 pr-12 text-sm outline-none transition placeholder:text-stone-400 focus:border-[#8fbd42] focus:bg-white focus:ring-4 focus:ring-[#a3db4a]/15"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password - Signup */}
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Confirm password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                      />

                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={
                          showConfirmPassword ? "text" : "password"
                        }
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        className="h-12 w-full rounded-xl border border-stone-200 bg-stone-50 pl-11 pr-12 text-sm outline-none transition placeholder:text-stone-400 focus:border-[#8fbd42] focus:bg-white focus:ring-4 focus:ring-[#a3db4a]/15"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((value) => !value)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Login Options */}
                {isLogin ? (
                  <div className="flex items-center justify-between gap-4">
                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        name="remember"
                        className="h-4 w-4 rounded border-stone-300 accent-[#a3db4a]"
                      />

                      <span className="text-sm text-stone-500">
                        Remember me
                      </span>
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-[#719b32] hover:text-stone-900"
                    >
                      Forgot password?
                    </Link>
                  </div>
                ) : (
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      name="terms"
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 accent-[#a3db4a]"
                    />

                    <span className="text-xs leading-5 text-stone-500">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="font-semibold text-stone-800 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="font-semibold text-stone-800 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#a3db4a] px-5 text-sm font-bold text-stone-950 transition hover:bg-[#92ca36] active:scale-[0.99]"
                >
                  {isLogin ? "Sign in" : "Create account"}

                  <ArrowRight size={17} />
                </button>
              </form>

              {/* Switch */}
              <p className="mt-7 text-center text-sm text-stone-500">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <Link
                  href={isLogin ? "/signup" : "/login"}
                  className="font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 hover:text-[#719b32]"
                >
                  {isLogin ? "Create an account" : "Sign in"}
                </Link>
              </p>

              {/* Back to shop */}
              <Link
                href="/"
                className="mt-8 flex items-center justify-center text-xs font-medium text-stone-400 hover:text-stone-700"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}