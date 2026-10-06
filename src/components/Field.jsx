"use client";

function Field({ id, label, value, field, setFormData }) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-semibold"
      >
        {label}
      </label>

      <input
        id={id}
        type="number"
        min={0}
        value={value}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            [field]: Number(e.target.value) || 0,
          }))
        }
        className="w-full rounded-xl border border-bd bg-bg px-3.5 py-3 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-ac"
      />
    </div>
  );
}

export default Field;