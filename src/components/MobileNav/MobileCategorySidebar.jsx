"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  ChevronDown,
  ChevronRight,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
} from "lucide-react";

export default function MobileCategorySidebar({
  isOpen,
  onClose,
  categories = [],
  cartItems = [],
}) {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (id) => {
    setOpenCategory((current) => (current === id ? null : id));
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-[2px] transition-opacity duration-300 sm:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Explore
            </h2>

            <p className="text-xs text-slate-500">
              Categories & your cart
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Preview */}
        <div className="shrink-0 border-b border-slate-200 bg-slate-50 px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#a3db4a]/20 text-slate-900">
                <ShoppingBag size={18} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-950">
                  Your Cart
                </h3>

                <p className="text-[11px] text-slate-500">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </p>
              </div>
            </div>

            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center gap-1 text-xs font-semibold text-slate-700"
            >
              View Cart
              <ArrowRight size={14} />
            </Link>
          </div>

          {cartItems.length > 0 ? (
            <>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {cartItems.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <Image
                      src={item.image}
                      alt={item.name || "Cart product"}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />

                    <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-950 px-1 text-[9px] font-bold text-white">
                      {item.quantity || 1}
                    </span>
                  </div>
                ))}

                {cartItems.length > 4 && (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-xs font-semibold text-slate-500">
                    +{cartItems.length - 4}
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Cart total
                </span>

                <span className="text-sm font-bold text-slate-950">
                  ৳{cartTotal.toLocaleString()}
                </span>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-5 text-center">
              <ShoppingBag
                size={25}
                className="mx-auto mb-2 text-slate-300"
              />

              <p className="text-xs font-medium text-slate-500">
                Your cart is empty
              </p>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="px-4 pb-6 pt-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Shop Categories
              </h3>

              <Link
                href="/products"
                onClick={onClose}
                className="text-xs font-semibold text-[#6b9d18]"
              >
                View All
              </Link>
            </div>

            <div className="space-y-1">
              {categories.map((category) => {
                const isCategoryOpen =
                  openCategory === category.id;

                return (
                  <div
                    key={category.id}
                    className="overflow-hidden rounded-xl"
                  >
                    {/* Category */}
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className={`flex w-full items-center justify-between px-3 py-3 text-left transition ${
                        isCategoryOpen
                          ? "bg-[#a3db4a]/15 text-slate-950"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        {category.image ? (
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                            {category.name?.charAt(0)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {category.name}
                          </p>

                          {category.subcategories?.length > 0 && (
                            <p className="mt-0.5 text-[10px] text-slate-400">
                              {category.subcategories.length} subcategories
                            </p>
                          )}
                        </div>
                      </div>

                      {category.subcategories?.length > 0 ? (
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-slate-400 transition-transform ${
                            isCategoryOpen ? "rotate-180" : ""
                          }`}
                        />
                      ) : (
                        <ChevronRight
                          size={17}
                          className="shrink-0 text-slate-400"
                        />
                      )}
                    </button>

                    {/* Subcategories */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-200 ${
                        isCategoryOpen
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="ml-6 border-l border-slate-200 py-1 pl-4">
                          {category.subcategories?.map(
                            (subcategory) => (
                              <Link
                                key={subcategory.id}
                                href={`/category/${subcategory.slug}`}
                                onClick={onClose}
                                className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
                              >
                                <span>
                                  {subcategory.name}
                                </span>

                                <ChevronRight
                                  size={15}
                                  className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-600"
                                />
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Cart Button */}
        <div className="shrink-0 border-t border-slate-200 bg-white p-4">
          <Link
            href="/cart"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <ShoppingBag size={18} />

            Go to Cart

            {cartCount > 0 && (
              <span className="rounded-full bg-[#a3db4a] px-2 py-0.5 text-xs font-bold text-slate-950">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}