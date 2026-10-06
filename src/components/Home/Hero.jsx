import React from "react";
import { CheckCircle2, TrendingUp, Truck } from "lucide-react";
import GetStartedButton from "../common/GetStartedButton";
import Link from "next/link";
const rows = [
  ["Supplier Price", "৳650"],
  ["Your Selling Price", "৳990"],
  ["Estimated Profit", "৳340"],
  ["Order Status", "Ready to Ship"],
];
const Float = ({ className, children }) => (
  <div
    className={`float absolute hidden items-center gap-2 rounded-2xl border border-bd bg-card/80 px-4 py-2.5 text-[13px] font-semibold shadow-lg backdrop-blur-md md:flex ${className}`}
  >
    {children}
  </div>
);
function Hero() {
  return (
    <section
      id="hero"
      className="bg-[radial-gradient(900px_400px_at_50%_-10%,var(--ac2),transparent)] pb-20 pt-16 min-h-screen"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col md:flex-row">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-bd bg-card px-3.5 py-1.5 text-[13px] font-medium text-mut">
            <i className="size-1.5 rounded-full bg-ac" />
            Built for modern online sellers
          </span>
          <h1 className="mb-5 mt-6 text-[42px] font-extrabold leading-[1.05] tracking-tighter md:text-6xl">
            Sell Products Without Holding{" "}
            <span className="text-ac">Inventory.</span>
          </h1>
          <p className="max-w-xl text-lg text-mut">
            Choose products from our ready-to-sell catalog, set your margin,
            take customer orders, and let us handle packing and delivery.
          </p>
          <div className="my-8 flex flex-col gap-3 sm:flex-row">
            <GetStartedButton
              title={"Start Selling"}
              href={"/signup"}
              className={
                "py-5 px-7 gap-5 w-full md:w-fit justify-center text-base"
              }
            />
            <Link
              href="#how"
              className={`border border-bd bg-card text-fg px-6! py-4! inline-flex items-center justify-center gap-2 rounded-xl text-[15px] font-semibold transition hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ac`}
            >
              See How It Works
            </Link>
          </div>
         
        </div>
        <div className="relative mx-auto w-full">
          <div
            className={`rounded-2xl border border-bd bg-card shadow-[0_1px_2px_rgba(10,10,30,.04),0_8px_30px_rgba(10,10,30,.06)] overflow-hidden`}
          >
            <div className="flex gap-1.5 border-b border-bd px-4 py-3">
              {[0, 1, 2].map((i) => (
                <i key={i} className="size-2.5 rounded-full bg-bd" />
              ))}
            </div>
            <div className="grid ">
              <div className="flex items-center gap-4 border-b border-bd p-7">
                <div className="grid size-20 place-items-center rounded-2xl bg-ac2 text-4xl">
                  🌀
                </div>
                <div>
                  <small className="text-xs text-mut">Electronics</small>
                  <h3 className="text-lg font-semibold">Wireless Mini Fan</h3>
                  <span className="mt-2 inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                    Ready to Ship
                  </span>
                </div>
              </div>
              <dl className="p-6">
                {rows.map(([a, b], i) => (
                  <div
                    key={a}
                    className="flex justify-between border-b border-dashed border-bd py-2.5 text-[15px] last:border-0"
                  >
                    <dt className="text-mut">{a}</dt>
                    <dd className={`font-semibold ${i === 2 ? "text-ac" : ""}`}>
                      {b}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Float className="-right-3 -top-5">
            <TrendingUp className="size-4 text-ac" />
            +৳340 Profit
          </Float>
          <Float className="-left-20 bottom-60 [animation-delay:-2s]">
            <CheckCircle2 className="size-4 text-ac" />
            Order Confirmed
          </Float>
          <Float className="bottom-5 -right-10 [animation-delay:-4s]">
            <Truck className="size-4 text-ac" />
            Packed → Out for Delivery
          </Float>
        </div>
        </div>
        <p className="text-sm text-mut pt-10 text-center">
            No inventory • No warehouse • No fulfillment headache
          </p>
      </div>
       
    </section>
  );
}

export default Hero;
