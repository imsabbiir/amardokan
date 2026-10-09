
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Package,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Eye,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Tag,
} from "lucide-react";

const initialProducts = [
  {
    id: "PRD-1001",
    name: "Wireless Bluetooth Mouse",
    sku: "MOU-001",
    category: "Electronics",
    costPrice: 250,
    websitePrice: 450,
    stock: 120,
    status: "Active",
    inCatalog: false,
  },
  {
    id: "PRD-1002",
    name: "Premium Cotton T-Shirt",
    sku: "TSH-002",
    category: "Fashion",
    costPrice: 180,
    websitePrice: 350,
    stock: 75,
    status: "Active",
    inCatalog: true,
    sellerPrice: 230,
    sellerSellingPrice: 350,
  },
  {
    id: "PRD-1003",
    name: "Wireless Bluetooth Earbuds",
    sku: "EAR-003",
    category: "Electronics",
    costPrice: 550,
    websitePrice: 950,
    stock: 8,
    status: "Active",
    inCatalog: true,
    sellerPrice: 680,
    sellerSellingPrice: 1050,
  },
  {
    id: "PRD-1004",
    name: "Ceramic Coffee Mug",
    sku: "MUG-004",
    category: "Home & Living",
    costPrice: 100,
    websitePrice: 220,
    stock: 0,
    status: "Inactive",
    inCatalog: false,
  },
  {
    id: "PRD-1005",
    name: "Portable LED Desk Lamp",
    sku: "LMP-005",
    category: "Home & Living",
    costPrice: 360,
    websitePrice: 650,
    stock: 42,
    status: "Active",
    inCatalog: false,
  },
  {
    id: "PRD-1006",
    name: "Canvas Tote Bag",
    sku: "BAG-006",
    category: "Fashion",
    costPrice: 130,
    websitePrice: 280,
    stock: 32,
    status: "Active",
    inCatalog: true,
    sellerPrice: 170,
    sellerSellingPrice: 300,
  },
];

const money = (value) =>
  `৳${Number(value || 0).toLocaleString("en-BD")}`;

export default function MasterProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [catalogFilter, setCatalogFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sellerPrice, setSellerPrice] = useState("");
  const [sellerSellingPrice, setSellerSellingPrice] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term) ||
        product.id.toLowerCase().includes(term);

      const matchesCatalog =
        catalogFilter === "all" ||
        (catalogFilter === "added" && product.inCatalog) ||
        (catalogFilter === "not-added" && !product.inCatalog);

      const matchesCategory =
        categoryFilter === "all" ||
        product.category === categoryFilter;

      return matchesSearch && matchesCatalog && matchesCategory;
    });
  }, [products, search, catalogFilter, categoryFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const catalogCount = products.filter((p) => p.inCatalog).length;
  const activeCount = products.filter((p) => p.status === "Active").length;

  function openAddModal(product) {
    if (product.inCatalog) return;

    setSelectedProduct(product);
    setSellerPrice(String(product.websitePrice));
    setSellerSellingPrice(String(product.websitePrice));
    setConfirming(false);
    setError("");
    setNotice("");
  }

  function closeModal() {
    setSelectedProduct(null);
    setConfirming(false);
    setError("");
  }

  function requestConfirmation() {
    const buying = Number(sellerPrice);
    const selling = Number(sellerSellingPrice);

    if (
      sellerPrice.trim() === "" ||
      sellerSellingPrice.trim() === "" ||
      !Number.isFinite(buying) ||
      !Number.isFinite(selling) ||
      buying <= 0 ||
      selling <= 0
    ) {
      setError("Enter valid prices greater than zero.");
      return;
    }

    if (selling < buying) {
      setError(
        "The seller selling price is lower than the buying price. Please review the prices."
      );
      return;
    }

    setError("");
    setConfirming(true);
  }

  function confirmAddToCatalog() {
    if (!selectedProduct) return;

    setProducts((current) =>
      current.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              inCatalog: true,
              sellerPrice: Number(sellerPrice),
              sellerSellingPrice: Number(sellerSellingPrice),
            }
          : product
      )
    );

    setNotice(
      `${selectedProduct.name} has been added to the seller catalog.`
    );
    closeModal();
  }

  return (
    <div className="min-h-screen bg-[#f6f7f7] p-4 text-[#1d2327] sm:p-6">
      <div className="mx-auto max-w-375 space-y-5">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-[#646970]">
              <Package size={16} />
              <span>Catalog Management</span>
              <span>/</span>
              <span>Master Products</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Master Products
            </h1>

            <p className="mt-1 text-sm text-[#646970]">
              Manage your products and choose which products sellers can access.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/catalog"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#dcdcde] bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-[#f0f0f1]"
            >
              <ShoppingBag size={17} />
              Seller Catalog
              <ArrowUpRight size={15} />
            </Link>

            <Link
              href="/admin/products/new"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-bold text-[#20320b] transition hover:bg-[#8fc938]"
            >
              <Plus size={18} />
              Add Product
            </Link>
          </div>
        </div>

        {/* Notification */}
        {notice && (
          <div className="flex items-start gap-3 rounded-lg border border-[#b8dca0] bg-[#f0f8e9] p-3.5 text-sm text-[#315b1c]">
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
            <p className="flex-1">{notice}</p>
            <button
              onClick={() => setNotice("")}
              className="rounded p-1 hover:bg-[#e0efd3]"
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            icon={<Package size={19} />}
            label="Total Products"
            value={products.length}
            detail="All master products"
          />
          <StatCard
            icon={<CheckCircle2 size={19} />}
            label="Active Products"
            value={activeCount}
            detail="Available on your website"
          />
          <StatCard
            icon={<ShoppingBag size={19} />}
            label="In Seller Catalog"
            value={catalogCount}
            detail={`${products.length - catalogCount} not yet added`}
          />
        </div>

        {/* Table panel */}
        <div className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
          <div className="border-b border-[#dcdcde] p-4 sm:p-5">
            <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-bold">All Products</h2>
                <p className="mt-1 text-sm text-[#646970]">
                  Select products to make them available to sellers.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646970]"
                  />
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search products..."
                    className="w-full rounded-lg border border-[#dcdcde] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#7fb922] sm:w-60"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setPage(1);
                  }}
                  className="rounded-lg border border-[#dcdcde] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#7fb922]"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                ["all", "All products"],
                ["not-added", "Not in catalog"],
                ["added", "In catalog"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => {
                    setCatalogFilter(value);
                    setPage(1);
                  }}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    catalogFilter === value
                      ? "bg-[#eaf5d8] text-[#365b16]"
                      : "bg-[#f6f7f7] text-[#646970] hover:bg-[#edeeee]"
                  }`}
                >
                  {label}
                  {value === "added" && (
                    <span className="ml-2 text-xs">{catalogCount}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Responsive table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-237.5 border-collapse text-left">
              <thead>
                <tr className="bg-[#f6f7f7] text-xs uppercase tracking-wide text-[#646970]">
                  <th className="px-5 py-3.5 font-semibold">Product</th>
                  <th className="px-4 py-3.5 font-semibold">Category</th>
                  <th className="px-4 py-3.5 font-semibold">Cost Price</th>
                  <th className="px-4 py-3.5 font-semibold">Website Price</th>
                  <th className="px-4 py-3.5 font-semibold">Stock</th>
                  <th className="px-4 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#f0f0f1]">
                {visibleProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="transition hover:bg-[#fafafa]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#e2e4e7] bg-[#f6f7f7]">
                          <Package size={20} className="text-[#646970]" />
                        </div>
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="mt-1 text-xs text-[#646970]">
                            {product.id} · SKU: {product.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm">{product.category}</td>
                    <td className="px-4 py-4 text-sm font-medium">
                      {money(product.costPrice)}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold">
                      {money(product.websitePrice)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-sm font-medium ${
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock < 10
                              ? "text-amber-600"
                              : "text-[#1d2327]"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          product.status === "Active"
                            ? "bg-[#eaf5d8] text-[#416c1b]"
                            : "bg-[#f0f0f1] text-[#646970]"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {product.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      {product.inCatalog ? (
                        <div className="inline-flex flex-col items-end gap-1.5">
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#b8dca0] bg-[#f0f8e9] px-3 py-2 text-xs font-semibold text-[#416c1b]">
                            <Check size={14} />
                            Added to Catalog
                          </span>
                          <span className="text-xs text-[#646970]">
                            Buy {money(product.sellerPrice)} · Sell{" "}
                            {money(product.sellerSellingPrice)}
                          </span>
                        </div>
                      ) : (
                        <button
                          disabled={
                            product.status !== "Active" ||
                            product.stock <= 0
                          }
                          onClick={() => openAddModal(product)}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#a3db4a] px-3.5 py-2.5 text-sm font-bold text-[#20320b] transition hover:bg-[#8fc938] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Plus size={16} />
                          Add to Catalog
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {visibleProducts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <Package
                        size={32}
                        className="mx-auto mb-3 text-[#a7aaad]"
                      />
                      <p className="font-semibold">No products found</p>
                      <p className="mt-1 text-sm text-[#646970]">
                        Try another search or filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col justify-between gap-3 border-t border-[#dcdcde] px-4 py-3.5 sm:flex-row sm:items-center sm:px-5">
            <p className="text-sm text-[#646970]">
              Showing{" "}
              {filteredProducts.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}
              {"–"}
              {Math.min(currentPage * pageSize, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-[#dcdcde] p-2 disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={17} />
              </button>
              <span className="min-w-20 text-center text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setPage((p) => Math.min(totalPages, p + 1))
                }
                className="rounded-lg border border-[#dcdcde] p-2 disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Catalog Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="catalog-modal-title"
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {!confirming ? (
              <>
                <div className="flex items-start justify-between border-b border-[#dcdcde] p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf5d8] text-[#477719]">
                      <ShoppingBag size={22} />
                    </div>
                    <div>
                      <h2
                        id="catalog-modal-title"
                        className="text-lg font-bold"
                      >
                        Add Product to Catalog
                      </h2>
                      <p className="mt-1 text-sm text-[#646970]">
                        Set the prices sellers will use.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={closeModal}
                    className="rounded-lg p-2 text-[#646970] hover:bg-[#f0f0f1]"
                    aria-label="Close modal"
                  >
                    <X size={19} />
                  </button>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  <div className="rounded-xl border border-[#e2e4e7] bg-[#f9f9f9] p-3.5">
                    <p className="font-semibold">{selectedProduct.name}</p>
                    <p className="mt-1 text-xs text-[#646970]">
                      {selectedProduct.id} · SKU: {selectedProduct.sku}
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#e2e4e7] pt-3">
                      <div>
                        <p className="text-xs text-[#646970]">Your Cost</p>
                        <p className="mt-1 font-bold">
                          {money(selectedProduct.costPrice)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#646970]">
                          Website Price
                        </p>
                        <p className="mt-1 font-bold">
                          {money(selectedProduct.websitePrice)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="seller-buying-price"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Seller Buying Price (৳)
                    </label>
                    <input
                      id="seller-buying-price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={sellerPrice}
                      onChange={(e) => setSellerPrice(e.target.value)}
                      placeholder="Enter seller buying price"
                      className="w-full rounded-lg border border-[#dcdcde] px-3.5 py-3 text-sm outline-none focus:border-[#7fb922] focus:ring-2 focus:ring-[#a3db4a]/20"
                    />
                    <p className="mt-1.5 text-xs text-[#646970]">
                      The amount the seller pays you for the product.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="seller-selling-price"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Seller Selling Price (৳)
                    </label>
                    <input
                      id="seller-selling-price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={sellerSellingPrice}
                      onChange={(e) =>
                        setSellerSellingPrice(e.target.value)
                      }
                      placeholder="Enter seller selling price"
                      className="w-full rounded-lg border border-[#dcdcde] px-3.5 py-3 text-sm outline-none focus:border-[#7fb922] focus:ring-2 focus:ring-[#a3db4a]/20"
                    />
                    <p className="mt-1.5 text-xs text-[#646970]">
                      The suggested price the seller charges their customer.
                    </p>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-[#f6f7f7] p-3.5">
                    <div>
                      <p className="text-sm font-semibold">
                        Potential seller margin
                      </p>
                      <p className="mt-1 text-xs text-[#646970]">
                        Selling price minus buying price
                      </p>
                    </div>
                    <p
                      className={`text-lg font-bold ${
                        Number(sellerSellingPrice) -
                          Number(sellerPrice) <
                        0
                          ? "text-red-600"
                          : "text-[#477719]"
                      }`}
                    >
                      {money(
                        Number(sellerSellingPrice || 0) -
                          Number(sellerPrice || 0)
                      )}
                    </p>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      <AlertCircle size={17} className="mt-0.5 shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col-reverse gap-2 border-t border-[#dcdcde] bg-[#fafafa] p-4 sm:flex-row sm:justify-end sm:px-6">
                  <button
                    onClick={closeModal}
                    className="rounded-lg border border-[#dcdcde] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-[#f0f0f1]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={requestConfirmation}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-bold text-[#20320b] hover:bg-[#8fc938]"
                  >
                    Continue
                    <ChevronRight size={16} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="p-5 sm:p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf5d8] text-[#477719]">
                    <AlertCircle size={25} />
                  </div>

                  <h2
                    id="catalog-modal-title"
                    className="text-xl font-bold"
                  >
                    Confirm Catalog Addition
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#646970]">
                    Are you sure you want to add{" "}
                    <span className="font-semibold text-[#1d2327]">
                      {selectedProduct.name}
                    </span>{" "}
                    to the seller catalog?
                  </p>

                  <div className="mt-5 space-y-3 rounded-xl border border-[#e2e4e7] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-[#646970]">
                        Seller buying price
                      </span>
                      <span className="font-bold">
                        {money(sellerPrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-[#646970]">
                        Seller selling price
                      </span>
                      <span className="font-bold">
                        {money(sellerSellingPrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-[#e2e4e7] pt-3">
                      <span className="text-sm font-semibold">
                        Potential seller margin
                      </span>
                      <span className="font-bold text-[#477719]">
                        {money(
                          Number(sellerSellingPrice) - Number(sellerPrice)
                        )}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-[#646970]">
                    This will make the product available in the seller catalog
                    using the prices shown above.
                  </p>
                </div>

                <div className="flex flex-col-reverse gap-2 border-t border-[#dcdcde] bg-[#fafafa] p-4 sm:flex-row sm:justify-end sm:px-6">
                  <button
                    onClick={() => setConfirming(false)}
                    className="rounded-lg border border-[#dcdcde] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-[#f0f0f1]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAddToCatalog}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-bold text-[#20320b] hover:bg-[#8fc938]"
                  >
                    <Check size={17} />
                    OK, Add to Catalog
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, detail }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#646970]">{label}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          <p className="mt-1 text-xs text-[#646970]">{detail}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f0f1] text-[#50575e]">
          {icon}
        </div>
      </div>
    </div>
  );
}
