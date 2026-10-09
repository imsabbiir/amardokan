/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  Eye,
  FileText,
  History,
  Info,
  MoreHorizontal,
  RefreshCw,
  Search,
  TrendingUp,
  Wallet,
} from "lucide-react";

const transactions = [
  {
    id: "TXN-10482",
    orderId: "AM-10482",
    customer: "Nusrat Jahan",
    type: "earning",
    amount: 3490,
    fee: 120,
    net: 3370,
    status: "Completed",
    date: "Oct 06, 2026",
    time: "3:42 PM",
  },
  {
    id: "TXN-10471",
    orderId: "AM-10471",
    customer: "Tanvir Hasan",
    type: "earning",
    amount: 1490,
    fee: 120,
    net: 1370,
    status: "Pending",
    date: "Oct 06, 2026",
    time: "1:18 PM",
  },
  {
    id: "TXN-10452",
    orderId: "AM-10452",
    customer: "Sadia Rahman",
    type: "earning",
    amount: 1890,
    fee: 120,
    net: 1770,
    status: "Pending",
    date: "Oct 05, 2026",
    time: "5:31 PM",
  },
  {
    id: "TXN-10421",
    orderId: "AM-10421",
    customer: "Rakib Ahmed",
    type: "earning",
    amount: 2580,
    fee: 120,
    net: 2460,
    status: "Completed",
    date: "Oct 05, 2026",
    time: "2:15 PM",
  },
  {
    id: "TXN-10398",
    orderId: "AM-10398",
    customer: "Ayesha Karim",
    type: "earning",
    amount: 3790,
    fee: 150,
    net: 3640,
    status: "Completed",
    date: "Oct 04, 2026",
    time: "6:42 PM",
  },
  {
    id: "TXN-10384",
    orderId: "AM-10384",
    customer: "Imran Hossain",
    type: "earning",
    amount: 2190,
    fee: 120,
    net: 2070,
    status: "Pending",
    date: "Oct 04, 2026",
    time: "4:20 PM",
  },
  {
    id: "TXN-10371",
    orderId: "AM-10371",
    customer: "Farzana Akter",
    type: "earning",
    amount: 2990,
    fee: 120,
    net: 2870,
    status: "Completed",
    date: "Oct 03, 2026",
    time: "3:10 PM",
  },
  {
    id: "TXN-10352",
    orderId: "AM-10352",
    customer: "Mahmudul Hasan",
    type: "earning",
    amount: 1290,
    fee: 100,
    net: 1190,
    status: "Completed",
    date: "Oct 02, 2026",
    time: "11:42 AM",
  },
];

const payouts = [
  {
    id: "PAY-20261001",
    amount: 18450,
    method: "bKash",
    account: "01712 345678",
    status: "Paid",
    date: "Oct 01, 2026",
  },
  {
    id: "PAY-20260924",
    amount: 22180,
    method: "bKash",
    account: "01712 345678",
    status: "Paid",
    date: "Sep 24, 2026",
  },
  {
    id: "PAY-20260917",
    amount: 16750,
    method: "bKash",
    account: "01712 345678",
    status: "Paid",
    date: "Sep 17, 2026",
  },
];

const chartData = [
  { day: "Sep 30", value: 4200 },
  { day: "Oct 01", value: 6800 },
  { day: "Oct 02", value: 5200 },
  { day: "Oct 03", value: 8100 },
  { day: "Oct 04", value: 7300 },
  { day: "Oct 05", value: 9600 },
  { day: "Oct 06", value: 11200 },
];

function formatPrice(price) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  helper,
  trend,
  tone = "default",
}) {
  const tones = {
    default: "bg-bg2 text-ac",
    green: "bg-emerald-500/10 text-emerald-600",
    amber: "bg-amber-500/10 text-amber-600",
    blue: "bg-sky-500/10 text-sky-600",
  };

  return (
    <div className="rounded-2xl border border-bd bg-bg p-5">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}
        >
          <Icon className="h-5 w-5" />
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

function TransactionStatus({ status }) {
  const styles = {
    Completed:
      "bg-emerald-500/10 text-emerald-600",
    Pending:
      "bg-amber-500/10 text-amber-600",
    Failed:
      "bg-red-500/10 text-red-600",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-bg2 text-mut"
      }`}
    >
      {status === "Completed" && (
        <CheckCircle2 className="h-3.5 w-3.5" />
      )}

      {status === "Pending" && (
        <Clock3 className="h-3.5 w-3.5" />
      )}

      {status}
    </span>
  );
}

function EarningsChart() {
  const maxValue = Math.max(...chartData.map((item) => item.value));

  return (
    <div className="mt-6">
      <div className="flex h-56 items-end gap-2 sm:gap-4">
        {chartData.map((item) => {
          const height = Math.max(
            (item.value / maxValue) * 100,
            8
          );

          return (
            <div
              key={item.day}
              className="group flex h-full flex-1 flex-col justify-end"
            >
              <div className="relative flex flex-1 items-end justify-center">
                <div
                  className="w-full max-w-10 rounded-t-lg bg-ac transition-all duration-200 group-hover:bg-[#7fb922]"
                  style={{ height: `${height}%` }}
                >
                  <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full rounded-lg border border-bd bg-bg px-2.5 py-1.5 text-xs font-semibold opacity-0 shadow-lg transition group-hover:opacity-100">
                    {formatPrice(item.value)}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-center text-[10px] text-mut sm:text-xs">
                {item.day.replace("Oct ", "")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-bg2">
        <Wallet className="h-5 w-5 text-mut" />
      </div>

      <h3 className="mt-4 text-base font-semibold">
        No transactions found
      </h3>

      <p className="mx-auto mt-1 max-w-md text-sm text-mut">
        Try changing your filters or date range.
      </p>
    </div>
  );
}

export default function EarningsPage() {
  const [period, setPeriod] = useState("This month");
  const [transactionFilter, setTransactionFilter] =
    useState("All");
  const [search, setSearch] = useState("");

  const completedEarnings = transactions
    .filter((item) => item.status === "Completed")
    .reduce((sum, item) => sum + item.net, 0);

  const pendingEarnings = transactions
    .filter((item) => item.status === "Pending")
    .reduce((sum, item) => sum + item.net, 0);

  const totalFees = transactions.reduce(
    (sum, item) => sum + item.fee,
    0
  );

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesSearch =
        !query ||
        transaction.orderId.toLowerCase().includes(query) ||
        transaction.customer.toLowerCase().includes(query) ||
        transaction.id.toLowerCase().includes(query);

      const matchesFilter =
        transactionFilter === "All" ||
        transaction.status === transactionFilter;

      return matchesSearch && matchesFilter;
    });
  }, [search, transactionFilter]);

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

          <span className="text-fg">Earnings</span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ac/15 text-ac">
                <Wallet className="h-5 w-5" />
              </div>

              <span className="text-sm font-semibold text-ac">
                Financial overview
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Earnings
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-mut sm:text-base">
              Track your revenue, available balance, payouts, and
              earnings from fulfilled orders.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-bd bg-bg px-4 py-2.5 text-sm font-semibold transition hover:bg-bg2"
            >
              <Download className="h-4 w-4" />
              Export statement
            </button>

            <Link
              href="/dashboard/settings"
              className="inline-flex items-center gap-2 rounded-xl bg-ac px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
            >
              Payout settings
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Balance Hero */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-bd bg-bg2">
          <div className="grid lg:grid-cols-[1.4fr_0.6fr]">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-ac">
                <Wallet className="h-4 w-4" />
                Available balance
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-4xl font-bold tracking-tight sm:text-5xl">
                    {formatPrice(28740)}
                  </p>

                  <p className="mt-2 text-sm text-mut">
                    Available for your next payout
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex w-fit items-center gap-2 rounded-xl bg-ac px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#7fb922]"
                >
                  <Banknote className="h-4 w-4" />
                  Request payout
                </button>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-bd bg-bg p-4">
                  <p className="text-xs text-mut">
                    Pending earnings
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {formatPrice(14820)}
                  </p>
                </div>

                <div className="rounded-xl border border-bd bg-bg p-4">
                  <p className="text-xs text-mut">
                    Next payout
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    Oct 09
                  </p>
                </div>

                <div className="rounded-xl border border-bd bg-bg p-4">
                  <p className="text-xs text-mut">
                    Payout method
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    bKash
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-bd p-6 lg:border-l lg:border-t-0 sm:p-8">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    Payout account
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ac/10 text-ac">
                      <Banknote className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        bKash
                      </p>

                      <p className="mt-0.5 text-xs text-mut">
                        01712 345678
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                    <div>
                      <p className="text-xs font-semibold text-emerald-600">
                        Account verified
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-mut">
                        Your payout account is ready to receive
                        earnings.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/dashboard/settings"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-ac hover:underline"
                >
                  Manage payout account
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={TrendingUp}
            label="Net earnings"
            value={formatPrice(84260)}
            helper="This month"
            trend="+14.8%"
            tone="green"
          />

          <SummaryCard
            icon={Clock3}
            label="Pending earnings"
            value={formatPrice(pendingEarnings)}
            helper="Waiting for order completion"
            tone="amber"
          />

          <SummaryCard
            icon={ArrowDownRight}
            label="Total payouts"
            value={formatPrice(57380)}
            helper="Paid to your account"
            tone="blue"
          />

          <SummaryCard
            icon={FileText}
            label="Platform & delivery fees"
            value={formatPrice(totalFees)}
            helper="Current period"
          />
        </div>

        {/* Revenue Chart + Breakdown */}
        <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_0.7fr]">
          <div className="rounded-2xl border border-bd bg-bg p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-base font-semibold">
                  Earnings overview
                </h2>

                <p className="mt-1 text-sm text-mut">
                  Your net earnings over the selected period.
                </p>
              </div>

              <div className="relative">
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="h-9 appearance-none rounded-lg border border-bd bg-bg2 px-3 pr-8 text-xs font-semibold outline-none focus:border-ac"
                >
                  <option>This week</option>
                  <option>This month</option>
                  <option>Last month</option>
                  <option>Last 3 months</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-mut" />
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold tracking-tight">
                  {formatPrice(84260)}
                </p>

                <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  14.8% vs previous period
                </div>
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-xs text-mut">
                  Avg. daily
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {formatPrice(12037)}
                </p>
              </div>
            </div>

            <EarningsChart />
          </div>

          <div className="rounded-2xl border border-bd bg-bg p-5 sm:p-6">
            <div>
              <h2 className="text-base font-semibold">
                Earnings breakdown
              </h2>

              <p className="mt-1 text-sm text-mut">
                Where your current earnings come from.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mut">
                    Product earnings
                  </span>

                  <span className="text-sm font-semibold">
                    {formatPrice(97340)}
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-bg2">
                  <div
                    className="h-full rounded-full bg-ac"
                    style={{ width: "86%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mut">
                    Delivery fees
                  </span>

                  <span className="text-sm font-semibold">
                    {formatPrice(8200)}
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-bg2">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: "7%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-mut">
                    Discounts
                  </span>

                  <span className="text-sm font-semibold text-red-500">
                    −{formatPrice(5400)}
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-bg2">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{ width: "5%" }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-bd pt-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">
                  Net earnings
                </span>

                <span className="text-lg font-bold">
                  {formatPrice(84260)}
                </span>
              </div>
            </div>

            <div className="mt-5 flex gap-2 rounded-xl border border-bd bg-bg2 p-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-mut" />

              <p className="text-[11px] leading-5 text-mut">
                Net earnings are calculated after applicable
                delivery, platform, and order-related fees.
              </p>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-bd bg-bg">
          <div className="border-b border-bd p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-base font-semibold">
                  Earnings transactions
                </h2>

                <p className="mt-1 text-sm text-mut">
                  Every completed and pending earning from your
                  orders.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />

                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search order or customer..."
                    className="h-10 w-full rounded-xl border border-bd bg-bg2 pl-9 pr-3 text-sm outline-none focus:border-ac sm:w-64"
                  />
                </div>

                <div className="relative">
                  <select
                    value={transactionFilter}
                    onChange={(e) =>
                      setTransactionFilter(e.target.value)
                    }
                    className="h-10 w-full appearance-none rounded-xl border border-bd bg-bg2 px-3 pr-8 text-sm font-medium outline-none focus:border-ac sm:w-32"
                  >
                    <option>All</option>
                    <option>Completed</option>
                    <option>Pending</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden overflow-x-auto lg:block">
            {filteredTransactions.length > 0 ? (
              <table className="w-full min-w-225">
                <thead>
                  <tr className="border-b border-bd bg-bg2/50 text-left">
                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Transaction
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Order
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Gross
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Fees
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold text-mut">
                      Net earnings
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
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-bd last:border-0"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold">
                          {transaction.id}
                        </p>

                        <p className="mt-0.5 text-xs text-mut">
                          {transaction.date} ·{" "}
                          {transaction.time}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          href={`/dashboard/orders/${transaction.orderId}`}
                          className="text-sm font-semibold transition hover:text-ac"
                        >
                          {transaction.orderId}
                        </Link>

                        <p className="mt-0.5 text-xs text-mut">
                          {transaction.customer}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm font-medium">
                          {formatPrice(transaction.amount)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm text-mut">
                          −{formatPrice(transaction.fee)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm font-bold">
                          {formatPrice(transaction.net)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <TransactionStatus
                          status={transaction.status}
                        />
                      </td>

                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/dashboard/orders/${transaction.orderId}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-bd transition hover:bg-bg2"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <EmptyState />
            )}
          </div>

          {/* Mobile */}
          <div className="divide-y divide-bd lg:hidden">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">
                        {transaction.orderId}
                      </p>

                      <p className="mt-0.5 text-xs text-mut">
                        {transaction.customer}
                      </p>
                    </div>

                    <TransactionStatus
                      status={transaction.status}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-bg2 p-3">
                      <p className="text-[11px] text-mut">
                        Gross
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {formatPrice(transaction.amount)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-bg2 p-3">
                      <p className="text-[11px] text-mut">
                        Net earnings
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {formatPrice(transaction.net)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-bd pt-4">
                    <div>
                      <p className="text-xs text-mut">
                        Fees
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        −{formatPrice(transaction.fee)}
                      </p>
                    </div>

                    <Link
                      href={`/dashboard/orders/${transaction.orderId}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-bd px-3 py-2 text-xs font-semibold transition hover:bg-bg2"
                    >
                      View order
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </div>

        {/* Payout History + Schedule */}
        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-2xl border border-bd bg-bg">
            <div className="flex items-center justify-between border-b border-bd p-5 sm:p-6">
              <div>
                <h2 className="text-base font-semibold">
                  Payout history
                </h2>

                <p className="mt-1 text-sm text-mut">
                  Recent payouts sent to your account.
                </p>
              </div>

              <History className="h-5 w-5 text-mut" />
            </div>

            <div className="divide-y divide-bd">
              {payouts.map((payout) => (
                <div
                  key={payout.id}
                  className="flex items-center justify-between gap-4 p-4 sm:p-5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                      <ArrowDownRight className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold">
                        {formatPrice(payout.amount)}
                      </p>

                      <p className="mt-0.5 text-xs text-mut">
                        {payout.method} · {payout.account}
                      </p>

                      <p className="mt-0.5 text-[11px] text-mut">
                        {payout.date} · {payout.id}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    {payout.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-bd bg-bg p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ac/10 text-ac">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-base font-semibold">
                  Payout schedule
                </h2>

                <p className="mt-1 text-sm text-mut">
                  Your earnings are paid automatically.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-bg2 p-5">
              <p className="text-xs text-mut">
                Next scheduled payout
              </p>

              <p className="mt-2 text-2xl font-bold">
                October 09, 2026
              </p>

              <p className="mt-1 text-sm text-mut">
                Estimated amount: {formatPrice(28740)}
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-mut">
                  Frequency
                </span>

                <span className="font-semibold">
                  Weekly
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-mut">
                  Minimum payout
                </span>

                <span className="font-semibold">
                  ৳1,000
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-mut">
                  Account
                </span>

                <span className="font-semibold">
                  bKash ···5678
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-bd bg-bg2 p-4">
              <div className="flex gap-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-mut" />

                <p className="text-xs leading-5 text-mut">
                  Earnings become available after the related
                  order is successfully delivered and processed.
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/settings"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-bd py-2.5 text-sm font-semibold transition hover:bg-bg2"
            >
              Manage payout settings
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Statement CTA */}
        <div className="mt-8 rounded-2xl border border-bd bg-bg2 p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-ac">
                <FileText className="h-5 w-5" />

                <span className="text-sm font-semibold">
                  Financial records
                </span>
              </div>

              <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
                Need a detailed earnings statement?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-mut">
                Export your transactions, payouts, fees, and net
                earnings for accounting or business records.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-ac px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
            >
              <Download className="h-4 w-4" />
              Download statement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}