/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
"use client";

import { useState, useEffect } from "react";
import { getAllProducts } from "@/src/services/productServices";
import { IProduct } from "@/src/types/ProductTypes";
import FeatureCard from "../Home/FeatureCard";
import CommonLoader from "../../Shared/CommonLoader";

export function SkeletonCard() {
  return (
    <div className="p-4">
      <div className="rounded-md shadow-md bg-gray-100 animate-pulse flex flex-col justify-between h-full">
        {/* Image Placeholder */}
        <div className="h-40 bg-gray-300 rounded-t-md"></div>

        {/* Text Placeholder */}
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-300 rounded-md"></div>
          <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
        </div>

        {/* Button Placeholder */}
        <div className="p-4 flex flex-col space-y-2">
          <div className="h-10 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const productsPerPage = 12;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getAllProducts();

      setProducts(data?.data || []);
      setFilteredProducts(data?.data || []);
      setLoading(false);
    })();
  }, []);

  // Filter products based on price range
  useEffect(() => {
    const { min, max } = priceRange;
    const filtered = products.filter(
      (product) => product.price >= min && product.price <= max
    );

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [priceRange, products]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPriceRange((prev) => ({
      ...prev,
      [name]: value ? parseFloat(value) : 0,
    }));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Price Filter */}
      <div className="flex items-center space-x-4 my-4">
        <div className="flex flex-col">
          <label htmlFor="minPrice" className="text-sm font-medium">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            name="min"
            value={priceRange.min}
            onChange={handlePriceChange}
            className="border rounded-md px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="maxPrice" className="text-sm font-medium">
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            name="max"
            value={priceRange.max === Infinity ? "" : priceRange.max}
            onChange={handlePriceChange}
            className="border rounded-md px-3 py-2"
            placeholder="∞"
          />
        </div>
      </div>

      {loading ? (
        <CommonLoader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {paginatedProducts.map((product: IProduct) => (
            <FeatureCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2 mt-6">
        {/* Previous Arrow */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md ${
            currentPage === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-400"
          }`}
        >
          &lt;
        </button>

        {/* Page Numbers */}
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

        {/* Next Arrow */}
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
    </div>
  );
}
