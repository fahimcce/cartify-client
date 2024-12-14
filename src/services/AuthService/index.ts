"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getCurrenUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken as string);
    return {
      name: decodedToken?.name,
      email: decodedToken?.email,
      id: decodedToken?.id,
      role: decodedToken?.role,
      profilePhoto: decodedToken?.profilePhoto,
    };
  }
  return decodedToken;
};
