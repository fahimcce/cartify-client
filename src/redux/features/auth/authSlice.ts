/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  email: string;
  role: "ADMIN" | "VENDOR" | "CUSTOMER";
  name: string;
  id: string;
  profilePhoto?: string;
};
export type TInitialState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      Cookies.set("accessToken", token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
  },
});
export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
