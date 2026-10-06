"use client";

import Link from "next/link";
import {
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  Info,
  Package,
  Search,
  Settings,
  Truck,
  Wallet,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

const notifications = [
  {
    id: 1,
    type: "order",
    title: "New order received",
    description:
      "Order #AM-10491 has been placed by Fahim Rahman and is waiting for confirmation.",
    time: "8 min ago",
    date: "Today",
    unread: true,
    href: "/dashboard/orders/AM-10491",
  },
  {
    id: 2,
    type: "delivery",
    title: "Order delivered successfully",
    description:
      "Order #AM-10482 was delivered to the customer. The order has been marked as completed.",
    time: "42 min ago",
    date: "Today",
    unread: true,
    href: "/dashboard/orders/AM-10482",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment received",
    description:
      "৳3,610 from order #AM-10482 has been added to your earnings.",
    time: "1 hour ago",
    date: "Today",
    unread: true,
    href: "/dashboard/earnings",
  },
  {
    id: 4,
    type: "warning",
    title: "Low inventory alert",
    description:
      "Essential Sweatshirt — Grey / L is running low. Only 8 units are currently available.",
    time: "2 hours ago",
    date: "Today",
    unread: true,
    href: "/dashboard/inventory",
  },
  {
    id: 5,
    type: "order",
    title: "Order requires attention",
    description:
      "Order #AM-10471 has been waiting for fulfillment for more than 12 hours.",
    time: "4 hours ago",
    date: "Today",
    unread: false,
    href: "/dashboard/orders/AM-10471",
  },
  {
    id: 6,
    type: "delivery",
    title: "Shipment is out for delivery",
    description:
      "Order #AM-10468 is currently out for delivery with Pathao Courier.",
    time: "Yesterday",
    date: "Yesterday",
    unread: false,
    href: "/dashboard/orders/AM-10468",
  },
  {
    id: 7,
    type: "info",
    title: "New product collection available",
    description:
      "12 new products have been added to the AmarDokan catalog. Explore the latest products.",
    time: "Yesterday",
    date: "Yesterday",
    unread: false,
    href: "/dashboard/products",
  },
  {
    id: 8,
    type: "payment",
    title: "Weekly earnings statement ready",
    description:
      "Your earnings statement for September 28 – October 4 is now available.",
    time: "Oct 05",
    date: "Earlier",
    unread: false,
    href: "/dashboard/earnings",
  },
  {
    id: 9,
    type: "system",
    title: "Profile information updated",
    description:
      "Your seller profile information was successfully updated.",
    time: "Oct 04",
    date: "Earlier",
    unread: false,
    href: "/dashboard/settings",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Orders", value: "order" },
  { label: "Payments", value: "payment" },
  { label: "Delivery", value: "delivery" },
];

function getNotificationConfig(type) {
  const config = {
    order: {
      icon: Package,
      iconClass: "bg-blue-500/10 text-blue-600",
    },
    delivery: {
      icon: Truck,
      iconClass: "bg-ac/10 text-ac",
    },
    payment: {
      icon: Wallet,
      iconClass: "bg-violet-500/10 text-violet-600",
    },
    warning: {
      icon: AlertTriangle,
      iconClass: "bg-amber-500/10 text-amber-600",
    },
    info: {
      icon: Info,
      iconClass: "bg-sky-500/10 text-sky-600",
    },
    system: {
      icon: Settings,
      iconClass: "bg-bg2 text-mut",
    },
  };

  return config[type] || config.system;
}

function NotificationIcon({ type }) {
  const config = getNotificationConfig(type);
  const Icon = config.icon;

  return (
    <div
      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${config.iconClass}`}
    >
      <Icon className="size-4.5" />
    </div>
  );
}

function NotificationItem({ notification, onRead }) {
  return (
    <Link
      href={notification.href}
      onClick={() => onRead(notification.id)}
      className={`group relative flex gap-4 px-4 py-4 transition sm:px-5 sm:py-5 ${
        notification.unread
          ? "bg-ac/2.5 hover:bg-ac/5"
          : "hover:bg-bg2/60"
      }`}
    >
      {/* Unread indicator */}
      {notification.unread && (
        <span className="absolute left-0 top-0 h-full w-0.5 bg-ac" />
      )}

      <NotificationIcon type={notification.type} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3
                className={`truncate text-sm ${
                  notification.unread
                    ? "font-semibold"
                    : "font-medium"
                }`}
              >
                {notification.title}
              </h3>

              {notification.unread && (
                <span className="size-1.5 shrink-0 rounded-full bg-ac" />
              )}
            </div>

            <p className="mt-1.5 max-w-2xl text-xs leading-5 text-mut">
              {notification.description}
            </p>
          </div>

          <span className="shrink-0 text-[11px] text-mut">
            {notification.time}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-mut transition group-hover:text-ac">
          View details
          <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(notifications);

  const unreadCount = items.filter(
    (notification) => notification.unread
  ).length;

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((notification) => {
      const matchesFilter =
        activeFilter === "all"
          ? true
          : activeFilter === "unread"
            ? notification.unread
            : notification.type === activeFilter;

      const matchesSearch =
        !query ||
        notification.title.toLowerCase().includes(query) ||
        notification.description.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [items, activeFilter, search]);

  const markAsRead = (id) => {
    setItems((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setItems((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-bg">
      <div className="mx-auto max-w-275 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs text-mut">
            <Link
              href="/dashboard"
              className="transition hover:text-fg"
            >
              Overview
            </Link>

            <ChevronRight className="size-3.5" />

            <span className="text-fg">
              Notifications
            </span>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-ac/10 sm:flex">
                <Bell className="size-5 text-ac" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Notifications
                  </h1>

                  {unreadCount > 0 && (
                    <span className="rounded-full bg-ac/10 px-2.5 py-1 text-[11px] font-bold text-ac">
                      {unreadCount} unread
                    </span>
                  )}
                </div>

                <p className="mt-1.5 text-sm text-mut">
                  Stay updated on orders, deliveries, payments, and your business.
                </p>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-bd bg-bg px-3.5 py-2.5 text-xs font-semibold transition hover:bg-bg2"
              >
                <Check className="size-3.5 text-ac" />
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Notification overview */}
        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-bd bg-bg p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-ac/10">
                <Bell className="size-4 text-ac" />
              </div>

              <div>
                <p className="text-[11px] font-medium text-mut">
                  Total notifications
                </p>

                <p className="mt-0.5 text-lg font-bold">
                  {items.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-bd bg-bg p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10">
                <Clock3 className="size-4 text-amber-600" />
              </div>

              <div>
                <p className="text-[11px] font-medium text-mut">
                  Unread
                </p>

                <p className="mt-0.5 text-lg font-bold">
                  {unreadCount}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-bd bg-bg p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10">
                <Package className="size-4 text-blue-600" />
              </div>

              <div>
                <p className="text-[11px] font-medium text-mut">
                  Order updates
                </p>

                <p className="mt-0.5 text-lg font-bold">
                  {
                    items.filter(
                      (notification) =>
                        notification.type === "order" ||
                        notification.type === "delivery"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main notification card */}
        <section className="overflow-hidden rounded-2xl border border-bd bg-bg">

          {/* Toolbar */}
          <div className="border-b border-bd p-4 sm:p-5">
            <div className="flex flex-col gap-4">

              {/* Search */}
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-mut" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search notifications..."
                  className="h-10 w-full rounded-xl border border-bd bg-bg2 pl-10 pr-4 text-sm outline-none transition placeholder:text-mut/70 focus:border-ac focus:ring-4 focus:ring-ac/10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-1 overflow-x-auto pb-1">
                {[
                  ...filters,
                  {
                    label: "System",
                    value: "system",
                  },
                ].map((filter) => {
                  const active =
                    activeFilter === filter.value;

                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() =>
                        setActiveFilter(filter.value)
                      }
                      className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                        active
                          ? "bg-fg text-bg"
                          : "text-mut hover:bg-bg2 hover:text-fg"
                      }`}
                    >
                      {filter.label}

                      {filter.value === "unread" &&
                        unreadCount > 0 && (
                          <span
                            className={`ml-1.5 ${
                              active
                                ? "opacity-60"
                                : "opacity-50"
                            }`}
                          >
                            {unreadCount}
                          </span>
                        )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Date label */}
          {filteredNotifications.length > 0 && (
            <div className="border-b border-bd bg-bg2/40 px-4 py-2.5 sm:px-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-mut">
                Recent activity
              </p>
            </div>
          )}

          {/* Notifications */}
          {filteredNotifications.length ? (
            <div className="divide-y divide-bd">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={markAsRead}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              hasSearch={Boolean(search)}
              filter={activeFilter}
              onReset={() => {
                setSearch("");
                setActiveFilter("all");
              }}
            />
          )}

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="border-t border-bd bg-bg2/30 px-4 py-4 text-center sm:px-5">
              <p className="text-[11px] text-mut">
                You&apos;re all caught up with the notifications shown here.
              </p>
            </div>
          )}
        </section>

        {/* Notification preferences */}
        <section className="mt-5 flex flex-col gap-4 rounded-2xl border border-bd bg-bg2/50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-bg">
              <Settings className="size-4 text-mut" />
            </div>

            <div>
              <p className="text-xs font-semibold">
                Notification preferences
              </p>

              <p className="mt-1 text-[11px] leading-5 text-mut">
                Choose which business updates you want to receive.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/settings"
            className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-bd bg-bg px-3.5 py-2.5 text-xs font-semibold transition hover:bg-bg2"
          >
            Manage preferences
            <ArrowUpRightIcon />
          </Link>
        </section>
      </div>
    </main>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="size-3.5"
      aria-hidden="true"
    >
      <path
        d="M4.5 11.5L11.5 4.5M6 4.5H11.5V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmptyState({ hasSearch, filter, onReset }) {
  return (
    <div className="px-6 py-20 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-bg2">
        {hasSearch ? (
          <Search className="size-5 text-mut" />
        ) : (
          <Bell className="size-5 text-mut" />
        )}
      </div>

      <h3 className="mt-4 text-sm font-semibold">
        {hasSearch
          ? "No notifications found"
          : filter === "unread"
            ? "You're all caught up"
            : "No notifications yet"}
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-mut">
        {hasSearch
          ? "Try searching for something else."
          : filter === "unread"
            ? "There are no unread notifications at the moment."
            : "Business updates and important activity will appear here."}
      </p>

      {(hasSearch || filter !== "all") && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 rounded-xl bg-fg px-4 py-2.5 text-xs font-semibold text-bg transition hover:opacity-90"
        >
          View all notifications
        </button>
      )}
    </div>
  );
}
