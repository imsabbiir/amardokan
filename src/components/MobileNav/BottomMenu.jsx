"use client";

import Link from "next/link";
import { Home, Heart, UserRound, Menu } from "lucide-react";
import MobileCategorySidebar from "./MobileCategorySidebar";
import { useState } from "react";

export default function BottomMenu({
  activeItem = "home",
  initialCategories = [],
  initialSubcategories = [],
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const items = [
    {
      id: "home",
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      id: "categories",
      label: "Categories",
      icon: Menu,
      action: () => setSidebarOpen(true),
    },
    {
      id: "wishlist",
      label: "Wishlist",
      href: "/wishlist",
      icon: Heart,
    },
    {
      id: "profile",
      label: "Profile",
      href: "/profile",
      icon: UserRound,
    },
  ];

  return (
    <>
      <MobileCategorySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        categories={initialCategories}
        subcategories={initialSubcategories}
      />

      <nav
        aria-label="Bottom navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:hidden"
      >
        <div className="mx-auto grid max-w-lg grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            const className = `flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-medium transition-colors ${
              activeItem === item.id
                ? "text-slate-950"
                : "text-slate-500 hover:text-slate-900"
            }`;

            const content = (
              <>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    activeItem === item.id
                      ? "bg-[#a3db4a]"
                      : ""
                  }`}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </span>

                <span className="truncate">
                  {item.label}
                </span>
              </>
            );

            // Categories button
            if (item.action) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  className={className}
                  aria-label={item.label}
                >
                  {content}
                </button>
              );
            }

            // Normal navigation link
            return (
              <Link
                key={item.id}
                href={item.href}
                className={className}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}