"use client";

import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronDown,
  ChevronRight,
  Filter,
  Heart,
  Package,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  TrendingUp,
  Truck,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

const products = [
  {
    id: "P-1001",
    name: "Premium Oversized Hoodie",
    category: "Fashion",
    variant: "Black · XL",
    sku: "HOOD-OVR-BLK-XL",
    cost: 1250,
    suggestedPrice: 1890,
    stock: 42,
    rating: 4.8,
    orders: 128,
    status: "Available",
    trending: true,
    image: null,
  },
  {
    id: "P-1002",
    name: "Essential Sweatshirt",
    category: "Fashion",
    variant: "Grey · L",
    sku: "SWT-ESS-GRY-L",
    cost: 990,
    suggestedPrice: 1490,
    stock: 8,
    rating: 4.7,
    orders: 96,
    status: "Low Stock",
    trending: true,
    image: null,
  },
  {
    id: "P-1003",
    name: "Minimal Leather Wallet",
    category: "Accessories",
    variant: "Black",
    sku: "WLT-MIN-BLK",
    cost: 420,
    suggestedPrice: 790,
    stock: 76,
    rating: 4.9,
    orders: 184,
    status: "Available",
    trending: true,
    image: null,
  },
  {
    id: "P-1004",
    name: "Classic Canvas Backpack",
    category: "Bags",
    variant: "Black",
    sku: "BAG-CNV-BLK",
    cost: 850,
    suggestedPrice: 1290,
    stock: 31,
    rating: 4.6,
    orders: 72,
    status: "Available",
    trending: false,
    image: null,
  },
  {
    id: "P-1005",
    name: "Everyday Running Shoes",
    category: "Footwear",
    variant: "White · 42",
    sku: "SHOE-RUN-WHT-42",
    cost: 1350,
    suggestedPrice: 1990,
    stock: 5,
    rating: 4.5,
    orders: 61,
    status: "Low Stock",
    trending: true,
    image: null,
  },
  {
    id: "P-1006",
    name: "Premium Cotton T-Shirt",
    category: "Fashion",
    variant: "White · L",
    sku: "TSH-CTN-WHT-L",
    cost: 480,
    suggestedPrice: 890,
    stock: 94,
    rating: 4.8,
    orders: 210,
    status: "Available",
    trending: false,
    image: null,
  },
  {
    id: "P-1007",
    name: "Smart LED Desk Lamp",
    category: "Home",
    variant: "White",
    sku: "LMP-LED-WHT",
    cost: 620,
    suggestedPrice: 1090,
    stock: 0,
    rating: 4.4,
    orders: 48,
    status: "Out of Stock",
    trending: false,
    image: null,
  },
  {
    id: "P-1008",
    name: "Stainless Steel Water Bottle",
    category: "Lifestyle",
    variant: "750ml · Black",
    sku: "BOT-SS-BLK-750",
    cost: 380,
    suggestedPrice: 690,
    stock: 67,
    rating: 4.7,
    orders: 142,
    status: "Available",
    trending: true,
    image: null,
  },
];

const categories = [
  "All Products",
  "Fashion",
  "Accessories",
  "Bags",
  "Footwear",
  "Home",
  "Lifestyle",
];

const sortOptions = [
  "Recommended",
  "Newest",
  "Best Selling",
  "Highest Profit",
  "Lowest Cost",
];

function formatPrice(price) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function getProfit(product) {
  return product.suggestedPrice - product.cost;
}

function getMargin(product) {
  return Math.round(
    ((product.suggestedPrice - product.cost) /
      product.suggestedPrice) *
      100
  );
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] =
    useState("All Products");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [savedProducts, setSavedProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All Products" ||
        product.category === activeCategory;

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sort === "Newest") {
      result = [...result].reverse();
    }

    if (sort === "Best Selling") {
      result = [...result].sort(
        (a, b) => b.orders - a.orders
      );
    }

    if (sort === "Highest Profit") {
      result = [...result].sort(
        (a, b) =>
          getProfit(b) - getProfit(a)
      );
    }

    if (sort === "Lowest Cost") {
      result = [...result].sort(
        (a, b) => a.cost - b.cost
      );
    }

    return result;
  }, [activeCategory, search, sort]);

  const toggleSaved = (id) => {
    setSavedProducts((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const addProduct = (id) => {
    setAddedProducts((current) =>
      current.includes(id)
        ? current
        : [...current, id]
    );
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-bg">
      <div className="mx-auto max-w-360 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* Header */}
        <div className="mb-7">
          <div className="mb-3 flex items-center gap-2 text-xs text-mut">
            <Link
              href="/dashboard"
              className="transition hover:text-fg"
            >
              Overview
            </Link>

            <ChevronRight className="size-3.5" />

            <span className="text-fg">
              Products
            </span>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="hidden size-11 items-center justify-center rounded-xl bg-ac/10 sm:flex">
                  <ShoppingBag className="size-5 text-ac" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Products
                  </h1>

                  <p className="mt-1 text-sm text-mut">
                    Discover products, check margins, and add products to your store.
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

                <span className="hidden sm:inline">
                  Export
                </span>
              </button>

              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-ac px-4 text-sm font-semibold text-slate-950 transition hover:bg-ac/85"
              >
                <Plus className="size-4" />
                Add product
              </button>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <SummaryCard
            icon={Package}
            label="Catalog products"
            value="248"
            description="available to sell"
          />

          <SummaryCard
            icon={TrendingUp}
            label="Trending products"
            value="36"
            description="high demand"
            trend="+14.8%"
          />

          <SummaryCard
            icon={Boxes}
            label="Low stock"
            value="14"
            description="need attention"
          />

          <SummaryCard
            icon={Truck}
            label="Avg. delivery"
            value="2–4 days"
            description="nationwide"
          />
        </div>

        {/* Main */}
        <section className="overflow-hidden rounded-2xl border border-bd bg-bg">

          {/* Toolbar */}
          <div className="border-b border-bd p-4 sm:p-5">

            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

              {/* Search */}
              <div className="relative w-full xl:max-w-md">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-mut" />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search products, SKU, or category..."
                  className="h-10 w-full rounded-xl border border-bd bg-bg2 pl-10 pr-4 text-sm outline-none transition placeholder:text-mut/70 focus:border-ac focus:ring-4 focus:ring-ac/10"
                />
              </div>

              <div className="flex items-center gap-2">

                {/* Sort */}
                <div className="relative hidden sm:block">
                  <select
                    value={sort}
                    onChange={(e) =>
                      setSort(e.target.value)
                    }
                    className="h-10 appearance-none rounded-xl border border-bd bg-bg2 pl-3.5 pr-9 text-xs font-medium outline-none transition focus:border-ac focus:ring-4 focus:ring-ac/10"
                  >
                    {sortOptions.map((option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-mut" />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowFilters((value) => !value)
                  }
                  className={`inline-flex h-10 items-center gap-2 rounded-xl border px-3.5 text-xs font-semibold transition ${
                    showFilters
                      ? "border-ac bg-ac/10 text-ac"
                      : "border-bd bg-bg2 hover:bg-bg"
                  }`}
                >
                  <SlidersHorizontal className="size-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Category tabs */}
            <div className="mt-5 flex gap-1 overflow-x-auto pb-1">
              {categories.map((category) => {
                const active =
                  activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(category)
                    }
                    className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                      active
                        ? "bg-fg text-bg"
                        : "text-mut hover:bg-bg2 hover:text-fg"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Mobile sort */}
            {showFilters && (
              <div className="mt-4 grid gap-3 rounded-xl border border-bd bg-bg2/40 p-3 sm:grid-cols-3">
                <FilterSelect
                  label="Sort by"
                  value={sort}
                  onChange={setSort}
                  options={sortOptions}
                />

                <FilterSelect
                  label="Stock"
                  value="All stock"
                  onChange={() => {}}
                  options={[
                    "All stock",
                    "Available",
                    "Low Stock",
                    "Out of Stock",
                  ]}
                />

                <FilterSelect
                  label="Margin"
                  value="Any margin"
                  onChange={() => {}}
                  options={[
                    "Any margin",
                    "40%+",
                    "50%+",
                    "60%+",
                  ]}
                />
              </div>
            )}
          </div>

          {/* Results info */}
          <div className="flex items-center justify-between border-b border-bd bg-bg2/30 px-4 py-3 sm:px-5">
            <p className="text-[11px] text-mut">
              Showing{" "}
              <span className="font-semibold text-fg">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            <div className="flex items-center gap-2 text-[11px] text-mut">
              <span className="hidden sm:inline">
                Seller cost
              </span>

              <span className="size-1 rounded-full bg-bd" />

              <span>
                Suggested selling price
              </span>
            </div>
          </div>

          {/* Product grid */}
          {filteredProducts.length ? (
            <div className="grid gap-px bg-bd sm:grid-cols-2 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  saved={savedProducts.includes(product.id)}
                  added={addedProducts.includes(product.id)}
                  onToggleSave={() =>
                    toggleSaved(product.id)
                  }
                  onAdd={() =>
                    addProduct(product.id)
                  }
                />
              ))}
            </div>
          ) : (
            <EmptyState
              onReset={() => {
                setSearch("");
                setActiveCategory("All Products");
              }}
            />
          )}

          {/* Footer */}
          {filteredProducts.length > 0 && (
            <div className="border-t border-bd bg-bg2/30 px-5 py-4 text-center">
              <button
                type="button"
                className="text-xs font-semibold text-mut transition hover:text-fg"
              >
                Load more products
              </button>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-bd bg-bg2/50">
          <div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ac/10">
                <TrendingUp className="size-5 text-ac" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Not sure what to sell?
                </h2>

                <p className="mt-1 max-w-xl text-xs leading-5 text-mut">
                  Explore trending products with healthy margins and growing
                  customer demand.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-fit shrink-0 items-center gap-2 rounded-xl bg-fg px-4 text-xs font-semibold text-bg transition hover:opacity-90"
            >
              Explore trending
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

/* -------------------------------------------------
   Summary Card
------------------------------------------------- */

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  trend,
}) {
  return (
    <div className="rounded-2xl border border-bd bg-bg p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-mut">
            {label}
          </p>

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

        <span className="text-xs text-mut">
          {description}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------
   Product Card
------------------------------------------------- */

function ProductCard({
  product,
  saved,
  added,
  onToggleSave,
  onAdd,
}) {
  const profit = getProfit(product);
  const margin = getMargin(product);

  const stockClass =
    product.status === "Available"
      ? "bg-ac/10 text-ac"
      : product.status === "Low Stock"
        ? "bg-amber-500/10 text-amber-600"
        : "bg-red-500/10 text-red-600";

  return (
    <article className="group relative bg-bg p-4 transition hover:z-10 hover:bg-bg2/30 sm:p-5">

      {/* Product image */}
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-bd bg-bg2">
        {/* Placeholder image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-bg">
            <Package className="size-7 text-mut/60" />
          </div>
        </div>

        {/* Trending */}
        {product.trending && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-fg px-2.5 py-1 text-[9px] font-bold text-bg">
            <TrendingUp className="size-3" />
            Trending
          </div>
        )}

        {/* Save */}
        <button
          type="button"
          onClick={onToggleSave}
          aria-label={
            saved
              ? "Remove from saved products"
              : "Save product"
          }
          className={`absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg border transition ${
            saved
              ? "border-ac/20 bg-ac/10 text-ac"
              : "border-bd bg-bg/90 text-mut hover:text-fg"
          }`}
        >
          <Heart
            className="size-4"
            fill={saved ? "currentColor" : "none"}
          />
        </button>

        {/* Stock */}
        <span
          className={`absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[9px] font-bold ${stockClass}`}
        >
          {product.status}
        </span>
      </div>

      {/* Content */}
      <div className="pt-4">

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-medium text-mut">
              {product.category}
            </p>

            <Link
              href={`/dashboard/products/${product.id}`}
              className="mt-1 block text-sm font-semibold leading-5 transition hover:text-ac"
            >
              {product.name}
            </Link>

            <p className="mt-1 text-[10px] text-mut">
              {product.variant} · {product.sku}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 text-[10px]">
            <Star
              className="size-3 text-amber-500"
              fill="currentColor"
            />

            <span className="font-semibold">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-4 rounded-xl border border-bd bg-bg2/40 p-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wide text-mut">
                Your cost
              </p>

              <p className="mt-1 text-sm font-bold">
                {formatPrice(product.cost)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[9px] font-medium uppercase tracking-wide text-mut">
                Suggested price
              </p>

              <p className="mt-1 text-sm font-bold text-ac">
                {formatPrice(product.suggestedPrice)}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-bd pt-2.5">
            <span className="text-[10px] text-mut">
              Potential profit
            </span>

            <span className="text-[10px] font-bold text-ac">
              {formatPrice(profit)} · {margin}%
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-mut">
          <span>
            {product.stock} units available
          </span>

          <span>
            {product.orders} sold
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onAdd}
            disabled={product.status === "Out of Stock"}
            className={`flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl text-[11px] font-bold transition ${
              product.status === "Out of Stock"
                ? "cursor-not-allowed bg-bg2 text-mut"
                : added
                  ? "bg-ac/10 text-ac"
                  : "bg-ac text-slate-950 hover:bg-ac/85"
            }`}
          >
            {added ? (
              <>
                <Check className="size-3.5" />
                Added
              </>
            ) : (
              <>
                <Plus className="size-3.5" />
                Add to store
              </>
            )}
          </button>

          <Link
            href={`/dashboard/products/${product.id}`}
            className="flex size-9 items-center justify-center rounded-xl border border-bd bg-bg transition hover:bg-bg2"
            aria-label={`View ${product.name}`}
          >
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------
   Filter
------------------------------------------------- */

function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold text-mut">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full rounded-lg border border-bd bg-bg px-3 text-xs outline-none focus:border-ac"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* -------------------------------------------------
   Empty state
------------------------------------------------- */

function EmptyState({ onReset }) {
  return (
    <div className="px-6 py-20 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-bg2">
        <Search className="size-5 text-mut" />
      </div>

      <h3 className="mt-4 text-sm font-semibold">
        No products found
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-mut">
        Try another search term or choose a different category.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-xl bg-fg px-4 py-2.5 text-xs font-semibold text-bg transition hover:opacity-90"
      >
        View all products
      </button>
    </div>
  );
}
