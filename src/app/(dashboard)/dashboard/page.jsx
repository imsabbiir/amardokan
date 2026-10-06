"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  ChevronRight,
  Clock3,
  Package,
  Plus,
  ShoppingCart,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";

const orders = [
  {
    id: "#AD-10482",
    customer: "Rahim Hossain",
    product: "Premium Oversized Hoodie",
    amount: 2450,
    date: "Oct 06, 2026",
    status: "Delivered",
  },
  {
    id: "#AD-10481",
    customer: "Nusrat Jahan",
    product: "Classic Denim Jacket",
    amount: 1590,
    date: "Oct 06, 2026",
    status: "Processing",
  },
  {
    id: "#AD-10479",
    customer: "Tanvir Ahmed",
    product: "Essential Sweatshirt",
    amount: 1890,
    date: "Oct 05, 2026",
    status: "Out for delivery",
  },
  {
    id: "#AD-10477",
    customer: "Sadia Akter",
    product: "Winter Knit Cap",
    amount: 990,
    date: "Oct 05, 2026",
    status: "Delivered",
  },
];

const topProducts = [
  {
    name: "Premium Oversized Hoodie",
    category: "Hoodies",
    orders: 84,
    revenue: 108360,
  },
  {
    name: "Classic Denim Jacket",
    category: "Jackets",
    orders: 61,
    revenue: 96990,
  },
  {
    name: "Essential Sweatshirt",
    category: "Sweatshirts",
    orders: 47,
    revenue: 88830,
  },
];

function formatPrice(price) {
  return `৳${price.toLocaleString("en-BD")}`;
}

function StatusBadge({ status }) {
  const styles = {
    Delivered: "bg-ac/10 text-ac",
    Processing: "bg-amber-500/10 text-amber-500",
    "Out for delivery": "bg-blue-500/10 text-blue-500",
    Cancelled: "bg-red-500/10 text-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold ${
        styles[status] || "bg-bg2 text-mut"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          status === "Delivered"
            ? "bg-ac"
            : status === "Processing"
              ? "bg-amber-500"
              : status === "Out for delivery"
                ? "bg-blue-500"
                : "bg-red-500"
        }`}
      />

      {status}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  positive = true,
  description,
}) {
  return (
    <div className="group rounded-2xl border border-bd bg-bg2/40 p-5 transition hover:border-fg/10 hover:bg-bg2/70">
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-xl bg-ac/10 text-ac">
          <Icon className="size-4.5" strokeWidth={1.8} />
        </div>

        <div
          className={`flex items-center gap-1 text-[10px] font-semibold ${
            positive ? "text-ac" : "text-red-500"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="size-3" />
          ) : (
            <ArrowDownRight className="size-3" />
          )}

          {change}
        </div>
      </div>

      <p className="mt-5 text-2xl font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium text-fg">
        {label}
      </p>

      <p className="mt-1 text-[10px] text-mut">
        {description}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-375 px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
        {/* =========================================================
            PAGE HEADER
        ========================================================= */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold text-ac">
              Tuesday, October 6, 2026
            </p>

            <h1 className="text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
              Good morning, Sabbir.
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-mut">
              Here&apos;s what&apos;s happening with your AmarDokan business
              today.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/products"
              className="hidden h-10 items-center gap-2 rounded-xl border border-bd bg-bg2 px-4 text-xs font-semibold transition hover:border-fg/10 hover:bg-bg2/80 sm:flex"
            >
              <Package className="size-4" />
              Browse Products
            </Link>

            <Link
              href="/dashboard/orders/new"
              className="flex h-10 items-center gap-2 rounded-xl bg-ac px-4 text-xs font-bold text-slate-950 transition hover:bg-[#91c63c]"
            >
              <Plus className="size-4" />
              New Order
            </Link>
          </div>
        </div>

        {/* =========================================================
            BUSINESS STATUS
        ========================================================= */}

        <div className="mb-5 flex items-center gap-3 rounded-xl border border-ac/15 bg-ac/5 px-4 py-3">
          <span className="flex size-2 items-center justify-center rounded-full bg-ac">
            <span className="size-2 animate-ping rounded-full bg-ac" />
          </span>

          <p className="text-xs text-mut">
            Your seller account is{" "}
            <span className="font-semibold text-fg">active</span>. Orders are
            being processed normally.
          </p>

          <Link
            href="/dashboard/orders"
            className="ml-auto hidden text-xs font-semibold text-ac sm:block"
          >
            View orders
          </Link>
        </div>

        {/* =========================================================
            STATS
        ========================================================= */}

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-4">
          <StatCard
            icon={ShoppingCart}
            value="128"
            label="Total Orders"
            change="+12.5%"
            description="vs. last month"
          />

          <StatCard
            icon={TrendingUp}
            value="৳84,520"
            label="Total Revenue"
            change="+18.2%"
            description="vs. last month"
          />

          <StatCard
            icon={Truck}
            value="17"
            label="Active Deliveries"
            change="+4"
            description="currently in transit"
          />

          <StatCard
            icon={Users}
            value="96"
            label="Customers"
            change="+8.4%"
            description="active customers"
          />
        </div>

        {/* =========================================================
            MAIN GRID
        ========================================================= */}

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
          {/* Revenue Overview */}
          <section className="overflow-hidden rounded-2xl border border-bd bg-bg2/40">
            <div className="flex items-center justify-between border-b border-bd px-5 py-5 sm:px-6">
              <div>
                <h2 className="text-sm font-semibold">
                  Revenue overview
                </h2>

                <p className="mt-1 text-[11px] text-mut">
                  Your business performance over the last 30 days
                </p>
              </div>

              <select className="rounded-lg border border-bd bg-bg px-3 py-2 text-[10px] font-medium outline-none">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 3 months</option>
              </select>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold tracking-tight">
                    ৳84,520
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-[11px] text-ac">
                    <ArrowUpRight className="size-3" />
                    18.2% from last month
                  </p>
                </div>

                <BarChart3 className="size-5 text-mut" />
              </div>

              {/* Chart placeholder */}
              <div className="relative mt-8 h-55 overflow-hidden rounded-xl border border-bd bg-bg">
                {/* Grid */}
                <div
                  className="absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                    backgroundSize: "42px 42px",
                  }}
                />

                {/* Fake chart */}
                <svg
                  viewBox="0 0 800 220"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  <defs>
                    <linearGradient
                      id="revenueFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#a3db4a"
                        stopOpacity="0.22"
                      />

                      <stop
                        offset="100%"
                        stopColor="#a3db4a"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d="M0 175 C60 165 75 145 125 153 C180 162 205 125 260 135 C310 145 330 105 390 118 C450 132 470 82 520 96 C570 108 600 70 650 82 C705 94 740 48 800 58 L800 220 L0 220 Z"
                    fill="url(#revenueFill)"
                  />

                  <path
                    d="M0 175 C60 165 75 145 125 153 C180 162 205 125 260 135 C310 145 330 105 390 118 C450 132 470 82 520 96 C570 108 600 70 650 82 C705 94 740 48 800 58"
                    fill="none"
                    stroke="#a3db4a"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[9px] text-mut">
                  <span>Sep 7</span>
                  <span>Sep 14</span>
                  <span>Sep 21</span>
                  <span>Sep 28</span>
                  <span>Oct 6</span>
                </div>
              </div>
            </div>
          </section>

          {/* Order Summary */}
          <section className="rounded-2xl border border-bd bg-bg2/40">
            <div className="border-b border-bd px-5 py-5">
              <h2 className="text-sm font-semibold">
                Order summary
              </h2>

              <p className="mt-1 text-[11px] text-mut">
                Current order pipeline
              </p>
            </div>

            <div className="space-y-2 p-4">
              <div className="flex items-center gap-3 rounded-xl bg-bg p-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <Clock3 className="size-4" />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-semibold">
                    Processing
                  </p>

                  <p className="mt-0.5 text-[10px] text-mut">
                    Waiting for fulfillment
                  </p>
                </div>

                <p className="text-lg font-bold">12</p>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-bg p-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <Truck className="size-4" />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-semibold">
                    In delivery
                  </p>

                  <p className="mt-0.5 text-[10px] text-mut">
                    Currently on the way
                  </p>
                </div>

                <p className="text-lg font-bold">17</p>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-bg p-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-ac/10 text-ac">
                  <Package className="size-4" />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-semibold">
                    Delivered
                  </p>

                  <p className="mt-0.5 text-[10px] text-mut">
                    Successfully completed
                  </p>
                </div>

                <p className="text-lg font-bold">96</p>
              </div>
            </div>

            <div className="px-4 pb-4">
              <Link
                href="/dashboard/orders"
                className="flex h-10 items-center justify-center gap-2 rounded-xl border border-bd text-xs font-semibold transition hover:bg-bg2"
              >
                View all orders
                <ChevronRight className="size-3.5" />
              </Link>
            </div>
          </section>
        </div>

        {/* =========================================================
            RECENT ORDERS
        ========================================================= */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-bd bg-bg2/40">
          <div className="flex items-center justify-between border-b border-bd px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-sm font-semibold">
                Recent orders
              </h2>

              <p className="mt-1 text-[11px] text-mut">
                Latest activity from your customers
              </p>
            </div>

            <Link
              href="/dashboard/orders"
              className="flex items-center gap-1 text-xs font-semibold text-ac"
            >
              View all
              <ChevronRight className="size-3.5" />
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-bd text-left text-[9px] uppercase tracking-[0.12em] text-mut">
                  <th className="px-6 py-4 font-semibold">
                    Order
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Customer
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Product
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Amount
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Date
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4" />
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-bd last:border-0"
                  >
                    <td className="px-6 py-4 text-xs font-semibold">
                      {order.id}
                    </td>

                    <td className="px-6 py-4 text-xs">
                      {order.customer}
                    </td>

                    <td className="max-w-55 truncate px-6 py-4 text-xs text-mut">
                      {order.product}
                    </td>

                    <td className="px-6 py-4 text-xs font-semibold">
                      {formatPrice(order.amount)}
                    </td>

                    <td className="px-6 py-4 text-xs text-mut">
                      {order.date}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/orders/${order.id.replace("#", "")}`}
                        className="text-xs font-semibold text-mut transition hover:text-fg"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="divide-y divide-bd md:hidden">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id.replace("#", "")}`}
                className="block p-5 transition hover:bg-bg2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold">
                      {order.id}
                    </p>

                    <p className="mt-1 truncate text-xs text-mut">
                      {order.customer}
                    </p>
                  </div>

                  <StatusBadge status={order.status} />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="max-w-47.5 truncate text-xs text-mut">
                    {order.product}
                  </p>

                  <p className="text-xs font-bold">
                    {formatPrice(order.amount)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =========================================================
            TOP PRODUCTS
        ========================================================= */}

        <section className="mt-6 rounded-2xl border border-bd bg-bg2/40">
          <div className="flex items-center justify-between border-b border-bd px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-sm font-semibold">
                Top performing products
              </h2>

              <p className="mt-1 text-[11px] text-mut">
                Products generating the most sales
              </p>
            </div>

            <Link
              href="/dashboard/products"
              className="flex items-center gap-1 text-xs font-semibold text-ac"
            >
              Manage products
              <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid gap-3 p-4 md:grid-cols-3">
            {topProducts.map((product, index) => (
              <Link
                key={product.name}
                href="/dashboard/products"
                className="group rounded-xl border border-bd bg-bg p-4 transition hover:border-ac/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-ac/10 text-xs font-bold text-ac">
                    0{index + 1}
                  </div>

                  <ChevronRight className="size-4 text-mut transition group-hover:translate-x-0.5 group-hover:text-fg" />
                </div>

                <p className="mt-5 text-xs font-semibold">
                  {product.name}
                </p>

                <p className="mt-1 text-[10px] text-mut">
                  {product.category}
                </p>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-mut">
                      Orders
                    </p>

                    <p className="mt-0.5 text-sm font-bold">
                      {product.orders}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] text-mut">
                      Revenue
                    </p>

                    <p className="mt-0.5 text-sm font-bold">
                      {formatPrice(product.revenue)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =========================================================
            QUICK ACTIONS
        ========================================================= */}

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link
            href="/dashboard/products"
            className="group flex items-center gap-4 rounded-2xl border border-bd bg-bg2/40 p-5 transition hover:border-ac/30 hover:bg-bg2"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ac/10 text-ac">
              <Package className="size-4.5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold">
                Browse Products
              </p>

              <p className="mt-1 text-[10px] text-mut">
                Find products to sell
              </p>
            </div>

            <ChevronRight className="size-4 text-mut transition group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/dashboard/analytics"
            className="group flex items-center gap-4 rounded-2xl border border-bd bg-bg2/40 p-5 transition hover:border-ac/30 hover:bg-bg2"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ac/10 text-ac">
              <BarChart3 className="size-4.5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold">
                View Analytics
              </p>

              <p className="mt-1 text-[10px] text-mut">
                Understand your performance
              </p>
            </div>

            <ChevronRight className="size-4 text-mut transition group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/dashboard/earnings"
            className="group flex items-center gap-4 rounded-2xl border border-bd bg-bg2/40 p-5 transition hover:border-ac/30 hover:bg-bg2"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ac/10 text-ac">
              <TrendingUp className="size-4.5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold">
                View Earnings
              </p>

              <p className="mt-1 text-[10px] text-mut">
                Track your business income
              </p>
            </div>

            <ChevronRight className="size-4 text-mut transition group-hover:translate-x-0.5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
