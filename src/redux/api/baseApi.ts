/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import {
  fetchBaseQuery,
  createApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/auth/authSlice";
import envConfig from "@/src/config/envConfig";

// Base query with token from state
const baseQuery = fetchBaseQuery({
  baseUrl: `${envConfig.baseApi}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

// Custom base query with refresh token logic
const BaseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.warn("Access token expired, attempting refresh...");

    try {
      // Attempt to refresh token
      const refreshResponse = await fetch(
        `${envConfig.baseApi}/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await refreshResponse.json();

      if (data?.success) {
        // Update token and user info in the auth slice
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(
          setUser({
            user,
            token: data?.data, // Assuming `data.data` contains the new access token
          })
        );

        // Retry the original request with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("Refresh token expired or invalid.");
        api.dispatch(logOut());
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
      api.dispatch(logOut());
    }
  }

  return result;
};

// Create the API slice
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: BaseQueryWithRefreshToken,
  tagTypes: ["user", "shop", "product", "payment"],
  endpoints: () => ({}),
});
