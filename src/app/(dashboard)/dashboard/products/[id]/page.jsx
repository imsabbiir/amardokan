"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Boxes,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Copy,
  Heart,
  Info,
  Package,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  TrendingUp,
  Truck,
  Wallet,
  X,
  Zap,
} from "lucide-react";

const product = {
  id: "P-1001",
  name: "Premium Oversized Hoodie",
  category: "Fashion",
  subcategory: "Hoodies",

  description:
    "A premium oversized hoodie made from soft cotton-blend fabric. Designed for everyday comfort with a relaxed fit and clean minimal styling.",

  supplierCost: 1250,
  suggestedPrice: 1890,
  minPrice: 1690,
  maxPrice: 2190,

  stock: 42,
  rating: 4.8,
  reviews: 42,
  sold: 128,

  delivery: "2–4 business days",

  sku: "HOOD-OVR-BLK-XL",

  images: [null, null, null, null],

  variants: [
    {
      id: 1,
      color: "Black",
      sizes: ["M", "L", "XL"],
      stock: 84,
    },
    {
      id: 2,
      color: "Grey",
      sizes: ["M", "L", "XL"],
      stock: 46,
    },
    {
      id: 3,
      color: "Cream",
      sizes: ["M", "L"],
      stock: 22,
    },
  ],

  features: [
    "Premium cotton-blend fabric",
    "Oversized relaxed fit",
    "Soft and comfortable interior",
    "Unisex design",
    "Suitable for everyday wear",
  ],

  fulfillment: {
    cod: true,
    returns: true,
    nationwide: true,
  },

  performance: {
    orders: 128,
    rating: 4.8,
    repeatRate: "18%",
    deliverySuccess: "94%",
  },
};

const relatedProducts = [
  {
    id: "P-1002",
    name: "Essential Sweatshirt",
    category: "Fashion",
    cost: 990,
    price: 1490,
    stock: 8,
    rating: 4.7,
  },
  {
    id: "P-1006",
    name: "Premium Cotton T-Shirt",
    category: "Fashion",
    cost: 480,
    price: 890,
    stock: 94,
    rating: 4.8,
  },
  {
    id: "P-1005",
    name: "Everyday Running Shoes",
    category: "Footwear",
    cost: 1350,
    price: 1990,
    stock: 5,
    rating: 4.5,
  },
];

const performanceData = [
  { label: "Mon", value: 18 },
  { label: "Tue", value: 25 },
  { label: "Wed", value: 21 },
  { label: "Thu", value: 34 },
  { label: "Fri", value: 28 },
  { label: "Sat", value: 42 },
  { label: "Sun", value: 37 },
];

function formatPrice(price) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function ProductPlaceholder({ className = "" }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-bd bg-bg2 ${className}`}
    >
      <Package className="h-20 w-20 text-mut/30" />
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  description,
  accent = false,
}) {
  return (
    <div className="rounded-2xl border border-bd bg-bg p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg2">
        <Icon className="h-5 w-5 text-ac" />
      </div>

      <p className="mt-5 text-xs text-mut">{label}</p>

      <p
        className={`mt-1 text-2xl font-bold tracking-tight ${
          accent ? "text-[#7fb922]" : ""
        }`}
      >
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs text-mut">{description}</p>
      )}
    </div>
  );
}

function StockStatus({ stock }) {
  if (stock === 0) {
    return (
      <span className="font-semibold text-red-500">
        Out of stock
      </span>
    );
  }

  if (stock <= 10) {
    return (
      <span className="font-semibold text-amber-500">
        Only {stock} left
      </span>
    );
  }

  return (
    <span className="font-semibold text-[#7fb922]">
      In stock
    </span>
  );
}

function Feature({ children }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-mut">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#a3db4a]/10">
        <Check className="h-3 w-3 text-[#7fb922]" />
      </span>

      <span>{children}</span>
    </li>
  );
}

function PerformanceChart() {
  const max = Math.max(...performanceData.map((item) => item.value));

  return (
    <div className="mt-6">
      <div className="flex h-52 items-end gap-2 sm:gap-4">
        {performanceData.map((item) => {
          const height = `${(item.value / max) * 100}%`;

          return (
            <div
              key={item.label}
              className="group flex h-full flex-1 flex-col items-center justify-end"
            >
              <div className="flex h-full w-full items-end">
                <div
                  className="mx-auto w-full max-w-10 rounded-t-lg bg-ac transition-all duration-300 group-hover:bg-[#7fb922]"
                  style={{ height }}
                />
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

function InfoRow({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-bd py-3 last:border-b-0">
      <span className="text-sm text-mut">{label}</span>

      <span className="text-right text-sm font-semibold">
        {children}
      </span>
    </div>
  );
}

function RelatedProductCard({ item }) {
  const profit = item.price - item.cost;
  const margin = Math.round((profit / item.price) * 100);

  return (
    <Link
      href={`/dashboard/products/${item.id}`}
      className="group rounded-2xl border border-bd bg-bg p-3 transition hover:-translate-y-0.5 hover:border-ac/40"
    >
      <ProductPlaceholder className="aspect-square" />

      <div className="p-2 pt-4">
        <p className="truncate text-sm font-semibold group-hover:text-ac">
          {item.name}
        </p>

        <p className="mt-1 text-xs text-mut">
          {item.category}
        </p>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <p className="text-sm font-bold">
              {formatPrice(item.price)}
            </p>

            <p className="mt-0.5 text-[11px] text-mut">
              Cost {formatPrice(item.cost)}
            </p>
          </div>

          <span className="rounded-full bg-[#a3db4a]/10 px-2 py-1 text-[10px] font-bold text-[#7fb922]">
            {margin}% margin
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px]">
          <span className="text-mut">
            {item.stock} in stock
          </span>

          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-current text-amber-400" />
            {item.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("XL");
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);

  const [sellingPrice, setSellingPrice] = useState(
    product.suggestedPrice
  );

  const [activeTab, setActiveTab] = useState("details");

  const profit = useMemo(
    () => sellingPrice - product.supplierCost,
    [sellingPrice]
  );

  const margin = useMemo(() => {
    if (!sellingPrice) return 0;

    return Math.round((profit / sellingPrice) * 100);
  }, [profit, sellingPrice]);

  const estimatedRevenue = sellingPrice * 100;

  const estimatedProfit = profit * 100;

  function handleAddProduct() {
    setAdded(true);
  }

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
            href="/dashboard/products"
            className="transition hover:text-fg"
          >
            Products
          </Link>

          <ChevronRight className="h-4 w-4" />

          <span className="text-fg">
            {product.name}
          </span>
        </div>

        {/* Back */}
        <Link
          href="/dashboard/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-mut transition hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        {/* Product Hero */}
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_460px]">

          {/* Gallery */}
          <div className="grid gap-4 md:grid-cols-[90px_minmax(0,1fr)]">

            <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-bg2 transition ${
                    selectedImage === index
                      ? "border-ac ring-2 ring-ac/20"
                      : "border-bd hover:border-ac/40"
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <Package className="h-6 w-6 text-mut/40" />
                  </div>
                </button>
              ))}
            </div>

            <div className="order-1 md:order-2">
              <div className="relative">
                <ProductPlaceholder className="aspect-square min-h-90 w-full sm:min-h-115" />

                <button
                  type="button"
                  onClick={() => setSaved((value) => !value)}
                  className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur ${
                    saved
                      ? "border-red-500/20 bg-red-500/10 text-red-500"
                      : "border-bd bg-bg/80 text-mut"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      saved ? "fill-current" : ""
                    }`}
                  />
                </button>

                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#a3db4a] px-3 py-1.5 text-[11px] font-bold text-slate-950">
                  <Zap className="h-3.5 w-3.5" />
                  Trending Product
                </div>
              </div>
            </div>
          </div>

          {/* Product purchase panel */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-bd bg-bg2 px-3 py-1 text-xs font-medium text-mut">
                {product.category}
              </span>

              <span className="rounded-full border border-bd bg-bg2 px-3 py-1 text-xs font-medium text-mut">
                {product.subcategory}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-current text-amber-400" />

                <span className="text-sm font-semibold">
                  {product.rating}
                </span>

                <span className="text-sm text-mut">
                  ({product.reviews} reviews)
                </span>
              </div>

              <span className="text-mut">•</span>

              <span className="text-sm text-mut">
                {product.sold} sold
              </span>
            </div>

            <p className="mt-6 text-sm leading-7 text-mut">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-7 rounded-2xl border border-bd bg-bg2 p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-mut">
                    Supplier cost
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {formatPrice(product.supplierCost)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-mut">
                    Suggested selling price
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {formatPrice(product.suggestedPrice)}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-bd pt-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-mut">
                      Potential profit per sale
                    </p>

                    <p className="mt-1 text-3xl font-bold text-[#7fb922]">
                      {formatPrice(
                        product.suggestedPrice -
                          product.supplierCost
                      )}
                    </p>
                  </div>

                  <span className="rounded-full bg-[#a3db4a]/10 px-3 py-1.5 text-xs font-bold text-[#7fb922]">
                    {Math.round(
                      ((product.suggestedPrice -
                        product.supplierCost) /
                        product.suggestedPrice) *
                        100
                    )}
                    % margin
                  </span>
                </div>
              </div>
            </div>

            {/* Variant */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">
                  Color
                </p>

                <span className="text-xs text-mut">
                  {selectedColor}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() =>
                      setSelectedColor(variant.color)
                    }
                    className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                      selectedColor === variant.color
                        ? "border-ac bg-ac/10"
                        : "border-bd hover:bg-bg2"
                    }`}
                  >
                    {variant.color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">
                  Size
                </p>

                <button className="text-xs font-medium text-mut hover:text-fg">
                  Size guide
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {["M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-11 min-w-14 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition ${
                      selectedSize === size
                        ? "border-ac bg-ac/10"
                        : "border-bd hover:bg-bg2"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock */}
            <div className="mt-5 flex items-center justify-between rounded-xl border border-bd px-4 py-3">
              <div className="flex items-center gap-2">
                <Boxes className="h-4 w-4 text-ac" />

                <span className="text-sm">
                  Available stock
                </span>
              </div>

              <StockStatus stock={product.stock} />
            </div>

            {/* Add */}
            <button
              type="button"
              onClick={handleAddProduct}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ac px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-[#7fb922]"
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" />
                  Added to My Store
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Add to My Store
                </>
              )}
            </button>

            <p className="mt-3 text-center text-xs text-mut">
              You can change your selling price after adding this
              product.
            </p>

            {/* Quick trust */}
            <div className="mt-6 grid grid-cols-3 divide-x divide-bd rounded-xl border border-bd py-4">
              <div className="px-3 text-center">
                <Truck className="mx-auto h-4 w-4 text-ac" />

                <p className="mt-2 text-[10px] font-semibold">
                  Nationwide
                </p>
              </div>

              <div className="px-3 text-center">
                <Wallet className="mx-auto h-4 w-4 text-ac" />

                <p className="mt-2 text-[10px] font-semibold">
                  COD Available
                </p>
              </div>

              <div className="px-3 text-center">
                <RotateCcw className="mx-auto h-4 w-4 text-ac" />

                <p className="mt-2 text-[10px] font-semibold">
                  Returns
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Business metrics */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            icon={TrendingUp}
            label="Potential Profit"
            value={formatPrice(
              product.suggestedPrice -
                product.supplierCost
            )}
            description="Per successful sale"
            accent
          />

          <Metric
            icon={ShoppingBag}
            label="Products Sold"
            value={product.sold}
            description="Total catalog sales"
          />

          <Metric
            icon={Star}
            label="Product Rating"
            value={product.rating}
            description={`${product.reviews} reviews`}
          />

          <Metric
            icon={Truck}
            label="Delivery"
            value="2–4 days"
            description="Estimated delivery"
          />
        </div>

        {/* Main content */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">

          {/* Left content */}
          <div className="space-y-6">

            {/* Tabs */}
            <section className="overflow-hidden rounded-2xl border border-bd bg-bg">
              <div className="border-b border-bd px-5 sm:px-6">
                <div className="flex gap-7 overflow-x-auto">
                  {[
                    ["details", "Product Details"],
                    ["variants", "Variants"],
                    ["performance", "Performance"],
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

              {activeTab === "details" && (
                <div className="p-5 sm:p-6">
                  <h2 className="text-lg font-semibold">
                    Product Information
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-mut">
                    Everything you need to know before adding this
                    product to your store.
                  </p>

                  <div className="mt-6">
                    <h3 className="text-sm font-semibold">
                      Key Features
                    </h3>

                    <ul className="mt-4 space-y-3">
                      {product.features.map((feature) => (
                        <Feature key={feature}>
                          {feature}
                        </Feature>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold">
                        Product Information
                      </h3>

                      <div className="mt-3 rounded-xl border border-bd px-4">
                        <InfoRow label="Product ID">
                          <span className="font-mono text-xs">
                            {product.id}
                          </span>
                        </InfoRow>

                        <InfoRow label="Category">
                          {product.category}
                        </InfoRow>

                        <InfoRow label="SKU">
                          <span className="font-mono text-xs">
                            {product.sku}
                          </span>
                        </InfoRow>

                        <InfoRow label="Available stock">
                          {product.stock} units
                        </InfoRow>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold">
                        Fulfillment
                      </h3>

                      <div className="mt-3 rounded-xl border border-bd px-4">
                        <InfoRow label="Delivery">
                          {product.delivery}
                        </InfoRow>

                        <InfoRow label="Cash on Delivery">
                          <span className="text-[#7fb922]">
                            Available
                          </span>
                        </InfoRow>

                        <InfoRow label="Nationwide">
                          <span className="text-[#7fb922]">
                            Available
                          </span>
                        </InfoRow>

                        <InfoRow label="Returns">
                          Supported
                        </InfoRow>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "variants" && (
                <div className="p-5 sm:p-6">
                  <h2 className="text-lg font-semibold">
                    Available Variants
                  </h2>

                  <p className="mt-2 text-sm text-mut">
                    Choose the variants you want to sell.
                  </p>

                  <div className="mt-6 space-y-3">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex flex-col gap-4 rounded-xl border border-bd p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="text-sm font-semibold">
                            {variant.color}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {variant.sizes.map((size) => (
                              <span
                                key={size}
                                className="rounded-lg bg-bg2 px-2.5 py-1 text-xs font-medium"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-sm font-semibold">
                            {variant.stock} units
                          </p>

                          <p className="mt-1 text-xs text-mut">
                            Available stock
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "performance" && (
                <div className="p-5 sm:p-6">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Product Performance
                    </h2>

                    <p className="mt-2 text-sm text-mut">
                      See how this product performs across the
                      AmarDokan catalog.
                    </p>
                  </div>

                  <PerformanceChart />

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-bg2 p-4">
                      <p className="text-xs text-mut">
                        Total orders
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {product.performance.orders}
                      </p>
                    </div>

                    <div className="rounded-xl bg-bg2 p-4">
                      <p className="text-xs text-mut">
                        Delivery success
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {product.performance.deliverySuccess}
                      </p>
                    </div>

                    <div className="rounded-xl bg-bg2 p-4">
                      <p className="text-xs text-mut">
                        Repeat customers
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {product.performance.repeatRate}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Profit calculator */}
            <section className="rounded-2xl border border-bd bg-bg p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#a3db4a]/10">
                      <TrendingUp className="h-4 w-4 text-[#7fb922]" />
                    </div>

                    <h2 className="font-semibold">
                      Profit Calculator
                    </h2>
                  </div>

                  <p className="mt-2 text-sm text-mut">
                    Set your selling price and instantly see your
                    estimated profit.
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs text-mut">
                  <Info className="h-3.5 w-3.5" />
                  Before delivery and ad costs
                </span>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="selling-price"
                    className="text-sm font-semibold"
                  >
                    Your selling price
                  </label>

                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-mut">
                      ৳
                    </span>

                    <input
                      id="selling-price"
                      type="number"
                      min={product.minPrice}
                      max={product.maxPrice}
                      value={sellingPrice}
                      onChange={(event) =>
                        setSellingPrice(
                          Number(event.target.value) || 0
                        )
                      }
                      className="h-12 w-full rounded-xl border border-bd bg-bg2 pl-9 pr-4 text-lg font-bold outline-none transition focus:border-ac"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-mut">
                    <span>
                      Suggested: {formatPrice(product.suggestedPrice)}
                    </span>

                    <span>
                      Range {formatPrice(product.minPrice)}–
                      {formatPrice(product.maxPrice)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={product.minPrice}
                    max={product.maxPrice}
                    step="10"
                    value={sellingPrice}
                    onChange={(event) =>
                      setSellingPrice(
                        Number(event.target.value)
                      )
                    }
                    className="mt-5 w-full accent-[#a3db4a]"
                  />
                </div>

                <div className="rounded-2xl bg-bg2 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-mut">
                      Supplier cost
                    </span>

                    <span className="text-sm font-semibold">
                      {formatPrice(product.supplierCost)}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-mut">
                      Your selling price
                    </span>

                    <span className="text-sm font-semibold">
                      {formatPrice(sellingPrice)}
                    </span>
                  </div>

                  <div className="my-4 border-t border-bd" />

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-mut">
                        Estimated profit
                      </p>

                      <p className="mt-1 text-3xl font-bold text-[#7fb922]">
                        {formatPrice(profit)}
                      </p>
                    </div>

                    <span className="rounded-full bg-[#a3db4a]/10 px-3 py-1.5 text-xs font-bold text-[#7fb922]">
                      {margin}% margin
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-bd p-4">
                  <p className="text-xs text-mut">
                    Revenue from 100 sales
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {formatPrice(estimatedRevenue)}
                  </p>
                </div>

                <div className="rounded-xl border border-bd p-4">
                  <p className="text-xs text-mut">
                    Estimated profit from 100 sales
                  </p>

                  <p className="mt-1 text-lg font-bold text-[#7fb922]">
                    {formatPrice(estimatedProfit)}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-6">

            {/* Add card */}
            <section className="sticky top-24 rounded-2xl border border-bd bg-bg p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-mut">
                    Ready to sell?
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Add this product
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ac/10">
                  <ShoppingBag className="h-5 w-5 text-ac" />
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-bg2 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-mut">
                    Supplier cost
                  </span>

                  <span className="text-sm font-semibold">
                    {formatPrice(product.supplierCost)}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-mut">
                    Suggested price
                  </span>

                  <span className="text-sm font-semibold">
                    {formatPrice(product.suggestedPrice)}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-bd pt-3">
                  <span className="text-xs text-mut">
                    Potential profit
                  </span>

                  <span className="text-sm font-bold text-[#7fb922]">
                    {formatPrice(
                      product.suggestedPrice -
                        product.supplierCost
                    )}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddProduct}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-ac px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#7fb922]"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added to My Store
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add to My Store
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-[11px] leading-5 text-mut">
                No inventory purchase required. Add it to your store
                and start selling.
              </p>
            </section>

            {/* Why sell */}
            <section className="rounded-2xl border border-bd bg-bg p-5">
              <h3 className="font-semibold">
                Why sell this product?
              </h3>

              <div className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#a3db4a]/10">
                    <TrendingUp className="h-4 w-4 text-[#7fb922]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Strong margin
                    </p>

                    <p className="mt-1 text-xs leading-5 text-mut">
                      Around{" "}
                      {Math.round(
                        ((product.suggestedPrice -
                          product.supplierCost) /
                          product.suggestedPrice) *
                          100
                      )}
                      % potential margin at the suggested price.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#a3db4a]/10">
                    <Zap className="h-4 w-4 text-[#7fb922]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Trending
                    </p>

                    <p className="mt-1 text-xs leading-5 text-mut">
                      One of the more popular products in this
                      category.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#a3db4a]/10">
                    <Truck className="h-4 w-4 text-[#7fb922]" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Fast fulfillment
                    </p>

                    <p className="mt-1 text-xs leading-5 text-mut">
                      Estimated delivery in{" "}
                      {product.delivery.toLowerCase()}.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Fulfillment */}
            <section className="rounded-2xl border border-bd bg-bg p-5">
              <h3 className="font-semibold">
                Fulfillment included
              </h3>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-[#7fb922]" />
                  <span className="text-sm text-mut">
                    Product sourcing
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-[#7fb922]" />
                  <span className="text-sm text-mut">
                    Inventory management
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-[#7fb922]" />
                  <span className="text-sm text-mut">
                    Professional packing
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-[#7fb922]" />
                  <span className="text-sm text-mut">
                    Nationwide delivery
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-[#7fb922]" />
                  <span className="text-sm text-mut">
                    Cash on Delivery
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-[#7fb922]" />
                  <span className="text-sm text-mut">
                    Returns management
                  </span>
                </div>
              </div>
            </section>

            {/* Support */}
            <section className="rounded-2xl border border-bd bg-bg2 p-5">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg">
                  <ShieldCheck className="h-4 w-4 text-ac" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Need help choosing a price?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-mut">
                    Use the profit calculator or contact seller
                    support for guidance.
                  </p>

                  <Link
                    href="/dashboard/support"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold hover:text-ac"
                  >
                    Contact support
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* Related */}
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ac">
                More opportunities
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                You may also want to sell
              </h2>

              <p className="mt-2 text-sm text-mut">
                Similar products with strong selling potential.
              </p>
            </div>

            <Link
              href="/dashboard/products"
              className="hidden items-center gap-1 text-sm font-semibold text-mut transition hover:text-fg sm:flex"
            >
              View catalog
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((item) => (
              <RelatedProductCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-10 overflow-hidden rounded-2xl border border-bd bg-bg2 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ac/10">
                  <Package className="h-4 w-4 text-ac" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-ac">
                  Start selling
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to add {product.name}?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-mut">
                Add the product to your store, set your selling price,
                and let AmarDokan handle the fulfillment.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddProduct}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ac px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#7fb922] sm:w-auto"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  Added to My Store
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add to My Store
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}