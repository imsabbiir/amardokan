
"use client";

import { useState } from "react";
import {
  Settings,
  Store,
  ShoppingCart,
  Truck,
  Bell,
  ShieldCheck,
  Globe,
  Save,
  RotateCcw,
  CheckCircle2,
  Info,
  ChevronRight,
  Eye,
  EyeOff,
  Clock,
  Package,
  Wallet,
  LockKeyhole,
  Mail,
  Smartphone,
  CircleHelp,
} from "lucide-react";

const initialSettings = {
  storeName: "AmarDokan",
  storeEmail: "support@amardokan.com",
  storePhone: "+880 1XXX-XXXXXX",
  storeAddress: "Dhaka, Bangladesh",
  currency: "BDT",
  timezone: "Asia/Dhaka",
  language: "en",
  orderPrefix: "AD",
  autoConfirmOrders: false,
  requirePhoneVerification: true,
  allowGuestCheckout: true,
  lowStockThreshold: "5",
  defaultDeliveryFee: "60",
  insideDhakaFee: "60",
  outsideDhakaFee: "120",
  freeDeliveryThreshold: "2000",
  codEnabled: true,
  emailNotifications: true,
  newOrderAlerts: true,
  lowStockAlerts: true,
  payoutAlerts: true,
  securityAlerts: true,
  twoFactorRequired: false,
  sessionTimeout: "30",
  maintenanceMode: false,
};

const sections = [
  { id: "general", label: "General", icon: Store },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "delivery", label: "Delivery", icon: Truck },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
];

function Field({ label, hint, children }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6">
      <div>
        <label className="text-sm font-semibold text-[#1d2327]">
          {label}
        </label>
        {hint && (
          <p className="mt-1 text-xs leading-5 text-[#646970]">{hint}</p>
        )}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm text-[#1d2327] outline-none transition placeholder:text-[#8c8f94] focus:border-[#2271b1] focus:ring-2 focus:ring-blue-100"
    />
  );
}

function SelectInput({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm text-[#1d2327] outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-blue-100"
    >
      {children}
    </select>
  );
}

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#1d2327]">{label}</p>
        {description && (
          <p className="mt-1 text-xs leading-5 text-[#646970]">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#78a936]" : "bg-[#c3c4c7]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
            checked ? "left-5.5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3 border-b border-[#f0f0f1] pb-5">
      <div className="rounded-xl bg-[#eef6e1] p-2.5 text-[#527d1b]">
        <Icon size={20} />
      </div>
      <div>
        <h2 className="text-base font-bold text-[#1d2327]">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-[#646970]">{description}</p>
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeSection, setActiveSection] = useState("general");
  const [saved, setSaved] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  function updateSetting(key, value) {
    setSettings((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function saveSettings(event) {
    event.preventDefault();

    // Demo only: replace this with an authenticated server action or API call.
    setSaved(true);
  }

  function resetSettings() {
    setSettings(initialSettings);
    setSaved(false);
    setShowResetConfirm(false);
  }

  const activeLabel =
    sections.find((section) => section.id === activeSection)?.label ||
    "General";

  return (
    <div className="min-h-screen space-y-6 bg-[#f6f7f7] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#646970]">
            <span>Admin</span>
            <span>/</span>
            <span>System</span>
            <span>/</span>
            <span className="text-[#2271b1]">Settings</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#eaf4d8] p-3 text-[#4d7618]">
              <Settings size={25} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Settings
              </h1>
              <p className="mt-1 text-sm text-[#646970]">
                Configure your store, operations, delivery, and admin
                preferences.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#c3c4c7] bg-white px-4 py-2.5 text-sm font-semibold text-[#2c3338] transition hover:bg-gray-50"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button
            type="submit"
            form="admin-settings-form"
            className="inline-flex items-center gap-2 rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-semibold text-[#20320b] transition hover:bg-[#91c93b]"
          >
            <Save size={17} />
            Save settings
          </button>
        </div>
      </div>

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-[#d6e6bb] bg-[#f6fbea] p-4">
        <Info size={19} className="mt-0.5 shrink-0 text-[#527d1b]" />
        <div>
          <p className="text-sm font-semibold text-[#355314]">
            Settings preview
          </p>
          <p className="mt-1 text-sm leading-6 text-[#526345]">
            Changes currently stay in this page&apos;s React state. Saving does not
            persist them to MongoDB or change live store behavior.
          </p>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <CheckCircle2 size={20} />
          <div>
            <p className="text-sm font-semibold">Demo settings submitted</p>
            <p className="mt-1 text-xs">
              Connect a backend before treating these values as saved
              production settings.
            </p>
          </div>
        </div>
      )}

      <form id="admin-settings-form" onSubmit={saveSettings}>
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Navigation */}
          <aside className="rounded-xl border border-[#dcdcde] bg-white p-3">
            <div className="px-3 pb-3 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#646970]">
                Settings menu
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
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition ${
                      active
                        ? "bg-[#eef6e1] font-semibold text-[#365814]"
                        : "text-[#50575e] hover:bg-[#f6f7f7]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} />
                      {section.label}
                    </span>
                    <ChevronRight
                      size={16}
                      className={active ? "text-[#527d1b]" : "text-[#c3c4c7]"}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="mx-2 my-4 border-t border-[#f0f0f1]" />

            <button
              type="button"
              onClick={() => setShowAdvanced((value) => !value)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[#50575e] hover:bg-[#f6f7f7]"
            >
              Advanced options
              <ChevronRight
                size={16}
                className={`transition ${showAdvanced ? "rotate-90" : ""}`}
              />
            </button>

            {showAdvanced && (
              <div className="mt-1 space-y-1 px-3 pb-2 text-xs leading-5 text-[#646970]">
                <p>Environment: Development preview</p>
                <p>Configuration storage: Local component state</p>
                <p>Backend persistence: Not connected</p>
              </div>
            )}

            <div className="mt-4 rounded-lg bg-[#f6f7f7] p-3">
              <div className="flex items-center gap-2 text-[#50575e]">
                <CircleHelp size={17} />
                <span className="text-sm font-semibold">Need help?</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#646970]">
                Review your production environment before changing operational
                or security settings.
              </p>
            </div>
          </aside>

          {/* Settings content */}
          <div className="min-w-0 space-y-6">
            {/* General */}
            {activeSection === "general" && (
              <>
                <section className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-6">
                  <SectionHeader
                    icon={Store}
                    title="Store information"
                    description="Basic information used across your AmarDokan admin and storefront."
                  />

                  <div className="mt-6 space-y-6">
                    <Field label="Store name" hint="Your platform display name.">
                      <TextInput
                        value={settings.storeName}
                        onChange={(e) =>
                          updateSetting("storeName", e.target.value)
                        }
                        placeholder="Your store name"
                      />
                    </Field>

                    <Field label="Support email" hint="Customer support contact.">
                      <TextInput
                        value={settings.storeEmail}
                        onChange={(e) =>
                          updateSetting("storeEmail", e.target.value)
                        }
                        type="email"
                        placeholder="support@example.com"
                      />
                    </Field>

                    <Field label="Support phone" hint="Public customer support number.">
                      <TextInput
                        value={settings.storePhone}
                        onChange={(e) =>
                          updateSetting("storePhone", e.target.value)
                        }
                        placeholder="+880..."
                      />
                    </Field>

                    <Field label="Business address" hint="Your business location.">
                      <TextInput
                        value={settings.storeAddress}
                        onChange={(e) =>
                          updateSetting("storeAddress", e.target.value)
                        }
                        placeholder="City, country"
                      />
                    </Field>
                  </div>
                </section>

                <section className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-6">
                  <SectionHeader
                    icon={Globe}
                    title="Regional preferences"
                    description="Choose the currency, timezone, and language used in the admin panel."
                  />

                  <div className="mt-6 space-y-6">
                    <Field label="Currency" hint="Default display currency.">
                      <SelectInput
                        value={settings.currency}
                        onChange={(e) =>
                          updateSetting("currency", e.target.value)
                        }
                      >
                        <option value="BDT">BDT — Bangladeshi Taka (৳)</option>
                        <option value="USD">USD — US Dollar ($)</option>
                        <option value="INR">INR — Indian Rupee (₹)</option>
                      </SelectInput>
                    </Field>

                    <Field label="Timezone" hint="Used when displaying timestamps.">
                      <SelectInput
                        value={settings.timezone}
                        onChange={(e) =>
                          updateSetting("timezone", e.target.value)
                        }
                      >
                        <option value="Asia/Dhaka">Asia/Dhaka (UTC+6)</option>
                        <option value="UTC">UTC</option>
                        <option value="Asia/Kolkata">Asia/Kolkata (UTC+5:30)</option>
                      </SelectInput>
                    </Field>

                    <Field label="Admin language">
                      <SelectInput
                        value={settings.language}
                        onChange={(e) =>
                          updateSetting("language", e.target.value)
                        }
                      >
                        <option value="en">English</option>
                        <option value="bn">বাংলা</option>
                      </SelectInput>
                    </Field>
                  </div>
                </section>
              </>
            )}

            {/* Orders */}
            {activeSection === "orders" && (
              <section className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-6">
                <SectionHeader
                  icon={ShoppingCart}
                  title="Order settings"
                  description="Set default order handling and basic checkout rules."
                />

                <div className="mt-6 space-y-6">
                  <Field label="Order number prefix" hint="Example: AD-10001">
                    <TextInput
                      value={settings.orderPrefix}
                      onChange={(e) =>
                        updateSetting("orderPrefix", e.target.value)
                      }
                      placeholder="AD"
                    />
                  </Field>

                  <div className="border-t border-[#f0f0f1]" />

                  <Toggle
                    checked={settings.autoConfirmOrders}
                    onChange={(value) =>
                      updateSetting("autoConfirmOrders", value)
                    }
                    label="Automatically confirm orders"
                    description="Allow eligible orders to skip manual confirmation. Configure eligibility rules on the backend."
                  />

                  <div className="border-t border-[#f0f0f1]" />

                  <Toggle
                    checked={settings.requirePhoneVerification}
                    onChange={(value) =>
                      updateSetting("requirePhoneVerification", value)
                    }
                    label="Require phone verification"
                    description="Require a verified phone number before placing an order."
                  />

                  <div className="border-t border-[#f0f0f1]" />

                  <Toggle
                    checked={settings.allowGuestCheckout}
                    onChange={(value) =>
                      updateSetting("allowGuestCheckout", value)
                    }
                    label="Allow guest checkout"
                    description="Let customers place orders without creating an account."
                  />

                  <div className="border-t border-[#f0f0f1]" />

                  <Field
                    label="Low stock threshold"
                    hint="Show a low-stock warning at or below this quantity."
                  >
                    <TextInput
                      value={settings.lowStockThreshold}
                      onChange={(e) =>
                        updateSetting("lowStockThreshold", e.target.value)
                      }
                      type="number"
                      placeholder="5"
                    />
                  </Field>
                </div>
              </section>
            )}

            {/* Delivery */}
            {activeSection === "delivery" && (
              <>
                <section className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-6">
                  <SectionHeader
                    icon={Truck}
                    title="Delivery charges"
                    description="Configure example delivery fees for your Bangladesh storefront."
                  />

                  <div className="mt-6 space-y-6">
                    <Field
                      label="Default delivery fee (৳)"
                      hint="Fallback fee when a specific zone does not apply."
                    >
                      <TextInput
                        value={settings.defaultDeliveryFee}
                        onChange={(e) =>
                          updateSetting("defaultDeliveryFee", e.target.value)
                        }
                        type="number"
                      />
                    </Field>

                    <Field label="Inside Dhaka (৳)">
                      <TextInput
                        value={settings.insideDhakaFee}
                        onChange={(e) =>
                          updateSetting("insideDhakaFee", e.target.value)
                        }
                        type="number"
                      />
                    </Field>

                    <Field label="Outside Dhaka (৳)">
                      <TextInput
                        value={settings.outsideDhakaFee}
                        onChange={(e) =>
                          updateSetting("outsideDhakaFee", e.target.value)
                        }
                        type="number"
                      />
                    </Field>

                    <Field
                      label="Free delivery threshold (৳)"
                      hint="Set the minimum order value for free delivery."
                    >
                      <TextInput
                        value={settings.freeDeliveryThreshold}
                        onChange={(e) =>
                          updateSetting("freeDeliveryThreshold", e.target.value)
                        }
                        type="number"
                      />
                    </Field>
                  </div>
                </section>

                <section className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-6">
                  <SectionHeader
                    icon={Wallet}
                    title="Payment on delivery"
                    description="Choose whether cash on delivery is available."
                  />

                  <div className="mt-6">
                    <Toggle
                      checked={settings.codEnabled}
                      onChange={(value) => updateSetting("codEnabled", value)}
                      label="Enable cash on delivery"
                      description="Allow eligible customers to pay the courier on delivery."
                    />
                  </div>

                  <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                    Courier rates and cash-on-delivery availability should be
                    validated against the selected courier service. These
                    values do not update courier integrations.
                  </div>
                </section>
              </>
            )}

            {/* Notifications */}
            {activeSection === "notifications" && (
              <section className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-6">
                <SectionHeader
                  icon={Bell}
                  title="Notification preferences"
                  description="Choose which types of administrative events should trigger alerts."
                />

                <div className="mt-6 space-y-6">
                  <Toggle
                    checked={settings.emailNotifications}
                    onChange={(value) =>
                      updateSetting("emailNotifications", value)
                    }
                    label="Email notifications"
                    description="Enable administrative email alerts when an email provider is configured."
                  />

                  <div className="border-t border-[#f0f0f1]" />

                  <Toggle
                    checked={settings.newOrderAlerts}
                    onChange={(value) =>
                      updateSetting("newOrderAlerts", value)
                    }
                    label="New order alerts"
                    description="Notify admins when new orders arrive."
                  />

                  <div className="border-t border-[#f0f0f1]" />

                  <Toggle
                    checked={settings.lowStockAlerts}
                    onChange={(value) =>
                      updateSetting("lowStockAlerts", value)
                    }
                    label="Low stock alerts"
                    description="Alert admins when product stock reaches the configured threshold."
                  />

                  <div className="border-t border-[#f0f0f1]" />

                  <Toggle
                    checked={settings.payoutAlerts}
                    onChange={(value) =>
                      updateSetting("payoutAlerts", value)
                    }
                    label="Seller payout alerts"
                    description="Notify admins about payout requests and processing failures."
                  />

                  <div className="border-t border-[#f0f0f1]" />

                  <Toggle
                    checked={settings.securityAlerts}
                    onChange={(value) =>
                      updateSetting("securityAlerts", value)
                    }
                    label="Security alerts"
                    description="Notify admins about relevant authentication and security events."
                  />
                </div>
              </section>
            )}

            {/* Security */}
            {activeSection === "security" && (
              <>
                <section className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-6">
                  <SectionHeader
                    icon={ShieldCheck}
                    title="Admin security"
                    description="Review recommended controls for protecting administrative access."
                  />

                  <div className="mt-6 space-y-6">
                    <Toggle
                      checked={settings.twoFactorRequired}
                      onChange={(value) =>
                        updateSetting("twoFactorRequired", value)
                      }
                      label="Require two-factor authentication"
                      description="A production implementation must enforce this on the authentication server."
                    />

                    <div className="border-t border-[#f0f0f1]" />

                    <Field
                      label="Session timeout"
                      hint="Desired idle timeout, in minutes."
                    >
                      <SelectInput
                        value={settings.sessionTimeout}
                        onChange={(e) =>
                          updateSetting("sessionTimeout", e.target.value)
                        }
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">60 minutes</option>
                        <option value="120">120 minutes</option>
                      </SelectInput>
                    </Field>
                  </div>
                </section>

                <section className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-6">
                  <SectionHeader
                    icon={LockKeyhole}
                    title="Security checklist"
                    description="Important protections to implement on the server."
                  />

                  <div className="mt-5 space-y-4">
                    {[
                      "Enforce role-based access control for every admin API.",
                      "Validate settings and permissions on the server.",
                      "Keep API keys and payment secrets out of client-side code.",
                      "Record privileged changes in immutable audit logs.",
                      "Rate-limit authentication and sensitive operations.",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-[#6c9d2e]"
                        />
                        <p className="text-sm leading-6 text-[#50575e]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Maintenance mode, shared across sections */}
            <section className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-amber-50 p-2.5 text-amber-700">
                  <Clock size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold">Maintenance mode</h2>
                  <p className="mt-1 text-sm leading-6 text-[#646970]">
                    Preview a setting for temporarily restricting storefront
                    access during planned maintenance.
                  </p>
                  <div className="mt-5">
                    <Toggle
                      checked={settings.maintenanceMode}
                      onChange={(value) =>
                        updateSetting("maintenanceMode", value)
                      }
                      label="Enable maintenance mode"
                      description="This toggle does not block storefront access until you implement server-side enforcement."
                    />
                  </div>
                  {settings.maintenanceMode && (
                    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
                      Maintenance mode is enabled in this preview only. Your
                      live storefront remains unaffected.
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Footer actions */}
            <div className="flex flex-col justify-between gap-3 rounded-xl border border-[#dcdcde] bg-white p-4 sm:flex-row sm:items-center sm:px-5">
              <p className="text-xs leading-5 text-[#646970]">
                Editing: <span className="font-semibold">{activeLabel}</span>
                {" · "}Remember to review changes before deploying.
              </p>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a3db4a] px-5 py-2.5 text-sm font-semibold text-[#20320b] transition hover:bg-[#91c93b]"
              >
                <Save size={17} />
                Save settings
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Reset confirmation */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowResetConfirm(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            className="w-full max-w-md rounded-2xl border border-[#dcdcde] bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <RotateCcw size={22} />
            </div>

            <h2 id="reset-title" className="mt-4 text-lg font-bold">
              Reset settings?
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#646970]">
              This will restore all fields to the original demo values. This
              action cannot undo changes already saved by a future backend.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="rounded-lg border border-[#c3c4c7] px-4 py-2.5 text-sm font-semibold text-[#2c3338] hover:bg-[#f6f7f7]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={resetSettings}
                className="rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-semibold text-[#20320b] hover:bg-[#91c93b]"
              >
                Reset settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
