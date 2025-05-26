import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type TokenDetailProps = {
  token: {
    id: string;
    name: string;
    symbol: string;
    image: string;
    price: number;
    priceChange: number;
    marketCap?: number;
    totalLiquidity?: number;
    holders?: number;
    totalSupply?: string;
    poolCreated?: string;
    warnings?: {
      noMint?: boolean;
      blacklist?: boolean;
      burnt?: boolean;
      topHolders?: string;
    };
  };
};

// Helper to synthesize OHLC data from price array
function synthesizeOHLC(prices) {
  // Use a sliding window of 4 for each candle
  const ohlc = [];
  for (let i = 0; i < prices.length - 3; i += 4) {
    const window = prices.slice(i, i + 4);
    if (window.length < 4) break;
    ohlc.push({
      open: window[0],
      high: Math.max(...window),
      low: Math.min(...window),
      close: window[3],
    });
  }
  return ohlc;
}

// Minimal SVG Candlestick Chart
function MiniCandlestickChart({ ohlcData, width = 320, height = 120 }) {
  if (!ohlcData.length) return <div>No data</div>;
  const max = Math.max(...ohlcData.map((c) => c.high));
  const min = Math.min(...ohlcData.map((c) => c.low));
  const range = max - min || 1;
  const candleWidth = (width / ohlcData.length) * 0.6;
  return (
    <svg width={width} height={height}>
      {ohlcData.map((c, i) => {
        const x = (i + 0.5) * (width / ohlcData.length);
        const yOpen = height - ((c.open - min) / range) * height;
        const yClose = height - ((c.close - min) / range) * height;
        const yHigh = height - ((c.high - min) / range) * height;
        const yLow = height - ((c.low - min) / range) * height;
        const isUp = c.close >= c.open;
        return (
          <g key={i}>
            <line
              x1={x}
              x2={x}
              y1={yHigh}
              y2={yLow}
              stroke="#888"
              strokeWidth={2}
            />
            <rect
              x={x - candleWidth / 2}
              y={Math.min(yOpen, yClose)}
              width={candleWidth}
              height={Math.abs(yClose - yOpen) || 2}
              fill={isUp ? "#4ade80" : "#f87171"}
              stroke="#222"
              strokeWidth={1}
              rx={2}
            />
          </g>
        );
      })}
    </svg>
  );
}

const DASHBOARD_API_URL =
  "https://682fe7f8f504aa3c70f599c3.mockapi.io/api/web3gmgn/dashboardData";
const CRYPTO_API_URL =
  "https://682fe7f8f504aa3c70f599c3.mockapi.io/api/web3gmgn/cryptocurrencies";

const TokenDetail: React.FC<TokenDetailProps> = ({ token }) => {
  const [timeframe, setTimeframe] = useState("1h");
  const [tab, setTab] = useState("activity");
  const isPriceUp = token.priceChange >= 0;
  const [priceHistory, setPriceHistory] = useState([]);
  const [ohlcData, setOhlcData] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(DASHBOARD_API_URL).then((r) => r.json()),
      fetch(CRYPTO_API_URL).then((r) => r.json()),
    ]).then(([dashboard, cryptos]) => {
      let prices = [];
      dashboard.forEach((entry) => {
        const asset = (entry.cryptoAssets || []).find((a) => a.id === token.id);
        if (asset && asset.currentPriceUSD) prices.push(asset.currentPriceUSD);
      });
      cryptos.forEach((entry) => {
        const asset = (entry.cryptoAssets || []).find((a) => a.id === token.id);
        if (asset && asset.currentPriceUSD) prices.push(asset.currentPriceUSD);
      });
      setPriceHistory(prices);
    });
  }, [token.id, timeframe]);

  useEffect(() => {
    fetch(CRYPTO_API_URL)
      .then((r) => r.json())
      .then((cryptos) => {
        // Find by name (case-insensitive)
        const entry = cryptos.find(
          (c) => c.name.toLowerCase() === token.name.toLowerCase()
        );
        setOhlcData(entry && entry.ohlcData ? entry.ohlcData : []);
      });
  }, [token.name, timeframe]);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(token.price);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gmgn-gray-800">
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

          <div className="flex-shrink-0 w-12 h-12 mr-3 rounded-full overflow-hidden">
            <img
              src={token.image || "/placeholder.svg"}
              alt={token.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-white">{token.name}</h2>
              {token.warnings && Object.keys(token.warnings).length > 0 && (
                <svg
                  className="w-5 h-5 text-red-500 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.83 0-1.5-.67-1.5-1.5S11.17 14 12 14s1.5.67 1.5 1.5S12.83 17 12 17zm0-9c-.83 0-1.5.67-1.5 1.5v4c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-4c0-.83-.67-1.5-1.5-1.5z" />
                </svg>
              )}
            </div>
            <div className="flex items-center text-gray-400">
              <span>{token.symbol}</span>
              <svg
                className="w-4 h-4 ml-1"
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

        <div className="flex items-center">
          <button className="p-2">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl font-bold text-gmgn-green">
            {formattedPrice}
          </div>
          <span className="text-gray-400 font-medium">HODL</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            className={`px-4 py-2 font-medium rounded-full ${
              timeframe === "1m"
                ? "bg-gmgn-gray-700 text-white"
                : "bg-gmgn-gray-800 text-gray-400"
            }`}
            onClick={() => setTimeframe("1m")}
            variant="ghost"
          >
            1m
          </Button>
          <Button
            className={`px-4 py-2 font-medium rounded-full ${
              timeframe === "5m"
                ? "bg-gmgn-gray-700 text-white"
                : "bg-gmgn-gray-800 text-gray-400"
            }`}
            onClick={() => setTimeframe("5m")}
            variant="ghost"
          >
            5m
          </Button>
          <Button
            className={`px-4 py-2 font-medium rounded-full ${
              timeframe === "1h"
                ? "bg-gmgn-gray-700 text-white"
                : "bg-gmgn-gray-800 text-gray-400"
            }`}
            onClick={() => setTimeframe("1h")}
            variant="ghost"
          >
            1h
          </Button>
          <Button
            className={`px-4 py-2 font-medium rounded-full ${
              timeframe === "24h"
                ? "bg-gmgn-gray-700 text-white"
                : "bg-gmgn-gray-800 text-gray-400"
            }`}
            onClick={() => setTimeframe("24h")}
            variant="ghost"
          >
            24h
          </Button>
        </div>

        <div className="h-80 bg-gmgn-gray-900 rounded-lg mb-6 relative flex items-center justify-center">
          <MiniCandlestickChart ohlcData={ohlcData} />
        </div>

        {token.warnings && (
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">PUMP Pool info</h3>
            <div className="bg-gmgn-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total liq</span>
                <span className="text-white">
                  ${token.totalLiquidity?.toFixed(2)} (
                  {token.totalLiquidity
                    ? (token.totalLiquidity * 0.0028).toFixed(2)
                    : "0"}{" "}
                  SOL)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Market cap</span>
                <span className="text-white">
                  ${token.marketCap?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Holders</span>
                <span className="text-white">{token.holders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total supply</span>
                <span className="text-white">{token.totalSupply}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pool created</span>
                <span className="text-white">{token.poolCreated}</span>
              </div>
            </div>

            <h3 className="text-xl font-medium mt-6 mb-2">Degen Audit</h3>
            <div className="bg-gmgn-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">NoMint</span>
                <div className="flex items-center">
                  <span className="text-white mr-1">Yes</span>
                  <svg
                    className="w-5 h-5 text-gmgn-green"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Blacklist</span>
                <div className="flex items-center">
                  <span className="text-white mr-1">No</span>
                  <svg
                    className="w-5 h-5 text-gmgn-green"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Burnt</span>
                <div className="flex items-center">
                  <span className="text-white mr-1">Yes</span>
                  <svg
                    className="w-5 h-5 text-gmgn-green"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Top 10</span>
                <div className="flex items-center">
                  <span className="text-white mr-1">
                    {token.warnings.topHolders}
                  </span>
                  <svg
                    className="w-5 h-5 text-gmgn-green"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto border-t border-gmgn-gray-800">
        <div className="flex">
          <button
            className={`flex-1 p-4 text-center ${
              tab === "activity" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setTab("activity")}
          >
            Activity
          </button>
          <button
            className={`flex-1 p-4 text-center ${
              tab === "liquidity" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setTab("liquidity")}
          >
            Liquidity
          </button>
          <button
            className={`flex-1 p-4 text-center ${
              tab === "traders" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setTab("traders")}
          >
            Traders
          </button>
          <button
            className={`flex-1 p-4 text-center ${
              tab === "holders" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setTab("holders")}
          >
            Holders
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex border-t border-gmgn-gray-800 bg-gmgn-bg">
        <button className="flex-1 p-4 text-center">
          <div className="flex flex-col items-center">
            <svg
              className="w-6 h-6 text-gmgn-green"
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
            <span className="text-gray-300 text-sm mt-1">Buy</span>
          </div>
        </button>
        <button className="flex-1 p-4 text-center">
          <div className="flex flex-col items-center">
            <svg
              className="w-6 h-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H4m0 0l6-6m-6 6l6 6"
              />
            </svg>
            <span className="text-gray-300 text-sm mt-1">Sell</span>
          </div>
        </button>
        <button className="flex-1 p-4 text-center">
          <div className="flex flex-col items-center">
            <svg
              className="w-6 h-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-gray-300 text-sm mt-1">Info</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TokenDetail;
