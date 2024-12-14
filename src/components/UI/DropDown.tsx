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
            <DropdownItem
              onPress={() => handleNavigation("/admin/dashboard")}
              key="dashboard"
            >
              Dashboard
            </DropdownItem>
            <DropdownItem
              onPress={() => handleNavigation("/customer")}
              key="customer"
            >
              Customer
            </DropdownItem>
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
