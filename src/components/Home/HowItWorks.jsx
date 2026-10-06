
import Sec from "../Sec";

const steps = [
  [
    "Choose Products",
    "Browse our ready-to-sell catalog and select what you want to sell.",
    [
      ["🌀 Mini Fan", "৳650"],
      ["⌚ Smart Watch", "৳1,450"],
      ["🎧 Earbuds", "৳890"],
    ],
  ],
  [
    "Set Your Price",
    "Choose your selling price and see your profit instantly.",
    [
      ["Supplier", "৳650"],
      ["Selling", "৳990"],
      ["Profit", "৳340"],
    ],
  ],
  [
    "Take Orders",
    "Bring customers from Facebook, TikTok, your website or elsewhere, and submit orders here.",
    [
      ["#1042 Rafi", "New"],
      ["#1041 Nusrat", "Packed"],
      ["#1040 Imran", "Done"],
    ],
  ],
  [
    "We Pack & Deliver",
    "We handle preparation, packaging, courier handover and delivery.",
    [
      ["Received", "✓"],
      ["Packed", "✓"],
      ["Delivered", "→"],
    ],
  ],
];

export function HowItWorks() {
  return (
    <Sec
      id="how-it-works"
      title="From product selection to delivery — we handle the hard part."
      sub="Start selling without investing in inventory or building your own fulfillment operation."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map(([t, d, r], i) => (
          <div key={t} className={`rounded-2xl border border-bd bg-card shadow-[0_1px_2px_rgba(10,10,30,.04),0_8px_30px_rgba(10,10,30,.06)] p-6`}>
            <div className="mb-2 text-[13px] font-bold text-ac">0{i + 1}</div>

            <h3 className="text-lg font-semibold">{t}</h3>

            <p className="mb-4 mt-2 text-sm text-mut">{d}</p>

            <div className="rounded-xl border border-bd bg-bg2 p-3 text-[13px]">
              {r.map(([a, b]) => (
                <div key={a} className="flex justify-between py-0.5">
                  <span>{a}</span>
                  <b>{b}</b>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center">
        Pick products → Set your price → Get orders → We fulfill →{" "}
        <b className="text-ac">You keep the profit.</b>
      </p>
    </Sec>
  );
}












