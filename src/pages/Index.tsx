import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import NavTabs from "@/components/navigation/NavTabs";
import TimeFilter from "@/components/navigation/TimeFilter";
import TokenRow from "@/components/tokens/TokenRow";
import TokenDetail from "@/components/tokens/TokenDetail";
import LoginModal from "@/components/auth/LoginModal";
import { useNavigate } from "react-router-dom";

// Sample data
const mockTabs = [
  { label: "Trenches", path: "/trenches" },
  { label: "New", path: "/new" },
  { label: "Trending", path: "/trending" },
  { label: "CopyTrade", path: "/copytrade" },
  { label: "SnipeX", path: "/snipex" },
  { label: "Monitor", path: "/monitor" },
];

const mockTimeOptions = [
  { label: "1m", value: "1m" },
  { label: "5m", value: "5m" },
  { label: "1h", value: "1h" },
  { label: "6h", value: "6h" },
  { label: "24h", value: "24h" },
];

const DASHBOARD_API_URL =
  "https://682fe7f8f504aa3c70f599c3.mockapi.io/api/web3gmgn/dashboardData";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("/trending");
  const [activeTimeFilter, setActiveTimeFilter] = useState("1h");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);

  // NEW: Dashboard data state
  const [dashboardData, setDashboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(DASHBOARD_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
      });
  }, []);

  // Map API tokens to TokenRow props
  const allTokens = dashboardData.flatMap((d) =>
    (d.cryptoAssets || []).map((token: any) => ({
      id: token.id,
      name: token.name,
      symbol: token.symbol,
      image: "/placeholder.svg", // or token.image if available
      address: token.address || undefined, // if available
      timeSinceLaunch: token.timeSinceLaunch || undefined, // if available
      liq: token.liquidityPoolInfo?.poolValueUSD,
      mc: token.marketCapUSD,
      trending: token.change24hPercentage > 0,
      verified: false, // set true if you have a way to determine
      special: false, // set true if you have a way to determine
    }))
  );

  const selectedToken = allTokens.find((token) => token.id === selectedTokenId);

  const handleTokenSelect = (id: string) => {
    setSelectedTokenId(id);
  };

  const handleBackToList = () => {
    setSelectedTokenId(null);
  };

  // Show loading state if needed
  if (loading) {
    return <div className="text-center text-white">Loading dashboard...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gmgn-bg text-white">
      <div className="flex items-center justify-between px-4 py-2">
        <button
          className="p-2 rounded-full bg-gmgn-gray-800 hover:bg-gmgn-gray-700 mr-2"
          onClick={() => navigate("/")}
          aria-label="Home"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 12l9-9 9 9" stroke="#fff" strokeWidth="2" fill="none" />
            <path d="M9 21V9h6v12" stroke="#fff" strokeWidth="2" fill="none" />
          </svg>
        </button>
        <button
          className="p-2 rounded-full bg-gmgn-gray-800 hover:bg-gmgn-gray-700 ml-auto"
          onClick={() => navigate("/wallet")}
          aria-label="My Wallet"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect
              x="2"
              y="7"
              width="20"
              height="14"
              rx="3"
              fill="#222"
              stroke="#fff"
            />
            <circle cx="18" cy="14" r="2" fill="#4ade80" />
          </svg>
        </button>
      </div>
      <NavTabs tabs={mockTabs} activeTab={activeTab} />

      {!selectedToken ? (
        <>
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">Trending</h2>
              <div className="flex items-center ml-4 text-gray-400">
                <span className="text-sm">NextBC</span>
              </div>
            </div>
          </div>

          <TimeFilter
            options={mockTimeOptions}
            activeTime={activeTimeFilter}
            onChange={setActiveTimeFilter}
          />

          <div className="flex items-center justify-between px-4 py-3 bg-gmgn-bg">
            <button className="flex items-center bg-gmgn-gray-800 rounded-lg px-3 py-1.5 text-gray-400">
              <svg
                className="w-5 h-5 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Devs
            </button>

            <div className="flex items-center">
              <button className="flex items-center bg-gmgn-gray-800 rounded-lg px-3 py-1.5 text-gray-400 mr-2">
                <svg
                  className="w-5 h-5 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </button>

              <button className="flex items-center bg-gmgn-gray-800 rounded-lg px-3 py-1.5 text-gray-300">
                P1
                <svg
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-between px-4 py-2 border-b border-gmgn-gray-800">
            <div className="flex items-center">
              <span className="text-gray-400">Token</span>
              <svg
                className="w-4 h-4 ml-1 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="flex items-center">
              <span className="text-gray-400 mr-1">Liq</span>
              <svg
                className="w-4 h-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>

              <span className="text-gray-400 mx-1">/</span>

              <span className="text-gray-400 mr-1">Initial</span>
              <svg
                className="w-4 h-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {allTokens.map((token) => (
              <TokenRow
                key={token.id}
                token={token}
                onSelect={handleTokenSelect}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col flex-1">
          <button
            className="flex items-center px-4 py-3 text-white"
            onClick={handleBackToList}
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Email Verification Code</span>
          </button>

          <TokenDetail
            token={{
              id: selectedToken.id,
              name: selectedToken.name,
              symbol: selectedToken.symbol,
              image: selectedToken.image,
              price:
                dashboardData
                  .flatMap((d) => d.cryptoAssets)
                  .find((t: any) => t.id === selectedToken.id)
                  ?.currentPriceUSD || 0,
              priceChange:
                dashboardData
                  .flatMap((d) => d.cryptoAssets)
                  .find((t: any) => t.id === selectedToken.id)
                  ?.change24hPercentage || 0,
              marketCap: selectedToken.mc,
              totalLiquidity: selectedToken.liq,
              holders: undefined,
              totalSupply: undefined,
              poolCreated: undefined,
              warnings: selectedToken.trending ? { noMint: true } : undefined,
            }}
          />
        </div>
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default Index;
