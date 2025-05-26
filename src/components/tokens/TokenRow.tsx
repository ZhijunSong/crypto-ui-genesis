import React from "react";
import { Button } from "@/components/ui/button";

// Helper to shorten address
function shortenAddress(addr?: string) {
  if (!addr) return "";
  return addr.length > 8 ? addr.slice(0, 4) + "..." + addr.slice(-4) : addr;
}

// Helper to format numbers (e.g., 47000 -> 47.0K, 2500000 -> 2.5M)
function formatNumber(num?: number) {
  if (num === undefined) return "-";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
}

// Helper to format USD
function formatUSD(num?: number) {
  if (num === undefined) return "-";
  if (num >= 1e6) return "$" + (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return "$" + (num / 1e3).toFixed(1) + "K";
  return "$" + num.toLocaleString();
}

// Helper to format time since (e.g., 176d, 12m, 1h)
function formatTimeSince(timestamp?: string | number) {
  // For now, just return timestamp if present, else "-"
  // You can implement a real time-ago function if you have timestamps
  return timestamp ? String(timestamp) : "-";
}

type TokenRowProps = {
  token: {
    id: string;
    name: string;
    symbol: string;
    image?: string;
    address?: string;
    timeSinceLaunch?: string;
    liq?: number;
    mc?: number;
    trending?: boolean;
    verified?: boolean;
    special?: boolean;
  };
  onSelect: (id: string) => void;
};

const TokenRow: React.FC<TokenRowProps> = ({ token, onSelect }) => {
  return (
    <div
      className="flex items-center justify-between p-3 border-b border-gmgn-gray-800 hover:bg-gmgn-gray-900/30 cursor-pointer"
      onClick={() => onSelect(token.id)}
    >
      {/* Left: Avatar and Info */}
      <div className="flex items-center min-w-0">
        <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden bg-gmgn-gray-700 mr-3">
          <img
            src={token.image || "/placeholder.svg"}
            alt={token.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-white truncate max-w-[100px]">
              {token.name}
            </span>
            {token.verified && (
              <svg
                className="w-4 h-4 text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
            {token.special && (
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            )}
          </div>
          <div className="flex items-center text-xs text-gray-400 space-x-1">
            <span>{token.symbol}</span>
            <span className="">{shortenAddress(token.address)}</span>
            <span className="">{formatTimeSince(token.timeSinceLaunch)}</span>
          </div>
        </div>
      </div>
      {/* Center: Liq, MC */}
      <div className="flex items-center space-x-6">
        <div className="text-right">
          <div className="text-base font-bold text-white">
            {formatNumber(token.liq)}
          </div>
          <div className="text-xs text-gray-400">Liq</div>
        </div>
        <div className="text-right">
          <div className="text-base font-bold text-yellow-400">
            {formatUSD(token.mc)}
          </div>
          <div className="text-xs text-gray-400">MC</div>
        </div>
      </div>
      {/* Right: Trending/Action */}
      <div className="flex items-center space-x-2">
        {token.trending && <span className="text-lg">🔥</span>}
        <Button
          className="h-8 w-8 rounded-lg bg-gmgn-gray-800 hover:bg-gmgn-gray-700 p-0"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <svg
            className="w-5 h-5 text-gmgn-green"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default TokenRow;
