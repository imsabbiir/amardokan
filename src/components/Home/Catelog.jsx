"use client";
import { useState } from "react";
import { products, categories } from "@/lib/data";
import { card, btn, taka } from "@/lib/ui";
export default function Catalog() {
  const [c, setC] = useState("All");
  const list = products.filter((p) => c === "All" || p.cat === c);
  return (
    <section id="catelog" className="bg-bg2 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Products ready for you to sell.
          </h2>
          <p className="mt-4 text-lg text-mut">
            Find products with demand, choose your margin, and start selling.
          </p>
        </div>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((x) => (
            <button
              key={x}
              onClick={() => setC(x)}
              aria-pressed={c === x}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${c === x ? "border-fg bg-fg text-bg" : "border-bd bg-card text-mut"}`}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {list.map((p) => (
            <div
              key={p.name}
              className={`${card} p-4 transition hover:-translate-y-1`}
            >
              <div className="mb-3 grid h-28 place-items-center rounded-xl bg-ac2 text-5xl">
                {p.e}
              </div>
              <small className="text-xs text-mut">{p.cat}</small>
              <h3 className="mb-3 font-semibold">{p.name}</h3>
              <dl className="space-y-0.5 text-[13px] text-mut">
                {[
                  ["Supplier price", taka(p.cost)],
                  ["Sell for", taka(p.price)],
                ].map(([a, b]) => (
                  <div key={a} className="flex justify-between">
                    <dt>{a}</dt>
                    <dd className="font-semibold text-fg">{b}</dd>
                  </div>
                ))}
                <div className="flex justify-between">
                  <dt>Profit</dt>
                  <dd className="font-bold text-ok">
                    {taka(p.price - p.cost)}
                  </dd>
                </div>
              </dl>
              <button className={`${btn.ghost} mt-4 w-full py-2! text-sm`}>
                Add to Store
              </button>
            </div>
          ))}
          {!list.length && (
            <p className="col-span-full text-center text-mut">
              No sample products here yet.
            </p>
          )}
        </div>
        <div className="mt-9 text-center">
          <a href="#" className={`${btn.primary} px-6! py-4!`}>
            Explore Product Catalog
          </a>
        </div>
      </div>
    </section>
  );
}
