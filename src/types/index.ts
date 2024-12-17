import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInputs {
  name: string;
  label: string;
  size?: "sm" | "md" | "lg";
  clasName?: string;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  defaultValue?: string;
  placeholder?: string;
  isRequired?: boolean;
}

export interface IUser {
  id: string;
  name: string;
  role: string;
  email: string;
  profilePhoto: string;
}

export interface IUSER {
  email: string;
  role: "ADMIN" | "VENDOR" | "CUSTOMER";
  iat: number;
  exp: number;
  name: string;
  id: string;
  profilePhoto: string;
}

export type Tshop = {
  id: string;
  shopName: string;
  shopLogo: string;
  description: string;
  address: string;
  restricted: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  vendorId: string;
  vendor: TVendor;
};

export type TVendor = {
  id: string;
  email: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
