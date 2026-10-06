"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Boxes,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Package,
  RotateCcw,
  Settings,
  ShoppingCart,
  Truck,
  UserRound,
  Users,
  X,
} from "lucide-react";

const mainNavigation = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
    badge: "12",
  },
  {
    label: "Products",
    href: "/dashboard/products",
    icon: Boxes,
  },
  {
    label: "My Store",
    href: "/dashboard/my-store",
    icon: Boxes,
  },
  {
    label: "Deliveries",
    href: "/dashboard/deliveries",
    icon: Truck,
  },
  {
    label: "Returns",
    href: "/dashboard/returns",
    icon: RotateCcw,
  },
];

const businessNavigation = [
  {
    label: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    label: "Earnings",
    href: "/dashboard/earnings",
    icon: CreditCard,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
];

const accountNavigation = [
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    badge: "3",
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

function NavigationItem({ item, pathname, onClose }) {
  const Icon = item.icon;

  const isActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
        isActive
          ? "bg-ac text-slate-950 shadow-[0_6px_20px_rgba(163,219,74,0.12)]"
          : "text-mut hover:bg-bg2 hover:text-fg"
      }`}
    >
      <Icon
        className={`size-4.5 shrink-0 transition-colors ${
          isActive ? "text-slate-950" : "text-mut group-hover:text-fg"
        }`}
        strokeWidth={1.8}
      />

      <span className="min-w-0 flex-1 truncate">{item.label}</span>

      {item.badge && (
        <span
          className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
            isActive
              ? "bg-slate-950/10 text-slate-950"
              : "bg-bg2 text-mut"
          }`}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}

function NavigationGroup({ title, items, pathname, onClose }) {
  return (
    <div>
      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-mut/70">
        {title}
      </p>

      <div className="space-y-1">
        {items.map((item) => (
          <NavigationItem
            key={item.href}
            item={item}
            pathname={pathname}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
}

export default function DashboardSidebar({
  mobileOpen = false,
  onClose = () => {},
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close dashboard menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-67.5 flex-col border-r border-bd bg-bg transition-transform duration-300 lg:z-30 lg:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="flex h-18 shrink-0 items-center justify-between border-b border-bd px-5">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="group flex items-center gap-3"
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-ac text-slate-950 shadow-[0_0_25px_rgba(163,219,74,0.12)] transition-transform group-hover:scale-105">
              <Package className="size-4.5" />
            </div>

            <div>
              <p className="text-[15px] font-bold tracking-tight">
                AmarDokan
              </p>

              <p className="text-[9px] font-medium text-mut">
                Seller Dashboard
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex size-8 items-center justify-center rounded-lg text-mut transition hover:bg-bg2 hover:text-fg lg:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-6">
            <NavigationGroup
              title="Workspace"
              items={mainNavigation}
              pathname={pathname}
              onClose={onClose}
            />

            <NavigationGroup
              title="Business"
              items={businessNavigation}
              pathname={pathname}
              onClose={onClose}
            />

            <NavigationGroup
              title="Account"
              items={accountNavigation}
              pathname={pathname}
              onClose={onClose}
            />
          </div>
        </div>

        {/* Help */}
        <div className="px-4 pb-4">
          <Link
            href="/dashboard/support"
            onClick={onClose}
            className="group flex items-center gap-3 rounded-xl border border-bd bg-bg2/40 px-3 py-3 transition hover:border-fg/10 hover:bg-bg2"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-ac/10 text-ac">
              <CircleHelp className="size-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold">Need help?</p>
              <p className="mt-0.5 text-[10px] text-mut">
                Talk to our support team
              </p>
            </div>

            <ChevronRight className="size-3.5 text-mut transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Logout */}
        <div className="border-t border-bd p-4">
          <button
            type="button"
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-mut transition hover:bg-red-500/5 hover:text-red-500"
          >
            <LogOut className="size-4.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}