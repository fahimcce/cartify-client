"use client";

import { IInputs } from "@/src/types";
import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

interface inputprops extends IInputs {
  type?: string;
  isDisabled?: boolean;
  defaultValue?: string;
}

const FXInput = ({
  size = "md",
  type = "text",
  variant = "flat",
  isRequired = true,
  clasName,
  defaultValue,
  name,
  label,
  isDisabled,
}: inputprops) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // const preValue = useWatch({ name })

  return (
    <Input
      {...register(name)}
      defaultValue={defaultValue ? defaultValue : ""}
      size={size}
      type={type}
      isDisabled={isDisabled}
      label={label}
      variant={variant}
      isRequired={isRequired}
      className={clasName && clasName}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
    />
  );
};

export default FXInput;
