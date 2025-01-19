/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { MdOutlineAssignment } from "react-icons/md";
import { useAuth } from "@/src/context/AuthContext";

const Sidebar: FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter(); // Initialize the useRouter hook

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path); // Programmatically navigate to the given path
  };

  return (
    <div
      className={`h-full fixed top-16 left-0 bg-gray-800 text-white ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 shadow-lg z-50`}
    >
      <div className="flex justify-between items-center p-6 bg-gray-800">
        <h2
          className={`text-2xl font-semibold text-white ${
            isOpen ? "" : "hidden"
          }`}
        >
          {user?.role == "ADMIN" && "Admin Panel"}
          {user?.role == "VENDOR" && "VENDOR Panel"}
          {user?.role == "CUSTOMER" && "CUSTOMER Panel"}
        </h2>
        <button
          onClick={toggleSidebar}
          className="text-white text-xl p-2 hover:bg-gray-700 rounded-md"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      <nav className="mt-8">
        <ul>
          {user?.role === "ADMIN" && (
            <>
              <li>
                <button
                  onClick={() => handleNavigation("/admin")}
                  className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <AiOutlineDashboard className="mr-4 text-xl" />
                  <span className={isOpen ? "" : "hidden"}>Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/admin/me")}
                  className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <div className="mr-4 text-xl">👨‍💻</div>
                  <span className={isOpen ? "" : "hidden"}>Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/admin/users")}
                  className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <AiOutlineUser className="mr-4 text-xl" />
                  <span className={isOpen ? "" : "hidden"}>Users</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/admin/shops")}
                  className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <MdOutlineAssignment className="mr-4 text-xl" />
                  <span className={isOpen ? "" : "hidden"}>Shops</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/admin/category")}
                  className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <MdOutlineAssignment className="mr-4 text-xl" />
                  <span className={isOpen ? "" : "hidden"}>CateGories</span>
                </button>
              </li>
            </>
          )}
          {user?.role === "VENDOR" && (
            <>
              <li>
                <button
                  onClick={() => handleNavigation("/vendor/me")}
                  className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <div className="mr-4 text-xl">👨‍💻</div>
                  <span className={isOpen ? "" : "hidden"}>Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/vendor/my-shop")}
                  className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <AiOutlineDashboard className="mr-4 text-xl" />
                  <span className={isOpen ? "" : "hidden"}>My Shop</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/vendor/create-shop")}
                  className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <AiOutlineUser className="mr-4 text-xl" />
                  <span className={isOpen ? "" : "hidden"}>Create Shop</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/vendor/create-product")}
                  className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <MdOutlineAssignment className="mr-4 text-xl" />
                  <span className={isOpen ? "" : "hidden"}>Create Product</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/vendor/my-products")}
                  className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <MdOutlineAssignment className="mr-4 text-xl" />
                  <span className={isOpen ? "" : "hidden"}>
                    My shops Products
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/vendor/total-orders")}
                  className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <MdOutlineAssignment className="mr-4 text-xl" />
                  <span className={isOpen ? "" : "hidden"}>Total Order</span>
                </button>
              </li>
            </>
          )}
          {user?.role === "CUSTOMER" && (
            <>
              <li>
                <button
                  onClick={() => handleNavigation("/customer/my-orders")}
                  className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <div className="mr-4 text-xl">📋</div>
                  <span className={isOpen ? "" : "hidden"}>My Orders</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/customer/me")}
                  className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
                >
                  <div className="mr-4 text-xl">👨‍💻</div>
                  <span className={isOpen ? "" : "hidden"}>Profile</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
