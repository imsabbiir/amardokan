"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Store,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShieldCheck,
  Package,
  ShoppingBag,
  Wallet,
  TrendingUp,
  CheckCircle2,
  Clock3,
  Ban,
  MoreHorizontal,
  FileText,
  Activity,
  CreditCard,
  AlertTriangle,
  X,
} from "lucide-react";

const sellers = [
  {
    id: "SEL-1001",
    name: "Sabbir Ahmed",
    store: "Sabbir Fashion",
    email: "sabbir@example.com",
    phone: "01712345678",
    district: "Dhaka",
    address: "Mirpur, Dhaka, Bangladesh",
    category: "Fashion & Apparel",
    status: "Active",
    verification: "Verified",
    joined: "2026-08-12",
    orders: 248,
    delivered: 221,
    cancelled: 12,
    returned: 15,
    revenue: 248500,
    balance: 18450,
    pendingPayout: 8500,
    products: 42,
    rating: 4.8,
    description: "Fashion clothing, casual wear and accessories.",
  },
  {
    id: "SEL-1002",
    name: "Nusrat Jahan",
    store: "Nusrat Beauty",
    email: "nusrat@example.com",
    phone: "01812345678",
    district: "Chattogram",
    address: "Panchlaish, Chattogram, Bangladesh",
    category: "Beauty & Personal Care",
    status: "Active",
    verification: "Verified",
    joined: "2026-08-20",
    orders: 186,
    delivered: 170,
    cancelled: 8,
    returned: 8,
    revenue: 194200,
    balance: 12750,
    pendingPayout: 4000,
    products: 28,
    rating: 4.6,
    description: "Beauty, skincare and personal care products.",
  },
  {
    id: "SEL-1003",
    name: "Rakib Hasan",
    store: "Tech Zone BD",
    email: "rakib@example.com",
    phone: "01912345678",
    district: "Gazipur",
    address: "Tongi, Gazipur, Bangladesh",
    category: "Electronics",
    status: "Suspended",
    verification: "Verified",
    joined: "2026-07-15",
    orders: 94,
    delivered: 72,
    cancelled: 14,
    returned: 8,
    revenue: 126800,
    balance: 0,
    pendingPayout: 0,
    products: 16,
    rating: 3.9,
    description: "Mobile accessories and electronic gadgets.",
  },
];

const recentOrders = [
  {
    id: "ORD-2081",
    customer: "Rahim Uddin",
    date: "2026-10-08",
    amount: 1850,
    status: "Delivered",
  },
  {
    id: "ORD-2078",
    customer: "Ayesha Akter",
    date: "2026-10-07",
    amount: 2450,
    status: "Processing",
  },
  {
    id: "ORD-2071",
    customer: "Hasan Mahmud",
    date: "2026-10-06",
    amount: 1200,
    status: "Cancelled",
  },
  {
    id: "ORD-2064",
    customer: "Nabila Islam",
    date: "2026-10-05",
    amount: 3200,
    status: "Delivered",
  },
  {
    id: "ORD-2059",
    customer: "Imran Hossain",
    date: "2026-10-04",
    amount: 950,
    status: "Delivered",
  },
];

function money(value) {
  return `৳${Number(value).toLocaleString("en-BD")}`;
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Badge({ children, tone = "gray" }) {
  const styles = {
    green: "bg-green-50 text-green-700 ring-green-200",
    red: "bg-red-50 text-red-700 ring-red-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    gray: "bg-gray-100 text-gray-700 ring-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

function MetricCard({ title, value, note, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[#646970]">{title}</p>
        <span className={`rounded-lg p-2 ${color}`}>
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
      {note && <p className="mt-1 text-xs text-[#646970]">{note}</p>}
    </div>
  );
}

export default function SellerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [sellerList, setSellerList] = useState(sellers);
  const [activeTab, setActiveTab] = useState("overview");
  const [showActions, setShowActions] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [notice, setNotice] = useState("");

  const seller = sellerList.find((item) => item.id === id);

  if (!seller) {
    return (
      <div className="min-h-screen bg-[#f0f0f1] p-6 text-[#1d2327]">
        <div className="mx-auto max-w-3xl rounded-xl border border-[#dcdcde] bg-white p-8 text-center">
          <Store size={36} className="mx-auto text-[#646970]" />
          <h1 className="mt-4 text-xl font-bold">Seller not found</h1>
          <p className="mt-2 text-sm text-[#646970]">
            No demo seller matches ID {String(id)}. Connect this page to your
            database to load real seller records.
          </p>
          <Link
            href="/admin/sellers"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-bold"
          >
            <ArrowLeft size={16} />
            Back to sellers
          </Link>
        </div>
      </div>
    );
  }

  function updateStatus(action) {
    const newStatus = action === "suspend" ? "Suspended" : "Active";

    setSellerList((current) =>
      current.map((item) =>
        item.id === seller.id ? { ...item, status: newStatus } : item
      )
    );

    setNotice(
      action === "suspend"
        ? "Seller suspended in this demo."
        : "Seller reactivated in this demo."
    );
    setConfirmAction(null);
    setShowActions(false);
  }

  const deliveredRate = seller.orders
    ? Math.round((seller.delivered / seller.orders) * 100)
    : 0;

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "finance", label: "Finance", icon: Wallet },
    { id: "business", label: "Business details", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f1] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-375 space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#646970]">
          <Link href="/admin" className="hover:text-[#2271b1]">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/admin/sellers" className="hover:text-[#2271b1]">
            Sellers
          </Link>
          <span>/</span>
          <span className="text-[#1d2327]">{seller.id}</span>
        </div>

        <Link
          href="/admin/sellers"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2271b1] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to sellers
        </Link>

        {notice && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} />
              {notice}
            </span>
            <button onClick={() => setNotice("")} aria-label="Dismiss">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Seller profile header */}
        <section className="rounded-xl border border-[#dcdcde] bg-white">
          <div className="border-b border-[#dcdcde] p-5 sm:p-7">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#edf6df] text-2xl font-bold text-[#527b1d] sm:h-20 sm:w-20">
                  {seller.store.slice(0, 1)}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="wrap-break-word text-2xl font-bold tracking-tight sm:text-3xl">
                      {seller.store}
                    </h1>
                    {seller.verification === "Verified" && (
                      <span title="Verified seller">
                        <ShieldCheck
                          size={21}
                          className="text-green-700"
                        />
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-[#646970]">
                    Owned by {seller.name} · {seller.id}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {seller.status === "Active" ? (
                      <Badge tone="green">Active</Badge>
                    ) : (
                      <Badge tone="red">Suspended</Badge>
                    )}
                    {seller.verification === "Verified" ? (
                      <Badge tone="blue">Verified</Badge>
                    ) : (
                      <Badge tone="amber">Verification pending</Badge>
                    )}
                    <Badge>{seller.category}</Badge>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 text-sm text-[#646970] sm:flex-row sm:flex-wrap sm:gap-x-5">
                    <span className="flex items-center gap-2 break-all">
                      <Mail size={15} />
                      {seller.email}
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone size={15} />
                      {seller.phone}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={15} />
                      {seller.district}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/admin/orders"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#dcdcde] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                >
                  <ShoppingBag size={16} />
                  View orders
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setShowActions((value) => !value)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#1d2327] px-4 py-2.5 text-sm font-semibold text-white hover:bg-black"
                  >
                    Actions
                    <MoreHorizontal size={17} />
                  </button>

                  {showActions && (
                    <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-[#dcdcde] bg-white p-1.5 shadow-xl">
                      {seller.status === "Active" ? (
                        <button
                          onClick={() => setConfirmAction("suspend")}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-700 hover:bg-red-50"
                        >
                          <Ban size={16} />
                          Suspend seller
                        </button>
                      ) : (
                        <button
                          onClick={() => setConfirmAction("reactivate")}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-green-700 hover:bg-green-50"
                        >
                          <CheckCircle2 size={16} />
                          Reactivate seller
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setShowActions(false);
                          setNotice(
                            "In production, open your seller verification workflow here."
                          );
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-gray-50"
                      >
                        <ShieldCheck size={16} />
                        Review verification
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto px-3 pt-2 sm:px-5">
            {tabs.map(({ id: tabId, label, icon: Icon }) => (
              <button
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm font-semibold transition ${
                  activeTab === tabId
                    ? "border-[#2271b1] text-[#2271b1]"
                    : "border-transparent text-[#646970] hover:text-[#1d2327]"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Overview */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                title="Gross order value"
                value={money(seller.revenue)}
                note="Illustrative lifetime total"
                icon={TrendingUp}
                color="bg-green-50 text-green-700"
              />
              <MetricCard
                title="Total orders"
                value={seller.orders.toLocaleString("en-BD")}
                note={`${deliveredRate}% delivered`}
                icon={ShoppingBag}
                color="bg-blue-50 text-blue-700"
              />
              <MetricCard
                title="Seller balance"
                value={money(seller.balance)}
                note="Demo figure, not a payout authorization"
                icon={Wallet}
                color="bg-purple-50 text-purple-700"
              />
              <MetricCard
                title="Listed products"
                value={seller.products}
                note={`Rating: ${seller.rating}/5 (demo)`}
                icon={Package}
                color="bg-amber-50 text-amber-700"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <section className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white xl:col-span-2">
                <div className="flex items-center justify-between border-b border-[#dcdcde] p-5">
                  <div>
                    <h2 className="font-bold">Recent orders</h2>
                    <p className="mt-1 text-sm text-[#646970]">
                      Latest order activity for this seller
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-sm font-semibold text-[#2271b1] hover:underline"
                  >
                    View all
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-137.5 text-left text-sm">
                    <thead className="bg-[#f6f7f7] text-xs uppercase text-[#646970]">
                      <tr>
                        <th className="px-5 py-3">Order</th>
                        <th className="px-5 py-3">Customer</th>
                        <th className="px-5 py-3">Date</th>
                        <th className="px-5 py-3">Amount</th>
                        <th className="px-5 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0f0f1]">
                      {recentOrders.slice(0, 4).map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-5 py-4 font-semibold text-[#2271b1]">
                            {order.id}
                          </td>
                          <td className="px-5 py-4">{order.customer}</td>
                          <td className="px-5 py-4 text-[#646970]">
                            {formatDate(order.date)}
                          </td>
                          <td className="px-5 py-4 font-semibold">
                            {money(order.amount)}
                          </td>
                          <td className="px-5 py-4">
                            <OrderBadge status={order.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="rounded-xl border border-[#dcdcde] bg-white">
                <div className="border-b border-[#dcdcde] p-5">
                  <h2 className="font-bold">Account information</h2>
                  <p className="mt-1 text-sm text-[#646970]">
                    Seller profile summary
                  </p>
                </div>
                <div className="space-y-5 p-5">
                  <InfoRow
                    icon={CalendarDays}
                    label="Member since"
                    value={formatDate(seller.joined)}
                  />
                  <InfoRow
                    icon={Store}
                    label="Business category"
                    value={seller.category}
                  />
                  <InfoRow
                    icon={MapPin}
                    label="Business address"
                    value={seller.address}
                  />
                  <InfoRow
                    icon={ShieldCheck}
                    label="Verification"
                    value={seller.verification}
                  />
                  <InfoRow
                    icon={Activity}
                    label="Account status"
                    value={seller.status}
                  />
                </div>
              </section>
            </div>

            <section className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-6">
              <h2 className="font-bold">Order performance</h2>
              <p className="mt-1 text-sm text-[#646970]">
                Lifetime order breakdown from demo data
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Performance
                  label="Delivered"
                  value={seller.delivered}
                  total={seller.orders}
                  color="bg-green-500"
                />
                <Performance
                  label="Cancelled"
                  value={seller.cancelled}
                  total={seller.orders}
                  color="bg-red-500"
                />
                <Performance
                  label="Returned"
                  value={seller.returned}
                  total={seller.orders}
                  color="bg-amber-500"
                />
              </div>
            </section>
          </>
        )}

        {/* Orders */}
        {activeTab === "orders" && (
          <section className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
            <div className="border-b border-[#dcdcde] p-5">
              <h2 className="font-bold">Seller orders</h2>
              <p className="mt-1 text-sm text-[#646970]">
                Demo order records associated with {seller.store}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-150 text-left text-sm">
                <thead className="bg-[#f6f7f7] text-xs uppercase text-[#646970]">
                  <tr>
                    <th className="px-5 py-3">Order ID</th>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Amount</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0f1]">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-semibold text-[#2271b1]">
                        {order.id}
                      </td>
                      <td className="px-5 py-4">{order.customer}</td>
                      <td className="px-5 py-4">{formatDate(order.date)}</td>
                      <td className="px-5 py-4 font-semibold">
                        {money(order.amount)}
                      </td>
                      <td className="px-5 py-4">
                        <OrderBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Finance */}
        {activeTab === "finance" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <MetricCard
                title="Gross order value"
                value={money(seller.revenue)}
                note="Not the same as seller earnings"
                icon={TrendingUp}
                color="bg-green-50 text-green-700"
              />
              <MetricCard
                title="Seller balance"
                value={money(seller.balance)}
                note="Demo balance only"
                icon={Wallet}
                color="bg-blue-50 text-blue-700"
              />
              <MetricCard
                title="Pending payout"
                value={money(seller.pendingPayout)}
                note="Requires reconciliation before payment"
                icon={CreditCard}
                color="bg-amber-50 text-amber-700"
              />
            </div>

            <section className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={21}
                  className="mt-0.5 shrink-0 text-amber-600"
                />
                <div>
                  <h2 className="font-bold">Financial review</h2>
                  <p className="mt-1 text-sm leading-6 text-[#646970]">
                    These figures are illustrative. Before a real payout,
                    calculate the seller&apos;s payable amount from delivered
                    orders, returns, refunds, platform commission, courier
                    charges and previous payouts. Do not initiate payment
                    directly from this demo page.
                  </p>
                  <Link
                    href="/admin/payouts"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2271b1] hover:underline"
                  >
                    Open payout management
                    <Wallet size={15} />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Business details */}
        {activeTab === "business" && (
          <section className="rounded-xl border border-[#dcdcde] bg-white">
            <div className="border-b border-[#dcdcde] p-5">
              <h2 className="font-bold">Business information</h2>
              <p className="mt-1 text-sm text-[#646970]">
                Registered seller details
              </p>
            </div>
            <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
              <Detail label="Seller ID" value={seller.id} />
              <Detail label="Store name" value={seller.store} />
              <Detail label="Owner name" value={seller.name} />
              <Detail label="Email address" value={seller.email} />
              <Detail label="Phone number" value={seller.phone} />
              <Detail label="Business category" value={seller.category} />
              <Detail label="District" value={seller.district} />
              <Detail label="Full address" value={seller.address} />
              <Detail label="Registration date" value={formatDate(seller.joined)} />
              <Detail label="Verification status" value={seller.verification} />
              <div className="sm:col-span-2">
                <Detail label="Business description" value={seller.description} />
              </div>
            </div>
            <div className="border-t border-[#dcdcde] bg-[#f6f7f7] p-5">
              <p className="text-sm leading-6 text-[#646970]">
                Connect your actual seller model to display uploaded identity
                documents, business registration information, verification
                timestamps and the reviewing administrator.
              </p>
            </div>
          </section>
        )}

        <p className="text-xs leading-5 text-[#646970]">
          Demo note: seller records, orders and financial figures are hardcoded.
          Status changes are local state only and will reset when the page
          reloads. Production actions need server-side authorization, database
          persistence and an audit trail.
        </p>
      </div>

      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                confirmAction === "suspend"
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {confirmAction === "suspend" ? (
                <Ban size={22} />
              ) : (
                <CheckCircle2 size={22} />
              )}
            </div>

            <h2 className="mt-4 text-lg font-bold">
              {confirmAction === "suspend"
                ? "Suspend this seller?"
                : "Reactivate this seller?"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#646970]">
              {confirmAction === "suspend"
                ? `Suspending ${seller.store} may restrict seller operations. In production, define exactly which actions are blocked and whether existing orders can still be fulfilled.`
                : `Reactivate ${seller.store}? Confirm that any suspension issues have been resolved first.`}
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setConfirmAction(null)}
                className="rounded-lg border border-[#dcdcde] px-4 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => updateStatus(confirmAction)}
                className={`rounded-lg px-4 py-2.5 text-sm font-bold text-white ${
                  confirmAction === "suspend"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-700 hover:bg-green-800"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="rounded-lg bg-[#f6f7f7] p-2 text-[#646970]">
        <Icon size={17} />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-[#646970]">{label}</p>
        <p className="mt-1 wrap-break-word text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-[#646970]">
        {label}
      </p>
      <p className="mt-2 wrap-break-word text-sm font-semibold">{value || "—"}</p>
    </div>
  );
}

function Performance({ label, value, total, color }) {
  const percent = total ? Math.min(100, (value / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-[#dcdcde] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-[#646970]">{label}</span>
        <span className="font-bold">{value}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-[#646970]">
        {percent.toFixed(1)}% of total orders
      </p>
    </div>
  );
}

function OrderBadge({ status }) {
  const tone =
    status === "Delivered"
      ? "green"
      : status === "Cancelled"
        ? "red"
        : "amber";

  return <Badge tone={tone}>{status}</Badge>;
}