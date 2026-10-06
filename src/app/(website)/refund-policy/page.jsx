import LegalLayout from "@/components/LegalLayout";

const refundSections = [
  {
    id: "product-payments",
    tag: "02 — Product payments",
    title: "Payments for products",
    paragraphs: [
      `When you place an order through AmarDokan, the amount associated with the product and applicable service or fulfillment charges may become part of the transaction.`,
      `If an order is cancelled before fulfillment begins, the amount paid may be eligible for adjustment or refund depending on the order status and any costs already incurred.`,
      `Once an order has entered fulfillment, packing, dispatch, or delivery, additional costs may have been incurred. In these cases, the refundable amount may be different from the original amount paid.`,
    ],
  },

  {
    id: "cancellations",
    tag: "03 — Cancellations",
    title: "Order cancellation",
    paragraphs: [
      `Sellers may request cancellation of an order before it reaches a stage where cancellation is no longer reasonably possible.`,
      `Cancellation requests should be submitted as early as possible. Once an order has been packed, handed to a courier, dispatched, or otherwise processed, cancellation may not be possible or may result in applicable charges.`,
    ],
    cards: [
      {
        title: "Before fulfillment",
        description:
          "Cancellation may generally be easier to process before packing or dispatch begins.",
      },
      {
        title: "After dispatch",
        description:
          "Additional delivery, return, or operational costs may apply when an order has already been dispatched.",
      },
    ],
  },

  {
    id: "customer-returns",
    tag: "04 — Customer returns",
    title: "Returns from customers",
    paragraphs: [
      `If a seller's customer requests a return, the order may be handled according to AmarDokan's return process and the conditions applicable to the product.`,
      `A returned product may need to be received and reviewed before any final refund or account adjustment is determined.`,
      `Where applicable, the seller may remain responsible for costs associated with return delivery, failed delivery, damaged goods, or other operational charges.`,
    ],
  },

  {
    id: "damaged-products",
    tag: "05 — Product issues",
    title: "Damaged, defective, or incorrect products",
    paragraphs: [
      `If a customer receives a product that appears damaged, defective, incomplete, or materially different from what was ordered, the issue should be reported to AmarDokan as soon as reasonably possible.`,
      `We may request supporting information such as order details, photographs, videos, packaging information, or other evidence necessary to investigate the issue.`,
      `After reviewing the situation, AmarDokan may determine whether the appropriate resolution is a replacement, refund, account adjustment, return, or another reasonable solution.`,
    ],
  },

  {
    id: "failed-delivery",
    tag: "06 — Failed delivery",
    title: "Failed, refused, or undelivered orders",
    paragraphs: [
      `An order may fail to reach the customer for reasons including an incorrect address, unreachable customer, customer refusal, repeated delivery attempts, customer-requested cancellation, or other circumstances outside AmarDokan's direct control.`,
      `A failed delivery does not necessarily qualify for a full refund. Delivery, return-to-origin, handling, or other operational costs may have already been incurred.`,
    ],
    note: {
      title: "Example",
      text: "If a parcel has already been dispatched and the customer refuses to receive it, delivery and return-related costs may still apply even though the sale was not completed.",
    },
  },

  {
    id: "cod",
    tag: "07 — Cash on delivery",
    title: "COD orders and settlements",
    paragraphs: [
      `Cash on delivery transactions may require delivery confirmation, collection, reconciliation, and settlement before funds are reflected in a seller's available balance.`,
      `If an order is returned, cancelled, partially adjusted, or otherwise requires reconciliation, the amount ultimately credited to a seller may differ from the original expected amount.`,
      `Any applicable delivery, return, service, or other operational charges may be deducted or reflected in the final settlement.`,
    ],
  },

  {
    id: "service-fees",
    tag: "08 — Service fees",
    title: "Fulfillment and service charges",
    paragraphs: [
      `Certain fees may represent services that have already been provided, such as product handling, packing, fulfillment, delivery processing, or return handling.`,
      `Because these services may involve actual operational costs, completed service fees may not always be refundable even when a related product order is cancelled or returned.`,
      `Any applicable charges should be reviewed before placing or processing an order.`,
    ],
  },

  {
    id: "eligibility",
    tag: "09 — Eligibility",
    title: "When may a refund apply?",
    paragraphs: [
      `Depending on the circumstances, a refund or account adjustment may be considered when:`,
    ],
    list: [
      "An eligible order is cancelled before significant fulfillment activity begins.",
      "AmarDokan is unable to fulfill an order that has already been paid for.",
      "A product is confirmed to have a qualifying defect or fulfillment error.",
      "An incorrect product was supplied due to a fulfillment mistake.",
      "A payment was collected in error or duplicated.",
      "AmarDokan otherwise determines that an adjustment or refund is appropriate.",
    ],
    afterList: [
      `Eligibility is determined based on the specific facts and status of the transaction.`,
    ],
  },

  {
    id: "non-refundable",
    tag: "10 — Non-refundable situations",
    title: "Situations that may not qualify",
    paragraphs: [
      `A refund may not be available where costs have already been incurred or where the circumstances do not qualify under the applicable order conditions.`,
      `Examples may include:`,
    ],
    list: [
      "Orders cancelled after fulfillment or dispatch has already started.",
      "Delivery attempts that fail because of incorrect or incomplete customer information.",
      "Customer refusal or unavailability that results in return delivery.",
      "Charges for services that have already been completed.",
      "Losses caused by inaccurate information supplied by the seller.",
      "Requests that fall outside the applicable return or refund conditions.",
    ],
  },

  {
    id: "refund-process",
    tag: "11 — Refund process",
    title: "How to request a refund",
    paragraphs: [
      `If you believe an order or payment qualifies for a refund, contact AmarDokan support and provide the relevant information.`,
    ],
    cards: [
      {
        title: "01. Contact support",
        description:
          "Provide your account information and the relevant order or transaction ID.",
      },
      {
        title: "02. Explain the issue",
        description:
          "Clearly describe why you believe a refund or adjustment should apply.",
      },
      {
        title: "03. Provide evidence",
        description:
          "Where necessary, provide photographs, videos, payment records, or other supporting information.",
      },
      {
        title: "04. Review & resolution",
        description:
          "Our team will review the request and communicate the available resolution.",
      },
    ],
  },

  {
    id: "refund-method",
    tag: "12 — Refund method",
    title: "How refunds are issued",
    paragraphs: [
      `Where a refund is approved, AmarDokan may return the eligible amount through the original payment method or another appropriate method available for the transaction.`,
      `For seller accounts, an approved adjustment may instead be reflected in the seller's AmarDokan balance or settlement, depending on the nature of the transaction.`,
      `Processing time may vary depending on the payment method, banking system, payment provider, and internal reconciliation requirements.`,
    ],
  },

  {
    id: "partial-refunds",
    tag: "13 — Partial refunds",
    title: "Partial refunds and adjustments",
    paragraphs: [
      `In some situations, only part of a transaction may qualify for a refund.`,
      `For example, the product amount may be eligible for adjustment while delivery, return, packing, or other completed service charges remain applicable.`,
      `The final refundable amount will depend on the specific transaction and the costs already incurred.`,
    ],
  },

  {
    id: "payment-errors",
    tag: "14 — Payment errors",
    title: "Duplicate or incorrect payments",
    paragraphs: [
      `If you believe you have been charged more than once for the same transaction or that an incorrect amount was charged, contact AmarDokan support promptly.`,
      `We may review transaction records, payment confirmations, and account information to determine whether an error occurred.`,
      `Confirmed duplicate or erroneous charges may be corrected through a refund or account adjustment.`,
    ],
  },

  {
    id: "timeline",
    tag: "15 — Processing time",
    title: "How long do refunds take?",
    paragraphs: [
      `Refund requests may require review before they are approved. Investigation time can vary depending on the type of issue and whether additional information is required.`,
      `After approval, the time required for funds to appear may depend on the payment method or financial institution used.`,
    ],
    note: {
      title: "Please allow reasonable processing time",
      text: "AmarDokan cannot guarantee an exact settlement time where the final processing depends on a bank, payment provider, courier reconciliation, or another third party.",
    },
  },

  {
    id: "seller-responsibility",
    tag: "16 — Seller responsibility",
    title: "Accurate order information matters",
    paragraphs: [
      `Sellers are responsible for providing accurate customer, delivery, product, and order information.`,
      `Refunds or adjustments may be affected when a problem results from incorrect information supplied by the seller, including an incorrect address, phone number, product selection, quantity, or other order information.`,
    ],
  },

  {
    id: "fraud",
    tag: "17 — Abuse & fraud",
    title: "Refund abuse",
    paragraphs: [
      `AmarDokan may investigate refund requests that appear fraudulent, abusive, duplicated, misleading, or inconsistent with available transaction information.`,
      `Accounts involved in suspected fraud or repeated abuse may be subject to review, limitation, suspension, or other appropriate action under our Terms & Conditions.`,
    ],
  },

  {
    id: "changes",
    tag: "18 — Policy changes",
    title: "Changes to this Refund Policy",
    paragraphs: [
      `AmarDokan may update this Refund Policy from time to time to reflect changes in our services, operations, payment methods, fulfillment processes, or legal requirements.`,
      `When changes are made, the updated version will be published on this page with a revised effective or updated date.`,
    ],
  },
];

const refundNavigation = [
  {
    id: "overview",
    label: "Overview",
  },
  ...refundSections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  {
    id: "contact",
    label: "Contact",
  },
];

export const metadata = {
  title: "Refund Policy — AmarDokan",
  description:
    "Learn how refunds, order cancellations, returns, failed deliveries, and payment adjustments are handled by AmarDokan.",
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout
      type="refund"
      eyebrow="Refund Policy"
      title="Refunds should be clear."
      description="This Refund Policy explains when refunds, payment adjustments, cancellations, and order-related credits may apply when using AmarDokan's products and fulfillment services."
      lastUpdated="October 6, 2026"
      effectiveDate="October 6, 2026"
      navigation={refundNavigation}
    >
      <div className="legal-doc">
        {/* Overview */}
        <section id="overview">
          <div className="number">01 — Overview</div>

          <h2>Our approach to refunds</h2>

          <p>
            AmarDokan provides product sourcing, fulfillment, delivery, COD,
            returns management, and related services for online sellers.
            Because different transactions may involve products, delivery
            services, customer returns, and seller balances, the way a refund
            or adjustment is handled can depend on the specific situation.
          </p>

          <p>
            We aim to handle eligible refunds and adjustments fairly,
            transparently, and according to the applicable order, service, and
            payment conditions.
          </p>

          <div className="legal-note">
            <p className="legal-note-title">Important</p>

            <p className="legal-note-text">
              A refund is not automatically available for every transaction.
              Eligibility may depend on the reason for the request, the status
              of the order, product condition, delivery status, and any
              applicable charges or adjustments.
            </p>
          </div>
        </section>

        {/* Dynamic sections */}
        {refundSections.map((section) => (
          <section key={section.id} id={section.id}>
            <div className="number">{section.tag}</div>

            <h2>{section.title}</h2>

            {section.paragraphs?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

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

            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {section.afterList?.map((paragraph, index) => (
              <p key={`after-list-${index}`}>{paragraph}</p>
            ))}

            {section.note && (
              <div className="legal-note">
                <p className="legal-note-title">{section.note.title}</p>

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