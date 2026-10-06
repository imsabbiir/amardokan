"use client";

import Link from "next/link";
import {
  Bell,
  Menu,
  Plus,
  Search,
} from "lucide-react";

export default function DashboardHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex h-18 items-center border-b border-bd bg-bg/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open dashboard menu"
        className="mr-3 flex size-9 items-center justify-center rounded-xl border border-bd text-mut transition hover:bg-bg2 hover:text-fg lg:hidden"
      >
        <Menu className="size-4" />
      </button>

      {/* Search */}
      <div className="hidden w-full max-w-sm md:block">
        <div className="group relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-mut transition group-focus-within:text-ac" />

          <input
            type="search"
            placeholder="Search orders, products..."
            className="h-10 w-full rounded-xl border border-bd bg-bg2 pl-10 pr-4 text-xs outline-none transition placeholder:text-mut/70 hover:border-fg/10 focus:border-ac focus:ring-4 focus:ring-ac/10"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Mobile search */}
        <button
          type="button"
          aria-label="Search"
          className="flex size-9 items-center justify-center rounded-xl border border-bd text-mut transition hover:bg-bg2 hover:text-fg md:hidden"
        >
          <Search className="size-4" />
        </button>

        {/* Notifications */}
        <Link
          href="/dashboard/notifications"
          className="relative flex size-10 items-center justify-center rounded-xl border border-bd text-mut transition hover:bg-bg2 hover:text-fg"
          aria-label="Notifications"
        >
          <Bell className="size-4.25" />

          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-ac ring-2 ring-bg" />
        </Link>

        {/* Avatar */}
        <Link
          href="/dashboard/profile"
          className="ml-1 flex size-10 items-center justify-center rounded-full bg-ac/15 text-xs font-bold text-ac transition hover:bg-ac/25"
        >
          SA
        </Link>
      </div>
    </header>
  );
}