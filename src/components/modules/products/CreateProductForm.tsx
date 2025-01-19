/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { createProduct } from "@/src/services/vendor/vendorServices";
import { uploadImageToCloudinary } from "@/src/utils/uploadToCloudinary";
import { fetchCategories } from "@/src/services/Category Services/CategoryServices";
import { Tcategory } from "@/src/types";

export default function CreateProductPage() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Tcategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Tcategory[]>([]);
  const [categoryInputVisible, setCategoryInputVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: Tcategory[] = await fetchCategories();
      setCategories(data);
    };

    fetchData();
  }, []);

  const handleCategorySelect = (category: Tcategory) => {
    if (!selectedCategories.find((cat) => cat.id === category.id)) {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  const handleCategoryRemove = (id: string) => {
    setSelectedCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handlePostSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const imageFile = formData.get("image") as File;
    const images = await uploadImageToCloudinary(imageFile);
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      inventoryCount: parseInt(formData.get("inventoryCount") as string, 10),
      discount: parseFloat(formData.get("discount") as string),
      images,
      categories: selectedCategories.map((cat) => cat.id),
    };

    try {
      await createProduct(productData);
      toast.success("Product created successfully!");
      formRef.current?.reset();
      setSelectedCategories([]);
      setLoading(false);
    } catch {
      toast.error("Something went wrong. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pb-16">
      <div className="w-full md:w-2/3 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create a New Product
        </h1>
        <form
          ref={formRef}
          onSubmit={handlePostSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Product Name
            </label>
            <input
              name="name"
              type="text"
              className="w-full input input-bordered"
              placeholder="Enter Product name"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <input
              name="description"
              type="text"
              className="w-full input input-bordered"
              placeholder="Description of the product"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block font-medium mb-1">
              Price
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              className="w-full input input-bordered"
              placeholder="Price of the product"
              required
            />
          </div>

          <div>
            <label htmlFor="inventoryCount" className="block font-medium mb-1">
              Inventory Count
            </label>
            <input
              name="inventoryCount"
              type="number"
              className="w-full input input-bordered"
              placeholder="Inventory count"
              required
            />
          </div>

          <div>
            <label htmlFor="discount" className="block font-medium mb-1">
              Discount
            </label>
            <input
              name="discount"
              type="number"
              step="0.01"
              className="w-full input input-bordered"
              placeholder="Discount on the product"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block font-medium mb-1">
              Product Image
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full input input-bordered"
              required
            />
          </div>

          <div>
            <label htmlFor="categories" className="block font-medium mb-1">
              Categories
            </label>
            <div
              className="relative"
              onClick={() => setCategoryInputVisible((prev) => !prev)}
            >
              <div className="w-full input input-bordered cursor-pointer">
                {selectedCategories.length > 0
                  ? selectedCategories.map((cat) => cat.name).join(", ")
                  : "Select categories..."}
              </div>
              {categoryInputVisible && (
                <div className="absolute z-10 bg-white border border-gray-200 w-full rounded shadow">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <span
                  key={category.id}
                  className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full"
                >
                  {category.name}
                  <button
                    type="button"
                    onClick={() => handleCategoryRemove(category.id)}
                    className="ml-2 text-indigo-700 hover:text-indigo-900"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium text-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:bg-indigo-400"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Create Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
