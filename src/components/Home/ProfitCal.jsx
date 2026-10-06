"use client";

import { useState } from "react";
import Sec from "../Sec";
import Field from "../Field";

const fields = [
  {
    id: "sp",
    label: "Supplier Price (৳)",
    field: "supplierPrice",
  },
  {
    id: "se",
    label: "Your Selling Price (৳)",
    field: "sellingPrice",
  },
  {
    id: "dc",
    label: "Delivery Cost (৳, optional)",
    field: "deliveryCost",
  },
];

export default function ProfitCal() {
  const [formData, setFormData] = useState({
    supplierPrice: 650,
    sellingPrice: 990,
    deliveryCost: 0,
  });

  const profit =
    formData.sellingPrice -
    (formData.supplierPrice + formData.deliveryCost);

  const profitMargin =
    formData.sellingPrice > 0
      ? ((profit / formData.sellingPrice) * 100).toFixed(1)
      : "0.0";

  return (
    <Sec
      id="calculate"
      title="Know your profit before you sell."
      sub="Adjust the numbers and see your margin in real time."
    >
      <div className="mx-auto grid max-w-3xl overflow-hidden rounded-2xl border border-bd bg-card shadow-[0_1px_2px_rgba(10,10,30,.04),0_8px_30px_rgba(10,10,30,.06)] md:grid-cols-2">
        <div className="p-8">
          {fields.map((item) => (
            <Field
              key={item.id}
              id={item.id}
              label={item.label}
              field={item.field}
              value={formData[item.field]}
              setFormData={setFormData}
            />
          ))}
        </div>

        <div className="flex flex-col justify-center bg-ac2 p-8">
          <span className="text-sm text-mut">Your Profit</span>

          <div
            className={`text-6xl font-extrabold tracking-tighter ${
              profit < 0 ? "text-red-500" : "text-ac"
            }`}
          >
            {profit < 0 ? "-" : ""}
            ৳{Math.abs(profit).toLocaleString("en-US")}
          </div>

          <div className="my-5 flex justify-between border-t border-bd pt-4">
            <span className="text-mut">Profit Margin</span>
            <b>{profitMargin}%</b>
          </div>

          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-ac px-5 py-3 text-[15px] font-semibold text-white transition hover:-translate-y-px hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ac"
          >
            Start Selling This Product
          </a>
        </div>
      </div>
    </Sec>
  );
}