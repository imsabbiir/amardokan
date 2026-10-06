import {
  Home,
  Cog,
  TableOfContents,
  UserRoundGroup,
  Handshake,
  Boxes,
  Shirt,
} from "lucide-react";

export const menus = [
  {
    id: 1,
    name: "Home",
    href: "/",
    section: "Hero",
    icon: Home,
  },
  {
    id: 2,
    name: "Our Services",
    href: "/#services",
    section: "services",
    icon: Boxes,
  },
  {
    id: 3,
    name: "How It Works",
    href: "/#how-it-works",
    section: "how-it-works",
    icon: Cog,
  },
  {
    id: 4,
    name: "Catelog",
    href: "/#catelog",
    section: "catelog",
    icon: Shirt,
  },
  {
    id: 5,
    name: "Why Us",
    href: "/#why-us",
    section: "why-us",
    icon: Handshake,
  },
  {
    id: 6,
    name: "Testimonials",
    href: "/#testimonials",
    section: "testimonials",
    icon: UserRoundGroup,
  },
  {
    id: 7,
    name: "FAQs",
    href: "/#faqs",
    section: "faqs",
    icon: TableOfContents,
  },
];