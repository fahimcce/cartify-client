/* eslint-disable import/order */
import { ReactNode } from "react";
export default function layout({
  children,
  featureProducts,
  featureCategories,
  flashSales,
  faq,
}: {
  children: ReactNode;
  featureProducts: ReactNode;
  featureCategories: ReactNode;
  flashSales: ReactNode;
  faq: ReactNode;
}) {
  return (
    <div>
      {children} {flashSales} {featureProducts} {featureCategories}
      {faq}
    </div>
  );
}
