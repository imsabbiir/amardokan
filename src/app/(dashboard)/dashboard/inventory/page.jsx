"use client";

import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  MoreHorizontal,
  Package,
  Plus,
  RefreshCw,
  Search,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";

const inventory = [
  {
    id: "P-1001",
    name: "Premium Oversized Hoodie",
    category: "Fashion",
    variant: "Black · XL",
    sku: "HOOD-OVR-BLK-XL",
    stock: 42,
    reserved: 6,
    available: 36,
    reorderPoint: 15,
    cost: 1250,
    status: "In Stock",
    updated: "12 min ago",
  },
  {
    id: "P-1002",
    name: "Essential Sweatshirt",
    category: "Fashion",
    variant: "Grey · L",
    sku: "SWT-ESS-GRY-L",
    stock: 8,
    reserved: 3,
    available: 5,
    reorderPoint: 15,
    cost: 990,
    status: "Low Stock",
    updated: "18 min ago",
  },
  {
    id: "P-1003",
    name: "Minimal Leather Wallet",
    category: "Accessories",
    variant: "Black",
    sku: "WLT-MIN-BLK",
    stock: 76,
    reserved: 8,
    available: 68,
    reorderPoint: 20,
    cost: 420,
    status: "In Stock",
    updated: "31 min ago",
  },
  {
    id: "P-1004",
    name: "Classic Canvas Backpack",
    category: "Bags",
    variant: "Black",
    sku: "BAG-CNV-BLK",
    stock: 31,
    reserved: 4,
    available: 27,
    reorderPoint: 12,
    cost: 850,
    status: "In Stock",
    updated: "42 min ago",
  },
  {
    id: "P-1005",
    name: "Everyday Running Shoes",
    category: "Footwear",
    variant: "White · 42",
    sku: "SHOE-RUN-WHT-42",
    stock: 5,
    reserved: 2,
    available: 3,
    reorderPoint: 12,
    cost: 1350,
    status: "Low Stock",
    updated: "1 hr ago",
  },
  {
    id: "P-1006",
    name: "Premium Cotton T-Shirt",
    category: "Fashion",
    variant: "White · L",
    sku: "TSH-CTN-WHT-L",
    stock: 94,
    reserved: 11,
    available: 83,
    reorderPoint: 25,
    cost: 480,
    status: "In Stock",
    updated: "1 hr ago",
  },
  {
    id: "P-1007",
    name: "Smart LED Desk Lamp",
    category: "Home",
    variant: "White",
    sku: "LMP-LED-WHT",
    stock: 0,
    reserved: 0,
    available: 0,
    reorderPoint: 10,
    cost: 620,
    status: "Out of Stock",
    updated: "2 hrs ago",
  },
  {
    id: "P-1008",
    name: "Stainless Steel Water Bottle",
    category: "Lifestyle",
    variant: "750ml · Black",
    sku: "BOT-SS-BLK-750",
    stock: 67,
    reserved: 9,
    available: 58,
    reorderPoint: 20,
    cost: 380,
    status: "In Stock",
    updated: "3 hrs ago",
  },
];

const movements = [
  {
    id: 1,
    product: "Premium Oversized Hoodie",
    variant: "Black · XL",
    type: "out",
    quantity: 2,
    reason: "Order #AM-10482",
    time: "12 min ago",
  },
  {
    id: 2,
    product: "Essential Sweatshirt",
    variant: "Grey · L",
    type: "out",
    quantity: 1,
    reason: "Order #AM-10471",
    time: "18 min ago",
  },
  {
    id: 3,
    product: "Premium Cotton T-Shirt",
    variant: "White · L",
    type: "in",
    quantity: 25,
    reason: "Stock replenishment",
    time: "1 hr ago",
  },
  {
    id: 4,
    product: "Minimal Leather Wallet",
    variant: "Black",
    type: "out",
    quantity: 4,
    reason: "Orders #AM-10465–AM-10468",
    time: "2 hrs ago",
  },
  {
    id: 5,
    product: "Everyday Running Shoes",
    variant: "White · 42",
    type: "out",
    quantity: 3,
    reason: "Order #AM-10452",
    time: "3 hrs ago",
  },
];

function formatPrice(price) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  helper,
  trend,
  tone = "default",
}) {
  const toneClasses = {
    default: "bg-bg text-fg",
    warning: "bg-amber-500/10 text-amber-600",
    danger: "bg-red-500/10 text-red-600",
    success: "bg-emerald-500/10 text-emerald-600",
  };

  return (
    <div className="rounded-2xl border border-bd bg-bg p-5">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        {trend && (
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" />
            {trend}
          </div>
        )}
      </div>

      <div className="mt-5">
        <p className="text-sm text-mut">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>

        {helper && (
          <p className="mt-1 text-xs text-mut">
            {helper}
          </p>
        )}
      </div>
    </div>
  );
}

function StockBadge({ status }) {
  const config = {
    "In Stock": {
      icon: CheckCircle2,
      className:
        "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    "Low Stock": {
      icon: AlertTriangle,
      className:
        "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    "Out of Stock": {
      icon: XCircle,
      className: "bg-red-500/10 text-red-600 border-red-500/20",
    },
  };

  const current = config[status] || config["In Stock"];
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${current.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  );
}

function ProductPlaceholder() {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-bd bg-bg2">
      <Package className="h-5 w-5 text-mut" />
    </div>
  );
}

function InventoryBar({ available, reorderPoint, status }) {
  const percentage =
    status === "Out of Stock"
      ? 0
      : Math.min((available / Math.max(reorderPoint * 3, 1)) * 100, 100);

  return (
    <div className="min-w-[120px]">
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium">{available} available</span>
        <span className="text-mut">min {reorderPoint}</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-bg2">
        <div
          className={`h-full rounded-full ${
            status === "Out of Stock"
              ? "bg-red-500"
              : status === "Low Stock"
              ? "bg-amber-500"
              : "bg-ac"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-bd px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-bg2">
        <Boxes className="h-5 w-5 text-mut" />
      </div>

      <h3 className="mt-4 text-base font-semibold">{title}</h3>

      <p className="mx-auto mt-1 max-w-md text-sm text-mut">
        {description}
      </p>
    </div>
  );
}

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("stock");
  const [showFilters, setShowFilters] = useState(false);

  const filteredInventory = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = inventory.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.variant.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "stock") {
        return a.available - b.available;
      }

      if (sortBy === "stock-high") {
        return b.available - a.available;
      }

      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "value") {
        return b.available * b.cost - a.available * a.cost;
      }

      return 0;
    });
  }, [search, statusFilter, categoryFilter, sortBy]);

  const totalUnits = inventory.reduce(
    (sum, item) => sum + item.stock,
    0
  );

  const availableUnits = inventory.reduce(
    (sum, item) => sum + item.available,
    0
  );

  const reservedUnits = inventory.reduce(
    (sum, item) => sum + item.reserved,
    0
  );

  const inventoryValue = inventory.reduce(
    (sum, item) => sum + item.stock * item.cost,
    0
  );

  const lowStockCount = inventory.filter(
    (item) => item.status === "Low Stock"
  ).length;

  const outOfStockCount = inventory.filter(
    (item) => item.status === "Out of Stock"
  ).length;

  const categories = [
    "All",
    ...new Set(inventory.map((item) => item.category)),
  ];

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

          <span className="text-fg">Inventory</span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ac/15 text-ac">
                <Boxes className="h-5 w-5" />
              </div>

              <span className="text-sm font-semibold text-ac">
                Inventory
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Manage your stock
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-mut sm:text-base">
              Monitor product availability, reserved stock, and
              inventory health from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-bd bg-bg px-4 py-2.5 text-sm font-semibold transition hover:bg-bg2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-bd bg-bg px-4 py-2.5 text-sm font-semibold transition hover:bg-bg2"
            >
              <Download className="h-4 w-4" />
              Export
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ac px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
            >
              <Plus className="h-4 w-4" />
              Add Stock
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={Boxes}
            label="Total Units"
            value={totalUnits.toLocaleString("en-BD")}
            helper={`${inventory.length} products tracked`}
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Available Stock"
            value={availableUnits.toLocaleString("en-BD")}
            helper={`${reservedUnits} units currently reserved`}
            tone="success"
          />

          <SummaryCard
            icon={AlertTriangle}
            label="Low Stock"
            value={lowStockCount}
            helper="Products below reorder point"
            tone="warning"
          />

          <SummaryCard
            icon={TrendingDown}
            label="Inventory Value"
            value={formatPrice(inventoryValue)}
            helper={`${outOfStockCount} products out of stock`}
          />
        </div>

        {/* Inventory Health */}
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-bd bg-bg p-5 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-base font-semibold">
                  Inventory health
                </h2>

                <p className="mt-1 text-sm text-mut">
                  Keep an eye on products that may need attention.
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Healthy
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-bd bg-bg2 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mut">
                    Available
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>

                <p className="mt-3 text-2xl font-bold">
                  {availableUnits}
                </p>

                <p className="mt-1 text-xs text-mut">
                  Sellable units
                </p>
              </div>

              <div className="rounded-xl border border-bd bg-bg2 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mut">
                    Reserved
                  </span>
                  <Clock3 className="h-4 w-4 text-amber-600" />
                </div>

                <p className="mt-3 text-2xl font-bold">
                  {reservedUnits}
                </p>

                <p className="mt-1 text-xs text-mut">
                  Pending fulfillment
                </p>
              </div>

              <div className="rounded-xl border border-bd bg-bg2 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mut">
                    Attention
                  </span>
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>

                <p className="mt-3 text-2xl font-bold">
                  {lowStockCount + outOfStockCount}
                </p>

                <p className="mt-1 text-xs text-mut">
                  Need action
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-bd bg-bg p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">
                  Stock alerts
                </h2>

                <p className="mt-1 text-sm text-mut">
                  Products requiring attention.
                </p>
              </div>

              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>

            <div className="mt-5 space-y-3">
              {inventory
                .filter(
                  (item) =>
                    item.status === "Low Stock" ||
                    item.status === "Out of Stock"
                )
                .slice(0, 3)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-bd bg-bg2 p-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <ProductPlaceholder />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {item.name}
                        </p>

                        <p className="mt-0.5 text-xs text-mut">
                          {item.variant}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p
                        className={`text-sm font-bold ${
                          item.status === "Out of Stock"
                            ? "text-red-600"
                            : "text-amber-600"
                        }`}
                      >
                        {item.available}
                      </p>

                      <p className="text-[11px] text-mut">
                        available
                      </p>
                    </div>
                  </div>
                ))}

              <button
                type="button"
                onClick={() => setStatusFilter("Low Stock")}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-bd py-2.5 text-xs font-semibold transition hover:bg-bg2"
              >
                View low stock products
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Inventory */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-bd bg-bg">
          {/* Toolbar */}
          <div className="border-b border-bd p-4 sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative w-full xl:max-w-md">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search product, variant or SKU..."
                  className="h-11 w-full rounded-xl border border-bd bg-bg2 pl-10 pr-4 text-sm outline-none transition placeholder:text-mut focus:border-ac"
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-11 rounded-xl border border-bd bg-bg2 px-3 text-sm font-medium outline-none focus:border-ac"
                >
                  <option value="stock">
                    Lowest stock first
                  </option>
                  <option value="stock-high">
                    Highest stock first
                  </option>
                  <option value="value">
                    Highest inventory value
                  </option>
                  <option value="name">
                    Product name
                  </option>
                </select>

                <button
                  type="button"
                  onClick={() => setShowFilters((prev) => !prev)}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                    showFilters
                      ? "border-ac bg-ac/10 text-ac"
                      : "border-bd bg-bg2 hover:bg-bg"
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 grid gap-3 border-t border-bd pt-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-mut">
                    Stock status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-10 w-full rounded-xl border border-bd bg-bg2 px-3 text-sm outline-none focus:border-ac"
                  >
                    <option>All</option>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-mut">
                    Category
                  </label>

                  <select
                    value={categoryFilter}
                    onChange={(e) =>
                      setCategoryFilter(e.target.value)
                    }
                    className="h-10 w-full rounded-xl border border-bd bg-bg2 px-3 text-sm outline-none focus:border-ac"
                  >
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("All");
                      setCategoryFilter("All");
                    }}
                    className="h-10 w-full rounded-xl border border-bd text-sm font-semibold transition hover:bg-bg2"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                ["All", "All"],
                ["In Stock", "In Stock"],
                ["Low Stock", "Low Stock"],
                ["Out of Stock", "Out of Stock"],
              ].map(([label, value]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatusFilter(value)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    statusFilter === value
                      ? "bg-fg text-bg"
                      : "bg-bg2 text-mut hover:text-fg"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            {filteredInventory.length > 0 ? (
              <table className="w-full min-w-[950px]">
                <thead>
                  <tr className="border-b border-bd bg-bg2/50 text-left">
                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Product
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Status
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Stock
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Reserved
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Available
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Stock Value
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold text-mut">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredInventory.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-bd last:border-0"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <ProductPlaceholder />

                          <div className="min-w-0">
                            <Link
                              href={`/dashboard/products/${item.id}`}
                              className="block truncate text-sm font-semibold transition hover:text-ac"
                            >
                              {item.name}
                            </Link>

                            <p className="mt-0.5 text-xs text-mut">
                              {item.variant}
                            </p>

                            <p className="mt-0.5 text-[11px] text-mut">
                              {item.sku}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <StockBadge status={item.status} />
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm font-semibold">
                          {item.stock}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm text-mut">
                          {item.reserved}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <InventoryBar
                          available={item.available}
                          reorderPoint={item.reorderPoint}
                          status={item.status}
                        />
                      </td>

                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-semibold">
                            {formatPrice(item.stock * item.cost)}
                          </p>

                          <p className="mt-0.5 text-xs text-mut">
                            {formatPrice(item.cost)} / unit
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-bd transition hover:bg-bg2"
                          aria-label={`More actions for ${item.name}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-5">
                <EmptyState
                  title="No inventory found"
                  description="Try changing your search or filters."
                />
              </div>
            )}
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-bd lg:hidden">
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <div key={item.id} className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <ProductPlaceholder />

                      <div className="min-w-0">
                        <Link
                          href={`/dashboard/products/${item.id}`}
                          className="block truncate text-sm font-semibold hover:text-ac"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-0.5 text-xs text-mut">
                          {item.variant}
                        </p>

                        <p className="mt-0.5 text-[11px] text-mut">
                          {item.sku}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-bd"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4">
                    <StockBadge status={item.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-bg2 p-3">
                      <p className="text-[11px] text-mut">
                        Stock
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {item.stock}
                      </p>
                    </div>

                    <div className="rounded-xl bg-bg2 p-3">
                      <p className="text-[11px] text-mut">
                        Reserved
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {item.reserved}
                      </p>
                    </div>

                    <div className="rounded-xl bg-bg2 p-3">
                      <p className="text-[11px] text-mut">
                        Available
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {item.available}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <InventoryBar
                      available={item.available}
                      reorderPoint={item.reorderPoint}
                      status={item.status}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-bd pt-4">
                    <div>
                      <p className="text-[11px] text-mut">
                        Inventory value
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {formatPrice(item.stock * item.cost)}
                      </p>
                    </div>

                    <Link
                      href={`/dashboard/products/${item.id}`}
                      className="text-xs font-semibold text-ac hover:underline"
                    >
                      View product
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-5">
                <EmptyState
                  title="No inventory found"
                  description="Try changing your search or filters."
                />
              </div>
            )}
          </div>
        </div>

        {/* Stock Movement */}
        <div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-2xl border border-bd bg-bg">
            <div className="flex items-center justify-between border-b border-bd p-5">
              <div>
                <h2 className="text-base font-semibold">
                  Recent stock movement
                </h2>

                <p className="mt-1 text-sm text-mut">
                  Latest inventory changes across your products.
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-semibold text-ac hover:underline"
              >
                View all
              </button>
            </div>

            <div className="divide-y divide-bd">
              {movements.map((movement) => (
                <div
                  key={movement.id}
                  className="flex items-center justify-between gap-4 p-4 sm:p-5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        movement.type === "in"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      {movement.type === "in" ? (
                        <ArrowDownToLine className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {movement.product}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-mut">
                        {movement.variant} · {movement.reason}
                      </p>

                      <p className="mt-0.5 text-[11px] text-mut">
                        {movement.time}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={`text-sm font-bold ${
                        movement.type === "in"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {movement.type === "in" ? "+" : "-"}
                      {movement.quantity}
                    </p>

                    <p className="text-[11px] text-mut">
                      units
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reorder Recommendations */}
          <div className="rounded-2xl border border-bd bg-bg p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ac/10 text-ac">
                <RefreshCw className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-base font-semibold">
                  Reorder recommendations
                </h2>

                <p className="mt-1 text-sm leading-5 text-mut">
                  Based on your current available stock and
                  reorder points.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {inventory
                .filter(
                  (item) => item.available <= item.reorderPoint
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-bd bg-bg2 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-mut">
                          {item.variant}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs font-bold text-amber-600">
                        {item.available} left
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-mut">
                        Reorder point
                      </span>

                      <span className="font-semibold">
                        {item.reorderPoint} units
                      </span>
                    </div>

                    <button
                      type="button"
                      className="mt-3 w-full rounded-lg border border-bd bg-bg py-2 text-xs font-semibold transition hover:bg-bg2"
                    >
                      Restock product
                    </button>
                  </div>
                ))}
            </div>

            <div className="mt-5 rounded-xl border border-ac/20 bg-ac/5 p-4">
              <div className="flex gap-3">
                <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-ac" />

                <p className="text-xs leading-5 text-mut">
                  Keeping a small safety buffer can help prevent
                  missed orders when a product starts trending.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-bd bg-bg2 p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-ac">
                <Boxes className="h-5 w-5" />
                <span className="text-sm font-semibold">
                  Need more products?
                </span>
              </div>

              <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
                Browse the AmarDokan catalog
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-mut">
                Find products with healthy stock levels, strong
                margins, and potential for your store.
              </p>
            </div>

            <Link
              href="/dashboard/products"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-ac px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
            >
              Browse products
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}