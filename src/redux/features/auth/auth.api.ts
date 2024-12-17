/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";

// import Cookies from "js-cookie";
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => {
        return {
          url: "/user/create-customer",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
    logIn: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },

      // transformErrorResponse: (Response: any) => {
      //   Cookies.set("token", Response?.data?.data?.accessToken);
      //   return Response;
      // },
    }),
    // getAllUser: builder.query({
    //   query: () => {
    //     return {
    //       url: "/user",
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["user"],
    // }),
    // getUserByEmail: builder.query({
    //   query: (email: string) => {
    //     return {
    //       url: `/user/${email}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["user"],
    // }),
    // getUserByid: builder.query({
    //   query: (id: string) => {
    //     return {
    //       url: `/user/id/${id}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["user"],
    // }),
    // updateUser: builder.mutation({
    //   query: (updateInfo: any) => {
    //     return {
    //       url: `/auth/update-user/${updateInfo.id}`,
    //       method: "PUT",
    //       body: updateInfo.updateData,
    //     };
    //   },
    //   invalidatesTags: ["user"],
    // }),
    // followUnfolow: builder.mutation({
    //   query: (info: any) => {
    //     return {
    //       url: "/user/follow-unfollow",
    //       method: "PUT",
    //       body: info,
    //     };
    //   },
    //   invalidatesTags: ["user"],
    // }),
    // makePayment: builder.mutation({
    //   query: (paymentInfo) => {
    //     return {
    //       url: "/payment/confirm-payment",
    //       method: "POST",
    //       body: paymentInfo,
    //     };
    //   },
    //   invalidatesTags: ["payment"],
    // }),
    // changePassword: builder.mutation({
    //   query: (Info) => {
    //     return {
    //       url: "/auth/change-password",
    //       method: "POST",
    //       body: Info,
    //     };
    //   },
    // }),
    // deleteUser: builder.mutation({
    //   query: (id: string) => {
    //     return {
    //       url: `/user/delete/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["user"],
    // }),
    // makeUserAdmin: builder.mutation({
    //   query: (id: string) => {
    //     return {
    //       url: `/user/user-admin/${id}`,
    //       method: "PATCH",
    //     };
    //   },
    //   invalidatesTags: ["user"],
    // }),
    // getPaymentHistory: builder.query({
    //   query: () => {
    //     return {
    //       url: "/payment/get-payment-history",
    //       method: "GET",
    //     };
    //   },
    // }),
  }),
});
export const {
  useLogInMutation,
  useRegisterMutation,
  //   useGetUserByEmailQuery,
  //   useGetUserByidQuery,
  //   useUpdateUserMutation,
  //   useFollowUnfolowMutation,
  //   useMakePaymentMutation,
  //   useChangePasswordMutation,
  //   useGetAllUserQuery,
  //   useDeleteUserMutation,
  //   useMakeUserAdminMutation,
  //   useGetPaymentHistoryQuery,
} = authApi;
