"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Search, Package, Clock3, CheckCircle2,
  XCircle, Eye, ShieldCheck, X,
} from "lucide-react";

const initialItems = [
  { id: "PRD-1004", name: "Minimal Ceramic Mug", seller: "Daily Needs BD", category: "Home & Living", price: 350, submitted: "2026-10-08", status: "Pending", description: "Minimal ceramic mug for everyday use." },
  { id: "PRD-1006", name: "Portable LED Desk Lamp", seller: "Tech Zone BD", category: "Electronics", price: 890, submitted: "2026-10-07", status: "Pending", description: "Compact LED desk lamp for home and office." },
  { id: "PRD-1010", name: "Everyday Canvas Tote Bag", seller: "Sabbir Fashion", category: "Fashion", price: 420, submitted: "2026-10-06", status: "Pending", description: "Reusable canvas tote bag for daily use." },
  { id: "PRD-1011", name: "Hydrating Face Cream", seller: "Nusrat Beauty", category: "Beauty", price: 590, submitted: "2026-10-05", status: "Pending", description: "Daily moisturizing face cream." },
];

const money = (n) => `৳${Number(n).toLocaleString("en-BD")}`;

function Badge({ children, tone = "amber" }) {
  const styles = {
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    green: "bg-green-50 text-green-700 ring-green-200",
    red: "bg-red-50 text-red-700 ring-red-200",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[tone]}`}>{children}</span>;
}

export default function PendingProductsPage() {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [notice, setNotice] = useState("");

  const filtered = items.filter((p) =>
    [p.id, p.name, p.seller, p.category].some((v) => v.toLowerCase().includes(search.toLowerCase().trim()))
  );

  function decide() {
    if (!confirm) return;
    const { id, action } = confirm;
    setItems((old) => old.map((p) => p.id === id ? { ...p, status: action === "approve" ? "Approved" : "Rejected" } : p));
    setNotice(`${id} ${action === "approve" ? "approved" : "rejected"} in this demo.`);
    setConfirm(null);
    setSelected(null);
  }

  const pendingCount = items.filter((p) => p.status === "Pending").length;

  return (
    <div className="min-h-screen bg-[#f0f0f1] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-350 space-y-6">
        <div className="flex items-center gap-2 text-sm text-[#646970]">
          <Link href="/admin" className="hover:text-[#2271b1]">Dashboard</Link><span>/</span>
          <Link href="/admin/products" className="hover:text-[#2271b1]">Products</Link><span>/</span>
          <span className="text-[#1d2327]">Pending approval</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/admin/products" className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#2271b1] hover:underline"><ArrowLeft size={16} /> All products</Link>
            <h1 className="text-2xl font-bold sm:text-3xl">Pending Product Approval</h1>
            <p className="mt-2 text-sm text-[#646970]">Review product information before allowing products to be published.</p>
          </div>
          <div className="rounded-xl border border-[#dcdcde] bg-white p-4">
            <p className="text-sm text-[#646970]">Awaiting review</p>
            <p className="mt-1 text-2xl font-bold">{pendingCount}</p>
          </div>
        </div>

        {notice && <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800"><span className="flex items-center gap-2"><CheckCircle2 size={17} />{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss"><X size={16} /></button></div>}

        <section className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
          <div className="flex flex-col gap-3 border-b border-[#dcdcde] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div><h2 className="font-bold">Review queue</h2><p className="mt-1 text-sm text-[#646970]">{filtered.length} product(s) found</p></div>
            <div className="relative sm:w-80">
              <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646970]" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search product or seller..." className="w-full rounded-lg border border-[#8c8f94] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#2271b1]" />
            </div>
          </div>

          {filtered.length ? (
            <div className="divide-y divide-[#f0f0f1]">
              {filtered.map((p) => (
                <article key={p.id} className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#dcdcde] bg-[#f6f7f7] text-[#646970]"><Package size={21} /></div>
                    <div className="min-w-0">
                      <Link href={`/admin/products/${p.id}`} className="font-bold hover:text-[#2271b1]">{p.name}</Link>
                      <p className="mt-1 text-xs text-[#646970]">{p.id} · {p.category}</p>
                      <p className="mt-2 text-sm">Seller: <span className="font-semibold">{p.seller}</span></p>
                      <p className="mt-1 text-xs text-[#646970]">Submitted: {p.submitted}</p>
                      <p className="mt-2 line-clamp-2 text-sm text-[#646970]">{p.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
                    <div className="space-y-2 lg:text-right">
                      <p className="text-lg font-bold">{money(p.price)}</p>
                      {p.status === "Pending" ? <Badge>Pending review</Badge> : p.status === "Approved" ? <Badge tone="green">Approved</Badge> : <Badge tone="red">Rejected</Badge>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setSelected(p)} className="inline-flex items-center gap-2 rounded-lg border border-[#dcdcde] px-3 py-2 text-sm font-semibold hover:bg-gray-50"><Eye size={15} /> Review</button>
                      {p.status === "Pending" && <>
                        <button onClick={() => setConfirm({ id: p.id, action: "approve" })} className="inline-flex items-center gap-2 rounded-lg bg-[#a3db4a] px-3 py-2 text-sm font-bold hover:bg-[#8fc934]"><CheckCircle2 size={15} /> Approve</button>
                        <button onClick={() => setConfirm({ id: p.id, action: "reject" })} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"><XCircle size={15} /> Reject</button>
                      </>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="px-6 py-16 text-center"><CheckCircle2 size={36} className="mx-auto text-green-600" /><h3 className="mt-3 font-bold">No products found</h3><p className="mt-1 text-sm text-[#646970]">Try another search or review the completed applications.</p></div>
          )}
        </section>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-amber-700" /><div><h3 className="font-bold text-amber-900">Approval checklist</h3><p className="mt-1 text-sm leading-6 text-amber-800">Check image rights, product description, pricing, prohibited items, seller status and duplicate listings. If rejecting a product, record a reason and notify the seller.</p></div></div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between"><div><p className="text-xs uppercase tracking-wide text-[#646970]">Product review</p><h2 className="mt-1 text-xl font-bold">{selected.name}</h2><p className="mt-1 text-sm text-[#646970]">{selected.id}</p></div><button onClick={() => setSelected(null)} aria-label="Close" className="rounded-lg p-2 hover:bg-gray-100"><X size={18} /></button></div>
            <div className="mt-5 space-y-4">
              <div className="flex h-36 items-center justify-center rounded-xl border border-dashed border-[#dcdcde] bg-[#f6f7f7]"><Package size={38} className="text-[#646970]" /><span className="ml-2 text-sm text-[#646970]">Product image placeholder</span></div>
              <div className="grid grid-cols-2 gap-4 text-sm"><div><p className="text-[#646970]">Seller</p><p className="mt-1 font-semibold">{selected.seller}</p></div><div><p className="text-[#646970]">Category</p><p className="mt-1 font-semibold">{selected.category}</p></div><div><p className="text-[#646970]">Price</p><p className="mt-1 font-semibold">{money(selected.price)}</p></div><div><p className="text-[#646970]">Submitted</p><p className="mt-1 font-semibold">{selected.submitted}</p></div></div>
              <div><p className="text-sm font-semibold">Description</p><p className="mt-1 text-sm leading-6 text-[#646970]">{selected.description}</p></div>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-[#dcdcde] pt-4">
              <button onClick={() => setSelected(null)} className="rounded-lg border border-[#dcdcde] px-4 py-2.5 text-sm font-semibold">Close</button>
              {selected.status === "Pending" && <>
                <button onClick={() => setConfirm({ id: selected.id, action: "reject" })} className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700">Reject</button>
                <button onClick={() => setConfirm({ id: selected.id, action: "approve" })} className="rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-bold">Approve</button>
              </>}
            </div>
          </div>
        </div>
      )}

      {confirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">{confirm.action === "approve" ? "Approve this product?" : "Reject this product?"}</h2>
            <p className="mt-2 text-sm leading-6 text-[#646970]">{confirm.action === "approve" ? "Confirm that the product meets catalog and compliance requirements." : "In production, provide a rejection reason so the seller can correct the listing."}</p>
            <div className="mt-6 flex justify-end gap-2"><button onClick={() => setConfirm(null)} className="rounded-lg border border-[#dcdcde] px-4 py-2.5 text-sm font-semibold">Cancel</button><button onClick={decide} className={`rounded-lg px-4 py-2.5 text-sm font-bold text-white ${confirm.action === "approve" ? "bg-green-700" : "bg-red-600"}`}>Confirm</button></div>
          </div>
        </div>
      )}
    </div>
  );
}