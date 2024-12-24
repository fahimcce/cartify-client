/* eslint-disable import/order */
"use client";

import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/src/components/modules/admin/Dashboards/Sidebar";

interface VendorLayoutProps {
  children: ReactNode;
}

const CustomerLayout: FC<VendorLayoutProps> = ({ children }) => {
  const pathname = usePathname(); // Get the current path

  const showSidebar = pathname.startsWith("/customer");

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

export default CustomerLayout;
