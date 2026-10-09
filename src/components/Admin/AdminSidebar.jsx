"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  Boxes,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Headphones,
  LayoutDashboard,
  LogOut,
  Package,
  PanelLeftClose,
  RotateCcw,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
  UserRound,
  Users,
  WalletCards,
  X,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Operations",
    items: [
      {
        name: "Orders",
        href: "/admin/orders",
        icon: ClipboardList,
      },
      {
        name: "Deliveries",
        href: "/admin/deliveries",
        icon: Truck,
      },
      {
        name: "Returns",
        href: "/admin/returns",
        icon: RotateCcw,
      },
      {
        name: "Inventory",
        href: "/admin/inventory",
        icon: Boxes,
      },
    ],
  },

  {
    label: "Catalog",
    items: [
      {
        name: "Products",
        href: "/admin/products",
        icon: Package,
      },
      {
        name: "Catalog",
        href: "/admin/catalog",
        icon: Package,
      },
      {
        name: "Categories",
        href: "/admin/categories",
        icon: ShoppingBag,
      },
    ],
  },

  {
    label: "Sellers",
    items: [
      {
        name: "Sellers",
        href: "/admin/sellers",
        icon: Store,
      },
      {
        name: "Pending Approvals",
        href: "/admin/sellers/pending",
        icon: UserRound,
        badge: 8,
      },
    ],
  },

  {
    label: "Customers",
    items: [
      {
        name: "Customers",
        href: "/admin/customers",
        icon: Users,
      },
    ],
  },

  {
    label: "Finance",
    items: [
      {
        name: "Payments",
        href: "/admin/payments",
        icon: CreditCard,
      },
      {
        name: "Payouts",
        href: "/admin/payouts",
        icon: WalletCards,
      },
    ],
  },

  {
    label: "Logistics",
    items: [
      {
        name: "Couriers",
        href: "/admin/couriers",
        icon: Truck,
      },
    ],
  },

  {
    label: "Support",
    items: [
      {
        name: "Support Tickets",
        href: "/admin/support",
        icon: Headphones,
        badge: 12,
      },
    ],
  },

  {
    label: "Insights",
    items: [
      {
        name: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
      },
    ],
  },

  {
    label: "System",
    items: [
      {
        name: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
      },
      {
        name: "Audit Logs",
        href: "/admin/audit-logs",
        icon: Activity,
      },
      {
        name: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export default function AdminSidebar({
  mobileOpen,
  setMobileOpen,
}) {
  const pathname = usePathname();

  function isActive(href) {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-65 flex-col
          border-r border-[#dcdcde] bg-[#1d2327]
          transition-transform duration-200
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#a3db4a]">
              <span className="text-lg font-black text-[#1d2327]">
                A
              </span>
            </div>

            <div>
              <div className="text-[15px] font-bold tracking-tight text-white">
                AmarDokan
              </div>

              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                Admin Console
              </div>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Admin identity */}
        <div className="mx-3 mt-4 rounded-xl border border-white/10 bg-white/4 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#a3db4a] text-sm font-bold text-[#1d2327]">
              SA
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Super Admin
              </p>

              <p className="truncate text-xs text-white/40">
                Administrator
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="admin-scrollbar flex-1 overflow-y-auto px-3 py-5">
          {navigation.map((section) => (
            <div key={section.label} className="mb-6">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
                {section.label}
              </p>

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`
                        group flex min-h-10 items-center gap-3 rounded-lg px-3
                        text-[13px] font-medium transition
                        ${
                          active
                            ? "bg-[#a3db4a] text-[#1d2327]"
                            : "text-white/60 hover:bg-white/[0.07] hover:text-white"
                        }
                      `}
                    >
                      <Icon
                        size={17}
                        strokeWidth={active ? 2.2 : 1.8}
                        className="shrink-0"
                      />

                      <span className="flex-1 truncate">
                        {item.name}
                      </span>

                      {item.badge && (
                        <span
                          className={`
                            min-w-5 rounded-full px-1.5 py-0.5 text-center
                            text-[10px] font-bold
                            ${
                              active
                                ? "bg-[#1d2327]/10 text-[#1d2327]"
                                : "bg-[#a3db4a] text-[#1d2327]"
                            }
                          `}
                        >
                          {item.badge}
                        </span>
                      )}

                      {active && (
                        <ChevronRight
                          size={14}
                          className="opacity-60"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="shrink-0 border-t border-white/10 p-3">
          <Link
            href="/"
            target="_blank"
            className="flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium text-white/50 transition hover:bg-white/[0.07] hover:text-white"
          >
            <PanelLeftClose size={17} />
            View Website
          </Link>

          <Link
            href="/admin/login"
            className="mt-1 flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium text-white/50 transition hover:bg-white/[0.07] hover:text-red-300"
          >
            <LogOut size={17} />
            Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
}