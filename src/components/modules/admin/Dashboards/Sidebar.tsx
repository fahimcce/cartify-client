"use client"; // Ensure it's client-side

import { FC, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineAssignment } from "react-icons/md";

const Sidebar: FC = () => {
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
          Admin Panel
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
          <li>
            <button
              onClick={() => handleNavigation("/admin/dashboard")}
              className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
            >
              <AiOutlineDashboard className="mr-4 text-xl" />
              <span className={isOpen ? "" : "hidden"}>Dashboard</span>
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
              onClick={() => handleNavigation("/admin/settings")}
              className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-200"
            >
              <AiOutlineSetting className="mr-4 text-xl" />
              <span className={isOpen ? "" : "hidden"}>Settings</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
