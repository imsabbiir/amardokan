"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Store,
  User,
} from "lucide-react";
import { useState } from "react";

const seller = {
  name: "Sabbir Ahmed",
  email: "sabbir@example.com",
  phone: "01712 345678",
  role: "Seller",
  storeName: "Sabbir's Store",
  storeSlug: "sabbirs-store",
  location: "Dhaka, Bangladesh",
  joined: "October 2026",
  avatar: null,
};

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: seller.name,
    email: seller.email,
    phone: seller.phone,
    storeName: seller.storeName,
    location: seller.location,
  });

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-bg">
      <div className="mx-auto max-w-275 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

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
            href="/dashboard/settings"
            className="transition hover:text-fg"
          >
            Settings
          </Link>

          <ChevronRight className="size-3.5" />

          <span className="text-fg">Profile</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-ac/10">
                <User className="size-5 text-ac" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Profile
                </h1>

                <p className="mt-1 text-sm text-mut">
                  Manage your seller identity and business information.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setEditing((value) => !value)}
            className={`inline-flex h-10 w-fit items-center gap-2 rounded-xl px-4 text-sm font-semibold transition ${
              editing
                ? "border border-bd bg-bg hover:bg-bg2"
                : "bg-ac text-slate-950 hover:bg-ac/85"
            }`}
          >
            <Edit3 className="size-4" />

            {editing ? "Cancel editing" : "Edit profile"}
          </button>
        </div>

        {/* Profile hero */}
        <section className="relative mb-5 overflow-hidden rounded-2xl border border-bd bg-bg">
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 -top-24 size-72 rounded-full bg-ac/10 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-blue-500/5 blur-3xl" />
          </div>

          <div className="relative p-5 sm:p-7">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="flex size-24 items-center justify-center rounded-2xl border border-bd bg-bg2 text-2xl font-bold sm:size-28 sm:text-3xl">
                  SA
                </div>

                {editing && (
                  <button
                    type="button"
                    aria-label="Change profile photo"
                    className="absolute -bottom-2 -right-2 flex size-9 items-center justify-center rounded-xl border border-bd bg-bg shadow-sm transition hover:bg-bg2"
                  >
                    <Camera className="size-4" />
                  </button>
                )}

                <span className="absolute -bottom-1 -left-1 flex size-6 items-center justify-center rounded-full border-2 border-bg bg-ac">
                  <CheckCircle2 className="size-3.5 text-slate-950" />
                </span>
              </div>

              {/* Identity */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {formData.name}
                  </h2>

                  <span className="rounded-full bg-ac/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ac">
                    Verified seller
                  </span>
                </div>

                <p className="mt-1 text-sm text-mut">
                  {formData.storeName}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-mut">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="size-3.5" />
                    {formData.email}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {formData.location}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Store className="size-3.5" />
                    Seller account
                  </span>
                </div>
              </div>

              {/* Account status */}
              <div className="rounded-xl border border-bd bg-bg2/60 px-4 py-3 sm:min-w-42.5">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-ac" />

                  <span className="text-xs font-semibold">
                    Account active
                  </span>
                </div>

                <p className="mt-1 text-[11px] text-mut">
                  Member since {seller.joined}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main grid */}
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">

          {/* Left */}
          <div className="space-y-5">

            {/* Personal information */}
            <section className="rounded-2xl border border-bd bg-bg">
              <div className="border-b border-bd px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-semibold">
                      Personal information
                    </h2>

                    <p className="mt-1 text-xs text-mut">
                      Your personal contact information.
                    </p>
                  </div>

                  <User className="size-4 text-mut" />
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

                <ProfileField
                  label="Full name"
                  value={formData.name}
                  editing={editing}
                  onChange={(value) =>
                    updateField("name", value)
                  }
                />

                <ProfileField
                  label="Phone number"
                  value={formData.phone}
                  editing={editing}
                  onChange={(value) =>
                    updateField("phone", value)
                  }
                />

                <ProfileField
                  label="Email address"
                  value={formData.email}
                  editing={editing}
                  onChange={(value) =>
                    updateField("email", value)
                  }
                  type="email"
                />

                <ProfileField
                  label="Location"
                  value={formData.location}
                  editing={editing}
                  onChange={(value) =>
                    updateField("location", value)
                  }
                />
              </div>
            </section>

            {/* Store information */}
            <section className="rounded-2xl border border-bd bg-bg">
              <div className="border-b border-bd px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-semibold">
                      Store information
                    </h2>

                    <p className="mt-1 text-xs text-mut">
                      Information customers and AmarDokan use to identify your store.
                    </p>
                  </div>

                  <Store className="size-4 text-mut" />
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

                <ProfileField
                  label="Store name"
                  value={formData.storeName}
                  editing={editing}
                  onChange={(value) =>
                    updateField("storeName", value)
                  }
                />

                <div>
                  <label className="mb-2 block text-xs font-semibold">
                    Store URL
                  </label>

                  <div className="flex min-h-11 items-center rounded-xl border border-bd bg-bg2 px-3.5">
                    <Globe2 className="mr-2.5 size-4 shrink-0 text-mut" />

                    <span className="truncate text-sm text-mut">
                      amardokan.com/store/{seller.storeSlug}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-semibold">
                    Store status
                  </label>

                  <div className="flex items-center justify-between rounded-xl border border-bd bg-bg2/50 px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-xl bg-ac/10">
                        <CheckCircle2 className="size-4 text-ac" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold">
                          Store is active
                        </p>

                        <p className="mt-0.5 text-[11px] text-mut">
                          You can receive and fulfill new orders.
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-ac/10 px-2.5 py-1 text-[10px] font-bold text-ac">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Save changes */}
            {editing && (
              <div className="flex flex-col gap-3 rounded-2xl border border-bd bg-bg2/50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div>
                  <p className="text-xs font-semibold">
                    You have unsaved changes
                  </p>

                  <p className="mt-1 text-[11px] text-mut">
                    Save your updated profile information when you&apos;re ready.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-ac px-4 text-xs font-bold text-slate-950 transition hover:bg-ac/85"
                >
                  Save changes
                </button>
              </div>
            )}
          </div>

          {/* Right */}
          <aside className="space-y-5">

            {/* Account overview */}
            <section className="rounded-2xl border border-bd bg-bg p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-ac/10">
                  <ShieldCheck className="size-5 text-ac" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    Account overview
                  </h2>

                  <p className="mt-1 text-[11px] text-mut">
                    Your AmarDokan seller account.
                  </p>
                </div>
              </div>

              <div className="mt-5 divide-y divide-bd">
                <OverviewRow
                  label="Account type"
                  value="Seller"
                />

                <OverviewRow
                  label="Status"
                  value="Active"
                  valueClass="text-ac"
                />

                <OverviewRow
                  label="Verification"
                  value="Verified"
                  valueClass="text-ac"
                />

                <OverviewRow
                  label="Member since"
                  value="Oct 2026"
                />
              </div>
            </section>

            {/* Contact */}
            <section className="rounded-2xl border border-bd bg-bg p-5">
              <h2 className="text-sm font-semibold">
                Contact information
              </h2>

              <div className="mt-4 space-y-3">
                <ContactRow
                  icon={Mail}
                  label="Email"
                  value={formData.email}
                />

                <ContactRow
                  icon={Phone}
                  label="Phone"
                  value={formData.phone}
                />

                <ContactRow
                  icon={MapPin}
                  label="Location"
                  value={formData.location}
                />
              </div>
            </section>

            {/* Security */}
            <section className="rounded-2xl border border-bd bg-bg p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-bg2">
                  <ShieldCheck className="size-4 text-mut" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">
                    Security
                  </h2>

                  <p className="mt-1 text-[11px] leading-5 text-mut">
                    Keep your seller account protected with a strong password
                    and security settings.
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/settings"
                className="mt-4 flex items-center justify-between rounded-xl border border-bd bg-bg2/50 px-3.5 py-3 text-xs font-semibold transition hover:bg-bg2"
              >
                <span>Manage security</span>

                <ChevronRight className="size-4 text-mut" />
              </Link>
            </section>
          </aside>
        </div>

        {/* Bottom note */}
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-bd bg-bg2/40 px-4 py-4 sm:px-5">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-ac" />

          <p className="text-[11px] leading-5 text-mut">
            Your profile information is used to manage your AmarDokan seller
            account, fulfillment activity, earnings, and support requests.
          </p>
        </div>
      </div>
    </main>
  );
}

function ProfileField({
  label,
  value,
  editing,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold">
        {label}
      </label>

      {editing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-xl border border-bd bg-bg2 px-3.5 text-sm outline-none transition placeholder:text-mut/70 focus:border-ac focus:ring-4 focus:ring-ac/10"
        />
      ) : (
        <div className="flex min-h-11 items-center rounded-xl border border-bd bg-bg2/50 px-3.5 text-sm">
          {value}
        </div>
      )}
    </div>
  );
}

function OverviewRow({
  label,
  value,
  valueClass = "",
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-xs text-mut">
        {label}
      </span>

      <span className={`text-xs font-semibold ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-bd bg-bg2/40 p-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-bg">
        <Icon className="size-3.5 text-mut" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium text-mut">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}