/* eslint-disable react/self-closing-comp */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-sort-props */
"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ShoppingBag,
  Star,
  TrendingUp,
  Package,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className=" ">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div
            className={`md:w-1/2 space-y-8 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <div className="space-y-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-green-50 text-green-600">
                <Star className="w-4 h-4 mr-2" />
                Premium Collection
              </span>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover Our
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                  Exclusive Collection
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-lg">
                Experience luxury shopping with our carefully curated collection
                of premium products.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                <p className="text-2xl font-bold text-gray-900">15K+</p>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <Package className="w-8 h-8 text-green-600 mb-3" />
                <p className="text-2xl font-bold text-gray-900">$15,000</p>
                <p className="text-gray-600">Total Savings</p>
              </div>
            </div>

            <button className="group inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-green-600 to-emerald-500 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <Link href="/products">Shop Collection</Link>
              <ArrowRight className="ml-2 w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Right Content */}
          <div
            className={`md:w-1/2 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

              {/* Main Image Container */}
              <div className="relative">
                <div className="bg-white p-3 rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                    alt="Exclusive Collection"
                    className="rounded-2xl w-full h-[600px] object-cover"
                  />

                  {/* Floating Elements */}
                  <div className="absolute -right-6 -bottom-6 bg-gradient-to-r from-green-600 to-emerald-500 p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer">
                    <ShoppingBag className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="absolute -left-6 -bottom-6 bg-white px-6 py-4 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Secure Shopping
                      </p>
                      <p className="text-sm text-gray-600">100% Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
