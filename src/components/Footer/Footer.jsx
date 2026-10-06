import { Package } from "lucide-react";
import Logo from "../common/Logo";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export function Footer() {
  const cols = [
    ["Platform", ["Products", "How It Works", "Dashboard", "Pricing", "API"]],
    [
      "For Sellers",
      ["Become a Seller", "Seller Guide", "Profit Calculator", "Resources"],
    ],
    ["Company", ["About", "Contact", "Careers", "Support"]],
    ["Legal", ["Terms", "Privacy", "Refund Policy"]],
  ];

  return (
    <footer className="bg-bg2">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-12">
        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)] md:gap-8">
          {/* Brand */}
          <div>
            <Logo
              name="AmarDokan"
              title="Build Your Business"
              icon={<Package className="size-4" />}
            />

            <p className="mt-3.5 max-w-sm text-sm leading-6 text-mut">
              Helping entrepreneurs build online businesses without the
              complexity of inventory and fulfillment.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-4 md:grid-cols-4 md:gap-8">
            {cols.map(([heading, links]) => (
              <div key={heading}>
                <h4 className="mb-3 text-sm font-semibold">{heading}</h4>

                <div className="space-y-1">
                  {links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block py-1 text-sm text-mut transition-colors hover:text-fg"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-5 border-t border-bd pt-6 text-[13px] text-mut sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-center sm:text-left">
            © 2026 AmarDokan. All rights reserved.
          </span>

          <div className="flex justify-center gap-5 sm:justify-end">
            {[
              [FaFacebook, "Facebook"],
              [FaInstagram, "Instagram"],
              [FaYoutube, "YouTube"],
            ].map(([Icon, label]) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="transition-colors hover:text-fg"
              >
                <Icon className="size-4.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}