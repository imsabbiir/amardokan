"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    /*
      Connect authentication later:

      POST /api/admin/auth/login

      {
        email,
        password,
        rememberMe
      }

      On success:
        router.push("/admin");
    */
  }

  return (
    <main className="min-h-screen bg-[#f5f6f7] text-[#1d2327]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-105 w-175 -translate-x-1/2 rounded-full bg-[#a3db4a]/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#1d2327 1px, transparent 1px), linear-gradient(90deg, #1d2327 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative flex min-h-screen justify-center items-center px-5 py-10 sm:py-14">
        <div className="w-full max-w-107.5">
          <div className="rounded-2xl border border-[#dcdcde] bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-9">
            <Link
              href="/"
              className="text-xs inline-flex items-center gap-1.5 text-[#646970] transition hover:text-[#1d2327]"
            >
              <ArrowLeft size={15} />
              Back to AmarDokan
            </Link>
            <div className="mb-5 mt-3">
              <h1 className="text-[25px] font-bold tracking-tight text-[#1d2327]">
                Log in
              </h1>

              <p className="mt-1.5 text-sm leading-6 text-[#646970]">
                Sign in to your AmarDokan admin account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-[#1d2327]"
                >
                  Username
                </label>

                <input
                  id="user"
                  name="user"
                  type="text"
                  placeholder="Admin Username"
                  className="h-12 w-full rounded-lg border border-[#c3c4c7] bg-white px-3.5 text-[15px] text-[#1d2327] outline-none transition placeholder:text-[#8c8f94] hover:border-[#8c8f94] focus:border-[#78a92b] focus:ring-2 focus:ring-[#a3db4a]/20"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#1d2327]"
                  >
                    Password
                  </label>

                  <Link
                    href="/admin/forgot-password"
                    className="text-sm font-medium text-[#5f8c20] hover:text-[#456b13] hover:underline"
                  >
                    Lost your password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-lg border border-[#c3c4c7] bg-white px-3.5 pr-12 text-[15px] text-[#1d2327] outline-none transition placeholder:text-[#8c8f94] hover:border-[#8c8f94] focus:border-[#78a92b] focus:ring-2 focus:ring-[#a3db4a]/20"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#646970] transition hover:bg-[#f0f0f1] hover:text-[#1d2327]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                {/* Remember */}
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded border-[#8c8f94] accent-[#78a92b]"
                  />

                  <span className="text-sm text-[#50575e]">Remember me</span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="h-12 items-center justify-center rounded-lg bg-[#1d2327] px-5 text-[15px] font-semibold text-white transition hover:bg-[#2c3338] active:scale-[0.99]"
                >
                  Log In
                </button>
              </div>
            </form>

            {/* Security */}
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#dcdcde] bg-[#f6f7f7] px-3.5 py-3">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-[#6d9f27]"
              />

              <p className="text-xs leading-5 text-[#646970]">
                This is a secure administrator area. Only authorized AmarDokan
                administrators can access this dashboard.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <p className="mt-5 text-center text-xs text-[#8c8f94]">
            © {new Date().getFullYear()} AmarDokan. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
