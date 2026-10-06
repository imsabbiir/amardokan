/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import useActiveNav from "./useActiveNav";
import { menus } from "./NavMenus";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  X,
  LogOut,
  Lock,
  Package,
  Cog,
  TableOfContents,
  UserRoundGroup,
  Handshake,
  Boxes,
  Shirt,
} from "lucide-react";

import Logo from "../common/Logo";
import GetStartedButton from "../common/GetStartedButton";

const navItemClass = (active) =>
  `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm ${
    active
      ? "bg-ac font-semibold text-slate-950"
      : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
  }`;

export default function SideBar({ sidebarOpen, setSidebarOpen }) {
  const { pathname, activeSection } = useActiveNav();

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    if (!sidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <div className="lg:hidden bg-bg">
      <aside
        id="main-sidebar"
        aria-label="Main navigation"
        aria-hidden={!sidebarOpen}
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(20rem,88vw)] max-w-full flex-col overflow-hidden border-r border-bd bg-bg shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-bd px-5 py-5">
          <Logo
            name={"AmarDokan"}
            title={"Build Your Business"}
            icon={<Package className="size-4" />}
          />

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className={
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-card transition-colors bg-ac "
            }
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          <nav className="space-y-1">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Menu
            </p>

            {menus.map((menu) => {
              const Icon = menu.icon;

              const active = menu.section
                ? pathname === "/" && activeSection === menu.section
                : pathname === menu.href;

              return (
                <Link
                  key={menu.id}
                  href={menu.href}
                  tabIndex={sidebarOpen ? 0 : -1}
                  onClick={closeSidebar}
                  className={navItemClass(active)}
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  <span>{menu.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profile Footer */}
        <div className="flex shrink-0 items-center gap-3 border-t border-slate-100 bg-fg p-4">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
            alt="User avatar"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full border border-slate-200 object-cover"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-card">
              Alex Morgan
            </p>

            <p className="truncate text-xs text-slate-400">
              alex.m@example.com
            </p>
          </div>

          <button
            type="button"
            aria-label="Log out"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-800"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>
    </div>
  );
}
