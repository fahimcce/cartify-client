"use client";

import { IUser } from "@/src/types/user";

interface UsersTableProps {
  users: IUser[]; // Accept users as a prop of type IUser[]
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  // Handle changing user status (static implementation)
  const handleStatusChange = (id: string, status: string) => {
    console.log(`Changing status of user ${id} to ${status}`);
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
          {users.map((user) => (
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
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleStatusChange(user.id, "BLOCKED")}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Block
                </button>
                <button
                  onClick={() => handleStatusChange(user.id, "DELETED")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
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
