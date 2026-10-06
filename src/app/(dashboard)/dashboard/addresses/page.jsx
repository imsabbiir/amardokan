"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Check,
  ChevronRight,
  X,
} from "lucide-react";

const initialAddresses = [
  {
    id: 1,
    name: "Sabbir Ahmed",
    phone: "+880 1712 345678",
    address: "House 24, Road 5, Dhanmondi",
    city: "Dhaka",
    division: "Dhaka",
    postalCode: "1205",
    type: "Home",
    default: true,
  },
  {
    id: 2,
    name: "Sabbir Ahmed",
    phone: "+880 1712 345678",
    address: "House 12, Road 3, Mirpur",
    city: "Dhaka",
    division: "Dhaka",
    postalCode: "1216",
    type: "Office",
    default: false,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showForm, setShowForm] = useState(false);

  const setDefault = (id) => {
    setAddresses((items) =>
      items.map((item) => ({
        ...item,
        default: item.id === id,
      }))
    );
  };

  const removeAddress = (id) => {
    setAddresses((items) => items.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="mb-8">
          <Link
            href="/account"
            className="mb-5 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-slate-950"
          >
            Account
            <ChevronRight className="h-4 w-4" />
            Addresses
          </Link>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-medium text-[#719b32]">
                Delivery
              </p>

              <h1 className="text-3xl font-semibold tracking-tight">
                My Addresses
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage your saved delivery addresses.
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" />
              Add New Address
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`rounded-2xl border bg-white p-5 sm:p-6 ${
                address.default
                  ? "border-[#a3db4a]"
                  : "border-stone-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#a3db4a]/15">
                    <MapPin className="h-5 w-5 text-[#719b32]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold">
                        {address.type}
                      </h2>

                      {address.default && (
                        <span className="rounded-full bg-[#a3db4a]/20 px-2 py-1 text-[10px] font-semibold text-[#638c25]">
                          DEFAULT
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm font-medium">
                      {address.name}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
                  <button
                    className="rounded-lg p-2 text-slate-400 hover:bg-stone-100 hover:text-slate-950"
                    aria-label="Edit address"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => removeAddress(address.id)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                    aria-label="Delete address"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-5 border-t border-stone-100 pt-5 text-sm leading-6 text-slate-500">
                <p>{address.phone}</p>
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.division} -{" "}
                  {address.postalCode}
                </p>
              </div>

              {!address.default && (
                <button
                  onClick={() => setDefault(address.id)}
                  className="mt-5 flex items-center gap-2 text-sm font-medium text-[#719b32] hover:text-[#587c27]"
                >
                  <Check className="h-4 w-4" />
                  Set as default
                </button>
              )}
            </div>
          ))}
        </div>

        {addresses.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white px-6 py-20 text-center">
            <MapPin className="mx-auto h-10 w-10 text-slate-300" />

            <h2 className="mt-4 font-semibold">
              No saved addresses
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Add an address to make checkout faster.
            </p>
          </div>
        )}

        {/* Add Address Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    Add New Address
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Add a delivery address to your account.
                  </p>
                </div>

                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-stone-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Full Name" placeholder="Sabbir Ahmed" />
                <Input label="Phone Number" placeholder="+880 1XXX XXXXXX" />
                <Input
                  label="Address"
                  placeholder="House, Road, Area"
                  className="sm:col-span-2"
                />
                <Input label="City" placeholder="Dhaka" />
                <Input label="Postal Code" placeholder="1205" />
                <Input label="Division" placeholder="Dhaka" />
                <Input label="Address Type" placeholder="Home" />
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-stone-200 py-3 text-sm font-medium hover:bg-stone-50"
                >
                  Cancel
                </button>

                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl bg-slate-950 py-3 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Save Address
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Input({ label, placeholder, className = "" }) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <input
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-stone-200 px-3 text-sm outline-none transition focus:border-[#a3db4a]"
      />
    </label>
  );
}