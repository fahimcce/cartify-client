import { ReactNode } from "react";
export default function layout({
  children,
  featureProducts,
  featureCategories,
  flashSales,
}: {
  children: ReactNode;
  featureProducts: ReactNode;
  featureCategories: ReactNode;
  flashSales: ReactNode;
}) {
  return (
    <div>
      {children} {featureProducts} {featureCategories} {flashSales}
    </div>
  );
}
