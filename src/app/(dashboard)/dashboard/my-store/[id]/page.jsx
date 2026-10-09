"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  Edit3,
  Eye,
  Heart,
  MoreHorizontal,
  Package,
  Pencil,
  RotateCcw,
  ShoppingBag,
  Star,
  Trash2,
  TrendingUp,
  Truck,
  Wallet,
} from "lucide-react";

const product = {
  id: "SP-1001",
  name: "Premium Oversized Hoodie",
  category: "Fashion",
  description:
    "A premium oversized hoodie made with soft cotton-blend fabric. Designed for everyday comfort with a relaxed fit and clean minimal styling.",
  sku: "HOOD-OVR-BLK-XL",
  status: "Published",

  cost: 1250,
  sellingPrice: 1890,
  stock: 42,

  orders: 128,
  unitsSold: 156,
  revenue: 241920,

  rating: 4.8,
  reviews: 42,

  delivery: "2–4 days",

  createdAt: "September 18, 2026",
  updatedAt: "October 05, 2026",

  image: null,

  variants: [
    {
      id: 1,
      color: "Black",
      size: "M",
      sku: "HOOD-OVR-BLK-M",
      stock: 18,
      price: 1890,
    },
    {
      id: 2,
      color: "Black",
      size: "L",
      sku: "HOOD-OVR-BLK-L",
      stock: 24,
      price: 1890,
    },
    {
      id: 3,
      color: "Black",
      size: "XL",
      sku: "HOOD-OVR-BLK-XL",
      stock: 42,
      price: 1890,
    },
    {
      id: 4,
      color: "Grey",
      size: "L",
      sku: "HOOD-OVR-GRY-L",
      stock: 15,
      price: 1890,
    },
  ],

  recentOrders: [
    {
      id: "AM-10482",
      customer: "Nusrat Jahan",
      quantity: 2,
      amount: 3780,
      status: "Delivered",
      date: "Oct 06, 2026",
    },
    {
      id: "AM-10471",
      customer: "Tanvir Hasan",
      quantity: 1,
      amount: 1890,
      status: "Processing",
      date: "Oct 05, 2026",
    },
    {
      id: "AM-10452",
      customer: "Sadia Rahman",
      quantity: 1,
      amount: 1890,
      status: "Pending",
      date: "Oct 05, 2026",
    },
    {
      id: "AM-10421",
      customer: "Rakib Ahmed",
      quantity: 2,
      amount: 3780,
      status: "Delivered",
      date: "Oct 04, 2026",
    },
  ],
};

const salesData = [
  { label: "Mon", value: 28 },
  { label: "Tue", value: 42 },
  { label: "Wed", value: 35 },
  { label: "Thu", value: 58 },
  { label: "Fri", value: 48 },
  { label: "Sat", value: 72 },
  { label: "Sun", value: 64 },
];

function formatPrice(price) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function getProfit() {
  return product.sellingPrice - product.cost;
}

function getMargin() {
  return Math.round(
    ((product.sellingPrice - product.cost) /
      product.sellingPrice) *
      100
  );
}

function StatusBadge({ status }) {
  const styles = {
    Published:
      "bg-[#a3db4a]/10 text-[#7fb922] border-[#a3db4a]/20",
    Delivered:
      "bg-[#a3db4a]/10 text-[#7fb922] border-[#a3db4a]/20",
    Processing:
      "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Pending:
      "bg-amber-500/10 text-amber-500 border-amber-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
        styles[status] || "bg-bg2 text-mut border-bd"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  description,
  positive,
}) {
  return (
    <div className="rounded-2xl border border-bd bg-bg p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg2">
          <Icon className="h-5 w-5 text-ac" />
        </div>

        {positive && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#a3db4a]/10 px-2 py-1 text-[10px] font-semibold text-[#7fb922]">
            <TrendingUp className="h-3 w-3" />
            {positive}
          </span>
        )}
      </div>

      <p className="mt-5 text-xs text-mut">{label}</p>

      <p className="mt-1 text-2xl font-bold tracking-tight">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs text-mut">{description}</p>
      )}
    </div>
  );
}

function ProductPlaceholder() {
  return (
    <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-bd bg-bg2">
      <Package className="h-20 w-20 text-mut/40" />
    </div>
  );
}

function InfoRow({ label, value, mono }) {
  return (
    <div className="flex items-center justify-between gap-5 py-3">
      <span className="text-sm text-mut">{label}</span>

      <span
        className={`text-right text-sm font-semibold ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function SalesChart() {
  const max = Math.max(...salesData.map((item) => item.value));

  return (
    <div className="mt-6">
      <div className="flex h-56 items-end gap-2 sm:gap-4">
        {salesData.map((item) => {
          const height = `${(item.value / max) * 100}%`;

          return (
            <div
              key={item.label}
              className="group flex h-full flex-1 flex-col items-center justify-end"
            >
              <div className="relative flex h-full w-full items-end">
                <div
                  className="mx-auto w-full max-w-10 rounded-t-lg bg-ac transition-all duration-300 group-hover:bg-[#7fb922]"
                  style={{ height }}
                />

                <div className="absolute bottom-[calc(100%-var(--bar-height))] left-1/2 hidden -translate-x-1/2 -translate-y-2 whitespace-nowrap rounded-lg border border-bd bg-bg px-2 py-1 text-[10px] font-semibold shadow-sm group-hover:block">
                  {item.value} orders
                </div>
              </div>

              <span className="mt-3 text-[10px] text-mut">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function StoreProductDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showDelete, setShowDelete] = useState(false);

  const profit = getProfit();
  const margin = getMargin();

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-375 px-4 py-6 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-mut">
          <Link
            href="/dashboard"
            className="transition hover:text-fg"
          >
            Overview
          </Link>

          <ChevronRight className="h-4 w-4" />

          <Link
            href="/dashboard/store-products"
            className="transition hover:text-fg"
          >
            My Store Products
          </Link>

          <ChevronRight className="h-4 w-4" />

          <span className="text-fg">{product.name}</span>
        </div>

        {/* Back */}
        <Link
          href="/dashboard/store-products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-mut transition hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Store Products
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-4">
            <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-bg2 sm:flex">
              <Package className="h-6 w-6 text-ac" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {product.name}
                </h1>

                <StatusBadge status={product.status} />
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-mut">
                <span>{product.category}</span>
                <span>•</span>
                <span>{product.sku}</span>
                <span>•</span>
                <span>Added {product.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-bd bg-bg px-4 py-2.5 text-sm font-semibold transition hover:bg-bg2"
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>

            <Link
              href={`/dashboard/store-products/${product.id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl bg-ac px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
            >
              <Edit3 className="h-4 w-4" />
              Edit Product
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-bd bg-bg transition hover:bg-bg2"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Top metrics */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard
            icon={Wallet}
            label="Selling Price"
            value={formatPrice(product.sellingPrice)}
            description={`Cost ${formatPrice(product.cost)}`}
          />

          <MetricCard
            icon={TrendingUp}
            label="Profit Per Sale"
            value={formatPrice(profit)}
            description={`${margin}% profit margin`}
            positive="+12.4%"
          />

          <MetricCard
            icon={Boxes}
            label="Current Stock"
            value={product.stock}
            description="Units available"
          />

          <MetricCard
            icon={ShoppingBag}
            label="Total Orders"
            value={product.orders}
            description={`${product.unitsSold} units sold`}
            positive="+18.2%"
          />

          <MetricCard
            icon={BarChart3}
            label="Total Revenue"
            value={formatPrice(product.revenue)}
            description="Generated from this product"
          />
        </div>

        {/* Main layout */}
        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">

          {/* Left */}
          <div className="space-y-6">

            {/* Product overview */}
            <section className="rounded-2xl border border-bd bg-bg">
              <div className="border-b border-bd px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">
                      Product Overview
                    </h2>

                    <p className="mt-1 text-xs text-mut">
                      Product information shown in your store.
                    </p>
                  </div>

                  <Link
                    href={`/dashboard/store-products/${product.id}/edit`}
                    className="hidden items-center gap-1.5 text-xs font-semibold text-mut transition hover:text-fg sm:flex"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                </div>
              </div>

              <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                <div>
                  <ProductPlaceholder />

                  <div className="mt-3 flex gap-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-ac bg-ac/5">
                      <Package className="h-5 w-5 text-ac" />
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-bd bg-bg2">
                      <Package className="h-5 w-5 text-mut" />
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-bd bg-bg2">
                      <Package className="h-5 w-5 text-mut" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-current text-amber-400" />

                    <span className="text-sm font-semibold">
                      {product.rating}
                    </span>

                    <span className="text-sm text-mut">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-mut">
                    {product.description}
                  </p>

                  <div className="mt-6 divide-y divide-bd border-y border-bd">
                    <InfoRow
                      label="Product ID"
                      value={product.id}
                      mono
                    />

                    <InfoRow
                      label="Category"
                      value={product.category}
                    />

                    <InfoRow
                      label="SKU"
                      value={product.sku}
                      mono
                    />

                    <InfoRow
                      label="Delivery estimate"
                      value={product.delivery}
                    />

                    <InfoRow
                      label="Last updated"
                      value={product.updatedAt}
                    />
                  </div>

                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-mut transition hover:text-fg"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy product SKU
                  </button>
                </div>
              </div>
            </section>

            {/* Tabs */}
            <section className="overflow-hidden rounded-2xl border border-bd bg-bg">
              <div className="border-b border-bd px-5 sm:px-6">
                <div className="flex gap-6 overflow-x-auto">
                  {[
                    ["overview", "Performance"],
                    ["variants", "Variants"],
                    ["orders", "Recent Orders"],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveTab(id)}
                      className={`relative whitespace-nowrap py-4 text-sm font-semibold transition ${
                        activeTab === id
                          ? "text-fg"
                          : "text-mut hover:text-fg"
                      }`}
                    >
                      {label}

                      {activeTab === id && (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-ac" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Performance */}
              {activeTab === "overview" && (
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="font-semibold">
                        Sales Performance
                      </h3>

                      <p className="mt-1 text-xs text-mut">
                        Order activity for the last 7 days
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-xl font-bold">
                        {product.orders}
                      </p>

                      <p className="text-xs text-mut">
                        Total orders
                      </p>
                    </div>
                  </div>

                  <SalesChart />

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-bg2 p-4">
                      <p className="text-xs text-mut">
                        Average order value
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        {formatPrice(
                          product.revenue / product.orders
                        )}
                      </p>
                    </div>

                    <div className="rounded-xl bg-bg2 p-4">
                      <p className="text-xs text-mut">
                        Units sold
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        {product.unitsSold}
                      </p>
                    </div>

                    <div className="rounded-xl bg-bg2 p-4">
                      <p className="text-xs text-mut">
                        Estimated profit
                      </p>

                      <p className="mt-1 text-lg font-bold text-[#7fb922]">
                        {formatPrice(
                          profit * product.unitsSold
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Variants */}
              {activeTab === "variants" && (
                <div className="p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        Product Variants
                      </h3>

                      <p className="mt-1 text-xs text-mut">
                        Manage available colors, sizes and stock.
                      </p>
                    </div>

                    <button className="inline-flex items-center gap-2 rounded-lg border border-bd px-3 py-2 text-xs font-semibold transition hover:bg-bg2">
                      <PlusIcon />
                      Add variant
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-150">
                      <thead>
                        <tr className="border-b border-bd text-left">
                          <th className="pb-3 text-xs font-semibold text-mut">
                            Variant
                          </th>

                          <th className="pb-3 text-xs font-semibold text-mut">
                            SKU
                          </th>

                          <th className="pb-3 text-xs font-semibold text-mut">
                            Price
                          </th>

                          <th className="pb-3 text-xs font-semibold text-mut">
                            Stock
                          </th>

                          <th className="pb-3 text-right text-xs font-semibold text-mut">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-bd">
                        {product.variants.map((variant) => (
                          <tr key={variant.id}>
                            <td className="py-4">
                              <p className="text-sm font-semibold">
                                {variant.color} · {variant.size}
                              </p>
                            </td>

                            <td className="py-4 font-mono text-xs text-mut">
                              {variant.sku}
                            </td>

                            <td className="py-4 text-sm font-semibold">
                              {formatPrice(variant.price)}
                            </td>

                            <td className="py-4">
                              <span
                                className={`text-xs font-semibold ${
                                  variant.stock <= 10
                                    ? "text-amber-500"
                                    : "text-fg"
                                }`}
                              >
                                {variant.stock} units
                              </span>
                            </td>

                            <td className="py-4 text-right">
                              <button className="rounded-lg p-2 text-mut transition hover:bg-bg2 hover:text-fg">
                                <Pencil className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Orders */}
              {activeTab === "orders" && (
                <div className="divide-y divide-bd">
                  {product.recentOrders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/dashboard/orders/${order.id}`}
                      className="flex flex-col gap-3 p-5 transition hover:bg-bg2/40 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg2">
                          <ShoppingBag className="h-4 w-4 text-mut" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            {order.id}
                          </p>

                          <p className="mt-1 text-xs text-mut">
                            {order.customer} · {order.quantity} item
                            {order.quantity > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-5 sm:justify-end">
                        <div>
                          <p className="text-sm font-semibold">
                            {formatPrice(order.amount)}
                          </p>

                          <p className="mt-1 text-xs text-mut">
                            {order.date}
                          </p>
                        </div>

                        <StatusBadge status={order.status} />

                        <ChevronRight className="h-4 w-4 text-mut" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-6">

            {/* Store status */}
            <section className="rounded-2xl border border-bd bg-bg p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    Store Visibility
                  </h3>

                  <p className="mt-1 text-xs text-mut">
                    Control how customers see this product.
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a3db4a]/10">
                  <Eye className="h-5 w-5 text-[#7fb922]" />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl bg-bg2 p-3">
                <div>
                  <p className="text-sm font-semibold">
                    Published
                  </p>

                  <p className="mt-0.5 text-xs text-mut">
                    Visible in your store
                  </p>
                </div>

                <button
                  type="button"
                  className="relative h-6 w-11 rounded-full bg-ac"
                >
                  <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-bd px-4 py-2.5 text-xs font-semibold transition hover:bg-bg2"
              >
                <Eye className="h-4 w-4" />
                Preview in Store
              </button>
            </section>

            {/* Pricing */}
            <section className="rounded-2xl border border-bd bg-bg p-5">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-ac" />

                <h3 className="font-semibold">
                  Pricing & Profit
                </h3>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs text-mut">
                    Supplier cost
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {formatPrice(product.cost)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-mut">
                    Your selling price
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {formatPrice(product.sellingPrice)}
                  </p>
                </div>

                <div className="border-t border-bd pt-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-mut">
                        Profit per sale
                      </p>

                      <p className="mt-1 text-2xl font-bold text-[#7fb922]">
                        {formatPrice(profit)}
                      </p>
                    </div>

                    <span className="rounded-full bg-[#a3db4a]/10 px-2.5 py-1 text-xs font-bold text-[#7fb922]">
                      {margin}% margin
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href={`/dashboard/store-products/${product.id}/edit`}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-bg2 px-4 py-2.5 text-xs font-semibold transition hover:bg-ac/10"
              >
                <Pencil className="h-4 w-4" />
                Update Price
              </Link>
            </section>

            {/* Inventory */}
            <section className="rounded-2xl border border-bd bg-bg p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    Inventory
                  </h3>

                  <p className="mt-1 text-xs text-mut">
                    Current product availability.
                  </p>
                </div>

                <Boxes className="h-5 w-5 text-ac" />
              </div>

              <div className="mt-5 rounded-xl bg-bg2 p-4">
                <p className="text-xs text-mut">
                  Available stock
                </p>

                <div className="mt-1 flex items-end justify-between">
                  <p className="text-2xl font-bold">
                    {product.stock}
                  </p>

                  <span className="text-xs font-semibold text-[#7fb922]">
                    Units
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg">
                  <div
                    className="h-full rounded-full bg-ac"
                    style={{
                      width: `${Math.min(
                        product.stock,
                        100
                      )}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-[11px] text-mut">
                  Stock is currently healthy
                </p>
              </div>

              <Link
                href="/dashboard/inventory"
                className="mt-4 flex items-center justify-between rounded-xl border border-bd px-4 py-3 text-xs font-semibold transition hover:bg-bg2"
              >
                Manage Inventory
                <ChevronRight className="h-4 w-4 text-mut" />
              </Link>
            </section>

            {/* Fulfillment */}
            <section className="rounded-2xl border border-bd bg-bg p-5">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-ac" />

                <h3 className="font-semibold">
                  Fulfillment
                </h3>
              </div>

              <div className="mt-4 divide-y divide-bd">
                <div className="flex items-center justify-between py-3">
                  <span className="text-xs text-mut">
                    Delivery
                  </span>

                  <span className="text-xs font-semibold">
                    {product.delivery}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-xs text-mut">
                    COD
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#7fb922]">
                    <Check className="h-3.5 w-3.5" />
                    Available
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-xs text-mut">
                    Returns
                  </span>

                  <span className="text-xs font-semibold">
                    Supported
                  </span>
                </div>
              </div>
            </section>

            {/* Danger */}
            <section className="rounded-2xl border border-red-500/20 bg-red-500/3 p-5">
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-red-500" />

                <h3 className="font-semibold text-red-500">
                  Remove Product
                </h3>
              </div>

              <p className="mt-2 text-xs leading-5 text-mut">
                Removing this product will hide it from your store.
                Your existing orders will not be affected.
              </p>

              <button
                type="button"
                onClick={() => setShowDelete(true)}
                className="mt-4 w-full rounded-xl border border-red-500/20 px-4 py-2.5 text-xs font-semibold text-red-500 transition hover:bg-red-500/10"
              >
                Remove from Store
              </button>
            </section>
          </aside>
        </div>

        {/* Bottom activity */}
        <section className="mt-6 rounded-2xl border border-bd bg-bg p-5 sm:p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold">
                Product Activity
              </h2>

              <p className="mt-1 text-xs text-mut">
                Recent changes and important product events.
              </p>
            </div>

            <button className="mt-3 text-xs font-semibold text-mut hover:text-fg sm:mt-0">
              View all activity
            </button>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Activity
              icon={Pencil}
              title="Selling price updated"
              description="Price changed from ৳1,790 to ৳1,890."
              time="Yesterday, 6:42 PM"
            />

            <Activity
              icon={Package}
              title="Stock replenished"
              description="20 new units were added to inventory."
              time="Oct 04, 2026 · 11:20 AM"
            />

            <Activity
              icon={ShoppingBag}
              title="Product sold"
              description="2 units were sold through order AM-10482."
              time="Today, 10:42 AM"
            />
          </div>
        </section>
      </div>

      {/* Delete modal */}
      {showDelete && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-bd bg-bg p-6 shadow-2xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
              <Trash2 className="h-5 w-5 text-red-500" />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Remove this product?
            </h2>

            <p className="mt-2 text-sm leading-6 text-mut">
              This will remove{" "}
              <span className="font-semibold text-fg">
                {product.name}
              </span>{" "}
              from your store. Existing orders will remain unchanged.
            </p>

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setShowDelete(false)}
                className="flex-1 rounded-xl border border-bd px-4 py-2.5 text-sm font-semibold transition hover:bg-bg2"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setShowDelete(false)}
                className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Remove Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Activity({ icon: Icon, title, description, time }) {
  return (
    <div className="flex gap-3 rounded-xl bg-bg2 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg">
        <Icon className="h-4 w-4 text-ac" />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold">{title}</p>

        <p className="mt-1 text-xs leading-5 text-mut">
          {description}
        </p>

        <p className="mt-2 flex items-center gap-1 text-[10px] text-mut">
          <Clock3 className="h-3 w-3" />
          {time}
        </p>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <span className="text-sm leading-none">
      +
    </span>
  );
}