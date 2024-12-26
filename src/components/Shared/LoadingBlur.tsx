/* eslint-disable react/jsx-sort-props */
import { Spinner } from "@nextui-org/spinner";
import React from "react";

const LoadingBlur = () => {
  return (
    <div className="absolute h-full w-full bg-white/10 backdrop-blur-sm z-50 flex items-center justify-center">
      <Spinner label="Proccessing" color="default" labelColor="foreground" />
    </div>
  );
};

export default LoadingBlur;
