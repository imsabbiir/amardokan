"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Download,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  TrendingUp,
  UserRound,
  Users,
  X,
} from "lucide-react";

const customers = [
  {
    id: "CUS-1001",
    name: "Nusrat Jahan",
    phone: "01712 345678",
    email: "nusrat@example.com",
    location: "Dhanmondi, Dhaka",
    orders: 18,
    delivered: 17,
    cancelled: 1,
    spent: 32400,
    lastOrder: "Oct 06, 2026",
    joined: "Jun 12, 2026",
    status: "Active",
  },
  {
    id: "CUS-1002",
    name: "Tanvir Hasan",
    phone: "01819 223344",
    email: "tanvir@example.com",
    location: "Mirpur, Dhaka",
    orders: 12,
    delivered: 11,
    cancelled: 1,
    spent: 21850,
    lastOrder: "Oct 06, 2026",
    joined: "Jul 03, 2026",
    status: "Active",
  },
  {
    id: "CUS-1003",
    name: "Sadia Rahman",
    phone: "01911 445566",
    email: "sadia@example.com",
    location: "Uttara, Dhaka",
    orders: 9,
    delivered: 8,
    cancelled: 1,
    spent: 16740,
    lastOrder: "Oct 05, 2026",
    joined: "Jul 21, 2026",
    status: "Active",
  },
  {
    id: "CUS-1004",
    name: "Rakib Ahmed",
    phone: "01612 778899",
    email: "rakib@example.com",
    location: "Chattogram",
    orders: 7,
    delivered: 5,
    cancelled: 2,
    spent: 11490,
    lastOrder: "Oct 04, 2026",
    joined: "Aug 10, 2026",
    status: "At Risk",
  },
  {
    id: "CUS-1005",
    name: "Ayesha Karim",
    phone: "01722 889900",
    email: "ayesha@example.com",
    location: "Banani, Dhaka",
    orders: 24,
    delivered: 24,
    cancelled: 0,
    spent: 48900,
    lastOrder: "Oct 04, 2026",
    joined: "May 18, 2026",
    status: "VIP",
  },
  {
    id: "CUS-1006",
    name: "Imran Hossain",
    phone: "01844 112233",
    email: "imran@example.com",
    location: "Gazipur",
    orders: 5,
    delivered: 5,
    cancelled: 0,
    spent: 8450,
    lastOrder: "Oct 03, 2026",
    joined: "Sep 02, 2026",
    status: "Active",
  },
  {
    id: "CUS-1007",
    name: "Farzana Akter",
    phone: "01922 334455",
    email: "farzana@example.com",
    location: "Sylhet",
    orders: 15,
    delivered: 14,
    cancelled: 1,
    spent: 27680,
    lastOrder: "Oct 02, 2026",
    joined: "Jun 28, 2026",
    status: "Active",
  },
  {
    id: "CUS-1008",
    name: "Mahmudul Hasan",
    phone: "01511 667788",
    email: "mahmud@example.com",
    location: "Narayanganj",
    orders: 3,
    delivered: 2,
    cancelled: 1,
    spent: 4280,
    lastOrder: "Sep 28, 2026",
    joined: "Sep 15, 2026",
    status: "At Risk",
  },
];

const districts = [
  "All locations",
  "Dhaka",
  "Chattogram",
  "Gazipur",
  "Sylhet",
  "Narayanganj",
];

function formatPrice(price) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function getLocationCity(location) {
  if (location.includes("Dhaka")) return "Dhaka";
  if (location.includes("Chattogram")) return "Chattogram";
  if (location.includes("Gazipur")) return "Gazipur";
  if (location.includes("Sylhet")) return "Sylhet";
  if (location.includes("Narayanganj")) return "Narayanganj";

  return location;
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function CustomerAvatar({ name, large = false }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-ac/10 font-bold text-ac ${
        large ? "h-12 w-12 text-sm" : "h-10 w-10 text-xs"
      }`}
    >
      {getInitials(name)}
    </div>
  );
}

function CustomerStatus({ status }) {
  const styles = {
    Active: "bg-emerald-500/10 text-emerald-600",
    VIP: "bg-ac/10 text-ac",
    "At Risk": "bg-amber-500/10 text-amber-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-bg2 text-mut"
      }`}
    >
      {status}
    </span>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  helper,
  trend,
}) {
  return (
    <div className="rounded-2xl border border-bd bg-bg p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg2">
          <Icon className="h-5 w-5 text-ac" />
        </div>

        {trend && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <TrendingUp className="h-3.5 w-3.5" />
            {trend}
          </span>
        )}
      </div>

      <p className="mt-5 text-sm text-mut">{label}</p>

      <p className="mt-1 text-2xl font-bold tracking-tight">
        {value}
      </p>

      {helper && (
        <p className="mt-1 text-xs text-mut">{helper}</p>
      )}
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-bg2">
        <Users className="h-5 w-5 text-mut" />
      </div>

      <h3 className="mt-4 text-base font-semibold">
        No customers found
      </h3>

      <p className="mx-auto mt-1 max-w-md text-sm text-mut">
        Try changing your search or filters to find customers.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-5 rounded-xl border border-bd px-4 py-2.5 text-sm font-semibold transition hover:bg-bg2"
      >
        Clear filters
      </button>
    </div>
  );
}

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [location, setLocation] = useState("All locations");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = customers.filter((customer) => {
      const matchesSearch =
        !query ||
        customer.name.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.id.toLowerCase().includes(query);

      const matchesStatus =
        status === "All" || customer.status === status;

      const matchesLocation =
        location === "All locations" ||
        getLocationCity(customer.location) === location;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesLocation
      );
    });

    return [...result].sort((a, b) => {
      if (sortBy === "spent") return b.spent - a.spent;
      if (sortBy === "orders") return b.orders - a.orders;
      if (sortBy === "name")
        return a.name.localeCompare(b.name);

      return b.orders - a.orders;
    });
  }, [search, status, location, sortBy]);

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const vipCustomers = customers.filter(
    (customer) => customer.status === "VIP"
  ).length;

  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.spent,
    0
  );

  const totalOrders = customers.reduce(
    (sum, customer) => sum + customer.orders,
    0
  );

  const averageOrderValue =
    totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const repeatCustomers = customers.filter(
    (customer) => customer.orders > 1
  ).length;

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setLocation("All locations");
    setSortBy("recent");
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-mut">
          <Link
            href="/dashboard"
            className="transition hover:text-fg"
          >
            Overview
          </Link>

          <span>/</span>

          <span className="text-fg">Customers</span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ac/15 text-ac">
                <Users className="h-5 w-5" />
              </div>

              <span className="text-sm font-semibold text-ac">
                Customer management
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Your customers
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-mut sm:text-base">
              Understand your customers, track their order history,
              and identify your most valuable buyers.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-bd bg-bg px-4 py-2.5 text-sm font-semibold transition hover:bg-bg2"
            >
              <Download className="h-4 w-4" />
              Export
            </button>

            <Link
              href="/dashboard/orders/create"
              className="inline-flex items-center gap-2 rounded-xl bg-ac px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
            >
              <Plus className="h-4 w-4" />
              Create order
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={Users}
            label="Total Customers"
            value={totalCustomers}
            helper={`${repeatCustomers} repeat customers`}
            trend="+12.4%"
          />

          <SummaryCard
            icon={UserRound}
            label="Active Customers"
            value={activeCustomers}
            helper={`${vipCustomers} VIP customers`}
          />

          <SummaryCard
            icon={ShoppingBag}
            label="Customer Revenue"
            value={formatPrice(totalRevenue)}
            helper={`${totalOrders} total orders`}
            trend="+8.7%"
          />

          <SummaryCard
            icon={TrendingUp}
            label="Average Order Value"
            value={formatPrice(Math.round(averageOrderValue))}
            helper="Across all customers"
          />
        </div>

        {/* Customer Insights */}
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-bd bg-bg p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-mut">
                  Repeat purchase rate
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {Math.round(
                    (repeatCustomers / totalCustomers) * 100
                  )}
                  %
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg2">
              <div
                className="h-full rounded-full bg-ac"
                style={{
                  width: `${Math.round(
                    (repeatCustomers / totalCustomers) * 100
                  )}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-mut">
              Customers who placed more than one order.
            </p>
          </div>

          <div className="rounded-2xl border border-bd bg-bg p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-mut">
                  Top customer
                </p>

                <p className="mt-2 text-lg font-bold">
                  Ayesha Karim
                </p>

                <p className="mt-1 text-xs text-mut">
                  24 orders · {formatPrice(48900)}
                </p>
              </div>

              <CustomerAvatar name="Ayesha Karim" />
            </div>

            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedCustomer(customers[4]);
              }}
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-ac hover:underline"
            >
              View customer
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-bd bg-bg p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-mut">
                  Customers needing attention
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {
                    customers.filter(
                      (customer) => customer.status === "At Risk"
                    ).length
                  }
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <UserRound className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-mut">
              These customers have higher cancellation rates or
              reduced recent activity.
            </p>
          </div>
        </div>

        {/* Customer Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-bd bg-bg">
          {/* Toolbar */}
          <div className="border-b border-bd p-4 sm:p-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative w-full xl:max-w-md">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, phone, email or customer ID..."
                  className="h-11 w-full rounded-xl border border-bd bg-bg2 pl-10 pr-4 text-sm outline-none transition placeholder:text-mut focus:border-ac"
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-bd bg-bg2 px-3.5 pr-9 text-sm font-medium outline-none focus:border-ac sm:w-36"
                  >
                    <option value="All">All customers</option>
                    <option value="Active">Active</option>
                    <option value="VIP">VIP</option>
                    <option value="At Risk">At Risk</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />
                </div>

                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-bd bg-bg2 px-3.5 pr-9 text-sm font-medium outline-none focus:border-ac sm:w-40"
                  >
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-11 w-full appearance-none rounded-xl border border-bd bg-bg2 px-3.5 pr-9 text-sm font-medium outline-none focus:border-ac sm:w-44"
                  >
                    <option value="recent">Most orders</option>
                    <option value="spent">Highest spending</option>
                    <option value="orders">Most purchases</option>
                    <option value="name">Name A–Z</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-mut">
                Showing{" "}
                <span className="font-semibold text-fg">
                  {filteredCustomers.length}
                </span>{" "}
                of {customers.length} customers
              </p>

              {(search ||
                status !== "All" ||
                location !== "All locations") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-ac hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden overflow-x-auto lg:block">
            {filteredCustomers.length > 0 ? (
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="border-b border-bd bg-bg2/50 text-left">
                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Contact
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Orders
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Total spent
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Last order
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Status
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold text-mut">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b border-bd last:border-0"
                    >
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedCustomer(customer)
                          }
                          className="flex items-center gap-3 text-left"
                        >
                          <CustomerAvatar
                            name={customer.name}
                          />

                          <div>
                            <p className="text-sm font-semibold transition hover:text-ac">
                              {customer.name}
                            </p>

                            <p className="mt-0.5 text-[11px] text-mut">
                              {customer.id}
                            </p>
                          </div>
                        </button>
                      </td>

                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          <p className="text-xs font-medium">
                            {customer.phone}
                          </p>

                          <p className="max-w-[180px] truncate text-xs text-mut">
                            {customer.email}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-semibold">
                            {customer.orders}
                          </p>

                          <p className="mt-0.5 text-[11px] text-mut">
                            {customer.delivered} delivered
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold">
                          {formatPrice(customer.spent)}
                        </p>

                        <p className="mt-0.5 text-[11px] text-mut">
                          Avg.{" "}
                          {formatPrice(
                            Math.round(
                              customer.spent /
                                customer.orders
                            )
                          )}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm">
                          {customer.lastOrder}
                        </p>

                        <p className="mt-0.5 text-[11px] text-mut">
                          {customer.location}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <CustomerStatus
                          status={customer.status}
                        />
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedCustomer(customer)
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-bd transition hover:bg-bg2"
                          aria-label={`Open ${customer.name}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <EmptyState onClear={clearFilters} />
            )}
          </div>

          {/* Mobile */}
          <div className="divide-y divide-bd lg:hidden">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCustomer(customer)
                      }
                      className="flex min-w-0 items-center gap-3 text-left"
                    >
                      <CustomerAvatar name={customer.name} />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {customer.name}
                        </p>

                        <p className="mt-0.5 text-xs text-mut">
                          {customer.id}
                        </p>
                      </div>
                    </button>

                    <CustomerStatus
                      status={customer.status}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    <div className="rounded-xl bg-bg2 p-3">
                      <p className="text-[11px] text-mut">
                        Orders
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {customer.orders}
                      </p>
                    </div>

                    <div className="rounded-xl bg-bg2 p-3">
                      <p className="text-[11px] text-mut">
                        Spent
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {formatPrice(customer.spent)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-bg2 p-3">
                      <p className="text-[11px] text-mut">
                        Delivered
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {customer.delivered}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-mut">
                      <Phone className="h-3.5 w-3.5" />
                      {customer.phone}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-mut">
                      <MapPin className="h-3.5 w-3.5" />
                      {customer.location}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-mut">
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Last order: {customer.lastOrder}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 border-t border-bd pt-4">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCustomer(customer)
                      }
                      className="flex-1 rounded-xl border border-bd py-2.5 text-xs font-semibold transition hover:bg-bg2"
                    >
                      View customer
                    </button>

                    <Link
                      href="/dashboard/orders/create"
                      className="flex flex-1 items-center justify-center rounded-xl bg-ac py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-[#7fb922]"
                    >
                      Create order
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState onClear={clearFilters} />
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 rounded-2xl border border-bd bg-bg2 p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-ac">
                <UserRound className="h-5 w-5" />

                <span className="text-sm font-semibold">
                  Grow customer relationships
                </span>
              </div>

              <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
                Turn one-time buyers into repeat customers
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-mut">
                Use customer order history and purchase patterns
                to understand who buys from your store and where
                your strongest relationships are.
              </p>
            </div>

            <Link
              href="/dashboard/analytics"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-bd bg-bg px-5 py-3 text-sm font-semibold transition hover:bg-bg2"
            >
              View analytics
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-5">
          <button
            type="button"
            aria-label="Close customer details"
            onClick={() => setSelectedCustomer(null)}
            className="absolute inset-0 cursor-default"
          />

          <div className="relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-3xl border border-bd bg-bg sm:max-w-xl sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-bd p-5">
              <div>
                <p className="text-xs font-semibold text-ac">
                  Customer profile
                </p>

                <h2 className="mt-1 text-lg font-bold">
                  {selectedCustomer.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-bd transition hover:bg-bg2"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <CustomerAvatar
                  name={selectedCustomer.name}
                  large
                />

                <div>
                  <h3 className="text-base font-bold">
                    {selectedCustomer.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-mut">
                    {selectedCustomer.id}
                  </p>

                  <div className="mt-2">
                    <CustomerStatus
                      status={selectedCustomer.status}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-bg2 p-4">
                  <p className="text-xs text-mut">Total orders</p>

                  <p className="mt-1 text-xl font-bold">
                    {selectedCustomer.orders}
                  </p>
                </div>

                <div className="rounded-xl bg-bg2 p-4">
                  <p className="text-xs text-mut">Total spent</p>

                  <p className="mt-1 text-xl font-bold">
                    {formatPrice(selectedCustomer.spent)}
                  </p>
                </div>

                <div className="rounded-xl bg-bg2 p-4">
                  <p className="text-xs text-mut">
                    Delivered orders
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {selectedCustomer.delivered}
                  </p>
                </div>

                <div className="rounded-xl bg-bg2 p-4">
                  <p className="text-xs text-mut">
                    Average order
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {formatPrice(
                      Math.round(
                        selectedCustomer.spent /
                          selectedCustomer.orders
                      )
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-bd p-4">
                <h3 className="text-sm font-semibold">
                  Contact information
                </h3>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg2">
                      <Phone className="h-4 w-4 text-mut" />
                    </div>

                    <div>
                      <p className="text-[11px] text-mut">
                        Phone
                      </p>

                      <p className="text-sm font-medium">
                        {selectedCustomer.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg2">
                      <Mail className="h-4 w-4 text-mut" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] text-mut">
                        Email
                      </p>

                      <p className="truncate text-sm font-medium">
                        {selectedCustomer.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg2">
                      <MapPin className="h-4 w-4 text-mut" />
                    </div>

                    <div>
                      <p className="text-[11px] text-mut">
                        Location
                      </p>

                      <p className="text-sm font-medium">
                        {selectedCustomer.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href="/dashboard/orders"
                  className="flex flex-1 items-center justify-center rounded-xl border border-bd px-4 py-3 text-sm font-semibold transition hover:bg-bg2"
                >
                  View orders
                </Link>

                <Link
                  href="/dashboard/orders/create"
                  className="flex flex-1 items-center justify-center rounded-xl bg-ac px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
                >
                  Create order
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}