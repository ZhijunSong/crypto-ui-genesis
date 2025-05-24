import React, { useState } from "react";
import { MessagesSquare, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gmgn-gray-900 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Log In</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg text-white mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gmgn-gray-800 border-none text-white rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg text-white mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-gmgn-gray-800 border-none text-white rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
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
                )}
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <a href="#" className="text-gmgn-green hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          <Button
            className="w-full py-6 bg-gmgn-green hover:bg-green-500 text-black font-bold text-xl rounded-lg"
            onClick={() => {
              /* Handle login */
            }}
          >
            Log In
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gmgn-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gmgn-gray-900 text-gray-400 text-lg">
                OR
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <Button
                className="w-full h-20 bg-gmgn-gray-800 hover:bg-gmgn-gray-700 rounded-lg flex flex-col items-center justify-center"
                variant="outline"
              >
                <MessagesSquare className="h-8 w-8 text-blue-400" />
                <span className="text-xs text-gray-300 mt-1">Telegram</span>
              </Button>
            </div>
            <div className="col-span-1">
              <Button
                className="w-full h-20 bg-gmgn-gray-800 hover:bg-gmgn-gray-700 rounded-lg flex flex-col items-center justify-center"
                variant="outline"
              >
                <svg
                  className="h-8 w-8 text-purple-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  <circle cx="8" cy="14" r="2" />
                  <circle cx="16" cy="14" r="2" />
                </svg>
                <span className="text-xs text-gray-300 mt-1">Phantom</span>
              </Button>
            </div>
            <div className="col-span-1">
              <Button
                className="w-full h-20 bg-gmgn-gray-800 hover:bg-gmgn-gray-700 rounded-lg flex flex-col items-center justify-center"
                variant="outline"
              >
                <Wallet className="h-8 w-8 text-white" />
                <span className="text-xs text-gray-300 mt-1">Wallet</span>
              </Button>
            </div>
            <div className="col-span-1">
              <Button
                className="w-full h-20 bg-gmgn-gray-800 hover:bg-gmgn-gray-700 rounded-lg flex flex-col items-center justify-center"
                variant="outline"
              >
                <svg
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M7 7h10v10H7z" />
                </svg>
                <span className="text-xs text-gray-300 mt-1">APP Scan</span>
              </Button>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don't have an account yet?{" "}
              <a
                href="#"
                className="text-gmgn-green hover:underline font-medium"
              >
                Sign Up Now
              </a>
            </p>
          </div>

          <div className="pt-4 mt-6 text-center border-t border-gmgn-gray-800">
            <a href="#" className="text-gray-400 hover:text-white mr-4">
              Terms of Service
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-400 hover:text-white ml-4">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
