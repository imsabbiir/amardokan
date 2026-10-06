import GetStartedButton from "../common/GetStartedButton";
import Link from "next/link";
export function CTA() {
  return (
    <section className="py-24">
      <div className="mx-4 rounded-[28px] border border-bd bg-bg2 bg-[radial-gradient(600px_300px_at_50%_0,var(--ac2),transparent)] px-5 py-20 text-center md:mx-auto md:max-w-6xl">
        <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
          Start selling without building the supply chain.
        </h2>

        <p className="mb-8 mt-4 text-lg text-mut">
          Choose your products, find your margin, and let us handle fulfillment.
        </p>

        <div className="my-8 flex flex-col justify-center gap-3 sm:flex-row">
            <GetStartedButton title={"Start Selling"} href={"/signup"} className={"py-5 px-7 gap-5 w-full md:w-fit justify-center text-base"}/>
            <Link href="/products" className={`border border-bd bg-card text-fg px-6! py-4! inline-flex items-center justify-center gap-2 rounded-xl text-[15px] font-semibold transition hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ac`}>
              Explore Products
            </Link>
          </div>

        

        <p className="mt-4 text-sm text-mut">No inventory required.</p>
      </div>
    </section>
  );
}