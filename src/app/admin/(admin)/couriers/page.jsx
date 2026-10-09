/* eslint-disable react/no-unescaped-entities */

"use client";

import { useMemo, useState } from "react";
import {
  Truck,
  Package,
  CheckCircle2,
  Clock3,
  Search,
  Download,
  Eye,
  Pencil,
  Plus,
  X,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Settings2,
  AlertCircle,
  CircleDollarSign,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  Activity,
} from "lucide-react";

const initialCouriers = [
  {
    id: "COU-1001",
    name: "Pathao Courier",
    code: "PATHAO",
    contact: "09610-000000",
    email: "support@pathao.com",
    type: "API Integration",
    coverage: "Nationwide",
    insideDhaka: 60,
    outsideDhaka: 120,
    codFee: 1,
    shipments: 1842,
    delivered: 1694,
    failed: 48,
    status: "Active",
    connection: "Connected",
    lastSync: "2 min ago",
    color: "bg-orange-50 text-orange-700",
    notes: "Regular parcel and express delivery services.",
  },
  {
    id: "COU-1002",
    name: "Steadfast Courier",
    code: "STEADFAST",
    contact: "09678-045045",
    email: "support@steadfast.com.bd",
    type: "API Integration",
    coverage: "Nationwide",
    insideDhaka: 70,
    outsideDhaka: 130,
    codFee: 1,
    shipments: 1256,
    delivered: 1155,
    failed: 35,
    status: "Active",
    connection: "Connected",
    lastSync: "5 min ago",
    color: "bg-blue-50 text-blue-700",
    notes: "Parcel delivery and cash-on-delivery collection.",
  },
  {
    id: "COU-1003",
    name: "RedX",
    code: "REDX",
    contact: "09610-073073",
    email: "support@redx.com.bd",
    type: "API Integration",
    coverage: "Nationwide",
    insideDhaka: 65,
    outsideDhaka: 120,
    codFee: 1,
    shipments: 984,
    delivered: 901,
    failed: 29,
    status: "Active",
    connection: "Connected",
    lastSync: "12 min ago",
    color: "bg-red-50 text-red-700",
    notes: "Last-mile delivery and parcel tracking.",
  },
  {
    id: "COU-1004",
    name: "Paperfly",
    code: "PAPERFLY",
    contact: "09678-300400",
    email: "support@paperfly.com.bd",
    type: "Manual",
    coverage: "Selected areas",
    insideDhaka: 70,
    outsideDhaka: 140,
    codFee: 1,
    shipments: 528,
    delivered: 466,
    failed: 21,
    status: "Active",
    connection: "Manual",
    lastSync: "Yesterday",
    color: "bg-violet-50 text-violet-700",
    notes: "Manual shipment booking workflow.",
  },
  {
    id: "COU-1005",
    name: "eCourier",
    code: "ECOURIER",
    contact: "09612-345678",
    email: "support@ecourier.com.bd",
    type: "API Integration",
    coverage: "Nationwide",
    insideDhaka: 60,
    outsideDhaka: 110,
    codFee: 1,
    shipments: 312,
    delivered: 279,
    failed: 12,
    status: "Inactive",
    connection: "Disconnected",
    lastSync: "Never",
    color: "bg-emerald-50 text-emerald-700",
    notes: "Integration temporarily disabled.",
  },
  {
    id: "COU-1006",
    name: "Sundarban Courier",
    code: "SUNDARBAN",
    contact: "09612-003003",
    email: "support@sundarbancourierltd.com",
    type: "Manual",
    coverage: "Selected areas",
    insideDhaka: 80,
    outsideDhaka: 150,
    codFee: 0,
    shipments: 184,
    delivered: 157,
    failed: 9,
    status: "Setup Required",
    connection: "Not configured",
    lastSync: "Never",
    color: "bg-amber-50 text-amber-700",
    notes: "Courier profile needs configuration.",
  },
];

const emptyForm = {
  name: "",
  code: "",
  contact: "",
  email: "",
  type: "Manual",
  coverage: "Nationwide",
  insideDhaka: "60",
  outsideDhaka: "120",
  codFee: "1",
  status: "Active",
  notes: "",
};

const money = (value) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-green-50 text-green-700 ring-green-600/20",
    Inactive: "bg-gray-100 text-gray-600 ring-gray-500/20",
    "Setup Required": "bg-amber-50 text-amber-700 ring-amber-600/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] || styles.Inactive
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Active"
            ? "bg-green-500"
            : status === "Setup Required"
              ? "bg-amber-500"
              : "bg-gray-400"
        }`}
      />
      {status}
    </span>
  );
}

function ConnectionBadge({ connection }) {
  const connected = connection === "Connected";
  const manual = connection === "Manual";

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
        connected
          ? "text-green-700"
          : manual
            ? "text-blue-700"
            : "text-gray-500"
      }`}
    >
      {connected ? (
        <CheckCircle2 size={14} />
      ) : manual ? (
        <Truck size={14} />
      ) : (
        <AlertCircle size={14} />
      )}
      {connection}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, helper, iconClass }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
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

function Modal({ title, subtitle, onClose, children, wide = false }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`max-h-[92vh] w-full ${
          wide ? "max-w-3xl" : "max-w-xl"
        } overflow-y-auto rounded-2xl bg-white shadow-2xl`}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#dcdcde] bg-white px-5 py-4 sm:px-6">
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
            aria-label="Close modal"
          >
            <X size={19} />
          </button>
        </div>
        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-[#34383c]">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-[#787c82]">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm text-[#1d2327] outline-none transition placeholder:text-[#a7aaad] focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/15";

export default function CouriersPage() {
  const [couriers, setCouriers] = useState(initialCouriers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [editingCourier, setEditingCourier] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState("");

  const filteredCouriers = useMemo(() => {
    const term = search.trim().toLowerCase();

    return couriers.filter((courier) => {
      const matchesSearch =
        !term ||
        [
          courier.name,
          courier.code,
          courier.id,
          courier.contact,
          courier.email,
          courier.coverage,
        ].some((value) => String(value || "").toLowerCase().includes(term));

      const matchesStatus =
        statusFilter === "All" || courier.status === statusFilter;

      const matchesType =
        typeFilter === "All" || courier.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [couriers, search, statusFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCouriers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleCouriers = filteredCouriers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const activeCount = couriers.filter((c) => c.status === "Active").length;
  const totalShipments = couriers.reduce((sum, c) => sum + c.shipments, 0);
  const deliveredCount = couriers.reduce((sum, c) => sum + c.delivered, 0);
  const totalFailed = couriers.reduce((sum, c) => sum + c.failed, 0);

  const successRate = totalShipments
    ? ((deliveredCount / totalShipments) * 100).toFixed(1)
    : "0.0";

  function notify(message) {
    setNotice(message);
    setTimeout(() => setNotice(""), 3000);
  }

  function openAddModal() {
    setEditingCourier(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditModal(courier) {
    setEditingCourier(courier);
    setForm({
      name: courier.name,
      code: courier.code,
      contact: courier.contact,
      email: courier.email,
      type: courier.type,
      coverage: courier.coverage,
      insideDhaka: String(courier.insideDhaka),
      outsideDhaka: String(courier.outsideDhaka),
      codFee: String(courier.codFee),
      status: courier.status,
      notes: courier.notes || "",
    });
    setShowForm(true);
  }

  function handleSave(event) {
    event.preventDefault();

    const name = form.name.trim();
    const code = form.code.trim().toUpperCase();

    if (!name || !code) {
      notify("Courier name and code are required.");
      return;
    }

    const duplicateCode = couriers.some(
      (courier) =>
        courier.code.toLowerCase() === code.toLowerCase() &&
        courier.id !== editingCourier?.id
    );

    if (duplicateCode) {
      notify("A courier with this code already exists.");
      return;
    }

    const values = {
      ...form,
      name,
      code,
      insideDhaka: Math.max(0, Number(form.insideDhaka) || 0),
      outsideDhaka: Math.max(0, Number(form.outsideDhaka) || 0),
      codFee: Math.max(0, Number(form.codFee) || 0),
    };

    if (editingCourier) {
      setCouriers((previous) =>
        previous.map((courier) =>
          courier.id === editingCourier.id
            ? { ...courier, ...values }
            : courier
        )
      );
      notify("Courier updated in this demo.");
    } else {
      const newCourier = {
        ...values,
        id: `COU-${Date.now().toString().slice(-6)}`,
        shipments: 0,
        delivered: 0,
        failed: 0,
        connection: values.type === "Manual" ? "Manual" : "Not configured",
        lastSync: "Never",
        color: "bg-gray-100 text-gray-700",
      };

      setCouriers((previous) => [newCourier, ...previous]);
      setPage(1);
      notify("Courier added in this demo.");
    }

    setShowForm(false);
  }

  function toggleStatus(courier) {
    const nextStatus = courier.status === "Active" ? "Inactive" : "Active";

    setCouriers((previous) =>
      previous.map((item) =>
        item.id === courier.id ? { ...item, status: nextStatus } : item
      )
    );

    if (selectedCourier?.id === courier.id) {
      setSelectedCourier({ ...courier, status: nextStatus });
    }

    notify(`${courier.name} marked ${nextStatus.toLowerCase()} in this demo.`);
  }

  function exportCSV() {
    const columns = [
      "id",
      "name",
      "code",
      "type",
      "contact",
      "email",
      "coverage",
      "insideDhaka",
      "outsideDhaka",
      "codFee",
      "shipments",
      "delivered",
      "failed",
      "status",
      "connection",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [
      columns.join(","),
      ...filteredCouriers.map((courier) =>
        columns.map((column) => escapeCSV(courier[column])).join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "amardokan-couriers.csv";
    link.click();

    URL.revokeObjectURL(url);
    notify("Courier CSV exported.");
  }

  function updateForm(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  return (
    <div className="min-h-screen bg-[#f6f7f7] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-375 space-y-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#646970]">
              <Truck size={15} />
              Logistics / Couriers
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Courier Management
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm text-[#646970]">
              Manage courier providers, delivery rates, service coverage, and
              integration status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2271b1] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#135e96]"
            >
              <Plus size={17} />
              Add courier
            </button>
          </div>
        </div>

        {/* Demo notice */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          <AlertCircle className="mt-0.5 shrink-0" size={18} />
          <div>
            <p className="font-semibold">Demo data and local actions</p>
            <p className="mt-1 leading-5 text-blue-800">
              Courier records and changes are stored only in this page's React
              state. Live shipment booking, tracking, and API connections are
              not configured.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Truck}
            label="Active couriers"
            value={activeCount}
            helper={`Out of ${couriers.length} providers`}
            iconClass="bg-green-50 text-green-700"
          />
          <StatCard
            icon={Package}
            label="Total shipments"
            value={totalShipments.toLocaleString("en-BD")}
            helper="Across demo courier records"
            iconClass="bg-blue-50 text-blue-700"
          />
          <StatCard
            icon={CheckCircle2}
            label="Delivered shipments"
            value={deliveredCount.toLocaleString("en-BD")}
            helper={`${successRate}% of recorded shipments`}
            iconClass="bg-emerald-50 text-emerald-700"
          />
          <StatCard
            icon={Activity}
            label="Failed shipments"
            value={totalFailed.toLocaleString("en-BD")}
            helper="Recorded delivery failures"
            iconClass="bg-red-50 text-red-700"
          />
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
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
                placeholder="Search courier name, code, phone, email..."
                className={`${inputClass} pl-9`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(1);
                }}
                className={`${inputClass} sm:w-44`}
                aria-label="Filter by status"
              >
                <option value="All">All statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Setup Required">Setup required</option>
              </select>

              <select
                value={typeFilter}
                onChange={(event) => {
                  setTypeFilter(event.target.value);
                  setPage(1);
                }}
                className={`${inputClass} sm:w-44`}
                aria-label="Filter by integration type"
              >
                <option value="All">All integrations</option>
                <option value="API Integration">API integration</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setTypeFilter("All");
                setPage(1);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#c3c4c7] px-3 py-2.5 text-sm font-medium text-[#50575e] hover:bg-gray-50"
            >
              <RefreshCw size={15} />
              Reset
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#f0f0f1] pt-3 text-xs text-[#646970]">
            <span>
              Showing {filteredCouriers.length ? (currentPage - 1) * pageSize + 1 : 0}
              {"–"}
              {Math.min(currentPage * pageSize, filteredCouriers.length)} of{" "}
              {filteredCouriers.length} couriers
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Settings2 size={14} />
              Rates shown in BDT
            </span>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border border-[#dcdcde] bg-white lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-262.5 text-left text-sm">
              <thead className="bg-[#f6f7f7] text-xs uppercase tracking-wide text-[#646970]">
                <tr>
                  <th className="px-5 py-4 font-semibold">Courier provider</th>
                  <th className="px-4 py-4 font-semibold">Integration</th>
                  <th className="px-4 py-4 font-semibold">Delivery rates</th>
                  <th className="px-4 py-4 font-semibold">Shipments</th>
                  <th className="px-4 py-4 font-semibold">Success rate</th>
                  <th className="px-4 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f1]">
                {visibleCouriers.map((courier) => {
                  const rate = courier.shipments
                    ? (
                        (courier.delivered / courier.shipments) *
                        100
                      ).toFixed(1)
                    : "—";

                  return (
                    <tr
                      key={courier.id}
                      className="transition hover:bg-[#f9fafb]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${courier.color}`}
                          >
                            <Truck size={20} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-[#1d2327]">
                              {courier.name}
                            </p>
                            <p className="mt-1 text-xs text-[#787c82]">
                              {courier.code} · {courier.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <ConnectionBadge connection={courier.connection} />
                        <p className="mt-1 text-xs text-[#787c82]">
                          {courier.type}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium">
                          {money(courier.insideDhaka)}
                          <span className="ml-1 text-xs font-normal text-[#787c82]">
                            inside
                          </span>
                        </p>
                        <p className="mt-1 text-xs text-[#646970]">
                          {money(courier.outsideDhaka)} outside Dhaka
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold">
                          {courier.shipments.toLocaleString("en-BD")}
                        </p>
                        <p className="mt-1 text-xs text-[#787c82]">
                          {courier.delivered.toLocaleString("en-BD")} delivered
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-green-500"
                              style={{
                                width: `${Math.min(Number(rate) || 0, 100)}%`,
                              }}
                            />
                          </div>
                          <span className="font-semibold">{rate}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={courier.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedCourier(courier)}
                            className="rounded-lg p-2 text-[#646970] hover:bg-blue-50 hover:text-[#2271b1]"
                            title="View details"
                          >
                            <Eye size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditModal(courier)}
                            className="rounded-lg p-2 text-[#646970] hover:bg-blue-50 hover:text-[#2271b1]"
                            title="Edit courier"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleStatus(courier)}
                            className={`rounded-lg p-2 ${
                              courier.status === "Active"
                                ? "text-green-700 hover:bg-green-50"
                                : "text-[#646970] hover:bg-gray-100"
                            }`}
                            title={
                              courier.status === "Active"
                                ? "Deactivate courier"
                                : "Activate courier"
                            }
                          >
                            {courier.status === "Active" ? (
                              <ToggleRight size={20} />
                            ) : (
                              <ToggleLeft size={20} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {visibleCouriers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <Truck className="mx-auto mb-3 text-gray-300" size={34} />
                      <p className="font-semibold text-[#34383c]">
                        No couriers found
                      </p>
                      <p className="mt-1 text-sm text-[#787c82]">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
                  className="rounded-lg border border-[#c3c4c7] p-2 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-lg border border-[#c3c4c7] p-2 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50"
                  aria-label="Next page"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 lg:hidden">
          {visibleCouriers.map((courier) => {
            const rate = courier.shipments
              ? ((courier.delivered / courier.shipments) * 100).toFixed(1)
              : "—";

            return (
              <div
                key={courier.id}
                className="rounded-xl border border-[#dcdcde] bg-white p-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${courier.color}`}
                  >
                    <Truck size={21} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{courier.name}</h3>
                      <StatusBadge status={courier.status} />
                    </div>
                    <p className="mt-1 text-xs text-[#787c82]">
                      {courier.code} · {courier.id}
                    </p>
                    <div className="mt-2">
                      <ConnectionBadge connection={courier.connection} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-[#f6f7f7] p-3">
                  <div>
                    <p className="text-xs text-[#646970]">Inside Dhaka</p>
                    <p className="mt-1 font-semibold">
                      {money(courier.insideDhaka)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#646970]">Outside Dhaka</p>
                    <p className="mt-1 font-semibold">
                      {money(courier.outsideDhaka)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#646970]">Shipments</p>
                    <p className="mt-1 font-semibold">
                      {courier.shipments.toLocaleString("en-BD")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#646970]">Delivery success</p>
                    <p className="mt-1 font-semibold">{rate}%</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCourier(courier)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#c3c4c7] px-3 py-2 text-sm font-medium hover:bg-gray-50"
                  >
                    <Eye size={15} />
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditModal(courier)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#c3c4c7] px-3 py-2 text-sm font-medium hover:bg-gray-50"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleStatus(courier)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#c3c4c7] px-3 py-2 text-sm font-medium hover:bg-gray-50"
                  >
                    {courier.status === "Active" ? (
                      <ToggleRight size={17} />
                    ) : (
                      <ToggleLeft size={17} />
                    )}
                    {courier.status === "Active" ? "Disable" : "Enable"}
                  </button>
                </div>
              </div>
            );
          })}

          {visibleCouriers.length === 0 && (
            <div className="rounded-xl border border-[#dcdcde] bg-white px-4 py-12 text-center">
              <Truck className="mx-auto mb-3 text-gray-300" size={34} />
              <p className="font-semibold">No couriers found</p>
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

        {/* Integration guidance */}
        <div className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <ShieldCheck size={21} />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold">Courier integration checklist</h2>
              <p className="mt-1 text-sm leading-6 text-[#646970]">
                Before enabling live bookings, configure credentials securely,
                test shipment creation, validate tracking webhooks, and map
                each courier's delivery and COD fees to your order workflow.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    title: "API credentials",
                    text: "Store keys in server-side environment variables or encrypted secrets.",
                  },
                  {
                    title: "Shipment lifecycle",
                    text: "Track booking, pickup, in-transit, delivered, and returned events.",
                  },
                  {
                    title: "COD reconciliation",
                    text: "Reconcile courier remittances with orders and seller balances.",
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

      {/* Add / Edit Courier Modal */}
      {showForm && (
        <Modal
          title={editingCourier ? "Edit courier" : "Add courier"}
          subtitle="Configure the courier profile and default delivery rates."
          onClose={() => setShowForm(false)}
          wide
        >
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Courier name *">
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="e.g. My Courier"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Unique courier code *"
                hint="Use a short uppercase identifier."
              >
                <input
                  required
                  value={form.code}
                  onChange={(event) => updateForm("code", event.target.value)}
                  placeholder="e.g. MYCOURIER"
                  className={inputClass}
                />
              </Field>

              <Field label="Contact phone">
                <input
                  value={form.contact}
                  onChange={(event) => updateForm("contact", event.target.value)}
                  placeholder="01XXXXXXXXX"
                  className={inputClass}
                />
              </Field>

              <Field label="Support email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateForm("email", event.target.value)}
                  placeholder="support@example.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Integration type">
                <select
                  value={form.type}
                  onChange={(event) => updateForm("type", event.target.value)}
                  className={inputClass}
                >
                  <option value="Manual">Manual</option>
                  <option value="API Integration">API integration</option>
                </select>
              </Field>

              <Field label="Service coverage">
                <select
                  value={form.coverage}
                  onChange={(event) => updateForm("coverage", event.target.value)}
                  className={inputClass}
                >
                  <option value="Nationwide">Nationwide</option>
                  <option value="Selected areas">Selected areas</option>
                  <option value="Dhaka only">Dhaka only</option>
                </select>
              </Field>

              <Field label="Inside Dhaka fee (BDT)">
                <input
                  type="number"
                  min="0"
                  required
                  value={form.insideDhaka}
                  onChange={(event) =>
                    updateForm("insideDhaka", event.target.value)
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Outside Dhaka fee (BDT)">
                <input
                  type="number"
                  min="0"
                  required
                  value={form.outsideDhaka}
                  onChange={(event) =>
                    updateForm("outsideDhaka", event.target.value)
                  }
                  className={inputClass}
                />
              </Field>

              <Field
                label="COD fee (%)"
                hint="Default fee percentage for COD orders."
              >
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={form.codFee}
                  onChange={(event) => updateForm("codFee", event.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(event) => updateForm("status", event.target.value)}
                  className={inputClass}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Setup Required">Setup required</option>
                </select>
              </Field>
            </div>

            <Field label="Internal notes">
              <textarea
                rows={3}
                value={form.notes}
                onChange={(event) => updateForm("notes", event.target.value)}
                placeholder="Add any internal notes about this courier..."
                className={inputClass}
              />
            </Field>

            {form.type === "API Integration" && (
              <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                <ShieldCheck className="mt-0.5 shrink-0" size={17} />
                <p>
                  API credentials are not collected in this demo form. Add them
                  later through a protected server-side integration settings
                  endpoint. Never expose secret keys in client-side code.
                </p>
              </div>
            )}

            <div className="flex flex-col-reverse gap-2 border-t border-[#e2e4e7] pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-[#c3c4c7] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#2271b1] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#135e96]"
              >
                {editingCourier ? "Save changes" : "Add courier"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Courier Details Modal */}
      {selectedCourier && (
        <Modal
          title={selectedCourier.name}
          subtitle={`Courier ID: ${selectedCourier.id}`}
          onClose={() => setSelectedCourier(null)}
          wide
        >
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={selectedCourier.status} />
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                {selectedCourier.type}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                {selectedCourier.code}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  label: "Shipments",
                  value: selectedCourier.shipments.toLocaleString("en-BD"),
                },
                {
                  label: "Delivered",
                  value: selectedCourier.delivered.toLocaleString("en-BD"),
                },
                {
                  label: "Failed",
                  value: selectedCourier.failed.toLocaleString("en-BD"),
                },
                {
                  label: "Success rate",
                  value: selectedCourier.shipments
                    ? `${(
                        (selectedCourier.delivered /
                          selectedCourier.shipments) *
                        100
                      ).toFixed(1)}%`
                    : "—",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#e2e4e7] p-3"
                >
                  <p className="text-xs text-[#646970]">{item.label}</p>
                  <p className="mt-1 text-xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[#e2e4e7] p-4">
              <h3 className="mb-3 font-semibold">Contact and integration</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2.5">
                  <Phone size={17} className="mt-0.5 text-[#646970]" />
                  <div>
                    <p className="text-xs text-[#787c82]">Contact phone</p>
                    <p className="mt-1 text-sm font-medium">
                      {selectedCourier.contact || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail size={17} className="mt-0.5 text-[#646970]" />
                  <div className="min-w-0">
                    <p className="text-xs text-[#787c82]">Support email</p>
                    <p className="mt-1 break-all text-sm font-medium">
                      {selectedCourier.email || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin size={17} className="mt-0.5 text-[#646970]" />
                  <div>
                    <p className="text-xs text-[#787c82]">Coverage</p>
                    <p className="mt-1 text-sm font-medium">
                      {selectedCourier.coverage}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock3 size={17} className="mt-0.5 text-[#646970]" />
                  <div>
                    <p className="text-xs text-[#787c82]">Last sync</p>
                    <p className="mt-1 text-sm font-medium">
                      {selectedCourier.lastSync}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:col-span-2">
                  <Activity size={17} className="mt-0.5 text-[#646970]" />
                  <div>
                    <p className="text-xs text-[#787c82]">Connection status</p>
                    <div className="mt-1">
                      <ConnectionBadge connection={selectedCourier.connection} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#e2e4e7] p-4">
              <h3 className="mb-3 font-semibold">Delivery rates</h3>
              <div className="divide-y divide-[#f0f0f1]">
                <div className="flex items-center justify-between gap-3 py-3">
                  <span className="text-sm text-[#646970]">
                    Inside Dhaka
                  </span>
                  <span className="font-semibold">
                    {money(selectedCourier.insideDhaka)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 py-3">
                  <span className="text-sm text-[#646970]">
                    Outside Dhaka
                  </span>
                  <span className="font-semibold">
                    {money(selectedCourier.outsideDhaka)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 py-3">
                  <span className="text-sm text-[#646970]">COD fee</span>
                  <span className="font-semibold">
                    {selectedCourier.codFee}%
                  </span>
                </div>
              </div>
            </div>

            {selectedCourier.notes && (
              <div className="rounded-xl bg-[#f6f7f7] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#646970]">
                  Internal notes
                </p>
                <p className="mt-2 text-sm leading-6">
                  {selectedCourier.notes}
                </p>
              </div>
            )}

            <div className="flex flex-col-reverse gap-2 border-t border-[#e2e4e7] pt-4 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => toggleStatus(selectedCourier)}
                className="rounded-lg border border-[#c3c4c7] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
              >
                {selectedCourier.status === "Active"
                  ? "Deactivate courier"
                  : "Activate courier"}
              </button>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setSelectedCourier(null)}
                  className="rounded-lg border border-[#c3c4c7] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const courier = selectedCourier;
                    setSelectedCourier(null);
                    openEditModal(courier);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2271b1] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#135e96]"
                >
                  <Pencil size={15} />
                  Edit courier
                </button>
              </div>
            </div>
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
