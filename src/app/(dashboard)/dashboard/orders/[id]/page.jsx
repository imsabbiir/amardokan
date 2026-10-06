
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  CreditCard,
  MapPin,
  MoreHorizontal,
  Package,
  Phone,
  Printer,
  RefreshCcw,
  Truck,
  UserRound,
  Wallet,
} from "lucide-react";
import { useState } from "react";

const order = {
  id: "AM-10482",
  createdAt: "October 06, 2026 · 10:42 AM",

  status: "Delivered",

  customer: {
    name: "Nusrat Jahan",
    phone: "01712 345678",
    email: "nusrat@example.com",
  },

  shipping: {
    recipient: "Nusrat Jahan",
    phone: "01712 345678",
    address: "House 24, Road 7",
    area: "Dhanmondi",
    city: "Dhaka",
    postalCode: "1209",
  },

  payment: {
    method: "Cash on Delivery",
    status: "Paid",
    transactionId: "COD-AM10482",
  },

  courier: {
    name: "Pathao Courier",
    trackingId: "PT-88219402",
    status: "Delivered",
  },

  items: [
    {
      id: 1,
      name: "Premium Oversized Hoodie",
      variant: "Black · XL",
      sku: "HOOD-OVR-BLK-XL",
      quantity: 2,
      price: 1250,
      image: null,
    },
    {
      id: 2,
      name: "Essential Sweatshirt",
      variant: "Grey · L",
      sku: "SWT-ESS-GRY-L",
      quantity: 1,
      price: 990,
      image: null,
    },
  ],

  subtotal: 3490,
  deliveryFee: 120,
  discount: 0,
  total: 3610,

  timeline: [
    {
      title: "Order delivered",
      description: "Customer received the order successfully.",
      time: "Oct 06, 2026 · 3:42 PM",
      completed: true,
    },
    {
      title: "Out for delivery",
      description: "Courier is delivering the package to the customer.",
      time: "Oct 06, 2026 · 11:20 AM",
      completed: true,
    },
    {
      title: "Order shipped",
      description: "Package was handed over to Pathao Courier.",
      time: "Oct 06, 2026 · 8:15 AM",
      completed: true,
    },
    {
      title: "Order packed",
      description: "Products were packed and prepared for shipment.",
      time: "Oct 05, 2026 · 6:30 PM",
      completed: true,
    },
    {
      title: "Order confirmed",
      description: "Order was confirmed and sent for fulfillment.",
      time: "Oct 05, 2026 · 4:12 PM",
      completed: true,
    },
  ],
};

function formatPrice(price) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ac/10 px-3 py-1.5 text-xs font-semibold text-ac-strong">
      <CheckCircle2 className="size-3.5" />
      {status}
    </span>
  );
}

function InfoRow({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-bg2">
          <Icon className="size-4 text-mut" />
        </div>
      )}

      <div className="min-w-0">
        <p className="text-[11px] font-medium text-mut">
          {label}
        </p>

        <p className="mt-1 wrap-break-word text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function OrderDetailsPage() {
  const [copied, setCopied] = useState(false);

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(order.id);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Clipboard unavailable.
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-bg">
      <div className="mx-auto max-w-360 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-mut">
          <Link
            href="/dashboard"
            className="transition hover:text-fg"
          >
            Overview
          </Link>

          <ChevronRight className="size-3.5" />

          <Link
            href="/dashboard/orders"
            className="transition hover:text-fg"
          >
            Orders
          </Link>

          <ChevronRight className="size-3.5" />

          <span className="text-fg">
            #{order.id}
          </span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">

            <div className="flex items-start gap-3">
              <Link
                href="/dashboard/orders"
                className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-xl border border-bd bg-bg transition hover:bg-bg2"
                aria-label="Back to orders"
              >
                <ArrowLeft className="size-4" />
              </Link>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Order #{order.id}
                  </h1>

                  <StatusBadge status={order.status} />
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mut">
                  <span>{order.createdAt}</span>

                  <span className="hidden size-1 rounded-full bg-bd sm:block" />

                  <button
                    type="button"
                    onClick={copyOrderId}
                    className="inline-flex items-center gap-1.5 transition hover:text-fg"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5 text-ac" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        Copy order ID
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-bd bg-bg px-3.5 text-sm font-medium transition hover:bg-bg2"
              >
                <Printer className="size-4" />
                <span className="hidden sm:inline">
                  Print
                </span>
              </button>

              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-bd bg-bg px-3.5 text-sm font-medium transition hover:bg-bg2"
              >
                <RefreshCcw className="size-4" />
                <span className="hidden sm:inline">
                  Update
                </span>
              </button>

              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-xl border border-bd bg-bg transition hover:bg-bg2"
                aria-label="More order actions"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">

          {/* Left Column */}
          <div className="space-y-5">

            {/* Order Items */}
            <section className="overflow-hidden rounded-2xl border border-bd bg-bg">
              <div className="flex items-center justify-between border-b border-bd px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold">
                    Order items
                  </h2>

                  <p className="mt-1 text-xs text-mut">
                    {order.items.length} products in this order
                  </p>
                </div>

                <span className="rounded-lg bg-bg2 px-2.5 py-1 text-xs font-medium text-mut">
                  {order.items.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}{" "}
                  items
                </span>
              </div>

              <div className="divide-y divide-bd">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-5"
                  >
                    {/* Product visual */}
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-bg2 sm:size-20">
                      <Package className="size-6 text-mut" />
                    </div>

                    {/* Product details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row">
                        <div>
                          <h3 className="text-sm font-semibold">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-xs text-mut">
                            {item.variant}
                          </p>

                          <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wide text-mut/70">
                            SKU: {item.sku}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-sm font-semibold">
                            {formatPrice(
                              item.price * item.quantity
                            )}
                          </p>

                          <p className="mt-1 text-xs text-mut">
                            {formatPrice(item.price)} ×{" "}
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-bd bg-bg2/40 p-5">
                <div className="ml-auto space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-mut">
                      Subtotal
                    </span>

                    <span className="font-medium">
                      {formatPrice(order.subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-mut">
                      Delivery fee
                    </span>

                    <span className="font-medium">
                      {formatPrice(order.deliveryFee)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-mut">
                      Discount
                    </span>

                    <span className="font-medium text-ac">
                      -{formatPrice(order.discount)}
                    </span>
                  </div>

                  <div className="border-t border-bd pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        Order total
                      </span>

                      <span className="text-lg font-bold">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Fulfillment Timeline */}
            <section className="rounded-2xl border border-bd bg-bg">
              <div className="border-b border-bd px-5 py-4">
                <h2 className="text-sm font-semibold">
                  Fulfillment timeline
                </h2>

                <p className="mt-1 text-xs text-mut">
                  Track the order from confirmation to delivery.
                </p>
              </div>

              <div className="p-5">
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-3.75 top-3 h-[calc(100%-24px)] w-px bg-bd" />

                  <div className="space-y-6">
                    {order.timeline.map((event, index) => (
                      <div
                        key={event.title}
                        className="relative flex gap-4"
                      >
                        <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-bd bg-bg">
                          <div className="flex size-5 items-center justify-center rounded-full bg-ac/15">
                            <Check className="size-3 text-ac" />
                          </div>
                        </div>

                        <div className="min-w-0 flex-1 pt-0.5">
                          <div className="flex flex-col justify-between gap-1 sm:flex-row">
                            <div>
                              <p className="text-sm font-semibold">
                                {event.title}
                              </p>

                              <p className="mt-1 text-xs leading-5 text-mut">
                                {event.description}
                              </p>
                            </div>

                            <p className="shrink-0 text-[11px] text-mut">
                              {event.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Order Activity */}
            <section className="rounded-2xl border border-bd bg-bg">
              <div className="border-b border-bd px-5 py-4">
                <h2 className="text-sm font-semibold">
                  Order activity
                </h2>
              </div>

              <div className="p-5">
                <div className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ac/10">
                    <Clock3 className="size-4 text-ac" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      Order successfully delivered
                    </p>

                    <p className="mt-1 text-xs leading-5 text-mut">
                      The courier confirmed that the customer
                      received the package.
                    </p>

                    <p className="mt-2 text-[11px] text-mut">
                      October 06, 2026 · 3:42 PM
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <aside className="space-y-5">

            {/* Customer */}
            <section className="rounded-2xl border border-bd bg-bg">
              <div className="border-b border-bd px-5 py-4">
                <h2 className="text-sm font-semibold">
                  Customer
                </h2>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-ac/10 text-sm font-bold text-ac">
                    NJ
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {order.customer.name}
                    </p>

                    <p className="mt-1 text-xs text-mut">
                      Customer
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <InfoRow
                    label="Phone"
                    value={order.customer.phone}
                    icon={Phone}
                  />

                  <InfoRow
                    label="Email"
                    value={order.customer.email}
                    icon={UserRound}
                  />
                </div>

                <Link
                  href="/dashboard/customers"
                  className="mt-5 flex items-center justify-between rounded-xl border border-bd px-3.5 py-3 text-xs font-semibold transition hover:bg-bg2"
                >
                  View customer profile
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </section>

            {/* Delivery */}
            <section className="rounded-2xl border border-bd bg-bg">
              <div className="flex items-center justify-between border-b border-bd px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold">
                    Delivery
                  </h2>

                  <p className="mt-1 text-xs text-mut">
                    Shipping destination
                  </p>
                </div>

                <Truck className="size-4 text-mut" />
              </div>

              <div className="p-5">
                <div className="flex gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-bg2">
                    <MapPin className="size-4 text-mut" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {order.shipping.recipient}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-mut">
                      {order.shipping.address}
                      <br />
                      {order.shipping.area},{" "}
                      {order.shipping.city}{" "}
                      {order.shipping.postalCode}
                    </p>

                    <p className="mt-2 text-xs text-mut">
                      {order.shipping.phone}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-bg2 p-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-mut">
                        Courier
                      </p>

                      <p className="mt-1 text-xs font-semibold">
                        {order.courier.name}
                      </p>
                    </div>

                    <span className="rounded-full bg-ac/10 px-2.5 py-1 text-[10px] font-semibold text-ac">
                      {order.courier.status}
                    </span>
                  </div>

                  <div className="mt-3 border-t border-bd pt-3">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-mut">
                      Tracking ID
                    </p>

                    <p className="mt-1 text-xs font-semibold">
                      {order.courier.trackingId}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-bd px-3 py-2.5 text-xs font-semibold transition hover:bg-bg2"
                >
                  Track shipment
                  <ArrowUpRight className="size-3.5" />
                </button>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl border border-bd bg-bg">
              <div className="border-b border-bd px-5 py-4">
                <h2 className="text-sm font-semibold">
                  Payment
                </h2>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-bg2">
                    <Wallet className="size-4 text-mut" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {order.payment.method}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-ac" />

                      <span className="text-xs text-mut">
                        {order.payment.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-bg2 p-3.5">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-mut">
                    Transaction ID
                  </p>

                  <p className="mt-1 text-xs font-semibold">
                    {order.payment.transactionId}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-bd pt-4">
                  <span className="text-xs text-mut">
                    Total paid
                  </span>

                  <span className="text-base font-bold">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </section>

            {/* Quick actions */}
            <section className="rounded-2xl border border-bd bg-bg p-5">
              <p className="text-xs font-semibold">
                Quick actions
              </p>

              <div className="mt-3 space-y-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl bg-bg2 px-3.5 py-3 text-xs font-medium transition hover:bg-ac/10"
                >
                  Contact customer
                  <Phone className="size-3.5 text-mut" />
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl bg-bg2 px-3.5 py-3 text-xs font-medium transition hover:bg-ac/10"
                >
                  Update order status
                  <ChevronRight className="size-3.5 text-mut" />
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
