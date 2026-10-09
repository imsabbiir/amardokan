
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  RotateCcw,
  Clock,
  CheckCircle2,
  XCircle,
  Banknote,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  SlidersHorizontal,
  Package,
  UserRound,
  CalendarDays,
  MessageSquareText,
  ArrowUpRight,
  AlertTriangle,
  Check,
} from "lucide-react";

const initialReturns = [
  {
    id: "RET-2026-018",
    orderId: "ORD-1048",
    customer: "Rahim Uddin",
    phone: "01712345678",
    product: "Premium Cotton T-Shirt",
    sku: "TSH-002",
    quantity: 1,
    amount: 350,
    reason: "Wrong size",
    details: "The product is smaller than expected.",
    status: "Requested",
    refundStatus: "Not Started",
    date: "2026-10-09",
  },
  {
    id: "RET-2026-017",
    orderId: "ORD-1045",
    customer: "Sadia Islam",
    phone: "01612345678",
    product: "Portable LED Desk Lamp",
    sku: "LMP-005",
    quantity: 1,
    amount: 650,
    reason: "Damaged product",
    details: "The lamp arrived with a cracked base.",
    status: "Approved",
    refundStatus: "Pending",
    date: "2026-10-08",
  },
  {
    id: "RET-2026-016",
    orderId: "ORD-1042",
    customer: "Hasan Mahmud",
    phone: "01412345678",
    product: "Ceramic Coffee Mug",
    sku: "MUG-004",
    quantity: 1,
    amount: 220,
    reason: "Wrong item",
    details: "Received a different color than ordered.",
    status: "Received",
    refundStatus: "Pending",
    date: "2026-10-08",
  },
  {
    id: "RET-2026-015",
    orderId: "ORD-1039",
    customer: "Nusrat Jahan",
    phone: "01812345678",
    product: "Wireless Bluetooth Earbuds",
    sku: "EAR-003",
    quantity: 1,
    amount: 950,
    reason: "Product not working",
    details: "The right earbud is not charging.",
    status: "Refunded",
    refundStatus: "Completed",
    date: "2026-10-07",
  },
  {
    id: "RET-2026-014",
    orderId: "ORD-1036",
    customer: "Tanvir Ahmed",
    phone: "01912345678",
    product: "Canvas Tote Bag",
    sku: "BAG-006",
    quantity: 1,
    amount: 280,
    reason: "Changed mind",
    details: "The customer no longer needs the product.",
    status: "Rejected",
    refundStatus: "Not Applicable",
    date: "2026-10-06",
  },
  {
    id: "RET-2026-013",
    orderId: "ORD-1032",
    customer: "Mim Akter",
    phone: "01312345678",
    product: "Premium Cotton T-Shirt",
    sku: "TSH-002",
    quantity: 2,
    amount: 700,
    reason: "Wrong size",
    details: "Both shirts are too large.",
    status: "Requested",
    refundStatus: "Not Started",
    date: "2026-10-05",
  },
];

const returnStatuses = [
  "Requested",
  "Approved",
  "Rejected",
  "Received",
  "Refunded",
];

const statusStyles = {
  Requested: "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-blue-50 text-blue-700 border-blue-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
  Received: "bg-violet-50 text-violet-700 border-violet-200",
  Refunded: "bg-green-50 text-green-700 border-green-200",
};

const refundStyles = {
  "Not Started": "text-[#646970]",
  Pending: "text-amber-700",
  Completed: "text-green-700",
  "Not Applicable": "text-[#646970]",
};

function StatCard({ title, value, note, icon: Icon, tone }) {
  const tones = {
    amber: "bg-amber-50 text-amber-700",
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#646970]">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight">{value}</h3>
          <p className="mt-1 text-xs text-[#646970]">{note}</p>
        </div>
        <div className={`rounded-lg p-2.5 ${tones[tone]}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default function ReturnsPage() {
  const [returns, setReturns] = useState(initialReturns);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");
  const [refundStatus, setRefundStatus] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const pageSize = 6;

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    return returns.filter((item) => {
      const matchesSearch =
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.orderId.toLowerCase().includes(query) ||
        item.customer.toLowerCase().includes(query) ||
        item.phone.includes(query) ||
        item.product.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [returns, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const requestedCount = returns.filter(
    (item) => item.status === "Requested"
  ).length;

  const approvedCount = returns.filter(
    (item) => item.status === "Approved"
  ).length;

  const completedCount = returns.filter(
    (item) => item.status === "Refunded"
  ).length;

  const pendingRefundAmount = returns
    .filter((item) => item.refundStatus === "Pending")
    .reduce((sum, item) => sum + item.amount, 0);

  function openReturn(item) {
    setSelected(item);
    setEditingStatus(item.status);
    setRefundStatus(item.refundStatus);
    setAdminNote(item.adminNote || "");
    setError("");
  }

  function saveReturn() {
    if (!selected) return;

    if (editingStatus === "Refunded" && refundStatus !== "Completed") {
      setError("Mark the refund as completed before closing this return as refunded.");
      return;
    }

    if (
      editingStatus === "Rejected" &&
      refundStatus === "Completed"
    ) {
      setError("A rejected return cannot have a completed refund.");
      return;
    }

    if (editingStatus === "Requested" && refundStatus === "Completed") {
      setError("A new return request cannot have a completed refund.");
      return;
    }

    const finalRefundStatus =
      editingStatus === "Rejected"
        ? "Not Applicable"
        : editingStatus === "Refunded"
          ? "Completed"
          : editingStatus === "Requested"
            ? "Not Started"
            : refundStatus;

    setReturns((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              status: editingStatus,
              refundStatus: finalRefundStatus,
              adminNote: adminNote.trim(),
            }
          : item
      )
    );

    setNotice(`${selected.id} has been updated.`);
    setSelected(null);
    setError("");
  }

  function exportCsv() {
    const headers = [
      "Return ID",
      "Order ID",
      "Customer",
      "Phone",
      "Product",
      "SKU",
      "Quantity",
      "Amount",
      "Reason",
      "Return Status",
      "Refund Status",
      "Date",
    ];

    const escapeCsv = (value) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const rows = filtered.map((item) => [
      item.id,
      item.orderId,
      item.customer,
      item.phone,
      item.product,
      item.sku,
      item.quantity,
      item.amount,
      item.reason,
      item.status,
      item.refundStatus,
      item.date,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "amardokan-returns.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#f6f7f7] text-[#1d2327]">
      <div className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-medium text-[#646970]">
              Admin / <span className="text-[#2271b1]">Returns</span>
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Returns & Refunds
            </h1>
            <p className="mt-1 text-sm text-[#646970]">
              Review return requests, inspect returned items, and manage refunds.
            </p>
          </div>

          <button
            onClick={exportCsv}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#c3c4c7] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {notice && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            <span className="flex items-center gap-2">
              <Check size={16} />
              {notice}
            </span>
            <button onClick={() => setNotice("")} aria-label="Dismiss">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="New requests"
            value={requestedCount}
            note="Awaiting review"
            icon={Clock}
            tone="amber"
          />
          <StatCard
            title="Approved returns"
            value={approvedCount}
            note="Awaiting item receipt or processing"
            icon={CheckCircle2}
            tone="blue"
          />
          <StatCard
            title="Refunded"
            value={completedCount}
            note="Marked as completed"
            icon={RotateCcw}
            tone="green"
          />
          <StatCard
            title="Pending refunds"
            value={`৳${pendingRefundAmount.toLocaleString("en-BD")}`}
            note="Value awaiting refund completion"
            icon={Banknote}
            tone="red"
          />
        </div>

        {/* Return table */}
        <div className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
          <div className="border-b border-[#dcdcde] p-4 sm:p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-base font-bold">Return requests</h2>
                <p className="mt-1 text-sm text-[#646970]">
                  {filtered.length} return requests found
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative sm:w-72">
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
                    placeholder="Search return, order, customer..."
                    className="w-full rounded-lg border border-[#c3c4c7] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#c3c4c7] px-3 py-2.5 text-sm font-medium hover:bg-gray-50"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 rounded-lg bg-[#f6f7f7] p-3">
                <label className="mb-1.5 block text-xs font-semibold text-[#646970]">
                  Return status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm sm:max-w-sm"
                >
                  <option value="All">All statuses</option>
                  {returnStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                    setPage(1);
                  }}
                  className="mt-3 block text-sm font-semibold text-[#2271b1] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {["All", ...returnStatuses].map((status) => {
                const count =
                  status === "All"
                    ? returns.length
                    : returns.filter((item) => item.status === status).length;

                return (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setPage(1);
                    }}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                      statusFilter === status
                        ? "border-[#a3db4a] bg-[#edf8d9] text-[#355a0c]"
                        : "border-[#dcdcde] text-[#646970] hover:bg-gray-50"
                    }`}
                  >
                    {status === "All" ? "All returns" : status}
                    <span>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-237.5 text-left text-sm">
              <thead className="bg-[#f6f7f7] text-xs uppercase tracking-wide text-[#646970]">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Return</th>
                  <th className="px-4 py-3.5 font-semibold">Customer</th>
                  <th className="px-4 py-3.5 font-semibold">Reason</th>
                  <th className="px-4 py-3.5 font-semibold">Amount</th>
                  <th className="px-4 py-3.5 font-semibold">Return status</th>
                  <th className="px-4 py-3.5 font-semibold">Refund</th>
                  <th className="px-4 py-3.5 font-semibold">Date</th>
                  <th className="px-5 py-3.5 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#f0f0f1]">
                {pageItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#fafafa]">
                    <td className="px-5 py-4">
                      <p className="font-semibold">{item.id}</p>
                      <p className="mt-1 text-xs text-[#646970]">
                        Order: {item.orderId}
                      </p>
                      <p className="mt-1 max-w-52 truncate text-xs text-[#646970]">
                        {item.product}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-semibold">{item.customer}</p>
                      <p className="mt-1 text-xs text-[#646970]">
                        {item.phone}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-medium">{item.reason}</p>
                      <p className="mt-1 max-w-44 truncate text-xs text-[#646970]">
                        {item.details}
                      </p>
                    </td>

                    <td className="px-4 py-4 font-semibold">
                      ৳{item.amount.toLocaleString("en-BD")}
                      <p className="mt-1 text-xs font-normal text-[#646970]">
                        Qty: {item.quantity}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`text-xs font-semibold ${refundStyles[item.refundStatus]}`}
                      >
                        {item.refundStatus}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-xs text-[#646970]">
                      {new Date(item.date + "T12:00:00").toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => openReturn(item)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#c3c4c7] px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                        >
                          <Eye size={14} />
                          Review
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {pageItems.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <RotateCcw
                        size={32}
                        className="mx-auto text-[#a7aaad]"
                      />
                      <p className="mt-3 font-semibold">No returns found</p>
                      <p className="mt-1 text-sm text-[#646970]">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#dcdcde] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-[#646970]">
              Showing {filtered.length ? start + 1 : 0}–
              {Math.min(start + pageSize, filtered.length)} of {filtered.length}{" "}
              returns
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

        {/* Review return modal */}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setSelected(null);
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="return-modal-title"
              className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-[#dcdcde] bg-white shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-[#dcdcde] p-5">
                <div>
                  <p className="text-xs font-medium text-[#646970]">
                    Return request review
                  </p>
                  <h2 id="return-modal-title" className="mt-1 text-xl font-bold">
                    {selected.id}
                  </h2>
                  <p className="mt-1 text-sm text-[#646970]">
                    Order {selected.orderId}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close modal"
                  className="rounded-lg p-2 text-[#646970] hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 p-5">
                <div className="rounded-xl border border-[#dcdcde] bg-[#f6f7f7] p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-white p-2.5 text-[#646970]">
                      <Package size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{selected.product}</p>
                      <p className="mt-1 text-xs text-[#646970]">
                        SKU: {selected.sku} · Quantity: {selected.quantity}
                      </p>
                      <p className="mt-2 text-sm text-[#646970]">
                        Customer: {selected.customer}
                      </p>
                      <p className="mt-2 text-sm font-bold">
                        Requested amount: ৳
                        {selected.amount.toLocaleString("en-BD")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-[#dcdcde] pt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#646970]">
                      Return reason
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {selected.reason}
                    </p>
                    <p className="mt-1 text-sm text-[#646970]">
                      {selected.details}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Return status
                  </label>
                  <select
                    value={editingStatus}
                    onChange={(e) => {
                      setEditingStatus(e.target.value);
                      setError("");
                    }}
                    className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                  >
                    {returnStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Refund status
                  </label>
                  <select
                    value={refundStatus}
                    onChange={(e) => {
                      setRefundStatus(e.target.value);
                      setError("");
                    }}
                    disabled={
                      editingStatus === "Rejected" ||
                      editingStatus === "Refunded" ||
                      editingStatus === "Requested"
                    }
                    className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none disabled:bg-gray-100 disabled:text-[#646970]"
                  >
                    <option value="Not Started">Not started</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Applicable">Not applicable</option>
                  </select>
                  <p className="mt-1.5 text-xs text-[#646970]">
                    Only mark a refund completed after verifying the actual
                    payment transaction.
                  </p>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Internal admin note
                  </label>
                  <textarea
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    rows={3}
                    placeholder="Add inspection notes or a reason for your decision..."
                    className="w-full resize-y rounded-lg border border-[#c3c4c7] px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="flex flex-wrap justify-end gap-2 border-t border-[#dcdcde] pt-4">
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-lg border border-[#c3c4c7] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveReturn}
                    className="rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-semibold hover:bg-[#91ca38]"
                  >
                    Save review
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
