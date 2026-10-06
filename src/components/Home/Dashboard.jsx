/* eslint-disable react-hooks/immutability */

"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Wallet,
  BarChart3,
  Settings,
  Search,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  CircleDot,
} from "lucide-react";

import { ranges, statusMix, orders, topProducts, activity } from "@/lib/data";
import { card, btn, taka } from "@/lib/ui";

const nav = [
  [LayoutDashboard, "Dashboard"],
  [Package, "Products"],
  [ShoppingCart, "Orders"],
  [Users, "Customers"],
  [Wallet, "Wallet"],
  [BarChart3, "Analytics"],
  [Settings, "Settings"],
];

const pill = {
  Delivered: "bg-green-100 text-green-800",
  Shipped: "bg-blue-100 text-blue-800",
  Packed: "bg-indigo-100 text-indigo-800",
  Pending: "bg-amber-100 text-amber-800",
  Returned: "bg-red-100 text-red-800",
};

const line = (v, w, h, m) =>
  v
    .map(
      (y, i) =>
        `${i ? "L" : "M"}${(i / (v.length - 1)) * w} ${
          h - (y / m) * h * 0.9 - 2
        }`,
    )
    .join(" ");

function Spark({ v }) {
  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className="mt-2 h-7 w-full"
      aria-hidden
    >
      <path
        d={line(v, 100, 30, Math.max(...v))}
        fill="none"
        stroke="var(--ac)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function AreaChart({ rev, profit, labels }) {
  const W = 600;
  const H = 190;
  const m = Math.max(...rev);
  const r = line(rev, W, H, m);

  return (
    <svg
      viewBox={`0 0 ${W} ${H + 24}`}
      className="w-full"
      role="img"
      aria-label="Revenue and profit over time"
    >
      {[0, 0.5, 1].map((t) => (
        <line
          key={t}
          x1="0"
          x2={W}
          y1={H * t}
          y2={H * t}
          stroke="var(--bd)"
          strokeDasharray="3 4"
        />
      ))}

      <path d={`${r} L${W} ${H} L0 ${H}Z`} fill="var(--ac)" opacity=".08" />

      <path
        d={r}
        fill="none"
        stroke="var(--ac)"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />

      <path
        d={line(profit, W, H, m)}
        fill="none"
        stroke="var(--ok)"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />

      {labels.map((l, i) => (
        <text
          key={l}
          x={(i / (labels.length - 1)) * W}
          y={H + 18}
          fontSize="11"
          fill="var(--mut)"
          textAnchor={
            i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"
          }
        >
          {l}
        </text>
      ))}
    </svg>
  );
}

function Donut() {
  const C = 2 * Math.PI * 40;
  const t = statusMix.reduce((a, d) => a + d.n, 0);

  let off = 0;

  return (
    <svg
      viewBox="0 0 100 100"
      className="size-28 shrink-0 -rotate-90"
      role="img"
      aria-label="Order status breakdown"
    >
      {statusMix.map((d) => {
        const l = (d.n / t) * C;

        const el = (
          <circle
            key={d.k}
            r="40"
            cx="50"
            cy="50"
            fill="none"
            stroke={d.c}
            strokeWidth="14"
            strokeDasharray={`${l} ${C - l}`}
            strokeDashoffset={-off}
          />
        );

        off += l;

        return el;
      })}
    </svg>
  );
}

export default function Dashboard() {
  const [rk, setRk] = useState("30d");

  const R = ranges[rk];
  const k = R.kpi;
  const d = R.delta;

  const kpis = [
    ["Total Orders", String(k.orders), d.orders],
    ["Revenue", taka(k.revenue), d.revenue],
    ["Profit", taka(k.profit), d.profit],
    ["Delivery Rate", k.rate + "%", d.rate],
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Everything in one place.
          </h2>

          <p className="mt-4 text-lg text-mut">
            Not just a supplier — a complete seller platform.
          </p>
        </div>

        <div
          className={`${card} grid overflow-hidden lg:grid-cols-[200px_1fr]`}
        >
          <aside className="hidden border-r border-bd bg-bg2 p-3 lg:block">
            <div className="px-3 pb-4 pt-2 font-bold">Fulfilo</div>

            {nav.map(([I, l], i) => (
              <div
                key={l}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm ${
                  i === 0 ? "bg-card font-semibold shadow-sm" : "text-mut"
                }`}
              >
                <I className="size-4" />
                {l}
              </div>
            ))}

            <div className="mt-6 rounded-xl border border-bd bg-card p-3 text-xs text-mut">
              Plan
              <b className="block text-sm text-fg">Growth</b>
              Orders used: 99 / 300
              <div className="mt-2 h-1.5 rounded bg-bd">
                <div className="h-full w-1/3 rounded bg-ac" />
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-5 p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">Good morning, Rafi 👋</h3>

                <p className="text-sm text-mut">
                  Here is how your store is doing.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-2 rounded-lg border border-bd px-3 py-1.5 text-sm text-mut sm:flex">
                  <Search className="size-4" />
                  Search orders…
                </div>

                <div
                  role="tablist"
                  aria-label="Date range"
                  className="flex rounded-lg border border-bd p-0.5 text-sm"
                >
                  {Object.keys(ranges).map((x) => (
                    <button
                      key={x}
                      role="tab"
                      aria-selected={rk === x}
                      onClick={() => setRk(x)}
                      className={`rounded-md px-3 py-1 font-medium ${
                        rk === x ? "bg-fg text-bg" : "text-mut"
                      }`}
                    >
                      {x}
                    </button>
                  ))}
                </div>

                <button
                  aria-label="Notifications"
                  className="rounded-lg border border-bd p-2"
                >
                  <Bell className="size-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              {kpis.map(([l, v, dl]) => (
                <div key={l} className="rounded-xl border border-bd p-4">
                  <div className="text-xs text-mut">{l}</div>

                  <div className="text-2xl font-bold tracking-tight">{v}</div>

                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${
                      dl >= 0 ? "text-ok" : "text-red-500"
                    }`}
                  >
                    {dl >= 0 ? (
                      <ArrowUpRight className="size-3.5" />
                    ) : (
                      <ArrowDownRight className="size-3.5" />
                    )}
                    {Math.abs(dl)}% vs prev.
                  </div>

                  <Spark v={R.rev} />
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-bd p-4 lg:col-span-2">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <b>Revenue &amp; profit · {R.label}</b>

                  <span className="flex gap-3 text-xs text-mut">
                    <span className="flex items-center gap-1">
                      <i className="size-2 rounded-full bg-ac" />
                      Revenue
                    </span>

                    <span className="flex items-center gap-1">
                      <i className="size-2 rounded-full bg-ok" />
                      Profit
                    </span>
                  </span>
                </div>

                <AreaChart rev={R.rev} profit={R.profit} labels={R.labels} />
              </div>

              <div className="rounded-xl border border-bd p-4">
                <b className="text-sm">Orders by status</b>

                <div className="mt-3 flex items-center gap-4">
                  <Donut />

                  <ul className="space-y-1.5 text-xs">
                    {statusMix.map((s) => (
                      <li key={s.k} className="flex items-center gap-2">
                        <i
                          className="size-2 rounded-full"
                          style={{ background: s.c }}
                        />

                        {s.k}

                        <b className="ml-auto pl-3">{s.n}</b>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 text-xs text-mut">
                  12 orders currently in fulfillment.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-bd">
                <div className="flex items-center justify-between p-4 pb-2">
                  <b className="text-sm">Recent orders</b>

                  <a href="#" className="text-xs font-medium text-ac">
                    View all
                  </a>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-155 text-sm">
                    <thead>
                      <tr className="text-left text-xs text-mut">
                        {[
                          "Order ID",
                          "Product",
                          "Customer",
                          "Amount",
                          "Profit",
                          "Status",
                          "Date",
                        ].map((h) => (
                          <th key={h} className="px-4 py-2 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} className="border-t border-bd">
                          <td className="px-4 py-2.5 font-medium">{o.id}</td>

                          <td className="px-4">{o.p}</td>

                          <td className="px-4">{o.c}</td>

                          <td className="px-4">{taka(o.amt)}</td>

                          <td className="px-4 font-medium text-ok">
                            {taka(o.profit)}
                          </td>

                          <td className="px-4">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                pill[o.s]
                              }`}
                            >
                              {o.s}
                            </span>
                          </td>

                          <td className="px-4 text-mut">{o.d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
