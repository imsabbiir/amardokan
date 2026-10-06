
"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ChevronRight } from "lucide-react";

const wishlist = [
  {
    id: 1,
    name: "Premium Oversized Hoodie",
    category: "Hoodies",
    price: 1290,
    oldPrice: 1490,
    image: "/images/products/hoodie.jpg",
    available: true,
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    category: "Jackets",
    price: 1590,
    oldPrice: 1890,
    image: "/images/products/jacket.jpg",
    available: true,
  },
  {
    id: 3,
    name: "Essential Sweatshirt",
    category: "Sweatshirts",
    price: 1890,
    image: "/images/products/sweatshirt.jpg",
    available: true,
  },
  {
    id: 4,
    name: "Winter Knit Cap",
    category: "Accessories",
    price: 990,
    image: "/images/products/cap.jpg",
    available: false,
  },
];

function formatPrice(price) {
  return `৳${price.toLocaleString("en-BD")}`;
}

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="mb-8">
          <Link
            href="/account"
            className="mb-5 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-slate-950"
          >
            Account
            <ChevronRight className="h-4 w-4" />
            Wishlist
          </Link>

          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="mb-2 text-sm font-medium text-[#719b32]">
                Saved For Later
              </p>

              <h1 className="text-3xl font-semibold tracking-tight">
                My Wishlist
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {wishlist.length} products saved to your wishlist.
              </p>
            </div>

            <Link
              href="/products"
              className="hidden rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 sm:block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {wishlist.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {wishlist.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-stone-200 bg-white"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <button
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-red-500 shadow-sm"
                    aria-label="Remove from wishlist"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>

                  {!product.available && (
                    <div className="absolute inset-x-0 bottom-0 bg-slate-950/75 px-3 py-2 text-center text-xs font-medium text-white">
                      Currently unavailable
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    {product.category}
                  </p>

                  <h2 className="mt-1 line-clamp-1 text-sm font-medium">
                    {product.name}
                  </h2>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {formatPrice(product.price)}
                    </span>

                    {product.oldPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 py-2.5 text-xs font-medium text-white hover:bg-slate-800"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      View Product
                    </Link>

                    <button
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-stone-200 text-slate-400 hover:border-red-200 hover:text-red-500"
                      aria-label="Delete wishlist item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white px-6 py-20 text-center">
            <Heart className="mx-auto h-10 w-10 text-slate-300" />

            <h2 className="mt-4 font-semibold">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Save products you love and find them here later.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white"
            >
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}