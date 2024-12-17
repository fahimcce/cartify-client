
/* eslint-disable import/order */
import { jwtDecode } from "jwt-decode";
import { IUSER } from "../types";

export const verifiyToken = (token: any): IUSER => {
  return jwtDecode(token as string);
};
