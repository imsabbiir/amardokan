
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Package,
  Boxes,
  AlertTriangle,
  XCircle,
  Plus,
  Minus,
  ArrowDownUp,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  SlidersHorizontal,
  History,
} from "lucide-react";

const initialInventory = [
  {
    id: "PRD-1001",
    name: "Wireless Bluetooth Mouse",
    sku: "MOU-001",
    category: "Electronics",
    stock: 120,
    reserved: 8,
    reorder: 20,
    cost: 250,
    status: "In Stock",
  },
  {
    id: "PRD-1002",
    name: "Premium Cotton T-Shirt",
    sku: "TSH-002",
    category: "Fashion",
    stock: 75,
    reserved: 12,
    reorder: 15,
    cost: 180,
    status: "In Stock",
  },
  {
    id: "PRD-1003",
    name: "Wireless Bluetooth Earbuds",
    sku: "EAR-003",
    category: "Electronics",
    stock: 8,
    reserved: 3,
    reorder: 15,
    cost: 550,
    status: "Low Stock",
  },
  {
    id: "PRD-1004",
    name: "Ceramic Coffee Mug",
    sku: "MUG-004",
    category: "Home & Living",
    stock: 0,
    reserved: 0,
    reorder: 10,
    cost: 100,
    status: "Out of Stock",
  },
  {
    id: "PRD-1005",
    name: "Portable LED Desk Lamp",
    sku: "LMP-005",
    category: "Home & Living",
    stock: 42,
    reserved: 5,
    reorder: 10,
    cost: 360,
    status: "In Stock",
  },
  {
    id: "PRD-1006",
    name: "Canvas Tote Bag",
    sku: "BAG-006",
    category: "Fashion",
    stock: 12,
    reserved: 2,
    reorder: 15,
    cost: 130,
    status: "Low Stock",
  },
  {
    id: "PRD-1007",
    name: "USB-C Charging Cable",
    sku: "CAB-007",
    category: "Electronics",
    stock: 0,
    reserved: 0,
    reorder: 25,
    cost: 80,
    status: "Out of Stock",
  },
  {
    id: "PRD-1008",
    name: "Stainless Steel Water Bottle",
    sku: "BOT-008",
    category: "Lifestyle",
    stock: 54,
    reserved: 10,
    reorder: 12,
    cost: 220,
    status: "In Stock",
  },
];

const statusConfig = {
  "In Stock": "bg-green-50 text-green-700 border-green-200",
  "Low Stock": "bg-amber-50 text-amber-700 border-amber-200",
  "Out of Stock": "bg-red-50 text-red-700 border-red-200",
};

function getStatus(stock, reorder) {
  if (stock <= 0) return "Out of Stock";
  if (stock <= reorder) return "Low Stock";
  return "In Stock";
}

function StatCard({ title, value, description, icon: Icon, tone }) {
  const tones = {
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-[#646970]">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#1d2327]">
            {value}
          </h3>
          <p className="mt-1 text-xs text-[#646970]">{description}</p>
        </div>
        <div className={`rounded-lg p-2.5 ${tones[tone]}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [adjustment, setAdjustment] = useState("add");
  const [quantity, setQuantity] = useState("1");
  const [reason, setReason] = useState("Stock replenishment");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const pageSize = 6;

  const enrichedInventory = useMemo(
    () =>
      inventory.map((item) => ({
        ...item,
        status: getStatus(item.stock, item.reorder),
      })),
    [inventory]
  );

  const filtered = useMemo(() => {
    return enrichedInventory.filter((item) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [enrichedInventory, search, statusFilter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const totalUnits = inventory.reduce((sum, item) => sum + item.stock, 0);
  const totalReserved = inventory.reduce(
    (sum, item) => sum + item.reserved,
    0
  );
  const inventoryValue = inventory.reduce(
    (sum, item) => sum + item.stock * item.cost,
    0
  );
  const lowStockCount = enrichedInventory.filter(
    (item) => item.status === "Low Stock"
  ).length;
  const outOfStockCount = enrichedInventory.filter(
    (item) => item.status === "Out of Stock"
  ).length;

  function openAdjustment(item, type) {
    setSelected(item);
    setAdjustment(type);
    setQuantity("1");
    setReason(type === "add" ? "Stock replenishment" : "Damaged goods");
    setError("");
    setSuccess("");
  }

  function closeModal() {
    setSelected(null);
    setError("");
  }

  function saveAdjustment() {
    const amount = Number(quantity);

    if (!Number.isInteger(amount) || amount <= 0) {
      setError("Enter a valid whole-number quantity greater than zero.");
      return;
    }

    if (!selected) return;

    if (adjustment === "remove" && amount > selected.stock) {
      setError("You cannot remove more units than the available stock.");
      return;
    }

    setInventory((current) =>
      current.map((item) => {
        if (item.id !== selected.id) return item;

        const newStock =
          adjustment === "add" ? item.stock + amount : item.stock - amount;

        return {
          ...item,
          stock: newStock,
          status: getStatus(newStock, item.reorder),
        };
      })
    );

    setSuccess(
      `${amount} unit${amount === 1 ? "" : "s"} ${
        adjustment === "add" ? "added to" : "removed from"
      } ${selected.name}.`
    );

    setSelected(null);
    setError("");
  }

  function exportCsv() {
    const headers = [
      "Product ID",
      "Product",
      "SKU",
      "Category",
      "Available Stock",
      "Reserved Stock",
      "Reorder Level",
      "Cost Price",
      "Stock Status",
    ];

    const rows = filtered.map((item) => [
      item.id,
      item.name,
      item.sku,
      item.category,
      item.stock,
      item.reserved,
      item.reorder,
      item.cost,
      item.status,
    ]);

    const escapeCsv = (value) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "amardokan-inventory.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#f6f7f7] text-[#1d2327]">
      <div className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-8">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#646970]">
              <span>Admin</span>
              <span>/</span>
              <span className="text-[#2271b1]">Inventory</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Inventory
            </h1>
            <p className="mt-1 text-sm text-[#646970]">
              Monitor stock levels, manage availability, and track inventory
              value.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={exportCsv}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#c3c4c7] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button
              onClick={() => {
                setStatusFilter("Low Stock");
                setPage(1);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-semibold text-[#1d2327] hover:bg-[#91ca38]"
            >
              <AlertTriangle size={16} />
              Low stock items
            </button>
          </div>
        </div>

        {success && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            <span className="flex items-center gap-2">
              <Check size={17} />
              {success}
            </span>
            <button
              onClick={() => setSuccess("")}
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total stock units"
            value={totalUnits.toLocaleString()}
            description={`${totalReserved} units reserved for orders`}
            icon={Boxes}
            tone="blue"
          />
          <StatCard
            title="Inventory value"
            value={`৳${inventoryValue.toLocaleString("en-BD")}`}
            description="Based on master product cost"
            icon={Package}
            tone="green"
          />
          <StatCard
            title="Low stock"
            value={lowStockCount}
            description="Products at or below reorder level"
            icon={AlertTriangle}
            tone="amber"
          />
          <StatCard
            title="Out of stock"
            value={outOfStockCount}
            description="Products with zero available units"
            icon={XCircle}
            tone="red"
          />
        </div>

        {/* Inventory table */}
        <div className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
          <div className="border-b border-[#dcdcde] p-4 sm:p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-base font-bold">Stock management</h2>
                <p className="mt-1 text-sm text-[#646970]">
                  {filtered.length} products found
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative min-w-0 sm:w-72">
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
                    placeholder="Search product, SKU, ID..."
                    className="w-full rounded-lg border border-[#c3c4c7] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium ${
                    showFilters
                      ? "border-[#2271b1] bg-blue-50 text-[#2271b1]"
                      : "border-[#c3c4c7] hover:bg-gray-50"
                  }`}
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 grid grid-cols-1 gap-3 rounded-lg bg-[#f6f7f7] p-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#646970]">
                    Stock status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none"
                  >
                    <option value="All">All statuses</option>
                    <option value="In Stock">In stock</option>
                    <option value="Low Stock">Low stock</option>
                    <option value="Out of Stock">Out of stock</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#646970]">
                    Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => {
                      setCategoryFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none"
                  >
                    <option value="All">All categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <button
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All");
                      setCategoryFilter("All");
                      setPage(1);
                    }}
                    className="text-sm font-semibold text-[#2271b1] hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}

            {/* Quick filters */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {[
                { label: "All", count: inventory.length },
                {
                  label: "In Stock",
                  count: enrichedInventory.filter(
                    (i) => i.status === "In Stock"
                  ).length,
                },
                { label: "Low Stock", count: lowStockCount },
                { label: "Out of Stock", count: outOfStockCount },
              ].map((filter) => (
                <button
                  key={filter.label}
                  onClick={() => {
                    setStatusFilter(filter.label);
                    setPage(1);
                  }}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    statusFilter === filter.label
                      ? "border-[#a3db4a] bg-[#edf8d9] text-[#355a0c]"
                      : "border-[#dcdcde] bg-white text-[#646970] hover:bg-gray-50"
                  }`}
                >
                  {filter.label === "All" ? "All products" : filter.label}
                  <span>{filter.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-225 text-left text-sm">
              <thead className="bg-[#f6f7f7] text-xs uppercase tracking-wide text-[#646970]">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Product</th>
                  <th className="px-4 py-3.5 font-semibold">SKU</th>
                  <th className="px-4 py-3.5 font-semibold">Available</th>
                  <th className="px-4 py-3.5 font-semibold">Reserved</th>
                  <th className="px-4 py-3.5 font-semibold">Reorder level</th>
                  <th className="px-4 py-3.5 font-semibold">Cost value</th>
                  <th className="px-4 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#f0f0f1]">
                {pageItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafafa]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#e2e4e7] bg-[#f6f7f7] text-[#646970]">
                          <Package size={19} />
                        </div>
                        <div>
                          <p className="font-semibold text-[#1d2327]">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-[#646970]">
                            {item.id} · {item.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 font-mono text-xs text-[#646970]">
                      {item.sku}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`font-bold ${
                          item.stock === 0
                            ? "text-red-600"
                            : item.status === "Low Stock"
                              ? "text-amber-700"
                              : "text-[#1d2327]"
                        }`}
                      >
                        {item.stock}
                      </span>
                      <span className="ml-1 text-xs text-[#646970]">units</span>
                    </td>

                    <td className="px-4 py-4 text-[#646970]">
                      {item.reserved}
                    </td>

                    <td className="px-4 py-4 text-[#646970]">
                      {item.reorder} units
                    </td>

                    <td className="px-4 py-4 font-semibold">
                      ৳{(item.stock * item.cost).toLocaleString("en-BD")}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${statusConfig[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => openAdjustment(item, "add")}
                          title="Add stock"
                          className="inline-flex items-center gap-1 rounded-lg border border-green-200 bg-green-50 px-2.5 py-2 text-xs font-semibold text-green-800 hover:bg-green-100"
                        >
                          <Plus size={14} />
                          Add
                        </button>
                        <button
                          onClick={() => openAdjustment(item, "remove")}
                          disabled={item.stock === 0}
                          title="Remove stock"
                          className="inline-flex items-center gap-1 rounded-lg border border-[#dcdcde] bg-white px-2.5 py-2 text-xs font-semibold text-[#646970] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Minus size={14} />
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {pageItems.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <Package
                        size={32}
                        className="mx-auto text-[#a7aaad]"
                      />
                      <p className="mt-3 font-semibold">No products found</p>
                      <p className="mt-1 text-sm text-[#646970]">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-[#dcdcde] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-[#646970]">
              Showing {filtered.length === 0 ? 0 : start + 1}–
              {Math.min(start + pageSize, filtered.length)} of {filtered.length}{" "}
              products
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-[#dcdcde] p-2 hover:bg-gray-50 disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={17} />
              </button>
              <span className="px-2 text-sm font-semibold">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-lg border border-[#dcdcde] p-2 hover:bg-gray-50 disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Stock adjustment modal */}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="stock-modal-title"
              className="w-full max-w-md overflow-hidden rounded-2xl border border-[#dcdcde] bg-white shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-[#dcdcde] p-5">
                <div>
                  <h2 id="stock-modal-title" className="text-lg font-bold">
                    {adjustment === "add" ? "Add stock" : "Remove stock"}
                  </h2>
                  <p className="mt-1 text-sm text-[#646970]">
                    Adjust inventory for this product.
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="rounded-lg p-2 text-[#646970] hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 p-5">
                <div className="rounded-xl border border-[#dcdcde] bg-[#f6f7f7] p-4">
                  <p className="font-semibold">{selected.name}</p>
                  <p className="mt-1 text-xs text-[#646970]">
                    {selected.sku} · {selected.id}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-[#646970]">Current stock</span>
                    <span className="font-bold">
                      {selected.stock} units
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Adjustment type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setAdjustment("add");
                        setError("");
                      }}
                      className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold ${
                        adjustment === "add"
                          ? "border-green-300 bg-green-50 text-green-800"
                          : "border-[#dcdcde]"
                      }`}
                    >
                      <Plus size={16} />
                      Add stock
                    </button>
                    <button
                      onClick={() => {
                        setAdjustment("remove");
                        setError("");
                      }}
                      disabled={selected.stock === 0}
                      className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold disabled:opacity-40 ${
                        adjustment === "remove"
                          ? "border-red-300 bg-red-50 text-red-700"
                          : "border-[#dcdcde]"
                      }`}
                    >
                      <Minus size={16} />
                      Remove stock
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="stock-quantity"
                    className="mb-1.5 block text-sm font-semibold"
                  >
                    Quantity
                  </label>
                  <input
                    id="stock-quantity"
                    type="number"
                    min="1"
                    step="1"
                    max={adjustment === "remove" ? selected.stock : undefined}
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setError("");
                    }}
                    className="w-full rounded-lg border border-[#c3c4c7] px-3 py-2.5 text-sm outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="stock-reason"
                    className="mb-1.5 block text-sm font-semibold"
                  >
                    Reason
                  </label>
                  <select
                    id="stock-reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                  >
                    {(
                      adjustment === "add"
                        ? [
                            "Stock replenishment",
                            "Supplier delivery",
                            "Returned items",
                            "Stock correction",
                          ]
                        : [
                            "Damaged goods",
                            "Lost inventory",
                            "Stock correction",
                            "Internal use",
                          ]
                    ).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {error && (
                  <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <div className="flex justify-end gap-2 border-t border-[#dcdcde] pt-4">
                  <button
                    onClick={closeModal}
                    className="rounded-lg border border-[#c3c4c7] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveAdjustment}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                      adjustment === "add"
                        ? "bg-[#a3db4a] text-[#1d2327] hover:bg-[#91ca38]"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                  >
                    Confirm adjustment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

