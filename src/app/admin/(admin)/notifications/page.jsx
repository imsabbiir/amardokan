
"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  CheckCheck,
  Search,
  Filter,
  Package,
  Store,
  Wallet,
  Truck,
  Settings,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock3,
  Archive,
  Trash2,
  Mail,
  MailOpen,
  MoreHorizontal,
  ChevronDown,
  X,
  RotateCcw,
  CircleAlert,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";

const initialNotifications = [
  {
    id: "NTF-1048",
    type: "orders",
    severity: "critical",
    title: "High-value order requires review",
    message:
      "Order #AD-84291 is worth ৳18,500 and has been flagged for manual verification before fulfillment.",
    time: "2 min ago",
    date: "2026-10-09T04:58:00",
    read: false,
    archived: false,
    reference: "#AD-84291",
  },
  {
    id: "NTF-1047",
    type: "payments",
    severity: "warning",
    title: "Payment settlement is delayed",
    message:
      "A settlement of ৳42,800 has not been confirmed. Review the payment provider status.",
    time: "12 min ago",
    date: "2026-10-09T04:48:00",
    read: false,
    archived: false,
    reference: "PAY-20918",
  },
  {
    id: "NTF-1046",
    type: "sellers",
    severity: "info",
    title: "New seller application received",
    message:
      "A new seller has submitted their store information and is waiting for admin approval.",
    time: "28 min ago",
    date: "2026-10-09T04:32:00",
    read: false,
    archived: false,
    reference: "SEL-00842",
  },
  {
    id: "NTF-1045",
    type: "logistics",
    severity: "warning",
    title: "Courier delivery rate has dropped",
    message:
      "The delivery success rate for one courier has fallen below your expected threshold.",
    time: "45 min ago",
    date: "2026-10-09T04:15:00",
    read: false,
    archived: false,
    reference: "Courier monitoring",
  },
  {
    id: "NTF-1044",
    type: "orders",
    severity: "success",
    title: "Bulk order import completed",
    message:
      "The latest order import finished successfully. All 126 records were processed.",
    time: "1 hour ago",
    date: "2026-10-09T04:00:00",
    read: true,
    archived: false,
    reference: "IMP-00421",
  },
  {
    id: "NTF-1043",
    type: "system",
    severity: "critical",
    title: "Repeated failed login attempts",
    message:
      "Multiple unsuccessful login attempts were detected for an admin account. Review the audit logs.",
    time: "2 hours ago",
    date: "2026-10-09T03:00:00",
    read: false,
    archived: false,
    reference: "Security alert",
  },
  {
    id: "NTF-1042",
    type: "payments",
    severity: "success",
    title: "Seller payout processed",
    message:
      "A seller payout of ৳12,400 has been marked as completed in the payout records.",
    time: "3 hours ago",
    date: "2026-10-09T02:00:00",
    read: true,
    archived: false,
    reference: "PO-10582",
  },
  {
    id: "NTF-1041",
    type: "sellers",
    severity: "info",
    title: "Seller documents updated",
    message:
      "An existing seller has updated their business verification documents.",
    time: "4 hours ago",
    date: "2026-10-09T01:00:00",
    read: true,
    archived: false,
    reference: "SEL-00318",
  },
  {
    id: "NTF-1040",
    type: "logistics",
    severity: "warning",
    title: "Courier remittance needs reconciliation",
    message:
      "COD remittance records do not fully match the expected amount for the latest courier batch.",
    time: "Yesterday",
    date: "2026-10-08T10:00:00",
    read: true,
    archived: false,
    reference: "COD-00572",
  },
  {
    id: "NTF-1039",
    type: "system",
    severity: "info",
    title: "Scheduled maintenance reminder",
    message:
      "Review system maintenance tasks and verify that scheduled backups completed successfully.",
    time: "Yesterday",
    date: "2026-10-08T08:00:00",
    read: true,
    archived: true,
    reference: "SYS-00218",
  },
];

const categories = [
  { id: "all", label: "All notifications", icon: Bell },
  { id: "unread", label: "Unread", icon: Mail },
  { id: "orders", label: "Orders", icon: Package },
  { id: "sellers", label: "Sellers", icon: Store },
  { id: "payments", label: "Payments", icon: Wallet },
  { id: "logistics", label: "Logistics", icon: Truck },
  { id: "system", label: "System", icon: Settings },
  { id: "archived", label: "Archived", icon: Archive },
];

const typeStyles = {
  orders: {
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-50",
    label: "Order",
  },
  sellers: {
    icon: Store,
    color: "text-violet-600",
    bg: "bg-violet-50",
    label: "Seller",
  },
  payments: {
    icon: Wallet,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    label: "Payment",
  },
  logistics: {
    icon: Truck,
    color: "text-orange-600",
    bg: "bg-orange-50",
    label: "Logistics",
  },
  system: {
    icon: Settings,
    color: "text-gray-600",
    bg: "bg-gray-100",
    label: "System",
  },
};

const severityStyles = {
  critical: {
    label: "Critical",
    icon: ShieldAlert,
    className: "bg-red-50 text-red-700 border-red-100",
  },
  warning: {
    label: "Warning",
    icon: AlertTriangle,
    className: "bg-amber-50 text-amber-700 border-amber-100",
  },
  info: {
    label: "Info",
    icon: Info,
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },
  success: {
    label: "Success",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
};

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

function StatCard({ label, value, hint, icon: Icon, iconClass }) {
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
        <div className={`rounded-xl p-3 ${iconClass}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const item = severityStyles[severity] || severityStyles.info;
  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold ${item.className}`}
    >
      <Icon size={12} />
      {item.label}
    </span>
  );
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [menuNotification, setMenuNotification] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [visibleCount, setVisibleCount] = useState(7);

  const stats = useMemo(() => {
    const active = notifications.filter((item) => !item.archived);

    return {
      total: active.length,
      unread: active.filter((item) => !item.read).length,
      critical: active.filter(
        (item) => item.severity === "critical" && !item.read
      ).length,
      archived: notifications.filter((item) => item.archived).length,
    };
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notifications
      .filter((item) => {
        if (activeCategory === "archived") return item.archived;
        if (item.archived) return false;

        if (activeCategory === "unread" && item.read) return false;
        if (
          activeCategory !== "all" &&
          activeCategory !== "unread" &&
          item.type !== activeCategory
        ) {
          return false;
        }

        if (severityFilter !== "all" && item.severity !== severityFilter) {
          return false;
        }

        if (query) {
          const searchable = [
            item.id,
            item.title,
            item.message,
            item.reference,
            item.type,
          ]
            .join(" ")
            .toLowerCase();

          if (!searchable.includes(query)) return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [notifications, activeCategory, search, severityFilter]);

  const visibleNotifications = filteredNotifications.slice(0, visibleCount);

  function updateNotification(id, updates) {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );

    if (selectedNotification?.id === id) {
      setSelectedNotification((current) =>
        current ? { ...current, ...updates } : current
      );
    }
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((item) =>
        item.archived ? item : { ...item, read: true }
      )
    );
  }

  function archiveAllRead() {
    setNotifications((current) =>
      current.map((item) =>
        item.read && !item.archived ? { ...item, archived: true } : item
      )
    );
    setConfirmClear(false);
  }

  function deleteNotification(id) {
    setNotifications((current) => current.filter((item) => item.id !== id));
    setMenuNotification(null);
    if (selectedNotification?.id === id) setSelectedNotification(null);
  }

  function chooseCategory(category) {
    setActiveCategory(category);
    setVisibleCount(7);
  }

  function openNotification(item) {
    setSelectedNotification(item);
    if (!item.read) updateNotification(item.id, { read: true });
    setMenuNotification(null);
  }

  function exportCSV() {
    const headers = [
      "ID",
      "Title",
      "Category",
      "Severity",
      "Message",
      "Read",
      "Archived",
      "Reference",
      "Date",
    ];

    const rows = filteredNotifications.map((item) => [
      item.id,
      item.title,
      item.type,
      item.severity,
      item.message,
      item.read ? "Yes" : "No",
      item.archived ? "Yes" : "No",
      item.reference,
      item.date,
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
    link.download = "amardokan-notifications.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen space-y-6 bg-[#f6f7f7] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#646970]">
            <span>Admin</span>
            <span>/</span>
            <span>System</span>
            <span>/</span>
            <span className="text-[#2271b1]">Notifications</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative rounded-xl bg-[#eaf4d8] p-3 text-[#4d7618]">
              <Bell size={25} />
              {stats.unread > 0 && (
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-[#eaf4d8] bg-red-500" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Notifications
              </h1>
              <p className="mt-1 text-sm text-[#646970]">
                Stay on top of orders, sellers, payments, and system alerts.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#c3c4c7] bg-white px-4 py-2.5 text-sm font-semibold text-[#2c3338] transition hover:bg-gray-50"
          >
            Export CSV
            <ArrowUpRight size={16} />
          </button>
          <button
            onClick={markAllAsRead}
            disabled={stats.unread === 0}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-semibold text-[#20320b] transition hover:bg-[#91c93b] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck size={17} />
            Mark all as read
          </button>
        </div>
      </div>

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-[#d6e6bb] bg-[#f6fbea] p-4">
        <Info size={19} className="mt-0.5 shrink-0 text-[#527d1b]" />
        <div>
          <p className="text-sm font-semibold text-[#355314]">
            Notification center preview
          </p>
          <p className="mt-1 text-sm leading-6 text-[#526345]">
            These are sample notifications. Read, archive, and delete actions
            update this page locally; they are not saved to MongoDB.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active notifications"
          value={stats.total}
          hint="Not archived"
          icon={Bell}
          iconClass="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Unread"
          value={stats.unread}
          hint="Need your attention"
          icon={Mail}
          iconClass="bg-violet-50 text-violet-600"
        />
        <StatCard
          label="Critical unread"
          value={stats.critical}
          hint="Review these first"
          icon={CircleAlert}
          iconClass="bg-red-50 text-red-600"
        />
        <StatCard
          label="Archived"
          value={stats.archived}
          hint="Stored in this demo"
          icon={Archive}
          iconClass="bg-amber-50 text-amber-700"
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[250px_minmax(0,1fr)]">
        {/* Sidebar filters */}
        <aside className="rounded-xl border border-[#dcdcde] bg-white p-3">
          <div className="px-3 pb-3 pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#646970]">
              Notification inbox
            </p>
          </div>

          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const active = activeCategory === category.id;

              const count =
                category.id === "all"
                  ? stats.total
                  : category.id === "unread"
                    ? stats.unread
                    : category.id === "archived"
                      ? stats.archived
                      : notifications.filter(
                          (item) =>
                            item.type === category.id &&
                            !item.archived
                        ).length;

              return (
                <button
                  key={category.id}
                  onClick={() => chooseCategory(category.id)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-[#eef6e1] font-semibold text-[#365814]"
                      : "text-[#50575e] hover:bg-[#f6f7f7]"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon size={17} />
                    <span>{category.label}</span>
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                      active
                        ? "bg-white text-[#365814]"
                        : "bg-[#f0f0f1] text-[#646970]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mx-2 my-4 border-t border-[#f0f0f1]" />

          <div className="px-3 pb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#646970]">
              Quick actions
            </p>
          </div>

          <button
            onClick={() => setConfirmClear(true)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#50575e] transition hover:bg-[#f6f7f7]"
          >
            <Archive size={17} />
            Archive all read
          </button>

          <button
            onClick={() => {
              setSearch("");
              setSeverityFilter("all");
              chooseCategory("all");
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#50575e] transition hover:bg-[#f6f7f7]"
          >
            <RotateCcw size={17} />
            Reset filters
          </button>
        </aside>

        {/* Notification list */}
        <section className="min-w-0 overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
          <div className="border-b border-[#dcdcde] p-4 sm:p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-lg font-bold">
                  {categories.find((item) => item.id === activeCategory)
                    ?.label || "Notifications"}
                </h2>
                <p className="mt-1 text-sm text-[#646970]">
                  {filteredNotifications.length} notification
                  {filteredNotifications.length !== 1 ? "s" : ""} found
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative min-w-0 flex-1 sm:min-w-57.5">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c8f94]"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setVisibleCount(7);
                    }}
                    placeholder="Search notifications..."
                    className="w-full rounded-lg border border-[#c3c4c7] bg-white py-2.5 pl-9 pr-9 text-sm outline-none transition placeholder:text-[#8c8f94] focus:border-[#2271b1] focus:ring-2 focus:ring-blue-100"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#646970] hover:text-[#1d2327]"
                      aria-label="Clear search"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setShowFilters((value) => !value)}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                    showFilters || severityFilter !== "all"
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
              <div className="mt-4 flex flex-col gap-3 rounded-lg bg-[#f6f7f7] p-3 sm:flex-row sm:items-center">
                <label
                  htmlFor="severity-filter"
                  className="text-sm font-medium text-[#50575e]"
                >
                  Severity
                </label>
                <select
                  id="severity-filter"
                  value={severityFilter}
                  onChange={(event) => setSeverityFilter(event.target.value)}
                  className="rounded-lg border border-[#c3c4c7] bg-white px-3 py-2 text-sm outline-none focus:border-[#2271b1]"
                >
                  <option value="all">All severities</option>
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                </select>

                <button
                  onClick={() => setSeverityFilter("all")}
                  className="self-start text-sm font-semibold text-[#2271b1] hover:underline sm:self-auto"
                >
                  Clear severity
                </button>
              </div>
            )}
          </div>

          {/* List toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0f0f1] bg-[#fcfcfc] px-4 py-3 sm:px-5">
            <p className="text-xs text-[#646970]">
              Showing {visibleNotifications.length} of{" "}
              {filteredNotifications.length}
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#646970]">
              <Clock3 size={13} />
              Sorted by newest
            </span>
          </div>

          {/* Notification rows */}
          <div className="divide-y divide-[#f0f0f1]">
            {visibleNotifications.map((item) => {
              const typeStyle = typeStyles[item.type] || typeStyles.system;
              const Icon = typeStyle.icon;

              return (
                <div
                  key={item.id}
                  className={`group flex gap-3 p-4 transition hover:bg-[#fafafa] sm:gap-4 sm:px-5 ${
                    !item.read ? "bg-[#fbfdf7]" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => openNotification(item)}
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${typeStyle.bg} ${typeStyle.color}`}
                    aria-label={`Open ${item.title}`}
                  >
                    <Icon size={19} />
                  </button>

                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => openNotification(item)}
                      className="block max-w-full text-left"
                    >
                      <span className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-sm leading-5 ${
                            !item.read
                              ? "font-bold text-[#1d2327]"
                              : "font-semibold text-[#3c434a]"
                          }`}
                        >
                          {item.title}
                        </span>
                        {!item.read && (
                          <span
                            className="h-2 w-2 rounded-full bg-[#72a52d]"
                            title="Unread"
                          />
                        )}
                      </span>
                    </button>

                    <button
                      onClick={() => openNotification(item)}
                      className="mt-1 block w-full text-left text-sm leading-6 text-[#646970]"
                    >
                      {item.message}
                    </button>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <SeverityBadge severity={item.severity} />
                      <span className="rounded-full bg-[#f0f0f1] px-2 py-1 text-[11px] font-medium capitalize text-[#646970]">
                        {typeStyle.label}
                      </span>
                      <span className="text-xs text-[#8c8f94]">
                        {item.id}
                      </span>
                      <span className="text-xs text-[#8c8f94]">·</span>
                      <span className="text-xs text-[#646970]">
                        {item.time}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex shrink-0 items-start">
                    <button
                      onClick={() =>
                        setMenuNotification((current) =>
                          current === item.id ? null : item.id
                        )
                      }
                      className="rounded-lg p-2 text-[#8c8f94] transition hover:bg-[#f0f0f1] hover:text-[#1d2327]"
                      aria-label="Notification actions"
                    >
                      <MoreHorizontal size={19} />
                    </button>

                    {menuNotification === item.id && (
                      <>
                        <button
                          className="fixed inset-0 z-10 cursor-default"
                          onClick={() => setMenuNotification(null)}
                          aria-label="Close action menu"
                        />
                        <div className="absolute right-0 top-10 z-20 w-48 rounded-xl border border-[#dcdcde] bg-white p-1.5 shadow-xl">
                          <button
                            onClick={() => {
                              updateNotification(item.id, {
                                read: !item.read,
                              });
                              setMenuNotification(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-[#3c434a] hover:bg-[#f6f7f7]"
                          >
                            {item.read ? (
                              <Mail size={16} />
                            ) : (
                              <MailOpen size={16} />
                            )}
                            Mark as {item.read ? "unread" : "read"}
                          </button>
                          <button
                            onClick={() => {
                              updateNotification(item.id, { archived: true });
                              setMenuNotification(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-[#3c434a] hover:bg-[#f6f7f7]"
                          >
                            <Archive size={16} />
                            Archive
                          </button>
                          <div className="my-1 border-t border-[#f0f0f1]" />
                          <button
                            onClick={() => deleteNotification(item.id)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredNotifications.length === 0 && (
              <div className="flex flex-col items-center px-5 py-16 text-center">
                <div className="rounded-2xl bg-[#f0f0f1] p-4 text-[#646970]">
                  <Bell size={26} />
                </div>
                <h3 className="mt-4 text-base font-bold text-[#1d2327]">
                  No notifications found
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[#646970]">
                  Try another category or clear your search and severity
                  filters.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSeverityFilter("all");
                    chooseCategory("all");
                  }}
                  className="mt-4 rounded-lg border border-[#c3c4c7] px-4 py-2 text-sm font-semibold text-[#2c3338] hover:bg-[#f6f7f7]"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination / load more */}
          {visibleCount < filteredNotifications.length && (
            <div className="border-t border-[#dcdcde] p-4 text-center">
              <button
                onClick={() => setVisibleCount((count) => count + 7)}
                className="rounded-lg border border-[#c3c4c7] bg-white px-5 py-2.5 text-sm font-semibold text-[#2c3338] transition hover:bg-[#f6f7f7]"
              >
                Load more notifications
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Notification details modal */}
      {selectedNotification && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedNotification(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-dialog-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#dcdcde] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#dcdcde] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                {(() => {
                  const Icon =
                    typeStyles[selectedNotification.type]?.icon || Settings;
                  const style =
                    typeStyles[selectedNotification.type] || typeStyles.system;

                  return (
                    <div
                      className={`rounded-xl p-3 ${style.bg} ${style.color}`}
                    >
                      <Icon size={22} />
                    </div>
                  );
                })()}
                <div>
                  <p className="text-xs font-medium text-[#646970]">
                    {selectedNotification.id}
                  </p>
                  <h2
                    id="notification-dialog-title"
                    className="mt-1 text-lg font-bold leading-6 text-[#1d2327]"
                  >
                    {selectedNotification.title}
                  </h2>
                  <div className="mt-2">
                    <SeverityBadge severity={selectedNotification.severity} />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="rounded-lg p-2 text-[#646970] hover:bg-[#f0f0f1]"
                aria-label="Close notification details"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#646970]">
                  Message
                </p>
                <p className="mt-2 text-sm leading-7 text-[#3c434a]">
                  {selectedNotification.message}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[#dcdcde] p-4">
                  <p className="text-xs text-[#646970]">Category</p>
                  <p className="mt-1 text-sm font-semibold capitalize text-[#1d2327]">
                    {selectedNotification.type}
                  </p>
                </div>
                <div className="rounded-xl border border-[#dcdcde] p-4">
                  <p className="text-xs text-[#646970]">Reference</p>
                  <p className="mt-1 wrap-break-word text-sm font-semibold text-[#1d2327]">
                    {selectedNotification.reference}
                  </p>
                </div>
                <div className="rounded-xl border border-[#dcdcde] p-4">
                  <p className="text-xs text-[#646970]">Received</p>
                  <p className="mt-1 text-sm font-semibold text-[#1d2327]">
                    {selectedNotification.time}
                  </p>
                </div>
                <div className="rounded-xl border border-[#dcdcde] p-4">
                  <p className="text-xs text-[#646970]">Status</p>
                  <p className="mt-1 text-sm font-semibold text-[#1d2327]">
                    {selectedNotification.archived
                      ? "Archived"
                      : selectedNotification.read
                        ? "Read"
                        : "Unread"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-2 border-t border-[#f0f0f1] pt-4">
                <button
                  onClick={() => {
                    updateNotification(selectedNotification.id, {
                      archived: !selectedNotification.archived,
                    });
                    setSelectedNotification(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#c3c4c7] px-4 py-2.5 text-sm font-semibold text-[#2c3338] hover:bg-[#f6f7f7]"
                >
                  <Archive size={16} />
                  {selectedNotification.archived ? "Unarchive" : "Archive"}
                </button>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-semibold text-[#20320b] hover:bg-[#91c93b]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Archive confirmation */}
      {confirmClear && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setConfirmClear(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl border border-[#dcdcde] bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Archive size={23} />
            </div>
            <h2 className="mt-4 text-lg font-bold">Archive all read?</h2>
            <p className="mt-2 text-sm leading-6 text-[#646970]">
              All read notifications will be moved to the archived view. Unread
              notifications will remain in your inbox.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setConfirmClear(false)}
                className="rounded-lg border border-[#c3c4c7] px-4 py-2.5 text-sm font-semibold text-[#2c3338] hover:bg-[#f6f7f7]"
              >
                Cancel
              </button>
              <button
                onClick={archiveAllRead}
                className="rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-semibold text-[#20320b] hover:bg-[#91c93b]"
              >
                Archive notifications
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
