/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
"use client";

import { useAuth } from "@/src/context/AuthContext";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function DropDownMenu() {
  const { logOut, user } = useAuth();
  const router = useRouter();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        {user ? (
          <Avatar className="cursor-pointer" src={user.profilePhoto} />
        ) : (
          <Avatar className="cursor-pointer" name="login" />
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label="User Menu">
        {user ? (
          <>
            {user?.role === "ADMIN" && (
              <DropdownItem
                onPress={() => handleNavigation("/admin")}
                key="dashboard"
              >
                Admin Dashboard
              </DropdownItem>
            )}
            {user?.role === "VENDOR" && (
              <DropdownItem
                onPress={() => handleNavigation("/vendor")}
                key="vendor"
              >
                Vendor Dashboard
              </DropdownItem>
            )}
            {user?.role === "CUSTOMER" && (
              <DropdownItem
                onPress={() => handleNavigation("/customer")}
                key="customer"
              >
                Customer Dashboard
              </DropdownItem>
            )}
            <DropdownItem
              onPress={() => handleNavigation("/products")}
              key="products"
            >
              Products
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              <button
                onClick={logOut}
                className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
              >
                Log Out
              </button>
            </DropdownItem>
          </>
        ) : (
          <>
            <DropdownItem key="login" color="success">
              <button
                onClick={() => handleNavigation("/login")}
                className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
              >
                Login
              </button>
            </DropdownItem>
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
