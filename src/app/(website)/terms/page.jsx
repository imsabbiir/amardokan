import LegalLayout from "@/components/LegalLayout";

const termsSections = [
  {
    id: "acceptance",
    tag: "01 — Agreement",
    title: "Acceptance of these terms",
    paragraphs: [
      `These Terms & Conditions ("Terms") govern your access to and use of AmarDokan's website, seller platform, products, fulfillment services, and related services.`,
      `By creating an account, accessing the platform, submitting an order, or using an AmarDokan service, you acknowledge that you have read and agree to these Terms.`,
    ],
    note: {
      title: "Don't agree?",
      text: `If you do not agree with these Terms, you should not create an account or use AmarDokan's services.`,
    },
  },

  {
    id: "services",
    tag: "02 — AmarDokan",
    title: "What AmarDokan provides",
    paragraphs: [
      `AmarDokan is designed to provide infrastructure and operational support for online sellers.`,
    ],
    cards: [
      {
        title: "Product sourcing",
        description:
          "Access to products made available through AmarDokan's product catalog.",
      },
      {
        title: "Fulfillment",
        description:
          "Processing, packing, and preparing seller orders for delivery where the service is available.",
      },
      {
        title: "Delivery",
        description:
          "Coordination with delivery or courier services to deliver orders to customers.",
      },
      {
        title: "Seller tools",
        description:
          "Dashboard, order-management, product, pricing, and other tools designed to support online selling.",
      },
    ],
    afterCards: [
      `Specific services, pricing, availability, and operational procedures may vary and may be subject to additional policies or service-specific terms.`,
    ],
  },

  {
    id: "accounts",
    tag: "03 — Accounts",
    title: "Seller accounts",
    paragraphs: [
      `To use certain AmarDokan services, you may need to create a seller account.`,
      `You agree to:`,
    ],
    list: [
      "Provide accurate and current account information.",
      "Keep your login credentials secure.",
      "Use your account only for legitimate business purposes.",
      "Notify us if you suspect unauthorized account activity.",
      "Keep information required for order fulfillment accurate.",
    ],
    afterList: [
      `You are responsible for activity performed through your account unless the activity resulted from a security issue that was not reasonably within your control.`,
    ],
  },

  {
    id: "products",
    tag: "04 — Products",
    title: "Product availability and information",
    paragraphs: [
      `Products displayed through AmarDokan may be subject to changing availability, inventory levels, supplier conditions, pricing, and operational limitations.`,
      `We make reasonable efforts to provide accurate product information, but product descriptions, images, specifications, prices, and availability may occasionally change or contain temporary errors.`,
      `We may discontinue, replace, limit, or temporarily remove products from the catalog.`,
    ],
  },

  {
    id: "pricing",
    tag: "05 — Pricing",
    title: "Product costs and seller pricing",
    paragraphs: [
      `Product costs and applicable service or delivery charges may vary depending on the product, destination, order, courier, or other operational factors.`,
      `Where AmarDokan allows sellers to determine their own selling prices, sellers are responsible for setting prices that are accurate, lawful, and appropriate for their business.`,
    ],
    subSections: [
      {
        title: "Profit estimates",
        paragraphs: [
          `Any profit calculator, estimated margin, suggested price, or similar calculation provided by AmarDokan is intended as a planning tool only.`,
          `Actual profit may differ because of delivery costs, returns, cancellations, discounts, refunds, product cost changes, payment adjustments, taxes, or other expenses.`,
        ],
      },
    ],
  },

  {
    id: "orders",
    tag: "06 — Orders",
    title: "Submitting and processing orders",
    paragraphs: [
      `When you submit an order through AmarDokan, you are responsible for ensuring that the information provided is accurate and complete.`,
      `This includes, where applicable:`,
    ],
    list: [
      "Customer name.",
      "Customer phone number.",
      "Delivery address.",
      "Selected product and quantity.",
      "Selling price.",
      "Relevant order instructions.",
    ],
    afterList: [
      `We may contact you or take operational steps to verify or clarify an order where necessary.`,
    ],
  },

  {
    id: "fulfillment",
    tag: "07 — Fulfillment",
    title: "Order fulfillment",
    paragraphs: [
      `After receiving an eligible order, AmarDokan may prepare the product for delivery according to the applicable fulfillment process.`,
      `Fulfillment may include product preparation, packaging, order verification, labeling, and handover to a delivery provider.`,
      `Fulfillment timelines may vary depending on product availability, order volume, operational conditions, holidays, and other factors.`,
    ],
  },

  {
    id: "delivery",
    tag: "08 — Delivery",
    title: "Delivery and courier services",
    paragraphs: [
      `AmarDokan may use third-party courier or logistics providers to complete deliveries.`,
      `Delivery time is an estimate and may be affected by destination, weather, traffic, courier capacity, customer availability, public holidays, operational interruptions, or other circumstances.`,
      `Sellers are responsible for providing a deliverable and sufficiently accurate customer address and contact information.`,
    ],
  },

  {
    id: "cod",
    tag: "09 — COD",
    title: "Cash on delivery",
    paragraphs: [
      `Where cash-on-delivery is available, AmarDokan or its delivery partners may collect payment from the customer on behalf of the applicable seller or fulfillment process.`,
      `Settlement timing, deductions, verification, returned orders, failed deliveries, and other adjustments may be handled according to the applicable AmarDokan procedures.`,
    ],
    note: {
      title: "Important",
      text: `A delivered order does not necessarily mean settlement is immediately available. Settlement may be subject to verification, reconciliation, returns, and applicable adjustments.`,
    },
  },

  {
    id: "returns",
    tag: "10 — Returns",
    title: "Returns, cancellations, and failed deliveries",
    paragraphs: [
      `Orders may be cancelled, refused, returned, or otherwise fail to complete for reasons including customer unavailability, incorrect information, product issues, courier limitations, or other circumstances.`,
      `Applicable return, delivery, or handling charges may apply depending on the reason for the return and the applicable AmarDokan policy.`,
      `Sellers should review the applicable return process before submitting orders and should provide accurate customer information to reduce avoidable delivery failures.`,
    ],
  },

  {
    id: "responsibilities",
    tag: "11 — Seller responsibilities",
    title: "Your responsibilities as a seller",
    paragraphs: [
      `By using AmarDokan, you agree that you will:`,
    ],
    list: [
      "Provide accurate information.",
      "Use the platform honestly and lawfully.",
      "Submit legitimate customer orders.",
      "Respect customer privacy.",
      "Provide accurate delivery information.",
      "Maintain the security of your account.",
      "Follow applicable AmarDokan operational policies.",
      "Resolve customer-related issues appropriately.",
    ],
  },

  {
    id: "prohibited-use",
    tag: "12 — Prohibited use",
    title: "Activities that are not allowed",
    paragraphs: [
      `You may not use AmarDokan to engage in fraudulent, deceptive, abusive, unlawful, or harmful activity.`,
      `Examples include:`,
    ],
    list: [
      "Submitting fake or fraudulent orders.",
      "Using stolen payment or identity information.",
      "Manipulating delivery or return systems.",
      "Attempting to bypass account or platform security.",
      "Submitting intentionally misleading customer information.",
      "Using AmarDokan to facilitate illegal activities.",
      "Interfering with the availability or security of the platform.",
      "Attempting to access another user's account.",
    ],
  },

  {
    id: "suspension",
    tag: "13 — Suspension",
    title: "Account suspension or termination",
    paragraphs: [
      `We may restrict, suspend, or terminate access to an account when we reasonably believe that the account has violated these Terms, applicable policies, or legal requirements, or presents a security, fraud, operational, or other significant risk.`,
      `Where appropriate and reasonably possible, we may provide notice or an opportunity to resolve the issue.`,
    ],
  },

  {
    id: "intellectual-property",
    tag: "14 — Intellectual property",
    title: "Our platform and content",
    paragraphs: [
      `Unless otherwise stated, AmarDokan and its licensors own or have appropriate rights to the platform, software, interface, branding, logos, graphics, text, designs, and other materials provided by AmarDokan.`,
      `You may use the platform only as permitted by these Terms. You may not copy, reproduce, modify, distribute, reverse engineer, or commercially exploit AmarDokan's protected materials without appropriate authorization.`,
    ],
  },

  {
    id: "third-party",
    tag: "15 — Third parties",
    title: "Third-party services",
    paragraphs: [
      `AmarDokan may depend on third-party services such as courier providers, payment services, hosting providers, communication services, analytics tools, or other technology providers.`,
      `Third-party services may have their own terms, policies, fees, availability, and limitations.`,
    ],
  },

  {
    id: "availability",
    tag: "16 — Availability",
    title: "Service availability",
    paragraphs: [
      `We aim to provide a reliable service, but we do not guarantee that AmarDokan will always be available, uninterrupted, completely secure, or free from errors.`,
      `Temporary interruptions may occur because of maintenance, technical failures, internet or network issues, third-party service interruptions, security events, or circumstances beyond our reasonable control.`,
    ],
  },

  {
    id: "disclaimer",
    tag: "17 — Disclaimer",
    title: "Business decisions and results",
    paragraphs: [
      `AmarDokan provides tools and operational services to support online sellers. We do not guarantee that a seller will achieve a particular sales volume, profit, customer response, or business result.`,
      `Product availability, estimated margins, suggested selling prices, calculators, and other business information should be treated as planning information rather than a guarantee of financial results.`,
    ],
  },

  {
    id: "liability",
    tag: "18 — Liability",
    title: "Limitation of liability",
    paragraphs: [
      `To the maximum extent permitted by applicable law, AmarDokan will not be responsible for indirect, incidental, special, consequential, or similar losses arising from or related to your use of the platform or services.`,
      `Nothing in these Terms is intended to exclude or limit liability where such exclusion or limitation is not permitted by applicable law.`,
    ],
  },

  {
    id: "changes",
    tag: "19 — Changes",
    title: "Changes to these Terms",
    paragraphs: [
      `AmarDokan may update these Terms when our services, business operations, policies, or applicable requirements change.`,
      `The updated version will be posted on this page with a revised "Last updated" date. Your continued use of the services after the effective date of updated Terms may constitute acceptance of the revised Terms where permitted by applicable law.`,
    ],
  },

  {
    id: "contact",
    tag: "20 — Contact",
    title: "Questions about these Terms?",
    paragraphs: [
      `If you have questions about these Terms, your account, orders, fulfillment, delivery, or any AmarDokan service, please contact our team.`,
    ],
    note: {
      title: "Contact information",
      text: `Replace this notice with your actual AmarDokan support email, phone number, and business address before publishing.`,
    },
  },
];

/*
|--------------------------------------------------------------------------
| Navigation
|--------------------------------------------------------------------------
| Automatically generated from termsSections.
|
| overview + all sections + contact
|
*/
const termsNavigation = [
  {
    id: "overview",
    label: "Overview",
  },

  ...termsSections
    .filter((section) => section.id !== "contact")
    .map((section) => ({
      id: section.id,
      label: section.title,
    })),

  {
    id: "contact",
    label: "Contact",
  },
];

export const metadata = {
  title: "Terms & Conditions | AmarDokan",
  description:
    "Read the terms governing AmarDokan accounts, products, orders, fulfillment, delivery, returns, payments, and platform usage.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      type="terms"
      eyebrow="Terms & Conditions"
      title="The rules are simple."
      description="These Terms & Conditions explain the rules, responsibilities, and conditions that apply when using AmarDokan."
      lastUpdated="October 6, 2026"
      effectiveDate="October 6, 2026"
      navigation={termsNavigation}
    >
      <div className="legal-doc">
        {termsSections.map((section) => (
          <section key={section.id} id={section.id}>
            {/* Section tag */}
            <div className="number">{section.tag}</div>

            {/* Section title */}
            <h2>{section.title}</h2>

            {/* Paragraphs before list/cards */}
            {section.paragraphs?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {/* Cards */}
            {section.cards && (
              <div className="legal-grid">
                {section.cards.map((card) => (
                  <div className="legal-card" key={card.title}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Paragraphs after cards */}
            {section.afterCards?.map((paragraph, index) => (
              <p key={`after-card-${index}`}>{paragraph}</p>
            ))}

            {/* Sub-sections */}
            {section.subSections?.map((subSection) => (
              <div key={subSection.title}>
                <h3>{subSection.title}</h3>

                {subSection.paragraphs?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                {subSection.list && (
                  <ul>
                    {subSection.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* List */}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {/* Paragraphs after list */}
            {section.afterList?.map((paragraph, index) => (
              <p key={`after-list-${index}`}>{paragraph}</p>
            ))}

            {/* Note */}
            {section.note && (
              <div className="legal-note">
                <p className="legal-note-title">
                  {section.note.title}
                </p>

                <p className="legal-note-text">
                  {section.note.text}
                </p>
              </div>
            )}
          </section>
        ))}
      </div>
    </LegalLayout>
  );
}