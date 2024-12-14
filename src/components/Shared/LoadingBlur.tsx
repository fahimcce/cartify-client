import { Spinner } from "@nextui-org/spinner";
import React from "react";

const LoadingBlur = () => {
  return (
    <div className="absolute h-full w-full bg-white/10 backdrop-blur-sm top-0 left-0 z-50 flex items-center justify-center">
      <Spinner label="Proccessing" color="default" labelColor="foreground" />
    </div>
  );
};

export default LoadingBlur;
