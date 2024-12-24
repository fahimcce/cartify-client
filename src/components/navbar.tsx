/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/order */
"use client";
import React, { useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import DropDownMenu from "./UI/DropDown";

export const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Main Navbar */}
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <p className="font-bold text-inherit">CARTIFY</p>
            </NextLink>
          </NavbarBrand>
          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    "text-foreground data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>
        {/* Desktop Content */}
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem className="hidden sm:flex gap-2">
            <DropDownMenu />
          </NavbarItem>
        </NavbarContent>
        {/* Mobile Menu Toggle */}
        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <button
            aria-label="Toggle Mobile Menu"
            className="text-foreground"
            onClick={toggleMobileMenu}
          >
            ☰ {/* Replace with a hamburger icon if you want */}
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
                    onClick={toggleMobileMenu} // Close menu after navigation
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
