/* eslint-disable import/order */
"use client";
import { NextUIProvider } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { UserProvider } from "../context/user.Provider";
import { store } from "../redux/store";

const GProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <Provider store={store}>
        <NextUIProvider>{children}</NextUIProvider>
      </Provider>
    </UserProvider>
  );
};

export default GProvider;
