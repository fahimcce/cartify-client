/* eslint-disable import/order */
"use client";
import { Navbar } from "@/src/components/navbar";
import Footer from "@/src/components/Shared/Footer";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/src/services/productServices";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [products, setProducts] = useState([]);

  const showFooter = !(
    pathname.startsWith("/admin") ||
    pathname.startsWith("/customer") ||
    pathname.startsWith("/vendor")
  );

  useEffect(() => {
    (async () => {
      const data = await getAllProducts();

      setProducts(data?.data || []);
    })();
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar products={products} />
      <main className="container mx-auto max-w-7xl px-6 flex-grow mt-12">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
