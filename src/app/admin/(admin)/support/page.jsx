
"use client";

import { useMemo, useState } from "react";
import {
  Headset,
  Search,
  Plus,
  Download,
  MessageSquare,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Package,
  CreditCard,
  Truck,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Send,
  Paperclip,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  CircleUserRound,
  CalendarDays,
  Tag,
  ShieldAlert,
  RefreshCw,
} from "lucide-react";

const initialTickets = [
  {
    id: "TKT-1048",
    subject: "Order delivered but payment not updated",
    customer: "Rahim Uddin",
    email: "rahim@example.com",
    phone: "01712-345678",
    role: "Seller",
    category: "Payments",
    priority: "High",
    status: "Open",
    assignedTo: "Admin Support",
    orderId: "ORD-50281",
    createdAt: "2026-10-09T08:30:00",
    updatedAt: "2026-10-09T09:10:00",
    messages: [
      {
        sender: "customer",
        name: "Rahim Uddin",
        time: "09 Oct 2026, 08:30 AM",
        text: "The order was delivered yesterday, but the payment is still not showing in my seller balance. Please check this.",
      },
      {
        sender: "admin",
        name: "Admin Support",
        time: "09 Oct 2026, 09:10 AM",
        text: "Thank you for reporting this. We are checking the delivery confirmation and payment reconciliation.",
      },
    ],
  },
  {
    id: "TKT-1047",
    subject: "Courier pickup has been delayed",
    customer: "Nusrat Jahan",
    email: "nusrat@example.com",
    phone: "01812-456789",
    role: "Seller",
    category: "Delivery",
    priority: "High",
    status: "In Progress",
    assignedTo: "Logistics Team",
    orderId: "ORD-50274",
    createdAt: "2026-10-09T07:15:00",
    updatedAt: "2026-10-09T08:45:00",
    messages: [
      {
        sender: "customer",
        name: "Nusrat Jahan",
        time: "09 Oct 2026, 07:15 AM",
        text: "My parcel has been ready for pickup since yesterday. The courier has not arrived yet.",
      },
    ],
  },
  {
    id: "TKT-1046",
    subject: "Unable to update product stock",
    customer: "Sabbir Store",
    email: "seller@example.com",
    phone: "01912-567890",
    role: "Seller",
    category: "Products",
    priority: "Medium",
    status: "Open",
    assignedTo: "Unassigned",
    orderId: "",
    createdAt: "2026-10-08T17:25:00",
    updatedAt: "2026-10-08T17:25:00",
    messages: [
      {
        sender: "customer",
        name: "Sabbir Store",
        time: "08 Oct 2026, 05:25 PM",
        text: "I am getting an error when updating stock for one of my products.",
      },
    ],
  },
  {
    id: "TKT-1045",
    subject: "Refund request for cancelled order",
    customer: "Farzana Akter",
    email: "farzana@example.com",
    phone: "01612-678901",
    role: "Customer",
    category: "Returns & Refunds",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Order Support",
    orderId: "ORD-50221",
    createdAt: "2026-10-08T14:20:00",
    updatedAt: "2026-10-09T07:30:00",
    messages: [
      {
        sender: "customer",
        name: "Farzana Akter",
        time: "08 Oct 2026, 02:20 PM",
        text: "My order was cancelled, and I want to know when the refund will be processed.",
      },
    ],
  },
  {
    id: "TKT-1044",
    subject: "Seller account verification question",
    customer: "Karim Electronics",
    email: "karim@example.com",
    phone: "01512-789012",
    role: "Seller",
    category: "Account",
    priority: "Low",
    status: "Resolved",
    assignedTo: "Admin Support",
    orderId: "",
    createdAt: "2026-10-08T10:15:00",
    updatedAt: "2026-10-08T12:10:00",
    messages: [
      {
        sender: "customer",
        name: "Karim Electronics",
        time: "08 Oct 2026, 10:15 AM",
        text: "What documents are required to verify my seller account?",
      },
      {
        sender: "admin",
        name: "Admin Support",
        time: "08 Oct 2026, 12:10 PM",
        text: "Please submit your required business and identity documents from the seller verification page.",
      },
    ],
  },
  {
    id: "TKT-1043",
    subject: "Incorrect delivery fee displayed",
    customer: "Tanvir Ahmed",
    email: "tanvir@example.com",
    phone: "01312-890123",
    role: "Seller",
    category: "Delivery",
    priority: "Medium",
    status: "Closed",
    assignedTo: "Logistics Team",
    orderId: "ORD-50198",
    createdAt: "2026-10-07T15:40:00",
    updatedAt: "2026-10-08T09:00:00",
    messages: [
      {
        sender: "customer",
        name: "Tanvir Ahmed",
        time: "07 Oct 2026, 03:40 PM",
        text: "The delivery fee displayed at checkout appears different from the configured rate.",
      },
    ],
  },
  {
    id: "TKT-1042",
    subject: "Product listing approval pending",
    customer: "Mim Fashion",
    email: "mim@example.com",
    phone: "01412-901234",
    role: "Seller",
    category: "Products",
    priority: "Low",
    status: "Open",
    assignedTo: "Catalog Team",
    orderId: "",
    createdAt: "2026-10-07T12:10:00",
    updatedAt: "2026-10-07T12:10:00",
    messages: [
      {
        sender: "customer",
        name: "Mim Fashion",
        time: "07 Oct 2026, 12:10 PM",
        text: "My new products have been waiting for approval. Could you please review them?",
      },
    ],
  },
  {
    id: "TKT-1041",
    subject: "Login OTP not received",
    customer: "Mahmud Hasan",
    email: "mahmud@example.com",
    phone: "01722-112233",
    role: "Customer",
    category: "Account",
    priority: "High",
    status: "Resolved",
    assignedTo: "Admin Support",
    orderId: "",
    createdAt: "2026-10-06T11:35:00",
    updatedAt: "2026-10-06T12:00:00",
    messages: [
      {
        sender: "customer",
        name: "Mahmud Hasan",
        time: "06 Oct 2026, 11:35 AM",
        text: "I cannot log in because I am not receiving the OTP.",
      },
    ],
  },
];

const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];
const priorityOptions = ["Low", "Medium", "High", "Urgent"];
const categoryOptions = [
  "Orders",
  "Payments",
  "Delivery",
  "Products",
  "Returns & Refunds",
  "Account",
  "Other",
];

const emptyTicket = {
  subject: "",
  customer: "",
  email: "",
  phone: "",
  role: "Customer",
  category: "Orders",
  priority: "Medium",
  status: "Open",
  assignedTo: "Unassigned",
  orderId: "",
  message: "",
};

function StatusBadge({ status }) {
  const styles = {
    Open: "bg-blue-50 text-blue-700 ring-blue-600/20",
    "In Progress": "bg-amber-50 text-amber-700 ring-amber-600/20",
    Resolved: "bg-green-50 text-green-700 ring-green-600/20",
    Closed: "bg-gray-100 text-gray-600 ring-gray-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] || styles.Open
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Open"
            ? "bg-blue-500"
            : status === "In Progress"
              ? "bg-amber-500"
              : status === "Resolved"
                ? "bg-green-500"
                : "bg-gray-400"
        }`}
      />
      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    Low: "text-gray-600 bg-gray-100",
    Medium: "text-blue-700 bg-blue-50",
    High: "text-orange-700 bg-orange-50",
    Urgent: "text-red-700 bg-red-50",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${
        styles[priority] || styles.Medium
      }`}
    >
      {priority === "Urgent" || priority === "High" ? (
        <AlertCircle size={12} />
      ) : null}
      {priority}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, helper, iconClass }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#646970]">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#1d2327]">
            {value}
          </p>
          <p className="mt-1 text-xs text-[#787c82]">{helper}</p>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function Modal({ title, subtitle, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#dcdcde] bg-white px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-[#1d2327]">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-sm text-[#646970]">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#646970] hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm text-[#1d2327] outline-none placeholder:text-[#a7aaad] focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/15";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-[#34383c]">
        {label}
      </span>
      {children}
    </label>
  );
}

function formatDate(value) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function SupportPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState(emptyTicket);
  const [reply, setReply] = useState("");
  const [notice, setNotice] = useState("");

  const filteredTickets = useMemo(() => {
    const term = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const matchesSearch =
        !term ||
        [
          ticket.id,
          ticket.subject,
          ticket.customer,
          ticket.email,
          ticket.phone,
          ticket.orderId,
          ticket.assignedTo,
        ].some((value) => String(value || "").toLowerCase().includes(term));

      return (
        matchesSearch &&
        (statusFilter === "All" || ticket.status === statusFilter) &&
        (priorityFilter === "All" || ticket.priority === priorityFilter) &&
        (categoryFilter === "All" || ticket.category === categoryFilter) &&
        (roleFilter === "All" || ticket.role === roleFilter)
      );
    });
  }, [tickets, search, statusFilter, priorityFilter, categoryFilter, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleTickets = filteredTickets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const selectedTicket =
    tickets.find((ticket) => ticket.id === selectedTicketId) || null;

  const openCount = tickets.filter((ticket) => ticket.status === "Open").length;
  const inProgressCount = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;
  const resolvedCount = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;
  const urgentCount = tickets.filter(
    (ticket) =>
      ["High", "Urgent"].includes(ticket.priority) &&
      ["Open", "In Progress"].includes(ticket.status)
  ).length;

  function notify(message) {
    setNotice(message);
    setTimeout(() => setNotice(""), 3000);
  }

  function updateTicket(id, updates) {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === id
          ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
          : ticket
      )
    );
  }

  function updateForm(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function createTicket(event) {
    event.preventDefault();

    if (
      !form.subject.trim() ||
      !form.customer.trim() ||
      !form.message.trim()
    ) {
      notify("Subject, customer name, and message are required.");
      return;
    }

    const now = new Date().toISOString();
    const newTicket = {
      ...form,
      id: `TKT-${Date.now().toString().slice(-6)}`,
      subject: form.subject.trim(),
      customer: form.customer.trim(),
      messages: [
        {
          sender: "customer",
          name: form.customer.trim(),
          time: formatDateTime(now),
          text: form.message.trim(),
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    setTickets((previous) => [newTicket, ...previous]);
    setPage(1);
    setShowCreateModal(false);
    setForm(emptyTicket);
    notify("Ticket created in this demo.");
  }

  function sendReply(event) {
    event.preventDefault();

    if (!selectedTicket || !reply.trim()) return;

    const newMessage = {
      sender: "admin",
      name: "Admin Support",
      time: formatDateTime(new Date().toISOString()),
      text: reply.trim(),
    };

    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === selectedTicket.id
          ? {
              ...ticket,
              messages: [...ticket.messages, newMessage],
              updatedAt: new Date().toISOString(),
              status:
                ticket.status === "Open" ? "In Progress" : ticket.status,
            }
          : ticket
      )
    );

    setReply("");
    notify("Reply added in this demo.");
  }

  function exportCSV() {
    const columns = [
      "id",
      "subject",
      "customer",
      "email",
      "phone",
      "role",
      "category",
      "priority",
      "status",
      "assignedTo",
      "orderId",
      "createdAt",
      "updatedAt",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [
      columns.join(","),
      ...filteredTickets.map((ticket) =>
        columns.map((column) => escapeCSV(ticket[column])).join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "amardokan-support-tickets.csv";
    link.click();
    URL.revokeObjectURL(url);
    notify("Support tickets exported.");
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setCategoryFilter("All");
    setRoleFilter("All");
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-[#f6f7f7] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-375 space-y-6">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#646970]">
              <Headset size={15} />
              Support / Tickets
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Support Center
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm text-[#646970]">
              Manage customer and seller requests, prioritize issues, and keep
              track of support conversations.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#c3c4c7] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => {
                setForm(emptyTicket);
                setShowCreateModal(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2271b1] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#135e96]"
            >
              <Plus size={17} />
              Create ticket
            </button>
          </div>
        </div>

        {/* Demo notice */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          <AlertCircle className="mt-0.5 shrink-0" size={18} />
          <div>
            <p className="font-semibold">Demo support inbox</p>
            <p className="mt-1 leading-5 text-blue-800">
              These are sample tickets. Ticket creation, status updates, and
              replies currently exist only in local page state. Connect them
              to your database and notification system for production use.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={MessageSquare}
            label="Open tickets"
            value={openCount}
            helper="Awaiting support action"
            iconClass="bg-blue-50 text-blue-700"
          />
          <StatCard
            icon={Clock3}
            label="In progress"
            value={inProgressCount}
            helper="Currently being handled"
            iconClass="bg-amber-50 text-amber-700"
          />
          <StatCard
            icon={CheckCircle2}
            label="Resolved"
            value={resolvedCount}
            helper="Marked as resolved"
            iconClass="bg-green-50 text-green-700"
          />
          <StatCard
            icon={ShieldAlert}
            label="High priority"
            value={urgentCount}
            helper="High or urgent unresolved tickets"
            iconClass="bg-red-50 text-red-700"
          />
        </div>

        {/* Filter panel */}
        <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative min-w-0 flex-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#787c82]"
              />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search ticket, subject, customer, order..."
                className={`${inputClass} pl-9`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:flex">
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(1);
                }}
                className={`${inputClass} xl:w-40`}
                aria-label="Filter status"
              >
                <option value="All">All statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={priorityFilter}
                onChange={(event) => {
                  setPriorityFilter(event.target.value);
                  setPage(1);
                }}
                className={`${inputClass} xl:w-36`}
                aria-label="Filter priority"
              >
                <option value="All">All priorities</option>
                {priorityOptions.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>

              <select
                value={categoryFilter}
                onChange={(event) => {
                  setCategoryFilter(event.target.value);
                  setPage(1);
                }}
                className={`${inputClass} xl:w-44`}
                aria-label="Filter category"
              >
                <option value="All">All categories</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={roleFilter}
                onChange={(event) => {
                  setRoleFilter(event.target.value);
                  setPage(1);
                }}
                className={`${inputClass} xl:w-36`}
                aria-label="Filter user type"
              >
                <option value="All">All users</option>
                <option value="Customer">Customer</option>
                <option value="Seller">Seller</option>
              </select>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#c3c4c7] px-3 py-2.5 text-sm font-medium text-[#50575e] hover:bg-gray-50"
            >
              <RefreshCw size={15} />
              Reset
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#f0f0f1] pt-3 text-xs text-[#646970]">
            <span>
              Showing{" "}
              {filteredTickets.length
                ? (currentPage - 1) * pageSize + 1
                : 0}
              {"–"}
              {Math.min(currentPage * pageSize, filteredTickets.length)} of{" "}
              {filteredTickets.length} tickets
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Filter size={14} />
              Filtered results are included in export
            </span>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border border-[#dcdcde] bg-white lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-275 text-left text-sm">
              <thead className="bg-[#f6f7f7] text-xs uppercase tracking-wide text-[#646970]">
                <tr>
                  <th className="px-5 py-4 font-semibold">Ticket</th>
                  <th className="px-4 py-4 font-semibold">Customer</th>
                  <th className="px-4 py-4 font-semibold">Category</th>
                  <th className="px-4 py-4 font-semibold">Priority</th>
                  <th className="px-4 py-4 font-semibold">Assigned to</th>
                  <th className="px-4 py-4 font-semibold">Updated</th>
                  <th className="px-4 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#f0f0f1]">
                {visibleTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-[#f9fafb]">
                    <td className="max-w-77.5 px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedTicketId(ticket.id)}
                        className="text-left"
                      >
                        <p className="font-semibold text-[#2271b1] hover:underline">
                          {ticket.subject}
                        </p>
                        <p className="mt-1 text-xs text-[#787c82]">
                          {ticket.id}
                          {ticket.orderId ? ` · ${ticket.orderId}` : ""}
                        </p>
                      </button>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-medium">{ticket.customer}</p>
                      <p className="mt-1 text-xs text-[#787c82]">
                        {ticket.role}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm text-[#50575e]">
                        {ticket.category === "Payments" ? (
                          <CreditCard size={15} />
                        ) : ticket.category === "Delivery" ? (
                          <Truck size={15} />
                        ) : ticket.category === "Products" ? (
                          <Package size={15} />
                        ) : (
                          <Tag size={15} />
                        )}
                        {ticket.category}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <PriorityBadge priority={ticket.priority} />
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-sm">{ticket.assignedTo}</span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-xs text-[#646970]">
                        {formatDateTime(ticket.updatedAt)}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={ticket.status} />
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedTicketId(ticket.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#c3c4c7] px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {visibleTickets.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <MessageSquare
                        className="mx-auto mb-3 text-gray-300"
                        size={34}
                      />
                      <p className="font-semibold">No tickets found</p>
                      <p className="mt-1 text-sm text-[#787c82]">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-3 border-t border-[#dcdcde] px-5 py-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-sm text-[#646970]">
              <span>Rows per page</span>
              <select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
                className="rounded-md border border-[#c3c4c7] bg-white px-2 py-1.5 outline-none"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <span className="text-sm text-[#646970]">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-[#c3c4c7] p-2 disabled:opacity-40 hover:bg-gray-50"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-lg border border-[#c3c4c7] p-2 disabled:opacity-40 hover:bg-gray-50"
                  aria-label="Next page"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile ticket cards */}
        <div className="space-y-3 lg:hidden">
          {visibleTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-xl border border-[#dcdcde] bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#787c82]">
                    {ticket.id}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className="mt-1 text-left font-semibold text-[#2271b1] hover:underline"
                  >
                    {ticket.subject}
                  </button>
                </div>
                <StatusBadge status={ticket.status} />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <PriorityBadge priority={ticket.priority} />
                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                  {ticket.category}
                </span>
                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                  {ticket.role}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#f0f0f1] pt-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {ticket.customer}
                  </p>
                  <p className="mt-1 text-xs text-[#787c82]">
                    Updated {formatDateTime(ticket.updatedAt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#c3c4c7] px-3 py-2 text-sm font-semibold hover:bg-gray-50"
                >
                  <Eye size={15} />
                  View
                </button>
              </div>
            </div>
          ))}

          {visibleTickets.length === 0 && (
            <div className="rounded-xl border border-[#dcdcde] bg-white px-4 py-12 text-center">
              <MessageSquare
                className="mx-auto mb-3 text-gray-300"
                size={34}
              />
              <p className="font-semibold">No tickets found</p>
              <p className="mt-1 text-sm text-[#787c82]">
                Try changing your search or filters.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between rounded-xl border border-[#dcdcde] bg-white p-3">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-[#c3c4c7] px-3 py-2 text-sm disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <span className="text-sm text-[#646970]">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-[#c3c4c7] px-3 py-2 text-sm disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Support workflow information */}
        <div className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Headset size={21} />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold">Support workflow</h2>
              <p className="mt-1 text-sm leading-6 text-[#646970]">
                A production support system should preserve message history,
                restrict ticket access by role, and record every assignment or
                status change for audit purposes.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    title: "Ticket ownership",
                    text: "Assign each ticket to an authorized admin or support team.",
                  },
                  {
                    title: "Response tracking",
                    text: "Track first response time, resolution time, and overdue tickets.",
                  },
                  {
                    title: "Notifications",
                    text: "Notify customers when a reply or status update is available.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-[#e2e4e7] p-3"
                  >
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-[#646970]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create ticket modal */}
      {showCreateModal && (
        <Modal
          title="Create support ticket"
          subtitle="Create a ticket for a customer or seller."
          onClose={() => setShowCreateModal(false)}
        >
          <form onSubmit={createTicket} className="space-y-4">
            <Field label="Subject *">
              <input
                required
                value={form.subject}
                onChange={(event) => updateForm("subject", event.target.value)}
                placeholder="Describe the issue briefly"
                className={inputClass}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Customer / seller name *">
                <input
                  required
                  value={form.customer}
                  onChange={(event) => updateForm("customer", event.target.value)}
                  placeholder="Full name or store name"
                  className={inputClass}
                />
              </Field>

              <Field label="User type">
                <select
                  value={form.role}
                  onChange={(event) => updateForm("role", event.target.value)}
                  className={inputClass}
                >
                  <option value="Customer">Customer</option>
                  <option value="Seller">Seller</option>
                </select>
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateForm("email", event.target.value)}
                  placeholder="name@example.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Phone">
                <input
                  value={form.phone}
                  onChange={(event) => updateForm("phone", event.target.value)}
                  placeholder="01XXXXXXXXX"
                  className={inputClass}
                />
              </Field>

              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(event) => updateForm("category", event.target.value)}
                  className={inputClass}
                >
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Priority">
                <select
                  value={form.priority}
                  onChange={(event) => updateForm("priority", event.target.value)}
                  className={inputClass}
                >
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Assign to">
                <select
                  value={form.assignedTo}
                  onChange={(event) =>
                    updateForm("assignedTo", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="Unassigned">Unassigned</option>
                  <option value="Admin Support">Admin Support</option>
                  <option value="Order Support">Order Support</option>
                  <option value="Logistics Team">Logistics Team</option>
                  <option value="Catalog Team">Catalog Team</option>
                </select>
              </Field>

              <Field label="Related order ID">
                <input
                  value={form.orderId}
                  onChange={(event) => updateForm("orderId", event.target.value)}
                  placeholder="Optional order ID"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Initial message *">
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(event) => updateForm("message", event.target.value)}
                placeholder="Describe the issue and relevant details..."
                className={inputClass}
              />
            </Field>

            <div className="flex flex-col-reverse gap-2 border-t border-[#e2e4e7] pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg border border-[#c3c4c7] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2271b1] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#135e96]"
              >
                <Plus size={16} />
                Create ticket
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Ticket details modal */}
      {selectedTicket && (
        <Modal
          title={selectedTicket.subject}
          subtitle={`${selectedTicket.id} · Created ${formatDate(selectedTicket.createdAt)}`}
          onClose={() => {
            setSelectedTicketId(null);
            setReply("");
          }}
        >
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={selectedTicket.status} />
              <PriorityBadge priority={selectedTicket.priority} />
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                {selectedTicket.category}
              </span>
            </div>

            {/* Customer details */}
            <div className="rounded-xl border border-[#e2e4e7] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                  <CircleUserRound size={21} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{selectedTicket.customer}</p>
                  <p className="mt-1 text-xs text-[#646970]">
                    {selectedTicket.role}
                  </p>
                  <p className="mt-2 break-all text-sm text-[#50575e]">
                    {selectedTicket.email || "No email provided"}
                  </p>
                  <p className="mt-1 text-sm text-[#50575e]">
                    {selectedTicket.phone || "No phone provided"}
                  </p>
                  {selectedTicket.orderId && (
                    <p className="mt-2 text-xs font-medium text-[#2271b1]">
                      Related order: {selectedTicket.orderId}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Status, priority, assignment */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Ticket status">
                <select
                  value={selectedTicket.status}
                  onChange={(event) => {
                    updateTicket(selectedTicket.id, {
                      status: event.target.value,
                    });
                    notify("Ticket status updated in this demo.");
                  }}
                  className={inputClass}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Priority">
                <select
                  value={selectedTicket.priority}
                  onChange={(event) => {
                    updateTicket(selectedTicket.id, {
                      priority: event.target.value,
                    });
                    notify("Ticket priority updated in this demo.");
                  }}
                  className={inputClass}
                >
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="sm:col-span-2">
                <Field label="Assigned team">
                  <select
                    value={selectedTicket.assignedTo}
                    onChange={(event) => {
                      updateTicket(selectedTicket.id, {
                        assignedTo: event.target.value,
                      });
                      notify("Ticket assignment updated in this demo.");
                    }}
                    className={inputClass}
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Admin Support">Admin Support</option>
                    <option value="Order Support">Order Support</option>
                    <option value="Logistics Team">Logistics Team</option>
                    <option value="Catalog Team">Catalog Team</option>
                  </select>
                </Field>
              </div>
            </div>

            {/* Conversation */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold">Conversation</h3>
                <span className="text-xs text-[#787c82]">
                  {selectedTicket.messages.length} messages
                </span>
              </div>

              <div className="max-h-72 space-y-3 overflow-y-auto rounded-xl bg-[#f6f7f7] p-3">
                {selectedTicket.messages.map((message, index) => (
                  <div
                    key={`${selectedTicket.id}-${index}`}
                    className={`flex ${
                      message.sender === "admin"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[90%] rounded-xl p-3 ${
                        message.sender === "admin"
                          ? "bg-[#2271b1] text-white"
                          : "border border-[#e2e4e7] bg-white text-[#1d2327]"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                        <p className="text-xs font-semibold">{message.name}</p>
                        <p
                          className={`text-[10px] ${
                            message.sender === "admin"
                              ? "text-blue-100"
                              : "text-[#787c82]"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6">
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply form */}
            <form onSubmit={sendReply} className="space-y-3">
              <Field label="Add a reply">
                <textarea
                  rows={3}
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  placeholder="Write a reply to the customer..."
                  className={inputClass}
                  disabled={selectedTicket.status === "Closed"}
                />
              </Field>

              {selectedTicket.status === "Closed" && (
                <p className="text-xs text-[#646970]">
                  This ticket is closed. Change its status to add a reply.
                </p>
              )}

              <div className="flex flex-col-reverse gap-2 border-t border-[#e2e4e7] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTicketId(null);
                    setReply("");
                  }}
                  className="rounded-lg border border-[#c3c4c7] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                >
                  Close details
                </button>

                <button
                  type="submit"
                  disabled={!reply.trim() || selectedTicket.status === "Closed"}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2271b1] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={15} />
                  Send reply
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Toast */}
      {notice && (
        <div className="fixed bottom-5 right-5 z-60 flex max-w-sm items-start gap-3 rounded-xl border border-[#dcdcde] bg-white px-4 py-3.5 shadow-xl">
          <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-green-600" />
          <p className="text-sm font-medium text-[#1d2327]">{notice}</p>
          <button
            type="button"
            onClick={() => setNotice("")}
            className="ml-2 text-[#787c82] hover:text-[#1d2327]"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
