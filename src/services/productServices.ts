/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable padding-line-between-statements */
"use server";

export const flashProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/flashproducts`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Products Not found !!");
  }
  const result = await res.json();
  return result.data;
};

export const getAllProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Products Not found !!");
  }
  return res.json();
};

export const getSingleProduct = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/products/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Product Not found !!");
  }
  return res.json();
};
