import LegalLayout from "@/components/LegalLayout";

const privacySections = [
  {
    id: "introduction",
    tag: "01 — Introduction",
    title: "Who we are",

    paragraphs: [
      `AmarDokan ("AmarDokan", "we", "us", or "our") provides a platform and related services designed to help online sellers source products, receive and manage orders, and use fulfillment and delivery services without operating their own complete inventory and logistics infrastructure.`,

      `This Privacy Policy applies to information collected through the AmarDokan website, seller dashboard, account services, communications, and other services that link to or reference this policy.`,
    ],

    note: {
      title: "In simple terms",
      text: "We collect information that allows us to operate your account, process orders, fulfill deliveries, provide support, improve the platform, and protect AmarDokan and its users.",
    },
  },

  {
    id: "information",
    tag: "02 — Information",
    title: "Information we collect",

    paragraphs: [
      `The information we collect depends on how you interact with AmarDokan. Some information is provided directly by you, while some information is generated when you use our services.`,
    ],

    cards: [
      {
        title: "Account information",
        description:
          "Name, email address, phone number, account credentials, business information, and other details needed to create and manage your seller account.",
      },

      {
        title: "Order information",
        description:
          "Product selections, quantities, selling prices, order status, customer details, delivery information, and other information needed to process an order.",
      },

      {
        title: "Customer information",
        description:
          "When a seller uses AmarDokan for fulfillment, we may process customer name, phone number, address, and order information provided by that seller.",
      },

      {
        title: "Technical information",
        description:
          "Browser type, device information, IP-related technical data, pages visited, session information, and similar information generated when using our website.",
      },
    ],

    subSections: [
      {
        title: "Information you provide",

        paragraphs: [
          `You may provide information when you register, update your account, submit an order, contact support, communicate with us, or otherwise use our services.`,
        ],
      },

      {
        title: "Information collected automatically",

        paragraphs: [
          `Like many websites and online services, AmarDokan may automatically collect certain technical and usage information to maintain security, understand performance, troubleshoot problems, and improve the user experience.`,
        ],
      },
    ],
  },

  {
    id: "use",
    tag: "03 — Use",
    title: "How we use information",

    paragraphs: [
      `We use information for legitimate operational, security, support, and business purposes, including:`,
    ],

    list: [
      "Creating and managing seller accounts.",
      "Processing and managing orders.",
      "Preparing products for fulfillment.",
      "Coordinating delivery and logistics.",
      "Supporting cash-on-delivery workflows where available.",
      "Managing returns, cancellations, and failed deliveries.",
      "Providing customer and seller support.",
      "Communicating service updates and important notices.",
      "Improving our website, dashboard, products, and services.",
      "Detecting fraud, abuse, suspicious activity, or security issues.",
      "Maintaining business, financial, and operational records.",
      "Complying with applicable legal obligations.",
    ],

    note: {
      title: "We don't need every piece of information.",
      text: "We aim to collect and use information that is reasonably relevant to operating AmarDokan and providing the services you request.",
    },
  },

  {
    id: "customer-information",
    tag: "04 — Customer data",
    title: "Information about your customers",

    paragraphs: [
      `AmarDokan may process information about your customers when you submit an order for fulfillment.`,

      `This may include a customer's name, telephone number, delivery address, order details, and information necessary to coordinate delivery or resolve an order issue.`,

      `When you provide customer information to AmarDokan, you are responsible for ensuring that you are authorized to provide that information and that the information is appropriate and necessary for the service you are requesting.`,
    ],

    note: {
      title: "Seller responsibility",
      text: "Please do not provide unnecessary customer information. Only provide information reasonably required to process and fulfill the order.",
    },
  },

  {
    id: "sharing",
    tag: "05 — Sharing",
    title: "When information may be shared",

    paragraphs: [
      `AmarDokan does not operate by selling personal information. We may share information when doing so is reasonably necessary to provide our services, protect users, operate the platform, or comply with applicable obligations.`,
    ],

    subSections: [
      {
        title: "Service providers",

        paragraphs: [
          `We may work with third-party providers that help us operate our business. Depending on the service, these providers may assist with hosting, technology, communications, analytics, payment-related operations, customer support, or logistics.`,
        ],
      },

      {
        title: "Delivery partners",

        paragraphs: [
          `When delivery is required, relevant customer and order information may be provided to a courier or logistics provider so that the order can be delivered.`,
        ],
      },

      {
        title: "Legal and safety reasons",

        paragraphs: [
          `We may disclose information when reasonably necessary to comply with legal obligations, respond to lawful requests, investigate fraud or abuse, protect our systems, or protect the rights, property, or safety of AmarDokan, our users, or others.`,
        ],
      },
    ],
  },

  {
    id: "cookies",
    tag: "06 — Cookies",
    title: "Cookies and similar technologies",

    paragraphs: [
      `AmarDokan may use cookies, local storage, session technologies, analytics tools, and similar technologies.`,

      `These technologies can help us keep users signed in, remember preferences, understand how our website is used, maintain security, and improve performance.`,

      `Your browser may provide controls for managing cookies. Disabling certain technologies may affect parts of the website or platform.`,
    ],
  },

  {
    id: "security",
    tag: "07 — Security",
    title: "How we protect information",

    paragraphs: [
      `We use reasonable technical and organizational measures intended to protect information from unauthorized access, misuse, alteration, loss, or disclosure.`,
    ],

    cards: [
      {
        title: "Access control",
        description:
          "Access to information should be limited according to operational requirements and account permissions.",
      },

      {
        title: "Operational safeguards",
        description:
          "We use reasonable procedures designed to reduce unauthorized access and misuse of our systems.",
      },
    ],

    afterCards: [
      `No online service can guarantee absolute security. You are also responsible for keeping your password and account credentials confidential and for notifying us if you suspect unauthorized access.`,
    ],
  },

  {
    id: "retention",
    tag: "08 — Retention",
    title: "How long we keep information",

    paragraphs: [
      `We may retain information for as long as reasonably necessary to provide services, maintain account and transaction records, resolve disputes, prevent fraud, meet operational requirements, or comply with applicable obligations.`,

      `Retention periods may vary depending on the type of information and the reason it was collected.`,
    ],
  },

  {
    id: "choices",
    tag: "09 — Your choices",
    title: "Your information and account",

    paragraphs: [
      `Depending on the circumstances and applicable requirements, you may contact us regarding information associated with your AmarDokan account.`,

      `You should also keep your account information accurate and inform us if important details change.`,

      `Some information may need to be retained even after an account is closed where it is reasonably necessary for legal, security, accounting, dispute-resolution, or operational purposes.`,
    ],
  },

  {
    id: "children",
    tag: "10 — Children",
    title: "Children's information",

    paragraphs: [
      `AmarDokan is intended for users who are legally able to enter into business and service arrangements applicable to their use of the platform.`,

      `We do not knowingly design our services to collect personal information from children for independent use of the platform.`,
    ],
  },

  {
    id: "changes",
    tag: "11 — Changes",
    title: "Changes to this Privacy Policy",

    paragraphs: [
      `We may update this Privacy Policy as AmarDokan's services, technology, business operations, or legal requirements change.`,

      `When we make changes, we may update the "Last updated" date at the beginning of this document. Where appropriate, we may provide additional notice for significant changes.`,
    ],
  },

  {
    id: "contact",
    tag: "12 — Contact",
    title: "Questions about privacy?",

    paragraphs: [
      `If you have questions about this Privacy Policy, how information is handled, or a privacy-related request, please contact the AmarDokan team.`,
    ],

    note: {
      title: "Privacy contact",
      text: "Replace this section with your actual privacy/support email address before publishing the website.",
    },
  },
];

/*
|--------------------------------------------------------------------------
| Privacy Navigation
|--------------------------------------------------------------------------
| Generated automatically from privacySections.
|
| overview + all privacy sections + contact
|
*/

const privacyNavigation = [
  {
    id: "overview",
    label: "Overview",
  },

  ...privacySections
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
  title: "Privacy Policy | AmarDokan",
  description:
    "Learn how AmarDokan collects, uses, protects, and handles information when you use our platform and fulfillment services.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      type="privacy"
      eyebrow="Privacy Policy"
      title="Your privacy matters."
      description="This Privacy Policy explains how AmarDokan collects, uses, shares, and protects information when you use our platform and services."
      lastUpdated="October 6, 2026"
      effectiveDate="October 6, 2026"
      navigation={privacyNavigation}
    >
      <div className="legal-doc">
        {privacySections.map((section) => (
          <section key={section.id} id={section.id}>
            {/* Section tag */}
            <div className="number">{section.tag}</div>

            {/* Section title */}
            <h2>{section.title}</h2>

            {/* Main paragraphs */}
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