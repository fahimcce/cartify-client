"use server";
import CardSkeleton from "@/src/components/UI/CartSkeleton";

export default async function FeatureProducts() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
