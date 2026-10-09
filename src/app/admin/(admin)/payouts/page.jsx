
"use client";

import { useMemo, useState } from "react";
import {
  Wallet,
  Clock3,
  CheckCircle2,
  XCircle,
  Search,
  Download,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Banknote,
  ArrowDownToLine,
  ShieldCheck,
  CircleDollarSign,
  CalendarDays,
  UserRound,
  CreditCard,
  AlertTriangle,
} from "lucide-react";

const initialPayouts = [
  {
    id: "PAYO-2026-0208",
    seller: "Rahim Electronics",
    sellerId: "SEL-1008",
    email: "rahim@example.com",
    method: "bKash",
    account: "017•••••245",
    amount: 18500,
    fee: 185,
    netAmount: 18315,
    status: "Pending",
    requestedAt: "2026-10-09T10:30:00",
    note: "Weekly seller withdrawal",
  },
  {
    id: "PAYO-2026-0207",
    seller: "Fashion House BD",
    sellerId: "SEL-1007",
    email: "fashion@example.com",
    method: "Bank Transfer",
    account: "•••• 7284",
    amount: 32000,
    fee: 50,
    netAmount: 31950,
    status: "Processing",
    requestedAt: "2026-10-09T09:15:00",
    note: "Monthly settlement",
  },
  {
    id: "PAYO-2026-0206",
    seller: "Smart Gadgets",
    sellerId: "SEL-1006",
    email: "smart@example.com",
    method: "Nagad",
    account: "018•••••872",
    amount: 12750,
    fee: 127.5,
    netAmount: 12622.5,
    status: "Completed",
    requestedAt: "2026-10-08T16:20:00",
    note: "Seller withdrawal",
  },
  {
    id: "PAYO-2026-0205",
    seller: "Home Decor BD",
    sellerId: "SEL-1005",
    email: "home@example.com",
    method: "bKash",
    account: "019•••••164",
    amount: 8600,
    fee: 86,
    netAmount: 8514,
    status: "Pending",
    requestedAt: "2026-10-08T14:45:00",
    note: "Weekly seller withdrawal",
  },
  {
    id: "PAYO-2026-0204",
    seller: "Style Avenue",
    sellerId: "SEL-1004",
    email: "style@example.com",
    method: "Bank Transfer",
    account: "•••• 3491",
    amount: 24500,
    fee: 50,
    netAmount: 24450,
    status: "Completed",
    requestedAt: "2026-10-08T12:10:00",
    note: "Monthly settlement",
  },
  {
    id: "PAYO-2026-0203",
    seller: "Daily Needs Store",
    sellerId: "SEL-1003",
    email: "daily@example.com",
    method: "Nagad",
    account: "016•••••491",
    amount: 5400,
    fee: 54,
    netAmount: 5346,
    status: "Rejected",
    requestedAt: "2026-10-07T17:30:00",
    note: "Account verification required",
  },
  {
    id: "PAYO-2026-0202",
    seller: "Tech Corner",
    sellerId: "SEL-1002",
    email: "tech@example.com",
    method: "bKash",
    account: "017•••••907",
    amount: 15200,
    fee: 152,
    netAmount: 15048,
    status: "Completed",
    requestedAt: "2026-10-07T11:40:00",
    note: "Seller withdrawal",
  },
  {
    id: "PAYO-2026-0201",
    seller: "Urban Collection",
    sellerId: "SEL-1001",
    email: "urban@example.com",
    method: "Bank Transfer",
    account: "•••• 5820",
    amount: 41000,
    fee: 50,
    netAmount: 40950,
    status: "Pending",
    requestedAt: "2026-10-06T15:05:00",
    note: "Monthly settlement",
  },
  {
    id: "PAYO-2026-0200",
    seller: "Beauty Mart",
    sellerId: "SEL-1009",
    email: "beauty@example.com",
    method: "bKash",
    account: "018•••••382",
    amount: 7200,
    fee: 72,
    netAmount: 7128,
    status: "Processing",
    requestedAt: "2026-10-06T10:20:00",
    note: "Seller withdrawal",
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);

const formatDate = (date) =>
  new Date(date).toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Processing: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Completed: "bg-green-50 text-green-700 ring-green-600/20",
  Rejected: "bg-red-50 text-red-700 ring-red-600/20",
};

function StatusBadge({ status }) {
  const Icon =
    status === "Completed"
      ? CheckCircle2
      : status === "Processing"
        ? ArrowDownToLine
        : status === "Rejected"
          ? XCircle
          : Clock3;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        statusStyles[status]
      }`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

function StatCard({ title, amount, subtitle, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-[#646970]">{title}</p>
          <p className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
            {money(amount)}
          </p>
          <p className="mt-2 text-xs text-[#646970]">{subtitle}</p>
        </div>
        <div className={`rounded-lg p-2.5 ${color}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function downloadCSV(rows) {
  const headers = [
    "Payout ID",
    "Seller",
    "Seller ID",
    "Email",
    "Method",
    "Account",
    "Gross Amount",
    "Fee",
    "Net Amount",
    "Status",
    "Requested At",
    "Note",
  ];

  const escapeCSV = (value) =>
    `"${String(value ?? "").replace(/"/g, '""')}"`;

  const csv = [
    headers.join(","),
    ...rows.map((p) =>
      [
        p.id,
        p.seller,
        p.sellerId,
        p.email,
        p.method,
        p.account,
        p.amount,
        p.fee,
        p.netAmount,
        p.status,
        formatDate(p.requestedAt),
        p.note,
      ]
        .map(escapeCSV)
        .join(","),
    ),
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "amardokan-payouts.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState(initialPayouts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [actionTarget, setActionTarget] = useState(null);
  const [actionNote, setActionNote] = useState("");
  const [actionError, setActionError] = useState("");
  const pageSize = 6;

  const stats = useMemo(() => {
    const pending = payouts.filter((p) => p.status === "Pending");
    const processing = payouts.filter((p) => p.status === "Processing");
    const completed = payouts.filter((p) => p.status === "Completed");

    return {
      pending: pending.reduce((sum, p) => sum + p.amount, 0),
      processing: processing.reduce((sum, p) => sum + p.amount, 0),
      completed: completed.reduce((sum, p) => sum + p.netAmount, 0),
      pendingCount: pending.length,
      processingCount: processing.length,
      completedCount: completed.length,
    };
  }, [payouts]);

  const filteredPayouts = useMemo(() => {
    const q = search.trim().toLowerCase();

    return payouts.filter((p) => {
      const matchesSearch =
        !q ||
        [p.id, p.seller, p.sellerId, p.email, p.account].some((v) =>
          v.toLowerCase().includes(q),
        );

      const matchesStatus =
        statusFilter === "All" || p.status === statusFilter;
      const matchesMethod =
        methodFilter === "All" || p.method === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payouts, search, statusFilter, methodFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPayouts.length / pageSize),
  );
  const safePage = Math.min(page, totalPages);
  const pageItems = filteredPayouts.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const changeFilter = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const startAction = (payout, action) => {
    setActionTarget({ id: payout.id, action });
    setActionNote("");
    setActionError("");
  };

  const confirmAction = () => {
    if (!actionTarget) return;

    if (actionTarget.action === "reject" && !actionNote.trim()) {
      setActionError("Please enter a reason for rejecting this request.");
      return;
    }

    const nextStatus =
      actionTarget.action === "approve" ? "Processing" : "Rejected";

    setPayouts((current) =>
      current.map((p) =>
        p.id === actionTarget.id
          ? {
              ...p,
              status: nextStatus,
              note:
                actionTarget.action === "approve"
                  ? "Approved for processing in UI demo."
                  : `Rejected: ${actionNote.trim()}`,
            }
          : p,
      ),
    );

    setSelectedPayout((current) =>
      current?.id === actionTarget.id
        ? {
            ...current,
            status: nextStatus,
            note:
              actionTarget.action === "approve"
                ? "Approved for processing in UI demo."
                : `Rejected: ${actionNote.trim()}`,
          }
        : current,
    );

    setActionTarget(null);
    setActionNote("");
    setActionError("");
  };

  return (
    <div className="min-h-screen space-y-6 bg-[#f6f7f7] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-[#646970]">
            <span>Admin</span>
            <span>/</span>
            <span>Finance</span>
            <span>/</span>
            <span className="text-[#1d2327]">Payouts</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Seller payouts
          </h1>
          <p className="mt-1 text-sm text-[#646970]">
            Review withdrawal requests and monitor seller settlements.
          </p>
        </div>

        <button
          onClick={() => downloadCSV(filteredPayouts)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#dcdcde] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Demo warning */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <AlertTriangle size={19} className="mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold">Demo mode — no money is transferred</p>
          <p className="mt-1 leading-5">
            Approve and reject actions update only this page&apos;s temporary
            state. Connect a server-side payout workflow before using this
            screen for real seller funds.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pending requests"
          amount={stats.pending}
          subtitle={`${stats.pendingCount} requests awaiting review`}
          icon={Clock3}
          color="bg-amber-50 text-amber-700"
        />
        <StatCard
          title="Processing"
          amount={stats.processing}
          subtitle={`${stats.processingCount} payouts being processed`}
          icon={ArrowDownToLine}
          color="bg-blue-50 text-blue-700"
        />
        <StatCard
          title="Completed payouts"
          amount={stats.completed}
          subtitle={`${stats.completedCount} completed requests · net amount`}
          icon={CheckCircle2}
          color="bg-green-50 text-green-700"
        />
        <StatCard
          title="Total requests"
          amount={payouts.reduce((sum, p) => sum + p.amount, 0)}
          subtitle={`${payouts.length} requests in this demo`}
          icon={CircleDollarSign}
          color="bg-purple-50 text-purple-700"
        />
      </div>

      {/* Payout table */}
      <section className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-[#dcdcde] p-4 sm:p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-base font-bold">Payout requests</h2>
            <p className="mt-1 text-sm text-[#646970]">
              {filteredPayouts.length} request
              {filteredPayouts.length === 1 ? "" : "s"} found
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <div className="relative sm:w-64">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646970]"
              />
              <input
                value={search}
                onChange={(e) => changeFilter(setSearch)(e.target.value)}
                placeholder="Search seller or payout..."
                className="w-full rounded-lg border border-[#dcdcde] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                changeFilter(setStatusFilter)(e.target.value)
              }
              className="rounded-lg border border-[#dcdcde] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
            >
              <option value="All">All statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={methodFilter}
              onChange={(e) =>
                changeFilter(setMethodFilter)(e.target.value)
              }
              className="rounded-lg border border-[#dcdcde] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
            >
              <option value="All">All methods</option>
              <option value="bKash">bKash</option>
              <option value="Nagad">Nagad</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-262.5 text-left text-sm">
            <thead className="bg-[#f6f7f7] text-xs uppercase tracking-wide text-[#646970]">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Payout / Seller</th>
                <th className="px-5 py-3.5 font-semibold">Method</th>
                <th className="px-5 py-3.5 font-semibold">Gross amount</th>
                <th className="px-5 py-3.5 font-semibold">Net amount</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Requested</th>
                <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f0f0f1]">
              {pageItems.map((payout) => (
                <tr key={payout.id} className="hover:bg-[#f9f9f9]">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#2271b1]">
                      {payout.id}
                    </p>
                    <p className="mt-1 font-medium">{payout.seller}</p>
                    <p className="mt-1 text-xs text-[#646970]">
                      {payout.sellerId}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0f0f1]">
                        {payout.method === "Bank Transfer" ? (
                          <Banknote size={16} />
                        ) : (
                          <Wallet size={16} />
                        )}
                      </span>
                      <div>
                        <p className="font-medium">{payout.method}</p>
                        <p className="mt-1 text-xs text-[#646970]">
                          {payout.account}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {money(payout.amount)}
                    <p className="mt-1 text-xs font-normal text-[#646970]">
                      Fee: {money(payout.fee)}
                    </p>
                  </td>

                  <td className="px-5 py-4 font-bold">
                    {money(payout.netAmount)}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={payout.status} />
                  </td>

                  <td className="px-5 py-4 text-xs text-[#646970]">
                    {formatDate(payout.requestedAt)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedPayout(payout)}
                        title="View payout details"
                        className="rounded-lg border border-[#dcdcde] p-2 hover:bg-gray-50"
                      >
                        <Eye size={15} />
                      </button>

                      {payout.status === "Pending" && (
                        <>
                          <button
                            onClick={() => startAction(payout, "approve")}
                            className="rounded-lg bg-[#a3db4a] px-3 py-2 text-xs font-bold text-[#1d2327] hover:bg-[#91c837]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => startAction(payout, "reject")}
                            className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <Wallet
                      size={30}
                      className="mx-auto mb-3 text-[#a7aaad]"
                    />
                    <p className="font-semibold">No payout requests found</p>
                    <p className="mt-1 text-sm text-[#646970]">
                      Try another search term or filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-[#f0f0f1] md:hidden">
          {pageItems.map((payout) => (
            <div key={payout.id} className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-all text-sm font-semibold text-[#2271b1]">
                    {payout.id}
                  </p>
                  <p className="mt-1 font-semibold">{payout.seller}</p>
                  <p className="text-xs text-[#646970]">{payout.sellerId}</p>
                </div>
                <StatusBadge status={payout.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-lg bg-[#f6f7f7] p-3">
                <div>
                  <p className="text-xs text-[#646970]">Gross amount</p>
                  <p className="mt-1 font-semibold">{money(payout.amount)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#646970]">Net amount</p>
                  <p className="mt-1 font-bold">{money(payout.netAmount)}</p>
                </div>
              </div>

              <p className="text-xs text-[#646970]">
                {payout.method} · {payout.account}
              </p>
              <p className="text-xs text-[#646970]">
                Requested {formatDate(payout.requestedAt)}
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedPayout(payout)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#dcdcde] px-3 py-2 text-xs font-semibold"
                >
                  <Eye size={14} /> Details
                </button>
                {payout.status === "Pending" && (
                  <>
                    <button
                      onClick={() => startAction(payout, "approve")}
                      className="rounded-lg bg-[#a3db4a] px-3 py-2 text-xs font-bold"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => startAction(payout, "reject")}
                      className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {pageItems.length === 0 && (
            <div className="px-5 py-16 text-center">
              <Wallet size={30} className="mx-auto mb-3 text-[#a7aaad]" />
              <p className="font-semibold">No payout requests found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col justify-between gap-3 border-t border-[#dcdcde] px-4 py-4 sm:flex-row sm:items-center sm:px-5">
          <p className="text-sm text-[#646970]">
            {filteredPayouts.length === 0
              ? "Showing 0 requests"
              : `Showing ${(safePage - 1) * pageSize + 1}–${Math.min(
                  safePage * pageSize,
                  filteredPayouts.length,
                )} of ${filteredPayouts.length} requests`}
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-[#dcdcde] px-3 py-2 text-sm disabled:opacity-40"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <span className="px-2 text-sm font-medium">
              {safePage} / {totalPages}
            </span>
            <button
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-[#dcdcde] px-3 py-2 text-sm disabled:opacity-40"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Payout details modal */}
      {selectedPayout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5"
          onClick={() => setSelectedPayout(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payout-details-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#dcdcde] p-5">
              <div>
                <div className="mb-2 inline-flex rounded-lg bg-[#f0f0f1] p-2">
                  <Wallet size={20} />
                </div>
                <h2 id="payout-details-title" className="text-xl font-bold">
                  Payout details
                </h2>
                <p className="mt-1 text-sm text-[#646970]">
                  {selectedPayout.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedPayout(null)}
                aria-label="Close modal"
                className="rounded-lg p-2 hover:bg-[#f0f0f1]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="rounded-xl border border-[#dcdcde] bg-[#f9f9f9] p-4">
                <p className="text-sm text-[#646970]">Net payout amount</p>
                <p className="mt-1 text-3xl font-bold">
                  {money(selectedPayout.netAmount)}
                </p>
                <div className="mt-3">
                  <StatusBadge status={selectedPayout.status} />
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-bold">Seller information</h3>
                <div className="rounded-xl border border-[#dcdcde] p-4">
                  <div className="flex items-start gap-3">
                    <span className="rounded-lg bg-[#f0f0f1] p-2">
                      <UserRound size={18} />
                    </span>
                    <div>
                      <p className="font-semibold">{selectedPayout.seller}</p>
                      <p className="mt-1 text-sm text-[#646970]">
                        {selectedPayout.sellerId}
                      </p>
                      <p className="mt-1 break-all text-sm text-[#646970]">
                        {selectedPayout.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-bold">Settlement details</h3>
                <div className="divide-y divide-[#f0f0f1] rounded-xl border border-[#dcdcde] px-4">
                  {[
                    ["Payout ID", selectedPayout.id],
                    ["Payment method", selectedPayout.method],
                    ["Destination account", selectedPayout.account],
                    ["Gross amount", money(selectedPayout.amount)],
                    ["Processing fee", money(selectedPayout.fee)],
                    ["Net amount", money(selectedPayout.netAmount)],
                    ["Requested at", formatDate(selectedPayout.requestedAt)],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-4"
                    >
                      <span className="text-sm text-[#646970]">{label}</span>
                      <span className="break-all text-sm font-medium sm:text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold">Admin note</h3>
                <p className="rounded-xl bg-[#f6f7f7] p-3 text-sm leading-6 text-[#50575e]">
                  {selectedPayout.note}
                </p>
              </div>

              {selectedPayout.status === "Pending" && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => startAction(selectedPayout, "approve")}
                    className="rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-bold hover:bg-[#91c837]"
                  >
                    Approve request
                  </button>
                  <button
                    onClick={() => startAction(selectedPayout, "reject")}
                    className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50"
                  >
                    Reject request
                  </button>
                </div>
              )}

              <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                <ShieldCheck size={16} className="mt-0.5 shrink-0" />
                In production, verify seller identity, available balance,
                payout destination, authorization, and idempotency before
                initiating a transfer.
              </div>
            </div>

            <div className="flex justify-end border-t border-[#dcdcde] p-4">
              <button
                onClick={() => setSelectedPayout(null)}
                className="rounded-lg bg-[#1d2327] px-5 py-2.5 text-sm font-semibold text-white hover:bg-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve / reject confirmation */}
      {actionTarget && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-3 sm:p-5"
          onClick={() => setActionTarget(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payout-action-title"
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="payout-action-title" className="text-lg font-bold">
                  {actionTarget.action === "approve"
                    ? "Approve payout request?"
                    : "Reject payout request?"}
                </h2>
                <p className="mt-1 text-sm text-[#646970]">
                  {actionTarget.id}
                </p>
              </div>
              <button
                onClick={() => setActionTarget(null)}
                aria-label="Close confirmation"
                className="rounded-lg p-1.5 hover:bg-[#f0f0f1]"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#50575e]">
              {actionTarget.action === "approve"
                ? "This changes the demo request to Processing. It does not transfer money."
                : "This marks the demo request as Rejected. Give a reason so the decision can be audited."}
            </p>

            {actionTarget.action === "reject" && (
              <div className="mt-4">
                <label
                  htmlFor="rejection-reason"
                  className="mb-2 block text-sm font-semibold"
                >
                  Rejection reason
                </label>
                <textarea
                  id="rejection-reason"
                  value={actionNote}
                  onChange={(e) => {
                    setActionNote(e.target.value);
                    setActionError("");
                  }}
                  rows={3}
                  placeholder="e.g. Seller account verification failed"
                  className="w-full rounded-lg border border-[#dcdcde] p-3 text-sm outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                />
                {actionError && (
                  <p className="mt-1 text-xs text-red-600">{actionError}</p>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setActionTarget(null)}
                className="rounded-lg border border-[#dcdcde] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`rounded-lg px-4 py-2.5 text-sm font-bold ${
                  actionTarget.action === "approve"
                    ? "bg-[#a3db4a] text-[#1d2327] hover:bg-[#91c837]"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {actionTarget.action === "approve"
                  ? "Confirm approval"
                  : "Confirm rejection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
