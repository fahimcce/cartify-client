"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie"; // Import js-cookie for cookie management
import { verifiyToken } from "@/src/utils/verifyToken";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Handle navigation to the registration page
  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  // Handle form submission
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

      // Assuming backend sends a success message with access token and refresh token
      const { accessToken, refreshToken } = response.data.data;

      // Store the tokens in cookies
      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);

      const user = verifiyToken(accessToken);
      // console.log(user);
      Cookies.set(
        "user",
        JSON.stringify({
          email: user.email,
          role: user.role,
          name: user.name,
          photo: user.profilePhoto,
          id: user.id,
        })
      );

      // Show success toast
      toast.success("Logged in successfully!");

      // Redirect to homepage
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
