/* eslint-disable import/order */
import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { fontSans } from "@/src/config/fonts";
import { Providers } from "../lib/Providers";
import { AuthProvider } from "../context/AuthContext";
import GProvider from "../providers/Provider";
import ScrollToTop from "../components/Shared/ScrollToTop";
import { CartProvider } from "../hook/useCart";
import CartIcon from "../components/Shared/CartIcon";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <GProvider>
          <AuthProvider>
            <Providers
              themeProps={{ attribute: "class", defaultTheme: "dark" }}
            >
              <CartProvider>
                {children}
                <CartIcon />
              </CartProvider>
            </Providers>
          </AuthProvider>
        </GProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
