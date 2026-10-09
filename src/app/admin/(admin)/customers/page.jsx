
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  ShoppingBag,
  Wallet,
  Eye,
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  Package,
  Receipt,
  ShieldCheck,
  Filter,
} from "lucide-react";

const initialCustomers = [
  {
    id: "CUS-1008",
    name: "Rahim Uddin",
    email: "rahim@example.com",
    phone: "01712-345678",
    city: "Dhaka",
    address: "Mirpur, Dhaka",
    joinedAt: "2026-08-12",
    status: "Active",
    orders: 12,
    spent: 28450,
    lastOrder: "2026-10-09",
    lastOrderId: "ORD-2026-1082",
    paymentMethod: "bKash",
    orderHistory: [
      { id: "ORD-2026-1082", date: "2026-10-09", amount: 2450, status: "Processing" },
      { id: "ORD-2026-1041", date: "2026-10-01", amount: 1850, status: "Delivered" },
      { id: "ORD-2026-0992", date: "2026-09-22", amount: 3200, status: "Delivered" },
    ],
  },
  {
    id: "CUS-1007",
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    phone: "01819-234567",
    city: "Chattogram",
    address: "Panchlaish, Chattogram",
    joinedAt: "2026-07-28",
    status: "Active",
    orders: 8,
    spent: 19600,
    lastOrder: "2026-10-08",
    lastOrderId: "ORD-2026-1081",
    paymentMethod: "Nagad",
    orderHistory: [
      { id: "ORD-2026-1081", date: "2026-10-08", amount: 1850, status: "Processing" },
      { id: "ORD-2026-1014", date: "2026-09-28", amount: 2600, status: "Delivered" },
    ],
  },
  {
    id: "CUS-1006",
    name: "Sabbir Ahmed",
    email: "sabbir@example.com",
    phone: "01911-876543",
    city: "Narayanganj",
    address: "Rupganj, Narayanganj",
    joinedAt: "2026-06-15",
    status: "Active",
    orders: 15,
    spent: 42600,
    lastOrder: "2026-10-09",
    lastOrderId: "ORD-2026-1080",
    paymentMethod: "Cash on Delivery",
    orderHistory: [
      { id: "ORD-2026-1080", date: "2026-10-09", amount: 3200, status: "Processing" },
      { id: "ORD-2026-1020", date: "2026-09-30", amount: 4900, status: "Delivered" },
    ],
  },
  {
    id: "CUS-1005",
    name: "Farzana Akter",
    email: "farzana@example.com",
    phone: "01622-456789",
    city: "Sylhet",
    address: "Zindabazar, Sylhet",
    joinedAt: "2026-05-03",
    status: "Inactive",
    orders: 3,
    spent: 6200,
    lastOrder: "2026-07-15",
    lastOrderId: "ORD-2026-0844",
    paymentMethod: "SSLCommerz",
    orderHistory: [
      { id: "ORD-2026-0844", date: "2026-07-15", amount: 1500, status: "Delivered" },
    ],
  },
  {
    id: "CUS-1004",
    name: "Tanvir Hasan",
    email: "tanvir@example.com",
    phone: "01733-987654",
    city: "Dhaka",
    address: "Uttara, Dhaka",
    joinedAt: "2026-04-21",
    status: "Active",
    orders: 21,
    spent: 58400,
    lastOrder: "2026-10-07",
    lastOrderId: "ORD-2026-1078",
    paymentMethod: "bKash",
    orderHistory: [
      { id: "ORD-2026-1078", date: "2026-10-07", amount: 1250, status: "Delivered" },
      { id: "ORD-2026-1030", date: "2026-10-02", amount: 3400, status: "Delivered" },
    ],
  },
  {
    id: "CUS-1003",
    name: "Mim Sultana",
    email: "mim@example.com",
    phone: "01844-112233",
    city: "Rajshahi",
    address: "Boalia, Rajshahi",
    joinedAt: "2026-09-01",
    status: "Active",
    orders: 5,
    spent: 11450,
    lastOrder: "2026-10-08",
    lastOrderId: "ORD-2026-1077",
    paymentMethod: "Nagad",
    orderHistory: [
      { id: "ORD-2026-1077", date: "2026-10-08", amount: 2750, status: "Delivered" },
    ],
  },
  {
    id: "CUS-1002",
    name: "Imran Hossain",
    email: "imran@example.com",
    phone: "01955-667788",
    city: "Khulna",
    address: "Sonadanga, Khulna",
    joinedAt: "2026-09-14",
    status: "Inactive",
    orders: 1,
    spent: 5600,
    lastOrder: "2026-09-15",
    lastOrderId: "ORD-2026-1076",
    paymentMethod: "SSLCommerz",
    orderHistory: [
      { id: "ORD-2026-1076", date: "2026-09-15", amount: 5600, status: "Cancelled" },
    ],
  },
  {
    id: "CUS-1001",
    name: "Sadia Islam",
    email: "sadia@example.com",
    phone: "01766-998877",
    city: "Dhaka",
    address: "Dhanmondi, Dhaka",
    joinedAt: "2026-03-19",
    status: "Active",
    orders: 9,
    spent: 22300,
    lastOrder: "2026-10-07",
    lastOrderId: "ORD-2026-1075",
    paymentMethod: "Cash on Delivery",
    orderHistory: [
      { id: "ORD-2026-1075", date: "2026-10-07", amount: 980, status: "Delivered" },
      { id: "ORD-2026-1001", date: "2026-09-26", amount: 2200, status: "Delivered" },
    ],
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        status === "Active"
          ? "bg-green-50 text-green-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#646970]">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
          <p className="mt-2 text-xs text-[#646970]">{subtitle}</p>
        </div>
        <div className={`rounded-lg p-2.5 ${color}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function downloadCSV(customers) {
  const headers = [
    "Customer ID",
    "Name",
    "Email",
    "Phone",
    "City",
    "Status",
    "Orders",
    "Total Spent",
    "Joined At",
    "Last Order",
  ];

  const escapeCSV = (value) =>
    `"${String(value ?? "").replace(/"/g, '""')}"`;

  const csv = [
    headers.join(","),
    ...customers.map((c) =>
      [
        c.id,
        c.name,
        c.email,
        c.phone,
        c.city,
        c.status,
        c.orders,
        c.spent,
        c.joinedAt,
        c.lastOrder,
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
  link.download = "amardokan-customers.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const stats = useMemo(() => {
    const active = customers.filter((c) => c.status === "Active");
    const inactive = customers.filter((c) => c.status === "Inactive");

    return {
      total: customers.length,
      active: active.length,
      inactive: inactive.length,
      orders: customers.reduce((sum, c) => sum + c.orders, 0),
      spent: customers.reduce((sum, c) => sum + c.spent, 0),
    };
  }, [customers]);

  const cities = useMemo(
    () => [...new Set(customers.map((c) => c.city))].sort(),
    [customers],
  );

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        !query ||
        [
          customer.id,
          customer.name,
          customer.email,
          customer.phone,
          customer.city,
        ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;
      const matchesCity =
        cityFilter === "All" || customer.city === cityFilter;

      return matchesSearch && matchesStatus && matchesCity;
    });
  }, [customers, search, statusFilter, cityFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / pageSize),
  );
  const safePage = Math.min(page, totalPages);
  const pageItems = filteredCustomers.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  const changeFilter = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const toggleCustomerStatus = (customer) => {
    const updated = {
      ...customer,
      status: customer.status === "Active" ? "Inactive" : "Active",
    };

    setCustomers((current) =>
      current.map((c) => (c.id === customer.id ? updated : c)),
    );
    setSelectedCustomer(updated);
  };

  return (
    <div className="min-h-screen space-y-6 bg-[#f6f7f7] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-[#646970]">
            <span>Admin</span>
            <span>/</span>
            <span>Customers</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Customers
          </h1>
          <p className="mt-1 text-sm text-[#646970]">
            View customer profiles, order activity, and spending history.
          </p>
        </div>

        <button
          onClick={() => downloadCSV(filteredCustomers)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#dcdcde] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <ShieldCheck size={19} className="mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold">Customer management demo</p>
          <p className="mt-1 leading-5 text-blue-800">
            This page uses sample customer data. Status changes are temporary
            and do not update your MongoDB database.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total customers"
          value={stats.total}
          subtitle="Customers in this demo"
          icon={Users}
          color="bg-blue-50 text-blue-700"
        />
        <StatCard
          title="Active customers"
          value={stats.active}
          subtitle="Currently marked active"
          icon={UserCheck}
          color="bg-green-50 text-green-700"
        />
        <StatCard
          title="Inactive customers"
          value={stats.inactive}
          subtitle="Currently marked inactive"
          icon={UserX}
          color="bg-gray-100 text-gray-700"
        />
        <StatCard
          title="Total customer spending"
          value={money(stats.spent)}
          subtitle={`${stats.orders} lifetime orders in sample data`}
          icon={Wallet}
          color="bg-purple-50 text-purple-700"
        />
      </div>

      {/* Customer list */}
      <section className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-[#dcdcde] p-4 sm:p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-base font-bold">All customers</h2>
            <p className="mt-1 text-sm text-[#646970]">
              {filteredCustomers.length} customer
              {filteredCustomers.length === 1 ? "" : "s"} found
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
                placeholder="Search name, email, phone..."
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={cityFilter}
              onChange={(e) => changeFilter(setCityFilter)(e.target.value)}
              className="rounded-lg border border-[#dcdcde] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
            >
              <option value="All">All cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-250 text-left text-sm">
            <thead className="bg-[#f6f7f7] text-xs uppercase tracking-wide text-[#646970]">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Customer</th>
                <th className="px-5 py-3.5 font-semibold">Contact</th>
                <th className="px-5 py-3.5 font-semibold">Orders</th>
                <th className="px-5 py-3.5 font-semibold">Total spent</th>
                <th className="px-5 py-3.5 font-semibold">Last order</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f0f0f1]">
              {pageItems.map((customer) => (
                <tr key={customer.id} className="transition hover:bg-[#f9f9f9]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f5d3] text-sm font-bold text-[#42651b]">
                        {customer.name
                          .split(" ")
                          .map((word) => word[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold">{customer.name}</p>
                        <p className="mt-1 text-xs text-[#646970]">
                          {customer.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p>{customer.email}</p>
                    <p className="mt-1 text-xs text-[#646970]">
                      {customer.phone}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <ShoppingBag size={15} className="text-[#646970]" />
                      {customer.orders}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {money(customer.spent)}
                  </td>

                  <td className="px-5 py-4 text-xs text-[#646970]">
                    {formatDate(customer.lastOrder)}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={customer.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#dcdcde] px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <Users
                      size={30}
                      className="mx-auto mb-3 text-[#a7aaad]"
                    />
                    <p className="font-semibold">No customers found</p>
                    <p className="mt-1 text-sm text-[#646970]">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-[#f0f0f1] md:hidden">
          {pageItems.map((customer) => (
            <div key={customer.id} className="space-y-3 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f5d3] text-sm font-bold text-[#42651b]">
                  {customer.name
                    .split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{customer.name}</p>
                    <StatusBadge status={customer.status} />
                  </div>
                  <p className="mt-1 text-xs text-[#646970]">
                    {customer.id} · {customer.city}
                  </p>
                  <p className="mt-1 break-all text-sm">{customer.email}</p>
                  <p className="mt-1 text-sm text-[#646970]">
                    {customer.phone}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-lg bg-[#f6f7f7] p-3">
                <div>
                  <p className="text-xs text-[#646970]">Orders</p>
                  <p className="mt-1 font-semibold">{customer.orders}</p>
                </div>
                <div>
                  <p className="text-xs text-[#646970]">Total spent</p>
                  <p className="mt-1 font-bold">{money(customer.spent)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-[#646970]">
                  Last order: {formatDate(customer.lastOrder)}
                </p>
                <button
                  onClick={() => setSelectedCustomer(customer)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#dcdcde] px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                >
                  <Eye size={14} />
                  View details
                </button>
              </div>
            </div>
          ))}

          {pageItems.length === 0 && (
            <div className="px-5 py-16 text-center">
              <Users size={30} className="mx-auto mb-3 text-[#a7aaad]" />
              <p className="font-semibold">No customers found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col justify-between gap-3 border-t border-[#dcdcde] px-4 py-4 sm:flex-row sm:items-center sm:px-5">
          <p className="text-sm text-[#646970]">
            {filteredCustomers.length === 0
              ? "Showing 0 customers"
              : `Showing ${(safePage - 1) * pageSize + 1}–${Math.min(
                  safePage * pageSize,
                  filteredCustomers.length,
                )} of ${filteredCustomers.length} customers`}
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-[#dcdcde] px-3 py-2 text-sm disabled:opacity-40"
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
              className="inline-flex items-center gap-1 rounded-lg border border-[#dcdcde] px-3 py-2 text-sm disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Customer details modal */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-modal-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#dcdcde] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8f5d3] font-bold text-[#42651b]">
                  {selectedCustomer.name
                    .split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <h2 id="customer-modal-title" className="text-xl font-bold">
                    {selectedCustomer.name}
                  </h2>
                  <p className="mt-1 text-sm text-[#646970]">
                    {selectedCustomer.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                aria-label="Close customer details"
                className="rounded-lg p-2 hover:bg-[#f0f0f1]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <StatusBadge status={selectedCustomer.status} />
                <button
                  onClick={() => toggleCustomerStatus(selectedCustomer)}
                  className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                    selectedCustomer.status === "Active"
                      ? "border-red-200 text-red-700 hover:bg-red-50"
                      : "border-green-200 text-green-700 hover:bg-green-50"
                  }`}
                >
                  {selectedCustomer.status === "Active"
                    ? "Mark inactive"
                    : "Mark active"}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-[#dcdcde] p-4">
                  <ShoppingBag size={18} className="text-[#646970]" />
                  <p className="mt-3 text-xs text-[#646970]">Total orders</p>
                  <p className="mt-1 text-xl font-bold">
                    {selectedCustomer.orders}
                  </p>
                </div>
                <div className="rounded-xl border border-[#dcdcde] p-4">
                  <Wallet size={18} className="text-[#646970]" />
                  <p className="mt-3 text-xs text-[#646970]">Total spent</p>
                  <p className="mt-1 text-xl font-bold">
                    {money(selectedCustomer.spent)}
                  </p>
                </div>
                <div className="rounded-xl border border-[#dcdcde] p-4">
                  <CalendarDays size={18} className="text-[#646970]" />
                  <p className="mt-3 text-xs text-[#646970]">Joined</p>
                  <p className="mt-1 text-sm font-bold">
                    {formatDate(selectedCustomer.joinedAt)}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-bold">Contact information</h3>
                <div className="space-y-3 rounded-xl border border-[#dcdcde] p-4">
                  <div className="flex items-start gap-3">
                    <Mail size={17} className="mt-0.5 text-[#646970]" />
                    <span className="break-all text-sm">
                      {selectedCustomer.email}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={17} className="mt-0.5 text-[#646970]" />
                    <span className="text-sm">{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={17} className="mt-0.5 text-[#646970]" />
                    <div className="text-sm">
                      <p>{selectedCustomer.address}</p>
                      <p className="mt-1 text-[#646970]">
                        {selectedCustomer.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-bold">Recent orders</h3>
                <div className="overflow-hidden rounded-xl border border-[#dcdcde]">
                  {selectedCustomer.orderHistory.length > 0 ? (
                    selectedCustomer.orderHistory.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col gap-2 border-b border-[#f0f0f1] p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-semibold text-[#2271b1]">
                            {order.id}
                          </p>
                          <p className="mt-1 text-xs text-[#646970]">
                            {formatDate(order.date)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                          <span className="text-sm font-semibold">
                            {money(order.amount)}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              order.status === "Delivered"
                                ? "bg-green-50 text-green-700"
                                : order.status === "Cancelled"
                                  ? "bg-red-50 text-red-700"
                                  : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-sm text-[#646970]">
                      No order history available.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                Customer status changes in this demo are temporary. In
                production, persist them through a protected server action
                and keep an audit record.
              </div>
            </div>

            <div className="flex justify-end border-t border-[#dcdcde] p-4 sm:px-6">
              <button
                onClick={() => setSelectedCustomer(null)}
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
