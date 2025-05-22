
import React from "react";
import { Button } from "@/components/ui/button";

type TokenRowProps = {
  token: {
    id: string;
    name: string;
    symbol: string;
    image: string;
    price: number;
    priceChange: number;
    volume: string;
    timeStamp: string;
    warning?: boolean;
    verified?: boolean;
    special?: boolean;
  };
  onSelect: (id: string) => void;
};

const TokenRow: React.FC<TokenRowProps> = ({ token, onSelect }) => {
  const isPriceUp = token.priceChange >= 0;
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(token.price);

  return (
    <div 
      className="flex items-center justify-between p-4 border-b border-gmgn-gray-800 hover:bg-gmgn-gray-900/30"
      onClick={() => onSelect(token.id)}
    >
      <div className="flex items-center">
        <button className="w-6 h-6 mr-3 text-gray-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
        
        <div className="flex-shrink-0 w-10 h-10 mr-3 rounded-full overflow-hidden">
          <img
            src={token.image || "/placeholder.svg"}
            alt={token.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="mr-2">
          <div className="flex items-center">
            <h3 className="font-bold text-white">{token.name}</h3>
            {token.warning && (
              <svg
                className="w-5 h-5 text-red-500 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.83 0-1.5-.67-1.5-1.5S11.17 14 12 14s1.5.67 1.5 1.5S12.83 17 12 17zm0-9c-.83 0-1.5.67-1.5 1.5v4c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-4c0-.83-.67-1.5-1.5-1.5z" />
              </svg>
            )}
            {token.verified && (
              <svg
                className="w-5 h-5 text-blue-500 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
            {token.special && (
              <svg
                className="w-5 h-5 text-green-500 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            )}
          </div>
          <div className="flex text-gray-400 text-sm">
            <span>{token.timeStamp}</span>
            <div className="flex items-center ml-1">
              <span className="px-1 truncate max-w-[120px]">{token.symbol}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="text-right mr-4">
          <div className="font-medium">
            {token.volume && (
              <div className={`text-xl font-bold ${isPriceUp ? 'text-gmgn-green' : 'text-red-500'}`}>
                {token.volume}
              </div>
            )}
            {!token.volume && (
              <div className="text-white font-bold">
                {formattedPrice}
              </div>
            )}
          </div>
          {token.priceChange !== undefined && (
            <div className={`text-sm ${isPriceUp ? 'text-gmgn-green' : 'text-red-500'}`}>
              {isPriceUp && '+'}
              {token.priceChange.toFixed(1)}%
            </div>
          )}
        </div>
        
        <Button
          className="h-10 w-10 rounded-lg bg-gmgn-gray-800 hover:bg-gmgn-gray-700"
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
