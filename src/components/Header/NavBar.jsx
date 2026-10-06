"use client";

import Link from "next/link";
import { menus } from "./NavMenus";
import useActiveNav from "./useActiveNav";

export default function NavBar() {
  const { pathname, activeSection } = useActiveNav();

  return (
    <nav className="hidden gap-7 text-sm font-medium text-mut lg:flex">
      {menus.map((menu) => {
        const Icon = menu.icon;

        const active = menu.section
          ? pathname === "/" && activeSection === menu.section
          : pathname === menu.href;

        return (
          <Link
            key={menu.id}
            href={menu.href}
            className={`group flex items-center gap-2 py-2 ${
              active ? "text-fg" : ""
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />

            <span className="relative">
              {menu.name}

              <span
                className={`absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-ac transition-transform duration-200 ease-out ${
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
