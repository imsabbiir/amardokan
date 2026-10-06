/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const sections = [
  "hero",
  "services",
  "how-it-works",
  "catelog",
  "why-us",
  "testimonials",
  "faqs",
];

export default function useActiveNav() {
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState(
    pathname === "/" ? "hero" : pathname
  );

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(pathname);
      return;
    }

    const updateActiveSection = () => {
      const offset = 120;

      // At the very top, Hero/Home is active
      if (window.scrollY < 100) {
        setActiveSection("hero");
        return;
      }

      let currentSection = "hero";

      for (const id of sections) {
        const element = document.getElementById(id);

        if (!element) continue;

        const { top } = element.getBoundingClientRect();

        if (top - offset <= 0) {
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [pathname]);

  return {
    pathname,
    activeSection,
  };
}