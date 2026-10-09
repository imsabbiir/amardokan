
"use client";

import { useMemo, useState } from "react";
import {
  ClipboardList,
  Search,
  Download,
  Eye,
  X,
  ShieldCheck,
  UserRound,
  ShoppingCart,
  Store,
  Wallet,
  Settings,
  LogIn,
  Package,
  Truck,
  CircleAlert,
  CheckCircle2,
  Clock3,
  Filter,
  ChevronDown,
  RotateCcw,
  FileSearch,
  Monitor,
  Globe,
  Copy,
  Check,
} from "lucide-react";

const initialLogs = [
  {
    id: "LOG-00921",
    actor: "Sabbir Ahmed",
    email: "admin@amardokan.com",
    role: "Super Admin",
    action: "Seller approved",
    category: "Sellers",
    resource: "SEL-00842",
    description: "Approved a seller application after reviewing its details.",
    status: "Success",
    ip: "192.0.2.14",
    userAgent: "Firefox / Windows",
    timestamp: "2026-10-09T04:55:12",
    changes: [
      { field: "status", before: "Pending", after: "Approved" },
      { field: "reviewedBy", before: "—", after: "Sabbir Ahmed" },
    ],
  },
  {
    id: "LOG-00920",
    actor: "Sabbir Ahmed",
    email: "admin@amardokan.com",
    role: "Super Admin",
    action: "Order status updated",
    category: "Orders",
    resource: "AD-84291",
    description: "Changed an order from pending review to confirmed.",
    status: "Success",
    ip: "192.0.2.14",
    userAgent: "Firefox / Windows",
    timestamp: "2026-10-09T04:41:30",
    changes: [
      { field: "status", before: "Pending review", after: "Confirmed" },
    ],
  },
  {
    id: "LOG-00919",
    actor: "Finance Admin",
    email: "finance@amardokan.com",
    role: "Finance",
    action: "Payout approved",
    category: "Payments",
    resource: "PO-10582",
    description: "Approved a seller payout request for processing.",
    status: "Success",
    ip: "198.51.100.28",
    userAgent: "Chrome / Windows",
    timestamp: "2026-10-09T04:30:04",
    changes: [
      { field: "status", before: "Pending", after: "Approved" },
      { field: "amount", before: "৳12,400", after: "৳12,400" },
    ],
  },
  {
    id: "LOG-00918",
    actor: "Operations Admin",
    email: "operations@amardokan.com",
    role: "Operations",
    action: "Courier settings updated",
    category: "Logistics",
    resource: "COURIER-003",
    description: "Updated delivery configuration for a courier provider.",
    status: "Success",
    ip: "198.51.100.42",
    userAgent: "Firefox / Linux",
    timestamp: "2026-10-09T04:15:48",
    changes: [
      { field: "outsideDhakaFee", before: "৳130", after: "৳120" },
    ],
  },
  {
    id: "LOG-00917",
    actor: "Unknown user",
    email: "unknown@example.invalid",
    role: "Unauthenticated",
    action: "Admin login failed",
    category: "Security",
    resource: "AUTH-ATTEMPT-442",
    description: "An unsuccessful authentication attempt was recorded.",
    status: "Failed",
    ip: "203.0.113.57",
    userAgent: "Unknown browser",
    timestamp: "2026-10-09T03:59:21",
    changes: [
      { field: "authentication", before: "Not authenticated", after: "Failed" },
    ],
  },
  {
    id: "LOG-00916",
    actor: "Catalog Admin",
    email: "catalog@amardokan.com",
    role: "Catalog",
    action: "Product updated",
    category: "Catalog",
    resource: "PRD-00521",
    description: "Updated product information in the master catalog.",
    status: "Success",
    ip: "198.51.100.34",
    userAgent: "Chrome / macOS",
    timestamp: "2026-10-09T03:42:09",
    changes: [
      { field: "isActive", before: "true", after: "true" },
      { field: "stock", before: "18", after: "25" },
    ],
  },
  {
    id: "LOG-00915",
    actor: "Sabbir Ahmed",
    email: "admin@amardokan.com",
    role: "Super Admin",
    action: "Admin settings updated",
    category: "Settings",
    resource: "SETTINGS-GENERAL",
    description: "Updated general store configuration values.",
    status: "Success",
    ip: "192.0.2.14",
    userAgent: "Firefox / Windows",
    timestamp: "2026-10-09T03:20:00",
    changes: [
      { field: "currency", before: "USD", after: "BDT" },
      { field: "timezone", before: "UTC", after: "Asia/Dhaka" },
    ],
  },
  {
    id: "LOG-00914",
    actor: "Support Admin",
    email: "support@amardokan.com",
    role: "Support",
    action: "Customer account reviewed",
    category: "Customers",
    resource: "CUS-00281",
    description: "Reviewed a customer account following a support request.",
    status: "Success",
    ip: "198.51.100.17",
    userAgent: "Chrome / Windows",
    timestamp: "2026-10-09T02:58:40",
    changes: [
      { field: "reviewStatus", before: "Open", after: "Reviewed" },
    ],
  },
  {
    id: "LOG-00913",
    actor: "Finance Admin",
    email: "finance@amardokan.com",
    role: "Finance",
    action: "Refund initiated",
    category: "Payments",
    resource: "REF-00318",
    description: "Initiated a refund review for a customer order.",
    status: "Pending",
    ip: "198.51.100.28",
    userAgent: "Chrome / Windows",
    timestamp: "2026-10-09T02:30:10",
    changes: [
      { field: "refundStatus", before: "Not requested", after: "Pending review" },
    ],
  },
  {
    id: "LOG-00912",
    actor: "Sabbir Ahmed",
    email: "admin@amardokan.com",
    role: "Super Admin",
    action: "Admin role changed",
    category: "Security",
    resource: "ADM-00012",
    description: "Changed an admin account role.",
    status: "Success",
    ip: "192.0.2.14",
    userAgent: "Firefox / Windows",
    timestamp: "2026-10-08T16:22:05",
    changes: [
      { field: "role", before: "Support", after: "Operations" },
    ],
  },
  {
    id: "LOG-00911",
    actor: "Operations Admin",
    email: "operations@amardokan.com",
    role: "Operations",
    action: "Delivery marked failed",
    category: "Logistics",
    resource: "DLV-00628",
    description: "Recorded a failed delivery attempt for a shipment.",
    status: "Failed",
    ip: "198.51.100.42",
    userAgent: "Firefox / Linux",
    timestamp: "2026-10-08T15:48:31",
    changes: [
      { field: "deliveryStatus", before: "In transit", after: "Failed" },
    ],
  },
  {
    id: "LOG-00910",
    actor: "Catalog Admin",
    email: "catalog@amardokan.com",
    role: "Catalog",
    action: "Category created",
    category: "Catalog",
    resource: "CAT-010",
    description: "Created a new category in the product catalog.",
    status: "Success",
    ip: "198.51.100.34",
    userAgent: "Chrome / macOS",
    timestamp: "2026-10-08T14:12:00",
    changes: [
      { field: "name", before: "—", after: "Computer Accessories" },
      { field: "status", before: "—", after: "Active" },
    ],
  },
];

const categoryOptions = [
  "Orders",
  "Sellers",
  "Payments",
  "Logistics",
  "Catalog",
  "Customers",
  "Settings",
  "Security",
];

const categoryIcons = {
  Orders: ShoppingCart,
  Sellers: Store,
  Payments: Wallet,
  Logistics: Truck,
  Catalog: Package,
  Customers: UserRound,
  Settings,
  Security: ShieldCheck,
};

const categoryColors = {
  Orders: "bg-blue-50 text-blue-700",
  Sellers: "bg-violet-50 text-violet-700",
  Payments: "bg-emerald-50 text-emerald-700",
  Logistics: "bg-orange-50 text-orange-700",
  Catalog: "bg-indigo-50 text-indigo-700",
  Customers: "bg-pink-50 text-pink-700",
  Settings: "bg-gray-100 text-gray-700",
  Security: "bg-red-50 text-red-700",
};

function formatDate(value) {
  return new Date(value).toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  });
}

function StatusBadge({ status }) {
  const styles = {
    Success: "bg-emerald-50 text-emerald-700",
    Failed: "bg-red-50 text-red-700",
    Pending: "bg-amber-50 text-amber-700",
  };

  const Icon =
    status === "Success"
      ? CheckCircle2
      : status === "Failed"
        ? CircleAlert
        : Clock3;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

function StatCard({ label, value, hint, icon: Icon, tone }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#646970]">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#1d2327]">
            {value}
          </p>
          <p className="mt-1 text-xs text-[#646970]">{hint}</p>
        </div>
        <div className={`rounded-xl p-3 ${tone}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default function AuditLogsPage() {
  const [logs] = useState(initialLogs);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const todaysLogs = logs.filter(
      (item) => item.timestamp.slice(0, 10) === today
    );

    return {
      total: logs.length,
      success: logs.filter((item) => item.status === "Success").length,
      failed: logs.filter((item) => item.status === "Failed").length,
      security: logs.filter((item) => item.category === "Security").length,
      today: todaysLogs.length,
    };
  }, [logs]);

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();
    const now = new Date();

    return logs
      .filter((item) => {
        const searchable = [
          item.id,
          item.actor,
          item.email,
          item.role,
          item.action,
          item.category,
          item.resource,
          item.description,
          item.ip,
        ]
          .join(" ")
          .toLowerCase();

        if (query && !searchable.includes(query)) return false;

        if (
          categoryFilter !== "all" &&
          item.category !== categoryFilter
        ) {
          return false;
        }

        if (statusFilter !== "all" && item.status !== statusFilter) {
          return false;
        }

        if (roleFilter !== "all" && item.role !== roleFilter) {
          return false;
        }

        const logDate = new Date(item.timestamp);

        if (dateFilter === "today") {
          if (logDate.toDateString() !== now.toDateString()) return false;
        }

        if (dateFilter === "7days") {
          const cutoff = new Date(now);
          cutoff.setDate(cutoff.getDate() - 7);
          if (logDate < cutoff) return false;
        }

        if (dateFilter === "30days") {
          const cutoff = new Date(now);
          cutoff.setDate(cutoff.getDate() - 30);
          if (logDate < cutoff) return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [logs, search, categoryFilter, statusFilter, roleFilter, dateFilter]);

  const visibleLogs = filteredLogs.slice(0, visibleCount);

  function resetFilters() {
    setSearch("");
    setCategoryFilter("all");
    setStatusFilter("all");
    setRoleFilter("all");
    setDateFilter("all");
    setVisibleCount(8);
  }

  function exportCSV() {
    const headers = [
      "Log ID",
      "Timestamp",
      "Actor",
      "Email",
      "Role",
      "Action",
      "Category",
      "Resource",
      "Status",
      "IP Address",
      "Description",
    ];

    const rows = filteredLogs.map((item) => [
      item.id,
      item.timestamp,
      item.actor,
      item.email,
      item.role,
      item.action,
      item.category,
      item.resource,
      item.status,
      item.ip,
      item.description,
    ]);

    const escapeCell = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCell).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "amardokan-audit-logs.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function copyLogId(id) {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="min-h-screen space-y-6 bg-[#f6f7f7] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#646970]">
            <span>Admin</span>
            <span>/</span>
            <span>System</span>
            <span>/</span>
            <span className="text-[#2271b1]">Audit Logs</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#eaf4d8] p-3 text-[#4d7618]">
              <ClipboardList size={25} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Audit Logs
              </h1>
              <p className="mt-1 text-sm text-[#646970]">
                Track administrative actions and review important system events.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-[#c3c4c7] bg-white px-4 py-2.5 text-sm font-semibold text-[#2c3338] transition hover:bg-gray-50 lg:self-auto"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Security notice */}
      <div className="flex items-start gap-3 rounded-xl border border-[#d6e6bb] bg-[#f6fbea] p-4">
        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#527d1b]" />
        <div>
          <p className="text-sm font-semibold text-[#355314]">
            Administrative activity history
          </p>
          <p className="mt-1 text-sm leading-6 text-[#526345]">
            These are sample events for UI development. Production audit records
            should be written server-side, access-controlled, and protected
            against unauthorized changes.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total events"
          value={stats.total}
          hint="Available sample records"
          icon={ClipboardList}
          tone="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Successful actions"
          value={stats.success}
          hint="Completed events"
          icon={CheckCircle2}
          tone="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Failed events"
          value={stats.failed}
          hint="Requires review"
          icon={CircleAlert}
          tone="bg-red-50 text-red-600"
        />
        <StatCard
          label="Security events"
          value={stats.security}
          hint="Authentication and access"
          icon={ShieldCheck}
          tone="bg-violet-50 text-violet-600"
        />
      </div>

      {/* Log table */}
      <section className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
        <div className="border-b border-[#dcdcde] p-4 sm:p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold">Activity history</h2>
              <p className="mt-1 text-sm text-[#646970]">
                {filteredLogs.length} matching event
                {filteredLogs.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative min-w-0 flex-1 sm:min-w-62.5">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c8f94]"
                />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(8);
                  }}
                  placeholder="Search actor, action, resource..."
                  className="w-full rounded-lg border border-[#c3c4c7] py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#2271b1] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                onClick={() => setShowFilters((value) => !value)}
                className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold transition ${
                  showFilters
                    ? "border-[#a3db4a] bg-[#f6fbea] text-[#365814]"
                    : "border-[#c3c4c7] bg-white text-[#50575e] hover:bg-gray-50"
                }`}
              >
                <Filter size={16} />
                Filters
                <ChevronDown
                  size={15}
                  className={`transition ${showFilters ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 gap-3 rounded-lg bg-[#f6f7f7] p-3 sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#646970]">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                >
                  <option value="all">All categories</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#646970]">
                  Result
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                >
                  <option value="all">All results</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#646970]">
                  Admin role
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                >
                  <option value="all">All roles</option>
                  {[
                    "Super Admin",
                    "Finance",
                    "Operations",
                    "Catalog",
                    "Support",
                    "Unauthenticated",
                  ].map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#646970]">
                  Time period
                </label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                >
                  <option value="all">All time</option>
                  <option value="today">Today</option>
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                </select>
              </div>

              <div className="sm:col-span-2 xl:col-span-4">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#c3c4c7] bg-white px-3 py-2 text-xs font-semibold text-[#50575e] hover:bg-gray-50"
                >
                  <RotateCcw size={14} />
                  Reset filters
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0f0f1] bg-[#fcfcfc] px-4 py-3 sm:px-5">
          <p className="text-xs text-[#646970]">
            Showing {visibleLogs.length} of {filteredLogs.length}
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#646970]">
            <Clock3 size={13} />
            Newest events first
          </span>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-262.5 text-left">
            <thead className="bg-[#f6f7f7]">
              <tr className="border-b border-[#dcdcde] text-xs font-bold uppercase tracking-wide text-[#646970]">
                <th className="px-5 py-3">Event</th>
                <th className="px-4 py-3">Administrator</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Resource</th>
                <th className="px-4 py-3">Result</th>
                <th className="px-4 py-3">Date & time</th>
                <th className="px-5 py-3 text-right">Details</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f0f0f1]">
              {visibleLogs.map((item) => {
                const Icon = categoryIcons[item.category] || ClipboardList;
                const color =
                  categoryColors[item.category] ||
                  "bg-gray-100 text-gray-700";

                return (
                  <tr key={item.id} className="group hover:bg-[#fafafa]">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className={`rounded-lg p-2 ${color}`}>
                          <Icon size={17} />
                        </div>
                        <div className="max-w-65">
                          <p className="text-sm font-semibold text-[#1d2327]">
                            {item.action}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#646970]">
                            {item.description}
                          </p>
                          <p className="mt-1 text-[11px] text-[#8c8f94]">
                            {item.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-[#3c434a]">
                        {item.actor}
                      </p>
                      <p className="mt-1 text-xs text-[#646970]">
                        {item.role}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}
                      >
                        {item.category}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <code className="rounded bg-[#f6f7f7] px-2 py-1 text-xs text-[#50575e]">
                        {item.resource}
                      </code>
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="px-4 py-4">
                      <p className="whitespace-nowrap text-sm text-[#3c434a]">
                        {formatDate(item.timestamp)}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedLog(item)}
                        title="View audit details"
                        className="rounded-lg p-2 text-[#646970] transition hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-[#f0f0f1] md:hidden">
          {visibleLogs.map((item) => {
            const Icon = categoryIcons[item.category] || ClipboardList;
            const color =
              categoryColors[item.category] || "bg-gray-100 text-gray-700";

            return (
              <div key={item.id} className="space-y-3 p-4">
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg p-2 ${color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{item.action}</p>
                    <p className="mt-1 text-xs leading-5 text-[#646970]">
                      {item.description}
                    </p>
                    <p className="mt-1 text-[11px] text-[#8c8f94]">
                      {item.id}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>

                <div className="grid grid-cols-2 gap-3 rounded-lg bg-[#f6f7f7] p-3">
                  <div>
                    <p className="text-xs text-[#646970]">Administrator</p>
                    <p className="mt-1 wrap-break-word text-xs font-semibold">
                      {item.actor}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#646970]">Category</p>
                    <p className="mt-1 text-xs font-semibold">{item.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#646970]">Resource</p>
                    <p className="mt-1 break-all text-xs font-semibold">
                      {item.resource}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#646970]">Timestamp</p>
                    <p className="mt-1 text-xs font-semibold">
                      {formatDate(item.timestamp)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedLog(item)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#c3c4c7] px-3 py-2.5 text-sm font-semibold hover:bg-gray-50"
                >
                  <Eye size={15} />
                  View event details
                </button>
              </div>
            );
          })}
        </div>

        {filteredLogs.length === 0 && (
          <div className="px-5 py-16 text-center">
            <FileSearch size={30} className="mx-auto text-[#8c8f94]" />
            <h3 className="mt-3 text-base font-bold">No audit events found</h3>
            <p className="mt-2 text-sm text-[#646970]">
              Try different search terms or adjust the filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#c3c4c7] px-4 py-2 text-sm font-semibold hover:bg-gray-50"
            >
              <RotateCcw size={15} />
              Reset filters
            </button>
          </div>
        )}

        {visibleCount < filteredLogs.length && (
          <div className="border-t border-[#dcdcde] p-4 text-center">
            <button
              onClick={() => setVisibleCount((count) => count + 8)}
              className="rounded-lg border border-[#c3c4c7] px-5 py-2.5 text-sm font-semibold hover:bg-gray-50"
            >
              Load more events
            </button>
          </div>
        )}

        <div className="flex flex-col justify-between gap-2 border-t border-[#dcdcde] bg-[#fcfcfc] px-4 py-3 text-xs text-[#646970] sm:flex-row sm:items-center sm:px-5">
          <span>
            Showing {visibleLogs.length} of {filteredLogs.length} matching
            events
          </span>
          <span>Times displayed in the Asia/Dhaka timezone.</span>
        </div>
      </section>

      {/* Event detail modal */}
      {selectedLog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedLog(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-modal-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#dcdcde] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#dcdcde] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-[#eaf4d8] p-3 text-[#4d7618]">
                  <ClipboardList size={22} />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#646970]">
                    Audit event details
                  </p>
                  <h2
                    id="audit-modal-title"
                    className="mt-1 text-lg font-bold"
                  >
                    {selectedLog.action}
                  </h2>
                  <p className="mt-1 text-xs text-[#646970]">
                    {selectedLog.id}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLog(null)}
                className="rounded-lg p-2 text-[#646970] hover:bg-[#f0f0f1]"
                aria-label="Close details"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={selectedLog.status} />
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    categoryColors[selectedLog.category] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {selectedLog.category}
                </span>
                <button
                  onClick={() => copyLogId(selectedLog.id)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#dcdcde] px-2.5 py-1 text-xs font-semibold text-[#50575e] hover:bg-gray-50"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "Copied" : "Copy log ID"}
                </button>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#646970]">
                  Description
                </p>
                <p className="mt-2 text-sm leading-6 text-[#3c434a]">
                  {selectedLog.description}
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-bold">Event information</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    ["Actor", selectedLog.actor],
                    ["Email", selectedLog.email],
                    ["Role", selectedLog.role],
                    ["Resource", selectedLog.resource],
                    ["IP address", selectedLog.ip],
                    ["User agent", selectedLog.userAgent],
                    ["Timestamp", formatDate(selectedLog.timestamp)],
                    ["Category", selectedLog.category],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="min-w-0 rounded-xl border border-[#dcdcde] p-3.5"
                    >
                      <p className="text-xs text-[#646970]">{label}</p>
                      <p className="mt-1 wrap-break-word text-sm font-semibold text-[#1d2327]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-bold">Recorded changes</h3>
                <div className="overflow-hidden rounded-xl border border-[#dcdcde]">
                  <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 border-b border-[#dcdcde] bg-[#f6f7f7] px-3 py-3 text-xs font-bold text-[#646970] sm:px-4">
                    <span>Field</span>
                    <span>Before</span>
                    <span>After</span>
                  </div>

                  <div className="divide-y divide-[#f0f0f1]">
                    {selectedLog.changes.map((change, index) => (
                      <div
                        key={`${change.field}-${index}`}
                        className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 px-3 py-3 text-xs sm:px-4"
                      >
                        <span className="wrap-break-word font-semibold text-[#3c434a]">
                          {change.field}
                        </span>
                        <span className="wrap-break-word text-[#646970]">
                          {change.before}
                        </span>
                        <span className="wrap-break-word font-medium text-emerald-700">
                          {change.after}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <Monitor size={17} className="mt-0.5 shrink-0 text-amber-700" />
                <p className="text-xs leading-5 text-amber-900">
                  The IP address, user agent, actor, and change history above
                  are fictional demo data. In production, derive these details
                  from trusted server-side request context and persisted
                  records.
                </p>
              </div>

              <div className="flex justify-end border-t border-[#f0f0f1] pt-4">
                <button
                  onClick={() => setSelectedLog(null)}
                  className="rounded-lg bg-[#a3db4a] px-5 py-2.5 text-sm font-semibold text-[#20320b] hover:bg-[#91c93b]"
                >
                  Close details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
