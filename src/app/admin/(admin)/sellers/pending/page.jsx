"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Store,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Eye,
  CheckCircle2,
  XCircle,
  Clock3,
  ShieldCheck,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

const initialApplications = [
  {
    id: "SEL-1011",
    name: "Tanvir Hasan",
    store: "Tanvir Fashion",
    email: "tanvir@example.com",
    phone: "01712345678",
    district: "Dhaka",
    category: "Fashion",
    date: "2026-10-08",
    status: "Pending",
    verification: "Incomplete",
    orders: 0,
    revenue: 0,
    address: "Mirpur, Dhaka",
    description: "Online clothing and fashion accessories store.",
  },
  {
    id: "SEL-1012",
    name: "Nusrat Jahan",
    store: "Nusrat Beauty House",
    email: "nusrat@example.com",
    phone: "01812345678",
    district: "Chattogram",
    category: "Beauty",
    date: "2026-10-07",
    status: "Pending",
    verification: "Submitted",
    orders: 0,
    revenue: 0,
    address: "Panchlaish, Chattogram",
    description: "Beauty products, skincare and cosmetics.",
  },
  {
    id: "SEL-1013",
    name: "Rakib Ahmed",
    store: "Tech Corner BD",
    email: "rakib@example.com",
    phone: "01912345678",
    district: "Dhaka",
    category: "Electronics",
    date: "2026-10-06",
    status: "Pending",
    verification: "Submitted",
    orders: 0,
    revenue: 0,
    address: "Uttara, Dhaka",
    description: "Mobile accessories and small electronic gadgets.",
  },
  {
    id: "SEL-1014",
    name: "Farzana Akter",
    store: "Farzana Home",
    email: "farzana@example.com",
    phone: "01612345678",
    district: "Narayanganj",
    category: "Home & Living",
    date: "2026-10-05",
    status: "Pending",
    verification: "Incomplete",
    orders: 0,
    revenue: 0,
    address: "Rupganj, Narayanganj",
    description: "Home decor, kitchen and household products.",
  },
  {
    id: "SEL-1015",
    name: "Mahmudul Islam",
    store: "Daily Needs BD",
    email: "mahmud@example.com",
    phone: "01512345678",
    district: "Gazipur",
    category: "Lifestyle",
    date: "2026-10-04",
    status: "Pending",
    verification: "Submitted",
    orders: 0,
    revenue: 0,
    address: "Tongi, Gazipur",
    description: "Daily-use items and lifestyle products.",
  },
];

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ children, tone = "gray" }) {
  const tones = {
    gray: "bg-gray-100 text-gray-700",
    amber: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    green: "bg-green-50 text-green-700 ring-1 ring-green-200",
    red: "bg-red-50 text-red-700 ring-1 ring-red-200",
    blue: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function Metric({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[#646970]">{title}</p>
        <span className={`rounded-lg p-2 ${color}`}>
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-[#1d2327]">
        {value}
      </p>
    </div>
  );
}

export default function PendingSellersPage() {
  const [applications, setApplications] = useState(initialApplications);
  const [search, setSearch] = useState("");
  const [verification, setVerification] = useState("All");
  const [selected, setSelected] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [notice, setNotice] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const pending = applications.filter((seller) => seller.status === "Pending");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return pending.filter((seller) => {
      const matchesSearch =
        !q ||
        [
          seller.id,
          seller.name,
          seller.store,
          seller.email,
          seller.phone,
          seller.district,
        ].some((value) => value.toLowerCase().includes(q));

      const matchesVerification =
        verification === "All" || seller.verification === verification;

      return matchesSearch && matchesVerification;
    });
  }, [pending, search, verification]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function processApplication(action) {
    if (!confirmation) return;

    const { seller, action: selectedAction } = confirmation;

    setApplications((current) =>
      current.map((item) =>
        item.id === seller.id
          ? {
              ...item,
              status: selectedAction === "approve" ? "Active" : "Rejected",
              verification:
                selectedAction === "approve" ? "Verified" : item.verification,
            }
          : item
      )
    );

    setNotice(
      selectedAction === "approve"
        ? `${seller.store} has been approved.`
        : `${seller.store} has been rejected.`
    );

    setConfirmation(null);
    setSelected(null);
  }

  return (
    <div className="min-h-screen bg-[#f0f0f1] p-4 text-[#1d2327] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-375 space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#646970]">
          <Link href="/admin" className="hover:text-[#2271b1]">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/admin/sellers" className="hover:text-[#2271b1]">
            Sellers
          </Link>
          <span>/</span>
          <span className="text-[#1d2327]">Pending applications</span>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/sellers"
                className="rounded-lg border border-[#dcdcde] bg-white p-2 hover:bg-gray-50"
                aria-label="Back to sellers"
              >
                <ArrowLeft size={18} />
              </Link>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Pending Sellers
              </h1>
            </div>
            <p className="mt-2 text-sm text-[#646970]">
              Review seller applications and verify account information before
              granting access to AmarDokan.
            </p>
          </div>

          <Link
            href="/admin/sellers"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#dcdcde] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
          >
            <Store size={16} />
            All sellers
          </Link>
        </div>

        {notice && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} />
              {notice}
            </span>
            <button onClick={() => setNotice("")} aria-label="Dismiss notice">
              <X size={16} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Metric
            title="Pending applications"
            value={pending.length}
            icon={Clock3}
            color="bg-amber-50 text-amber-700"
          />
          <Metric
            title="Documents submitted"
            value={pending.filter((s) => s.verification === "Submitted").length}
            icon={FileText}
            color="bg-blue-50 text-blue-700"
          />
          <Metric
            title="Need more information"
            value={pending.filter((s) => s.verification === "Incomplete").length}
            icon={AlertTriangle}
            color="bg-red-50 text-red-700"
          />
        </div>

        <section className="overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
          <div className="border-b border-[#dcdcde] p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-bold">Seller applications</h2>
                <p className="mt-1 text-sm text-[#646970]">
                  {filtered.length} application{filtered.length === 1 ? "" : "s"} found
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative min-w-0 sm:w-72">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646970]"
                  />
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search name, store, email..."
                    className="w-full rounded-lg border border-[#8c8f94] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                  />
                </div>

                <select
                  value={verification}
                  onChange={(e) => {
                    setVerification(e.target.value);
                    setPage(1);
                  }}
                  className="rounded-lg border border-[#8c8f94] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2271b1]"
                >
                  <option value="All">All verification statuses</option>
                  <option value="Submitted">Documents submitted</option>
                  <option value="Incomplete">Incomplete documents</option>
                </select>
              </div>
            </div>
          </div>

          {visible.length ? (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-225 text-left text-sm">
                  <thead className="bg-[#f6f7f7] text-xs uppercase tracking-wide text-[#646970]">
                    <tr>
                      <th className="px-5 py-3">Seller</th>
                      <th className="px-5 py-3">Contact</th>
                      <th className="px-5 py-3">Category / district</th>
                      <th className="px-5 py-3">Applied</th>
                      <th className="px-5 py-3">Verification</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f0f1]">
                    {visible.map((seller) => (
                      <tr key={seller.id} className="hover:bg-[#f9fafb]">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#edf6df] font-bold text-[#527b1d]">
                              {seller.store.slice(0, 1)}
                            </div>
                            <div>
                              <p className="font-semibold">{seller.store}</p>
                              <p className="mt-1 text-xs text-[#646970]">
                                {seller.name} · {seller.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p>{seller.email}</p>
                          <p className="mt-1 text-xs text-[#646970]">
                            {seller.phone}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <p>{seller.category}</p>
                          <p className="mt-1 text-xs text-[#646970]">
                            {seller.district}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-[#646970]">
                          {formatDate(seller.date)}
                        </td>
                        <td className="px-5 py-4">
                          {seller.verification === "Submitted" ? (
                            <StatusBadge tone="blue">Submitted</StatusBadge>
                          ) : (
                            <StatusBadge tone="amber">Incomplete</StatusBadge>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setSelected(seller)}
                              className="rounded-lg border border-[#dcdcde] p-2 hover:bg-gray-100"
                              title="Review application"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() =>
                                setConfirmation({ seller, action: "approve" })
                              }
                              className="rounded-lg bg-[#a3db4a] px-3 py-2 text-xs font-bold text-[#1d2327] hover:bg-[#8fc934]"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                setConfirmation({ seller, action: "reject" })
                              }
                              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-[#f0f0f1] md:hidden">
                {visible.map((seller) => (
                  <article key={seller.id} className="space-y-4 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#edf6df] font-bold text-[#527b1d]">
                        {seller.store.slice(0, 1)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="wrap-break-word font-semibold">{seller.store}</p>
                        <p className="mt-1 text-xs text-[#646970]">
                          {seller.name} · {seller.id}
                        </p>
                        <div className="mt-2">
                          {seller.verification === "Submitted" ? (
                            <StatusBadge tone="blue">Submitted</StatusBadge>
                          ) : (
                            <StatusBadge tone="amber">Incomplete</StatusBadge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-sm text-[#646970]">
                      <p className="flex items-center gap-2 break-all">
                        <Mail size={15} /> {seller.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone size={15} /> {seller.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin size={15} /> {seller.district} · {seller.category}
                      </p>
                      <p className="flex items-center gap-2">
                        <CalendarDays size={15} /> Applied {formatDate(seller.date)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelected(seller)}
                        className="rounded-lg border border-[#dcdcde] px-3 py-2 text-sm font-semibold"
                      >
                        Review
                      </button>
                      <button
                        onClick={() =>
                          setConfirmation({ seller, action: "approve" })
                        }
                        className="rounded-lg bg-[#a3db4a] px-3 py-2 text-sm font-bold"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          setConfirmation({ seller, action: "reject" })
                        }
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-[#dcdcde] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="text-sm text-[#646970]">
                  Showing {(currentPage - 1) * pageSize + 1}–
                  {Math.min(currentPage * pageSize, filtered.length)} of{" "}
                  {filtered.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="rounded-lg border border-[#dcdcde] p-2 disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={17} />
                  </button>
                  <span className="px-2 text-sm">
                    Page {currentPage} of {pageCount}
                  </span>
                  <button
                    disabled={currentPage >= pageCount}
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                    className="rounded-lg border border-[#dcdcde] p-2 disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="px-6 py-16 text-center">
              <CheckCircle2 size={35} className="mx-auto text-green-600" />
              <h3 className="mt-3 font-bold">No pending applications found</h3>
              <p className="mt-1 text-sm text-[#646970]">
                Try changing your search or verification filter.
              </p>
            </div>
          )}
        </section>

        <p className="text-xs leading-5 text-[#646970]">
          Demo note: these actions update local page state only. Connect approval
          and rejection to protected server-side API routes before production.
        </p>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-start justify-between border-b border-[#dcdcde] p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#646970]">
                  Application review
                </p>
                <h2 className="mt-1 text-xl font-bold">{selected.store}</h2>
                <p className="mt-1 text-sm text-[#646970]">
                  {selected.id} · Submitted {formatDate(selected.date)}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 hover:bg-gray-100"
                aria-label="Close review"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-[#646970]">Owner name</p>
                  <p className="mt-1 font-semibold">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs text-[#646970]">Seller ID</p>
                  <p className="mt-1 font-semibold">{selected.id}</p>
                </div>
                <div>
                  <p className="text-xs text-[#646970]">Email</p>
                  <p className="mt-1 break-all font-medium">{selected.email}</p>
                </div>
                <div>
                  <p className="text-xs text-[#646970]">Phone</p>
                  <p className="mt-1 font-medium">{selected.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-[#646970]">Business category</p>
                  <p className="mt-1 font-medium">{selected.category}</p>
                </div>
                <div>
                  <p className="text-xs text-[#646970]">Location</p>
                  <p className="mt-1 font-medium">{selected.address}</p>
                </div>
              </div>

              <div className="rounded-xl border border-[#dcdcde] p-4">
                <p className="text-sm font-bold">Business description</p>
                <p className="mt-2 text-sm leading-6 text-[#646970]">
                  {selected.description}
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={20} className="mt-0.5 text-amber-700" />
                  <div>
                    <p className="font-semibold text-amber-900">
                      Verification: {selected.verification}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-amber-800">
                      {selected.verification === "Submitted"
                        ? "Documents are marked as submitted in this demo. An administrator must inspect the actual documents and confirm their authenticity."
                        : "The seller has not completed the required verification information. Request the missing documents before approval."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-2 border-t border-[#dcdcde] pt-4">
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg border border-[#dcdcde] px-4 py-2.5 text-sm font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() =>
                    setConfirmation({ seller: selected, action: "reject" })
                  }
                  className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() =>
                    setConfirmation({ seller: selected, action: "approve" })
                  }
                  className="rounded-lg bg-[#a3db4a] px-4 py-2.5 text-sm font-bold hover:bg-[#8fc934]"
                >
                  Approve seller
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmation && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                confirmation.action === "approve"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {confirmation.action === "approve" ? (
                <CheckCircle2 size={22} />
              ) : (
                <XCircle size={22} />
              )}
            </div>
            <h2 className="mt-4 text-lg font-bold">
              {confirmation.action === "approve"
                ? "Approve this seller?"
                : "Reject this application?"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#646970]">
              {confirmation.action === "approve"
                ? `You are approving ${confirmation.seller.store}. In production, approve only after completing the required checks.`
                : `You are rejecting ${confirmation.seller.store}. In production, record a reason and notify the applicant.`}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setConfirmation(null)}
                className="rounded-lg border border-[#dcdcde] px-4 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => processApplication(confirmation.action)}
                className={`rounded-lg px-4 py-2.5 text-sm font-bold text-white ${
                  confirmation.action === "approve"
                    ? "bg-green-700 hover:bg-green-800"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Confirm {confirmation.action}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}