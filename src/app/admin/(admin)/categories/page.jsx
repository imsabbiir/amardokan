
"use client";

import { useMemo, useState } from "react";
import {
  FolderTree,
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  Package,
  X,
  CheckCircle2,
  AlertTriangle,
  Download,
  RotateCcw,
  Layers3,
  Folder,
  Tag,
} from "lucide-react";

const initialCategories = [
  {
    id: "CAT-001",
    name: "Electronics",
    slug: "electronics",
    parent: "",
    description: "Electronic devices, accessories, and gadgets.",
    productCount: 128,
    status: "Active",
    createdAt: "2026-09-12",
  },
  {
    id: "CAT-002",
    name: "Mobile Phones",
    slug: "mobile-phones",
    parent: "Electronics",
    description: "Smartphones and mobile devices.",
    productCount: 42,
    status: "Active",
    createdAt: "2026-09-13",
  },
  {
    id: "CAT-003",
    name: "Computer Accessories",
    slug: "computer-accessories",
    parent: "Electronics",
    description: "Mice, keyboards, hubs, and computer accessories.",
    productCount: 31,
    status: "Active",
    createdAt: "2026-09-15",
  },
  {
    id: "CAT-004",
    name: "Fashion",
    slug: "fashion",
    parent: "",
    description: "Clothing, footwear, and fashion accessories.",
    productCount: 96,
    status: "Active",
    createdAt: "2026-09-16",
  },
  {
    id: "CAT-005",
    name: "Men's Clothing",
    slug: "mens-clothing",
    parent: "Fashion",
    description: "Clothing and essentials for men.",
    productCount: 38,
    status: "Active",
    createdAt: "2026-09-18",
  },
  {
    id: "CAT-006",
    name: "Home & Living",
    slug: "home-living",
    parent: "",
    description: "Useful products for home and everyday living.",
    productCount: 74,
    status: "Active",
    createdAt: "2026-09-20",
  },
  {
    id: "CAT-007",
    name: "Kitchen Appliances",
    slug: "kitchen-appliances",
    parent: "Home & Living",
    description: "Appliances and tools for the kitchen.",
    productCount: 19,
    status: "Inactive",
    createdAt: "2026-09-22",
  },
  {
    id: "CAT-008",
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    parent: "",
    description: "Personal care and beauty essentials.",
    productCount: 53,
    status: "Active",
    createdAt: "2026-09-24",
  },
  {
    id: "CAT-009",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    parent: "",
    description: "Fitness, recreation, and outdoor products.",
    productCount: 0,
    status: "Inactive",
    createdAt: "2026-09-27",
  },
];

const blankCategory = {
  name: "",
  slug: "",
  parent: "",
  description: "",
  status: "Active",
};

function makeSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function StatCard({ label, value, hint, icon: Icon, tone }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#646970]">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#1d2327]">
            {value}
          </p>
          <p className="mt-1 text-xs text-[#646970]">{hint}</p>
        </div>
        <div className={`rounded-xl p-3 ${tone}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-gray-400"
        }`}
      />
      {status}
    </span>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [parentFilter, setParentFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(blankCategory);
  const [formError, setFormError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const stats = useMemo(
    () => ({
      total: categories.length,
      active: categories.filter((item) => item.status === "Active").length,
      inactive: categories.filter((item) => item.status === "Inactive").length,
      products: categories.reduce((sum, item) => sum + item.productCount, 0),
    }),
    [categories]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return categories.filter((item) => {
      const matchesSearch =
        !query ||
        [item.id, item.name, item.slug, item.description, item.parent]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        item.status.toLowerCase() === statusFilter;

      const matchesParent =
        parentFilter === "all" ||
        (parentFilter === "root" && !item.parent) ||
        item.parent === parentFilter;

      return matchesSearch && matchesStatus && matchesParent;
    });
  }, [categories, search, statusFilter, parentFilter]);

  function openCreateModal() {
    setEditingId(null);
    setForm(blankCategory);
    setFormError("");
    setModalOpen(true);
  }

  function openEditModal(category) {
    setEditingId(category.id);
    setForm({
      name: category.name,
      slug: category.slug,
      parent: category.parent,
      description: category.description,
      status: category.status,
    });
    setFormError("");
    setModalOpen(true);
  }

  function updateForm(key, value) {
    setForm((current) => {
      const next = { ...current, [key]: value };

      if (key === "name") {
        next.slug = makeSlug(value);
      }

      return next;
    });
    setFormError("");
  }

  function saveCategory(event) {
    event.preventDefault();

    const name = form.name.trim();
    const slug = makeSlug(form.slug);

    if (!name) {
      setFormError("Please enter a category name.");
      return;
    }

    if (!slug) {
      setFormError("Please enter a valid category slug.");
      return;
    }

    const duplicate = categories.some(
      (item) =>
        item.id !== editingId &&
        (item.name.toLowerCase() === name.toLowerCase() ||
          item.slug.toLowerCase() === slug.toLowerCase())
    );

    if (duplicate) {
      setFormError("A category with this name or slug already exists.");
      return;
    }

    if (editingId) {
      setCategories((current) =>
        current.map((item) =>
          item.id === editingId
            ? { ...item, ...form, name, slug }
            : item
        )
      );
    } else {
      const newCategory = {
        id: `CAT-${String(Date.now()).slice(-6)}`,
        ...form,
        name,
        slug,
        productCount: 0,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      setCategories((current) => [newCategory, ...current]);
    }

    setModalOpen(false);
  }

  function toggleStatus(id) {
    setCategories((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  }

  function deleteCategory() {
    if (!deleteTarget) return;

    const target = categories.find((item) => item.id === deleteTarget);

    if (target && target.productCount > 0) {
      setFormError(
        "This category contains products. Reassign or remove those products before deleting it."
      );
      return;
    }

    setCategories((current) =>
      current
        .filter((item) => item.id !== deleteTarget)
        .map((item) =>
          item.parent === target?.name ? { ...item, parent: "" } : item
        )
    );
    setSelectedIds((current) =>
      current.filter((id) => id !== deleteTarget)
    );
    setDeleteTarget(null);
    setFormError("");
  }

  function toggleSelected(id) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id]
    );
  }

  function toggleAllSelected() {
    const allVisibleSelected =
      filtered.length > 0 &&
      filtered.every((item) => selectedIds.includes(item.id));

    if (allVisibleSelected) {
      setSelectedIds((current) =>
        current.filter((id) => !filtered.some((item) => item.id === id))
      );
    } else {
      setSelectedIds((current) =>
        [...new Set([...current, ...filtered.map((item) => item.id)])]
      );
    }
  }

  function applyBulkStatus(status) {
    setCategories((current) =>
      current.map((item) =>
        selectedIds.includes(item.id) ? { ...item, status } : item
      )
    );
    setSelectedIds([]);
  }

  function exportCSV() {
    const headers = [
      "ID",
      "Name",
      "Slug",
      "Parent",
      "Description",
      "Product Count",
      "Status",
      "Created At",
    ];

    const rows = filtered.map((item) => [
      item.id,
      item.name,
      item.slug,
      item.parent,
      item.description,
      item.productCount,
      item.status,
      item.createdAt,
    ]);

    const escapeCell = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCell).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "amardokan-categories.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen space-y-6 bg-[#f6f7f7] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#646970]">
            <span>Admin</span>
            <span>/</span>
            <span>Catalog</span>
            <span>/</span>
            <span className="text-[#2271b1]">Categories</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#eaf4d8] p-3 text-[#4d7618]">
              <FolderTree size={25} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Categories
              </h1>
              <p className="mt-1 text-sm text-[#646970]">
                Organize your product catalog into manageable categories.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-lg border border-[#c3c4c7] bg-white px-4 py-2.5 text-sm font-semibold text-[#2c3338] hover:bg-gray-50"
          >
            <Download size={16} />
            Export CSV
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-semibold text-[#20320b] hover:bg-[#91c93b]"
          >
            <Plus size={17} />
            Add category
          </button>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-[#d6e6bb] bg-[#f6fbea] p-4">
        <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[#527d1b]" />
        <div>
          <p className="text-sm font-semibold text-[#355314]">
            Category management
          </p>
          <p className="mt-1 text-sm leading-6 text-[#526345]">
            This is a frontend demo. Category changes are held in local state
            and will reset when the page reloads.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total categories"
          value={stats.total}
          hint="Parent and child categories"
          icon={FolderTree}
          tone="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Active categories"
          value={stats.active}
          hint="Enabled in this demo"
          icon={CheckCircle2}
          tone="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Inactive categories"
          value={stats.inactive}
          hint="Not currently enabled"
          icon={EyeOff}
          tone="bg-amber-50 text-amber-700"
        />
        <StatCard
          label="Products assigned"
          value={stats.products}
          hint="Sample category counts"
          icon={Package}
          tone="bg-violet-50 text-violet-600"
        />
      </div>

      <section className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
        <div className="border-b border-[#dcdcde] p-4 sm:p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold">All categories</h2>
              <p className="mt-1 text-sm text-[#646970]">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative min-w-0 flex-1 sm:min-w-57.5">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c8f94]"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full rounded-lg border border-[#c3c4c7] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
              >
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={parentFilter}
                onChange={(e) => setParentFilter(e.target.value)}
                className="rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
              >
                <option value="all">All parents</option>
                <option value="root">Parent categories only</option>
                {[...new Set(categories.map((item) => item.parent).filter(Boolean))].map(
                  (parent) => (
                    <option key={parent} value={parent}>
                      {parent}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {selectedIds.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-[#d6e6bb] bg-[#f6fbea] p-3">
              <span className="mr-2 text-sm font-semibold text-[#365814]">
                {selectedIds.length} selected
              </span>
              <button
                onClick={() => applyBulkStatus("Active")}
                className="rounded-lg border border-[#c3c4c7] bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
              >
                Set active
              </button>
              <button
                onClick={() => applyBulkStatus("Inactive")}
                className="rounded-lg border border-[#c3c4c7] bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
              >
                Set inactive
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="ml-auto rounded-lg p-2 text-[#646970] hover:bg-white"
                aria-label="Clear selection"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-225 text-left">
            <thead className="bg-[#f6f7f7]">
              <tr className="border-b border-[#dcdcde] text-xs font-bold uppercase tracking-wide text-[#646970]">
                <th className="w-12 px-5 py-3">
                  <input
                    type="checkbox"
                    checked={
                      filtered.length > 0 &&
                      filtered.every((item) => selectedIds.includes(item.id))
                    }
                    onChange={toggleAllSelected}
                    aria-label="Select all visible categories"
                    className="h-4 w-4 accent-[#78a936]"
                  />
                </th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Parent</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f0f0f1]">
              {filtered.map((item) => (
                <tr key={item.id} className="group hover:bg-[#fafafa]">
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelected(item.id)}
                      aria-label={`Select ${item.name}`}
                      className="h-4 w-4 accent-[#78a936]"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-[#f0f0f1] p-2 text-[#646970]">
                        {item.parent ? (
                          <Tag size={17} />
                        ) : (
                          <Folder size={17} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1d2327]">
                          {item.name}
                        </p>
                        <p className="mt-1 max-w-sm text-xs leading-5 text-[#646970]">
                          {item.description || "No description"}
                        </p>
                        <p className="mt-1 text-[11px] text-[#8c8f94]">
                          {item.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <code className="rounded bg-[#f6f7f7] px-2 py-1 text-xs text-[#50575e]">
                      {item.slug}
                    </code>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#646970]">
                    {item.parent || (
                      <span className="text-xs text-[#8c8f94]">Top level</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3c434a]">
                      <Package size={15} className="text-[#8c8f94]" />
                      {item.productCount}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-100 transition sm:opacity-70 sm:group-hover:opacity-100">
                      <button
                        onClick={() => openEditModal(item)}
                        title="Edit category"
                        className="rounded-lg p-2 text-[#646970] hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => toggleStatus(item.id)}
                        title={
                          item.status === "Active"
                            ? "Deactivate category"
                            : "Activate category"
                        }
                        className="rounded-lg p-2 text-[#646970] hover:bg-amber-50 hover:text-amber-700"
                      >
                        {item.status === "Active" ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setDeleteTarget(item.id);
                          setFormError("");
                        }}
                        title="Delete category"
                        className="rounded-lg p-2 text-[#646970] hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-[#f0f0f1] md:hidden">
          {filtered.map((item) => (
            <div key={item.id} className="space-y-3 p-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelected(item.id)}
                  aria-label={`Select ${item.name}`}
                  className="mt-1 h-4 w-4 accent-[#78a936]"
                />
                <div className="rounded-lg bg-[#f0f0f1] p-2 text-[#646970]">
                  {item.parent ? <Tag size={18} /> : <Folder size={18} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="wrap-break-word text-sm font-bold">{item.name}</p>
                  <p className="mt-1 text-xs text-[#646970]">{item.id}</p>
                  <p className="mt-2 wrap-break-word text-xs text-[#646970]">
                    {item.description || "No description"}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-lg bg-[#f6f7f7] p-3">
                <div>
                  <p className="text-xs text-[#646970]">Slug</p>
                  <p className="mt-1 break-all text-xs font-medium">{item.slug}</p>
                </div>
                <div>
                  <p className="text-xs text-[#646970]">Parent</p>
                  <p className="mt-1 text-xs font-medium">
                    {item.parent || "Top level"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#646970]">Products</p>
                  <p className="mt-1 text-sm font-semibold">{item.productCount}</p>
                </div>
                <div>
                  <p className="text-xs text-[#646970]">Created</p>
                  <p className="mt-1 text-xs font-medium">{item.createdAt}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#c3c4c7] px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => toggleStatus(item.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#c3c4c7] px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                >
                  {item.status === "Active" ? (
                    <EyeOff size={14} />
                  ) : (
                    <Eye size={14} />
                  )}
                  {item.status === "Active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => {
                    setDeleteTarget(item.id);
                    setFormError("");
                  }}
                  className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  aria-label={`Delete ${item.name}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="px-5 py-16 text-center">
            <FolderTree size={30} className="mx-auto text-[#8c8f94]" />
            <h3 className="mt-3 text-base font-bold">No categories found</h3>
            <p className="mt-2 text-sm text-[#646970]">
              Try another search or change your filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setParentFilter("all");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#c3c4c7] px-4 py-2 text-sm font-semibold hover:bg-gray-50"
            >
              <RotateCcw size={15} />
              Reset filters
            </button>
          </div>
        )}

        <div className="flex flex-col justify-between gap-2 border-t border-[#dcdcde] bg-[#fcfcfc] px-4 py-3 text-xs text-[#646970] sm:flex-row sm:items-center sm:px-5">
          <span>
            Showing {filtered.length} of {categories.length} categories
          </span>
          <span>Category counts are sample data.</span>
        </div>
      </section>

      {/* Create / edit modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setModalOpen(false)}
        >
          <form
            onSubmit={saveCategory}
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-modal-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#dcdcde] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#dcdcde] p-5 sm:p-6">
              <div>
                <h2 id="category-modal-title" className="text-lg font-bold">
                  {editingId ? "Edit category" : "Add new category"}
                </h2>
                <p className="mt-1 text-sm text-[#646970]">
                  Add details to organize products in your catalog.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-2 text-[#646970] hover:bg-[#f0f0f1]"
                aria-label="Close modal"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Category name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="e.g. Electronics"
                  className="w-full rounded-lg border border-[#c3c4c7] px-3 py-2.5 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  value={form.slug}
                  onChange={(e) => updateForm("slug", e.target.value)}
                  placeholder="electronics"
                  className="w-full rounded-lg border border-[#c3c4c7] px-3 py-2.5 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-1.5 text-xs text-[#646970]">
                  Used in URLs. It will be normalized to lowercase with hyphens.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Parent category
                </label>
                <select
                  value={form.parent}
                  onChange={(e) => updateForm("parent", e.target.value)}
                  className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                >
                  <option value="">None — top-level category</option>
                  {categories
                    .filter(
                      (item) =>
                        item.id !== editingId &&
                        !item.parent &&
                        item.name !== form.name
                    )
                    .map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    updateForm("description", e.target.value)
                  }
                  rows={3}
                  placeholder="Describe what belongs in this category..."
                  className="w-full resize-y rounded-lg border border-[#c3c4c7] px-3 py-2.5 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => updateForm("status", e.target.value)}
                  className="w-full rounded-lg border border-[#c3c4c7] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {formError && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertTriangle size={17} className="mt-0.5 shrink-0" />
                  {formError}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-[#dcdcde] p-4 sm:px-6">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg border border-[#c3c4c7] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#a3db4a] px-5 py-2.5 text-sm font-semibold text-[#20320b] hover:bg-[#91c93b]"
              >
                {editingId ? "Save changes" : "Create category"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => {
            setDeleteTarget(null);
            setFormError("");
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl border border-[#dcdcde] bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={22} />
            </div>
            <h2 className="mt-4 text-lg font-bold">Delete category?</h2>
            <p className="mt-2 text-sm leading-6 text-[#646970]">
              You cannot delete a category that still has products assigned.
              In production, also check whether child categories reference it.
            </p>

            {formError && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {formError}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setDeleteTarget(null);
                  setFormError("");
                }}
                className="rounded-lg border border-[#c3c4c7] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteCategory}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
