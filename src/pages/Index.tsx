
import React, { useState } from "react";
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

const mockTokens = [
  {
    id: "1",
    name: "ITRUMP",
    symbol: "DzoDr...ump",
    image: "/placeholder.svg",
    price: 1.5,
    priceChange: 5.8,
    volume: "$1.5M",
    timeStamp: "14h",
  },
  {
    id: "2",
    name: "PIPE",
    symbol: "3T721...ump",
    image: "/placeholder.svg",
    price: 0.15,
    priceChange: 11.6,
    volume: "$152.5K",
    timeStamp: "87d",
    verified: true,
    special: true,
  },
  {
    id: "3",
    name: "ASSETS",
    symbol: "r1PVE...fug",
    image: "/placeholder.svg",
    price: 0.08,
    priceChange: -2.3,
    volume: "$80.3K",
    timeStamp: "2d",
  },
  {
    id: "4",
    name: "PEPEPO",
    symbol: "7Z9A8...ump",
    image: "/placeholder.svg",
    price: 1.4,
    priceChange: 8.2,
    volume: "$1.4M",
    timeStamp: "10h",
  },
  {
    id: "5",
    name: "Elias",
    symbol: "Fdzuw...ump",
    image: "/placeholder.svg",
    price: 0.12,
    priceChange: 15.3,
    volume: "$121.8K",
    timeStamp: "54m",
  },
  {
    id: "6",
    name: "retard",
    symbol: "AKSKK...ump",
    image: "/placeholder.svg",
    price: 0.04,
    priceChange: -1.2,
    volume: "$39.3",
    timeStamp: "1h",
    warning: true,
  },
  {
    id: "7",
    name: "TAG",
    symbol: "FB3cs...Tgw",
    image: "/placeholder.svg",
    price: 1.7,
    priceChange: 22.5,
    volume: "$1.7M",
    timeStamp: "1h",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("/trending");
  const [activeTimeFilter, setActiveTimeFilter] = useState("1h");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);
  
  const selectedToken = mockTokens.find(token => token.id === selectedTokenId);

  const handleTokenSelect = (id: string) => {
    setSelectedTokenId(id);
  };

  const handleBackToList = () => {
    setSelectedTokenId(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gmgn-bg text-white">
      <Header />
      
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
              <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Devs
            </button>
            
            <div className="flex items-center">
              <button className="flex items-center bg-gmgn-gray-800 rounded-lg px-3 py-1.5 text-gray-400 mr-2">
                <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
              </button>
              
              <button className="flex items-center bg-gmgn-gray-800 rounded-lg px-3 py-1.5 text-gray-300">
                P1
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex justify-between px-4 py-2 border-b border-gmgn-gray-800">
            <div className="flex items-center">
              <span className="text-gray-400">Token</span>
              <svg className="w-4 h-4 ml-1 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div className="flex items-center">
              <span className="text-gray-400 mr-1">Liq</span>
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
              
              <span className="text-gray-400 mx-1">/</span>
              
              <span className="text-gray-400 mr-1">Initial</span>
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {mockTokens.map(token => (
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
          
          <TokenDetail token={{
            ...selectedToken,
            marketCap: 5418.68,
            totalLiquidity: 472.55,
            holders: 3,
            totalSupply: "1B",
            poolCreated: "05/22/2025 14:47",
            warnings: {
              noMint: true,
              blacklist: false,
              burnt: true,
              topHolders: "5%"
            }
          }} />
        </div>
      )}
      
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
};

export default Index;
