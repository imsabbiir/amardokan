import {
  MapPin,
  Package,
  PackageCheck,
  ShieldCheck,
  TrendingUp,
  Truck,
} from "lucide-react";
import Sec from "../Sec";

const feats = [
  [
    ShieldCheck,
    "No Inventory Risk",
    "Don't spend your money buying products before you have customers.",
  ],
  [
    Package,
    "Ready-to-Sell Products",
    "Access products that are already sourced and ready for fulfillment.",
  ],
  [
    PackageCheck,
    "We Handle Packing",
    "You don't need your own warehouse or packing team.",
  ],
  [
    Truck,
    "Nationwide Delivery",
    "We manage delivery to your customer's address.",
  ],
  [
    MapPin,
    "Track Every Order",
    "Monitor orders from confirmation to delivery.",
  ],
  [
    TrendingUp,
    "Focus on Selling",
    "Spend your time on marketing and customers while we handle operations.",
  ],
];

export function WhyUs() {
  return (
    <Sec alt id="why-us" title="Your business runs on our fulfillment.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {feats.map(([Icon, title, des], index) => (
          <div key={index} className={`rounded-2xl border border-bd bg-card shadow-[0_1px_2px_rgba(10,10,30,.04),0_8px_30px_rgba(10,10,30,.06)] p-6`}>
            <div className="mb-4 grid size-11 place-items-center rounded-xl bg-ac2 text-ac">
              <Icon className="size-5" />
            </div>

            <h3 className="font-semibold">{title}</h3>

            <p className="mt-1.5 text-sm text-mut">{des}</p>
          </div>
        ))}
      </div>
    </Sec>
  );
}
