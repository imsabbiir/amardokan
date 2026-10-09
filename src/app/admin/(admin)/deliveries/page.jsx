
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Truck,
  Package,
  Clock,
  CheckCircle2,
  MapPin,
  Phone,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  SlidersHorizontal,
  ArrowUpRight,
  RotateCcw,
  UserRound,
  CalendarDays,
  ExternalLink,
} from "lucide-react";

const initialDeliveries = [
  {
    id: "SHP-2048",
    orderId: "ORD-1048",
    customer: "Rahim Uddin",
    phone: "01712345678",
    address: "Bashundhara R/A, Dhaka",
    product: "Premium Cotton T-Shirt",
    courier: "Pathao Courier",
    tracking: "PTH-784512",
    status: "Pending Pickup",
    charge: 80,
    date: "2026-10-09",
    payment: "COD",
  },
  {
    id: "SHP-2047",
    orderId: "ORD-1047",
    customer: "Nusrat Jahan",
    phone: "01812345678",
    address: "Mirpur 10, Dhaka",
    product: "Wireless Bluetooth Earbuds",
    courier: "Steadfast",
    tracking: "STF-625184",
    status: "Picked Up",
    charge: 80,
    date: "2026-10-09",
    payment: "COD",
  },
  {
    id: "SHP-2046",
    orderId: "ORD-1046",
    customer: "Tanvir Ahmed",
    phone: "01912345678",
    address: "Agrabad, Chattogram",
    product: "Canvas Tote Bag × 3",
    courier: "RedX",
    tracking: "RDX-894215",
    status: "In Transit",
    charge: 120,
    date: "2026-10-08",
    payment: "Paid",
  },
  {
    id: "SHP-2045",
    orderId: "ORD-1045",
    customer: "Sadia Islam",
    phone: "01612345678",
    address: "Uttara, Dhaka",
    product: "Portable LED Desk Lamp",
    courier: "Pathao Courier",
    tracking: "PTH-315849",
    status: "Delivered",
    charge: 80,
    date: "2026-10-08",
    payment: "Paid",
  },
  {
    id: "SHP-2044",
    orderId: "ORD-1044",
    customer: "Imran Hossain",
    phone: "01512345678",
    address: "Narayanganj Sadar",
    product: "Wireless Bluetooth Mouse",
    courier: "Steadfast",
    tracking: "STF-482156",
    status: "Delivery Failed",
    charge: 80,
    date: "2026-10-08",
    payment: "COD",
  },
  {
    id: "SHP-2043",
    orderId: "ORD-1043",
    customer: "Mim Akter",
    phone: "01312345678",
    address: "Gazipur Sadar",
    product: "Premium Cotton T-Shirt",
    courier: "RedX",
    tracking: "RDX-145862",
    status: "Pending Pickup",
    charge: 80,
    date: "2026-10-07",
    payment: "COD",
  },
  {
    id: "SHP-2042",
    orderId: "ORD-1042",
    customer: "Hasan Mahmud",
    phone: "01412345678",
    address: "Dhanmondi, Dhaka",
    product: "Ceramic Coffee Mug × 2",
    courier: "Pathao Courier",
    tracking: "PTH-541287",
    status: "Returned",
    charge: 80,
    date: "2026-10-07",
    payment: "Paid",
  },
];

const deliveryStatuses = [
  "Pending Pickup",
  "Picked Up",
  "In Transit",
  "Delivered",
  "Delivery Failed",
  "Returned",
];

const statusStyles = {
  "Pending Pickup": "bg-amber-50 text-amber-700 border-amber-200",
  "Picked Up": "bg-blue-50 text-blue-700 border-blue-200",
  "In Transit": "bg-violet-50 text-violet-700 border-violet-200",
  Delivered: "bg-green-50 text-green-700 border-green-200",
  "Delivery Failed": "bg-red-50 text-red-700 border-red-200",
  Returned: "bg-gray-100 text-gray-700 border-gray-200",
};

function StatCard({ title, value, note, icon: Icon, tone }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#646970]">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight">
            {value}
          </h3>
          <p className="mt-1 text-xs text-[#646970]">{note}</p>
        </div>
        <div className={`rounded-lg p-2.5 ${tones[tone]}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [courierFilter, setCourierFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");
  const [editingCourier, setEditingCourier] = useState("");
  const [editingTracking, setEditingTracking] = useState("");
  const [editingCharge, setEditingCharge] = useState("");
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("");

  const pageSize = 6;

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    return deliveries.filter((item) => {
      const matchesSearch =
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.orderId.toLowerCase().includes(query) ||
        item.customer.toLowerCase().includes(query) ||
        item.phone.includes(query) ||
        item.tracking.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesCourier =
        courierFilter === "All" || item.courier === courierFilter;

      return matchesSearch && matchesStatus && matchesCourier;
    });
  }, [deliveries, search, statusFilter, courierFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const pending = deliveries.filter(
    (item) => item.status === "Pending Pickup"
  ).length;
  const transit = deliveries.filter((item) =>
    ["Picked Up", "In Transit"].includes(item.status)
  ).length;
  const delivered = deliveries.filter(
    (item) => item.status === "Delivered"
  ).length;
  const failed = deliveries.filter((item) =>
    ["Delivery Failed", "Returned"].includes(item.status)
  ).length;

  function openDetails(item) {
    setSelected(item);
    setEditingStatus(item.status);
    setEditingCourier(item.courier);
    setEditingTracking(item.tracking);
    setEditingCharge(String(item.charge));
  }

  function saveDetails() {
    if (!selected) return;

    const charge = Number(editingCharge);

    if (!Number.isFinite(charge) || charge < 0) {
      setNotice("Enter a valid delivery charge.");
      return;
    }

    if (!editingCourier.trim() || !editingTracking.trim()) {
      setNotice("Courier and tracking number are required.");
      return;
    }

    setDeliveries((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              status: editingStatus,
              courier: editingCourier,
              tracking: editingTracking.trim(),
              charge,
            }
          : item
      )
    );

    setSelected(null);
    setNotice(`Shipment ${selected.id} updated successfully.`);
  }

  function exportCsv() {
    const headers = [
      "Shipment ID",
      "Order ID",
      "Customer",
      "Phone",
      "Address",
      "Product",
      "Courier",
      "Tracking Number",
      "Status",
      "Delivery Charge",
      "Payment",
      "Date",
    ];

    const escapeCsv = (value) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const rows = filtered.map((item) => [
      item.id,
      item.orderId,
      item.customer,
      item.phone,
      item.address,
      item.product,
      item.courier,
      item.tracking,
      item.status,
      item.charge,
      item.payment,
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
    link.download = "amardokan-deliveries.csv";
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
              Admin / <span className="text-[#2271b1]">Deliveries</span>
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Deliveries
            </h1>
            <p className="mt-1 text-sm text-[#646970]">
              Manage shipments, courier assignments, and delivery progress.
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
          <div className="flex items-center justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            <span>{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Dismiss">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Pending pickup"
            value={pending}
            note="Awaiting courier collection"
            icon={Clock}
            tone="amber"
          />
          <StatCard
            title="In transit"
            value={transit}
            note="Shipments on the way"
            icon={Truck}
            tone="blue"
          />
          <StatCard
            title="Delivered"
            value={delivered}
            note="Successfully completed"
            icon={CheckCircle2}
            tone="green"
          />
          <StatCard
            title="Failed / returned"
            value={failed}
            note="Requires follow-up"
            icon={RotateCcw}
            tone="red"
          />
        </div>

        {/* Main panel */}
        <div className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
          <div className="border-b border-[#dcdcde] p-4 sm:p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-base font-bold">Shipment management</h2>
                <p className="mt-1 text-sm text-[#646970]">
                  {filtered.length} shipments found
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
                    placeholder="Search shipment, order, customer..."
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
              <div className="mt-4 grid grid-cols-1 gap-3 rounded-lg bg-[#f6f7f7] p-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#646970]">
                    Delivery status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm"
                  >
                    <option value="All">All statuses</option>
                    {deliveryStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#646970]">
                    Courier
                  </label>
                  <select
                    value={courierFilter}
                    onChange={(e) => {
                      setCourierFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm"
                  >
                    <option value="All">All couriers</option>
                    <option value="Pathao Courier">Pathao Courier</option>
                    <option value="Steadfast">Steadfast</option>
                    <option value="RedX">RedX</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                    setCourierFilter("All");
                    setPage(1);
                  }}
                  className="text-left text-sm font-semibold text-[#2271b1] hover:underline sm:col-span-2"
                >
                  Clear filters
                </button>
              </div>
            )}

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {[
                "All",
                "Pending Pickup",
                "Picked Up",
                "In Transit",
                "Delivered",
                "Delivery Failed",
                "Returned",
              ].map((status) => {
                const count =
                  status === "All"
                    ? deliveries.length
                    : deliveries.filter((item) => item.status === status)
                        .length;

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
                    {status === "All" ? "All shipments" : status}
                    <span>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-250 text-left text-sm">
              <thead className="bg-[#f6f7f7] text-xs uppercase tracking-wide text-[#646970]">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Shipment</th>
                  <th className="px-4 py-3.5 font-semibold">Customer</th>
                  <th className="px-4 py-3.5 font-semibold">Courier / tracking</th>
                  <th className="px-4 py-3.5 font-semibold">Delivery charge</th>
                  <th className="px-4 py-3.5 font-semibold">Status</th>
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
                      <p className="mt-1 flex max-w-48 items-center gap-1 truncate text-xs text-[#646970]">
                        <MapPin size={12} className="shrink-0" />
                        {item.address}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-medium">{item.courier}</p>
                      <p className="mt-1 font-mono text-xs text-[#646970]">
                        {item.tracking}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-semibold">৳{item.charge}</p>
                      <p className="mt-1 text-xs text-[#646970]">
                        {item.payment}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                      >
                        {item.status}
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
                          onClick={() => openDetails(item)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#c3c4c7] px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                        >
                          <Eye size={14} />
                          Manage
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {pageItems.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <Truck size={32} className="mx-auto text-[#a7aaad]" />
                      <p className="mt-3 font-semibold">No shipments found</p>
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
          <div className="flex flex-col gap-3 border-t border-[#dcdcde] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-[#646970]">
              Showing {filtered.length ? start + 1 : 0}–
              {Math.min(start + pageSize, filtered.length)} of {filtered.length}{" "}
              shipments
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
                onClick={() =>
                  setPage((p) => Math.min(totalPages, p + 1))
                }
                className="rounded-lg border border-[#dcdcde] p-2 hover:bg-gray-50 disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Shipment management modal */}
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
              aria-labelledby="shipment-modal-title"
              className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-[#dcdcde] bg-white shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-[#dcdcde] p-5">
                <div>
                  <p className="text-xs font-medium text-[#646970]">
                    Shipment management
                  </p>
                  <h2
                    id="shipment-modal-title"
                    className="mt-1 text-xl font-bold"
                  >
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
                    <div className="min-w-0">
                      <p className="font-semibold">{selected.product}</p>
                      <p className="mt-1 text-sm text-[#646970]">
                        {selected.customer}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-sm text-[#646970]">
                        <Phone size={14} />
                        {selected.phone}
                      </p>
                      <p className="mt-2 flex items-start gap-2 text-sm text-[#646970]">
                        <MapPin size={14} className="mt-0.5 shrink-0" />
                        {selected.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Delivery status
                  </label>
                  <select
                    value={editingStatus}
                    onChange={(e) => setEditingStatus(e.target.value)}
                    className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                  >
                    {deliveryStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Courier
                  </label>
                  <select
                    value={editingCourier}
                    onChange={(e) => setEditingCourier(e.target.value)}
                    className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                  >
                    <option value="Pathao Courier">Pathao Courier</option>
                    <option value="Steadfast">Steadfast</option>
                    <option value="RedX">RedX</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Tracking number
                  </label>
                  <input
                    value={editingTracking}
                    onChange={(e) => setEditingTracking(e.target.value)}
                    placeholder="Enter tracking number"
                    className="w-full rounded-lg border border-[#c3c4c7] px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Delivery charge (৳)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={editingCharge}
                    onChange={(e) => setEditingCharge(e.target.value)}
                    className="w-full rounded-lg border border-[#c3c4c7] px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                  />
                </div>

                <div className="flex justify-end gap-2 border-t border-[#dcdcde] pt-4">
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-lg border border-[#c3c4c7] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveDetails}
                    className="rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-semibold hover:bg-[#91ca38]"
                  >
                    Save changes
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
