/* eslint-disable import/order */
"use client";

import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/src/components/modules/admin/Dashboards/Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname(); // Get the current path

  // Only show sidebar on specific pages (e.g., '/admin/dashboard', '/admin/users')
  const showSidebar = pathname.startsWith("/admin");

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <main
        className={`flex-1 bg-gray-100 p-6 ml-16 transition-all duration-300 ${"md:ml-40 lg:ml-44"}`}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
