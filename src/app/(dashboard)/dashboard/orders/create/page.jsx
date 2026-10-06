"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  MapPin,
  Package,
  Phone,
  Plus,
  Search,
  ShoppingCart,
  Truck,
  User,
  Wallet,
  X,
} from "lucide-react";

const products = [
  {
    id: "P-1001",
    name: "Premium Oversized Hoodie",
    variant: "Black · XL",
    sku: "HOOD-OVR-BLK-XL",
    price: 1250,
    stock: 42,
  },
  {
    id: "P-1002",
    name: "Essential Sweatshirt",
    variant: "Grey · L",
    sku: "SWT-ESS-GRY-L",
    price: 990,
    stock: 8,
  },
  {
    id: "P-1003",
    name: "Minimal Leather Wallet",
    variant: "Black",
    sku: "WLT-MIN-BLK",
    price: 420,
    stock: 76,
  },
  {
    id: "P-1004",
    name: "Classic Canvas Backpack",
    variant: "Black",
    sku: "BAG-CNV-BLK",
    price: 850,
    stock: 31,
  },
  {
    id: "P-1005",
    name: "Everyday Running Shoes",
    variant: "White · 42",
    sku: "SHOE-RUN-WHT-42",
    price: 1350,
    stock: 5,
  },
];

const districts = [
  "Dhaka",
  "Chattogram",
  "Gazipur",
  "Narayanganj",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

function formatPrice(price) {
  return `৳${Number(price).toLocaleString("en-BD")}`;
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  icon: Icon,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`h-11 w-full rounded-xl border border-bd bg-bg2 text-sm outline-none transition placeholder:text-mut focus:border-ac ${
            Icon ? "pl-10 pr-3" : "px-3.5"
          }`}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full appearance-none rounded-xl border border-bd bg-bg2 px-3.5 pr-10 text-sm outline-none transition focus:border-ac"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />
      </div>
    </div>
  );
}

function SectionCard({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-2xl border border-bd bg-bg">
      <div className="border-b border-bd p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ac/10 text-ac">
            <Icon className="h-4.5 w-4.5" />
          </div>

          <div>
            <h2 className="text-base font-semibold">{title}</h2>

            {description && (
              <p className="mt-1 text-sm text-mut">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function ProductPicker({ onAdd }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const results = products.filter((product) => {
    const query = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(query) ||
      product.variant.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query)
    );
  });

  return (
    <div className="relative">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mut" />

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search products by name, variant or SKU..."
          className="h-12 w-full rounded-xl border border-bd bg-bg2 pl-10 pr-4 text-sm outline-none transition placeholder:text-mut focus:border-ac"
        />
      </div>

      {open && search && (
        <>
          <button
            type="button"
            aria-label="Close product results"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />

          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-bd bg-bg shadow-xl">
            {results.length > 0 ? (
              <div className="max-h-72 overflow-y-auto p-2">
                {results.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    disabled={product.stock <= 0}
                    onClick={() => {
                      onAdd(product);
                      setSearch("");
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-bg2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-bd bg-bg2">
                      <Package className="h-5 w-5 text-mut" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {product.name}
                      </p>

                      <p className="mt-0.5 text-xs text-mut">
                        {product.variant} · {product.sku}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold">
                        {formatPrice(product.price)}
                      </p>

                      <p className="mt-0.5 text-[11px] text-mut">
                        {product.stock} in stock
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Package className="mx-auto h-6 w-6 text-mut" />

                <p className="mt-3 text-sm font-semibold">
                  No products found
                </p>

                <p className="mt-1 text-xs text-mut">
                  Try another product name or SKU.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function CreateOrderPage() {
  const [items, setItems] = useState([]);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [address, setAddress] = useState({
    district: "Dhaka",
    area: "",
    address: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [deliveryMethod, setDeliveryMethod] =
    useState("Standard Delivery");

  const [deliveryFee, setDeliveryFee] = useState(120);

  const [discount, setDiscount] = useState(0);

  const [note, setNote] = useState("");

  const [created, setCreated] = useState(false);

  const addProduct = (product) => {
    setItems((current) => {
      const existing = current.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  product.stock
                ),
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (id, quantity) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(quantity, item.stock)
              ),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [items]
  );

  const total = Math.max(
    subtotal + Number(deliveryFee || 0) - Number(discount || 0),
    0
  );

  const canCreate =
    customer.name.trim() &&
    customer.phone.trim() &&
    address.area.trim() &&
    address.address.trim() &&
    items.length > 0;

  const handleCreateOrder = () => {
    if (!canCreate) return;

    /*
      Connect this form to your API later:

      POST /api/orders

      {
        customer,
        address,
        items,
        paymentMethod,
        deliveryMethod,
        deliveryFee,
        discount,
        note
      }
    */

    setCreated(true);
  };

  if (created) {
    return (
      <div className="min-h-screen bg-bg">
        <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center px-5 py-12">
          <div className="w-full rounded-3xl border border-bd bg-bg p-8 text-center sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ac/15 text-ac">
              <Check className="h-8 w-8" />
            </div>

            <p className="mt-6 text-sm font-semibold text-ac">
              Order created successfully
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              AM-10493
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-mut">
              The order has been created and is ready for
              fulfillment. You can track its status from the
              Orders page.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                href="/dashboard/orders/AM-10493"
                className="rounded-xl bg-ac px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#7fb922]"
              >
                View order
              </Link>

              <Link
                href="/dashboard/orders"
                className="rounded-xl border border-bd px-4 py-3 text-sm font-semibold transition hover:bg-bg2"
              >
                All orders
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                setCreated(false);
                setItems([]);
                setCustomer({
                  name: "",
                  phone: "",
                  email: "",
                });
                setAddress({
                  district: "Dhaka",
                  area: "",
                  address: "",
                  postalCode: "",
                });
                setNote("");
                setDiscount(0);
              }}
              className="mt-5 text-xs font-semibold text-mut transition hover:text-fg"
            >
              Create another order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-mut">
          <Link
            href="/dashboard/orders"
            className="transition hover:text-fg"
          >
            Orders
          </Link>

          <span>/</span>

          <span className="text-fg">Create Order</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href="/dashboard/orders"
              className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-mut transition hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to orders
            </Link>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Create new order
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-mut sm:text-base">
              Add the customer, products, and delivery details to
              create a fulfillment order.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-bd bg-bg2 px-3.5 py-2.5 text-xs font-medium text-mut sm:flex">
            <ShoppingCart className="h-4 w-4" />
            Seller order
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          {/* Left */}
          <div className="space-y-6">
            {/* Customer */}
            <SectionCard
              icon={User}
              title="Customer information"
              description="Enter the customer's contact details."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Customer name"
                  required
                  value={customer.name}
                  onChange={(value) =>
                    setCustomer((prev) => ({
                      ...prev,
                      name: value,
                    }))
                  }
                  placeholder="e.g. Nusrat Jahan"
                  icon={User}
                />

                <InputField
                  label="Phone number"
                  required
                  value={customer.phone}
                  onChange={(value) =>
                    setCustomer((prev) => ({
                      ...prev,
                      phone: value,
                    }))
                  }
                  placeholder="01712 345678"
                  type="tel"
                  icon={Phone}
                />

                <div className="sm:col-span-2">
                  <InputField
                    label="Email address"
                    value={customer.email}
                    onChange={(value) =>
                      setCustomer((prev) => ({
                        ...prev,
                        email: value,
                      }))
                    }
                    placeholder="customer@example.com"
                    type="email"
                  />
                </div>
              </div>
            </SectionCard>

            {/* Products */}
            <SectionCard
              icon={Package}
              title="Order products"
              description="Choose the products and quantities for this order."
            >
              <ProductPicker onAdd={addProduct} />

              {items.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-bd bg-bg2 px-5 py-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-bg">
                    <ShoppingCart className="h-5 w-5 text-mut" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold">
                    No products added
                  </h3>

                  <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-mut">
                    Search your catalog above and add the products
                    the customer wants to order.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-bd bg-bg2 p-4"
                    >
                      <div className="flex gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-bd bg-bg">
                          <Package className="h-5 w-5 text-mut" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold">
                                {item.name}
                              </p>

                              <p className="mt-0.5 text-xs text-mut">
                                {item.variant} · {item.sku}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-mut transition hover:bg-bg hover:text-red-500"
                              aria-label={`Remove ${item.name}`}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center rounded-xl border border-bd bg-bg">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity <= 1}
                                className="h-9 w-9 text-lg text-mut transition hover:text-fg disabled:opacity-40"
                              >
                                −
                              </button>

                              <span className="w-9 text-center text-sm font-semibold">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                disabled={
                                  item.quantity >= item.stock
                                }
                                className="h-9 w-9 text-lg text-mut transition hover:text-fg disabled:opacity-40"
                              >
                                +
                              </button>
                            </div>

                            <div className="text-left sm:text-right">
                              <p className="text-sm text-mut">
                                {formatPrice(item.price)} ×{" "}
                                {item.quantity}
                              </p>

                              <p className="mt-0.5 text-base font-bold">
                                {formatPrice(
                                  item.price * item.quantity
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/dashboard/products"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ac hover:underline"
              >
                Browse product catalog
                <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
              </Link>
            </SectionCard>

            {/* Address */}
            <SectionCard
              icon={MapPin}
              title="Delivery address"
              description="Where should the customer's order be delivered?"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="District"
                  required
                  value={address.district}
                  onChange={(value) =>
                    setAddress((prev) => ({
                      ...prev,
                      district: value,
                    }))
                  }
                  options={districts}
                />

                <InputField
                  label="Area / Upazila"
                  required
                  value={address.area}
                  onChange={(value) =>
                    setAddress((prev) => ({
                      ...prev,
                      area: value,
                    }))
                  }
                  placeholder="e.g. Dhanmondi"
                />

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold">
                    Full address
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <textarea
                    value={address.address}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    placeholder="House, road, building, floor, landmark..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-bd bg-bg2 px-3.5 py-3 text-sm outline-none transition placeholder:text-mut focus:border-ac"
                  />
                </div>

                <InputField
                  label="Postal code"
                  value={address.postalCode}
                  onChange={(value) =>
                    setAddress((prev) => ({
                      ...prev,
                      postalCode: value,
                    }))
                  }
                  placeholder="1209"
                />
              </div>
            </SectionCard>

            {/* Delivery */}
            <SectionCard
              icon={Truck}
              title="Delivery & payment"
              description="Configure how this order should be fulfilled."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Delivery method"
                  value={deliveryMethod}
                  onChange={setDeliveryMethod}
                  options={[
                    "Standard Delivery",
                    "Express Delivery",
                  ]}
                />

                <SelectField
                  label="Payment method"
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  options={[
                    "Cash on Delivery",
                    "Paid Online",
                  ]}
                />

                <InputField
                  label="Delivery fee"
                  value={deliveryFee}
                  onChange={setDeliveryFee}
                  type="number"
                  placeholder="120"
                />

                <InputField
                  label="Discount"
                  value={discount}
                  onChange={setDiscount}
                  type="number"
                  placeholder="0"
                />
              </div>

              <div className="mt-5 rounded-xl border border-ac/20 bg-ac/5 p-4">
                <div className="flex gap-3">
                  <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-ac" />

                  <div>
                    <p className="text-sm font-semibold">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs leading-5 text-mut">
                      The courier will collect the order amount
                      from the customer during delivery.
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Note */}
            <SectionCard
              icon={Plus}
              title="Order note"
              description="Optional instructions for the fulfillment team."
            >
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                placeholder="Example: Call customer before delivery..."
                className="w-full resize-none rounded-xl border border-bd bg-bg2 px-3.5 py-3 text-sm outline-none transition placeholder:text-mut focus:border-ac"
              />
            </SectionCard>
          </div>

          {/* Right */}
          <aside className="xl:sticky xl:top-24 xl:self-start">
            <div className="rounded-2xl border border-bd bg-bg">
              <div className="border-b border-bd p-5">
                <h2 className="text-base font-semibold">
                  Order summary
                </h2>

                <p className="mt-1 text-sm text-mut">
                  Review the order before creating it.
                </p>
              </div>

              <div className="p-5">
                {items.length > 0 ? (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {item.name}
                          </p>

                          <p className="mt-0.5 text-xs text-mut">
                            {item.variant} × {item.quantity}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-semibold">
                          {formatPrice(
                            item.price * item.quantity
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl bg-bg2 p-4 text-center">
                    <ShoppingCart className="mx-auto h-5 w-5 text-mut" />

                    <p className="mt-2 text-xs text-mut">
                      Add products to see the order summary.
                    </p>
                  </div>
                )}

                <div className="my-5 border-t border-bd" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-mut">Subtotal</span>
                    <span className="font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-mut">
                      Delivery fee
                    </span>

                    <span className="font-medium">
                      {formatPrice(deliveryFee)}
                    </span>
                  </div>

                  {Number(discount) > 0 && (
                    <div className="flex items-center justify-between text-emerald-600">
                      <span>Discount</span>

                      <span className="font-medium">
                        −{formatPrice(discount)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="my-5 border-t border-bd" />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-mut">
                      Customer pays
                    </p>

                    <p className="mt-1 text-2xl font-bold tracking-tight">
                      {formatPrice(total)}
                    </p>
                  </div>

                  <span className="rounded-full bg-ac/10 px-2.5 py-1 text-xs font-semibold text-ac">
                    {paymentMethod}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCreateOrder}
                  disabled={!canCreate}
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ac px-4 text-sm font-bold text-slate-950 transition hover:bg-[#7fb922] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Check className="h-4 w-4" />
                  Create order
                </button>

                {!canCreate && (
                  <p className="mt-3 text-center text-xs leading-5 text-mut">
                    Add at least one product and complete the
                    required customer and delivery fields.
                  </p>
                )}
              </div>
            </div>

            {/* Fulfillment info */}
            <div className="mt-4 rounded-2xl border border-bd bg-bg2 p-5">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-ac" />
                <h3 className="text-sm font-semibold">
                  Fulfillment
                </h3>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-mut">Packing</span>
                  <span className="font-medium">
                    AmarDokan
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-mut">Delivery</span>
                  <span className="font-medium">
                    Nationwide
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-mut">Estimated</span>
                  <span className="font-medium">
                    2–4 business days
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-mut">Returns</span>
                  <span className="font-medium text-emerald-600">
                    Supported
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile bottom action */}
        <div className="sticky bottom-3 z-30 mt-6 xl:hidden">
          <div className="rounded-2xl border border-bd bg-bg/95 p-3 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-mut">Customer pays</p>
                <p className="text-lg font-bold">
                  {formatPrice(total)}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCreateOrder}
                disabled={!canCreate}
                className="rounded-xl bg-ac px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#7fb922] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Create order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}