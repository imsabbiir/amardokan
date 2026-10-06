"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  ExternalLink,
  Package,
  Phone,
  RefreshCw,
  Search,
  Truck,
  XCircle,
} from "lucide-react";

const returns = [
  {
    id: "RET-10482",
    orderId: "AM-10482",
    customer: "Nusrat Jahan",
    phone: "01712 345678",
    product: "Premium Oversized Hoodie",
    variant: "Black · XL",
    quantity: 1,
    reason: "Wrong size",
    courier: "Pathao Courier",
    tracking: "PT-88219402",
    status: "Requested",
    refund: "Pending",
    amount: 1890,
    date: "Oct 06, 2026",
    updated: "18 min ago",
  },
  {
    id: "RET-10471",
    orderId: "AM-10471",
    customer: "Tanvir Hasan",
    phone: "01819 223344",
    product: "Essential Sweatshirt",
    variant: "Grey · L",
    quantity: 1,
    reason: "Product damaged",
    courier: "Steadfast",
    tracking: "ST-72190482",
    status: "In Transit",
    refund: "Pending",
    amount: 1490,
    date: "Oct 06, 2026",
    updated: "42 min ago",
  },
  {
    id: "RET-10452",
    orderId: "AM-10452",
    customer: "Sadia Rahman",
    phone: "01911 445566",
    product: "Classic Canvas Backpack",
    variant: "Black",
    quantity: 1,
    reason: "Changed mind",
    courier: "Pathao Courier",
    tracking: "PT-88219341",
    status: "Received",
    refund: "Approved",
    amount: 1290,
    date: "Oct 05, 2026",
    updated: "1 hr ago",
  },
  {
    id: "RET-10421",
    orderId: "AM-10421",
    customer: "Rakib Ahmed",
    phone: "01612 778899",
    product: "Everyday Running Shoes",
    variant: "White · 42",
    quantity: 1,
    reason: "Wrong product",
    courier: "RedX",
    tracking: "RX-55192038",
    status: "Inspection",
    refund: "Pending",
    amount: 1990,
    date: "Oct 05, 2026",
    updated: "2 hrs ago",
  },
  {
    id: "RET-10398",
    orderId: "AM-10398",
    customer: "Ayesha Karim",
    phone: "01722 889900",
    product: "Premium Cotton T-Shirt",
    variant: "White · L",
    quantity: 2,
    reason: "Quality issue",
    courier: "Steadfast",
    tracking: "ST-72188120",
    status: "Approved",
    refund: "Processed",
    amount: 1780,
    date: "Oct 04, 2026",
    updated: "3 hrs ago",
  },
  {
    id: "RET-10384",
    orderId: "AM-10384",
    customer: "Imran Hossain",
    phone: "01844 112233",
    product: "Minimal Leather Wallet",
    variant: "Black",
    quantity: 1,
    reason: "Changed mind",
    courier: "Pathao Courier",
    tracking: "PT-88218420",
    status: "Received",
    refund: "Processed",
    amount: 790,
    date: "Oct 04, 2026",
    updated: "4 hrs ago",
  },
  {
    id: "RET-10371",
    orderId: "AM-10371",
    customer: "Farzana Akter",
    phone: "01922 334455",
    product: "Stainless Steel Water Bottle",
    variant: "750ml · Black",
    quantity: 1,
    reason: "Product damaged",
    courier: "RedX",
    tracking: "RX-55190442",
    status: "Rejected",
    refund: "Rejected",
    amount: 690,
    date: "Oct 03, 2026",
    updated: "Yesterday",
  },
  {
    id: "RET-10352",
    orderId: "AM-10352",
    customer: "Mahmudul Hasan",
    phone: "01511 667788",
    product: "Smart LED Desk Lamp",
    variant: "White",
    quantity: 1,
    reason: "Not as described",
    courier: "Steadfast",
    tracking: "ST-72186430",
    status: "Requested",
    refund: "Pending",
    amount: 1090,
    date: "Oct 02, 2026",
    updated: "Yesterday",
  },
];

const reasonStats = [
  {
    label: "Wrong size",
    count: 42,
    percent: 31,
  },
  {
    label: "Changed mind",
    count: 28,
    percent: 21,
  },
  {
    label: "Product damaged",
    count: 24,
    percent: 18,
  },
  {
    label: "Quality issue",
    count: 19,
    percent: 14,
  },
  {
    label: "Wrong product",
    count: 11,
    percent: 8,
  },
];

function formatPrice(price) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function StatusBadge({ status }) {
  const styles = {
    Requested: "bg-amber-500/10 text-amber-600",
    "In Transit": "bg-blue-500/10 text-blue-600",
    Received: "bg-violet-500/10 text-violet-600",
    Inspection: "bg-orange-500/10 text-orange-600",
    Approved: "bg-emerald-500/10 text-emerald-600",
    Rejected: "bg-red-500/10 text-red-600",
    Processed: "bg-emerald-500/10 text-emerald-600",
    Pending: "bg-amber-500/10 text-amber-600",
  };

  const icons = {
    Requested: Clock3,
    "In Transit": Truck,
    Received: Package,
    Inspection: AlertCircle,
    Approved: CheckCircle2,
    Rejected: XCircle,
    Processed: CheckCircle2,
    Pending: Clock3,
  };

  const Icon = icons[status] || Clock3;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-bg2 text-mut"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  );
}

function MetricCard({ title, value, subtitle, icon: Icon, tone = "default" }) {
  const tones = {
    default: "bg-bg2 text-fg",
    green: "bg-[#a3db4a]/15 text-[#6d9f18]",
    amber: "bg-amber-500/10 text-amber-600",
    red: "bg-red-500/10 text-red-600",
    blue: "bg-blue-500/10 text-blue-600",
  };

  return (
    <div className="rounded-2xl border border-bd bg-bg p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-mut">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-mut">{subtitle}</p>
        </div>

        <div className={`rounded-xl p-2.5 ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default function ReturnsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reasonFilter, setReasonFilter] = useState("All");
  const [selectedReturn, setSelectedReturn] = useState(null);

  const filteredReturns = useMemo(() => {
    const query = search.trim().toLowerCase();

    return returns.filter((item) => {
      const matchesSearch =
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.orderId.toLowerCase().includes(query) ||
        item.customer.toLowerCase().includes(query) ||
        item.phone.includes(query) ||
        item.product.toLowerCase().includes(query) ||
        item.tracking.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesReason =
        reasonFilter === "All" || item.reason === reasonFilter;

      return matchesSearch && matchesStatus && matchesReason;
    });
  }, [search, statusFilter, reasonFilter]);

  const requestedCount = returns.filter(
    (item) => item.status === "Requested"
  ).length;

  const transitCount = returns.filter(
    (item) => item.status === "In Transit"
  ).length;

  const receivedCount = returns.filter(
    (item) =>
      item.status === "Received" || item.status === "Inspection"
  ).length;

  const processedCount = returns.filter(
    (item) => item.refund === "Processed"
  ).length;

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1600px] px-5 py-6 md:px-8 lg:px-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-mut">
          <Link
            href="/dashboard"
            className="transition-colors hover:text-fg"
          >
            Overview
          </Link>

          <span>/</span>

          <span className="text-fg">Returns</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-bd bg-bg2 px-3 py-1.5 text-xs font-semibold text-mut">
              <ArrowDownLeft className="h-3.5 w-3.5" />
              Returns management
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Returns
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-mut md:text-base">
              Manage customer return requests, inspect returned products,
              and keep refunds and inventory adjustments organized.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-bd bg-bg px-4 py-2.5 text-sm font-semibold transition hover:bg-bg2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-bd bg-bg px-4 py-2.5 text-sm font-semibold transition hover:bg-bg2"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard
            title="Total returns"
            value="128"
            subtitle="This month"
            icon={ArrowDownLeft}
          />

          <MetricCard
            title="Needs review"
            value={requestedCount}
            subtitle="Return requests"
            icon={AlertCircle}
            tone="amber"
          />

          <MetricCard
            title="In transit"
            value={transitCount}
            subtitle="Coming back"
            icon={Truck}
            tone="blue"
          />

          <MetricCard
            title="Received"
            value={receivedCount}
            subtitle="Awaiting inspection"
            icon={Package}
            tone="green"
          />

          <MetricCard
            title="Refunded"
            value={processedCount}
            subtitle="Successfully processed"
            icon={CheckCircle2}
            tone="green"
          />
        </div>

        {/* Return health */}
        <section className="mt-6 rounded-2xl border border-bd bg-bg p-5 md:p-6">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg font-bold">Return health</h2>
              <p className="mt-1 text-sm text-mut">
                Understand why customers are returning products and where
                action is needed.
              </p>
            </div>

            <span className="text-sm font-semibold text-[#6d9f18]">
              5.8% return rate
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-xl border border-bd bg-bg2 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Return rate</p>
                  <p className="mt-1 text-xs text-mut">
                    Compared with your delivered orders
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                  <ArrowDownLeft className="h-4 w-4" />
                  0.7%
                </div>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-bg">
                <div
                  className="h-full rounded-full bg-[#a3db4a]"
                  style={{ width: "38%" }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-mut">
                <span>Current: 5.8%</span>
                <span>Target: below 7%</span>
              </div>
            </div>

            <div className="rounded-xl border border-bd bg-bg2 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Top return reasons</p>
                  <p className="mt-1 text-xs text-mut">
                    Last 30 days
                  </p>
                </div>

                <button
                  type="button"
                  className="text-xs font-semibold text-ac hover:underline"
                >
                  View report
                </button>
              </div>

              <div className="space-y-3">
                {reasonStats.slice(0, 4).map((reason) => (
                  <div key={reason.label}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-medium">{reason.label}</span>
                      <span className="text-mut">
                        {reason.count} · {reason.percent}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-bg">
                      <div
                        className="h-full rounded-full bg-ac"
                        style={{ width: `${reason.percent * 2.5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Action required */}
        <section className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <AlertCircle className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold">7 returns need your attention</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-mut">
                  Review new return requests and inspect received products
                  before approving refunds.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStatusFilter("Requested")}
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-fg px-4 py-2.5 text-sm font-semibold text-bg transition hover:opacity-90"
            >
              Review requests
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Main returns */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-bd bg-bg">
          <div className="border-b border-bd p-5 md:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-bold">All returns</h2>
                <p className="mt-1 text-sm text-mut">
                  Track return requests from initial request to refund.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative min-w-0 sm:w-72">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search return, order, customer..."
                    className="h-11 w-full rounded-xl border border-bd bg-bg2 pl-10 pr-4 text-sm outline-none transition focus:border-ac"
                  />
                </div>

                <FilterSelect
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    "All",
                    "Requested",
                    "In Transit",
                    "Received",
                    "Inspection",
                    "Approved",
                    "Rejected",
                  ]}
                />

                <FilterSelect
                  value={reasonFilter}
                  onChange={setReasonFilter}
                  options={[
                    "All",
                    "Wrong size",
                    "Changed mind",
                    "Product damaged",
                    "Quality issue",
                    "Wrong product",
                    "Not as described",
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b border-bd bg-bg2/60 text-left text-xs font-semibold uppercase tracking-wide text-mut">
                  <th className="px-6 py-4">Return</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4">Courier</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Refund</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-bd">
                {filteredReturns.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-bg2/50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">{item.id}</p>

                        <Link
                          href={`/dashboard/orders/${item.orderId}`}
                          className="mt-1 inline-flex items-center gap-1 text-xs text-mut hover:text-fg"
                        >
                          {item.orderId}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold">
                        {item.customer}
                      </p>
                      <p className="mt-1 text-xs text-mut">
                        {item.phone}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="max-w-[220px] text-sm font-semibold">
                        {item.product}
                      </p>
                      <p className="mt-1 text-xs text-mut">
                        {item.variant} · Qty {item.quantity}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-bg2 px-2.5 py-1.5 text-xs font-medium">
                        {item.reason}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">
                        {item.courier}
                      </p>
                      <p className="mt-1 text-xs text-mut">
                        {item.tracking}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={item.refund} />
                    </td>

                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-bold">
                        {formatPrice(item.amount)}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedReturn(item)}
                        className="rounded-lg border border-bd p-2 transition hover:bg-bg2"
                        aria-label={`View ${item.id}`}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-bd lg:hidden">
            {filteredReturns.map((item) => (
              <div key={item.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold">{item.id}</p>

                    <Link
                      href={`/dashboard/orders/${item.orderId}`}
                      className="mt-1 inline-flex items-center gap-1 text-xs text-mut"
                    >
                      {item.orderId}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>

                  <StatusBadge status={item.status} />
                </div>

                <div className="mt-5 rounded-xl border border-bd bg-bg2 p-4">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bg text-mut">
                      <Package className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {item.product}
                      </p>
                      <p className="mt-1 text-xs text-mut">
                        {item.variant} · Qty {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-mut">Customer</p>
                      <p className="mt-1 text-sm font-semibold">
                        {item.customer}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-mut">Amount</p>
                      <p className="mt-1 text-sm font-bold">
                        {formatPrice(item.amount)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-mut">Reason</p>
                      <p className="mt-1 text-sm font-medium">
                        {item.reason}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-mut">Refund</p>
                      <div className="mt-1">
                        <StatusBadge status={item.refund} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-mut">{item.courier}</p>
                    <p className="mt-1 text-xs font-medium">
                      {item.tracking}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedReturn(item)}
                    className="inline-flex items-center gap-2 rounded-xl border border-bd px-3 py-2 text-xs font-semibold transition hover:bg-bg2"
                  >
                    View details
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredReturns.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-bg2 text-mut">
                <Search className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-bold">No returns found</h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-mut">
                Try changing your search or filters to find the return
                you're looking for.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                  setReasonFilter("All");
                }}
                className="mt-5 rounded-xl bg-fg px-4 py-2.5 text-sm font-semibold text-bg"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Return workflow */}
        <section className="mt-6 rounded-2xl border border-bd bg-bg p-5 md:p-6">
          <div className="mb-7">
            <h2 className="text-lg font-bold">Return workflow</h2>
            <p className="mt-1 text-sm text-mut">
              Keep every return moving through the right operational step.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Request",
                description:
                  "Customer submits a return request and reason.",
                icon: AlertCircle,
              },
              {
                number: "02",
                title: "Pickup",
                description:
                  "Courier collects the product from the customer.",
                icon: Truck,
              },
              {
                number: "03",
                title: "Inspection",
                description:
                  "Returned item is received and checked.",
                icon: Package,
              },
              {
                number: "04",
                title: "Resolution",
                description:
                  "Approve, reject, refund, or adjust inventory.",
                icon: CheckCircle2,
              },
            ].map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-xl border border-bd bg-bg2 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-mut">
                      {step.number}
                    </span>

                    <div className="rounded-lg bg-bg p-2 text-ac">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="mt-5 font-bold">{step.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-mut">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-6 rounded-2xl bg-fg p-6 text-bg md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-bg/60">
                Need more context?
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                Review the original order before approving a return.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-bg/60">
                Check customer history, order items, delivery status, and
                payment information before making a return decision.
              </p>
            </div>

            <Link
              href="/dashboard/orders"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#a3db4a] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
            >
              View orders
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>

      {/* Detail Modal */}
      {selectedReturn && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedReturn(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-bd bg-bg shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-bd p-5 md:p-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">
                    {selectedReturn.id}
                  </h2>

                  <StatusBadge status={selectedReturn.status} />
                </div>

                <p className="mt-1 text-sm text-mut">
                  Related order {selectedReturn.orderId}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReturn(null)}
                className="rounded-lg p-2 text-mut transition hover:bg-bg2 hover:text-fg"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-5 md:p-6">
              {/* Customer */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-mut">
                  Customer
                </p>

                <div className="rounded-xl border border-bd bg-bg2 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold">
                        {selectedReturn.customer}
                      </p>

                      <div className="mt-2 flex items-center gap-2 text-sm text-mut">
                        <Phone className="h-4 w-4" />
                        {selectedReturn.phone}
                      </div>
                    </div>

                    <Link
                      href={`/dashboard/orders/${selectedReturn.orderId}`}
                      className="rounded-lg border border-bd bg-bg p-2.5 transition hover:bg-bg2"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Product */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-mut">
                  Returned product
                </p>

                <div className="rounded-xl border border-bd bg-bg2 p-4">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-bg text-mut">
                      <Package className="h-6 w-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-bold">
                        {selectedReturn.product}
                      </p>

                      <p className="mt-1 text-sm text-mut">
                        {selectedReturn.variant} · Qty{" "}
                        {selectedReturn.quantity}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-lg bg-bg px-2.5 py-1 text-xs font-medium">
                          {selectedReturn.reason}
                        </span>

                        <span className="rounded-lg bg-bg px-2.5 py-1 text-xs font-medium">
                          {formatPrice(selectedReturn.amount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Courier */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-mut">
                  Return shipment
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoItem
                    label="Courier"
                    value={selectedReturn.courier}
                  />

                  <InfoItem
                    label="Tracking ID"
                    value={selectedReturn.tracking}
                  />

                  <InfoItem
                    label="Requested"
                    value={selectedReturn.date}
                  />

                  <InfoItem
                    label="Last update"
                    value={selectedReturn.updated}
                  />
                </div>
              </div>

              {/* Refund */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-mut">
                  Refund
                </p>

                <div className="rounded-xl border border-bd bg-bg2 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-mut">
                        Refund amount
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {formatPrice(selectedReturn.amount)}
                      </p>
                    </div>

                    <StatusBadge status={selectedReturn.refund} />
                  </div>
                </div>
              </div>

              {/* Actions */}
              {selectedReturn.status === "Requested" && (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    className="flex-1 rounded-xl bg-[#a3db4a] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
                    onClick={() => setSelectedReturn(null)}
                  >
                    Approve return
                  </button>

                  <button
                    type="button"
                    className="flex-1 rounded-xl border border-bd px-4 py-3 text-sm font-semibold transition hover:bg-bg2"
                    onClick={() => setSelectedReturn(null)}
                  >
                    Reject request
                  </button>
                </div>
              )}

              {selectedReturn.status === "Inspection" && (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    className="flex-1 rounded-xl bg-[#a3db4a] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
                    onClick={() => setSelectedReturn(null)}
                  >
                    Approve refund
                  </button>

                  <button
                    type="button"
                    className="flex-1 rounded-xl border border-bd px-4 py-3 text-sm font-semibold transition hover:bg-bg2"
                    onClick={() => setSelectedReturn(null)}
                  >
                    Reject after inspection
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSelect({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 min-w-[145px] appearance-none rounded-xl border border-bd bg-bg2 pl-3.5 pr-9 text-sm font-medium outline-none transition focus:border-ac"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl border border-bd bg-bg2 p-4">
      <p className="text-xs text-mut">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}