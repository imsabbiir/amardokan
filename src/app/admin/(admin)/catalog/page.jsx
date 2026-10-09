"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search, Store, Plus, Package, Pencil, Trash2,
  CheckCircle2, XCircle, X, ChevronLeft, ChevronRight,
  Download, TrendingUp, AlertTriangle, Eye,
} from "lucide-react";

const masterProducts = [
  { id: "PRD-1001", name: "Wireless Bluetooth Mouse", sku: "MOU-001", category: "Electronics", costPrice: 250, websitePrice: 450, stock: 120 },
  { id: "PRD-1002", name: "Premium Cotton T-Shirt", sku: "TSH-002", category: "Fashion", costPrice: 180, websitePrice: 350, stock: 75 },
  { id: "PRD-1003", name: "Wireless Bluetooth Earbuds", sku: "EAR-003", category: "Electronics", costPrice: 550, websitePrice: 950, stock: 8 },
  { id: "PRD-1004", name: "Ceramic Coffee Mug", sku: "MUG-004", category: "Home & Living", costPrice: 100, websitePrice: 220, stock: 0 },
  { id: "PRD-1005", name: "Portable LED Desk Lamp", sku: "LMP-005", category: "Electronics", costPrice: 360, websitePrice: 650, stock: 42 },
  { id: "PRD-1006", name: "Canvas Tote Bag", sku: "BAG-006", category: "Fashion", costPrice: 130, websitePrice: 280, stock: 32 },
];

const initialCatalog = [
  {
    id: "CAT-001",
    productId: "PRD-1002",
    sellerPrice: 230,
    suggestedPrice: 350,
    enabled: true,
    addedAt: "2026-10-08",
  },
  {
    id: "CAT-002",
    productId: "PRD-1003",
    sellerPrice: 680,
    suggestedPrice: 1050,
    enabled: true,
    addedAt: "2026-10-07",
  },
  {
    id: "CAT-003",
    productId: "PRD-1006",
    sellerPrice: 170,
    suggestedPrice: 300,
    enabled: false,
    addedAt: "2026-10-06",
  },
];

const money = (value) => `৳${Number(value).toLocaleString("en-BD")}`;

function Badge({ children, tone = "gray" }) {
  const styles = {
    green: "bg-green-50 text-green-700 ring-green-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    red: "bg-red-50 text-red-700 ring-red-200",
    gray: "bg-gray-100 text-gray-600 ring-gray-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
  };

  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[tone]}`}>
      {children}
    </span>
  );
}

function Metric({ title, value, icon: Icon, color, description }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[#646970]">{title}</p>
        <span className={`rounded-lg p-2 ${color}`}><Icon size={18} /></span>
      </div>
      <p className="mt-3 text-2xl font-bold">{value}</p>
      {description && <p className="mt-1 text-xs text-[#646970]">{description}</p>}
    </div>
  );
}

function PriceField({ label, value, onChange, hint, min = "0" }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <div className="relative mt-1.5">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#646970]">৳</span>
        <input
          required
          type="number"
          min={min}
          step="0.01"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-[#8c8f94] py-2.5 pl-8 pr-3 font-normal outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
        />
      </div>
      {hint && <span className="mt-1 block text-xs font-normal text-[#646970]">{hint}</span>}
    </label>
  );
}

export default function CatalogPage() {
  const [catalog, setCatalog] = useState(initialCatalog);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [notice, setNotice] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [sellerPrice, setSellerPrice] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [enabled, setEnabled] = useState(true);

  const pageSize = 6;

  const enriched = useMemo(() => {
    return catalog.map((entry) => {
      const product = masterProducts.find((p) => p.id === entry.productId);
      return product ? { ...entry, product } : null;
    }).filter(Boolean);
  }, [catalog]);

  const filtered = enriched.filter((entry) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query ||
      [entry.product.name, entry.product.id, entry.product.sku, entry.id, entry.product.category]
        .some((v) => v.toLowerCase().includes(query));

    return matchesSearch &&
      (category === "All" || entry.product.category === category) &&
      (availability === "All" ||
        (availability === "Available" && entry.enabled) ||
        (availability === "Disabled" && !entry.enabled));
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const activeCount = catalog.filter((p) => p.enabled).length;
  const disabledCount = catalog.length - activeCount;
  const totalSpread = enriched
    .filter((entry) => entry.enabled)
    .reduce((sum, entry) => sum + entry.sellerPrice - entry.product.costPrice, 0);

  const selectedMasterProduct = masterProducts.find((p) => p.id === selectedProductId);

  function openAddModal() {
    const alreadyAdded = new Set(catalog.map((p) => p.productId));
    const firstAvailable = masterProducts.find((p) => !alreadyAdded.has(p.id));

    if (!firstAvailable) {
      setNotice("All demo master products are already in the catalog.");
      return;
    }

    setModal({ mode: "add" });
    setSelectedProductId(firstAvailable.id);
    setSellerPrice(String(firstAvailable.costPrice + 50));
    setSuggestedPrice(String(firstAvailable.websitePrice));
    setEnabled(true);
  }

  function openEditModal(entry) {
    setModal({ mode: "edit", entryId: entry.id });
    setSelectedProductId(entry.productId);
    setSellerPrice(String(entry.sellerPrice));
    setSuggestedPrice(String(entry.suggestedPrice));
    setEnabled(entry.enabled);
  }

  function saveCatalogEntry(e) {
    e.preventDefault();

    const product = masterProducts.find((p) => p.id === selectedProductId);
    if (!product) return;

    const purchase = Number(sellerPrice);
    const retail = Number(suggestedPrice);

    if (!Number.isFinite(purchase) || purchase <= 0 ||
        !Number.isFinite(retail) || retail <= 0) {
      setNotice("Enter valid positive prices.");
      return;
    }

    if (retail < purchase) {
      setNotice("The suggested selling price should be at least the seller purchase price.");
      return;
    }

    if (modal.mode === "add") {
      if (catalog.some((p) => p.productId === product.id)) {
        setNotice("This product is already in the catalog. Edit its existing entry instead.");
        return;
      }

      const newEntry = {
        id: `CAT-${String(Date.now()).slice(-6)}`,
        productId: product.id,
        sellerPrice: purchase,
        suggestedPrice: retail,
        enabled,
        addedAt: new Date().toISOString().slice(0, 10),
      };

      setCatalog((old) => [newEntry, ...old]);
      setNotice(`${product.name} added to the seller catalog in this demo.`);
    } else {
      setCatalog((old) =>
        old.map((entry) =>
          entry.id === modal.entryId
            ? { ...entry, sellerPrice: purchase, suggestedPrice: retail, enabled }
            : entry
        )
      );
      setNotice(`${product.name} catalog settings updated in this demo.`);
    }

    setModal(null);
  }

  function toggleEntry(entry) {
    setCatalog((old) =>
      old.map((p) => p.id === entry.id ? { ...p, enabled: !p.enabled } : p)
    );
    setNotice(
      `${entry.product.name} ${entry.enabled ? "removed from seller availability" : "made available to sellers"} in this demo.`
    );
  }

  function removeEntry(entry) {
    setCatalog((old) => old.filter((p) => p.id !== entry.id));
    setNotice(`${entry.product.name} removed from the demo catalog.`);
  }

  function exportCSV() {
    const quote = (v) => `"${String(v).replaceAll('"', '""')}"`;
    const csv = [
      ["Catalog ID", "Product ID", "Product", "SKU", "Master Cost", "Seller Price", "Suggested Retail", "Spread Before Costs", "Enabled"],
      ...filtered.map((entry) => [
        entry.id,
        entry.product.id,
        entry.product.name,
        entry.product.sku,
        entry.product.costPrice,
        entry.sellerPrice,
        entry.suggestedPrice,
        entry.sellerPrice - entry.product.costPrice,
        entry.enabled ? "Yes" : "No",
      ]),
    ].map((row) => row.map(quote).join(",")).join("\n");

    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "amardokan-seller-catalog.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#f0f0f1] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-375 space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#646970]">
          <Link href="/admin" className="hover:text-[#2271b1]">Dashboard</Link>
          <span>/</span><span className="text-[#1d2327]">Seller Catalog</span>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Seller Catalog</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#646970]">
              Choose which products sellers can offer. Configure seller purchase prices independently from your own website prices.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportCSV} className="inline-flex items-center gap-2 rounded-lg border border-[#dcdcde] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50">
              <Download size={16} /> Export
            </button>
            <button onClick={openAddModal} className="inline-flex items-center gap-2 rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-bold hover:bg-[#8fc934]">
              <Plus size={17} /> Add products
            </button>
          </div>
        </div>

        {notice && (
          <div className="flex items-start justify-between gap-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            <span className="flex items-start gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0" />{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Dismiss"><X size={16} /></button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric title="Catalog products" value={catalog.length} icon={Package} color="bg-blue-50 text-blue-700" description="Products configured for sellers" />
          <Metric title="Available to sellers" value={activeCount} icon={CheckCircle2} color="bg-green-50 text-green-700" description="Currently enabled in this demo" />
          <Metric title="Disabled products" value={disabledCount} icon={XCircle} color="bg-gray-100 text-gray-600" description="Hidden from seller selection" />
          <Metric title="Gross spread per unit" value={money(totalSpread)} icon={TrendingUp} color="bg-purple-50 text-purple-700" description="Sum of enabled seller price minus master cost; not profit" />
        </div>

        <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-[#edf6df] p-2 text-[#527b1d]"><Store size={19} /></div>
            <div>
              <h2 className="font-bold">How seller pricing works</h2>
              <p className="mt-1 text-sm leading-6 text-[#646970]">
                Master cost is your recorded product cost. Seller purchase price is what the seller pays your business for the item. Suggested retail price is a recommendation; the seller&lsquo;s actual selling price may be different if your business rules allow it.
              </p>
            </div>
          </div>
        </div>

        <section className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
          <div className="space-y-4 border-b border-[#dcdcde] p-4 sm:p-5">
            <div>
              <h2 className="font-bold">Catalog management</h2>
              <p className="mt-1 text-sm text-[#646970]">{filtered.length} catalog products</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <div className="relative">
                <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646970]" />
                <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search product, SKU or ID..." className="w-full rounded-lg border border-[#8c8f94] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#2271b1]" />
              </div>
              <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="rounded-lg border border-[#8c8f94] bg-white px-3 py-2.5 text-sm">
                <option value="All">All categories</option>
                <option>Electronics</option><option>Fashion</option><option>Home & Living</option>
              </select>
              <select value={availability} onChange={(e) => { setAvailability(e.target.value); setPage(1); }} className="rounded-lg border border-[#8c8f94] bg-white px-3 py-2.5 text-sm">
                <option value="All">All availability</option><option>Available</option><option>Disabled</option>
              </select>
            </div>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-287.5 text-left text-sm">
              <thead className="bg-[#f6f7f7] text-xs uppercase tracking-wide text-[#646970]">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Master cost</th>
                  <th className="px-4 py-3">Seller price</th>
                  <th className="px-4 py-3">Suggested retail</th>
                  <th className="px-4 py-3">Gross spread</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Availability</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f1]">
                {visible.map((entry) => {
                  const spread = entry.sellerPrice - entry.product.costPrice;
                  return (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f6f7f7] text-[#646970]"><Package size={19} /></div>
                          <div><p className="font-semibold">{entry.product.name}</p><p className="mt-1 text-xs text-[#646970]">{entry.product.id} · {entry.product.sku}</p></div>
                        </div>
                      </td>
                      <td className="px-4 py-4">{money(entry.product.costPrice)}</td>
                      <td className="px-4 py-4 font-bold">{money(entry.sellerPrice)}</td>
                      <td className="px-4 py-4">{money(entry.suggestedPrice)}</td>
                      <td className="px-4 py-4"><span className={spread >= 0 ? "font-semibold text-green-700" : "font-semibold text-red-700"}>{money(spread)}</span></td>
                      <td className="px-4 py-4">{entry.product.stock === 0 ? <Badge tone="red">Out of stock</Badge> : entry.product.stock <= 10 ? <Badge tone="amber">{entry.product.stock} left</Badge> : entry.product.stock}</td>
                      <td className="px-4 py-4">{entry.enabled ? <Badge tone="green">Available</Badge> : <Badge>Disabled</Badge>}</td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEditModal(entry)} title="Edit seller pricing" className="rounded-lg border border-[#dcdcde] p-2 hover:bg-gray-100"><Pencil size={15} /></button>
                          <button onClick={() => toggleEntry(entry)} title={entry.enabled ? "Disable for sellers" : "Enable for sellers"} className="rounded-lg border border-[#dcdcde] p-2 hover:bg-gray-100">{entry.enabled ? <XCircle size={15} /> : <CheckCircle2 size={15} />}</button>
                          <button onClick={() => removeEntry(entry)} title="Remove from catalog" className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-[#f0f0f1] md:hidden">
            {visible.map((entry) => {
              const spread = entry.sellerPrice - entry.product.costPrice;
              return (
                <article key={entry.id} className="space-y-3 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f6f7f7]"><Package size={19} /></div>
                    <div className="min-w-0 flex-1"><p className="font-semibold">{entry.product.name}</p><p className="mt-1 text-xs text-[#646970]">{entry.product.id} · {entry.product.category}</p><div className="mt-2">{entry.enabled ? <Badge tone="green">Available to sellers</Badge> : <Badge>Disabled</Badge>}</div></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-xs text-[#646970]">Master cost</p><p className="mt-1 font-semibold">{money(entry.product.costPrice)}</p></div>
                    <div><p className="text-xs text-[#646970]">Seller price</p><p className="mt-1 font-semibold">{money(entry.sellerPrice)}</p></div>
                    <div><p className="text-xs text-[#646970]">Suggested retail</p><p className="mt-1 font-semibold">{money(entry.suggestedPrice)}</p></div>
                    <div><p className="text-xs text-[#646970]">Gross spread</p><p className="mt-1 font-semibold text-green-700">{money(spread)}</p></div>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <button onClick={() => openEditModal(entry)} className="inline-flex items-center gap-2 rounded-lg border border-[#dcdcde] px-3 py-2 text-sm font-semibold"><Pencil size={15} /> Edit prices</button>
                    <button onClick={() => toggleEntry(entry)} className="rounded-lg border border-[#dcdcde] px-3 py-2 text-sm font-semibold">{entry.enabled ? "Disable" : "Enable"}</button>
                    <button onClick={() => removeEntry(entry)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600">Remove</button>
                  </div>
                </article>
              );
            })}
          </div>

          {visible.length === 0 && (
            <div className="px-6 py-14 text-center">
              <Package size={34} className="mx-auto text-[#646970]" />
              <h3 className="mt-3 font-bold">No catalog products found</h3>
              <p className="mt-1 text-sm text-[#646970]">Change the filters or add a product from your master inventory.</p>
              <button onClick={openAddModal} className="mt-4 rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-bold">Add products</button>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-[#dcdcde] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#646970]">Showing {filtered.length ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</p>
            <div className="flex items-center gap-2">
              <button disabled={currentPage <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-[#dcdcde] p-2 disabled:opacity-40" aria-label="Previous page"><ChevronLeft size={17} /></button>
              <span className="text-sm">Page {currentPage} / {pageCount}</span>
              <button disabled={currentPage >= pageCount} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-[#dcdcde] p-2 disabled:opacity-40" aria-label="Next page"><ChevronRight size={17} /></button>
            </div>
          </div>
        </section>

        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle size={19} className="mt-0.5 shrink-0 text-amber-700" />
          <div><h3 className="font-bold text-amber-900">Stock and pricing reminder</h3><p className="mt-1 text-sm leading-6 text-amber-800">Disabling a catalog item should stop new seller orders for that item without deleting its history. Validate live stock and current prices again when a seller places an order.</p></div>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <form onSubmit={saveCatalogEntry} className="my-auto w-full max-w-xl space-y-5 rounded-2xl bg-white p-5 shadow-xl sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">{modal.mode === "add" ? "Add product to catalog" : "Edit catalog pricing"}</h2>
                <p className="mt-1 text-sm text-[#646970]">Configure pricing independently of your master product.</p>
              </div>
              <button type="button" onClick={() => setModal(null)} aria-label="Close" className="rounded-lg p-2 hover:bg-gray-100"><X size={18} /></button>
            </div>

            <label className="block text-sm font-semibold">
              Master product
              <select
                required
                value={selectedProductId}
                disabled={modal.mode === "edit"}
                onChange={(e) => {
                  const p = masterProducts.find((item) => item.id === e.target.value);
                  setSelectedProductId(e.target.value);
                  setSellerPrice(p ? String(p.costPrice + 50) : "");
                  setSuggestedPrice(p ? String(p.websitePrice) : "");
                }}
                className="mt-1.5 w-full rounded-lg border border-[#8c8f94] bg-white px-3 py-2.5 text-sm disabled:bg-gray-100"
              >
                {modal.mode === "add" && <option value="">Choose a product</option>}
                {masterProducts.filter((p) =>
                  modal.mode === "edit" ||
                  !catalog.some((entry) => entry.productId === p.id)
                ).map((p) => (
                  <option key={p.id} value={p.id}>{p.name} · {p.id}</option>
                ))}
              </select>
            </label>

            {selectedMasterProduct && (
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-[#dcdcde] bg-[#f6f7f7] p-4">
                <div><p className="text-xs text-[#646970]">Master cost</p><p className="mt-1 text-lg font-bold">{money(selectedMasterProduct.costPrice)}</p></div>
                <div><p className="text-xs text-[#646970]">Website price</p><p className="mt-1 text-lg font-bold">{money(selectedMasterProduct.websitePrice)}</p></div>
                <div><p className="text-xs text-[#646970]">Current stock</p><p className="mt-1 font-semibold">{selectedMasterProduct.stock}</p></div>
                <div><p className="text-xs text-[#646970]">SKU</p><p className="mt-1 font-semibold">{selectedMasterProduct.sku}</p></div>
              </div>
            )}

            <PriceField
              label="Seller purchase price"
              value={sellerPrice}
              onChange={setSellerPrice}
              min="0.01"
              hint="The amount the seller pays your business for one unit."
            />

            <PriceField
              label="Suggested selling price"
              value={suggestedPrice}
              onChange={setSuggestedPrice}
              min="0.01"
              hint="The recommended customer-facing price. Seller pricing rules determine whether it can be changed."
            />

            {selectedMasterProduct && Number(sellerPrice) > 0 && Number(suggestedPrice) > 0 && (
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-[#dcdcde] p-4">
                <div><p className="text-xs text-[#646970]">Your gross spread vs. cost</p><p className={`mt-1 text-lg font-bold ${Number(sellerPrice) >= selectedMasterProduct.costPrice ? "text-green-700" : "text-red-700"}`}>{money(Number(sellerPrice) - selectedMasterProduct.costPrice)}</p></div>
                <div><p className="text-xs text-[#646970]">Seller&lsquo;s potential margin</p><p className={`mt-1 text-lg font-bold ${Number(suggestedPrice) >= Number(sellerPrice) ? "text-green-700" : "text-red-700"}`}>{money(Number(suggestedPrice) - Number(sellerPrice))}</p></div>
              </div>
            )}

            <label className="flex items-start gap-3 rounded-xl border border-[#dcdcde] p-4">
              <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="mt-1" />
              <span><span className="block text-sm font-semibold">Available to sellers</span><span className="mt-1 block text-xs leading-5 text-[#646970]">When enabled, eligible sellers can see and select this product, subject to stock and account permissions.</span></span>
            </label>

            <div className="flex flex-wrap justify-end gap-2 border-t border-[#dcdcde] pt-4">
              <button type="button" onClick={() => setModal(null)} className="rounded-lg border border-[#dcdcde] px-4 py-2.5 text-sm font-semibold">Cancel</button>
              <button type="submit" className="rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-bold hover:bg-[#8fc934]">{modal.mode === "add" ? "Add to catalog" : "Save catalog changes"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}