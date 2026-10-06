"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  ExternalLink,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Search,
  Truck,
  XCircle,
} from "lucide-react";

const deliveries = [
  {
    id: "DEL-10482",
    orderId: "AM-10482",
    customer: "Nusrat Jahan",
    phone: "01712 345678",
    location: "Dhanmondi, Dhaka",
    courier: "Pathao Courier",
    tracking: "PT-88219402",
    status: "Delivered",
    date: "Oct 06, 2026",
    eta: "Delivered today",
    amount: 3610,
    updated: "3:42 PM",
  },
  {
    id: "DEL-10471",
    orderId: "AM-10471",
    customer: "Tanvir Hasan",
    phone: "01819 223344",
    location: "Mirpur, Dhaka",
    courier: "Steadfast",
    tracking: "ST-72190482",
    status: "Out for Delivery",
    date: "Oct 06, 2026",
    eta: "Today, by 8 PM",
    amount: 1610,
    updated: "1:18 PM",
  },
  {
    id: "DEL-10452",
    orderId: "AM-10452",
    customer: "Sadia Rahman",
    phone: "01911 445566",
    location: "Uttara, Dhaka",
    courier: "Pathao Courier",
    tracking: "PT-88219341",
    status: "In Transit",
    date: "Oct 05, 2026",
    eta: "Oct 07",
    amount: 2010,
    updated: "12:40 PM",
  },
  {
    id: "DEL-10421",
    orderId: "AM-10421",
    customer: "Rakib Ahmed",
    phone: "01612 778899",
    location: "Chattogram",
    courier: "RedX",
    tracking: "RX-55192038",
    status: "Delivery Failed",
    date: "Oct 05, 2026",
    eta: "Action required",
    amount: 2700,
    updated: "11:20 AM",
  },
  {
    id: "DEL-10398",
    orderId: "AM-10398",
    customer: "Ayesha Karim",
    phone: "01722 889900",
    location: "Banani, Dhaka",
    courier: "Steadfast",
    tracking: "ST-72188120",
    status: "Delivered",
    date: "Oct 04, 2026",
    eta: "Delivered",
    amount: 3910,
    updated: "6:42 PM",
  },
  {
    id: "DEL-10384",
    orderId: "AM-10384",
    customer: "Imran Hossain",
    phone: "01844 112233",
    location: "Gazipur",
    courier: "Pathao Courier",
    tracking: "PT-88218420",
    status: "In Transit",
    date: "Oct 04, 2026",
    eta: "Oct 07",
    amount: 2310,
    updated: "10:12 AM",
  },
  {
    id: "DEL-10371",
    orderId: "AM-10371",
    customer: "Farzana Akter",
    phone: "01922 334455",
    location: "Sylhet",
    courier: "RedX",
    tracking: "RX-55190442",
    status: "Delivered",
    date: "Oct 03, 2026",
    eta: "Delivered",
    amount: 3110,
    updated: "4:28 PM",
  },
  {
    id: "DEL-10352",
    orderId: "AM-10352",
    customer: "Mahmudul Hasan",
    phone: "01511 667788",
    location: "Narayanganj",
    courier: "Steadfast",
    tracking: "ST-72186430",
    status: "Pending Pickup",
    date: "Oct 02, 2026",
    eta: "Pickup pending",
    amount: 1410,
    updated: "9:20 AM",
  },
  {
    id: "DEL-10341",
    orderId: "AM-10341",
    customer: "Samiha Rahman",
    phone: "01733 556677",
    location: "Mohammadpur, Dhaka",
    courier: "Pathao Courier",
    tracking: "PT-88217421",
    status: "In Transit",
    date: "Oct 02, 2026",
    eta: "Oct 06",
    amount: 2890,
    updated: "5:10 PM",
  },
  {
    id: "DEL-10320",
    orderId: "AM-10320",
    customer: "Arif Hossain",
    phone: "01855 778899",
    location: "Khulna",
    courier: "RedX",
    tracking: "RX-55189212",
    status: "Returned",
    date: "Oct 01, 2026",
    eta: "Returned to warehouse",
    amount: 1850,
    updated: "2:44 PM",
  },
];

const courierStats = [
  {
    name: "Pathao Courier",
    deliveries: 248,
    delivered: 236,
    success: 95.2,
    avgTime: "2.1 days",
  },
  {
    name: "Steadfast",
    deliveries: 214,
    delivered: 202,
    success: 94.4,
    avgTime: "2.3 days",
  },
  {
    name: "RedX",
    deliveries: 176,
    delivered: 160,
    success: 90.9,
    avgTime: "2.6 days",
  },
];

function formatPrice(price) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function StatusBadge({ status }) {
  const config = {
    Delivered: {
      className: "bg-emerald-500/10 text-emerald-600",
      icon: CheckCircle2,
    },
    "Out for Delivery": {
      className: "bg-sky-500/10 text-sky-600",
      icon: Truck,
    },
    "In Transit": {
      className: "bg-violet-500/10 text-violet-600",
      icon: Truck,
    },
    "Pending Pickup": {
      className: "bg-amber-500/10 text-amber-600",
      icon: Clock3,
    },
    "Delivery Failed": {
      className: "bg-red-500/10 text-red-600",
      icon: XCircle,
    },
    Returned: {
      className: "bg-orange-500/10 text-orange-600",
      icon: RefreshCw,
    },
  };

  const item = config[status] || {
    className: "bg-bg2 text-mut",
    icon: Package,
  };

  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${item.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
  tone = "default",
}) {
  const tones = {
    default: "bg-bg2 text-ac",
    green: "bg-emerald-500/10 text-emerald-600",
    blue: "bg-sky-500/10 text-sky-600",
    amber: "bg-amber-500/10 text-amber-600",
    red: "bg-red-500/10 text-red-600",
  };

  return (
    <div className="rounded-2xl border border-bd bg-bg p-5">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-5 text-sm text-mut">{label}</p>

      <p className="mt-1 text-2xl font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-xs text-mut">{helper}</p>
    </div>
  );
}

export default function DeliveriesPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [courierFilter, setCourierFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredDeliveries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return deliveries.filter((delivery) => {
      const matchesSearch =
        !query ||
        delivery.id.toLowerCase().includes(query) ||
        delivery.orderId.toLowerCase().includes(query) ||
        delivery.customer.toLowerCase().includes(query) ||
        delivery.phone.includes(query) ||
        delivery.tracking.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        delivery.status === statusFilter;

      const matchesCourier =
        courierFilter === "All" ||
        delivery.courier === courierFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCourier
      );
    });
  }, [search, statusFilter, courierFilter]);

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

          <span className="text-fg">Deliveries</span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ac/15 text-ac">
                <Truck className="h-5 w-5" />
              </div>

              <span className="text-sm font-semibold text-ac">
                Delivery operations
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Deliveries
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-mut sm:text-base">
              Track shipments, monitor courier performance, and
              stay on top of every delivery from pickup to
              customer doorstep.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-bd bg-bg px-4 py-2.5 text-sm font-semibold transition hover:bg-bg2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>

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
              Create order
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* KPI */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard
            icon={Package}
            label="Total shipments"
            value="684"
            helper="All delivery orders"
          />

          <MetricCard
            icon={Truck}
            label="In transit"
            value="184"
            helper="Currently moving"
            tone="blue"
          />

          <MetricCard
            icon={CheckCircle2}
            label="Delivered"
            value="428"
            helper="Successfully completed"
            tone="green"
          />

          <MetricCard
            icon={Clock3}
            label="Pending pickup"
            value="28"
            helper="Waiting for courier"
            tone="amber"
          />

          <MetricCard
            icon={XCircle}
            label="Needs attention"
            value="44"
            helper="Failed or returned"
            tone="red"
          />
        </div>

        {/* Delivery health */}
        <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-2xl border border-bd bg-bg p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-base font-semibold">
                  Delivery health
                </h2>

                <p className="mt-1 text-sm text-mut">
                  Current status of your shipment pipeline.
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Healthy
              </span>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mut">
                    Delivery success
                  </span>

                  <span className="text-sm font-bold">
                    94.2%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-bg2">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: "94.2%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mut">
                    On-time delivery
                  </span>

                  <span className="text-sm font-bold">
                    91.8%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-bg2">
                  <div
                    className="h-full rounded-full bg-ac"
                    style={{ width: "91.8%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mut">
                    Return rate
                  </span>

                  <span className="text-sm font-bold">
                    4.6%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-bg2">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{ width: "4.6%" }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-bd bg-bg2 p-4">
                <p className="text-xs text-mut">
                  Avg. delivery
                </p>

                <p className="mt-1 text-lg font-bold">
                  2.3 days
                </p>
              </div>

              <div className="rounded-xl border border-bd bg-bg2 p-4">
                <p className="text-xs text-mut">
                  Avg. pickup
                </p>

                <p className="mt-1 text-lg font-bold">
                  4.2 hrs
                </p>
              </div>

              <div className="rounded-xl border border-bd bg-bg2 p-4">
                <p className="text-xs text-mut">
                  Failed attempts
                </p>

                <p className="mt-1 text-lg font-bold">
                  31
                </p>
              </div>

              <div className="rounded-xl border border-bd bg-bg2 p-4">
                <p className="text-xs text-mut">
                  Returned
                </p>

                <p className="mt-1 text-lg font-bold">
                  13
                </p>
              </div>
            </div>
          </div>

          {/* Action required */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
                <XCircle className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-base font-semibold">
                  Action required
                </h2>

                <p className="mt-1 text-sm text-mut">
                  Deliveries that need your attention.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-red-500/10 bg-bg p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">
                      31 failed attempts
                    </p>

                    <p className="mt-1 text-xs text-mut">
                      Customers could not receive their orders.
                    </p>
                  </div>

                  <span className="text-sm font-bold text-red-600">
                    4.5%
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-orange-500/10 bg-bg p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">
                      13 returned shipments
                    </p>

                    <p className="mt-1 text-xs text-mut">
                      Review reasons and contact customers.
                    </p>
                  </div>

                  <ArrowUpRight className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </div>

            <Link
              href="#delivery-table"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline"
            >
              Review problem deliveries
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Courier performance */}
        <div className="mt-8 rounded-2xl border border-bd bg-bg p-5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-base font-semibold">
                Courier performance
              </h2>

              <p className="mt-1 text-sm text-mut">
                Compare your delivery partners by success and
                delivery speed.
              </p>
            </div>

            <Link
              href="/dashboard/settings"
              className="text-xs font-semibold text-ac hover:underline"
            >
              Manage couriers
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {courierStats.map((courier) => (
              <div
                key={courier.name}
                className="rounded-2xl border border-bd bg-bg2 p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg text-ac">
                    <Truck className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    {courier.success}%
                  </span>
                </div>

                <h3 className="mt-4 text-sm font-bold">
                  {courier.name}
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-mut">
                      Shipments
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {courier.deliveries}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-mut">
                      Delivered
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {courier.delivered}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-mut">
                      Success
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {courier.success}%
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-mut">
                      Avg. time
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {courier.avgTime}
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-2 rounded-full bg-bg">
                  <div
                    className="h-full rounded-full bg-ac"
                    style={{
                      width: `${courier.success}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliveries table */}
        <div
          id="delivery-table"
          className="mt-8 overflow-hidden rounded-2xl border border-bd bg-bg"
        >
          <div className="border-b border-bd p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-base font-semibold">
                  All deliveries
                </h2>

                <p className="mt-1 text-sm text-mut">
                  Track every shipment and its current delivery
                  status.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />

                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search order, customer..."
                    className="h-10 w-full rounded-xl border border-bd bg-bg2 pl-9 pr-3 text-sm outline-none focus:border-ac sm:w-64"
                  />
                </div>

                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value)
                    }
                    className="h-10 w-full appearance-none rounded-xl border border-bd bg-bg2 px-3 pr-8 text-sm font-medium outline-none focus:border-ac sm:w-40"
                  >
                    <option>All</option>
                    <option>Pending Pickup</option>
                    <option>In Transit</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                    <option>Delivery Failed</option>
                    <option>Returned</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />
                </div>

                <div className="relative">
                  <select
                    value={courierFilter}
                    onChange={(e) =>
                      setCourierFilter(e.target.value)
                    }
                    className="h-10 w-full appearance-none rounded-xl border border-bd bg-bg2 px-3 pr-8 text-sm font-medium outline-none focus:border-ac sm:w-40"
                  >
                    <option>All</option>
                    <option>Pathao Courier</option>
                    <option>Steadfast</option>
                    <option>RedX</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b border-bd bg-bg2/50 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-mut">
                    Delivery
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-mut">
                    Customer
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-mut">
                    Destination
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-mut">
                    Courier
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-mut">
                    Tracking
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
                {filteredDeliveries.map((delivery) => (
                  <tr
                    key={delivery.id}
                    className="border-b border-bd last:border-0"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/dashboard/orders/${delivery.orderId}`}
                        className="text-sm font-semibold hover:text-ac"
                      >
                        {delivery.orderId}
                      </Link>

                      <p className="mt-0.5 text-xs text-mut">
                        {delivery.date}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold">
                        {delivery.customer}
                      </p>

                      <p className="mt-0.5 flex items-center gap-1 text-xs text-mut">
                        <Phone className="h-3 w-3" />
                        {delivery.phone}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="flex items-center gap-1.5 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-mut" />
                        {delivery.location}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium">
                        {delivery.courier}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        className="group flex items-center gap-1.5 text-left"
                      >
                        <span className="font-mono text-xs text-mut group-hover:text-ac">
                          {delivery.tracking}
                        </span>

                        <ExternalLink className="h-3.5 w-3.5 text-mut group-hover:text-ac" />
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={delivery.status} />

                      <p className="mt-1 text-[11px] text-mut">
                        {delivery.eta}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/dashboard/orders/${delivery.orderId}`}
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-bd px-3 text-xs font-semibold transition hover:bg-bg2"
                      >
                        View
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-bd lg:hidden">
            {filteredDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/dashboard/orders/${delivery.orderId}`}
                      className="text-sm font-bold hover:text-ac"
                    >
                      {delivery.orderId}
                    </Link>

                    <p className="mt-0.5 text-xs text-mut">
                      {delivery.customer}
                    </p>
                  </div>

                  <StatusBadge status={delivery.status} />
                </div>

                <div className="mt-4 rounded-xl bg-bg2 p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mut" />

                    <div>
                      <p className="text-xs text-mut">
                        Destination
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {delivery.location}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-bd pt-3">
                    <div>
                      <p className="text-[11px] text-mut">
                        Courier
                      </p>

                      <p className="mt-1 text-xs font-semibold">
                        {delivery.courier}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] text-mut">
                        Tracking
                      </p>

                      <p className="mt-1 font-mono text-xs font-semibold">
                        {delivery.tracking}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-mut">
                      Delivery estimate
                    </p>

                    <p className="mt-1 text-xs font-semibold">
                      {delivery.eta}
                    </p>
                  </div>

                  <Link
                    href={`/dashboard/orders/${delivery.orderId}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-bd px-3 py-2 text-xs font-semibold transition hover:bg-bg2"
                  >
                    View order
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredDeliveries.length === 0 && (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-bg2">
                <Truck className="h-5 w-5 text-mut" />
              </div>

              <h3 className="mt-4 text-base font-semibold">
                No deliveries found
              </h3>

              <p className="mx-auto mt-1 max-w-md text-sm text-mut">
                Try changing your search or delivery filters.
              </p>
            </div>
          )}
        </div>

        {/* Delivery tips */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-bd bg-bg2 p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ac/10 text-ac">
              <MapPin className="h-4 w-4" />
            </div>

            <h3 className="mt-4 text-sm font-bold">
              Keep addresses accurate
            </h3>

            <p className="mt-2 text-xs leading-5 text-mut">
              Complete customer addresses reduce failed delivery
              attempts and improve your success rate.
            </p>
          </div>

          <div className="rounded-2xl border border-bd bg-bg2 p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>

            <h3 className="mt-4 text-sm font-bold">
              Monitor failed deliveries
            </h3>

            <p className="mt-2 text-xs leading-5 text-mut">
              Contact customers quickly when a courier reports a
              failed attempt.
            </p>
          </div>

          <div className="rounded-2xl border border-bd bg-bg2 p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
              <Truck className="h-4 w-4" />
            </div>

            <h3 className="mt-4 text-sm font-bold">
              Compare courier performance
            </h3>

            <p className="mt-2 text-xs leading-5 text-mut">
              Use delivery success and average delivery time to
              choose the best courier for your customers.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 rounded-2xl border border-bd bg-bg2 p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-ac">
                <Truck className="h-5 w-5" />

                <span className="text-sm font-semibold">
                  Keep orders moving
                </span>
              </div>

              <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
                Need to create another fulfillment order?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-mut">
                Add a new customer order and let AmarDokan handle
                packing, courier handover, and delivery.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/orders"
                className="inline-flex items-center gap-2 rounded-xl border border-bd bg-bg px-5 py-3 text-sm font-semibold transition hover:bg-bg2"
              >
                View orders
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link
                href="/dashboard/orders/create"
                className="inline-flex items-center gap-2 rounded-xl bg-ac px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
              >
                Create order
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}