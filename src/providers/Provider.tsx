/* eslint-disable import/order */
"use client";
import { NextUIProvider } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { UserProvider } from "../context/user.Provider";
import { store } from "../redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const GProvider = ({ children }: { children: ReactNode }) => {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Provider store={store}>
          <NextUIProvider>{children}</NextUIProvider>
        </Provider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default GProvider;
