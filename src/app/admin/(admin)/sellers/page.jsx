"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Users,
  UserCheck,
  UserRoundPlus,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  Eye,
  CheckCircle2,
  Clock3,
  Ban,
  X,
  Store,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  ShoppingBag,
  Wallet,
  TrendingUp,
  MoreHorizontal,
  SlidersHorizontal,
  ArrowUpDown,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

const initialSellers = [
  {
    id: "SEL-1001",
    name: "Nusrat Jahan",
    store: "TrendHive BD",
    email: "nusrat@example.com",
    phone: "01712 345678",
    district: "Dhaka",
    joined: "Oct 02, 2026",
    orders: 184,
    revenue: 248500,
    balance: 12450,
    status: "Active",
    verification: "Verified",
    lastActive: "12 min ago",
  },
  {
    id: "SEL-1002",
    name: "Tanvir Hasan",
    store: "Urban Cart",
    email: "tanvir@example.com",
    phone: "01819 223344",
    district: "Chattogram",
    joined: "Sep 28, 2026",
    orders: 126,
    revenue: 187900,
    balance: 8320,
    status: "Active",
    verification: "Verified",
    lastActive: "34 min ago",
  },
  {
    id: "SEL-1003",
    name: "Sadia Rahman",
    store: "StyleMart",
    email: "sadia@example.com",
    phone: "01911 445566",
    district: "Sylhet",
    joined: "Oct 08, 2026",
    orders: 0,
    revenue: 0,
    balance: 0,
    status: "Pending",
    verification: "Pending",
    lastActive: "1 hr ago",
  },
  {
    id: "SEL-1004",
    name: "Rakib Ahmed",
    store: "Gadget Point",
    email: "rakib@example.com",
    phone: "01612 778899",
    district: "Narayanganj",
    joined: "Sep 21, 2026",
    orders: 92,
    revenue: 143600,
    balance: 6150,
    status: "Active",
    verification: "Verified",
    lastActive: "2 hrs ago",
  },
  {
    id: "SEL-1005",
    name: "Ayesha Karim",
    store: "Daily Needs",
    email: "ayesha@example.com",
    phone: "01722 889900",
    district: "Gazipur",
    joined: "Sep 15, 2026",
    orders: 67,
    revenue: 98400,
    balance: 0,
    status: "Suspended",
    verification: "Verified",
    lastActive: "3 days ago",
  },
  {
    id: "SEL-1006",
    name: "Imran Hossain",
    store: "NextGen Store",
    email: "imran@example.com",
    phone: "01844 112233",
    district: "Cumilla",
    joined: "Oct 07, 2026",
    orders: 4,
    revenue: 5200,
    balance: 1200,
    status: "Active",
    verification: "Pending",
    lastActive: "18 min ago",
  },
  {
    id: "SEL-1007",
    name: "Farzana Akter",
    store: "Fari's Closet",
    email: "farzana@example.com",
    phone: "01922 334455",
    district: "Rajshahi",
    joined: "Aug 30, 2026",
    orders: 211,
    revenue: 326700,
    balance: 18900,
    status: "Active",
    verification: "Verified",
    lastActive: "5 min ago",
  },
  {
    id: "SEL-1008",
    name: "Mahmudul Hasan",
    store: "MH Essentials",
    email: "mahmud@example.com",
    phone: "01511 667788",
    district: "Khulna",
    joined: "Oct 06, 2026",
    orders: 0,
    revenue: 0,
    balance: 0,
    status: "Pending",
    verification: "Pending",
    lastActive: "Yesterday",
  },
  {
    id: "SEL-1009",
    name: "Rifat Islam",
    store: "Rifat Tech",
    email: "rifat@example.com",
    phone: "01711 998877",
    district: "Dhaka",
    joined: "Aug 17, 2026",
    orders: 148,
    revenue: 219300,
    balance: 9600,
    status: "Active",
    verification: "Verified",
    lastActive: "41 min ago",
  },
  {
    id: "SEL-1010",
    name: "Mim Akter",
    store: "Mim's Choice",
    email: "mim@example.com",
    phone: "01611 223344",
    district: "Barishal",
    joined: "Oct 09, 2026",
    orders: 0,
    revenue: 0,
    balance: 0,
    status: "Pending",
    verification: "Pending",
    lastActive: "Just now",
  },
];

function formatPrice(value) {
  return `৳${Number(value).toLocaleString("en-BD")}`;
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Pending: "bg-amber-50 text-amber-700 ring-amber-200",
    Suspended: "bg-red-50 text-red-700 ring-red-200",
    Verified: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Rejected: "bg-red-50 text-red-700 ring-red-200",
  };

  const Icon =
    status === "Active" || status === "Verified"
      ? CheckCircle2
      : status === "Suspended" || status === "Rejected"
        ? Ban
        : Clock3;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${
        styles[status] || "bg-gray-50 text-gray-600 ring-gray-200"
      }`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

function MetricCard({ title, value, description, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-[#dcdcde] bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-[#646970]">{title}</span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
          <Icon size={17} />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-[#1d2327]">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-[#8c8f94]">{description}</p>
    </div>
  );
}

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState(initialSellers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [verificationFilter, setVerificationFilter] = useState("All verification");
  const [districtFilter, setDistrictFilter] = useState("All districts");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("10");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [notice, setNotice] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  const districts = useMemo(
    () => [...new Set(sellers.map((seller) => seller.district))].sort(),
    [sellers]
  );

  const filteredSellers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = sellers.filter((seller) => {
      const matchesSearch =
        !query ||
        [
          seller.id,
          seller.name,
          seller.store,
          seller.email,
          seller.phone,
          seller.district,
        ].some((value) => value.toLowerCase().includes(query));

      return (
        matchesSearch &&
        (statusFilter === "All statuses" || seller.status === statusFilter) &&
        (verificationFilter === "All verification" ||
          seller.verification === verificationFilter) &&
        (districtFilter === "All districts" ||
          seller.district === districtFilter)
      );
    });

    return [...result].sort((a, b) => {
      if (sortBy === "orders-high") return b.orders - a.orders;
      if (sortBy === "revenue-high") return b.revenue - a.revenue;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return b.id.localeCompare(a.id);
    });
  }, [
    sellers,
    search,
    statusFilter,
    verificationFilter,
    districtFilter,
    sortBy,
  ]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredSellers.length / Number(pageSize))
  );
  const currentPage = Math.min(page, pageCount);
  const visibleSellers = filteredSellers.slice(
    (currentPage - 1) * Number(pageSize),
    currentPage * Number(pageSize)
  );

  const activeCount = sellers.filter((s) => s.status === "Active").length;
  const pendingCount = sellers.filter((s) => s.status === "Pending").length;
  const verifiedCount = sellers.filter((s) => s.verification === "Verified").length;
  const suspendedCount = sellers.filter((s) => s.status === "Suspended").length;
  const totalRevenue = sellers.reduce((sum, s) => sum + s.revenue, 0);

  const allVisibleSelected =
    visibleSellers.length > 0 &&
    visibleSellers.every((seller) => selectedIds.includes(seller.id));

  function toggleSeller(id) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function toggleVisible() {
    if (allVisibleSelected) {
      setSelectedIds((current) =>
        current.filter(
          (id) => !visibleSellers.some((seller) => seller.id === id)
        )
      );
    } else {
      setSelectedIds((current) => [
        ...new Set([...current, ...visibleSellers.map((seller) => seller.id)]),
      ]);
    }
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("All statuses");
    setVerificationFilter("All verification");
    setDistrictFilter("All districts");
    setSortBy("newest");
    setPage(1);
  }

  function updateSeller(id, updates) {
    setSellers((current) =>
      current.map((seller) =>
        seller.id === id ? { ...seller, ...updates } : seller
      )
    );

    setSelectedSeller((current) =>
      current?.id === id ? { ...current, ...updates } : current
    );
  }

  function performSellerAction() {
    if (!confirmAction) return;

    const { seller, action } = confirmAction;

    if (action === "approve") {
      updateSeller(seller.id, {
        status: "Active",
        verification: "Verified",
      });
      setNotice(`${seller.store} has been approved and verified.`);
    }

    if (action === "verify") {
      updateSeller(seller.id, { verification: "Verified" });
      setNotice(`${seller.store} has been verified.`);
    }

    if (action === "suspend") {
      updateSeller(seller.id, { status: "Suspended" });
      setNotice(`${seller.store} has been suspended.`);
    }

    if (action === "activate") {
      updateSeller(seller.id, { status: "Active" });
      setNotice(`${seller.store} has been reactivated.`);
    }

    setConfirmAction(null);
  }

  function exportSellers() {
    const rows = filteredSellers;
    const header = [
      "Seller ID",
      "Name",
      "Store",
      "Email",
      "Phone",
      "District",
      "Joined",
      "Orders",
      "Revenue",
      "Balance",
      "Account Status",
      "Verification",
    ];

    const csvRows = rows.map((seller) =>
      [
        seller.id,
        seller.name,
        seller.store,
        seller.email,
        seller.phone,
        seller.district,
        seller.joined,
        seller.orders,
        seller.revenue,
        seller.balance,
        seller.status,
        seller.verification,
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    );

    const blob = new Blob(
      ["\uFEFF", [header.join(","), ...csvRows].join("\n")],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "amardokan-sellers.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice(`${rows.length} seller records exported.`);
  }

  function handleBulkAction(action) {
    if (!action || selectedIds.length === 0) {
      setNotice("Select at least one seller first.");
      return;
    }

    if (action === "export") {
      exportSellers();
      return;
    }

    if (action === "verify") {
      setSellers((current) =>
        current.map((seller) =>
          selectedIds.includes(seller.id)
            ? { ...seller, verification: "Verified" }
            : seller
        )
      );
      setNotice("Selected seller records marked as verified.");
    }

    if (action === "activate") {
      setSellers((current) =>
        current.map((seller) =>
          selectedIds.includes(seller.id)
            ? { ...seller, status: "Active" }
            : seller
        )
      );
      setNotice("Selected seller accounts activated.");
    }

    setSelectedIds([]);
  }

  const hasFilters =
    search ||
    statusFilter !== "All statuses" ||
    verificationFilter !== "All verification" ||
    districtFilter !== "All districts";

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1700px]">
        {/* Page heading */}
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-[#8c8f94]">
              <span>Admin</span>
              <ChevronRight size={13} />
              <span className="font-medium text-[#50575e]">Sellers</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#1d2327] sm:text-3xl">
              Sellers
            </h1>
            <p className="mt-1.5 text-sm text-[#646970]">
              Manage seller accounts, verification, performance and access.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={exportSellers}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#c3c4c7] bg-white px-3.5 text-sm font-semibold text-[#1d2327] hover:bg-[#f6f7f7]"
            >
              <Download size={16} />
              Export CSV
            </button>

            <Link
              href="/admin/sellers/pending"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#1d2327] px-3.5 text-sm font-semibold text-white hover:bg-[#2c3338]"
            >
              <Clock3 size={15} />
              Pending approvals
            </Link>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-4">
          <MetricCard
            title="Total Sellers"
            value={sellers.length.toLocaleString("en-BD")}
            description="All registered accounts"
            icon={Users}
            color="bg-[#edf6df] text-[#638e27]"
          />
          <MetricCard
            title="Active Sellers"
            value={activeCount.toLocaleString("en-BD")}
            description="Accounts currently active"
            icon={UserCheck}
            color="bg-emerald-50 text-emerald-600"
          />
          <MetricCard
            title="Pending Approval"
            value={pendingCount.toLocaleString("en-BD")}
            description="Require account review"
            icon={UserRoundPlus}
            color="bg-amber-50 text-amber-600"
          />
          <MetricCard
            title="Suspended"
            value={suspendedCount.toLocaleString("en-BD")}
            description="Accounts with restricted access"
            icon={ShieldAlert}
            color="bg-red-50 text-red-600"
          />
        </div>

        {/* Notice */}
        {notice && (
          <div className="mt-5 flex items-start justify-between gap-3 rounded-lg border border-[#d6e8b9] bg-[#f5faed] px-4 py-3 text-sm text-[#456b13]">
            <p>{notice}</p>
            <button
              onClick={() => setNotice("")}
              aria-label="Dismiss message"
              className="shrink-0 rounded p-0.5 hover:bg-black/5"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Verification alert */}
        {pendingCount > 0 && (
          <div className="mt-5 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <Clock3 size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#7c4a03]">
                  Seller review required
                </p>
                <p className="mt-1 text-xs leading-5 text-amber-800/80">
                  {pendingCount} account{pendingCount === 1 ? "" : "s"} awaiting
                  approval. Review submitted information before enabling access.
                </p>
              </div>
            </div>

            <Link
              href="/admin/sellers/pending"
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-amber-300 bg-white px-3 text-xs font-semibold text-amber-800 hover:bg-amber-100"
            >
              Review sellers
              <ChevronRight size={14} />
            </Link>
          </div>
        )}

        {/* Sellers panel */}
        <section className="mt-6 overflow-hidden rounded-xl border border-[#dcdcde] bg-white">
          <div className="flex flex-col gap-3 border-b border-[#eee] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="text-sm font-bold text-[#1d2327]">
                All Sellers
              </h2>
              <p className="mt-1 text-xs text-[#8c8f94]">
                {filteredSellers.length} matching accounts ·{" "}
                {verifiedCount} verified overall
              </p>
            </div>

            <button
              onClick={() => setShowFilters((current) => !current)}
              className={`inline-flex h-9 items-center justify-center gap-2 self-start rounded-lg border px-3 text-xs font-semibold sm:self-auto ${
                showFilters
                  ? "border-[#8aad45] bg-[#f5faed] text-[#456b13]"
                  : "border-[#dcdcde] text-[#50575e] hover:bg-[#f6f7f7]"
              }`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasFilters && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#78a92b]" />
              )}
            </button>
          </div>

          {/* Search */}
          <div className="space-y-3 border-b border-[#eee] p-4 sm:px-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c8f94]"
                />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search seller ID, name, store, email or phone..."
                  className="h-10 w-full rounded-lg border border-[#dcdcde] bg-white pl-9 pr-3 text-sm outline-none placeholder:text-[#a0a3a7] focus:border-[#8aad45] focus:ring-2 focus:ring-[#a3db4a]/20"
                />
              </div>

              <label className="flex h-10 items-center gap-2 rounded-lg border border-[#dcdcde] px-3">
                <ArrowUpDown size={14} className="text-[#8c8f94]" />
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  className="bg-transparent text-xs font-medium text-[#50575e] outline-none"
                >
                  <option value="newest">Newest first</option>
                  <option value="name">Name A–Z</option>
                  <option value="orders-high">Most orders</option>
                  <option value="revenue-high">Highest revenue</option>
                </select>
              </label>
            </div>

            {showFilters && (
              <div className="grid gap-3 pt-1 sm:grid-cols-2 xl:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#646970]">
                    Account status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                    className="h-10 w-full rounded-lg border border-[#dcdcde] bg-white px-3 text-sm outline-none focus:border-[#8aad45]"
                  >
                    <option>All statuses</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Suspended</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#646970]">
                    Verification
                  </label>
                  <select
                    value={verificationFilter}
                    onChange={(e) => {
                      setVerificationFilter(e.target.value);
                      setPage(1);
                    }}
                    className="h-10 w-full rounded-lg border border-[#dcdcde] bg-white px-3 text-sm outline-none focus:border-[#8aad45]"
                  >
                    <option>All verification</option>
                    <option>Verified</option>
                    <option>Pending</option>
                    <option>Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#646970]">
                    District
                  </label>
                  <select
                    value={districtFilter}
                    onChange={(e) => {
                      setDistrictFilter(e.target.value);
                      setPage(1);
                    }}
                    className="h-10 w-full rounded-lg border border-[#dcdcde] bg-white px-3 text-sm outline-none focus:border-[#8aad45]"
                  >
                    <option>All districts</option>
                    {districts.map((district) => (
                      <option key={district}>{district}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#dcdcde] px-3 text-xs font-semibold text-[#50575e] hover:bg-[#f6f7f7]"
                  >
                    <RefreshCw size={14} />
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bulk actions */}
          <BulkToolbar
            selectedCount={selectedIds.length}
            pageSize={pageSize}
            setPageSize={(value) => {
              setPageSize(value);
              setPage(1);
            }}
            onAction={handleBulkAction}
          />

          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-280 text-left">
              <thead>
                <tr className="border-b border-[#eee] bg-white">
                  <th className="w-12 px-5 py-3">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleVisible}
                      aria-label="Select all visible sellers"
                      className="h-4 w-4 cursor-pointer accent-[#78a92b]"
                    />
                  </th>
                  {[
                    "Seller",
                    "Store / Location",
                    "Joined",
                    "Orders",
                    "Revenue",
                    "Verification",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className={`px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8c8f94] ${
                        heading === "Action" ? "text-right" : ""
                      }`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {visibleSellers.map((seller) => (
                  <tr
                    key={seller.id}
                    className={`border-b border-[#f0f0f1] transition last:border-0 hover:bg-[#fafbf8] ${
                      selectedIds.includes(seller.id) ? "bg-[#f7faef]" : ""
                    }`}
                  >
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(seller.id)}
                        onChange={() => toggleSeller(seller.id)}
                        aria-label={`Select ${seller.store}`}
                        className="h-4 w-4 cursor-pointer accent-[#78a92b]"
                      />
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf6df] text-sm font-bold text-[#638e27]">
                          {seller.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1d2327]">
                            {seller.name}
                          </p>
                          <p className="mt-1 text-[10px] text-[#8c8f94]">
                            {seller.id}
                          </p>
                          <p className="mt-1 text-[11px] text-[#646970]">
                            {seller.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      <p className="text-xs font-semibold text-[#1d2327]">
                        {seller.store}
                      </p>
                      <p className="mt-1 text-[11px] text-[#8c8f94]">
                        {seller.district}, Bangladesh
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-xs text-[#646970]">
                      {seller.joined}
                    </td>

                    <td className="px-3 py-4">
                      <p className="text-xs font-bold text-[#1d2327]">
                        {seller.orders.toLocaleString("en-BD")}
                      </p>
                      <p className="mt-1 text-[10px] text-[#8c8f94]">
                        total orders
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4">
                      <p className="text-xs font-bold text-[#1d2327]">
                        {formatPrice(seller.revenue)}
                      </p>
                      <p className="mt-1 text-[10px] text-[#8c8f94]">
                        gross order value
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <StatusBadge status={seller.verification} />
                    </td>

                    <td className="px-3 py-4">
                      <StatusBadge status={seller.status} />
                    </td>

                    <td className="px-3 py-4 text-right">
                      <button
                        onClick={() => setSelectedSeller(seller)}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#dcdcde] bg-white px-2.5 text-xs font-semibold text-[#50575e] hover:border-[#a3db4a] hover:bg-[#f5faed]"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-[#eee] lg:hidden">
            {visibleSellers.map((seller) => (
              <div key={seller.id} className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(seller.id)}
                    onChange={() => toggleSeller(seller.id)}
                    aria-label={`Select ${seller.store}`}
                    className="mt-1 h-4 w-4 accent-[#78a92b]"
                  />

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf6df] text-sm font-bold text-[#638e27]">
                    {seller.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-[#1d2327]">
                          {seller.name}
                        </p>
                        <p className="mt-1 text-xs text-[#646970]">
                          {seller.store}
                        </p>
                        <p className="mt-1 text-[10px] text-[#8c8f94]">
                          {seller.id}
                        </p>
                      </div>
                      <StatusBadge status={seller.status} />
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <StatusBadge status={seller.verification} />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-[#fafafa] p-3">
                      <div>
                        <p className="text-[10px] text-[#8c8f94]">Orders</p>
                        <p className="mt-1 text-sm font-bold">{seller.orders}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#8c8f94]">Revenue</p>
                        <p className="mt-1 text-sm font-bold">
                          {formatPrice(seller.revenue)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedSeller(seller)}
                      className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#dcdcde] text-xs font-semibold text-[#50575e] hover:bg-[#f6f7f7]"
                    >
                      <Eye size={14} />
                      View seller details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleSellers.length === 0 && (
            <div className="px-5 py-16 text-center">
              <Users size={26} className="mx-auto text-[#8c8f94]" />
              <h3 className="mt-3 text-sm font-bold text-[#1d2327]">
                No sellers found
              </h3>
              <p className="mt-1 text-xs text-[#8c8f94]">
                Try changing your search or filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-xs font-semibold text-[#5f8c20] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-[#eee] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-[#646970]">
              Showing{" "}
              <span className="font-semibold text-[#1d2327]">
                {filteredSellers.length === 0
                  ? 0
                  : (currentPage - 1) * Number(pageSize) + 1}
              </span>
              {" – "}
              <span className="font-semibold text-[#1d2327]">
                {Math.min(currentPage * Number(pageSize), filteredSellers.length)}
              </span>
              {" of "}
              <span className="font-semibold text-[#1d2327]">
                {filteredSellers.length}
              </span>{" "}
              sellers
            </p>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dcdcde] text-[#50575e] hover:bg-[#f6f7f7] disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from({ length: pageCount }, (_, index) => index + 1)
                .filter(
                  (number) =>
                    number === 1 ||
                    number === pageCount ||
                    Math.abs(number - currentPage) <= 1
                )
                .map((number, index, array) => (
                  <span key={number} className="contents">
                    {index > 0 && array[index - 1] !== number - 1 && (
                      <span className="px-1 text-xs text-[#8c8f94]">...</span>
                    )}
                    <button
                      onClick={() => setPage(number)}
                      className={`h-9 min-w-9 rounded-lg border px-2 text-xs font-semibold ${
                        currentPage === number
                          ? "border-[#1d2327] bg-[#1d2327] text-white"
                          : "border-[#dcdcde] text-[#50575e] hover:bg-[#f6f7f7]"
                      }`}
                    >
                      {number}
                    </button>
                  </span>
                ))}

              <button
                disabled={currentPage >= pageCount}
                onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dcdcde] text-[#50575e] hover:bg-[#f6f7f7] disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* Summary */}
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-[#dcdcde] bg-white p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#edf6df] text-[#638e27]">
                <TrendingUp size={17} />
              </div>
              <p className="text-sm font-bold text-[#1d2327]">
                Seller revenue overview
              </p>
            </div>
            <p className="mt-4 text-2xl font-bold text-[#1d2327]">
              {formatPrice(totalRevenue)}
            </p>
            <p className="mt-1 text-xs leading-5 text-[#8c8f94]">
              Combined gross order value in this sample dataset, not platform
              profit or seller payout.
            </p>
          </div>

          <div className="rounded-xl border border-[#dcdcde] bg-white p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <ShieldAlert size={17} />
              </div>
              <p className="text-sm font-bold text-[#1d2327]">
                Account review reminder
              </p>
            </div>
            <p className="mt-3 text-sm font-semibold text-[#1d2327]">
              Verify seller information before granting sensitive permissions.
            </p>
            <p className="mt-1 text-xs leading-5 text-[#8c8f94]">
              Review submitted identity and business details, contact
              information, and applicable compliance requirements.
            </p>
          </div>
        </div>

        <p className="mt-4 text-[11px] leading-5 text-[#8c8f94]">
          Sample seller data for UI preview. Connect this page to your seller
          API before using it for actual account management.
        </p>
      </div>

      {/* Seller details modal */}
      {selectedSeller && (
        <div
          className="fixed inset-0 z-100 flex items-end justify-center bg-black/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedSeller(null);
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#eee] bg-white px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8c8f94]">
                  Seller account
                </p>
                <h2 className="mt-1 text-lg font-bold text-[#1d2327]">
                  {selectedSeller.store}
                </h2>
                <p className="mt-1 text-xs text-[#8c8f94]">
                  {selectedSeller.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedSeller(null)}
                aria-label="Close seller details"
                className="rounded-lg p-2 text-[#646970] hover:bg-[#f0f0f1]"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="flex flex-col gap-4 rounded-xl border border-[#eee] p-4 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf6df] text-lg font-bold text-[#638e27]">
                  {selectedSeller.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-[#1d2327]">
                    {selectedSeller.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#646970]">
                    {selectedSeller.store}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <StatusBadge status={selectedSeller.status} />
                    <StatusBadge status={selectedSeller.verification} />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: Mail,
                    label: "Email address",
                    value: selectedSeller.email,
                  },
                  {
                    icon: Phone,
                    label: "Phone number",
                    value: selectedSeller.phone,
                  },
                  {
                    icon: MapPin,
                    label: "District",
                    value: `${selectedSeller.district}, Bangladesh`,
                  },
                  {
                    icon: CalendarDays,
                    label: "Registration date",
                    value: selectedSeller.joined,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl border border-[#eee] p-4">
                    <div className="flex items-center gap-2 text-[#8c8f94]">
                      <Icon size={15} />
                      <span className="text-[11px]">{label}</span>
                    </div>
                    <p className="mt-2 wrap-break-word text-sm font-semibold text-[#1d2327]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Total orders",
                    value: selectedSeller.orders.toLocaleString("en-BD"),
                    icon: ShoppingBag,
                  },
                  {
                    label: "Gross order value",
                    value: formatPrice(selectedSeller.revenue),
                    icon: TrendingUp,
                  },
                  {
                    label: "Seller balance",
                    value: formatPrice(selectedSeller.balance),
                    icon: Wallet,
                  },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-xl bg-[#f6f7f7] p-3 sm:p-4">
                    <Icon size={16} className="text-[#646970]" />
                    <p className="mt-3 wrap-break-word text-sm font-bold text-[#1d2327]">
                      {value}
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-[#8c8f94]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-[#eee] p-4">
                <h3 className="text-xs font-bold text-[#1d2327]">
                  Account controls
                </h3>
                <p className="mt-1 text-xs leading-5 text-[#8c8f94]">
                  Confirm the action before changing seller access or
                  verification.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedSeller.status === "Pending" && (
                    <button
                      onClick={() =>
                        setConfirmAction({
                          seller: selectedSeller,
                          action: "approve",
                        })
                      }
                      className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#78a92b] px-3 text-xs font-semibold text-white hover:bg-[#638e27]"
                    >
                      <CheckCircle2 size={14} />
                      Approve seller
                    </button>
                  )}

                  {selectedSeller.verification !== "Verified" && (
                    <button
                      onClick={() =>
                        setConfirmAction({
                          seller: selectedSeller,
                          action: "verify",
                        })
                      }
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#dcdcde] px-3 text-xs font-semibold text-[#50575e] hover:bg-[#f6f7f7]"
                    >
                      <UserCheck size={14} />
                      Mark verified
                    </button>
                  )}

                  {selectedSeller.status === "Suspended" ? (
                    <button
                      onClick={() =>
                        setConfirmAction({
                          seller: selectedSeller,
                          action: "activate",
                        })
                      }
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-emerald-200 px-3 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                    >
                      <CheckCircle2 size={14} />
                      Reactivate account
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setConfirmAction({
                          seller: selectedSeller,
                          action: "suspend",
                        })
                      }
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-700 hover:bg-red-50"
                    >
                      <Ban size={14} />
                      Suspend account
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-[#eee] bg-[#fafafa] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <button
                onClick={() => setSelectedSeller(null)}
                className="h-10 rounded-lg border border-[#dcdcde] bg-white px-4 text-sm font-semibold text-[#50575e] hover:bg-[#f0f0f1]"
              >
                Close
              </button>

              <Link
                href={`/admin/sellers/${selectedSeller.id}`}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1d2327] px-4 text-sm font-semibold text-white hover:bg-[#2c3338]"
              >
                Full seller profile
                <ExternalLink size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation dialog */}
      {confirmAction && (
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <ShieldAlert size={21} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#1d2327]">
              Confirm account action
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#646970]">
              {confirmAction.action === "approve" &&
                `Approve ${confirmAction.seller.store} and mark its account as verified?`}
              {confirmAction.action === "verify" &&
                `Mark ${confirmAction.seller.store} as verified? Make sure the required documents have been reviewed.`}
              {confirmAction.action === "suspend" &&
                `Suspend ${confirmAction.seller.store}? The seller may lose access to protected account features.`}
              {confirmAction.action === "activate" &&
                `Reactivate ${confirmAction.seller.store}?`}
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setConfirmAction(null)}
                className="h-10 rounded-lg border border-[#dcdcde] px-4 text-sm font-semibold text-[#50575e] hover:bg-[#f6f7f7]"
              >
                Cancel
              </button>

              <button
                onClick={performSellerAction}
                className={`h-10 rounded-lg px-4 text-sm font-semibold text-white ${
                  confirmAction.action === "suspend"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#1d2327] hover:bg-[#2c3338]"
                }`}
              >
                Confirm action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BulkToolbar({ selectedCount, pageSize, setPageSize, onAction }) {
  const [action, setAction] = useState("");

  function apply() {
    onAction(action);
    setAction("");
  }

  return (
    <div className="flex flex-col gap-3 border-b border-[#eee] bg-[#fafafa] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={action}
          onChange={(event) => setAction(event.target.value)}
          className="h-9 rounded-lg border border-[#dcdcde] bg-white px-3 text-xs outline-none focus:border-[#8aad45]"
        >
          <option value="">Bulk actions</option>
          <option value="verify">Mark as verified</option>
          <option value="activate">Activate accounts</option>
          <option value="export">Export CSV</option>
        </select>

        <button
          onClick={apply}
          className="h-9 rounded-lg border border-[#c3c4c7] bg-white px-3.5 text-xs font-semibold text-[#1d2327] hover:bg-[#f0f0f1]"
        >
          Apply
        </button>

        {selectedCount > 0 && (
          <span className="text-xs text-[#646970]">
            {selectedCount} selected
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-[#646970]">
        <span>Show</span>
        <select
          value={pageSize}
          onChange={(event) => setPageSize(event.target.value)}
          className="h-8 rounded-md border border-[#dcdcde] bg-white px-2 outline-none"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <span>per page</span>
      </div>
    </div>
  );
}