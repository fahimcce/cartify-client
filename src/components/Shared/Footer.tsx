/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/jsx-sort-props */
"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-700 pb-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Cartify</h3>
            <p className="text-sm text-gray-400">
              Cartify is your one-stop destination for quality products across
              multiple categories. Shop with confidence and enjoy seamless
              online shopping.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gray-300 text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-gray-300 text-sm">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-300 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300 text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 Address: 1234 Market Street, Cartify City</li>
              <li>📞 Phone: +1 (555) 123-4567</li>
              <li>📧 Email: support@cartify.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400">
          {/* Social Media Links */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              LinkedIn
            </a>
          </div>

          {/* Copyright Section */}
          <div>
            <p>© {new Date().getFullYear()} Cartify. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
