/* eslint-disable import/order */

import { Navbar } from "@/src/components/navbar";
import Footer from "@/src/components/Shared/Footer";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
