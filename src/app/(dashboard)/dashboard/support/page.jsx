/* eslint-disable react/no-unescaped-entities */

"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  HelpCircle,
  Mail,
  MessageCircle,
  Package,
  Phone,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Truck,
  Wallet,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

const helpTopics = [
  {
    id: "orders",
    title: "Orders & Fulfillment",
    description:
      "Get help with order confirmation, packing, processing, and fulfillment.",
    icon: Package,
    articles: 12,
  },
  {
    id: "delivery",
    title: "Delivery & Tracking",
    description:
      "Learn about courier delivery, tracking, failed deliveries, and COD.",
    icon: Truck,
    articles: 9,
  },
  {
    id: "earnings",
    title: "Earnings & Payments",
    description:
      "Understand seller earnings, payouts, fees, and payment reports.",
    icon: Wallet,
    articles: 8,
  },
  {
    id: "account",
    title: "Account & Security",
    description:
      "Manage your seller profile, password, security, and account settings.",
    icon: ShieldCheck,
    articles: 7,
  },
];

const popularQuestions = [
  {
    id: 1,
    question: "How do I place a new customer order?",
    category: "Orders",
  },
  {
    id: 2,
    question: "How long does delivery usually take?",
    category: "Delivery",
  },
  {
    id: 3,
    question: "When will my earnings be available?",
    category: "Payments",
  },
  {
    id: 4,
    question: "How can I track a customer's order?",
    category: "Delivery",
  },
  {
    id: 5,
    question: "What happens if a customer refuses COD?",
    category: "Orders",
  },
  {
    id: 6,
    question: "How do I change my payout information?",
    category: "Payments",
  },
];

const tickets = [
  {
    id: "SUP-2048",
    subject: "Order #AM-10471 is still processing",
    category: "Order issue",
    status: "In progress",
    date: "Oct 06, 2026",
    lastReply: "18 min ago",
  },
  {
    id: "SUP-2039",
    subject: "Question about payout schedule",
    category: "Payments",
    status: "Resolved",
    date: "Oct 04, 2026",
    lastReply: "Oct 04",
  },
  {
    id: "SUP-2018",
    subject: "Customer delivery address update",
    category: "Delivery",
    status: "Resolved",
    date: "Sep 30, 2026",
    lastReply: "Sep 30",
  },
];

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const [showTicketModal, setShowTicketModal] = useState(false);

  const filteredQuestions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return popularQuestions;

    return popularQuestions.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-bg">
      <div className="mx-auto max-w-300 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-mut">
          <Link
            href="/dashboard"
            className="transition hover:text-fg"
          >
            Overview
          </Link>

          <ChevronRight className="size-3.5" />

          <span className="text-fg">
            Need Help
          </span>
        </div>

        {/* Hero */}
        <section className="relative mb-6 overflow-hidden rounded-2xl border border-bd bg-bg">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 -top-28 size-80 rounded-full bg-ac/10 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-blue-500/5 blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative px-5 py-10 text-center sm:px-8 sm:py-14">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-ac/10">
              <HelpCircle className="size-6 text-ac" />
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              How can we help?
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-mut">
              Find answers, learn how AmarDokan works, or contact our support
              team when you need a hand with your business.
            </p>

            {/* Search */}
            <div className="relative mx-auto mt-7 max-w-2xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mut" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for an answer..."
                className="h-14 w-full rounded-2xl border border-bd bg-bg2 pl-12 pr-4 text-sm outline-none shadow-sm transition placeholder:text-mut/70 focus:border-ac focus:ring-4 focus:ring-ac/10"
              />
            </div>

            <p className="mt-3 text-[11px] text-mut">
              Try searching for "delivery", "payout", "order", or "COD"
            </p>
          </div>
        </section>

        {/* Support status */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <StatusCard
            icon={MessageCircle}
            title="Live support"
            description="Available now"
            accent
          />

          <StatusCard
            icon={Clock3}
            title="Average response"
            description="Under 2 hours"
          />

          <StatusCard
            icon={BookOpen}
            title="Help center"
            description="36+ useful articles"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_330px]">

          {/* Main */}
          <div className="min-w-0 space-y-6">

            {/* Help topics */}
            <section>
              <div className="mb-4">
                <h2 className="text-base font-semibold">
                  Browse help topics
                </h2>

                <p className="mt-1 text-xs text-mut">
                  Find guides and answers for the most common seller tasks.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {helpTopics.map((topic) => {
                  const Icon = topic.icon;

                  return (
                    <Link
                      key={topic.id}
                      href={`/dashboard/support/${topic.id}`}
                      className="group rounded-2xl border border-bd bg-bg p-5 transition hover:-translate-y-0.5 hover:border-ac/30 hover:bg-bg2/40"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-bg2 transition group-hover:bg-ac/10">
                          <Icon className="size-4 text-mut transition group-hover:text-ac" />
                        </div>

                        <ArrowUpRight className="size-4 text-mut transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                      </div>

                      <h3 className="mt-4 text-sm font-semibold">
                        {topic.title}
                      </h3>

                      <p className="mt-1.5 text-xs leading-5 text-mut">
                        {topic.description}
                      </p>

                      <div className="mt-4 text-[10px] font-semibold text-mut">
                        {topic.articles} articles
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Popular questions */}
            <section className="overflow-hidden rounded-2xl border border-bd bg-bg">
              <div className="border-b border-bd px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-bg2">
                    <BookOpen className="size-4 text-mut" />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">
                      Popular questions
                    </h2>

                    <p className="mt-1 text-xs text-mut">
                      Quick answers to common seller questions.
                    </p>
                  </div>
                </div>
              </div>

              {filteredQuestions.length ? (
                <div className="divide-y divide-bd">
                  {filteredQuestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-bg2/60 sm:px-6"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-medium transition group-hover:text-ac">
                          {item.question}
                        </p>

                        <p className="mt-1 text-[10px] text-mut">
                          {item.category}
                        </p>
                      </div>

                      <ChevronRight className="size-4 shrink-0 text-mut transition group-hover:translate-x-0.5 group-hover:text-fg" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-12 text-center">
                  <Search className="mx-auto size-5 text-mut" />

                  <p className="mt-3 text-sm font-semibold">
                    No answers found
                  </p>

                  <p className="mt-1 text-xs text-mut">
                    Try another search or contact our support team.
                  </p>
                </div>
              )}
            </section>

            {/* Tickets */}
            <section className="overflow-hidden rounded-2xl border border-bd bg-bg">
              <div className="border-b border-bd px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-sm font-semibold">
                      Your support requests
                    </h2>

                    <p className="mt-1 text-xs text-mut">
                      Track questions and issues you've sent to our team.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowTicketModal(true)}
                    className="inline-flex h-9 w-fit items-center gap-2 rounded-xl bg-ac px-3.5 text-xs font-bold text-slate-950 transition hover:bg-ac/85"
                  >
                    <Plus className="size-3.5" />
                    New request
                  </button>
                </div>
              </div>

              <div className="divide-y divide-bd">
                {tickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    type="button"
                    className="group flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-bg2/60 sm:px-6"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-bg2">
                      <MessageCircle className="size-4 text-mut" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-xs font-semibold">
                          {ticket.subject}
                        </p>

                        <TicketStatus status={ticket.status} />
                      </div>

                      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-mut">
                        <span>{ticket.id}</span>
                        <span>{ticket.category}</span>
                        <span>Last reply {ticket.lastReply}</span>
                      </div>
                    </div>

                    <ChevronRight className="size-4 shrink-0 text-mut transition group-hover:translate-x-0.5 group-hover:text-fg" />
                  </button>
                ))}
              </div>

              <div className="border-t border-bd px-5 py-4 text-center sm:px-6">
                <button
                  type="button"
                  className="text-xs font-semibold text-mut transition hover:text-fg"
                >
                  View all support requests
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">

            {/* Contact support */}
            <section className="rounded-2xl border border-bd bg-bg p-5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-ac/10">
                <MessageCircle className="size-5 text-ac" />
              </div>

              <h2 className="mt-4 text-sm font-semibold">
                Still need help?
              </h2>

              <p className="mt-1.5 text-xs leading-5 text-mut">
                Our support team is here to help you with orders, delivery,
                payments, and your AmarDokan account.
              </p>

              <button
                type="button"
                onClick={() => setShowTicketModal(true)}
                className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-ac text-xs font-bold text-slate-950 transition hover:bg-ac/85"
              >
                <Send className="size-3.5" />
                Contact support
              </button>
            </section>

            {/* Contact methods */}
            <section className="rounded-2xl border border-bd bg-bg p-5">
              <h2 className="text-sm font-semibold">
                Contact options
              </h2>

              <div className="mt-4 space-y-2">
                <ContactOption
                  icon={MessageCircle}
                  title="Live chat"
                  description="Usually replies within minutes"
                />

                <ContactOption
                  icon={Mail}
                  title="Email support"
                  description="support@amardokan.com"
                />

                <ContactOption
                  icon={Phone}
                  title="Seller support"
                  description="Available during business hours"
                />
              </div>
            </section>

            {/* Support hours */}
            <section className="rounded-2xl border border-bd bg-bg2/50 p-5">
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 size-4 text-mut" />

                <div>
                  <h2 className="text-xs font-semibold">
                    Support hours
                  </h2>

                  <div className="mt-3 space-y-2 text-[11px] text-mut">
                    <div className="flex justify-between gap-5">
                      <span>Saturday – Thursday</span>
                      <span className="font-medium text-fg">
                        9 AM – 10 PM
                      </span>
                    </div>

                    <div className="flex justify-between gap-5">
                      <span>Friday</span>
                      <span className="font-medium text-fg">
                        2 PM – 10 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Helpful links */}
            <section className="rounded-2xl border border-bd bg-bg p-5">
              <h2 className="text-sm font-semibold">
                Helpful links
              </h2>

              <div className="mt-3 space-y-1">
                <HelpfulLink
                  href="/dashboard/orders"
                  icon={Package}
                  label="Manage orders"
                />

                <HelpfulLink
                  href="/dashboard/inventory"
                  icon={Package}
                  label="Check inventory"
                />

                <HelpfulLink
                  href="/dashboard/earnings"
                  icon={Wallet}
                  label="View earnings"
                />

                <HelpfulLink
                  href="/dashboard/settings"
                  icon={ShieldCheck}
                  label="Account settings"
                />
              </div>
            </section>
          </aside>
        </div>

        {/* Bottom CTA */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-bd bg-fg text-bg">
          <div className="flex flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <p className="text-xs font-semibold text-ac">
                AmarDokan Seller Support
              </p>

              <h2 className="mt-1.5 text-lg font-bold tracking-tight">
                We're here to help you grow.
              </h2>

              <p className="mt-1 text-xs text-bg/60">
                Don't hesitate to reach out when something isn't working as expected.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowTicketModal(true)}
              className="inline-flex h-10 w-fit shrink-0 items-center gap-2 rounded-xl bg-ac px-4 text-xs font-bold text-slate-950 transition hover:bg-ac/85"
            >
              Contact support
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>
        </section>
      </div>

      {/* New ticket modal */}
      {showTicketModal && (
        <NewTicketModal
          onClose={() => setShowTicketModal(false)}
        />
      )}
    </main>
  );
}

/* -------------------------------------------------
   Components
------------------------------------------------- */

function StatusCard({
  icon: Icon,
  title,
  description,
  accent = false,
}) {
  return (
    <div className="rounded-2xl border border-bd bg-bg p-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex size-9 items-center justify-center rounded-xl ${
            accent ? "bg-ac/10" : "bg-bg2"
          }`}
        >
          <Icon
            className={`size-4 ${
              accent ? "text-ac" : "text-mut"
            }`}
          />
        </div>

        <div>
          <p className="text-[11px] font-medium text-mut">
            {title}
          </p>

          <p
            className={`mt-0.5 text-xs font-semibold ${
              accent ? "text-ac" : ""
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function TicketStatus({ status }) {
  const resolved = status === "Resolved";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold ${
        resolved
          ? "bg-ac/10 text-ac"
          : "bg-amber-500/10 text-amber-600"
      }`}
    >
      {resolved ? (
        <CheckCircle2 className="size-3" />
      ) : (
        <Clock3 className="size-3" />
      )}

      {status}
    </span>
  );
}

function ContactOption({
  icon: Icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-3 rounded-xl border border-bd bg-bg2/40 p-3 text-left transition hover:bg-bg2"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-bg">
        <Icon className="size-3.5 text-mut transition group-hover:text-ac" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[10px] text-mut">
          {description}
        </p>
      </div>

      <ChevronRight className="size-3.5 shrink-0 text-mut" />
    </button>
  );
}

function HelpfulLink({
  href,
  icon: Icon,
  label,
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl px-2.5 py-2.5 transition hover:bg-bg2"
    >
      <span className="flex items-center gap-2.5">
        <Icon className="size-3.5 text-mut transition group-hover:text-ac" />

        <span className="text-xs font-medium">
          {label}
        </span>
      </span>

      <ChevronRight className="size-3.5 text-mut transition group-hover:translate-x-0.5" />
    </Link>
  );
}

function NewTicketModal({ onClose }) {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Order issue");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    /*
      Connect this form to your API later:

      POST /api/support/tickets

      {
        subject,
        category,
        message
      }
    */

    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl border border-bd bg-bg shadow-2xl sm:max-w-lg sm:rounded-2xl">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-bd px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-base font-bold">
              Contact support
            </h2>

            <p className="mt-1 text-xs text-mut">
              Tell us what you need help with.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-mut transition hover:bg-bg2 hover:text-fg"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-ac/10">
              <CheckCircle2 className="size-6 text-ac" />
            </div>

            <h3 className="mt-4 text-sm font-bold">
              Request submitted
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-mut">
              Your support request has been received. Our team will get back
              to you as soon as possible.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-fg px-4 py-2.5 text-xs font-semibold text-bg transition hover:opacity-90"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-5 sm:p-6"
          >
            <div>
              <label className="mb-2 block text-xs font-semibold">
                Subject
              </label>

              <input
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What do you need help with?"
                className="h-11 w-full rounded-xl border border-bd bg-bg2 px-3.5 text-sm outline-none transition placeholder:text-mut/70 focus:border-ac focus:ring-4 focus:ring-ac/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 w-full rounded-xl border border-bd bg-bg2 px-3.5 text-sm outline-none transition focus:border-ac focus:ring-4 focus:ring-ac/10"
              >
                <option>Order issue</option>
                <option>Delivery</option>
                <option>Payment</option>
                <option>Inventory</option>
                <option>Account</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold">
                Message
              </label>

              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the issue or question..."
                rows={5}
                className="w-full resize-none rounded-xl border border-bd bg-bg2 px-3.5 py-3 text-sm outline-none transition placeholder:text-mut/70 focus:border-ac focus:ring-4 focus:ring-ac/10"
              />
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="h-10 rounded-xl border border-bd bg-bg px-4 text-xs font-semibold transition hover:bg-bg2"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-ac px-4 text-xs font-bold text-slate-950 transition hover:bg-ac/85"
              >
                <Send className="size-3.5" />
                Send request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
