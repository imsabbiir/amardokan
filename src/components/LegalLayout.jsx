"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

const defaultNavigation = [];

export default function LegalPage({
  type = "policy",
  eyebrow,
  title,
  description,
  lastUpdated = "October 6, 2026",
  effectiveDate = "October 6, 2026",
  navigation = defaultNavigation,
  children,
}) {
  const [activeSection, setActiveSection] = useState(navigation[0]?.id || "");

  const isPrivacy = type === "privacy";
  const isTerms = type === "terms";
  const isRefund = type === "refund";

  /*
   * Track which document section is currently visible.
   */
  useEffect(() => {
    if (!navigation.length) return;

    const sectionElements = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.1, 0.25],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navigation]);

  /*
   * Keep active tab in sync when the user clicks navigation.
   */
  function handleNavigationClick(id) {
    setActiveSection(id);

    const element = document.getElementById(id);

    if (!element) return;

    const headerOffset = 96;
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <main className="min-h-screen bg-bg text-fg">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-bd bg-bg2">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 size-128 rounded-full bg-ac/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 left-1/3 size-112 rounded-full bg-ac/5 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-8 md:py-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-mut transition hover:text-fg"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to AmarDokan
          </Link>

          <div className="mt-16 max-w-4xl pb-10 md:mt-20 md:pb-14">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-bd bg-bg px-3 py-1.5 text-xs font-semibold">
                {isPrivacy ? (
                  <ShieldCheck className="size-3.5 text-ac" />
                ) : (
                  <FileText className="size-3.5 text-ac" />
                )}

                {eyebrow}
              </span>

              <span className="rounded-full border border-bd px-3 py-1.5 text-xs text-mut">
                Version 1.0
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-6xl lg:text-7xl">
              {title}
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-7 text-mut md:text-lg md:leading-8">
              {description}
            </p>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-xs text-mut">
              <div>
                <span className="font-medium text-fg">Last updated</span>{" "}
                {lastUpdated}
              </div>

              <div>
                <span className="font-medium text-fg">Effective</span>{" "}
                {effectiveDate}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DOCUMENT
      ====================================================== */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-10 md:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            {/* =================================================
                DESKTOP SIDEBAR
            ================================================== */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-mut">
                  On this page
                </p>

                <nav className="legal-nav-scroll max-h-[calc(100vh-190px)] overflow-y-auto border-l border-bd pr-2">
                  {navigation.map((item) => {
                    const active = activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavigationClick(item.id)}
                        className={`relative block w-full border-l-2 px-4 py-2.5 text-left text-sm transition ${
                          active
                            ? "border-ac font-semibold text-fg"
                            : "border-transparent text-mut hover:border-bd hover:text-fg"
                        }`}
                      >
                        {active && (
                          <span className="absolute -left-0.5 top-0 h-full w-0.5 rounded-full bg-ac" />
                        )}

                        {item.label}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-8 rounded-2xl border border-bd bg-bg2 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-ac" />

                    <p className="text-xs leading-5 text-mut">
                      Please review this document carefully. It explains the
                      rules and policies that apply to your use of AmarDokan.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* =================================================
                CONTENT
            ================================================== */}
            <article className="min-w-0">
              {/* ===============================================
                  MOBILE DOCUMENT TABS
              ================================================ */}
              <div className="mb-10 lg:hidden">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-mut">
                    Sections
                  </p>

                  <span className="text-[11px] text-mut">
                    {navigation.find((item) => item.id === activeSection)
                      ?.label || ""}
                  </span>
                </div>

                <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2">
                  {navigation.map((item) => {
                    const active = activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavigationClick(item.id)}
                        className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${
                          active
                            ? "border-ac bg-ac text-slate-950"
                            : "border-bd bg-bg2 text-mut hover:text-fg"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ===============================================
                  OVERVIEW NOTICE
              ================================================ */}
              <div
                id="overview"
                className="scroll-mt-24 rounded-2xl border border-ac/20 bg-ac/5 p-5 md:p-6"
              >
                <div className="flex gap-4">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-ac/10 text-ac">
                    {isPrivacy ? (
                      <ShieldCheck className="size-4" />
                    ) : (
                      <FileText className="size-4" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Please read this document carefully.
                    </p>

                    <p className="mt-1.5 text-sm leading-6 text-mut">
                      {isPrivacy &&
                        "This Privacy Policy describes the information AmarDokan may collect, why we use it, how it may be shared, and the choices and responsibilities associated with using our services."}

                      {isTerms &&
                        "These Terms & Conditions establish the rules that apply when you create an AmarDokan account, use our platform, submit orders, or use our fulfillment and related services."}

                      {isRefund &&
                        "This Refund Policy explains when refunds, payment adjustments, cancellations, and order-related credits may apply when using AmarDokan's products and fulfillment services."}

                      {!isPrivacy &&
                        !isTerms &&
                        !isRefund &&
                        "This document explains the policies and conditions that apply when using AmarDokan services."}
                    </p>
                  </div>
                </div>
              </div>

              {/* ===============================================
                  DOCUMENT CONTENT
              ================================================ */}
              <div className="mt-12">{children}</div>

              {/* ===============================================
                  CONTACT CTA
              ================================================ */}
              <div
                id="contact"
                className="mt-16 scroll-mt-24 rounded-3xl border border-bd bg-bg2 p-7 md:p-9"
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ac">
                  Questions?
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight">
                  Need clarification?
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-mut">
                  If something is unclear or you have a question about your
                  account, orders, privacy, refunds, or AmarDokan services, our
                  team is available to help.
                </p>

                <Link
                  href="/contact"
                  className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-ac px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
                >
                  Contact AmarDokan
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
