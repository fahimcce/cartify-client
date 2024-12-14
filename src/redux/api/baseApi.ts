import {
  fetchBaseQuery,
  createApi,
  BaseQueryFn,
  FetchArgs,
  BaseQueryApi,
  DefinitionType,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/auth/authSlice";

// import Cookies from "js-cookie";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set(`authorization`, `${token}`);
    }
    return headers;
  },
});
// get accesstoken with refresh token
const BaseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    //     // sending refresh token
    const res = await fetch("http://localhost:4000/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    // refresh token valid
    if (data?.success) {
      // set the accesstoken in exsiting user using api dispatch {signa, getState, dispatch} = api
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user,
          token: data?.data,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  //   baseQuery: baseQuery,
  baseQuery: BaseQueryWithRefreshToken,
  tagTypes: ["user", "post", "category", "payment"],
  endpoints: () => ({}),
});
