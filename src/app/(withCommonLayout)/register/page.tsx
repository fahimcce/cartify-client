/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleClick = (type: string) => {
    if (type === "user") {
      router.push("/register/user");
    } else {
      router.push("/register/vendor");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* User Box */}
        <div
          className="bg-blue-600 p-6 rounded-lg shadow-lg text-white text-center cursor-pointer transition-transform transform hover:scale-105 hover:bg-blue-700"
          onClick={() => handleClick("user")}
        >
          <h2 className="text-3xl font-bold mb-4">User</h2>
          <p className="text-lg">Sign up as a user to explore our services.</p>
        </div>

        {/* Vendor Box */}
        <div
          className="bg-green-600 p-6 rounded-lg shadow-lg text-white text-center cursor-pointer transition-transform transform hover:scale-105 hover:bg-green-700"
          onClick={() => handleClick("vendor")}
        >
          <h2 className="text-3xl font-bold mb-4">Vendor</h2>
          <p className="text-lg">
            Sign up as a vendor to offer your products or services.
          </p>
        </div>
      </div>
    </div>
  );
}
