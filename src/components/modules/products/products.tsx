"use server";
import { getAllProducts } from "@/src/services/productServices";
import ProductCard from "./productCard";
import { IProduct } from "@/src/types/ProductTypes";

export default async function Products() {
  const products = await getAllProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.data.map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
