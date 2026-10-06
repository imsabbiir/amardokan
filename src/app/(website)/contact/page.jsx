/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Send,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserRound,
} from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  category: "General Question",
  subject: "",
  orderId: "",
  message: "",
};

const categories = [
  "General Question",
  "Product & Catalog",
  "Order & Fulfillment",
  "Delivery",
  "Returns",
  "Seller Account",
  "Payment & COD",
  "Technical Support",
];

const contactMethods = [
  {
    icon: Mail,
    title: "Email support",
    description: "For questions, account help, and general support.",
    value: "support@amardokan.com",
    href: "mailto:support@amardokan.com",
    action: "Send email",
  },
  {
    icon: Phone,
    title: "Phone support",
    description: "For urgent account or order-related issues.",
    value: "+880 1XXX-XXXXXX",
    href: "tel:+8801XXXXXXXXX",
    action: "Call support",
  },
  {
    icon: MapPin,
    title: "Operations",
    description: "Our operations are based in Bangladesh.",
    value: "Dhaka, Bangladesh",
    href: null,
    action: null,
  },
];



const quickLinks = [
  {
    icon: FileQuestion,
    title: "Frequently asked questions",
    description: "Find quick answers to common seller questions.",
    href: "/#faqs",
    label: "Visit FAQs",
  },
  {
    icon: Headphones,
    title: "Seller support",
    description: "Learn more about the support available to AmarDokan sellers.",
    href: "/about",
    label: "Learn more",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    /*
      Connect this to your backend later.

      Example:

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    */

    await new Promise((resolve) => setTimeout(resolve, 800));

    setLoading(false);
    setSubmitted(true);
  }

  function handleReset() {
    setFormData(initialForm);
    setSubmitted(false);
  }

  return (
    <main className="min-h-screen bg-bg text-fg">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-bd bg-bg2">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 -top-48 size-152 rounded-full bg-ac/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-56 left-1/4 size-120 rounded-full bg-ac/5 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-5">
          <div className="grid h-auto items-center gap-14 py-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Hero copy */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-bd bg-bg px-3.5 py-2 text-xs font-semibold">
                <span className="flex size-5 items-center justify-center rounded-md bg-ac/10 text-ac">
                  <MessageCircle className="size-3.5" />
                </span>

                AmarDokan Support
              </div>

              <h1 className="max-w-4xl text-5xl font-bold tracking-[-0.045em] md:text-6xl lg:text-7xl">
                We're here to help
                <br />
                <span className="text-mut">you keep selling.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-mut md:text-lg md:leading-8">
                Have a question about products, orders, fulfillment, delivery,
                payments, or your seller account? Tell us what's happening and
                we'll help you find the next step.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#contact-form"
                  className="group inline-flex items-center gap-3 rounded-xl bg-ac px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:opacity-90"
                >
                  Contact support
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>

                <Link
                  href="/#faqs"
                  className="inline-flex items-center gap-3 rounded-xl border border-bd bg-bg px-6 py-3.5 text-sm font-semibold transition hover:border-ac"
                >
                  Browse FAQs
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-mut">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-ac" />
                  Seller-focused support
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-ac" />
                  Order assistance
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-ac" />
                  Account support
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative rounded-4xl border border-bd bg-bg p-5 shadow-2xl">
                <div className="rounded-3xl border border-bd bg-bg2 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-mut">Support center</p>
                      <h2 className="mt-1 text-lg font-bold">
                        How can we help?
                      </h2>
                    </div>

                    <div className="flex size-10 items-center justify-center rounded-xl bg-ac/10 text-ac">
                      <Headphones className="size-5" />
                    </div>
                  </div>

                  <div className="mt-7 space-y-3">
                    {[
                      {
                        icon: Package,
                        title: "Order support",
                        text: "Need help with an order?",
                      },
                      {
                        icon: Truck,
                        title: "Delivery",
                        text: "Check a delivery issue.",
                      },
                      {
                        icon: UserRound,
                        title: "Seller account",
                        text: "Need account assistance?",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="flex items-center gap-4 rounded-2xl border border-bd bg-bg p-4"
                        >
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ac/10 text-ac">
                            <Icon className="size-4" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold">
                              {item.title}
                            </p>

                            <p className="mt-0.5 text-xs text-mut">
                              {item.text}
                            </p>
                          </div>

                          <ArrowRight className="size-4 text-mut" />
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-2xl border border-ac/20 bg-ac/5 p-4">
                    <div className="flex gap-3">
                      <Clock3 className="mt-0.5 size-4 shrink-0 text-ac" />

                      <div>
                        <p className="text-xs font-semibold">
                          Support availability
                        </p>

                        <p className="mt-1 text-xs leading-5 text-mut">
                          We aim to respond to requests as soon as possible
                          during operating hours.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-bd bg-bg p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-ac/10 text-ac">
                    <ShieldCheck className="size-4" />
                  </div>

                  <div>
                    <p className="text-[11px] text-mut">Your information</p>
                    <p className="text-xs font-semibold">
                      Handled responsibly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT METHODS
      ====================================================== */}
      <section className="border-b border-bd">
        <div className="mx-auto max-w-6xl px-5 py-10 md:py-12">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-bd bg-bd md:grid-cols-3">
            {contactMethods.map((item) => {
              const Icon = item.icon;

              const content = (
                <div className="group h-full bg-bg p-6 transition hover:bg-bg2 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-11 items-center justify-center rounded-xl border border-bd bg-bg2 text-ac transition group-hover:border-ac/30">
                      <Icon className="size-4.5" />
                    </div>

                    {item.href && (
                      <ArrowUpRight className="size-4 text-mut transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                    )}
                  </div>

                  <h2 className="mt-7 text-base font-semibold">
                    {item.title}
                  </h2>

                  <p className="mt-1.5 text-sm leading-6 text-mut">
                    {item.description}
                  </p>

                  <p className="mt-5 text-sm font-semibold">
                    {item.value}
                  </p>

                  {item.action && (
                    <p className="mt-3 text-xs font-medium text-ac">
                      {item.action}
                    </p>
                  )}
                </div>
              );

              return item.href ? (
                <a key={item.title} href={item.href}>
                  {content}
                </a>
              ) : (
                <div key={item.title}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>


      

     
      {/* =====================================================
          CONTACT FORM
      ====================================================== */}
      <section
        id="contact-form"
        className="border-y border-bd scroll-mt-20 bg-bg2"
      >
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            {/* LEFT */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ac">
                Send a message
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
                Tell us what's going on.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-mut">
                Give us enough context to understand your question. If your
                request is about an order, include the order ID whenever
                possible.
              </p>

              {/* What to include */}
              <div className="mt-9">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-mut">
                  Helpful information
                </p>

                <div className="mt-4 space-y-3">
                  {[
                    "Your name and account email",
                    "Order or transaction ID if relevant",
                    "A clear description of the issue",
                    "Screenshots or supporting details when useful",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-sm text-mut"
                    >
                      <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ac/10 text-ac">
                        <Check className="size-3" />
                      </div>

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security */}
              <div className="mt-9 rounded-2xl border border-bd bg-bg p-5">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-ac" />

                  <div>
                    <p className="text-sm font-semibold">
                      Keep sensitive information private
                    </p>

                    <p className="mt-1.5 text-xs leading-5 text-mut">
                      Never include passwords, card numbers, OTPs, or other
                      highly sensitive information in this form.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-bd pt-7">
                <p className="text-sm text-mut">
                  Need a quick answer instead?
                </p>

                <Link
                  href="/#faqs"
                  className="group mt-3 inline-flex items-center gap-2 text-sm font-semibold"
                >
                  Browse frequently asked questions
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="rounded-4xl border border-bd bg-bg p-6 md:p-9 lg:p-10">
              {submitted ? (
                <SuccessState onReset={handleReset} />
              ) : (
                <>
                  

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name / Email */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        label="Full name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />

                      <FormField
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Phone / Category */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        label="Phone number"
                        name="phone"
                        type="tel"
                        placeholder="+880 1XXX-XXXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                      />

                      <FormSelect
                        label="Support category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        options={categories}
                      />
                    </div>

                    {/* Subject */}
                    <FormField
                      label="Subject"
                      name="subject"
                      type="text"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />

                    {/* Order ID */}
                    <FormField
                      label={
                        <>
                          Order or transaction ID{" "}
                          <span className="font-normal text-mut">
                            (optional)
                          </span>
                        </>
                      }
                      name="orderId"
                      type="text"
                      placeholder="e.g. AM-2048"
                      value={formData.orderId}
                      onChange={handleChange}
                    />

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-semibold"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        rows={7}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us what happened, what you need help with, and any relevant details..."
                        className="w-full resize-none rounded-xl border border-bd bg-bg px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-mut focus:border-ac"
                      />
                    </div>

                    {/* Security notice */}
                    <div className="flex items-start gap-3 rounded-xl border border-bd bg-bg2 p-4">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-ac" />

                      <p className="text-xs leading-5 text-mut">
                        Please don't include passwords, payment card numbers,
                        OTPs, or other highly sensitive information.
                      </p>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex w-full items-center justify-center gap-3 rounded-xl bg-ac px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                          Sending message...
                        </>
                      ) : (
                        <>
                          Send message
                          <Send className="size-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs leading-5 text-mut">
                      By submitting this form, you agree that AmarDokan may
                      use the information you provide to respond to your
                      request.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          QUICK HELP
      ====================================================== */}
      <section className="">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ac">
              Before you contact us
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] md:text-4xl">
              You might find the answer faster.
            </h2>

            <p className="mt-4 text-base leading-7 text-mut">
              Explore our resources for common questions about selling,
              fulfillment, delivery, and your AmarDokan account.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center justify-between rounded-3xl border border-bd bg-bg2 p-6 transition hover:-translate-y-1 hover:border-ac/50 md:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ac/10 text-ac">
                      <Icon className="size-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold">{item.title}</h3>

                      <p className="mt-1.5 max-w-sm text-sm leading-6 text-mut">
                        {item.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-ac">
                        {item.label}
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight className="hidden size-4 text-mut transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-11.5 w-full rounded-xl border border-bd bg-bg px-4 text-sm outline-none transition placeholder:text-mut focus:border-ac"
      />
    </div>
  );
}

/* =========================================================
   FORM SELECT
========================================================= */

function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="h-11.5 w-full appearance-none rounded-xl border border-bd bg-bg px-4 text-sm outline-none transition focus:border-ac"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   SUCCESS STATE
========================================================= */

function SuccessState({ onReset }) {
  return (
    <div className="flex min-h-162.5 flex-col items-center justify-center text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-ac/10 text-ac">
        <CheckCircle2 className="size-8" />
      </div>

      <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-ac">
        Message received
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
        Thanks for reaching out.
      </h2>

      <p className="mt-4 max-w-md text-sm leading-7 text-mut">
        Your support request has been received. Our team will review the
        information and get back to you as soon as possible.
      </p>

      <div className="mt-8 rounded-2xl border border-bd bg-bg2 p-5 text-left">
        <div className="flex gap-3">
          <Clock3 className="mt-0.5 size-4 shrink-0 text-ac" />

          <div>
            <p className="text-sm font-semibold">
              What happens next?
            </p>

            <p className="mt-1 text-xs leading-5 text-mut">
              We'll review your message and respond through the contact
              information you provided.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-bd px-5 py-3 text-sm font-semibold transition hover:border-ac"
        >
          Send another message
        </button>

        <Link
          href="/"
          className="rounded-xl bg-ac px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}