/* eslint-disable import/order */
import { ReactNode } from "react";
export default function layout({
  children,
  featureProducts,
  featureCategories,
  flashSales,
  benefits,
  faq,
}: {
  children: ReactNode;
  featureProducts: ReactNode;
  featureCategories: ReactNode;
  flashSales: ReactNode;
  faq: ReactNode;
  benefits: ReactNode;
}) {
  return (
    <div>
      {children} {flashSales} {featureProducts} {featureCategories} {benefits}
      {faq}
    </div>
  );
}
