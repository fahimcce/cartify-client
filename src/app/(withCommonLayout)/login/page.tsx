/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { verifiyToken } from "@/src/utils/verifyToken";
import { useAppDispatch } from "@/src/redux/hook";
import { setUser } from "@/src/redux/features/auth/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  const handleDemoLogin = (role: string) => {
    const demoAccounts = {
      admin: { email: "fahim@gmail.com", password: "123456" },
      vendor: { email: "riki@gmail.com", password: "123456" },
      user: { email: "mmk@gmail.com", password: "123456" },
    };
    const account = demoAccounts[role as "admin" | "vendor" | "user"];
    if (account) {
      setEmail(account.email);
      setPassword(account.password);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
        {
          email,
          password,
        }
      );

      const { accessToken, refreshToken } = response.data.data;

      Cookies.set("accessToken", accessToken, { path: "/", secure: false });
      Cookies.set("refreshToken", refreshToken, { path: "/", secure: false });

      const user = verifiyToken(accessToken);

      Cookies.set(
        "user",
        JSON.stringify({
          email: user?.email,
          role: user?.role,
          name: user?.name,
          photo: user?.profilePhoto,
          id: user?.id,
          userId: user?.userId,
        })
      );

      dispatch(setUser({ user, token: accessToken }));

      toast.success("Logged in successfully!");

      router.push("/");
      window.location.href = "/";
    } catch (error: any) {
      setError("Login failed.");
      toast.error("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <h1 className="text-red-500">
          You can explore the demo account. Please dont misuse it.
        </h1>
        <div className="flex justify-around mb-2">
          <button
            className="border px-4 py-2"
            onClick={() => handleDemoLogin("admin")}
          >
            Admin
          </button>
          <button
            className="border px-4 py-2"
            onClick={() => handleDemoLogin("vendor")}
          >
            Vendor
          </button>
          <button
            className="border px-4 py-2"
            onClick={() => handleDemoLogin("user")}
          >
            User
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-blue-600 text-white rounded-md ${
              loading && "opacity-50"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p>
            Are you a new user?{" "}
            <button
              onClick={handleRegisterRedirect}
              className="text-blue-600 hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
