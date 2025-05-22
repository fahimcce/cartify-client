/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllProducts } from "@/src/services/productServices";
import { IProduct } from "@/src/types/ProductTypes";
import FeatureCard from "../Home/FeatureCard";
import { Filter, Search, ArrowUpDown, RotateCcw } from "lucide-react";
import SkeletonFeatureCard from "../../Shared/SkeletonFeatureCard";

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const productsPerPage = 50;

  const { data, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  useEffect(() => {
    if (!data?.data) {
      setFilteredProducts([]);

      return;
    }

    let result = [...data.data];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    const { min, max } = priceRange;

    result = result.filter(
      (product) =>
        product.price >= min && (max === Infinity || product.price <= max)
    );

    // Sort
    if (sortOrder) {
      result.sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset page on filter change
  }, [data, priceRange, searchQuery, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const handlePriceChange = (e: any) => {
    const { name, value } = e.target;

    setPriceRange((prev) => ({
      ...prev,
      [name]: value ? parseFloat(value) : name === "min" ? 0 : Infinity,
    }));
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange({ min: 0, max: Infinity });
    setSortOrder(null);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </header>

      <div
        className={`bg-white shadow-md transition-all duration-300 ${
          isFilterOpen ? "max-h-96" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative flex">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="flex space-x-2">
              <input
                type="number"
                id="minPrice"
                name="min"
                placeholder="Min Price"
                value={priceRange.min}
                onChange={handlePriceChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="number"
                id="maxPrice"
                name="max"
                placeholder="Max Price"
                value={priceRange.max === Infinity ? "" : priceRange.max}
                onChange={handlePriceChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Price: {sortOrder === "asc" ? "Low to High" : "High to Low"}
            </button>

            <button
              onClick={resetFilters}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonFeatureCard key={index} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {paginatedProducts.map((product: IProduct) => (
                <FeatureCard key={product.id} product={product} />
              ))}
            </div>

            <div className="flex items-center justify-center space-x-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-300"
                    : "bg-gray-200 hover:bg-gray-400"
                }`}
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-400 text-gray-800"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-gray-200 hover:bg-gray-400"
                }`}
              >
                &gt;
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">No products found.</div>
        )}
      </main>
    </div>
  );
}
