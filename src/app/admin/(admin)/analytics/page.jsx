
"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  CircleDollarSign,
  Users,
  Truck,
  Package,
  Download,
  CalendarDays,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Wallet,
  Store,
  Activity,
  ChevronDown,
} from "lucide-react";

const revenueData = {
  "7 days": [
    { label: "Fri", revenue: 18400, orders: 42 },
    { label: "Sat", revenue: 23100, orders: 56 },
    { label: "Sun", revenue: 19800, orders: 48 },
    { label: "Mon", revenue: 27600, orders: 67 },
    { label: "Tue", revenue: 24200, orders: 59 },
    { label: "Wed", revenue: 31900, orders: 74 },
    { label: "Thu", revenue: 35800, orders: 86 },
  ],
  "30 days": [
    { label: "Sep 10", revenue: 158000, orders: 352 },
    { label: "Sep 13", revenue: 176000, orders: 391 },
    { label: "Sep 16", revenue: 149000, orders: 328 },
    { label: "Sep 19", revenue: 212000, orders: 467 },
    { label: "Sep 22", revenue: 195000, orders: 431 },
    { label: "Sep 25", revenue: 248000, orders: 536 },
    { label: "Sep 28", revenue: 221000, orders: 489 },
    { label: "Oct 01", revenue: 284000, orders: 612 },
    { label: "Oct 04", revenue: 267000, orders: 583 },
    { label: "Oct 07", revenue: 325000, orders: 701 },
  ],
  "90 days": [
    { label: "Jul 15", revenue: 680000, orders: 1480 },
    { label: "Jul 25", revenue: 745000, orders: 1625 },
    { label: "Aug 04", revenue: 712000, orders: 1550 },
    { label: "Aug 14", revenue: 860000, orders: 1870 },
    { label: "Aug 24", revenue: 824000, orders: 1790 },
    { label: "Sep 03", revenue: 945000, orders: 2040 },
    { label: "Sep 13", revenue: 1010000, orders: 2210 },
    { label: "Sep 23", revenue: 970000, orders: 2110 },
    { label: "Oct 03", revenue: 1140000, orders: 2470 },
  ],
};

const topProducts = [
  {
    name: "Wireless Bluetooth Earbuds",
    category: "Electronics",
    sold: 428,
    revenue: 513600,
    growth: 18.4,
    color: "bg-blue-100 text-blue-700",
    initials: "EB",
  },
  {
    name: "Premium Cotton T-Shirt",
    category: "Fashion",
    sold: 367,
    revenue: 293600,
    growth: 12.2,
    color: "bg-violet-100 text-violet-700",
    initials: "TS",
  },
  {
    name: "Smart Watch Series",
    category: "Electronics",
    sold: 294,
    revenue: 588000,
    growth: 9.8,
    color: "bg-emerald-100 text-emerald-700",
    initials: "SW",
  },
  {
    name: "Daily Care Skincare Set",
    category: "Beauty",
    sold: 251,
    revenue: 376500,
    growth: -3.4,
    color: "bg-pink-100 text-pink-700",
    initials: "SC",
  },
  {
    name: "Casual Running Shoes",
    category: "Footwear",
    sold: 198,
    revenue: 396000,
    growth: 6.7,
    color: "bg-amber-100 text-amber-700",
    initials: "RS",
  },
];

const sellerPerformance = [
  {
    name: "Tech Zone BD",
    orders: 542,
    revenue: 1245000,
    completion: 96,
    status: "Excellent",
  },
  {
    name: "Fashion House",
    orders: 438,
    revenue: 987000,
    completion: 93,
    status: "Excellent",
  },
  {
    name: "Daily Needs Store",
    orders: 376,
    revenue: 756000,
    completion: 89,
    status: "Good",
  },
  {
    name: "Beauty Basket",
    orders: 294,
    revenue: 612000,
    completion: 85,
    status: "Good",
  },
  {
    name: "Smart Gadgets",
    orders: 261,
    revenue: 584000,
    completion: 78,
    status: "Needs attention",
  },
];

const categoryData = [
  { name: "Electronics", value: 36, color: "#2271b1" },
  { name: "Fashion", value: 25, color: "#a3db4a" },
  { name: "Home & Living", value: 16, color: "#8b5cf6" },
  { name: "Beauty", value: 13, color: "#ec4899" },
  { name: "Others", value: 10, color: "#dcdcde" },
];

const money = (value) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);

const compactMoney = (value) =>
  new Intl.NumberFormat("en-BD", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  helper,
  iconClass,
  positive = true,
}) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-[#646970]">{label}</p>
          <p className="mt-2 wrap-break-word text-2xl font-bold tracking-tight text-[#1d2327]">
            {value}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                positive ? "text-green-700" : "text-red-600"
              }`}
            >
              {positive ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
              {change}
            </span>
            <span className="text-xs text-[#787c82]">{helper}</span>
          </div>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function Panel({ title, subtitle, action, children, className = "" }) {
  return (
    <section
      className={`overflow-hidden rounded-xl border border-[#dcdcde] bg-white ${className}`}
    >
      <div className="flex flex-col justify-between gap-2 border-b border-[#f0f0f1] px-4 py-4 sm:flex-row sm:items-center sm:px-5">
        <div>
          <h2 className="font-bold text-[#1d2327]">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-xs text-[#787c82]">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

function MiniLegend({ color, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-sm"
          style={{ backgroundColor: color }}
        />
        <span className="truncate text-sm text-[#50575e]">{label}</span>
      </div>
      <span className="text-sm font-semibold text-[#1d2327]">{value}%</span>
    </div>
  );
}

function EmptyChart({ text }) {
  return (
    <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-[#dcdcde] text-sm text-[#787c82]">
      {text}
    </div>
  );
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30 days");
  const [reportType, setReportType] = useState("overview");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [showAllSellers, setShowAllSellers] = useState(false);
  const [notice, setNotice] = useState("");

  const chartData = revenueData[period];

  const maxRevenue = Math.max(...chartData.map((item) => item.revenue));
  const minRevenue = Math.min(...chartData.map((item) => item.revenue));
  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
  const totalChartOrders = chartData.reduce(
    (sum, item) => sum + item.orders,
    0
  );

  const filteredProducts = useMemo(() => {
    if (categoryFilter === "All categories") return topProducts;

    return topProducts.filter(
      (product) => product.category === categoryFilter
    );
  }, [categoryFilter]);

  const shownSellers = showAllSellers
    ? sellerPerformance
    : sellerPerformance.slice(0, 4);

  function notify(message) {
    setNotice(message);
    setTimeout(() => setNotice(""), 3000);
  }

  function exportReport() {
    const rows = [
      ["AmarDokan Analytics Demo Report", ""],
      ["Selected period", period],
      ["Report generated", new Date().toLocaleString("en-BD")],
      [],
      ["Revenue trend"],
      ["Period", "Revenue (BDT)", "Orders"],
      ...chartData.map((item) => [
        item.label,
        item.revenue,
        item.orders,
      ]),
      [],
      ["Top products"],
      ["Product", "Category", "Units sold", "Revenue (BDT)", "Growth (%)"],
      ...filteredProducts.map((product) => [
        product.name,
        product.category,
        product.sold,
        product.revenue,
        product.growth,
      ]),
      [],
      ["Seller performance"],
      ["Seller", "Orders", "Revenue (BDT)", "Completion (%)"],
      ...sellerPerformance.map((seller) => [
        seller.name,
        seller.orders,
        seller.revenue,
        seller.completion,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `amardokan-analytics-${period
      .toLowerCase()
      .replace(" ", "-")}.csv`;
    link.click();

    URL.revokeObjectURL(url);
    notify("Analytics demo report exported.");
  }

  return (
    <div className="min-h-screen bg-[#f6f7f7] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-375 space-y-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#646970]">
              <BarChart3 size={15} />
              Insights / Analytics
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Platform Analytics
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm text-[#646970]">
              Monitor sales, order activity, delivery performance, and seller
              growth across your marketplace.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-[#2271b1]"
              aria-label="Analytics period"
            >
              <option value="7 days">Last 7 days</option>
              <option value="30 days">Last 30 days</option>
              <option value="90 days">Last 90 days</option>
            </select>

            <button
              type="button"
              onClick={exportReport}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2271b1] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#135e96]"
            >
              <Download size={16} />
              Export report
            </button>
          </div>
        </div>

        {/* Demo notice */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          <Activity className="mt-0.5 shrink-0" size={18} />
          <div>
            <p className="font-semibold">Sample analytics data</p>
            <p className="mt-1 leading-5 text-blue-800">
              These figures are illustrative demo values, not live AmarDokan
              business metrics. Connect your MongoDB aggregation queries to
              display actual revenue, orders, and seller performance.
            </p>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={CircleDollarSign}
            label="Gross sales"
            value={money(
              period === "7 days"
                ? 180800
                : period === "30 days"
                  ? 2450000
                  : 8120000
            )}
            change="+12.8%"
            helper="vs previous period"
            iconClass="bg-green-50 text-green-700"
          />
          <StatCard
            icon={ShoppingCart}
            label="Total orders"
            value={
              period === "7 days"
                ? "432"
                : period === "30 days"
                  ? "5,284"
                  : "17,620"
            }
            change="+8.4%"
            helper="vs previous period"
            iconClass="bg-blue-50 text-blue-700"
          />
          <StatCard
            icon={Store}
            label="Active sellers"
            value="186"
            change="+6.2%"
            helper="vs previous period"
            iconClass="bg-violet-50 text-violet-700"
          />
          <StatCard
            icon={Wallet}
            label="Platform commission"
            value={money(
              period === "7 days"
                ? 14464
                : period === "30 days"
                  ? 196000
                  : 649600
            )}
            change="+10.6%"
            helper="vs previous period"
            iconClass="bg-amber-50 text-amber-700"
          />
        </div>

        {/* Main revenue chart */}
        <Panel
          title="Revenue overview"
          subtitle={`Sales trend for the selected ${period.toLowerCase()}`}
          action={
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-[#50575e]">
              <CalendarDays size={14} />
              {period}
            </div>
          }
        >
          <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-[#646970]">Chart-period revenue</p>
              <p className="mt-1 text-xl font-bold">
                {money(totalRevenue)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#646970]">Orders in chart</p>
              <p className="mt-1 text-xl font-bold">
                {totalChartOrders.toLocaleString("en-BD")}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs text-[#646970]">Average chart revenue</p>
              <p className="mt-1 text-xl font-bold">
                {money(Math.round(totalRevenue / chartData.length))}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex flex-col justify-between pb-8 pt-1">
              {[1, 0.75, 0.5, 0.25, 0].map((tick) => (
                <div
                  key={tick}
                  className="flex items-center gap-3 border-t border-dashed border-[#e8eaec]"
                >
                  <span className="w-12 -translate-y-2 bg-white pr-1 text-[10px] text-[#787c82]">
                    {compactMoney(maxRevenue * tick)}
                  </span>
                  <div className="flex-1" />
                </div>
              ))}
            </div>

            <div className="relative flex h-64 items-end gap-2 pl-14 sm:gap-3">
              {chartData.map((item, index) => {
                const height = Math.max(
                  4,
                  (item.revenue / maxRevenue) * 100
                );

                return (
                  <div
                    key={`${item.label}-${index}`}
                    className="group relative flex h-full min-w-0 flex-1 flex-col justify-end"
                  >
                    <div
                      className="absolute left-1/2 z-10 hidden -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-[#1d2327] px-2.5 py-2 text-xs text-white shadow-lg group-hover:block"
                      style={{ bottom: `${height}%` }}
                    >
                      <p className="font-semibold">{item.label}</p>
                      <p>{money(item.revenue)}</p>
                      <p>{item.orders} orders</p>
                    </div>

                    <div
                      className="w-full rounded-t-md bg-[#a3db4a] transition-colors group-hover:bg-[#7fb922]"
                      style={{
                        height: `${height}%`,
                        minHeight: "4px",
                      }}
                    />

                    <p className="mt-2 truncate text-center text-[10px] text-[#646970] sm:text-xs">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[#f0f0f1] pt-4 text-xs text-[#646970]">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#a3db4a]" />
              Gross sales (BDT)
            </span>
            <span>
              Highest point: {money(maxRevenue)}
            </span>
            <span>
              Lowest point: {money(minRevenue)}
            </span>
          </div>
        </Panel>

        {/* Performance and breakdown */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Panel
            title="Order fulfillment"
            subtitle="Illustrative order status breakdown"
            className="xl:col-span-2"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-5">
                {[
                  {
                    label: "Delivered",
                    value: 68,
                    count: 3593,
                    color: "#16a34a",
                    icon: CheckCircle2,
                  },
                  {
                    label: "Processing",
                    value: 14,
                    count: 740,
                    color: "#2271b1",
                    icon: Clock3,
                  },
                  {
                    label: "In transit",
                    value: 10,
                    count: 528,
                    color: "#a3db4a",
                    icon: Truck,
                  },
                  {
                    label: "Cancelled / returned",
                    value: 8,
                    count: 423,
                    color: "#ef4444",
                    icon: RotateCcw,
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <item.icon
                          size={16}
                          style={{ color: item.color }}
                        />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-sm font-semibold">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-[#787c82]">
                      {item.count.toLocaleString("en-BD")} orders
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-center rounded-xl bg-[#f6f7f7] p-5">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <CheckCircle2 size={38} />
                </div>
                <p className="mt-4 text-center text-sm text-[#646970]">
                  Demo fulfillment rate
                </p>
                <p className="mt-1 text-center text-3xl font-bold">68.0%</p>
                <p className="mt-2 text-center text-xs leading-5 text-[#787c82]">
                  Based on the sample order status distribution shown here.
                  Calculate your real rate using a clearly defined order
                  denominator.
                </p>
              </div>
            </div>
          </Panel>

          <Panel
            title="Sales by category"
            subtitle="Illustrative share of gross sales"
          >
            <div className="flex justify-center py-3">
              <div
                className="relative flex h-44 w-44 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(${categoryData
                    .map((item, index) => {
                      const start = categoryData
                        .slice(0, index)
                        .reduce((sum, entry) => sum + entry.value, 0);
                      const end = start + item.value;
                      return `${item.color} ${start}% ${end}%`;
                    })
                    .join(", ")})`,
                }}
              >
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-xs text-[#646970]">Categories</span>
                  <span className="mt-1 text-2xl font-bold">
                    {categoryData.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {categoryData.map((category) => (
                <MiniLegend
                  key={category.name}
                  color={category.color}
                  label={category.name}
                  value={category.value}
                />
              ))}
            </div>
          </Panel>
        </div>

        {/* Product performance */}
        <Panel
          title="Top-selling products"
          subtitle="Products ranked by demo unit sales"
          action={
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="rounded-lg border border-[#c3c4c7] bg-white px-3 py-2 text-xs outline-none focus:border-[#2271b1]"
              aria-label="Filter product category"
            >
              <option>All categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Beauty</option>
              <option>Footwear</option>
            </select>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-162.5 text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8eaec] text-xs uppercase tracking-wide text-[#646970]">
                  <th className="pb-3 pr-4 font-semibold">Product</th>
                  <th className="pb-3 pr-4 font-semibold">Units sold</th>
                  <th className="pb-3 pr-4 font-semibold">Revenue</th>
                  <th className="pb-3 font-semibold">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f1]">
                {filteredProducts.map((product, index) => (
                  <tr key={product.name} className="hover:bg-[#fafafa]">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${product.color}`}
                        >
                          {product.initials}
                        </div>
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="mt-1 text-xs text-[#787c82]">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <p className="font-semibold">
                        {product.sold.toLocaleString("en-BD")}
                      </p>
                      <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-[#a3db4a]"
                          style={{
                            width: `${(product.sold / topProducts[0].sold) * 100}%`,
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-4 pr-4 font-semibold">
                      {money(product.revenue)}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          product.growth >= 0
                            ? "text-green-700"
                            : "text-red-600"
                        }`}
                      >
                        {product.growth >= 0 ? (
                          <TrendingUp size={14} />
                        ) : (
                          <TrendingDown size={14} />
                        )}
                        {product.growth > 0 ? "+" : ""}
                        {product.growth}%
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-12 text-center text-sm text-[#787c82]"
                    >
                      No products in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Seller performance */}
        <Panel
          title="Seller performance"
          subtitle="Demo seller revenue, order volume, and completion rate"
          action={
            <button
              type="button"
              onClick={() => setShowAllSellers((value) => !value)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#c3c4c7] px-3 py-2 text-xs font-semibold hover:bg-gray-50"
            >
              {showAllSellers ? "Show less" : "View all"}
              <ChevronDown
                size={14}
                className={showAllSellers ? "rotate-180" : ""}
              />
            </button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8eaec] text-xs uppercase tracking-wide text-[#646970]">
                  <th className="pb-3 pr-4 font-semibold">Seller</th>
                  <th className="pb-3 pr-4 font-semibold">Orders</th>
                  <th className="pb-3 pr-4 font-semibold">Gross sales</th>
                  <th className="pb-3 pr-4 font-semibold">Completion rate</th>
                  <th className="pb-3 font-semibold">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f1]">
                {shownSellers.map((seller) => (
                  <tr key={seller.name} className="hover:bg-[#fafafa]">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                          <Store size={17} />
                        </div>
                        <span className="font-semibold">{seller.name}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 font-medium">
                      {seller.orders.toLocaleString("en-BD")}
                    </td>
                    <td className="py-4 pr-4 font-semibold">
                      {money(seller.revenue)}
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full ${
                              seller.completion >= 90
                                ? "bg-green-500"
                                : seller.completion >= 80
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${seller.completion}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold">
                          {seller.completion}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
                          seller.status === "Excellent"
                            ? "bg-green-50 text-green-700"
                            : seller.status === "Good"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {seller.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Bottom insight cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#dcdcde] bg-white p-5">
            <div className="flex items-center gap-2 text-[#646970]">
              <Truck size={17} />
              <span className="text-sm font-medium">Delivery performance</span>
            </div>
            <p className="mt-3 text-2xl font-bold">92.4%</p>
            <p className="mt-1 text-xs text-[#787c82]">
              Demo on-time delivery rate
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: "92.4%" }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-[#dcdcde] bg-white p-5">
            <div className="flex items-center gap-2 text-[#646970]">
              <RotateCcw size={17} />
              <span className="text-sm font-medium">Return rate</span>
            </div>
            <p className="mt-3 text-2xl font-bold">4.8%</p>
            <p className="mt-1 text-xs text-[#787c82]">
              Demo share of submitted orders
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-amber-500"
                style={{ width: "4.8%" }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-[#dcdcde] bg-white p-5">
            <div className="flex items-center gap-2 text-[#646970]">
              <Users size={17} />
              <span className="text-sm font-medium">Average order value</span>
            </div>
            <p className="mt-3 text-2xl font-bold">{money(463)}</p>
            <p className="mt-1 text-xs text-[#787c82]">
              Demo gross sales divided by orders
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-green-700">
              <TrendingUp size={14} />
              +5.3% vs previous period
            </div>
          </div>
        </div>

        <p className="text-center text-xs leading-5 text-[#787c82]">
          AmarDokan Analytics · Demonstration interface · All figures are
          illustrative and should be replaced by verified database metrics.
        </p>
      </div>

      {notice && (
        <div className="fixed bottom-5 right-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-[#dcdcde] bg-white px-4 py-3.5 shadow-xl">
          <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-green-600" />
          <p className="text-sm font-medium text-[#1d2327]">{notice}</p>
        </div>
      )}
    </div>
  );
}
