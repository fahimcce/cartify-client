/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { IUser } from "@/src/types/user";
import { updateUserStatus } from "@/src/services/UserService/UserService";

interface UsersTableProps {
  users: IUser[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [userList, setUserList] = useState<IUser[]>(users);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, status: string) => {
    setLoadingUserId(id); // Show loading only for this user row

    try {
      const response = await updateUserStatus(id, status);

      if (response && response.data) {
        const updatedUser = response.data; // Destructure the updated user

        // Explicitly update the user's status in the local state
        setUserList((prev) =>
          prev.map((user) =>
            user.id === id ? { ...user, status: updatedUser.status } : user
          )
        );

        toast.success(`User status updated to ${updatedUser.status}`);
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error: any) {
      toast.error("Failed to update user status.");
    } finally {
      setLoadingUserId(null); // Remove the loading state
    }
  };

  return (
    <div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full ${
                    user.status === "ACTIVE"
                      ? "bg-green-500"
                      : user.status === "BLOCKED"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  } text-white`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleStatusChange(user.id, "ACTIVE")}
                  className={`bg-green-500 text-white px-3 py-1 rounded mr-2 ${
                    loadingUserId === user.id
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={loadingUserId === user.id}
                >
                  {loadingUserId === user.id ? "..." : "Activate"}
                </button>
                <button
                  onClick={() => handleStatusChange(user.id, "BLOCKED")}
                  className={`bg-yellow-500 text-white px-3 py-1 rounded mr-2 ${
                    loadingUserId === user.id
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={loadingUserId === user.id}
                >
                  {loadingUserId === user.id ? "..." : "Block"}
                </button>
                <button
                  onClick={() => handleStatusChange(user.id, "DELETED")}
                  className={`bg-red-500 text-white px-3 py-1 rounded ${
                    loadingUserId === user.id
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={loadingUserId === user.id}
                >
                  {loadingUserId === user.id ? "..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
