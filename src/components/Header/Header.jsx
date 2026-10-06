"use client";
import { useState } from "react";
import { Package, Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import GetStartedButton from "../common/GetStartedButton";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <header
      className={`sticky top-0 z-50 border-b border-bd bg-bg/80 backdrop-blur-xl transition`}
    >
      <SideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

      <div className="mx-auto flex h-16 max-w-10/11 items-center justify-between">
        <Logo
          name={"AmarDokan"}
          title={"Build Your Business"}
          icon={<Package className="size-4" />}
        />
        <NavBar />
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/login" className="px-3 text-sm font-medium ">
            Login
          </Link>
          <GetStartedButton href="/signup" title="Get Started" className={`px-4 py-3 gap-3`}/>
        </div>
        <button
          type="button"
          onClick={() => {
            setSidebarOpen(true);
          }}
          aria-label="Open sidebar"
          aria-controls="main-sidebar"
          className="relative flex lg:hidden h-10 w-10 shrink-0 items-center justify-center rounded-full text-bd transition-colors bg-ac"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
