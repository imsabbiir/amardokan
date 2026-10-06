"use client";

import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  MoreHorizontal,
  Package,
  Search,
  SlidersHorizontal,
  Truck,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

const orders = [
  {
    id: "AM-10482",
    customer: "Nusrat Jahan",
    phone: "01712 345678",
    date: "Oct 06, 2026",
    items: 3,
    total: 2450,
    payment: "Cash on Delivery",
    fulfillment: "Delivered",
    status: "Delivered",
  },
  {
    id: "AM-10471",
    customer: "Tanvir Hasan",
    phone: "01819 456789",
    date: "Oct 06, 2026",
    items: 2,
    total: 1890,
    payment: "bKash",
    fulfillment: "Processing",
    status: "Processing",
  },
  {
    id: "AM-10452",
    customer: "Sadia Rahman",
    phone: "01911 223344",
    date: "Oct 05, 2026",
    items: 4,
    total: 3240,
    payment: "Cash on Delivery",
    fulfillment: "Pending",
    status: "Pending",
  },
  {
    id: "AM-10421",
    customer: "Rakib Ahmed",
    phone: "01677 889900",
    date: "Oct 04, 2026",
    items: 1,
    total: 990,
    payment: "Cash on Delivery",
    fulfillment: "Cancelled",
    status: "Cancelled",
  },
  {
    id: "AM-10398",
    customer: "Ayesha Karim",
    phone: "01521 667788",
    date: "Oct 03, 2026",
    items: 5,
    total: 4250,
    payment: "Card",
    fulfillment: "Delivered",
    status: "Delivered",
  },
  {
    id: "AM-10384",
    customer: "Imran Hossain",
    phone: "01755 112233",
    date: "Oct 02, 2026",
    items: 2,
    total: 2180,
    payment: "Cash on Delivery",
    fulfillment: "Processing",
    status: "Processing",
  },
];

const filters = [
  { label: "All Orders", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "Processing", value: "Processing" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

function formatPrice(price) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function StatusBadge({ status }) {
  const config = {
    Delivered: {
      icon: CheckCircle2,
      className: "bg-ac/10 text-ac-strong",
    },
    Processing: {
      icon: Clock3,
      className: "bg-amber-500/10 text-amber-600",
    },
    Pending: {
      icon: Package,
      className: "bg-blue-500/10 text-blue-600",
    },
    Cancelled: {
      icon: XCircle,
      className: "bg-red-500/10 text-red-600",
    },
  };

  const current = config[status] || config.Pending;
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold ${current.className}`}
    >
      <Icon className="size-3.5" />
      {status}
    </span>
  );
}

function SummaryCard({ label, value, description, icon: Icon, trend }) {
  return (
    <div className="rounded-2xl border border-bd bg-bg p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-mut">{label}</p>

          <p className="mt-2 text-2xl font-bold tracking-tight">
            {value}
          </p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-xl bg-bg2">
          <Icon className="size-5 text-ac" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {trend && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-ac">
            <ArrowUpRight className="size-3.5" />
            {trend}
          </span>
        )}

        <span className="text-xs text-mut">{description}</span>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesFilter =
        filter === "All" || order.status === filter;

      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.phone.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-bg">
      <div className="mx-auto max-w-360 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs text-mut">
                <Link
                  href="/dashboard"
                  className="transition hover:text-fg"
                >
                  Overview
                </Link>

                <ChevronRight className="size-3.5" />

                <span className="text-fg">Orders</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden size-11 items-center justify-center rounded-xl bg-ac/10 sm:flex">
                  <Package className="size-5 text-ac" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Orders
                  </h1>

                  <p className="mt-1 text-sm text-mut">
                    Manage, track, and fulfill your customer orders.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-bd bg-bg px-3.5 text-sm font-medium transition hover:bg-bg2"
              >
                <ArrowDownToLine className="size-4" />
                <span className="hidden sm:inline">Export</span>
              </button>

              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-ac px-4 text-sm font-semibold text-slate-950 transition hover:bg-ac/85"
              >
                <Package className="size-4" />
                New Order
              </button>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total Orders"
            value="184"
            description="this month"
            trend="+18.2%"
            icon={Package}
          />

          <SummaryCard
            label="Pending Fulfillment"
            value="12"
            description="need attention"
            icon={Clock3}
          />

          <SummaryCard
            label="In Delivery"
            value="28"
            description="on the way"
            icon={Truck}
          />

          <SummaryCard
            label="Delivered"
            value="144"
            description="this month"
            trend="+12.4%"
            icon={CheckCircle2}
          />
        </div>

        {/* Main Orders Card */}
        <section className="overflow-hidden rounded-2xl border border-bd bg-bg">

          {/* Toolbar */}
          <div className="border-b border-bd p-4 sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

              <div>
                <h2 className="text-base font-semibold">
                  All orders
                </h2>

                <p className="mt-1 text-xs text-mut">
                  {filteredOrders.length} orders matching your filters
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* Search */}
                <div className="relative sm:w-72">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-mut" />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search orders or customers..."
                    className="h-10 w-full rounded-xl border border-bd bg-bg2 pl-10 pr-4 text-sm outline-none transition placeholder:text-mut/70 focus:border-ac focus:ring-4 focus:ring-ac/10"
                  />
                </div>

                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-bd bg-bg2 px-3.5 text-sm font-medium transition hover:bg-bg"
                >
                  <SlidersHorizontal className="size-4" />
                  Filters
                </button>

              </div>
            </div>

            {/* Filter tabs */}
            <div className="mt-5 flex gap-1 overflow-x-auto pb-1">
              {filters.map((item) => {
                const active = filter === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFilter(item.value)}
                    className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                      active
                        ? "bg-fg text-bg"
                        : "text-mut hover:bg-bg2 hover:text-fg"
                    }`}
                  >
                    {item.label}

                    {item.value !== "All" && (
                      <span
                        className={`ml-1.5 ${
                          active ? "opacity-60" : "opacity-50"
                        }`}
                      >
                        {orders.filter(
                          (order) => order.status === item.value
                        ).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            {filteredOrders.length ? (
              <table className="w-full min-w-225">
                <thead>
                  <tr className="border-b border-bd bg-bg2/50 text-left">
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-mut">
                      Order
                    </th>

                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-mut">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-mut">
                      Date
                    </th>

                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-mut">
                      Amount
                    </th>

                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-mut">
                      Payment
                    </th>

                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-mut">
                      Status
                    </th>

                    <th className="w-12 px-5 py-3" />
                  </tr>
                </thead>

                <tbody className="divide-y divide-bd">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="group transition hover:bg-bg2/60"
                    >
                      <td className="px-5 py-4">
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="group/order inline-flex items-center gap-3"
                        >
                          <div className="flex size-9 items-center justify-center rounded-lg bg-ac/10">
                            <Package className="size-4 text-ac" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold transition group-hover/order:text-ac">
                              #{order.id}
                            </p>

                            <p className="mt-0.5 text-[11px] text-mut">
                              {order.items} items
                            </p>
                          </div>
                        </Link>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium">
                          {order.customer}
                        </p>

                        <p className="mt-0.5 text-xs text-mut">
                          {order.phone}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-mut">
                        {order.date}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold">
                          {formatPrice(order.total)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-xs text-mut">
                          {order.payment}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={order.status} />
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="flex size-8 items-center justify-center rounded-lg text-mut opacity-0 transition hover:bg-bg hover:text-fg group-hover:opacity-100"
                          aria-label={`View order ${order.id}`}
                        >
                          <ChevronRight className="size-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <EmptyState />
            )}
          </div>

          {/* Mobile / tablet cards */}
          <div className="divide-y divide-bd lg:hidden">
            {filteredOrders.length ? (
              filteredOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/dashboard/orders/${order.id}`}
                  className="group block p-4 transition hover:bg-bg2/60 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ac/10">
                        <Package className="size-4 text-ac" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          #{order.id}
                        </p>

                        <p className="mt-1 truncate text-xs text-mut">
                          {order.customer}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="mt-1 size-4 shrink-0 text-mut transition group-hover:translate-x-0.5 group-hover:text-fg" />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-mut">
                        Amount
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {formatPrice(order.total)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-mut">
                        Items
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {order.items}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-mut">
                        Date
                      </p>

                      <p className="mt-1 text-sm text-mut">
                        {order.date}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-mut">
                        Status
                      </p>

                      <div className="mt-1">
                        <StatusBadge status={order.status} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </section>

        {/* Bottom information */}
        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-bd bg-bg2/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-ac/10">
              <Truck className="size-4 text-ac" />
            </div>

            <p className="text-xs text-mut">
              Orders marked as delivered are automatically added to your
              earnings report.
            </p>
          </div>

          <Link
            href="/dashboard/earnings"
            className="inline-flex items-center gap-1 text-xs font-semibold text-fg transition hover:text-ac"
          >
            View earnings
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-20 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-bg2">
        <Search className="size-5 text-mut" />
      </div>

      <h3 className="mt-4 text-sm font-semibold">
        No orders found
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-mut">
        Try changing your search or selecting a different order status.
      </p>
    </div>
  );
}

