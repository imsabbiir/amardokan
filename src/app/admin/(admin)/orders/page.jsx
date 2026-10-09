"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Package,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  RotateCcw,
  ShoppingCart,
  Wallet,
  ArrowUpDown,
  X,
  CalendarDays,
  SlidersHorizontal,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

const initialOrders = [
  {
    id: "AM-10842",
    date: "Oct 09, 2026",
    time: "10:42 AM",
    customer: "Nusrat Jahan",
    phone: "01712 345678",
    seller: "TrendHive BD",
    product: "Premium Oversized Hoodie",
    sku: "HD-001-BLK",
    quantity: 2,
    subtotal: 2980,
    deliveryFee: 80,
    total: 3060,
    payment: "COD",
    status: "Processing",
    courier: "Not assigned",
    district: "Dhaka",
  },
  {
    id: "AM-10841",
    date: "Oct 09, 2026",
    time: "10:18 AM",
    customer: "Tanvir Hasan",
    phone: "01819 223344",
    seller: "Urban Cart",
    product: "Essential Sweatshirt",
    sku: "SW-012-GRY",
    quantity: 1,
    subtotal: 1890,
    deliveryFee: 80,
    total: 1970,
    payment: "COD",
    status: "Delivered",
    courier: "Pathao",
    district: "Chattogram",
  },
  {
    id: "AM-10840",
    date: "Oct 09, 2026",
    time: "09:56 AM",
    customer: "Sadia Rahman",
    phone: "01911 445566",
    seller: "StyleMart",
    product: "Classic Canvas Backpack",
    sku: "BP-008-BLK",
    quantity: 1,
    subtotal: 1290,
    deliveryFee: 80,
    total: 1370,
    payment: "COD",
    status: "In Transit",
    courier: "Steadfast",
    district: "Sylhet",
  },
  {
    id: "AM-10839",
    date: "Oct 09, 2026",
    time: "09:34 AM",
    customer: "Rakib Ahmed",
    phone: "01612 778899",
    seller: "Gadget Point",
    product: "Smart LED Desk Lamp",
    sku: "LP-002-WHT",
    quantity: 1,
    subtotal: 1090,
    deliveryFee: 60,
    total: 1150,
    payment: "COD",
    status: "Pending",
    courier: "Not assigned",
    district: "Narayanganj",
  },
  {
    id: "AM-10838",
    date: "Oct 09, 2026",
    time: "09:12 AM",
    customer: "Ayesha Karim",
    phone: "01722 889900",
    seller: "Daily Needs",
    product: "Stainless Steel Water Bottle",
    sku: "WB-004-BLK",
    quantity: 2,
    subtotal: 1380,
    deliveryFee: 80,
    total: 1460,
    payment: "COD",
    status: "Delivered",
    courier: "RedX",
    district: "Gazipur",
  },
  {
    id: "AM-10837",
    date: "Oct 09, 2026",
    time: "08:48 AM",
    customer: "Imran Hossain",
    phone: "01844 112233",
    seller: "TrendHive BD",
    product: "Everyday Running Shoes",
    sku: "SH-011-WHT",
    quantity: 1,
    subtotal: 2490,
    deliveryFee: 80,
    total: 2570,
    payment: "COD",
    status: "Cancelled",
    courier: "Not assigned",
    district: "Dhaka",
  },
  {
    id: "AM-10836",
    date: "Oct 08, 2026",
    time: "08:22 PM",
    customer: "Farzana Akter",
    phone: "01922 334455",
    seller: "Urban Cart",
    product: "Premium Cotton T-Shirt",
    sku: "TS-003-WHT",
    quantity: 3,
    subtotal: 1770,
    deliveryFee: 80,
    total: 1850,
    payment: "COD",
    status: "Processing",
    courier: "Not assigned",
    district: "Cumilla",
  },
  {
    id: "AM-10835",
    date: "Oct 08, 2026",
    time: "07:46 PM",
    customer: "Mahmudul Hasan",
    phone: "01511 667788",
    seller: "StyleMart",
    product: "Minimal Leather Wallet",
    sku: "WL-007-BLK",
    quantity: 1,
    subtotal: 790,
    deliveryFee: 60,
    total: 850,
    payment: "COD",
    status: "Returned",
    courier: "Pathao",
    district: "Dhaka",
  },
  {
    id: "AM-10834",
    date: "Oct 08, 2026",
    time: "07:14 PM",
    customer: "Rifat Islam",
    phone: "01711 998877",
    seller: "Gadget Point",
    product: "Wireless Mouse",
    sku: "MS-014-BLK",
    quantity: 1,
    subtotal: 950,
    deliveryFee: 60,
    total: 1010,
    payment: "COD",
    status: "Pending",
    courier: "Not assigned",
    district: "Rajshahi",
  },
  {
    id: "AM-10833",
    date: "Oct 08, 2026",
    time: "06:42 PM",
    customer: "Mim Akter",
    phone: "01611 223344",
    seller: "Daily Needs",
    product: "Portable Blender",
    sku: "BL-002-PNK",
    quantity: 1,
    subtotal: 1590,
    deliveryFee: 80,
    total: 1670,
    payment: "COD",
    status: "In Transit",
    courier: "Steadfast",
    district: "Khulna",
  },
  {
    id: "AM-10832",
    date: "Oct 08, 2026",
    time: "06:15 PM",
    customer: "Sakib Rahman",
    phone: "01811 667788",
    seller: "TrendHive BD",
    product: "Casual Sneakers",
    sku: "SN-006-BLK",
    quantity: 1,
    subtotal: 2190,
    deliveryFee: 80,
    total: 2270,
    payment: "COD",
    status: "Delivered",
    courier: "RedX",
    district: "Dhaka",
  },
  {
    id: "AM-10831",
    date: "Oct 08, 2026",
    time: "05:52 PM",
    customer: "Rumana Islam",
    phone: "01933 445566",
    seller: "Urban Cart",
    product: "Travel Organizer",
    sku: "TR-009-GRY",
    quantity: 1,
    subtotal: 690,
    deliveryFee: 60,
    total: 750,
    payment: "COD",
    status: "Processing",
    courier: "Not assigned",
    district: "Barishal",
  },
];

const statusOptions = [
  "All statuses",
  "Pending",
  "Processing",
  "In Transit",
  "Delivered",
  "Cancelled",
  "Returned",
];

function formatPrice(amount) {
  return `৳${Number(amount).toLocaleString("en-BD")}`;
}

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-amber-50 text-amber-700 ring-amber-200",
    Processing: "bg-violet-50 text-violet-700 ring-violet-200",
    "In Transit": "bg-blue-50 text-blue-700 ring-blue-200",
    Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Cancelled: "bg-red-50 text-red-700 ring-red-200",
    Returned: "bg-orange-50 text-orange-700 ring-orange-200",
  };

  const icons = {
    Pending: Clock3,
    Processing: Package,
    "In Transit": Truck,
    Delivered: CheckCircle2,
    Cancelled: XCircle,
    Returned: RotateCcw,
  };

  const Icon = icons[status] || Clock3;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${
        styles[status] || "bg-gray-50 text-gray-600 ring-gray-200"
      }`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

function MetricCard({ title, value, icon: Icon, color, description }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-[#646970]">
          {title}
        </span>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}
        >
          <Icon size={17} />
        </div>
      </div>

      <p className="mt-3 text-2xl font-bold tracking-tight text-[#1d2327]">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-[#8c8f94]">
        {description}
      </p>
    </div>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [seller, setSeller] = useState("All sellers");
  const [payment, setPayment] = useState("All payment methods");
  const [sortBy, setSortBy] = useState("newest");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("10");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [bulkAction, setBulkAction] = useState("");
  const [notice, setNotice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const sellers = useMemo(
    () => [...new Set(orders.map((order) => order.seller))],
    [orders]
  );

  const filteredOrders = useMemo(() => {
    let result = orders.filter((order) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        [
          order.id,
          order.customer,
          order.phone,
          order.seller,
          order.product,
          order.district,
        ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        status === "All statuses" || order.status === status;

      const matchesSeller =
        seller === "All sellers" || order.seller === seller;

      const matchesPayment =
        payment === "All payment methods" || order.payment === payment;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSeller &&
        matchesPayment
      );
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "amount-high") return b.total - a.total;
      if (sortBy === "amount-low") return a.total - b.total;
      if (sortBy === "oldest") return a.id.localeCompare(b.id);
      return b.id.localeCompare(a.id);
    });

    return result;
  }, [orders, search, status, seller, payment, sortBy]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredOrders.length / Number(pageSize))
  );

  const currentPage = Math.min(page, pageCount);

  const visibleOrders = filteredOrders.slice(
    (currentPage - 1) * Number(pageSize),
    currentPage * Number(pageSize)
  );

  const allVisibleSelected =
    visibleOrders.length > 0 &&
    visibleOrders.every((order) => selected.includes(order.id));

  const totalGMV = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const processingCount = orders.filter(
    (o) => o.status === "Processing"
  ).length;
  const deliveredCount = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  function toggleOrder(id) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function toggleAllVisible() {
    if (allVisibleSelected) {
      setSelected((current) =>
        current.filter(
          (id) => !visibleOrders.some((order) => order.id === id)
        )
      );
    } else {
      setSelected((current) => [
        ...new Set([...current, ...visibleOrders.map((order) => order.id)]),
      ]);
    }
  }

  function clearFilters() {
    setSearch("");
    setStatus("All statuses");
    setSeller("All sellers");
    setPayment("All payment methods");
    setSortBy("newest");
    setPage(1);
  }

  function handleBulkAction() {
    if (!bulkAction || selected.length === 0) {
      setNotice("Select orders and a bulk action first.");
      return;
    }

    if (bulkAction === "export") {
      const rows = orders.filter((order) => selected.includes(order.id));
      const header = [
        "Order ID",
        "Date",
        "Customer",
        "Phone",
        "Seller",
        "Product",
        "Quantity",
        "Total",
        "Payment",
        "Status",
        "Courier",
        "District",
      ];

      const csvRows = rows.map((order) =>
        [
          order.id,
          order.date,
          order.customer,
          order.phone,
          order.seller,
          order.product,
          order.quantity,
          order.total,
          order.payment,
          order.status,
          order.courier,
          order.district,
        ]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      );

      const csv = [header.join(","), ...csvRows].join("\n");
      const blob = new Blob(["\uFEFF", csv], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "amardokan-orders.csv";
      anchor.click();
      URL.revokeObjectURL(url);
      setNotice(`${rows.length} orders exported.`);
      setBulkAction("");
      return;
    }

    if (bulkAction === "processing") {
      setOrders((current) =>
        current.map((order) =>
          selected.includes(order.id) && order.status === "Pending"
            ? { ...order, status: "Processing" }
            : order
        )
      );
      setNotice("Selected pending orders moved to processing.");
      setSelected([]);
      setBulkAction("");
      return;
    }

    if (bulkAction === "cancel") {
      setOrders((current) =>
        current.map((order) =>
          selected.includes(order.id) &&
          ["Pending", "Processing"].includes(order.status)
            ? { ...order, status: "Cancelled" }
            : order
        )
      );
      setNotice("Eligible selected orders cancelled.");
      setSelected([]);
      setBulkAction("");
    }
  }

  function updateOrderStatus(id, nextStatus) {
    setOrders((current) =>
      current.map((order) =>
        order.id === id ? { ...order, status: nextStatus } : order
      )
    );

    setSelectedOrder((current) =>
      current?.id === id ? { ...current, status: nextStatus } : current
    );

    setNotice(`${id} updated to ${nextStatus}.`);
  }

  function exportVisibleOrders() {
    const ids = filteredOrders.map((order) => order.id);
    setSelected(ids);
    setNotice("Orders selected for export. Choose Export CSV from bulk actions.");
  }

  const hasActiveFilters =
    search ||
    status !== "All statuses" ||
    seller !== "All sellers" ||
    payment !== "All payment methods";

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1700px]">
        {/* Page heading */}
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-[#8c8f94]">
              <span>Admin</span>
              <ChevronRight size={13} />
              <span className="font-medium text-[#50575e]">Orders</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#1d2327] sm:text-3xl">
              Orders
            </h1>

            <p className="mt-1.5 text-sm text-[#646970]">
              Monitor and manage orders from every seller on AmarDokan.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={exportVisibleOrders}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#c3c4c7] bg-white px-3.5 text-sm font-semibold text-[#1d2327] transition hover:bg-[#f6f7f7]"
            >
              <Download size={16} />
              Prepare Export
            </button>

            <button
              onClick={() => {
                clearFilters();
                setNotice("Filters reset.");
              }}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#1d2327] px-3.5 text-sm font-semibold text-white transition hover:bg-[#2c3338]"
            >
              <RefreshCw size={15} />
              Reset View
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-4">
          <MetricCard
            title="Total Orders"
            value={orders.length.toLocaleString("en-BD")}
            icon={ShoppingCart}
            color="bg-[#edf6df] text-[#638e27]"
            description="Across all sellers"
          />

          <MetricCard
            title="Pending Orders"
            value={pendingCount.toLocaleString("en-BD")}
            icon={Clock3}
            color="bg-amber-50 text-amber-600"
            description="Awaiting confirmation"
          />

          <MetricCard
            title="Processing"
            value={processingCount.toLocaleString("en-BD")}
            icon={Package}
            color="bg-violet-50 text-violet-600"
            description="Being prepared for dispatch"
          />

          <MetricCard
            title="Delivered Orders"
            value={deliveredCount.toLocaleString("en-BD")}
            icon={CheckCircle2}
            color="bg-emerald-50 text-emerald-600"
            description={`GMV: ${formatPrice(totalGMV)}`}
          />
        </div>

        {/* Notice */}
        {notice && (
          <div className="mt-5 flex items-start justify-between gap-3 rounded-lg border border-[#d6e8b9] bg-[#f5faed] px-4 py-3 text-sm text-[#456b13]">
            <p>{notice}</p>
            <button
              onClick={() => setNotice("")}
              aria-label="Dismiss message"
              className="shrink-0 rounded p-0.5 hover:bg-black/5"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Orders panel */}
        <section className="mt-6 overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
          {/* Panel title */}
          <div className="flex flex-col gap-3 border-b border-[#eee] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="text-sm font-bold text-[#1d2327]">
                All Orders
              </h2>
              <p className="mt-1 text-xs text-[#8c8f94]">
                {filteredOrders.length} matching orders
                {selected.length > 0 && ` · ${selected.length} selected`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowFilters((value) => !value)}
                className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-semibold transition ${
                  showFilters
                    ? "border-[#8aad45] bg-[#f5faed] text-[#456b13]"
                    : "border-[#dcdcde] bg-white text-[#50575e] hover:bg-[#f6f7f7]"
                }`}
              >
                <SlidersHorizontal size={15} />
                Filters
                {hasActiveFilters && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#78a92b]" />
                )}
              </button>

              <label className="flex h-9 items-center gap-2 rounded-lg border border-[#dcdcde] px-2.5">
                <ArrowUpDown size={14} className="text-[#8c8f94]" />
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  className="max-w-36.25 bg-transparent text-xs font-medium text-[#50575e] outline-none"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="amount-high">Highest amount</option>
                  <option value="amount-low">Lowest amount</option>
                </select>
              </label>
            </div>
          </div>

          {/* Search + filters */}
          <div className="space-y-3 border-b border-[#eee] p-4 sm:px-5">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c8f94]"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search order ID, customer, phone, seller, product..."
                  className="h-10 w-full rounded-lg border border-[#dcdcde] bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-[#a0a3a7] focus:border-[#8aad45] focus:ring-2 focus:ring-[#a3db4a]/20"
                />
              </div>

              <button
                onClick={() => setShowFilters((value) => !value)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dcdcde] px-4 text-sm font-medium text-[#50575e] hover:bg-[#f6f7f7] md:hidden"
              >
                <Filter size={15} />
                More filters
              </button>
            </div>

            {showFilters && (
              <div className="grid gap-3 pt-1 sm:grid-cols-2 xl:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#646970]">
                    Order status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setPage(1);
                    }}
                    className="h-10 w-full rounded-lg border border-[#dcdcde] bg-white px-3 text-sm outline-none focus:border-[#8aad45]"
                  >
                    {statusOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#646970]">
                    Seller
                  </label>
                  <select
                    value={seller}
                    onChange={(e) => {
                      setSeller(e.target.value);
                      setPage(1);
                    }}
                    className="h-10 w-full rounded-lg border border-[#dcdcde] bg-white px-3 text-sm outline-none focus:border-[#8aad45]"
                  >
                    <option>All sellers</option>
                    {sellers.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#646970]">
                    Payment method
                  </label>
                  <select
                    value={payment}
                    onChange={(e) => {
                      setPayment(e.target.value);
                      setPage(1);
                    }}
                    className="h-10 w-full rounded-lg border border-[#dcdcde] bg-white px-3 text-sm outline-none focus:border-[#8aad45]"
                  >
                    <option>All payment methods</option>
                    <option>COD</option>
                    <option>Online Payment</option>
                  </select>
                </div>

                <div className="flex items-end gap-2">
                  <button
                    onClick={clearFilters}
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#dcdcde] px-3 text-xs font-semibold text-[#50575e] hover:bg-[#f6f7f7]"
                  >
                    <X size={14} />
                    Clear filters
                  </button>
                </div>
              </div>
            )}

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-[#8c8f94]">
                  Active filters:
                </span>

                {status !== "All statuses" && (
                  <button
                    onClick={() => setStatus("All statuses")}
                    className="inline-flex items-center gap-1 rounded-full bg-[#f0f1f1] px-2.5 py-1 text-[11px] text-[#50575e]"
                  >
                    {status} <X size={12} />
                  </button>
                )}

                {seller !== "All sellers" && (
                  <button
                    onClick={() => setSeller("All sellers")}
                    className="inline-flex items-center gap-1 rounded-full bg-[#f0f1f1] px-2.5 py-1 text-[11px] text-[#50575e]"
                  >
                    {seller} <X size={12} />
                  </button>
                )}

                {payment !== "All payment methods" && (
                  <button
                    onClick={() => setPayment("All payment methods")}
                    className="inline-flex items-center gap-1 rounded-full bg-[#f0f1f1] px-2.5 py-1 text-[11px] text-[#50575e]"
                  >
                    {payment} <X size={12} />
                  </button>
                )}

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="inline-flex items-center gap-1 rounded-full bg-[#f0f1f1] px-2.5 py-1 text-[11px] text-[#50575e]"
                  >
                    Search: {search} <X size={12} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Bulk action toolbar */}
          <div className="flex flex-col gap-3 border-b border-[#eee] bg-[#fafafa] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="h-9 rounded-lg border border-[#dcdcde] bg-white px-3 text-xs outline-none focus:border-[#8aad45]"
              >
                <option value="">Bulk actions</option>
                <option value="processing">Move to processing</option>
                <option value="cancel">Cancel eligible orders</option>
                <option value="export">Export selected to CSV</option>
              </select>

              <button
                onClick={handleBulkAction}
                className="h-9 rounded-lg border border-[#c3c4c7] bg-white px-3.5 text-xs font-semibold text-[#1d2327] hover:bg-[#f0f0f1]"
              >
                Apply
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#646970]">
              <span>Show</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(e.target.value);
                  setPage(1);
                }}
                className="h-8 rounded-md border border-[#dcdcde] bg-white px-2 outline-none"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span>per page</span>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-280 text-left">
              <thead>
                <tr className="border-b border-[#eee] bg-white">
                  <th className="w-12 px-5 py-3">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleAllVisible}
                      aria-label="Select all visible orders"
                      className="h-4 w-4 cursor-pointer rounded border-[#c3c4c7] accent-[#78a92b]"
                    />
                  </th>
                  <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8c8f94]">
                    Order
                  </th>
                  <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8c8f94]">
                    Customer
                  </th>
                  <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8c8f94]">
                    Seller
                  </th>
                  <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8c8f94]">
                    Product
                  </th>
                  <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8c8f94]">
                    Total
                  </th>
                  <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8c8f94]">
                    Payment
                  </th>
                  <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8c8f94]">
                    Status
                  </th>
                  <th className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#8c8f94]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleOrders.map((order) => (
                  <tr
                    key={order.id}
                    className={`border-b border-[#f0f0f1] transition last:border-0 hover:bg-[#fafbf8] ${
                      selected.includes(order.id) ? "bg-[#f7faef]" : ""
                    }`}
                  >
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(order.id)}
                        onChange={() => toggleOrder(order.id)}
                        aria-label={`Select ${order.id}`}
                        className="h-4 w-4 cursor-pointer rounded border-[#c3c4c7] accent-[#78a92b]"
                      />
                    </td>

                    <td className="px-3 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-xs font-bold text-[#5f8c20] hover:underline"
                      >
                        {order.id}
                      </button>
                      <p className="mt-1 whitespace-nowrap text-[10px] text-[#8c8f94]">
                        {order.date}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <p className="text-xs font-semibold text-[#1d2327]">
                        {order.customer}
                      </p>
                      <p className="mt-1 text-[11px] text-[#8c8f94]">
                        {order.phone}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <p className="text-xs font-medium text-[#50575e]">
                        {order.seller}
                      </p>
                      <p className="mt-1 text-[10px] text-[#8c8f94]">
                        {order.district}
                      </p>
                    </td>

                    <td className="max-w-47.5 px-3 py-4">
                      <p className="truncate text-xs font-medium text-[#1d2327]">
                        {order.product}
                      </p>
                      <p className="mt-1 text-[10px] text-[#8c8f94]">
                        SKU: {order.sku} · Qty: {order.quantity}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4">
                      <p className="text-xs font-bold text-[#1d2327]">
                        {formatPrice(order.total)}
                      </p>
                      <p className="mt-1 text-[10px] text-[#8c8f94]">
                        incl. delivery
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <span className="rounded-md border border-[#dcdcde] bg-white px-2 py-1 text-[10px] font-semibold text-[#646970]">
                        {order.payment}
                      </span>
                    </td>

                    <td className="px-3 py-4">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="px-3 py-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#dcdcde] bg-white px-2.5 text-xs font-semibold text-[#50575e] transition hover:border-[#a3db4a] hover:bg-[#f5faed]"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/tablet cards */}
          <div className="divide-y divide-[#eee] lg:hidden">
            {visibleOrders.map((order) => (
              <div key={order.id} className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(order.id)}
                    onChange={() => toggleOrder(order.id)}
                    aria-label={`Select ${order.id}`}
                    className="mt-1 h-4 w-4 cursor-pointer accent-[#78a92b]"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-sm font-bold text-[#5f8c20] hover:underline"
                      >
                        {order.id}
                      </button>

                      <StatusBadge status={order.status} />
                    </div>

                    <p className="mt-1 text-xs text-[#8c8f94]">
                      {order.date} · {order.time}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#8c8f94]">
                          Customer
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#1d2327]">
                          {order.customer}
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#646970]">
                          {order.phone}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#8c8f94]">
                          Seller
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#1d2327]">
                          {order.seller}
                        </p>
                      </div>

                      <div className="col-span-2">
                        <p className="text-[10px] uppercase tracking-wider text-[#8c8f94]">
                          Product
                        </p>
                        <p className="mt-1 text-xs font-medium text-[#1d2327]">
                          {order.product}
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#8c8f94]">
                          SKU: {order.sku} · Qty: {order.quantity}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#8c8f94]">
                          Total
                        </p>
                        <p className="mt-1 text-sm font-bold">
                          {formatPrice(order.total)}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#8c8f94]">
                          Payment
                        </p>
                        <p className="mt-1 text-xs font-medium">
                          {order.payment}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#dcdcde] text-xs font-semibold text-[#50575e] hover:bg-[#f6f7f7]"
                    >
                      <Eye size={14} />
                      View order details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {visibleOrders.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f1f1] text-[#8c8f94]">
                <ShoppingCart size={22} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-[#1d2327]">
                No orders found
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#8c8f94]">
                Try another search or clear your filters to see more orders.
              </p>

              <button
                onClick={clearFilters}
                className="mt-4 text-xs font-semibold text-[#5f8c20] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-[#eee] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-[#646970]">
              Showing{" "}
              <span className="font-semibold text-[#1d2327]">
                {filteredOrders.length === 0
                  ? 0
                  : (currentPage - 1) * Number(pageSize) + 1}
              </span>
              {" – "}
              <span className="font-semibold text-[#1d2327]">
                {Math.min(currentPage * Number(pageSize), filteredOrders.length)}
              </span>
              {" of "}
              <span className="font-semibold text-[#1d2327]">
                {filteredOrders.length}
              </span>
              {" orders"}
            </p>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dcdcde] text-[#50575e] hover:bg-[#f6f7f7] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from({ length: pageCount }, (_, i) => i + 1)
                .filter(
                  (number) =>
                    number === 1 ||
                    number === pageCount ||
                    Math.abs(number - currentPage) <= 1
                )
                .map((number, index, array) => (
                  <span key={number} className="contents">
                    {index > 0 && array[index - 1] !== number - 1 && (
                      <span className="px-1 text-xs text-[#8c8f94]">
                        ...
                      </span>
                    )}

                    <button
                      onClick={() => setPage(number)}
                      className={`h-9 min-w-9 rounded-lg border px-2 text-xs font-semibold ${
                        currentPage === number
                          ? "border-[#1d2327] bg-[#1d2327] text-white"
                          : "border-[#dcdcde] text-[#50575e] hover:bg-[#f6f7f7]"
                      }`}
                    >
                      {number}
                    </button>
                  </span>
                ))}

              <button
                disabled={currentPage >= pageCount}
                onClick={() =>
                  setPage((p) => Math.min(pageCount, p + 1))
                }
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dcdcde] text-[#50575e] hover:bg-[#f6f7f7] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>

        <p className="mt-4 text-[11px] leading-5 text-[#8c8f94]">
          Dashboard preview uses sample order data. Connect these controls to
          your order API before using them for real operations.
        </p>
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-100 flex items-end justify-center bg-black/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedOrder(null);
          }}
        >
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#eee] bg-white px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8c8f94]">
                  Order details
                </p>

                <h2 className="mt-1 text-lg font-bold text-[#1d2327]">
                  {selectedOrder.id}
                </h2>

                <p className="mt-1 text-xs text-[#8c8f94]">
                  {selectedOrder.date} · {selectedOrder.time}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                aria-label="Close order details"
                className="rounded-lg p-2 text-[#646970] hover:bg-[#f0f0f1]"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#eee] p-4">
                <div>
                  <p className="text-xs text-[#8c8f94]">
                    Current status
                  </p>
                  <div className="mt-2">
                    <StatusBadge status={selectedOrder.status} />
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-[#8c8f94]">
                    Order total
                  </p>
                  <p className="mt-1 text-xl font-bold">
                    {formatPrice(selectedOrder.total)}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#eee] p-4">
                  <p className="text-xs font-bold text-[#1d2327]">
                    Customer information
                  </p>
                  <p className="mt-3 text-sm font-semibold">
                    {selectedOrder.customer}
                  </p>
                  <p className="mt-1 text-xs text-[#646970]">
                    {selectedOrder.phone}
                  </p>
                  <p className="mt-1 text-xs text-[#646970]">
                    {selectedOrder.district}, Bangladesh
                  </p>
                </div>

                <div className="rounded-xl border border-[#eee] p-4">
                  <p className="text-xs font-bold text-[#1d2327]">
                    Seller & delivery
                  </p>
                  <p className="mt-3 text-sm font-semibold">
                    {selectedOrder.seller}
                  </p>
                  <p className="mt-1 text-xs text-[#646970]">
                    Courier: {selectedOrder.courier}
                  </p>
                  <p className="mt-1 text-xs text-[#646970]">
                    Payment: {selectedOrder.payment}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#eee] p-4">
                <p className="text-xs font-bold text-[#1d2327]">
                  Ordered product
                </p>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">
                      {selectedOrder.product}
                    </p>
                    <p className="mt-1 text-xs text-[#8c8f94]">
                      SKU: {selectedOrder.sku}
                    </p>
                    <p className="mt-1 text-xs text-[#646970]">
                      Quantity: {selectedOrder.quantity}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-sm font-bold">
                    {formatPrice(selectedOrder.subtotal)}
                  </p>
                </div>

                <div className="mt-4 space-y-2 border-t border-[#eee] pt-3">
                  <div className="flex justify-between text-xs text-[#646970]">
                    <span>Subtotal</span>
                    <span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#646970]">
                    <span>Delivery fee</span>
                    <span>{formatPrice(selectedOrder.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#eee] pt-3 text-sm font-bold">
                    <span>Total</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-[#1d2327]">
                  Update order status
                </label>

                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    updateOrderStatus(selectedOrder.id, e.target.value)
                  }
                  className="h-11 w-full rounded-lg border border-[#dcdcde] bg-white px-3 text-sm outline-none focus:border-[#8aad45]"
                >
                  {statusOptions.slice(1).map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>

                <p className="mt-2 text-[11px] leading-5 text-[#8c8f94]">
                  Preview only. In production, status changes must be
                  validated by the server and recorded in the order audit log.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-[#eee] bg-[#fafafa] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="h-10 rounded-lg border border-[#dcdcde] bg-white px-4 text-sm font-semibold text-[#50575e] hover:bg-[#f0f0f1]"
              >
                Close
              </button>

              <Link
                href={`/admin/orders/${selectedOrder.id}`}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1d2327] px-4 text-sm font-semibold text-white hover:bg-[#2c3338]"
              >
                Full order page
                <ExternalLink size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}