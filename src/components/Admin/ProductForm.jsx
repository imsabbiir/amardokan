"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Save, ImagePlus, Package, Info, Tag,
  Warehouse, Store, CheckCircle2,
} from "lucide-react";

const demoProduct = {
  name: "Premium Cotton T-Shirt",
  sku: "TSH-001",
  seller: "SEL-1001",
  category: "Fashion",
  description: "Comfortable everyday cotton T-shirt.",
  price: "650",
  comparePrice: "850",
  stock: "45",
  lowStock: "5",
  status: "Active",
  approval: "Approved",
};

const inputClass =
  "mt-1.5 w-full rounded-lg border border-[#8c8f94] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]";

function Field({ label, children, hint }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      {children}
      {hint && <span className="mt-1 block text-xs font-normal text-[#646970]">{hint}</span>}
    </label>
  );
}

function Section({ icon: Icon, title, description, children }) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
      <div className="flex items-start gap-3 border-b border-[#dcdcde] p-5">
        <span className="rounded-lg bg-[#f6f7f7] p-2 text-[#646970]"><Icon size={18} /></span>
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className="mt-1 text-sm text-[#646970]">{description}</p>
        </div>
      </div>
      <div className="space-y-5 p-5">{children}</div>
    </section>
  );
}

export default function ProductForm({ mode = "create" }) {
  const router = useRouter();
  const params = useParams();
  const isEdit = mode === "edit";

  const [form, setForm] = useState(demoProduct);
  const [images, setImages] = useState([]);
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState({});

  function update(key, value) {
    setForm((old) => ({ ...old, [key]: value }));
    setErrors((old) => ({ ...old, [key]: "" }));
  }

  function submit(e) {
    e.preventDefault();

    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Product name is required.";
    if (!form.seller) nextErrors.seller = "Select a seller.";
    if (!form.category) nextErrors.category = "Select a category.";
    if (!form.price || Number(form.price) <= 0) nextErrors.price = "Enter a valid price.";
    if (form.stock === "" || Number(form.stock) < 0) nextErrors.stock = "Stock cannot be negative.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    // Demo only: replace this with a protected POST/PATCH API request.
    setNotice(
      isEdit
        ? "Demo changes validated. Connect your API to save product updates."
        : "Demo product validated. Connect your API to create the product."
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f0f1] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1250px] space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#646970]">
          <Link href="/admin" className="hover:text-[#2271b1]">Dashboard</Link>
          <span>/</span>
          <Link href="/admin/products" className="hover:text-[#2271b1]">Products</Link>
          <span>/</span>
          <span className="text-[#1d2327]">{isEdit ? "Edit product" : "Add product"}</span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="rounded-lg border border-[#dcdcde] bg-white p-2 hover:bg-gray-50" aria-label="Back to products">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{isEdit ? "Edit Product" : "Add Product"}</h1>
            <p className="mt-1 text-sm text-[#646970]">
              {isEdit ? `Update product information · ${params.id}` : "Add a product to the AmarDokan catalog."}
            </p>
          </div>
        </div>

        {notice && (
          <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />{notice}
          </div>
        )}

        <form onSubmit={submit} className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <Section icon={Package} title="Basic information" description="Product name, SKU and description.">
              <Field label="Product name">
                <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Premium Cotton T-Shirt" className={inputClass} />
                {errors.name && <span className="mt-1 block text-xs text-red-600">{errors.name}</span>}
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="SKU" hint="A unique stock-keeping identifier.">
                  <input value={form.sku} onChange={(e) => update("sku", e.target.value)} placeholder="SKU-001" className={inputClass} />
                </Field>
                <Field label="Category">
                  <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
                    <option value="">Select category</option>
                    <option>Fashion</option><option>Electronics</option><option>Beauty</option><option>Home & Living</option><option>Lifestyle</option>
                  </select>
                  {errors.category && <span className="mt-1 block text-xs text-red-600">{errors.category}</span>}
                </Field>
              </div>

              <Field label="Product description" hint="Describe the product accurately, including materials, dimensions and included items.">
                <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={5} placeholder="Write product details..." className={inputClass} />
              </Field>
            </Section>

            <Section icon={ImagePlus} title="Product images" description="Choose clear product photos. Upload handling must be connected to your storage provider.">
              <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#c3c4c7] bg-[#fafafa] p-6 text-center hover:bg-[#f6f7f7]">
                <ImagePlus size={28} className="text-[#646970]" />
                <span className="mt-3 text-sm font-semibold">Click to select images</span>
                <span className="mt-1 text-xs text-[#646970]">PNG, JPG or WebP · Recommended: square images</span>
                <input type="file" accept="image/png,image/jpeg,image/webp" multiple className="sr-only" onChange={(e) => setImages(Array.from(e.target.files || []))} />
              </label>
              {images.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold">{images.length} file(s) selected</p>
                  {images.map((image) => <p key={`${image.name}-${image.size}`} className="text-sm text-[#646970]">{image.name}</p>)}
                  <p className="text-xs text-amber-700">Files are selected locally only; they are not uploaded yet.</p>
                </div>
              )}
            </Section>

            <Section icon={Tag} title="Pricing" description="Set the customer-facing product price.">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Selling price (৳)">
                  <input type="number" min="0.01" step="0.01" value={form.price} onChange={(e) => update("price", e.target.value)} className={inputClass} />
                  {errors.price && <span className="mt-1 block text-xs text-red-600">{errors.price}</span>}
                </Field>
                <Field label="Compare-at price (৳)" hint="Optional original/reference price.">
                  <input type="number" min="0" step="0.01" value={form.comparePrice} onChange={(e) => update("comparePrice", e.target.value)} className={inputClass} />
                </Field>
              </div>
              {Number(form.comparePrice) > Number(form.price) && Number(form.price) > 0 && (
                <p className="text-sm font-semibold text-green-700">
                  Displayed discount: {Math.round((1 - Number(form.price) / Number(form.comparePrice)) * 100)}%
                </p>
              )}
            </Section>

            <Section icon={Warehouse} title="Inventory" description="Manage available stock and low-stock alerts.">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Available stock">
                  <input type="number" min="0" step="1" value={form.stock} onChange={(e) => update("stock", e.target.value)} className={inputClass} />
                  {errors.stock && <span className="mt-1 block text-xs text-red-600">{errors.stock}</span>}
                </Field>
                <Field label="Low-stock threshold">
                  <input type="number" min="0" step="1" value={form.lowStock} onChange={(e) => update("lowStock", e.target.value)} className={inputClass} />
                </Field>
              </div>
            </Section>
          </div>

          <aside className="space-y-6">
            <Section icon={CheckCircle2} title="Publishing" description="Control product visibility and review status.">
              <Field label="Visibility">
                <select value={form.status} onChange={(e) => update("status", e.target.value)} className={inputClass}>
                  <option>Active</option><option>Inactive</option>
                </select>
              </Field>
              <Field label="Approval status">
                <select value={form.approval} onChange={(e) => update("approval", e.target.value)} className={inputClass}>
                  <option>Pending</option><option>Approved</option><option>Rejected</option>
                </select>
              </Field>
              <div className="rounded-lg bg-[#f6f7f7] p-3 text-xs leading-5 text-[#646970]">
                A product should not become publicly visible merely because its status is Active. Enforce approval and seller permissions on the server.
              </div>
            </Section>

            <Section icon={Store} title="Seller assignment" description="Associate the product with a seller account.">
              <Field label="Seller">
                <select value={form.seller} onChange={(e) => update("seller", e.target.value)} className={inputClass}>
                  <option value="">Select seller</option>
                  <option value="SEL-1001">Sabbir Fashion</option>
                  <option value="SEL-1002">Nusrat Beauty</option>
                  <option value="SEL-1003">Tech Zone BD</option>
                </select>
                {errors.seller && <span className="mt-1 block text-xs text-red-600">{errors.seller}</span>}
              </Field>
              <Link href="/admin/sellers" className="inline-block text-sm font-semibold text-[#2271b1] hover:underline">View sellers</Link>
            </Section>

            <div className="rounded-xl border border-[#dcdcde] bg-white p-4">
              <div className="flex gap-2 text-sm font-semibold"><Info size={17} className="shrink-0 text-[#646970]" /> Before saving</div>
              <p className="mt-2 text-xs leading-5 text-[#646970]">Check the price, seller ownership, stock quantity, product images and approval requirements.</p>
              <button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#a3db4a] px-4 py-3 text-sm font-bold hover:bg-[#8fc934]">
                <Save size={16} /> {isEdit ? "Save changes" : "Create product"}
              </button>
              <Link href="/admin/products" className="mt-2 block rounded-lg border border-[#dcdcde] px-4 py-2.5 text-center text-sm font-semibold hover:bg-gray-50">Cancel</Link>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}