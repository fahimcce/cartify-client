import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/AuthService";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: (data) => {
      toast.success("User registration successful.");
      console.log("User Registration Success: ", data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
