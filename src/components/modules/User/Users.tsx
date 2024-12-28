/* eslint-disable import/order */
"use server";
import { getAllUsers } from "@/src/services/UserService/UserService";
import UsersTable from "./UsersTable";

// Server-side component
export default async function Users() {
  const users = await getAllUsers();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Total Users: {users?.length}
      </h1>
      <UsersTable key={users.id} users={users} />
    </div>
  );
}
