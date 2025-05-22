/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Search, Menu, X, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import DropDownMenu from "./UI/DropDown";
import { FProduct } from "../types/ProductTypes";
import Link from "next/link";

export default function Navbar({ products }: { products: FProduct[] }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<FProduct[]>([]);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredProducts(
        products.filter((product: FProduct) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    setSearchQuery("");
  };

  return (
    <>
      {/* Navbar */}
      <NextUINavbar
        maxWidth="xl"
        className={`fixed top-0 w-full z-[60] transition-all duration-300 ${
          isScrolled
            ? "bg-white text-gray-800 shadow-lg h-[70px]"
            : "bg-green-600 text-white h-[80px]"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-full">
          {/* Logo */}
          <NavbarBrand className="flex-shrink-0">
            <Link
              href="/"
              className={`flex items-center gap-2 text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-green-600" : "text-white"
              }`}
            >
              <ShoppingBag className="w-8 h-8" />
              CARTIFY
            </Link>
          </NavbarBrand>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  href={item.href}
                  className={`text-lg font-medium hover:opacity-80 transition-opacity ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleSearch}
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? "hover:bg-gray-100 text-gray-700"
                  : "hover:bg-white/20 text-white"
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <div className="hidden lg:block">
              <DropDownMenu />
            </div>

            <button
              onClick={toggleMobileMenu}
              className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? "hover:bg-gray-100 text-gray-700"
                  : "hover:bg-white/20 text-white"
              }`}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <div
          className={`absolute left-0 w-full z-[60] bg-white shadow-lg transition-all duration-300 ${
            isSearchOpen
              ? "top-full opacity-100 visible"
              : "top-[120%] opacity-0 invisible"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-lg shadow-xl max-h-[300px] overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/details/${product.id}`}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="font-medium text-gray-900">
                        {product.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </NextUINavbar>

      {/* Mobile Menu Overlay and Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden z-50 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMobileMenu}
      >
        <div
          className={`fixed right-0 top-[80px] w-[300px] h-[calc(100vh-80px)] bg-white shadow-xl transition-transform duration-300 transform z-50 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <nav className="space-y-6">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-lg font-medium text-gray-800 hover:text-green-600 transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <div>
                <Link href="/login">Login</Link>
              </div>
              <div>
                {" "}
                <DropDownMenu />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className={isScrolled ? "h-[70px]" : "h-[80px]"} />
    </>
  );
}
