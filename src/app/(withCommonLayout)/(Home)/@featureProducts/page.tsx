"use server";
import FeatureCard from "@/src/components/modules/Home/FeatureCard";
import { getAllProducts } from "@/src/services/productServices";
import { IProduct } from "@/src/types/ProductTypes";

export default async function featureProducts() {
  const products = await getAllProducts();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Featured Products</h1>
        <p className="text-lg text-gray-600">
          Explore the products you’ll love the most
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.data.slice(0, 6).map((product: IProduct) => (
          <FeatureCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
