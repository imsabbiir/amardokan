"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  ChevronDown,
  Eye,
  MoreHorizontal,
  Package,
  Pencil,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  TrendingUp,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: "SP-1001",
    name: "Premium Oversized Hoodie",
    category: "Fashion",
    variant: "Black · XL",
    sku: "HOOD-OVR-BLK-XL",
    cost: 1250,
    sellingPrice: 1890,
    stock: 42,
    orders: 128,
    revenue: 241920,
    status: "Published",
    image: null,
  },
  {
    id: "SP-1002",
    name: "Essential Sweatshirt",
    category: "Fashion",
    variant: "Grey · L",
    sku: "SWT-ESS-GRY-L",
    cost: 990,
    sellingPrice: 1490,
    stock: 8,
    orders: 96,
    revenue: 143040,
    status: "Published",
    image: null,
  },
  {
    id: "SP-1003",
    name: "Minimal Leather Wallet",
    category: "Accessories",
    variant: "Black",
    sku: "WLT-MIN-BLK",
    cost: 420,
    sellingPrice: 790,
    stock: 76,
    orders: 184,
    revenue: 145360,
    status: "Published",
    image: null,
  },
  {
    id: "SP-1004",
    name: "Classic Canvas Backpack",
    category: "Bags",
    variant: "Black",
    sku: "BAG-CNV-BLK",
    cost: 850,
    sellingPrice: 1290,
    stock: 31,
    orders: 72,
    revenue: 92880,
    status: "Draft",
    image: null,
  },
  {
    id: "SP-1005",
    name: "Everyday Running Shoes",
    category: "Footwear",
    variant: "White · 42",
    sku: "SHOE-RUN-WHT-42",
    cost: 1350,
    sellingPrice: 1990,
    stock: 5,
    orders: 61,
    revenue: 121390,
    status: "Published",
    image: null,
  },
  {
    id: "SP-1006",
    name: "Premium Cotton T-Shirt",
    category: "Fashion",
    variant: "White · L",
    sku: "TSH-CTN-WHT-L",
    cost: 480,
    sellingPrice: 890,
    stock: 94,
    orders: 210,
    revenue: 186900,
    status: "Published",
    image: null,
  },
  {
    id: "SP-1007",
    name: "Smart LED Desk Lamp",
    category: "Home",
    variant: "White",
    sku: "LMP-LED-WHT",
    cost: 620,
    sellingPrice: 1090,
    stock: 0,
    orders: 48,
    revenue: 52320,
    status: "Out of Stock",
    image: null,
  },
  {
    id: "SP-1008",
    name: "Stainless Steel Water Bottle",
    category: "Lifestyle",
    variant: "750ml · Black",
    sku: "BOT-SS-BLK-750",
    cost: 380,
    sellingPrice: 690,
    stock: 67,
    orders: 142,
    revenue: 97980,
    status: "Published",
    image: null,
  },
];

const tabs = [
  { id: "all", label: "All Products" },
  { id: "published", label: "Published" },
  { id: "draft", label: "Drafts" },
  { id: "out-of-stock", label: "Out of Stock" },
];

function formatPrice(price) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function getProfit(product) {
  return product.sellingPrice - product.cost;
}

function getMargin(product) {
  return Math.round(
    ((product.sellingPrice - product.cost) / product.sellingPrice) * 100
  );
}

function StatusBadge({ status }) {
  const styles = {
    Published:
      "bg-[#a3db4a]/10 text-[#7fb922] border-[#a3db4a]/20",
    Draft:
      "bg-slate-500/10 text-slate-500 border-slate-500/20",
    "Out of Stock":
      "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
        styles[status] || ""
      }`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function StockBadge({ stock }) {
  if (stock === 0) {
    return (
      <span className="text-xs font-semibold text-red-500">
        Out of stock
      </span>
    );
  }

  if (stock <= 10) {
    return (
      <span className="text-xs font-semibold text-amber-500">
        {stock} left
      </span>
    );
  }

  return (
    <span className="text-xs font-medium text-mut">
      {stock} in stock
    </span>
  );
}

function SummaryCard({ icon: Icon, label, value, description }) {
  return (
    <div className="rounded-2xl border border-bd bg-bg p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg2">
          <Icon className="h-5 w-5 text-ac" />
        </div>

        <MoreHorizontal className="h-5 w-5 text-mut" />
      </div>

      <p className="mt-5 text-sm text-mut">{label}</p>

      <p className="mt-1 text-2xl font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-xs text-mut">{description}</p>
    </div>
  );
}

function ProductImage({ product }) {
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-bd bg-bg2">
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="h-full w-full rounded-xl object-cover"
        />
      ) : (
        <Package className="h-6 w-6 text-mut" />
      )}
    </div>
  );
}

export default function StoreProductsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("Newest");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeTab === "published") {
      result = result.filter((product) => product.status === "Published");
    }

    if (activeTab === "draft") {
      result = result.filter((product) => product.status === "Draft");
    }

    if (activeTab === "out-of-stock") {
      result = result.filter(
        (product) => product.status === "Out of Stock"
      );
    }

    if (category !== "All Categories") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    if (sort === "Highest Profit") {
      result.sort(
        (a, b) =>
          getProfit(b) - getProfit(a)
      );
    }

    if (sort === "Most Orders") {
      result.sort((a, b) => b.orders - a.orders);
    }

    if (sort === "Lowest Stock") {
      result.sort((a, b) => a.stock - b.stock);
    }

    return result;
  }, [activeTab, category, search, sort]);

  const allSelected =
    filteredProducts.length > 0 &&
    filteredProducts.every((product) =>
      selectedProducts.includes(product.id)
    );

  function toggleProduct(id) {
    setSelectedProducts((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function toggleAll() {
    if (allSelected) {
      setSelectedProducts([]);
      return;
    }

    setSelectedProducts(filteredProducts.map((product) => product.id));
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-mut">
          <Link
            href="/dashboard"
            className="transition hover:text-fg"
          >
            Overview
          </Link>

          <span>/</span>

          <span className="text-fg">My Store Products</span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-bd bg-bg2 px-3 py-1.5 text-xs font-medium text-mut">
              <ShoppingBag className="h-3.5 w-3.5" />
              Your Store
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Store Products
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-mut sm:text-base">
              Manage the products you sell, update prices, monitor stock,
              and keep your storefront ready for customers.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-bd bg-bg px-4 py-2.5 text-sm font-semibold transition hover:bg-bg2"
            >
              <Upload className="h-4 w-4" />
              Import
            </button>

            <Link
              href="/dashboard/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ac px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
            >
              <Plus className="h-4 w-4" />
              Add Products
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={ShoppingBag}
            label="Store Products"
            value={products.length}
            description="Products currently in your store"
          />

          <SummaryCard
            icon={Eye}
            label="Published"
            value={products.filter(
              (p) => p.status === "Published"
            ).length}
            description="Visible to your customers"
          />

          <SummaryCard
            icon={TrendingUp}
            label="Total Orders"
            value={products
              .reduce((sum, product) => sum + product.orders, 0)
              .toLocaleString("en-BD")}
            description="Orders generated by these products"
          />

          <SummaryCard
            icon={Package}
            label="Low Stock"
            value={products.filter(
              (p) => p.stock > 0 && p.stock <= 10
            ).length}
            description="Products that need attention"
          />
        </div>

        {/* Main workspace */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-bd bg-bg">

          {/* Tabs */}
          <div className="border-b border-bd px-4 pt-2 sm:px-6">
            <div className="flex gap-6 overflow-x-auto">
              {tabs.map((tab) => {
                const count =
                  tab.id === "all"
                    ? products.length
                    : tab.id === "published"
                    ? products.filter(
                        (p) => p.status === "Published"
                      ).length
                    : tab.id === "draft"
                    ? products.filter(
                        (p) => p.status === "Draft"
                      ).length
                    : products.filter(
                        (p) => p.status === "Out of Stock"
                      ).length;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative whitespace-nowrap py-4 text-sm font-semibold transition ${
                      activeTab === tab.id
                        ? "text-fg"
                        : "text-mut hover:text-fg"
                    }`}
                  >
                    {tab.label}

                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${
                        activeTab === tab.id
                          ? "bg-ac text-slate-950"
                          : "bg-bg2 text-mut"
                      }`}
                    >
                      {count}
                    </span>

                    {activeTab === tab.id && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-ac" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toolbar */}
          <div className="border-b border-bd p-4 sm:p-6">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

              <div className="relative w-full xl:max-w-md">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, SKU..."
                  className="h-11 w-full rounded-xl border border-bd bg-bg2 pl-10 pr-4 text-sm outline-none transition placeholder:text-mut focus:border-ac"
                />
              </div>

              <div className="flex flex-wrap gap-2">

                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-11 appearance-none rounded-xl border border-bd bg-bg2 py-0 pl-4 pr-10 text-sm font-medium outline-none focus:border-ac"
                  >
                    <option>All Categories</option>
                    <option>Fashion</option>
                    <option>Accessories</option>
                    <option>Bags</option>
                    <option>Footwear</option>
                    <option>Home</option>
                    <option>Lifestyle</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />
                </div>

                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="h-11 appearance-none rounded-xl border border-bd bg-bg2 py-0 pl-4 pr-10 text-sm font-medium outline-none focus:border-ac"
                  >
                    <option>Newest</option>
                    <option>Highest Profit</option>
                    <option>Most Orders</option>
                    <option>Lowest Stock</option>
                  </select>

                  <ArrowDownUp className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />
                </div>

                <button
                  type="button"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-bd bg-bg2 px-4 text-sm font-semibold transition hover:bg-bg"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Bulk actions */}
            {selectedProducts.length > 0 && (
              <div className="mt-4 flex flex-col gap-3 rounded-xl border border-ac/20 bg-ac/5 p-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium">
                  {selectedProducts.length} product
                  {selectedProducts.length > 1 ? "s" : ""} selected
                </p>

                <div className="flex flex-wrap gap-2">
                  <button className="rounded-lg border border-bd bg-bg px-3 py-2 text-xs font-semibold">
                    Publish
                  </button>

                  <button className="rounded-lg border border-bd bg-bg px-3 py-2 text-xs font-semibold">
                    Unpublish
                  </button>

                  <button className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs font-semibold text-red-500">
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-275">
              <thead>
                <tr className="border-b border-bd bg-bg2/50 text-left">
                  <th className="w-12 px-6 py-4">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border-bd accent-[#a3db4a]"
                    />
                  </th>

                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-mut">
                    Product
                  </th>

                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-mut">
                    Status
                  </th>

                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-mut">
                    Price
                  </th>

                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-mut">
                    Profit
                  </th>

                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-mut">
                    Stock
                  </th>

                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-mut">
                    Orders
                  </th>

                  <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wide text-mut">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-bd">
                {filteredProducts.map((product) => {
                  const profit = getProfit(product);
                  const margin = getMargin(product);
                  const selected = selectedProducts.includes(product.id);

                  return (
                    <tr
                      key={product.id}
                      className={`transition hover:bg-bg2/40 ${
                        selected ? "bg-ac/5" : ""
                      }`}
                    >
                      <td className="px-6 py-5">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleProduct(product.id)}
                          className="h-4 w-4 rounded border-bd accent-[#a3db4a]"
                        />
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          <ProductImage product={product} />

                          <div className="min-w-0">
                            <Link
                              href={`/dashboard/my-store/${product.id}`}
                              className="block max-w-62.5 truncate text-sm font-semibold hover:text-ac"
                            >
                              {product.name}
                            </Link>

                            <p className="mt-1 text-xs text-mut">
                              {product.variant}
                            </p>

                            <p className="mt-0.5 text-[11px] text-mut">
                              {product.sku}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-5">
                        <StatusBadge status={product.status} />
                      </td>

                      <td className="px-4 py-5">
                        <p className="text-sm font-semibold">
                          {formatPrice(product.sellingPrice)}
                        </p>

                        <p className="mt-1 text-xs text-mut">
                          Cost {formatPrice(product.cost)}
                        </p>
                      </td>

                      <td className="px-4 py-5">
                        <p className="text-sm font-semibold text-[#7fb922]">
                          {formatPrice(profit)}
                        </p>

                        <p className="mt-1 text-xs text-mut">
                          {margin}% margin
                        </p>
                      </td>

                      <td className="px-4 py-5">
                        <StockBadge stock={product.stock} />
                      </td>

                      <td className="px-4 py-5">
                        <p className="text-sm font-semibold">
                          {product.orders.toLocaleString("en-BD")}
                        </p>

                        <p className="mt-1 text-xs text-mut">
                          {formatPrice(product.revenue)}
                        </p>
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex justify-end gap-1">
                          <Link
                            href={`/dashboard/my-store/${product.id}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-mut transition hover:bg-bg2 hover:text-fg"
                            title="View product"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>

                          <button
                            type="button"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-mut transition hover:bg-red-500/10 hover:text-red-500"
                            title="Remove product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-bd lg:hidden">
            {filteredProducts.map((product) => {
              const profit = getProfit(product);
              const margin = getMargin(product);
              const selected = selectedProducts.includes(product.id);

              return (
                <div
                  key={product.id}
                  className={`p-4 sm:p-5 ${
                    selected ? "bg-ac/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleProduct(product.id)}
                      className="mt-2 h-4 w-4 shrink-0 accent-[#a3db4a]"
                    />

                    <ProductImage product={product} />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            href={`/dashboard/store-products/${product.id}`}
                            className="block truncate text-sm font-semibold"
                          >
                            {product.name}
                          </Link>

                          <p className="mt-1 text-xs text-mut">
                            {product.variant}
                          </p>

                          <p className="mt-0.5 text-[11px] text-mut">
                            {product.sku}
                          </p>
                        </div>

                        <StatusBadge status={product.status} />
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-bg2 p-3">
                          <p className="text-[11px] text-mut">
                            Selling Price
                          </p>
                          <p className="mt-1 text-sm font-bold">
                            {formatPrice(product.sellingPrice)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-bg2 p-3">
                          <p className="text-[11px] text-mut">
                            Profit
                          </p>
                          <p className="mt-1 text-sm font-bold text-[#7fb922]">
                            {formatPrice(profit)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-bg2 p-3">
                          <p className="text-[11px] text-mut">
                            Stock
                          </p>
                          <div className="mt-1">
                            <StockBadge stock={product.stock} />
                          </div>
                        </div>

                        <div className="rounded-xl bg-bg2 p-3">
                          <p className="text-[11px] text-mut">
                            Orders
                          </p>
                          <p className="mt-1 text-sm font-bold">
                            {product.orders}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Link
                          href={`/dashboard/store-products/${product.id}`}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-bd px-3 py-2.5 text-xs font-semibold transition hover:bg-bg2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Link>

                        <Link
                          href={`/dashboard/store-products/${product.id}/edit`}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-ac px-3 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-[#7fb922]"
                        >
                          <Pencil className="h-4 w-4" />
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="px-6 py-20 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-bg2">
                <Package className="h-6 w-6 text-mut" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                No products found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mut">
                Try changing your search or filters, or add products
                from the AmarDokan catalog.
              </p>

              <Link
                href="/dashboard/products"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ac px-4 py-2.5 text-sm font-semibold text-slate-950"
              >
                <Plus className="h-4 w-4" />
                Browse Products
              </Link>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-bd bg-bg2 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="font-semibold">
              Looking for more products to sell?
            </p>

            <p className="mt-1 text-sm text-mut">
              Browse the AmarDokan catalog and add new products to
              your store.
            </p>
          </div>

          <Link
            href="/dashboard/products"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-ac px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
          >
            Browse Catalog
            <Plus className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}