import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyShopProduct: builder.query({
      query: () => {
        return {
          url: "/vendor/my-shop-products",
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
  }),
});

export const { useGetMyShopProductQuery } = productApi;
