import React from "react";
import { Wallet } from "lucide-react";

type HeaderProps = {
  walletConnected?: boolean;
  walletBalance?: number;
  cryptoSymbol?: string;
};

const Header: React.FC<HeaderProps> = ({
  walletConnected = false,
  walletBalance = 0,
  cryptoSymbol = "SOL",
}) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gmgn-bg border-b border-gmgn-gray-800">
      <div className="flex items-center">
        <div className="w-8 h-8 mr-2">
          <img
            src="/placeholder.svg"
            alt="GMGN Logo"
            className="w-full h-full"
          />
        </div>
        <div className="flex items-center">
          <span className="text-white font-bold mr-1">{cryptoSymbol}</span>
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center">
        <button className="p-2 rounded-full mr-2">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="p-2 rounded-full">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
