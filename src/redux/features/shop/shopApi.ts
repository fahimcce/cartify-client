
import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyshop: builder.query({
      query: () => {
        return {
          url: "/vendor/my-shop",
          method: "GET",
        };
      },
      providesTags: ["shop"],
    }),
    // createMyShop: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/shops/create-shop",
    //       method: "POST",
    //       data: data,
    //     };
    //   },
    //   invalidatesTags: ["shop"],
    // }),
  }),
});

export const { useGetMyshopQuery } = postApi;
