/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/order */
"use client";
import React, { useState, useEffect } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";

import { siteConfig } from "@/src/config/site";
import DropDownMenu from "./UI/DropDown";
import { FProduct } from "../types/ProductTypes";

export const Navbar = ({ products }: { products: FProduct[] }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<FProduct[]>([]);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Main Navbar */}
      <NextUINavbar
        maxWidth="xl"
        style={{
          position: "fixed",
          top: 0,
          zIndex: 1000,
          width: "100%",
        }}
        className="bg-green-600"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <p className="font-bold text-2xl text-white text-inherit">
                CARTIFY
              </p>
            </NextLink>
            {/* Mobile Search Bar */}

            <div className="sm:hidden ml-2">
              <input
                type="text"
                placeholder="Search products"
                className="w-36 px-4 py-3 border text-sm rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {filteredProducts.length > 0 && (
                <div className="absolute bg-white shadow-lg w-full max-h-64 overflow-y-auto z-50">
                  {filteredProducts.map((product) => (
                    <NextLink
                      key={product.id}
                      href={`/products/details/${product.id}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {product.name}
                    </NextLink>
                  ))}
                  {filteredProducts.length === 0 && (
                    <p className="px-4 py-2 text-gray-500">
                      No products found.
                    </p>
                  )}
                </div>
              )}
            </div>
          </NavbarBrand>
          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-4 justify-start ml-2 ">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink className="text-white" href={item.href}>
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>
        {/* Desktop Search Bar */}
        <NavbarContent className="hidden sm:flex justify-center">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="What are you looking for..."
              className="w-80 px-4 py-3 border text-sm rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredProducts.length > 0 && (
              <div className="absolute bg-white shadow-lg w-full max-h-64 overflow-y-auto z-50">
                {filteredProducts.map((product) => (
                  <NextLink
                    key={product.id}
                    href={`/products/details/${product.id}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {product.name}
                  </NextLink>
                ))}
                {filteredProducts.length === 0 && (
                  <p className="px-4 py-2 text-gray-500">No products found.</p>
                )}
              </div>
            )}
          </div>
        </NavbarContent>
        {/* Desktop Content */}
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <DropDownMenu />
          </NavbarItem>
        </NavbarContent>
        {/* Mobile Menu Toggle */}
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarItem className="sm:flex gap-2">
            <DropDownMenu />
          </NavbarItem>
          <button
            aria-label="Toggle Mobile Menu"
            className="text-white"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </NavbarContent>
      </NextUINavbar>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white w-3/4 h-full shadow-lg p-4">
            <button
              className="mb-4 text-foreground"
              aria-label="Close Mobile Menu"
              onClick={toggleMobileMenu}
            >
              ✕
            </button>
            <ul className="flex flex-col gap-4">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <NextLink
                    className="text-foreground text-lg"
                    href={item.href}
                    onClick={toggleMobileMenu}
                  >
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
