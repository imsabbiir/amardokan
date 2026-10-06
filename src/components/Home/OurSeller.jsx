import { Package, Store, TrendingUp, Users } from "lucide-react";
import Sec from "../Sec";

const aud = [
  [
    Users,
    "Facebook Sellers",
    "Sell through Facebook pages and groups without keeping inventory.",
  ],
  [
    TrendingUp,
    "TikTok Sellers",
    "Turn trending products into profitable offers.",
  ],
  [
    Store,
    "E-commerce Stores",
    "Connect your store and simplify product fulfillment.",
  ],
  [
    Package,
    "Entrepreneurs",
    "Start a product business without building a warehouse or supply chain.",
  ],
];
function OurSeller() {
  return (
    <Sec alt title="Built for every kind of online seller.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {aud.map(([Icon, title, des], index) => (
          <div
            key={index}
            className={`rounded-2xl border border-bd bg-card shadow-[0_1px_2px_rgba(10,10,30,.04),0_8px_30px_rgba(10,10,30,.06)] p-6`}
          >
            <div className="mb-4 grid size-11 place-items-center rounded-xl bg-ac2 text-ac">
              <Icon className="size-5" />
            </div>

            <h3 className="font-semibold">{title}</h3>

            <p className="mt-1.5 text-sm text-mut">{des}</p>
          </div>
        ))}
      </div>

      <div className="mt-9 text-center">
        <a
          href="#"
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-semibold transition hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ac bg-ac text-white hover:brightness-110`}
        >
          Become a Seller
        </a>
      </div>
    </Sec>
  );
}

export default OurSeller;
