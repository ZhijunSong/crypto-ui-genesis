import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  "https://682fe7f8f504aa3c70f599c3.mockapi.io/api/web3gmgn/users";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const users = await res.json();
      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );
      if (user) {
        setSuccess("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-80">
      <div className="w-full max-w-md bg-[#181A20] rounded-2xl p-8 shadow-lg relative">
        <button className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-white">
          &times;
        </button>
        <h2 className="text-3xl font-bold text-white mb-2">Log In</h2>
        <p className="text-gray-400 mb-6">
          Don't have an account yet?{" "}
          <span className="text-green-300 cursor-pointer">Sign Up</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-[#23262F] text-gray-200 placeholder-gray-500 focus:outline-none"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-[#23262F] text-gray-200 placeholder-gray-500 focus:outline-none"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                {/* Eye icon placeholder */}
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex justify-end mb-2">
            <span className="text-green-300 text-sm cursor-pointer">
              Forgot Password?
            </span>
          </div>
          {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
          {success && (
            <div className="text-green-400 text-sm mb-2">{success}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-green-300 text-black font-bold text-lg hover:bg-green-400 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>
        <div className="flex justify-between mb-6">
          <div className="flex flex-col items-center">
            <div className="bg-[#23262F] rounded-full p-4 mb-2">
              {/* Telegram icon */}
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <path
                  fill="#39A9EA"
                  d="M21.944 3.685a1.5 1.5 0 00-1.7-.2L3.5 11.1a1.5 1.5 0 00.1 2.8l3.7 1.2 1.3 4.1a1.5 1.5 0 002.7.3l2.1-2.7 3.7 2.7a1.5 1.5 0 002.3-.8l3.1-13.1a1.5 1.5 0 00-.46-1.515z"
                />
              </svg>
            </div>
            <span className="text-gray-200 text-sm">Telegram</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-[#23262F] rounded-full p-4 mb-2">
              {/* Phantom icon */}
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#9B8CFC" />
                <ellipse cx="12" cy="15" rx="4" ry="2" fill="#fff" />
                <ellipse cx="9.5" cy="11" rx="1.5" ry="2" fill="#fff" />
                <ellipse cx="14.5" cy="11" rx="1.5" ry="2" fill="#fff" />
              </svg>
            </div>
            <span className="text-gray-200 text-sm">Phantom</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-[#23262F] rounded-full p-4 mb-2">
              {/* App Scan icon */}
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="4" fill="#fff" />
                <rect
                  x="7"
                  y="7"
                  width="10"
                  height="10"
                  rx="2"
                  fill="#23262F"
                />
              </svg>
            </div>
            <span className="text-gray-200 text-sm">APP Scan</span>
          </div>
        </div>
        <div className="text-center mb-4">
          <span className="text-gray-200">
            Connect with extension wallet{" "}
            <span className="inline-block ml-1">→</span>
          </span>
        </div>
        <div className="flex justify-center text-gray-500 text-xs space-x-2 mt-4">
          <span>Terms of Service</span>
          <span>|</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
