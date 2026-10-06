"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  CircleCheck,
  Clock3,
  Download,
  Info,
  MapPin,
  Package,
  RefreshCw,
  Search,
  ShoppingBag,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

const salesData = [
  { day: "Sep 30", sales: 5200, orders: 4 },
  { day: "Oct 01", sales: 7600, orders: 6 },
  { day: "Oct 02", sales: 6100, orders: 5 },
  { day: "Oct 03", sales: 9300, orders: 8 },
  { day: "Oct 04", sales: 8400, orders: 7 },
  { day: "Oct 05", sales: 11200, orders: 10 },
  { day: "Oct 06", sales: 13600, orders: 12 },
];

const products = [
  {
    id: "P-1003",
    name: "Minimal Leather Wallet",
    category: "Accessories",
    orders: 184,
    units: 196,
    revenue: 145360,
    profit: 68160,
    growth: 22.4,
    rating: 4.9,
    stock: 76,
  },
  {
    id: "P-1006",
    name: "Premium Cotton T-Shirt",
    category: "Fashion",
    orders: 210,
    units: 228,
    revenue: 202920,
    profit: 93600,
    growth: 18.7,
    rating: 4.8,
    stock: 94,
  },
  {
    id: "P-1001",
    name: "Premium Oversized Hoodie",
    category: "Fashion",
    orders: 128,
    units: 142,
    revenue: 268380,
    profit: 90560,
    growth: 14.2,
    rating: 4.8,
    stock: 42,
  },
  {
    id: "P-1008",
    name: "Stainless Steel Water Bottle",
    category: "Lifestyle",
    orders: 142,
    units: 156,
    revenue: 107640,
    profit: 48672,
    growth: 11.8,
    rating: 4.7,
    stock: 67,
  },
  {
    id: "P-1004",
    name: "Classic Canvas Backpack",
    category: "Bags",
    orders: 72,
    units: 79,
    revenue: 101910,
    profit: 34760,
    growth: 8.3,
    rating: 4.6,
    stock: 31,
  },
];

const categories = [
  {
    name: "Fashion",
    orders: 386,
    revenue: 471300,
    share: 46,
    growth: 18.2,
  },
  {
    name: "Accessories",
    orders: 184,
    revenue: 145360,
    share: 21,
    growth: 22.4,
  },
  {
    name: "Lifestyle",
    orders: 142,
    revenue: 107640,
    share: 15,
    growth: 11.8,
  },
  {
    name: "Bags",
    orders: 72,
    revenue: 101910,
    share: 11,
    growth: 8.3,
  },
  {
    name: "Footwear",
    orders: 61,
    revenue: 97390,
    share: 7,
    growth: -3.2,
  },
];

const customers = [
  {
    name: "Ayesha Karim",
    location: "Banani, Dhaka",
    orders: 24,
    revenue: 48900,
    repeat: 100,
  },
  {
    name: "Nusrat Jahan",
    location: "Dhanmondi, Dhaka",
    orders: 18,
    revenue: 32400,
    repeat: 94,
  },
  {
    name: "Farzana Akter",
    location: "Sylhet",
    orders: 15,
    revenue: 27680,
    repeat: 93,
  },
  {
    name: "Tanvir Hasan",
    location: "Mirpur, Dhaka",
    orders: 12,
    revenue: 21850,
    repeat: 91,
  },
];

const locations = [
  {
    name: "Dhaka",
    orders: 428,
    revenue: 512480,
    share: 52,
    delivery: 96,
  },
  {
    name: "Chattogram",
    orders: 146,
    revenue: 174820,
    share: 18,
    delivery: 93,
  },
  {
    name: "Gazipur",
    orders: 82,
    revenue: 94120,
    share: 10,
    delivery: 94,
  },
  {
    name: "Narayanganj",
    orders: 67,
    revenue: 78540,
    share: 8,
    delivery: 95,
  },
  {
    name: "Sylhet",
    orders: 61,
    revenue: 72890,
    share: 7,
    delivery: 91,
  },
];

function formatPrice(value) {
  return `৳${Number(value).toLocaleString("en-BD")}`;
}

function Growth({ value }) {
  const positive = value >= 0;

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${
        positive ? "text-emerald-600" : "text-red-500"
      }`}
    >
      {positive ? (
        <TrendingUp className="h-3.5 w-3.5" />
      ) : (
        <TrendingDown className="h-3.5 w-3.5" />
      )}
      {positive ? "+" : ""}
      {value}%
    </span>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
  growth,
  tone = "default",
}) {
  const tones = {
    default: "bg-bg2 text-ac",
    green: "bg-emerald-500/10 text-emerald-600",
    blue: "bg-sky-500/10 text-sky-600",
    amber: "bg-amber-500/10 text-amber-600",
    purple: "bg-violet-500/10 text-violet-600",
  };

  return (
    <div className="rounded-2xl border border-bd bg-bg p-5">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        {growth !== undefined && <Growth value={growth} />}
      </div>

      <p className="mt-5 text-sm text-mut">{label}</p>

      <p className="mt-1 text-2xl font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-xs text-mut">{helper}</p>
    </div>
  );
}

function SalesChart() {
  const maxSales = Math.max(...salesData.map((item) => item.sales));

  return (
    <div className="mt-8">
      <div className="flex h-64 items-end gap-2 sm:gap-4">
        {salesData.map((item) => {
          const height = Math.max(
            (item.sales / maxSales) * 100,
            8
          );

          return (
            <div
              key={item.day}
              className="group flex h-full flex-1 flex-col justify-end"
            >
              <div className="relative flex flex-1 items-end justify-center">
                <div
                  className="w-full max-w-11 rounded-t-lg bg-ac transition-all duration-200 group-hover:bg-[#7fb922]"
                  style={{ height: `${height}%` }}
                >
                  <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-bd bg-bg px-2.5 py-1.5 text-xs font-semibold opacity-0 shadow-lg transition group-hover:opacity-100">
                    {formatPrice(item.sales)}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center">
                <p className="text-[10px] text-mut sm:text-xs">
                  {item.day.replace("Oct ", "")}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-5 text-xs text-mut">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-ac" />
          Sales
        </span>

        <span>
          62 orders this period
        </span>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-base font-semibold">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-mut">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("This month");
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredProducts = useMemo(() => {
    const query = productSearch.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [productSearch, categoryFilter]);

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-mut">
          <Link
            href="/dashboard"
            className="transition hover:text-fg"
          >
            Overview
          </Link>

          <span>/</span>

          <span className="text-fg">Analytics</span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ac/15 text-ac">
                <BarChart3 className="h-5 w-5" />
              </div>

              <span className="text-sm font-semibold text-ac">
                Business intelligence
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Analytics
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-mut sm:text-base">
              Understand your sales, products, customers, and
              fulfillment performance so you can make better
              business decisions.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="h-10 appearance-none rounded-xl border border-bd bg-bg px-3 pr-9 text-sm font-semibold outline-none focus:border-ac"
              >
                <option>This week</option>
                <option>This month</option>
                <option>Last month</option>
                <option>Last 3 months</option>
                <option>This year</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />
            </div>

            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-bd bg-bg px-4 text-sm font-semibold transition hover:bg-bg2"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={TrendingUp}
            label="Total sales"
            value={formatPrice(918740)}
            helper="Gross sales this period"
            growth={18.6}
            tone="green"
          />

          <MetricCard
            icon={ShoppingBag}
            label="Total orders"
            value="684"
            helper="62 orders this period"
            growth={12.4}
            tone="blue"
          />

          <MetricCard
            icon={Target}
            label="Average order value"
            value={formatPrice(1343)}
            helper="Revenue per order"
            growth={5.8}
            tone="purple"
          />

          <MetricCard
            icon={CircleCheck}
            label="Delivery success"
            value="94.2%"
            helper="Successful delivered orders"
            growth={2.1}
            tone="amber"
          />
        </div>

        {/* Sales overview */}
        <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
          <div className="rounded-2xl border border-bd bg-bg p-5 sm:p-6">
            <SectionHeader
              title="Sales overview"
              description={`Sales performance for ${period.toLowerCase()}.`}
              action={
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-ac"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Refresh
                </button>
              }
            />

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-3xl font-bold tracking-tight">
                  {formatPrice(918740)}
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <Growth value={18.6} />

                  <span className="text-xs text-mut">
                    vs previous period
                  </span>
                </div>
              </div>

              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-mut">
                    Orders
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    684
                  </p>
                </div>

                <div>
                  <p className="text-xs text-mut">
                    AOV
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {formatPrice(1343)}
                  </p>
                </div>
              </div>
            </div>

            <SalesChart />
          </div>

          {/* Performance summary */}
          <div className="rounded-2xl border border-bd bg-bg p-5 sm:p-6">
            <SectionHeader
              title="Performance snapshot"
              description="Key operational metrics."
            />

            <div className="mt-6 space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CircleCheck className="h-4 w-4 text-emerald-600" />

                    <span className="text-sm">
                      Delivery success
                    </span>
                  </div>

                  <span className="text-sm font-bold">
                    94.2%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-bg2">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: "94.2%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-sky-600" />

                    <span className="text-sm">
                      Repeat customer rate
                    </span>
                  </div>

                  <span className="text-sm font-bold">
                    31.8%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-bg2">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: "31.8%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-amber-600" />

                    <span className="text-sm">
                      Avg. fulfillment time
                    </span>
                  </div>

                  <span className="text-sm font-bold">
                    6.4 hrs
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-bg2">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{ width: "73%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-red-500" />

                    <span className="text-sm">
                      Cancellation rate
                    </span>
                  </div>

                  <span className="text-sm font-bold">
                    5.8%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-bg2">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{ width: "5.8%" }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-bd bg-bg2 p-4">
              <div className="flex gap-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-mut" />

                <p className="text-xs leading-5 text-mut">
                  Your delivery success is above the account
                  average. Focus on reducing cancellations to
                  improve overall profitability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product performance */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-bd bg-bg">
          <div className="border-b border-bd p-5 sm:p-6">
            <SectionHeader
              title="Product performance"
              description="See which products are driving your business."
              action={
                <Link
                  href="/dashboard/products"
                  className="text-xs font-semibold text-ac hover:underline"
                >
                  Browse catalog
                </Link>
              }
            />

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />

                <input
                  type="search"
                  value={productSearch}
                  onChange={(e) =>
                    setProductSearch(e.target.value)
                  }
                  placeholder="Search products..."
                  className="h-10 w-full rounded-xl border border-bd bg-bg2 pl-9 pr-3 text-sm outline-none focus:border-ac"
                />
              </div>

              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) =>
                    setCategoryFilter(e.target.value)
                  }
                  className="h-10 w-full appearance-none rounded-xl border border-bd bg-bg2 px-3 pr-8 text-sm font-medium outline-none focus:border-ac sm:w-40"
                >
                  <option>All</option>
                  <option>Fashion</option>
                  <option>Accessories</option>
                  <option>Lifestyle</option>
                  <option>Bags</option>
                  <option>Footwear</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-bd bg-bg2/50 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-mut">
                    Product
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-mut">
                    Orders
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-mut">
                    Revenue
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-mut">
                    Profit
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-mut">
                    Growth
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-mut">
                    Rating
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold text-mut">
                    Stock
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-bd last:border-0"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/dashboard/products/${product.id}`}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bg2">
                          <Package className="h-4 w-4 text-mut" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold transition hover:text-ac">
                            {product.name}
                          </p>

                          <p className="mt-0.5 text-xs text-mut">
                            {product.category}
                          </p>
                        </div>
                      </Link>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold">
                        {product.orders}
                      </p>

                      <p className="mt-0.5 text-xs text-mut">
                        {product.units} units
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold">
                        {formatPrice(product.revenue)}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-emerald-600">
                        {formatPrice(product.profit)}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <Growth value={product.growth} />
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 text-sm font-medium">
                        <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                        {product.rating}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <span
                        className={
                          product.stock <= 10
                            ? "text-sm font-semibold text-amber-600"
                            : "text-sm font-semibold"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="divide-y divide-bd lg:hidden">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bg2">
                    <Package className="h-4 w-4 text-mut" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {product.name}
                    </p>

                    <p className="mt-0.5 text-xs text-mut">
                      {product.category}
                    </p>
                  </div>

                  <Growth value={product.growth} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-bg2 p-3">
                    <p className="text-[11px] text-mut">
                      Revenue
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {formatPrice(product.revenue)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-bg2 p-3">
                    <p className="text-[11px] text-mut">
                      Profit
                    </p>

                    <p className="mt-1 text-sm font-bold text-emerald-600">
                      {formatPrice(product.profit)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-mut">
                  <span>
                    {product.orders} orders · {product.units} units
                  </span>

                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                    {product.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category + Customer */}
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {/* Categories */}
          <div className="rounded-2xl border border-bd bg-bg p-5 sm:p-6">
            <SectionHeader
              title="Sales by category"
              description="Revenue contribution across your catalog."
            />

            <div className="mt-6 space-y-5">
              {categories.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">
                        {category.name}
                      </p>

                      <p className="mt-0.5 text-xs text-mut">
                        {category.orders} orders
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold">
                        {formatPrice(category.revenue)}
                      </p>

                      <Growth value={category.growth} />
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-bg2">
                      <div
                        className="h-full rounded-full bg-ac"
                        style={{
                          width: `${category.share}%`,
                        }}
                      />
                    </div>

                    <span className="w-8 text-right text-xs font-semibold text-mut">
                      {category.share}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customers */}
          <div className="rounded-2xl border border-bd bg-bg p-5 sm:p-6">
            <SectionHeader
              title="Top customers"
              description="Customers generating the most revenue."
              action={
                <Link
                  href="/dashboard/customers"
                  className="text-xs font-semibold text-ac hover:underline"
                >
                  View customers
                </Link>
              }
            />

            <div className="mt-5 divide-y divide-bd">
              {customers.map((customer, index) => (
                <div
                  key={customer.name}
                  className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg2 text-xs font-bold">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {customer.name}
                    </p>

                    <p className="mt-0.5 flex items-center gap-1 text-xs text-mut">
                      <MapPin className="h-3 w-3" />
                      {customer.location}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold">
                      {formatPrice(customer.revenue)}
                    </p>

                    <p className="mt-0.5 text-[11px] text-mut">
                      {customer.orders} orders
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic performance */}
        <div className="mt-8 rounded-2xl border border-bd bg-bg p-5 sm:p-6">
          <SectionHeader
            title="Sales by location"
            description="Understand where your customers are buying from."
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {locations.map((location) => (
              <div
                key={location.name}
                className="rounded-2xl border border-bd bg-bg2 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-bg text-ac">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <span className="text-xs font-semibold text-mut">
                    {location.share}%
                  </span>
                </div>

                <p className="mt-4 text-sm font-semibold">
                  {location.name}
                </p>

                <p className="mt-1 text-lg font-bold">
                  {formatPrice(location.revenue)}
                </p>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-mut">
                      Orders
                    </span>

                    <span className="font-semibold">
                      {location.orders}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-mut">
                      Delivery
                    </span>

                    <span className="font-semibold text-emerald-600">
                      {location.delivery}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business insights */}
        <div className="mt-8">
          <SectionHeader
            title="Business insights"
            description="Actionable observations from your recent activity."
          />

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <TrendingUp className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-sm font-bold">
                Fashion is your strongest category
              </h3>

              <p className="mt-2 text-sm leading-6 text-mut">
                Fashion generated 46% of your revenue. Consider
                adding more high-margin products in this category.
              </p>

              <Link
                href="/dashboard/products"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline"
              >
                Explore products
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <Clock3 className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-sm font-bold">
                Some products need restocking
              </h3>

              <p className="mt-2 text-sm leading-6 text-mut">
                Your fastest-selling products are approaching
                their reorder points. Check inventory before
                accepting more orders.
              </p>

              <Link
                href="/dashboard/inventory"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:underline"
              >
                View inventory
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                <Users className="h-5 w-5" />
              </div>

              <h3 className="mt-4 text-sm font-bold">
                Repeat customers are growing
              </h3>

              <p className="mt-2 text-sm leading-6 text-mut">
                Your repeat purchase rate reached 31.8%, giving
                you a strong opportunity to increase customer
                lifetime value.
              </p>

              <Link
                href="/dashboard/customers"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline"
              >
                View customers
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 rounded-2xl border border-bd bg-bg2 p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-ac">
                <BarChart3 className="h-5 w-5" />

                <span className="text-sm font-semibold">
                  Grow with data
                </span>
              </div>

              <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
                Turn your analytics into better decisions.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-mut">
                Find winning products, improve fulfillment,
                understand your customers, and keep more of every
                sale.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/products"
                className="inline-flex items-center gap-2 rounded-xl border border-bd bg-bg px-5 py-3 text-sm font-semibold transition hover:bg-bg2"
              >
                Browse products
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/dashboard/orders"
                className="inline-flex items-center gap-2 rounded-xl bg-ac px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
              >
                View orders
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}