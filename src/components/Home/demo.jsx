import { card } from "@/lib/ui";
const Sec = ({ id, alt, title, sub, children }) => (
  <section id={id} className={`py-24 ${alt ? "bg-bg2" : ""}`}>
    <div className="mx-auto max-w-6xl px-5">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h2>

        {sub && <p className="mt-4 text-lg text-mut">{sub}</p>}
      </div>

      {children}
    </div>
  </section>
);

const Ico = ({ I }) => (
  <div className="mb-4 grid size-11 place-items-center rounded-xl bg-ac2 text-ac">
    <I className="size-5" />
  </div>
);
const quotes = [
  [
    "A",
    "Facebook Seller · Dhaka",
    "I used to worry about stock. Now I just focus on my page and customers.",
  ],
  [
    "B",
    "Online Entrepreneur · Chattogram",
    "Seeing my profit before I list a product makes pricing simple.",
  ],
  [
    "C",
    "E-commerce Store Owner · Sylhet",
    "Tracking every order in one place saves me hours each day.",
  ],
];
export function Testimonials() {
  return (
    <Sec title="Built for people who want to sell, not manage warehouses.">
      <div className="grid gap-5 md:grid-cols-3">
        {quotes.map(([a, r, q]) => (
          <figure key={a} className={`${card} p-6`}>
            <blockquote>
              “{q}” <small className="text-mut">(placeholder)</small>
            </blockquote>

            <figcaption className="mt-5 flex items-center gap-3 text-sm">
              <span className="grid size-10 place-items-center rounded-full bg-ac2 font-bold text-ac">
                {a}
              </span>

              <span>
                Name Surname
                <small className="block text-mut">{r}</small>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Sec>
  );
}

export default Testimonials