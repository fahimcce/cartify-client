import { ReactNode } from "react";
export default function layout({
  children,
  featureProducts,
}: {
  children: ReactNode;
  featureProducts: ReactNode;
}) {
  return (
    <div>
      {children} {featureProducts}
    </div>
  );
}
