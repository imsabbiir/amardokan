import Sec from "../Sec";
const services = [
  {
    number: "01",
    title: "Product Sourcing",
    description:
      "Access a ready-to-sell catalog of products without spending time finding suppliers or negotiating with wholesalers.",
    items: [
      ["Ready Products", "✓"],
      ["Competitive Price", "✓"],
      ["Regularly Updated", "✓"],
    ],
  },
  {
    number: "02",
    title: "Inventory & Stock",
    description:
      "Sell products without buying or storing inventory yourself. We manage the stock so you can focus on selling.",
    items: [
      ["No Bulk Purchase", "✓"],
      ["Stock Management", "✓"],
      ["Real-Time Availability", "✓"],
    ],
  },
  {
    number: "03",
    title: "Order Fulfillment",
    description:
      "Send us your customer orders and we'll take care of the preparation, packing and fulfillment process.",
    items: [
      ["Order Processing", "✓"],
      ["Quality Check", "✓"],
      ["Professional Packing", "✓"],
    ],
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "We hand over your orders to the courier and manage the delivery process until they reach your customer.",
    items: [
      ["Courier Handover", "✓"],
      ["Nationwide Delivery", "✓"],
      ["Order Tracking", "✓"],
    ],
  },
  {
    number: "05",
    title: "Cash on Delivery",
    description:
      "Give your customers the convenience of paying when their order arrives while we handle the collection process.",
    items: [
      ["COD Support", "✓"],
      ["Payment Collection", "✓"],
      ["Seller Settlement", "✓"],
    ],
  },
  {
    number: "06",
    title: "Returns Management",
    description:
      "We help manage returned orders so you don't have to deal with the logistics and operational hassle yourself.",
    items: [
      ["Return Handling", "✓"],
      ["Failed Delivery", "✓"],
      ["Order Updates", "✓"],
    ],
  },
  {
    number: "07",
    title: "Seller Dashboard",
    description:
      "Manage products, submit orders, track deliveries and monitor your business from one simple dashboard.",
    items: [
      ["Order Management", "✓"],
      ["Delivery Tracking", "✓"],
      ["Profit Overview", "✓"],
    ],
  },
  {
    number: "08",
    title: "Seller Support",
    description:
      "Get help when you need it with order issues, product questions and the day-to-day operations of your business.",
    items: [
      ["Order Assistance", "✓"],
      ["Product Support", "✓"],
      ["Seller Assistance", "✓"],
    ],
  },
];

export function Services() {
  return (
    <Sec
      id="services"
      alt
      title="Everything you need to sell — without the operational hassle."
      sub="We provide the products, fulfillment infrastructure and support so you can focus on finding customers and growing your business."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.number}
            className={`rounded-2xl border border-bd bg-card shadow-[0_1px_2px_rgba(10,10,30,.04),0_8px_30px_rgba(10,10,30,.06)] p-6`}
          >
            <div className="mb-2 text-[13px] font-bold text-ac">
              {service.number}
            </div>

            <h3 className="text-lg font-semibold">{service.title}</h3>

            <p className="mb-5 mt-2 text-sm leading-6 text-mut">
              {service.description}
            </p>

            <div className="rounded-xl border border-bd bg-bg2 p-3 text-[13px]">
              {service.items.map(([label, value]) => (
                <div key={label} className="flex justify-between py-1">
                  <span>{label}</span>
                  <b className="text-ac">{value}</b>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Sec>
  );
}
