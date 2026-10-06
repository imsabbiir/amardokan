/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Headphones,
  Package,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
  Users,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "About Us | AmarDokan",
  description:
    "Learn how AmarDokan helps online sellers build and grow businesses without managing inventory, fulfillment, and delivery themselves.",
};

const services = [
  {
    icon: ShoppingBag,
    number: "01",
    title: "Product Sourcing",
    description:
      "Choose products from our catalog without buying and storing inventory upfront.",
  },
  {
    icon: Boxes,
    number: "02",
    title: "Inventory",
    description:
      "We manage product availability so you can spend less time thinking about stock and storage.",
  },
  {
    icon: PackageCheck,
    number: "03",
    title: "Fulfillment",
    description:
      "When you receive an order, we prepare, pack, and process the product for delivery.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Delivery",
    description:
      "We coordinate delivery and help get your customers' orders where they need to go.",
  },
];

const benefits = [
  {
    icon: CircleDollarSign,
    title: "Lower upfront cost",
    description:
      "Start selling without putting large amounts of money into inventory before you have customers.",
  },
  {
    icon: Zap,
    title: "Move faster",
    description:
      "Launch products and test ideas without first building your own warehouse and fulfillment operation.",
  },
  {
    icon: ShieldCheck,
    title: "Less operational risk",
    description:
      "Let AmarDokan handle much of the work behind packing, fulfillment, delivery, and returns.",
  },
  {
    icon: Headphones,
    title: "Support when needed",
    description:
      "Get help when you need it instead of figuring out every operational problem on your own.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose products",
    description:
      "Browse products available through AmarDokan and decide what you want to sell.",
  },
  {
    number: "02",
    title: "Set your price",
    description:
      "Choose your selling price and build your offer around the margin you want to earn.",
  },
  {
    number: "03",
    title: "Get customer orders",
    description:
      "Sell through your website, social channels, marketplaces, or other sales channels.",
  },
  {
    number: "04",
    title: "We fulfill",
    description:
      "Send the order to AmarDokan and let us take care of the operational side.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg text-fg">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-bd bg-bg2">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 -top-48 size-144 rounded-full bg-ac/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 left-1/4 size-112 rounded-full bg-ac/5 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-5">
          <div className="grid min-h-170 items-center gap-16 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            {/* Copy */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-bd bg-bg px-3.5 py-2 text-xs font-semibold">
                <span className="flex size-5 items-center justify-center rounded-md bg-ac/10 text-ac">
                  <Store className="size-3.5" />
                </span>
                About AmarDokan
              </div>

              <h1 className="max-w-4xl text-5xl font-bold tracking-[-0.045em] md:text-6xl lg:text-7xl">
                Build the business.
                <br />
                <span className="text-mut">
                  We handle what comes after.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-mut md:text-lg md:leading-8">
                AmarDokan gives online sellers access to products,
                fulfillment, delivery, and operational infrastructure without
                requiring them to build everything themselves.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="group inline-flex items-center gap-3 rounded-xl bg-ac px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:opacity-90"
                >
                  Start Selling
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-xl border border-bd bg-bg px-6 py-3.5 text-sm font-semibold transition hover:border-ac hover:bg-bg2"
                >
                  Talk to us
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-mut">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-ac" />
                  No warehouse required
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-ac" />
                  Fulfillment support
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-ac" />
                  Nationwide delivery
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="relative mx-auto max-w-md">
                {/* Main panel */}
                <div className="relative overflow-hidden rounded-4xl border border-bd bg-bg p-5 shadow-2xl">
                  <div className="rounded-3xl border border-bd bg-bg2 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-mut">
                          Seller workspace
                        </p>
                        <p className="mt-1 text-lg font-bold">
                          Your business
                        </p>
                      </div>

                      <div className="flex size-10 items-center justify-center rounded-xl bg-ac/10 text-ac">
                        <Package className="size-5" />
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-bd bg-bg p-4">
                        <p className="text-xs text-mut">Products</p>
                        <p className="mt-2 text-2xl font-bold">Ready</p>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-ac">
                          <span className="size-1.5 rounded-full bg-ac" />
                          Available
                        </div>
                      </div>

                      <div className="rounded-2xl border border-bd bg-bg p-4">
                        <p className="text-xs text-mut">Fulfillment</p>
                        <p className="mt-2 text-2xl font-bold">Active</p>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-ac">
                          <span className="size-1.5 rounded-full bg-ac" />
                          Running
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-2xl border border-bd bg-bg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-mut">Latest order</p>
                          <p className="mt-1 font-semibold">
                            Order #AM-2048
                          </p>
                        </div>

                        <span className="rounded-full bg-ac/10 px-2.5 py-1 text-[11px] font-semibold text-ac">
                          Processing
                        </span>
                      </div>

                      <div className="mt-5 flex items-center">
                        {[
                          {
                            icon: ShoppingBag,
                            active: true,
                          },
                          {
                            icon: PackageCheck,
                            active: true,
                          },
                          {
                            icon: Truck,
                            active: false,
                          },
                        ].map((item, index) => {
                          const Icon = item.icon;

                          return (
                            <div
                              key={index}
                              className="flex flex-1 items-center"
                            >
                              <div
                                className={`flex size-9 shrink-0 items-center justify-center rounded-xl border ${
                                  item.active
                                    ? "border-ac/30 bg-ac/10 text-ac"
                                    : "border-bd bg-bg2 text-mut"
                                }`}
                              >
                                <Icon className="size-4" />
                              </div>

                              {index < 2 && (
                                <div className="mx-2 h-px flex-1 bg-bd" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating card */}
                <div className="absolute -bottom-7 -left-7 hidden w-52 rounded-2xl border border-bd bg-bg p-4 shadow-xl sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-ac/10 text-ac">
                      <Truck className="size-4" />
                    </div>

                    <div>
                      <p className="text-xs text-mut">Delivery</p>
                      <p className="text-sm font-semibold">
                        Handled for you
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-7 -top-7 hidden w-48 rounded-2xl border border-bd bg-bg p-4 shadow-xl sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-ac/10 text-ac">
                      <ShieldCheck className="size-4" />
                    </div>

                    <div>
                      <p className="text-xs text-mut">Operations</p>
                      <p className="text-sm font-semibold">
                        One platform
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          THE PROBLEM
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ac">
                Why AmarDokan exists
              </p>

              <h2 className="mt-4 max-w-lg text-4xl font-bold tracking-[-0.035em] md:text-5xl">
                Selling online shouldn't mean doing everything yourself.
              </h2>
            </div>

            <div className="space-y-6 text-base leading-8 text-mut md:text-lg">
              <p>
                Starting an online store can look simple from the outside.
                Choose a product, post it online, find a customer, and make a
                sale.
              </p>

              <p>
                Behind that sale, however, there is a completely different
                operation: sourcing products, maintaining stock, packing
                orders, coordinating couriers, handling returns, and keeping
                track of every order.
              </p>

              <p>
                AmarDokan exists to take much of that operational complexity
                away from sellers. Instead of building a warehouse and
                fulfillment operation from day one, sellers can use the
                infrastructure we provide and concentrate on selling.
              </p>

              <div className="border-l-2 border-ac pl-5 text-fg">
                <p className="font-semibold">
                  Your job is to build demand.
                  <br />
                  Our job is to help handle the operations behind it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION
      ====================================================== */}
      <section className="border-y border-bd bg-bg2">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ac">
              Our mission
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
              Make online commerce easier to start.
            </h2>

            <p className="mt-7 text-base leading-8 text-mut md:text-lg">
              We believe more people should be able to start and grow online
              businesses without first having to build complicated operational
              infrastructure.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-bd bg-bd md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "For sellers",
                text: "Give entrepreneurs a simpler way to start selling and test new products.",
              },
              {
                icon: Package,
                title: "Behind the scenes",
                text: "Take care of the physical and operational work that happens after an order.",
              },
              {
                icon: Zap,
                title: "Built to scale",
                text: "Create infrastructure that can support sellers as their businesses grow.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-bg2 p-7 md:p-8"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-ac/10 text-ac">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-mut">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT WE DO
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ac">
                What we do
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
                The infrastructure behind your sale.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-mut">
              From product selection to the customer's doorstep, AmarDokan
              helps connect the important pieces of the selling process.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {services.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="group rounded-3xl border border-bd bg-bg2 p-7 transition duration-300 hover:-translate-y-1 hover:border-ac/50 md:p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-ac/10 text-ac">
                      <Icon className="size-5" />
                    </div>

                    <span className="text-xs font-bold tracking-[0.15em] text-mut">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-6 text-mut">
                    {item.description}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-ac opacity-0 transition group-hover:opacity-100">
                    Part of your selling infrastructure
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT FITS
      ====================================================== */}
      <section className="border-y border-bd bg-bg2">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ac">
              How it works
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
              You sell. AmarDokan supports the operation.
            </h2>

            <p className="mt-5 text-lg leading-8 text-mut">
              A simpler workflow designed around what sellers actually need.
            </p>
          </div>

          <div className="mt-16 grid gap-0 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative border-l border-bd py-2 pl-7 lg:min-h-55 lg:pr-7"
              >
                <span className="text-xs font-bold tracking-[0.15em] text-ac">
                  {step.number}
                </span>

                <h3 className="mt-5 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-mut">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <ArrowRight className="absolute -right-2 top-1/2 hidden size-4 bg-bg2 text-mut lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          BENEFITS
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ac">
              Why sellers choose us
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
              Spend your energy where it matters.
            </h2>

            <p className="mt-5 text-lg leading-8 text-mut">
              The less time you spend building operations, the more time you
              can spend building your business.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-bd p-6 transition hover:border-ac/50"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-ac/10 text-ac">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-6 font-semibold">{item.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-mut">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES / TRUST
      ====================================================== */}
      <section className="bg-bg2">
        <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-ac">
                What we believe
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-5xl">
                Simple systems create better businesses.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Make selling easier",
                "Keep operations straightforward",
                "Give sellers useful infrastructure",
                "Be transparent about costs and processes",
                "Build for long-term relationships",
                "Keep improving the experience",
              ].map((value) => (
                <div
                  key={value}
                  className="flex items-start gap-3 rounded-2xl border border-bd bg-bg p-5"
                >
                  <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ac/10 text-ac">
                    <Check className="size-3" />
                  </div>

                  <p className="text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="relative overflow-hidden rounded-4xl border border-bd bg-bg2 p-8 md:p-14 lg:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-ac/10 blur-3xl"
            />

            <div className="relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-ac/10 text-ac">
                  <PackageCheck className="size-5" />
                </div>

                <h2 className="text-3xl font-bold tracking-[-0.03em] md:text-5xl">
                  Ready to build your
                  <br className="hidden md:block" />
                  online business?
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-mut">
                  Start selling products while AmarDokan helps take care of
                  the operational work behind every order.
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="group inline-flex items-center gap-3 rounded-xl bg-ac px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:opacity-90"
                >
                  Get Started
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-xl border border-bd px-6 py-3.5 text-sm font-semibold transition hover:border-ac"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}