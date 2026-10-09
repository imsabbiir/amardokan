"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft, Package, Pencil, Store, ShieldCheck, Tag,
  Warehouse, ShoppingBag, CalendarDays, CheckCircle2,
  XCircle, AlertTriangle, Eye, X,
} from "lucide-react";

const demoProducts = [
  {
    id: "PRD-1001",
    name: "Premium Cotton T-Shirt",
    seller: "Sabbir Fashion",
    sellerId: "SEL-1001",
    category: "Fashion",
    sku: "TSH-001",
    price: 650,
    comparePrice: 850,
    stock: 45,
    status: "Active",
    approval: "Approved",
    created: "2026-10-08",
    description: "Comfortable everyday cotton T-shirt suitable for casual wear.",
    orders: 42,
  },
  {
    id: "PRD-1002",
    name: "Wireless Bluetooth Earbuds",
    seller: "Tech Zone BD",
    sellerId: "SEL-1003",
    category: "Electronics",
    sku: "EAR-002",
    price: 1250,
    comparePrice: 1590,
    stock: 8,
    status: "Active",
    approval: "Approved",
    created: "2026-10-07",
    description: "Compact wireless earbuds for everyday listening.",
    orders: 27,
  },
  {
    id: "PRD-1004",
    name: "Minimal Ceramic Mug",
    seller: "Daily Needs BD",
    sellerId: "SEL-1004",
    category: "Home & Living",
    sku: "MUG-004",
    price: 350,
    comparePrice: 0,
    stock: 24,
    status: "Active",
    approval: "Pending",
    created: "2026-10-05",
    description: "A minimal ceramic mug for everyday use.",
    orders: 0,
  },
];

const money = (n) => `৳${Number(n).toLocaleString("en-BD")}`;

function Badge({ children, tone = "gray" }) {
  const styles = {
    green: "bg-green-50 text-green-700 ring-green-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    red: "bg-red-50 text-red-700 ring-red-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    gray: "bg-gray-100 text-gray-700 ring-gray-200",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[tone]}`}>{children}</span>;
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-[#646970]">{label}</p>
      <p className="mt-2 break-words text-sm font-semibold">{value || "—"}</p>
    </div>
  );
}

function Metric({ title, value, icon: Icon, tone }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[#646970]">{title}</p>
        <span className={`rounded-lg p-2 ${tone}`}><Icon size={18} /></span>
      </div>
      <p className="mt-3 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [products, setProducts] = useState(demoProducts);
  const [confirm, setConfirm] = useState(null);
  const [notice, setNotice] = useState("");

  const product = products.find((p) => p.id === id);

  function applyAction() {
    if (!confirm) return;

    setProducts((old) =>
      old.map((p) => p.id === id ? { ...p, ...confirm.changes } : p)
    );

    setNotice(confirm.message);
    setConfirm(null);
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f0f0f1] p-6 text-[#1d2327]">
        <div className="mx-auto max-w-2xl rounded-xl border border-[#dcdcde] bg-white p-8 text-center">
          <Package size={36} className="mx-auto text-[#646970]" />
          <h1 className="mt-4 text-xl font-bold">Product not found</h1>
          <p className="mt-2 text-sm text-[#646970]">
            No demo product matches ID {String(id)}. Load the product from your database in production.
          </p>
          <Link href="/admin/products" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-bold">
            <ArrowLeft size={16} /> Back to products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.comparePrice > product.price && product.price > 0
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#f0f0f1] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#646970]">
          <Link href="/admin" className="hover:text-[#2271b1]">Dashboard</Link>
          <span>/</span>
          <Link href="/admin/products" className="hover:text-[#2271b1]">Products</Link>
          <span>/</span>
          <span className="text-[#1d2327]">{product.id}</span>
        </div>

        <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2271b1] hover:underline">
          <ArrowLeft size={16} /> Back to products
        </Link>

        {notice && (
          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            <span className="flex items-center gap-2"><CheckCircle2 size={17} />{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Dismiss"><X size={16} /></button>
          </div>
        )}

        <section className="rounded-xl border border-[#dcdcde] bg-white p-5 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f6f7f7] text-[#646970] sm:h-20 sm:w-20">
                <Package size={32} />
              </div>
              <div className="min-w-0">
                <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">{product.name}</h1>
                <p className="mt-2 text-sm text-[#646970]">{product.id} · SKU: {product.sku}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.approval === "Approved" ? <Badge tone="green">Approved</Badge> : product.approval === "Pending" ? <Badge tone="amber">Pending approval</Badge> : <Badge tone="red">Rejected</Badge>}
                  {product.status === "Active" ? <Badge tone="blue">Active</Badge> : <Badge>Inactive</Badge>}
                  <Badge>{product.category}</Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/products/${product.id}/edit`} className="inline-flex items-center gap-2 rounded-lg border border-[#dcdcde] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50">
                <Pencil size={16} /> Edit product
              </Link>
              {product.approval === "Pending" && (
                <>
                  <button
                    onClick={() => setConfirm({
                      changes: { approval: "Approved" },
                      message: "Product approved in this demo.",
                      title: "Approve product?",
                    })}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-bold hover:bg-[#8fc934]"
                  >
                    <CheckCircle2 size={16} /> Approve
                  </button>
                  <button
                    onClick={() => setConfirm({
                      changes: { approval: "Rejected", status: "Inactive" },
                      message: "Product rejected and set inactive in this demo.",
                      title: "Reject product?",
                    })}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric title="Selling price" value={money(product.price)} icon={Tag} tone="bg-green-50 text-green-700" />
          <Metric title="Available stock" value={product.stock} icon={Warehouse} tone="bg-blue-50 text-blue-700" />
          <Metric title="Orders" value={product.orders} icon={ShoppingBag} tone="bg-purple-50 text-purple-700" />
          <Metric title="Discount" value={discount ? `${discount}%` : "—"} icon={CheckCircle2} tone="bg-amber-50 text-amber-700" />
        </div>

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <section className="rounded-xl border border-[#dcdcde] bg-white">
              <div className="border-b border-[#dcdcde] p-5">
                <h2 className="font-bold">Product information</h2>
                <p className="mt-1 text-sm text-[#646970]">Core product details and pricing</p>
              </div>
              <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
                <Info label="Product name" value={product.name} />
                <Info label="SKU" value={product.sku} />
                <Info label="Category" value={product.category} />
                <Info label="Selling price" value={money(product.price)} />
                <Info label="Compare-at price" value={product.comparePrice ? money(product.comparePrice) : "Not set"} />
                <Info label="Created date" value={product.created} />
                <div className="sm:col-span-2">
                  <Info label="Description" value={product.description} />
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-[#dcdcde] bg-white">
              <div className="border-b border-[#dcdcde] p-5">
                <h2 className="font-bold">Inventory information</h2>
                <p className="mt-1 text-sm text-[#646970]">Stock availability and fulfillment readiness</p>
              </div>
              <div className="space-y-5 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-[#f6f7f7] p-2"><Warehouse size={18} /></span>
                    <div><p className="text-sm font-semibold">Available inventory</p><p className="mt-1 text-xs text-[#646970]">Recorded stock quantity</p></div>
                  </div>
                  <p className="text-xl font-bold">{product.stock}</p>
                </div>
                {product.stock === 0 ? (
                  <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"><AlertTriangle size={17} className="mt-0.5 shrink-0" />Out of stock. Confirm replenishment before accepting more orders.</div>
                ) : product.stock <= 10 ? (
                  <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"><AlertTriangle size={17} className="mt-0.5 shrink-0" />Stock is running low. Review the reorder threshold.</div>
                ) : (
                  <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800"><CheckCircle2 size={17} className="mt-0.5 shrink-0" />Stock is available.</div>
                )}
                <Link href="/admin/inventory" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2271b1] hover:underline">
                  Open inventory management <Warehouse size={15} />
                </Link>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-xl border border-[#dcdcde] bg-white p-5">
              <div className="flex items-center gap-2"><Store size={18} className="text-[#646970]" /><h2 className="font-bold">Seller information</h2></div>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf6df] font-bold text-[#527b1d]">{product.seller.slice(0, 1)}</div>
                <div className="min-w-0"><p className="break-words font-semibold">{product.seller}</p><p className="mt-1 text-xs text-[#646970]">{product.sellerId}</p></div>
              </div>
              <Link href={`/admin/sellers/${product.sellerId}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2271b1] hover:underline">
                View seller profile <Store size={15} />
              </Link>
            </section>

            <section className="rounded-xl border border-[#dcdcde] bg-white p-5">
              <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-[#646970]" /><h2 className="font-bold">Catalog status</h2></div>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-3"><span className="text-sm text-[#646970]">Approval</span>{product.approval === "Approved" ? <Badge tone="green">Approved</Badge> : product.approval === "Pending" ? <Badge tone="amber">Pending</Badge> : <Badge tone="red">Rejected</Badge>}</div>
                <div className="flex items-center justify-between gap-3"><span className="text-sm text-[#646970]">Visibility</span>{product.status === "Active" ? <Badge tone="blue">Active</Badge> : <Badge>Inactive</Badge>}</div>
                <div className="flex items-start gap-2 rounded-lg bg-[#f6f7f7] p-3 text-xs leading-5 text-[#646970]"><ShieldCheck size={16} className="mt-0.5 shrink-0" />Use server-side rules to determine whether a product is allowed to appear on the storefront.</div>
              </div>
            </section>

            <section className="rounded-xl border border-[#dcdcde] bg-white p-5">
              <h2 className="font-bold">Quick links</h2>
              <div className="mt-4 space-y-3">
                <Link href="/admin/products" className="flex items-center gap-2 text-sm font-semibold text-[#2271b1] hover:underline"><Package size={16} />All products</Link>
                <Link href="/admin/products/pending" className="flex items-center gap-2 text-sm font-semibold text-[#2271b1] hover:underline"><ShieldCheck size={16} />Pending approvals</Link>
                <Link href="/admin/categories" className="flex items-center gap-2 text-sm font-semibold text-[#2271b1] hover:underline"><Tag size={16} />Categories</Link>
              </div>
            </section>
          </div>
        </div>

        <p className="text-xs leading-5 text-[#646970]">
          Demo note: this page uses local sample data. Connect it to your Products model and validate all approval, pricing and inventory changes on the server.
        </p>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">{confirm.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#646970]">
              {confirm.changes.approval === "Approved"
                ? "Confirm that the product meets your catalog requirements before approving it."
                : "This product will be marked rejected and inactive in this demo."}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setConfirm(null)} className="rounded-lg border border-[#dcdcde] px-4 py-2.5 text-sm font-semibold">Cancel</button>
              <button onClick={applyAction} className="rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-bold">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}