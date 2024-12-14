"use server";
import { getAllUsers } from "@/src/services/UserService/UserService";
import UsersTable from "./UsersTable";

// Server-side component
export default async function Users() {
  const users = await getAllUsers(); // Fetch users data

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Total Users: {users.data.length}
      </h1>
      <UsersTable key={users.data[0]?.id} users={users.data} />
    </div>
  );
}
