"use client";

import { useState } from "react";

import DashboardSidebar from "@/components/Dashboard/sidebar";
import DashboardHeader from "@/components/Dashboard/header";

export default function DashboardLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <DashboardSidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="lg:pl-67.5">
        <DashboardHeader
          onMenuClick={() => setMobileSidebarOpen(true)}
        />

        <main>{children}</main>
      </div>
    </div>
  );
}