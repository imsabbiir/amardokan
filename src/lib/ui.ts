export const card = "rounded-2xl border border-bd bg-card shadow-[0_1px_2px_rgba(10,10,30,.04),0_8px_30px_rgba(10,10,30,.06)]";
const b = "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-semibold transition hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ac";
export const btn = {
  primary: `${b} bg-ac text-white hover:brightness-110`,
  ghost: `${b} border border-bd bg-card text-fg`,
};
export const taka = (n: number) => "৳" + n.toLocaleString("en-US");
