"use client";
import {
  ChevronDown,
  HelpCircle,
  RotateCcw,
  ShoppingBag,
  Truck,
  UserRound,
} from "lucide-react";
import Sec from "../Sec";
import { useMemo, useState } from "react";
const categories = [
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    id: "shipping",
    label: "Shipping",
    icon: Truck,
  },
  {
    id: "returns",
    label: "Returns",
    icon: RotateCcw,
  },
  {
    id: "account",
    label: "Account",
    icon: UserRound,
  },
];
const faqs = [
  {
    category: "orders",
    question: "How do I place an order?",
    answer:
      "Browse the products on StylePulse, select the product you want, choose the available options such as color and size, select your quantity, and add the product to your cart. Once you are ready, continue to checkout and complete your order.",
  },
  {
    category: "orders",
    question: "Can I order products in bulk?",
    answer:
      "Yes. StylePulse is designed with wholesale purchasing in mind. Product pages may include minimum quantities and wholesale pricing depending on the product.",
  },
  {
    category: "orders",
    question: "Can I change my order after placing it?",
    answer:
      "If your order has not yet been processed or shipped, we may be able to help you make changes. Contact our support team as soon as possible with your order number.",
  },
  {
    category: "orders",
    question: "How can I check my order status?",
    answer:
      "You can check your order status from your account when order tracking is available. If you need additional assistance, contact our support team with your order number.",
  },
  {
    category: "orders",
    question: "What payment methods do you accept?",
    answer:
      "Available payment methods may vary depending on your location and the checkout options currently enabled on StylePulse. The available methods will be shown during checkout.",
  },

  {
    category: "shipping",
    question: "Where do you deliver?",
    answer:
      "Delivery availability depends on the destination and the products in your order. Available delivery options and applicable charges are shown during checkout.",
  },
  {
    category: "shipping",
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on your location, product availability, courier service, and other factors. The estimated delivery time will be provided when available.",
  },
  {
    category: "shipping",
    question: "Can I track my order?",
    answer:
      "When tracking is available for your order, tracking information will be provided through your account or order communication.",
  },
  {
    category: "shipping",
    question: "What happens if my package is delayed?",
    answer:
      "Courier delays can sometimes happen because of weather, holidays, traffic, operational issues, or other circumstances. If your package appears significantly delayed, contact us and we will help you check its status.",
  },
  {
    category: "shipping",
    question: "What if I receive the wrong product?",
    answer:
      "Please contact us as soon as possible after receiving your order. Provide your order number and clear photos of the product you received so our team can review the issue.",
  },

  {
    category: "returns",
    question: "What is your return policy?",
    answer:
      "Our return policy covers eligible situations such as damaged, defective, incorrect, or materially different products. Eligibility depends on the condition of the product and the applicable return requirements.",
  },
  {
    category: "returns",
    question: "How do I request a return?",
    answer:
      "Contact our support team with your order number and a description of the issue. For damaged or incorrect products, please provide clear photos or videos when requested.",
  },
  {
    category: "returns",
    question: "Can I return a product that I have used?",
    answer:
      "Generally, returned products should be unused, unworn, unwashed, and in the required original condition. Some products may have additional return restrictions.",
  },
  {
    category: "returns",
    question: "How long does a refund take?",
    answer:
      "Once a refund has been approved, processing time depends on the payment method and the relevant payment provider. We will provide additional information when your refund is processed.",
  },

  {
    category: "account",
    question: "How do I create a StylePulse account?",
    answer:
      "Go to the Sign Up page and create an account using the available registration options. You may be asked to provide your name, phone number, password, and other required information.",
  },
  {
    category: "account",
    question: "Can I sign in with Google?",
    answer:
      "Yes. If Google authentication is enabled for your account, you can use the Continue with Google option on the login page.",
  },
  {
    category: "account",
    question: "I forgot my password. What should I do?",
    answer:
      "Use the Forgot Password option on the login page and follow the available recovery instructions.",
  },
  {
    category: "account",
    question: "How can I update my account information?",
    answer:
      "After signing in, you can update the account information available through your profile settings. If you cannot change a particular detail, contact our support team.",
  },
];
export function FAQ() {
  const [activeCategory, setActiveCategory] = useState("orders");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = faq.category === activeCategory;

      return matchesCategory;
    });
  }, [activeCategory]);

  function handleCategoryChange(category) {
    setActiveCategory(category);
    setOpenIndex(null);
  }
  return (
    <section id="faqs" className="bg-bg2 py-20 px-5">
      <div className="mx-auto max-w-3xl text-center space-y-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-ac/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-ac">
          <HelpCircle size={14} />
          Help center
        </span>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Frequently asked <span className="text-ac">questions.</span>
        </h1>

        <p className="mt-4 text-lg text-mut">
          Find quick answers about orders, shipping, returns, accounts, and
          shopping with StylePulse.
        </p>
      </div>
      <div className="mx-auto max-w-4xl mt-20">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const active = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-ac text-card"
                    : "border border-bd bg-bd text-fg hover:border-ac hover:text-ac"
                }`}
              >
                <Icon size={16} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Results */}
        <div className="mt-10">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.question}
                    className={`overflow-hidden rounded-2xl border bg-card transition ${
                      isOpen
                        ? "border-ac"
                        : "border-bd hover:border-ac"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="text-sm font-semibold leading-6 sm:text-base">
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                          isOpen
                            ? "bg-ac text-card"
                            : "bg-bd text-stone-500"
                        }`}
                      >
                        <ChevronDown
                          size={17}
                          className={`transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-stone-100 px-5 pb-6 pt-5 sm:px-6">
                          <p className="text-sm leading-7 text-stone-500">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-stone-200 bg-white px-6 py-16 text-center">
              <h2 className="mt-5 font-semibold">No questions found</h2>

              <p className="mt-2 text-sm text-stone-500">
                Try a different search term or choose another category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="mt-5 text-sm font-bold text-[#719b32] hover:text-stone-900"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
