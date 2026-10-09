"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  Clock3,
  CreditCard,
  Package,
  RotateCcw,
  ShoppingCart,
  Store,
  Truck,
  UserPlus,
  Users,
  WalletCards,
  AlertTriangle,
} from "lucide-react";

const orders = [
  {
    id: "AM-10842",
    seller: "TrendHive BD",
    customer: "Nusrat Jahan",
    amount: 2450,
    status: "Processing",
    time: "4 min ago",
  },
  {
    id: "AM-10841",
    seller: "Urban Cart",
    customer: "Tanvir Hasan",
    amount: 1890,
    status: "Delivered",
    time: "11 min ago",
  },
  {
    id: "AM-10840",
    seller: "StyleMart",
    customer: "Sadia Rahman",
    amount: 3290,
    status: "In Transit",
    time: "18 min ago",
  },
  {
    id: "AM-10839",
    seller: "Gadget Point",
    customer: "Rakib Ahmed",
    amount: 1290,
    status: "Pending",
    time: "24 min ago",
  },
  {
    id: "AM-10838",
    seller: "Daily Needs",
    customer: "Ayesha Karim",
    amount: 980,
    status: "Delivered",
    time: "31 min ago",
  },
];

const sellers = [
  {
    name: "TrendHive BD",
    owner: "Rahim Hasan",
    orders: 184,
    revenue: 428500,
    status: "Active",
  },
  {
    name: "Urban Cart",
    owner: "Sabbir Ahmed",
    orders: 156,
    revenue: 364200,
    status: "Active",
  },
  {
    name: "StyleMart",
    owner: "Nadia Akter",
    orders: 121,
    revenue: 298700,
    status: "Active",
  },
  {
    name: "Gadget Point",
    owner: "Imran Hossain",
    orders: 94,
    revenue: 221900,
    status: "Active",
  },
];

const activities = [
  {
    icon: UserPlus,
    title: "New seller registered",
    description: "Fashion House BD joined the platform.",
    time: "8 min ago",
  },
  {
    icon: CheckCircle2,
    title: "Payout completed",
    description: "৳42,850 payout sent to TrendHive BD.",
    time: "21 min ago",
  },
  {
    icon: RotateCcw,
    title: "Return requested",
    description: "Order AM-10821 has a new return request.",
    time: "34 min ago",
  },
  {
    icon: Truck,
    title: "Delivery completed",
    description: "AM-10817 successfully delivered.",
    time: "46 min ago",
  },
];

function formatPrice(value) {
  return `৳${Number(value).toLocaleString("en-BD")}`;
}

function StatusBadge({ status }) {
  const styles = {
    Processing:
      "bg-amber-50 text-amber-700 border-amber-200",
    Delivered:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    "In Transit":
      "bg-blue-50 text-blue-700 border-blue-200",
    Pending:
      "bg-slate-100 text-slate-600 border-slate-200",
    Active:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function MetricCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  description,
}) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f1f1] text-[#50575e]">
          <Icon size={19} strokeWidth={1.8} />
        </div>

        <div
          className={`flex items-center gap-1 text-xs font-semibold ${
            positive ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}

          {change}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-[#646970]">
          {title}
        </p>

        <p className="mt-1 text-[26px] font-bold tracking-tight text-[#1d2327]">
          {value}
        </p>

        <p className="mt-1 text-[11px] text-[#8c8f94]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#78a92b]">
              AmarDokan Admin
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-[#1d2327] sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1.5 text-sm text-[#646970]">
              Here&apos;s what&apos;s happening across your platform today.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/analytics"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#c3c4c7] bg-white px-4 text-sm font-semibold text-[#1d2327] transition hover:border-[#8c8f94] hover:bg-[#f6f7f7]"
            >
              <BarChart3 size={16} />
              Analytics
            </Link>

            <Link
              href="/admin/orders"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#1d2327] px-4 text-sm font-semibold text-white transition hover:bg-[#2c3338]"
            >
              <ShoppingCart size={16} />
              View Orders
            </Link>
          </div>
        </div>

        {/* Main metrics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Platform GMV"
            value="৳48.6L"
            change="+12.8%"
            positive
            icon={CreditCard}
            description="vs. ৳43.1L last month"
          />

          <MetricCard
            title="Total Orders"
            value="12,842"
            change="+8.4%"
            positive
            icon={ShoppingCart}
            description="1,284 orders this month"
          />

          <MetricCard
            title="Active Sellers"
            value="1,284"
            change="+6.2%"
            positive
            icon={Store}
            description="74 new sellers this month"
          />

          <MetricCard
            title="Delivery Success"
            value="94.8%"
            change="+2.1%"
            positive
            icon={Truck}
            description="Last 30 days"
          />
        </div>

        {/* Secondary metrics */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Fulfillment Rate"
            value="97.2%"
            change="+1.4%"
            positive
            icon={Package}
            description="Orders fulfilled successfully"
          />

          <MetricCard
            title="Return Rate"
            value="5.8%"
            change="-0.7%"
            positive
            icon={RotateCcw}
            description="Lower than previous period"
          />

          <MetricCard
            title="Pending Payouts"
            value="৳8.42L"
            change="+4.2%"
            positive={false}
            icon={WalletCards}
            description="128 payouts awaiting action"
          />

          <MetricCard
            title="Low Stock Items"
            value="37"
            change="+9"
            positive={false}
            icon={Boxes}
            description="Require inventory attention"
          />
        </div>

        {/* Revenue + order overview */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.8fr)]">
          {/* Revenue chart */}
          <div className="rounded-xl border border-[#dcdcde] bg-white">
            <div className="flex items-center justify-between border-b border-[#eee] px-5 py-4">
              <div>
                <h2 className="text-sm font-bold text-[#1d2327]">
                  Revenue Overview
                </h2>

                <p className="mt-0.5 text-xs text-[#8c8f94]">
                  Platform GMV over the last 30 days
                </p>
              </div>

              <select className="h-8 rounded-md border border-[#dcdcde] bg-white px-2 text-xs font-medium text-[#50575e] outline-none">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
              </select>
            </div>

            <div className="p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-[#8c8f94]">
                    Total GMV
                  </p>

                  <p className="mt-1 text-2xl font-bold tracking-tight">
                    ৳48,62,400
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-[#8c8f94]">
                    This month
                  </p>

                  <p className="mt-1 text-xs font-semibold text-emerald-600">
                    +12.8%
                  </p>
                </div>
              </div>

              {/* Fake chart */}
              <div className="relative mt-8 h-65">
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[100, 75, 50, 25, 0].map((value) => (
                    <div
                      key={value}
                      className="flex items-center gap-3"
                    >
                      <span className="w-8 text-right text-[10px] text-[#a0a3a7]">
                        {value}k
                      </span>

                      <div className="h-px flex-1 bg-[#eee]" />
                    </div>
                  ))}
                </div>

                <svg
                  viewBox="0 0 800 240"
                  preserveAspectRatio="none"
                  className="absolute inset-x-11 bottom-6 top-0 h-55 w-[calc(100%-44px)] overflow-visible"
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
                        stopOpacity="0.28"
                      />

                      <stop
                        offset="100%"
                        stopColor="#a3db4a"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d="M0 188 C55 175, 72 181, 110 164 C150 145, 178 158, 215 137 C255 114, 284 139, 320 119 C365 95, 386 107, 425 91 C465 74, 485 88, 525 64 C562 42, 592 70, 630 52 C672 31, 700 42, 735 22 C760 10, 780 18, 800 7 L800 240 L0 240 Z"
                    fill="url(#revenueFill)"
                  />

                  <path
                    d="M0 188 C55 175, 72 181, 110 164 C150 145, 178 158, 215 137 C255 114, 284 139, 320 119 C365 95, 386 107, 425 91 C465 74, 485 88, 525 64 C562 42, 592 70, 630 52 C672 31, 700 42, 735 22 C760 10, 780 18, 800 7"
                    fill="none"
                    stroke="#7fb922"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute bottom-0 left-11 right-0 flex justify-between text-[10px] text-[#a0a3a7]">
                  <span>Sep 09</span>
                  <span>Sep 16</span>
                  <span>Sep 23</span>
                  <span>Sep 30</span>
                  <span>Oct 08</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order status */}
          <div className="rounded-xl border border-[#dcdcde] bg-white">
            <div className="border-b border-[#eee] px-5 py-4">
              <h2 className="text-sm font-bold text-[#1d2327]">
                Order Overview
              </h2>

              <p className="mt-0.5 text-xs text-[#8c8f94]">
                Current order distribution
              </p>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-22 border-[#a3db4a]">
                  <div className="absolute -inset-5.5 rounded-full border-22 border-transparent border-r-blue-400 border-b-blue-400" />

                  <div className="text-center">
                    <p className="text-2xl font-bold">
                      12.8K
                    </p>

                    <p className="text-[10px] text-[#8c8f94]">
                      Total Orders
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  ["Delivered", "8,942", "69.6%", "bg-[#a3db4a]"],
                  ["In Transit", "1,842", "14.3%", "bg-blue-400"],
                  ["Processing", "1,204", "9.4%", "bg-amber-400"],
                  ["Other", "854", "6.7%", "bg-slate-300"],
                ].map(([name, count, percent, color]) => (
                  <div
                    key={name}
                    className="flex items-center gap-3"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${color}`}
                    />

                    <span className="flex-1 text-xs text-[#646970]">
                      {name}
                    </span>

                    <span className="text-xs font-semibold text-[#1d2327]">
                      {count}
                    </span>

                    <span className="w-12 text-right text-[10px] text-[#8c8f94]">
                      {percent}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Operational alerts */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link
            href="/admin/sellers/pending"
            className="group rounded-xl border border-amber-200 bg-amber-50 p-4 transition hover:border-amber-300"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-amber-600">
                <Clock3 size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-amber-900">
                  8 seller approvals
                </p>

                <p className="mt-0.5 text-xs text-amber-700">
                  New sellers are waiting for verification.
                </p>
              </div>

              <ArrowRight
                size={16}
                className="text-amber-600 transition group-hover:translate-x-1"
              />
            </div>
          </Link>

          <Link
            href="/admin/inventory"
            className="group rounded-xl border border-red-200 bg-red-50 p-4 transition hover:border-red-300"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-red-500">
                <AlertTriangle size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-red-900">
                  37 low-stock products
                </p>

                <p className="mt-0.5 text-xs text-red-700">
                  Inventory levels require attention.
                </p>
              </div>

              <ArrowRight
                size={16}
                className="text-red-500 transition group-hover:translate-x-1"
              />
            </div>
          </Link>

          <Link
            href="/admin/payouts"
            className="group rounded-xl border border-blue-200 bg-blue-50 p-4 transition hover:border-blue-300"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-500">
                <WalletCards size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-blue-900">
                  ৳8.42L pending payouts
                </p>

                <p className="mt-0.5 text-xs text-blue-700">
                  128 seller payouts are waiting.
                </p>
              </div>

              <ArrowRight
                size={16}
                className="text-blue-500 transition group-hover:translate-x-1"
              />
            </div>
          </Link>
        </div>

        {/* Tables */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(380px,1fr)]">
          {/* Recent orders */}
          <div className="rounded-xl border border-[#dcdcde] bg-white">
            <div className="flex items-center justify-between border-b border-[#eee] px-5 py-4">
              <div>
                <h2 className="text-sm font-bold">
                  Recent Orders
                </h2>

                <p className="mt-0.5 text-xs text-[#8c8f94]">
                  Latest activity across sellers
                </p>
              </div>

              <Link
                href="/admin/orders"
                className="text-xs font-semibold text-[#5f8c20] hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-162.5 text-left">
                <thead>
                  <tr className="border-b border-[#eee] bg-[#fafafa]">
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8c8f94]">
                      Order
                    </th>

                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8c8f94]">
                      Seller
                    </th>

                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8c8f94]">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8c8f94]">
                      Amount
                    </th>

                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8c8f94]">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-[#f0f0f1] last:border-0 hover:bg-[#fafafa]"
                    >
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-xs font-bold text-[#1d2327] hover:text-[#5f8c20]"
                        >
                          {order.id}
                        </Link>

                        <p className="mt-0.5 text-[10px] text-[#8c8f94]">
                          {order.time}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-xs text-[#50575e]">
                        {order.seller}
                      </td>

                      <td className="px-5 py-4 text-xs text-[#50575e]">
                        {order.customer}
                      </td>

                      <td className="px-5 py-4 text-xs font-semibold">
                        {formatPrice(order.amount)}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top sellers */}
          <div className="rounded-xl border border-[#dcdcde] bg-white">
            <div className="flex items-center justify-between border-b border-[#eee] px-5 py-4">
              <div>
                <h2 className="text-sm font-bold">
                  Top Sellers
                </h2>

                <p className="mt-0.5 text-xs text-[#8c8f94]">
                  Highest GMV this month
                </p>
              </div>

              <Link
                href="/admin/sellers"
                className="text-xs font-semibold text-[#5f8c20] hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="divide-y divide-[#f0f0f1]">
              {sellers.map((seller, index) => (
                <Link
                  href="/admin/sellers"
                  key={seller.name}
                  className="flex items-center gap-3 px-5 py-4 transition hover:bg-[#fafafa]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0f1f1] text-xs font-bold text-[#50575e]">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-[#1d2327]">
                      {seller.name}
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#8c8f94]">
                      {seller.orders} orders
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold">
                      {formatPrice(seller.revenue)}
                    </p>

                    <p className="mt-0.5 text-[10px] text-emerald-600">
                      Active
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          {/* Courier performance */}
          <div className="rounded-xl border border-[#dcdcde] bg-white">
            <div className="border-b border-[#eee] px-5 py-4">
              <h2 className="text-sm font-bold">
                Courier Performance
              </h2>

              <p className="mt-0.5 text-xs text-[#8c8f94]">
                Delivery success rate by courier
              </p>
            </div>

            <div className="space-y-5 p-5">
              {[
                ["Pathao Courier", 96.8, 4280],
                ["Steadfast", 95.4, 3640],
                ["RedX", 93.2, 2910],
                ["Paperfly", 91.7, 2012],
              ].map(([name, rate, orders]) => (
                <div key={name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold">
                        {name}
                      </p>

                      <p className="mt-0.5 text-[10px] text-[#8c8f94]">
                        {orders.toLocaleString()} deliveries
                      </p>
                    </div>

                    <p className="text-xs font-bold">
                      {rate}%
                    </p>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#f0f0f1]">
                    <div
                      className="h-full rounded-full bg-[#a3db4a]"
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-xl border border-[#dcdcde] bg-white">
            <div className="border-b border-[#eee] px-5 py-4">
              <h2 className="text-sm font-bold">
                Recent Activity
              </h2>

              <p className="mt-0.5 text-xs text-[#8c8f94]">
                Latest platform events
              </p>
            </div>

            <div className="divide-y divide-[#f0f0f1]">
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={activity.title}
                    className="flex gap-3 px-5 py-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f0f1f1] text-[#50575e]">
                      <Icon size={15} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#1d2327]">
                        {activity.title}
                      </p>

                      <p className="mt-0.5 text-[11px] leading-5 text-[#646970]">
                        {activity.description}
                      </p>

                      <p className="mt-1 text-[10px] text-[#a0a3a7]">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}