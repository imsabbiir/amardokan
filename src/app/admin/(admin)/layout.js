// app/admin/(panel)/layout.jsx

import AdminShell from "@/components/Admin/AdminShell";

export default function AdminPanelLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}