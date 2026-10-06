
"use client";

import Link from "next/link";
import {
  Bell,
  Check,
  ChevronRight,
  CreditCard,
  Globe2,
  KeyRound,
  LockKeyhole,
  LogOut,
  MapPin,
  Package,
  RotateCcw,
  Save,
  ShieldCheck,
  Store,
  Truck,
  User,
  Wallet,
  AlertTriangle,
  Smartphone,
  Mail,
  MessageSquare,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const sections = [
  {
    id: "general",
    label: "General",
    description: "Store and business preferences",
    icon: Store,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Choose what you want to receive",
    icon: Bell,
  },
  {
    id: "fulfillment",
    label: "Fulfillment",
    description: "Delivery and order preferences",
    icon: Truck,
  },
  {
    id: "payments",
    label: "Payments & Earnings",
    description: "Payout and payment preferences",
    icon: Wallet,
  },
  {
    id: "security",
    label: "Security",
    description: "Password and account security",
    icon: ShieldCheck,
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    storeName: "Sabbir's Store",
    storeEmail: "sabbir@example.com",
    phone: "01712 345678",
    location: "Dhaka, Bangladesh",
    language: "English",
    timezone: "Asia/Dhaka",

    emailOrders: true,
    emailDelivery: true,
    emailPayments: true,
    emailInventory: true,
    emailMarketing: false,

    smsOrders: true,
    smsDelivery: true,
    smsPayments: false,

    autoConfirmOrders: false,
    allowPartialFulfillment: true,
    codEnabled: true,
    returnNotifications: true,

    payoutMethod: "bKash",
    payoutNumber: "01712 345678",
    payoutFrequency: "Weekly",

    twoFactor: false,
  });

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const saveChanges = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-bg">
      <div className="mx-auto max-w-300 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs text-mut">
            <Link
              href="/dashboard"
              className="transition hover:text-fg"
            >
              Overview
            </Link>

            <ChevronRight className="size-3.5" />

            <span className="text-fg">
              Settings
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-ac/10">
                  <ShieldCheck className="size-5 text-ac" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Settings
                  </h1>

                  <p className="mt-1 text-sm text-mut">
                    Manage your store, fulfillment, notifications, payments,
                    and account security.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={saveChanges}
              className="inline-flex h-10 w-fit items-center gap-2 rounded-xl bg-ac px-4 text-sm font-semibold text-slate-950 transition hover:bg-ac/85"
            >
              {saved ? (
                <>
                  <Check className="size-4" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Settings layout */}
        <div className="grid gap-5 lg:grid-cols-[250px_1fr]">

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-bd bg-bg p-2 lg:sticky lg:top-24">
            <div className="mb-2 px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-mut">
                Settings
              </p>
            </div>

            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const active = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      active
                        ? "bg-fg text-bg"
                        : "text-mut hover:bg-bg2 hover:text-fg"
                    }`}
                  >
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                        active ? "bg-bg/10" : "bg-bg2"
                      }`}
                    >
                      <Icon className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold">
                        {section.label}
                      </p>

                      <p
                        className={`mt-0.5 truncate text-[10px] ${
                          active
                            ? "text-bg/60"
                            : "text-mut"
                        }`}
                      >
                        {section.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Profile shortcut */}
            <div className="mt-3 border-t border-bd pt-3">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-mut transition hover:bg-bg2 hover:text-fg"
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-bg2 text-[10px] font-bold">
                  SA
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold">
                    My profile
                  </p>

                  <p className="mt-0.5 truncate text-[10px] text-mut">
                    Sabbir Ahmed
                  </p>
                </div>

                <ChevronRight className="size-4" />
              </Link>
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0">

            {/* GENERAL */}
            {activeSection === "general" && (
              <div className="space-y-5">

                <SettingsCard
                  icon={Store}
                  title="Store information"
                  description="Manage the basic information used for your AmarDokan seller account."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Store name"
                      value={settings.storeName}
                      onChange={(value) =>
                        updateSetting("storeName", value)
                      }
                    />

                    <Field
                      label="Business email"
                      type="email"
                      value={settings.storeEmail}
                      onChange={(value) =>
                        updateSetting("storeEmail", value)
                      }
                    />

                    <Field
                      label="Phone number"
                      value={settings.phone}
                      onChange={(value) =>
                        updateSetting("phone", value)
                      }
                    />

                    <Field
                      label="Business location"
                      value={settings.location}
                      onChange={(value) =>
                        updateSetting("location", value)
                      }
                    />
                  </div>
                </SettingsCard>

                <SettingsCard
                  icon={Globe2}
                  title="Regional preferences"
                  description="Choose how information is displayed in your dashboard."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField
                      label="Language"
                      value={settings.language}
                      onChange={(value) =>
                        updateSetting("language", value)
                      }
                      options={[
                        "English",
                        "বাংলা",
                      ]}
                    />

                    <SelectField
                      label="Timezone"
                      value={settings.timezone}
                      onChange={(value) =>
                        updateSetting("timezone", value)
                      }
                      options={[
                        "Asia/Dhaka",
                        "Asia/Kolkata",
                        "UTC",
                      ]}
                    />
                  </div>
                </SettingsCard>

                <InfoBanner
                  icon={MapPin}
                  title="Bangladesh operations"
                  description="Your account is currently configured for Bangladesh-based fulfillment and Dhaka timezone settings."
                />
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeSection === "notifications" && (
              <div className="space-y-5">

                <SettingsCard
                  icon={Mail}
                  title="Email notifications"
                  description="Choose which business updates should be sent to your email."
                >
                  <div className="divide-y divide-bd">
                    <ToggleRow
                      icon={Package}
                      title="New orders"
                      description="Get notified whenever a new customer order is received."
                      checked={settings.emailOrders}
                      onChange={(value) =>
                        updateSetting("emailOrders", value)
                      }
                    />

                    <ToggleRow
                      icon={Truck}
                      title="Delivery updates"
                      description="Receive updates when orders are shipped, out for delivery, or delivered."
                      checked={settings.emailDelivery}
                      onChange={(value) =>
                        updateSetting("emailDelivery", value)
                      }
                    />

                    <ToggleRow
                      icon={Wallet}
                      title="Payment updates"
                      description="Get notified about completed payments and earnings."
                      checked={settings.emailPayments}
                      onChange={(value) =>
                        updateSetting("emailPayments", value)
                      }
                    />

                    <ToggleRow
                      icon={Package}
                      title="Inventory alerts"
                      description="Receive alerts when products are running low."
                      checked={settings.emailInventory}
                      onChange={(value) =>
                        updateSetting("emailInventory", value)
                      }
                    />

                    <ToggleRow
                      icon={MessageSquare}
                      title="Product and platform updates"
                      description="Occasional news, product launches, and AmarDokan updates."
                      checked={settings.emailMarketing}
                      onChange={(value) =>
                        updateSetting("emailMarketing", value)
                      }
                    />
                  </div>
                </SettingsCard>

                <SettingsCard
                  icon={Smartphone}
                  title="SMS notifications"
                  description="Important operational alerts sent to your phone."
                >
                  <div className="divide-y divide-bd">
                    <ToggleRow
                      icon={Package}
                      title="New orders"
                      description="Get an SMS when a new order requires your attention."
                      checked={settings.smsOrders}
                      onChange={(value) =>
                        updateSetting("smsOrders", value)
                      }
                    />

                    <ToggleRow
                      icon={Truck}
                      title="Delivery updates"
                      description="Receive important delivery status changes."
                      checked={settings.smsDelivery}
                      onChange={(value) =>
                        updateSetting("smsDelivery", value)
                      }
                    />

                    <ToggleRow
                      icon={Wallet}
                      title="Payment updates"
                      description="Receive payment and earnings alerts by SMS."
                      checked={settings.smsPayments}
                      onChange={(value) =>
                        updateSetting("smsPayments", value)
                      }
                    />
                  </div>
                </SettingsCard>

                <InfoBanner
                  icon={Bell}
                  title="Notification preferences"
                  description="Critical account and security notifications may still be sent even when optional notifications are disabled."
                />
              </div>
            )}

            {/* FULFILLMENT */}
            {activeSection === "fulfillment" && (
              <div className="space-y-5">

                <SettingsCard
                  icon={Package}
                  title="Order fulfillment"
                  description="Control how your orders move through the AmarDokan fulfillment process."
                >
                  <div className="divide-y divide-bd">
                    <ToggleRow
                      icon={Check}
                      title="Auto-confirm new orders"
                      description="Automatically send eligible orders to fulfillment without manual confirmation."
                      checked={settings.autoConfirmOrders}
                      onChange={(value) =>
                        updateSetting("autoConfirmOrders", value)
                      }
                    />

                    <ToggleRow
                      icon={Package}
                      title="Allow partial fulfillment"
                      description="Allow an order to be fulfilled when some items are temporarily unavailable."
                      checked={settings.allowPartialFulfillment}
                      onChange={(value) =>
                        updateSetting(
                          "allowPartialFulfillment",
                          value
                        )
                      }
                    />

                    <ToggleRow
                      icon={RotateCcw}
                      title="Return notifications"
                      description="Get notified whenever a customer return or failed delivery requires attention."
                      checked={settings.returnNotifications}
                      onChange={(value) =>
                        updateSetting(
                          "returnNotifications",
                          value
                        )
                      }
                    />
                  </div>
                </SettingsCard>

                <SettingsCard
                  icon={Truck}
                  title="Delivery preferences"
                  description="Your default delivery configuration."
                >
                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-xs font-semibold">
                        Default delivery area
                      </label>

                      <div className="flex min-h-11 items-center gap-2 rounded-xl border border-bd bg-bg2 px-3.5 text-sm">
                        <MapPin className="size-4 text-mut" />
                        Nationwide Bangladesh
                      </div>

                      <p className="mt-1.5 text-[11px] text-mut">
                        Delivery availability depends on the customer&apos;s address.
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold">
                        Preferred courier
                      </label>

                      <SelectField
                        value="Pathao Courier"
                        onChange={() => {}}
                        options={[
                          "Pathao Courier",
                          "Steadfast Courier",
                          "RedX",
                          "Use AmarDokan recommendation",
                        ]}
                      />
                    </div>
                  </div>
                </SettingsCard>

                <SettingsCard
                  icon={CreditCard}
                  title="Cash on delivery"
                  description="Manage your COD selling preference."
                >
                  <ToggleRow
                    icon={CreditCard}
                    title="Accept cash on delivery"
                    description="Allow customers to place orders using COD where delivery is available."
                    checked={settings.codEnabled}
                    onChange={(value) =>
                      updateSetting("codEnabled", value)
                    }
                  />
                </SettingsCard>
              </div>
            )}

            {/* PAYMENTS */}
            {activeSection === "payments" && (
              <div className="space-y-5">

                <SettingsCard
                  icon={Wallet}
                  title="Payout settings"
                  description="Configure where your AmarDokan earnings should be sent."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField
                      label="Payout method"
                      value={settings.payoutMethod}
                      onChange={(value) =>
                        updateSetting(
                          "payoutMethod",
                          value
                        )
                      }
                      options={[
                        "bKash",
                        "Nagad",
                        "Bank Account",
                      ]}
                    />

                    <Field
                      label="Payout number / account"
                      value={settings.payoutNumber}
                      onChange={(value) =>
                        updateSetting(
                          "payoutNumber",
                          value
                        )
                      }
                    />

                    <SelectField
                      label="Payout frequency"
                      value={settings.payoutFrequency}
                      onChange={(value) =>
                        updateSetting(
                          "payoutFrequency",
                          value
                        )
                      }
                      options={[
                        "Weekly",
                        "Bi-weekly",
                        "Monthly",
                      ]}
                    />
                  </div>
                </SettingsCard>

                {/* Earnings status */}
                <section className="rounded-2xl border border-bd bg-bg p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ac/10">
                      <Check className="size-5 text-ac" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-semibold">
                          Payout account verified
                        </h2>

                        <span className="rounded-full bg-ac/10 px-2 py-1 text-[10px] font-bold text-ac">
                          Verified
                        </span>
                      </div>

                      <p className="mt-1.5 text-xs leading-5 text-mut">
                        Your payout information has been verified and is ready
                        to receive seller earnings.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <MiniStat
                      label="Method"
                      value={settings.payoutMethod}
                    />

                    <MiniStat
                      label="Schedule"
                      value={settings.payoutFrequency}
                    />

                    <MiniStat
                      label="Status"
                      value="Active"
                      valueClass="text-ac"
                    />
                  </div>
                </section>

                <InfoBanner
                  icon={Wallet}
                  title="Earnings are calculated after fulfillment"
                  description="Delivered orders are added to your earnings according to your seller agreement and applicable fulfillment fees."
                />
              </div>
            )}

            {/* SECURITY */}
            {activeSection === "security" && (
              <div className="space-y-5">

                <SettingsCard
                  icon={KeyRound}
                  title="Password"
                  description="Keep your AmarDokan account protected with a strong password."
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold">
                        Password
                      </p>

                      <p className="mt-1 text-[11px] text-mut">
                        Last changed more than 30 days ago.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="inline-flex h-10 w-fit items-center gap-2 rounded-xl border border-bd bg-bg2 px-4 text-xs font-semibold transition hover:bg-bg"
                    >
                      <KeyRound className="size-3.5" />
                      Change password
                    </button>
                  </div>
                </SettingsCard>

                <SettingsCard
                  icon={ShieldCheck}
                  title="Two-factor authentication"
                  description="Add another layer of protection to your seller account."
                >
                  <ToggleRow
                    icon={ShieldCheck}
                    title="Enable two-factor authentication"
                    description="Require a verification code when signing in from a new device."
                    checked={settings.twoFactor}
                    onChange={(value) =>
                      updateSetting("twoFactor", value)
                    }
                  />

                  {!settings.twoFactor && (
                    <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                      <div className="flex gap-3">
                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />

                        <div>
                          <p className="text-xs font-semibold text-amber-700">
                            Your account is using password-only protection
                          </p>

                          <p className="mt-1 text-[11px] leading-5 text-amber-700/70">
                            We recommend enabling two-factor authentication
                            to protect your seller account.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </SettingsCard>

                {/* Active sessions */}
                <section className="rounded-2xl border border-bd bg-bg">
                  <div className="border-b border-bd px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <LockKeyhole className="size-4 text-mut" />

                      <div>
                        <h2 className="text-sm font-semibold">
                          Active sessions
                        </h2>

                        <p className="mt-1 text-xs text-mut">
                          Devices currently signed in to your account.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-bd">
                    <SessionRow
                      device="Windows · Firefox"
                      location="Dhaka, Bangladesh"
                      current
                    />

                    <SessionRow
                      device="Android · Chrome"
                      location="Dhaka, Bangladesh"
                    />
                  </div>

                  <div className="border-t border-bd p-4 sm:p-5">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 transition hover:text-red-700"
                    >
                      <LogOut className="size-3.5" />
                      Sign out of all other sessions
                    </button>
                  </div>
                </section>

                <InfoBanner
                  icon={ShieldCheck}
                  title="Security notifications cannot be disabled"
                  description="Important login, password, verification, and security alerts will always be sent to protect your account."
                />
              </div>
            )}

            {/* Danger zone */}
            <section className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/2.5">
              <div className="border-b border-red-500/10 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-red-500/10">
                    <AlertTriangle className="size-4 text-red-600" />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">
                      Danger zone
                    </h2>

                    <p className="mt-1 text-xs text-mut">
                      Actions here may affect your seller account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <p className="text-xs font-semibold">
                    Deactivate seller account
                  </p>

                  <p className="mt-1 max-w-xl text-[11px] leading-5 text-mut">
                    Temporarily stop receiving new orders while keeping your
                    account information and earnings history.
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex h-10 w-fit shrink-0 items-center gap-2 rounded-xl border border-red-500/20 bg-bg px-4 text-xs font-semibold text-red-600 transition hover:bg-red-500/5"
                >
                  <Trash2 className="size-3.5" />
                  Deactivate account
                </button>
              </div>
            </section>

          </div>
        </div>

        {/* Mobile save bar */}
        <div className="sticky bottom-3 z-20 mt-6 lg:hidden">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-bd bg-bg/95 p-3 shadow-lg backdrop-blur-xl">
            <div className="min-w-0">
              <p className="text-xs font-semibold">
                Settings
              </p>

              <p className="truncate text-[10px] text-mut">
                Save your latest changes
              </p>
            </div>

            <button
              type="button"
              onClick={saveChanges}
              className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl bg-ac px-3.5 text-xs font-bold text-slate-950"
            >
              {saved ? (
                <>
                  <Check className="size-3.5" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="size-3.5" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}

/* -------------------------------------------------
   Reusable components
------------------------------------------------- */

function SettingsCard({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-2xl border border-bd bg-bg">
      <div className="border-b border-bd px-5 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-bg2">
            <Icon className="size-4 text-mut" />
          </div>

          <div>
            <h2 className="text-sm font-semibold">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-mut">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-bd bg-bg2 px-3.5 text-sm outline-none transition placeholder:text-mut/70 focus:border-ac focus:ring-4 focus:ring-ac/10"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-xs font-semibold">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full appearance-none rounded-xl border border-bd bg-bg2 px-3.5 text-sm outline-none transition focus:border-ac focus:ring-4 focus:ring-ac/10"
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

function ToggleRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 hidden size-8 shrink-0 items-center justify-center rounded-lg bg-bg2 sm:flex">
          <Icon className="size-3.5 text-mut" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold">
            {title}
          </p>

          <p className="mt-1 max-w-xl text-[11px] leading-5 text-mut">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? "bg-ac"
            : "bg-bd"
        }`}
      >
        <span
          className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function InfoBanner({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-bd bg-bg2/40 p-4 sm:p-5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-bg">
        <Icon className="size-4 text-ac" />
      </div>

      <div>
        <p className="text-xs font-semibold">
          {title}
        </p>

        <p className="mt-1 text-[11px] leading-5 text-mut">
          {description}
        </p>
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  valueClass = "",
}) {
  return (
    <div className="rounded-xl border border-bd bg-bg2/40 p-3">
      <p className="text-[10px] font-medium text-mut">
        {label}
      </p>

      <p className={`mt-1 text-xs font-semibold ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

function SessionRow({
  device,
  location,
  current = false,
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-bg2">
          <Smartphone className="size-4 text-mut" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold">
              {device}
            </p>

            {current && (
              <span className="rounded-full bg-ac/10 px-2 py-0.5 text-[9px] font-bold text-ac">
                Current
              </span>
            )}
          </div>

          <p className="mt-1 text-[10px] text-mut">
            {location}
          </p>
        </div>
      </div>

      {current && (
        <span className="flex size-2 shrink-0 rounded-full bg-ac" />
      )}
    </div>
  );
}
