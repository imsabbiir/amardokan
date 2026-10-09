
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  CreditCard,
  Wallet,
  CheckCircle2,
  Clock3,
  XCircle,
  RotateCcw,
  Eye,
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Receipt,
  ShieldCheck,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

const initialPayments = [
  {
    id: "PAY-2026-1048",
    orderId: "ORD-2026-1082",
    customer: "Rahim Uddin",
    email: "rahim@example.com",
    method: "bKash",
    amount: 2450,
    fee: 36.75,
    gatewayRef: "BKX8A29F104",
    status: "Paid",
    date: "2026-10-09T10:24:00",
    note: "Payment verified by gateway.",
  },
  {
    id: "PAY-2026-1047",
    orderId: "ORD-2026-1081",
    customer: "Nusrat Jahan",
    email: "nusrat@example.com",
    method: "Nagad",
    amount: 1850,
    fee: 27.75,
    gatewayRef: "NGD8B10C221",
    status: "Pending",
    date: "2026-10-09T09:42:00",
    note: "Waiting for gateway confirmation.",
  },
  {
    id: "PAY-2026-1046",
    orderId: "ORD-2026-1080",
    customer: "Sabbir Ahmed",
    email: "sabbir@example.com",
    method: "Cash on Delivery",
    amount: 3200,
    fee: 0,
    gatewayRef: "COD-1080",
    status: "Paid",
    date: "2026-10-09T08:15:00",
    note: "Collected by courier.",
  },
  {
    id: "PAY-2026-1045",
    orderId: "ORD-2026-1079",
    customer: "Farzana Akter",
    email: "farzana@example.com",
    method: "SSLCommerz",
    amount: 4200,
    fee: 63,
    gatewayRef: "SSLC-882104",
    status: "Failed",
    date: "2026-10-08T17:35:00",
    note: "Transaction declined by payment gateway.",
  },
  {
    id: "PAY-2026-1044",
    orderId: "ORD-2026-1078",
    customer: "Tanvir Hasan",
    email: "tanvir@example.com",
    method: "bKash",
    amount: 1250,
    fee: 18.75,
    gatewayRef: "BKX9C20F711",
    status: "Refunded",
    date: "2026-10-08T15:10:00",
    note: "Refund confirmed by gateway.",
  },
  {
    id: "PAY-2026-1043",
    orderId: "ORD-2026-1077",
    customer: "Mim Sultana",
    email: "mim@example.com",
    method: "Nagad",
    amount: 2750,
    fee: 41.25,
    gatewayRef: "NGD2A77D193",
    status: "Paid",
    date: "2026-10-08T12:45:00",
    note: "Payment verified by gateway.",
  },
  {
    id: "PAY-2026-1042",
    orderId: "ORD-2026-1076",
    customer: "Imran Hossain",
    email: "imran@example.com",
    method: "SSLCommerz",
    amount: 5600,
    fee: 84,
    gatewayRef: "SSLC-882099",
    status: "Pending",
    date: "2026-10-08T11:20:00",
    note: "Gateway callback not received yet.",
  },
  {
    id: "PAY-2026-1041",
    orderId: "ORD-2026-1075",
    customer: "Sadia Islam",
    email: "sadia@example.com",
    method: "Cash on Delivery",
    amount: 980,
    fee: 0,
    gatewayRef: "COD-1075",
    status: "Paid",
    date: "2026-10-07T16:05:00",
    note: "Collected by courier.",
  },
  {
    id: "PAY-2026-1040",
    orderId: "ORD-2026-1074",
    customer: "Arif Mahmud",
    email: "arif@example.com",
    method: "bKash",
    amount: 2100,
    fee: 31.5,
    gatewayRef: "BKX1D28E992",
    status: "Failed",
    date: "2026-10-07T14:30:00",
    note: "Customer cancelled the payment.",
  },
  {
    id: "PAY-2026-1039",
    orderId: "ORD-2026-1073",
    customer: "Jannatul Ferdous",
    email: "jannat@example.com",
    method: "Nagad",
    amount: 1650,
    fee: 24.75,
    gatewayRef: "NGD4E11A560",
    status: "Paid",
    date: "2026-10-07T10:12:00",
    note: "Payment verified by gateway.",
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);

const dateTime = (date) =>
  new Date(date).toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const statusStyles = {
  Paid: "bg-green-50 text-green-700 ring-green-600/20",
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Failed: "bg-red-50 text-red-700 ring-red-600/20",
  Refunded: "bg-purple-50 text-purple-700 ring-purple-600/20",
};

function StatusBadge({ status }) {
  const Icon =
    status === "Paid"
      ? CheckCircle2
      : status === "Pending"
        ? Clock3
        : status === "Failed"
          ? XCircle
          : RotateCcw;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        statusStyles[status] || "bg-gray-100 text-gray-700 ring-gray-500/20"
      }`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-[#646970]">{title}</p>
          <p className="mt-2 text-xl font-bold tracking-tight text-[#1d2327] sm:text-2xl">
            {value}
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

function exportCSV(rows) {
  const headers = [
    "Payment ID",
    "Order ID",
    "Customer",
    "Email",
    "Method",
    "Amount",
    "Fee",
    "Gateway Reference",
    "Status",
    "Date",
  ];

  const escapeCSV = (value) =>
    `"${String(value ?? "").replace(/"/g, '""')}"`;

  const csv = [
    headers.join(","),
    ...rows.map((p) =>
      [
        p.id,
        p.orderId,
        p.customer,
        p.email,
        p.method,
        p.amount,
        p.fee,
        p.gatewayRef,
        p.status,
        dateTime(p.date),
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
  link.download = "amardokan-payments.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminPaymentsPage() {
  const [payments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const stats = useMemo(() => {
    const paid = payments.filter((p) => p.status === "Paid");
    const pending = payments.filter((p) => p.status === "Pending");
    const failed = payments.filter((p) => p.status === "Failed");
    const refunded = payments.filter((p) => p.status === "Refunded");

    return {
      paidAmount: paid.reduce((sum, p) => sum + p.amount, 0),
      pendingAmount: pending.reduce((sum, p) => sum + p.amount, 0),
      failedAmount: failed.reduce((sum, p) => sum + p.amount, 0),
      refundedAmount: refunded.reduce((sum, p) => sum + p.amount, 0),
    };
  }, [payments]);

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payments.filter((p) => {
      const matchesSearch =
        !query ||
        [
          p.id,
          p.orderId,
          p.customer,
          p.email,
          p.gatewayRef,
          p.method,
        ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" || p.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" || p.method === methodFilter;

      const paymentDate = new Date(p.date);
      const today = new Date("2026-10-09T23:59:59");
      const matchesDate =
        dateFilter === "All" ||
        (dateFilter === "Today" &&
          paymentDate.toDateString() === today.toDateString()) ||
        (dateFilter === "7 days" &&
          paymentDate >= new Date("2026-10-03T00:00:00") &&
          paymentDate <= today);

      return matchesSearch && matchesStatus && matchesMethod && matchesDate;
    });
  }, [payments, search, statusFilter, methodFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedPayments = filteredPayments.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const updateFilter = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen space-y-6 bg-[#f6f7f7] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-[#646970]">
            <span>Admin</span>
            <span>/</span>
            <span>Finance</span>
            <span>/</span>
            <span className="text-[#1d2327]">Payments</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Payments
          </h1>
          <p className="mt-1 text-sm text-[#646970]">
            Monitor customer transactions and payment gateway activity.
          </p>
        </div>

        <button
          onClick={() => exportCSV(filteredPayments)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#dcdcde] bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-50"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <ShieldCheck className="mt-0.5 shrink-0" size={19} />
        <div>
          <p className="font-semibold">Payment monitoring</p>
          <p className="mt-1 text-blue-800">
            These are sample transactions for the UI demo. In production,
            verify payment status on your server using trusted gateway APIs
            and signed webhooks.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Successful payments"
          value={money(stats.paidAmount)}
          subtitle={`${payments.filter((p) => p.status === "Paid").length} transactions`}
          icon={CheckCircle2}
          color="bg-green-50 text-green-700"
        />
        <StatCard
          title="Pending payments"
          value={money(stats.pendingAmount)}
          subtitle={`${payments.filter((p) => p.status === "Pending").length} awaiting confirmation`}
          icon={Clock3}
          color="bg-amber-50 text-amber-700"
        />
        <StatCard
          title="Failed payments"
          value={money(stats.failedAmount)}
          subtitle={`${payments.filter((p) => p.status === "Failed").length} unsuccessful transactions`}
          icon={XCircle}
          color="bg-red-50 text-red-700"
        />
        <StatCard
          title="Refunded payments"
          value={money(stats.refundedAmount)}
          subtitle={`${payments.filter((p) => p.status === "Refunded").length} refunded transactions`}
          icon={RotateCcw}
          color="bg-purple-50 text-purple-700"
        />
      </div>

      {/* Table panel */}
      <div className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
        <div className="border-b border-[#dcdcde] p-4 sm:p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-base font-bold">All transactions</h2>
              <p className="mt-1 text-sm text-[#646970]">
                {filteredPayments.length} transaction
                {filteredPayments.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <div className="relative min-w-0 sm:w-64">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646970]"
                />
                <input
                  value={search}
                  onChange={(e) => updateFilter(setSearch)(e.target.value)}
                  placeholder="Search payments..."
                  className="w-full rounded-lg border border-[#dcdcde] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => updateFilter(setStatusFilter)(e.target.value)}
                className="rounded-lg border border-[#dcdcde] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
              >
                <option value="All">All statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>

              <select
                value={methodFilter}
                onChange={(e) => updateFilter(setMethodFilter)(e.target.value)}
                className="rounded-lg border border-[#dcdcde] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
              >
                <option value="All">All methods</option>
                <option value="bKash">bKash</option>
                <option value="Nagad">Nagad</option>
                <option value="SSLCommerz">SSLCommerz</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => updateFilter(setDateFilter)(e.target.value)}
                className="rounded-lg border border-[#dcdcde] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
              >
                <option value="All">All dates</option>
                <option value="Today">Today</option>
                <option value="7 days">Last 7 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-262.5 text-left text-sm">
            <thead className="bg-[#f6f7f7] text-xs uppercase tracking-wide text-[#646970]">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Transaction</th>
                <th className="px-5 py-3.5 font-semibold">Customer</th>
                <th className="px-5 py-3.5 font-semibold">Payment method</th>
                <th className="px-5 py-3.5 font-semibold">Amount</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Date</th>
                <th className="px-5 py-3.5 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f0f0f1]">
              {paginatedPayments.map((payment) => (
                <tr key={payment.id} className="transition hover:bg-[#f9f9f9]">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#2271b1]">
                      {payment.id}
                    </p>
                    <p className="mt-1 text-xs text-[#646970]">
                      Order: {payment.orderId}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium">{payment.customer}</p>
                    <p className="mt-1 text-xs text-[#646970]">
                      {payment.email}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0f0f1]">
                        {payment.method === "Cash on Delivery" ? (
                          <Wallet size={16} />
                        ) : (
                          <CreditCard size={16} />
                        )}
                      </span>
                      <span className="font-medium">{payment.method}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-semibold">{money(payment.amount)}</p>
                    <p className="mt-1 text-xs text-[#646970]">
                      Fee: {money(payment.fee)}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={payment.status} />
                  </td>

                  <td className="px-5 py-4 text-xs text-[#646970]">
                    {dateTime(payment.date)}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedPayment(payment)}
                      aria-label={`View ${payment.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#dcdcde] px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                    >
                      <Eye size={14} />
                      Details
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedPayments.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <Receipt
                      size={30}
                      className="mx-auto mb-3 text-[#a7aaad]"
                    />
                    <p className="font-semibold">No transactions found</p>
                    <p className="mt-1 text-sm text-[#646970]">
                      Try another search term or change your filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile transaction cards */}
        <div className="divide-y divide-[#f0f0f1] md:hidden">
          {paginatedPayments.map((payment) => (
            <div key={payment.id} className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-all text-sm font-semibold text-[#2271b1]">
                    {payment.id}
                  </p>
                  <p className="mt-1 text-xs text-[#646970]">
                    Order: {payment.orderId}
                  </p>
                </div>
                <StatusBadge status={payment.status} />
              </div>

              <div>
                <p className="font-medium">{payment.customer}</p>
                <p className="text-xs text-[#646970]">{payment.email}</p>
              </div>

              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-lg font-bold">{money(payment.amount)}</p>
                  <p className="text-xs text-[#646970]">
                    {payment.method} · {dateTime(payment.date)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPayment(payment)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#dcdcde] px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                >
                  <Eye size={14} />
                  Details
                </button>
              </div>
            </div>
          ))}

          {paginatedPayments.length === 0 && (
            <div className="px-5 py-16 text-center">
              <Receipt size={30} className="mx-auto mb-3 text-[#a7aaad]" />
              <p className="font-semibold">No transactions found</p>
              <p className="mt-1 text-sm text-[#646970]">
                Try another search term or change your filters.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col justify-between gap-3 border-t border-[#dcdcde] px-4 py-4 sm:flex-row sm:items-center sm:px-5">
          <p className="text-sm text-[#646970]">
            {filteredPayments.length === 0
              ? "Showing 0 transactions"
              : `Showing ${(safePage - 1) * pageSize + 1}–${Math.min(
                  safePage * pageSize,
                  filteredPayments.length,
                )} of ${filteredPayments.length} transactions`}
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-[#dcdcde] px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <span className="px-2 text-sm font-medium">
              {safePage} / {totalPages}
            </span>

            <button
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-[#dcdcde] px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Payment details modal */}
      {selectedPayment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5"
          onClick={() => setSelectedPayment(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-modal-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#dcdcde] p-5 sm:p-6">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-[#f0f0f1] p-2">
                  <Receipt size={20} />
                </div>
                <h2
                  id="payment-modal-title"
                  className="text-xl font-bold"
                >
                  Transaction details
                </h2>
                <p className="mt-1 text-sm text-[#646970]">
                  {selectedPayment.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                aria-label="Close details"
                className="rounded-lg p-2 hover:bg-[#f0f0f1]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="rounded-xl border border-[#dcdcde] bg-[#f9f9f9] p-4">
                <p className="text-sm text-[#646970]">Transaction amount</p>
                <p className="mt-1 text-3xl font-bold">
                  {money(selectedPayment.amount)}
                </p>
                <div className="mt-3">
                  <StatusBadge status={selectedPayment.status} />
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-bold">Payment information</h3>
                <div className="divide-y divide-[#f0f0f1] rounded-xl border border-[#dcdcde] px-4">
                  {[
                    ["Payment ID", selectedPayment.id],
                    ["Order ID", selectedPayment.orderId],
                    ["Payment method", selectedPayment.method],
                    ["Gateway reference", selectedPayment.gatewayRef],
                    ["Transaction fee", money(selectedPayment.fee)],
                    ["Date and time", dateTime(selectedPayment.date)],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
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
                <h3 className="mb-3 text-sm font-bold">Customer information</h3>
                <div className="rounded-xl border border-[#dcdcde] p-4">
                  <p className="font-semibold">{selectedPayment.customer}</p>
                  <p className="mt-1 break-all text-sm text-[#646970]">
                    {selectedPayment.email}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold">Transaction note</h3>
                <p className="rounded-xl bg-[#f6f7f7] p-3 text-sm leading-6 text-[#50575e]">
                  {selectedPayment.note}
                </p>
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                <ShieldCheck size={16} className="mt-0.5 shrink-0" />
                Payment statuses are view-only in this demo. Do not mark a
                payment as successful based only on a browser redirect or
                customer-provided transaction ID.
              </div>
            </div>

            <div className="flex justify-end border-t border-[#dcdcde] p-4 sm:px-6">
              <button
                onClick={() => setSelectedPayment(null)}
                className="rounded-lg bg-[#1d2327] px-5 py-2.5 text-sm font-semibold text-white hover:bg-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
