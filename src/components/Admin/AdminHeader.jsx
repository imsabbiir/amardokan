"use client";

import Link from "next/link";
import {
  Bell,
  Menu,
  Search,
  Settings,
} from "lucide-react";

export default function AdminHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-[#dcdcde] bg-white/95 px-4 backdrop-blur sm:px-6">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="mr-3 rounded-lg p-2 text-[#50575e] hover:bg-[#f0f0f1] lg:hidden"
        aria-label="Open admin navigation"
      >
        <Menu size={21} />
      </button>

      {/* Search */}
      <div className="hidden max-w-md flex-1 md:block">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c8f94]"
          />

          <input
            type="search"
            placeholder="Search orders, sellers, products..."
            className="h-10 w-full rounded-lg border border-[#dcdcde] bg-[#f6f7f7] pl-10 pr-4 text-sm outline-none transition placeholder:text-[#8c8f94] focus:border-[#8aad45] focus:bg-white focus:ring-2 focus:ring-[#a3db4a]/20"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        {/* Mobile search */}
        <button
          className="rounded-lg p-2.5 text-[#50575e] hover:bg-[#f0f0f1] md:hidden"
          aria-label="Search"
        >
          <Search size={19} />
        </button>

        {/* Notifications */}
        <Link
          href="/admin/notifications"
          className="relative rounded-lg p-2.5 text-[#50575e] hover:bg-[#f0f0f1]"
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#a3db4a] ring-2 ring-white" />
        </Link>

        {/* Settings */}
        <Link
          href="/admin/settings"
          className="hidden rounded-lg p-2.5 text-[#50575e] hover:bg-[#f0f0f1] sm:block"
          aria-label="Settings"
        >
          <Settings size={19} />
        </Link>

        {/* Divider */}
        <div className="mx-2 hidden h-7 w-px bg-[#dcdcde] sm:block" />

        {/* Admin */}
        <Link
          href="/admin/admins"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-[#f6f7f7]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d2327] text-[11px] font-bold text-[#a3db4a]">
            SA
          </div>

          <div className="hidden text-left lg:block">
            <p className="text-xs font-semibold text-[#1d2327]">
              Super Admin
            </p>

            <p className="text-[10px] text-[#8c8f94]">
              Administrator
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}