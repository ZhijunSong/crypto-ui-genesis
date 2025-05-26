import React from "react";

const mockTrends = [
  {
    name: "dwns",
    description: "dog wif no spine",
    address: "57wtZ...ump",
    avatar: "",
    volume: "$1.1K",
    marketCap: "$5.9K",
    percent: "+17.1%",
    holders: 3,
    tx: 6,
    badges: ["100%"],
    time: "4s",
  },
  {
    name: "FRGNT",
    description: "Froggernaut",
    address: "G5E7u...oon",
    avatar: "",
    volume: "$297.2",
    marketCap: "$5.4K",
    percent: "+10.9%",
    holders: 2,
    tx: 2,
    badges: [],
    time: "13s",
  },
  {
    name: "Dge",
    description: "The O is Missing",
    address: "6fzxc...ump",
    avatar: "",
    volume: "$752.3",
    marketCap: "$5.6K",
    percent: "+8.4%",
    holders: 1,
    tx: 5,
    badges: ["100%"],
    time: "13s",
  },
];

const TrendsPage: React.FC = () => {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Trending Web3 Coins</h1>
      <div className="space-y-4">
        {mockTrends.map((coin, i) => (
          <div
            key={i}
            className="flex items-center bg-gmgn-gray-900 rounded-lg p-4 gap-4 shadow"
          >
            {/* Avatar or graybox */}
            <div className="w-16 h-16 rounded-full bg-gmgn-gray-800 flex items-center justify-center overflow-hidden">
              {coin.avatar ? (
                <img
                  src={coin.avatar}
                  alt={coin.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-700 rounded-full" />
              )}
            </div>
            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white">
                  {coin.name}
                </span>
                <span className="text-gray-400">{coin.description}</span>
              </div>
              <div className="text-xs text-gray-500 mb-1">{coin.address}</div>
              <div className="flex gap-4 text-sm">
                <span>
                  V <span className="font-semibold">{coin.volume}</span>
                </span>
                <span>
                  MC <span className="font-semibold">{coin.marketCap}</span>
                </span>
                <span className="text-green-400">{coin.percent}</span>
                <span className="text-gray-400">👥 {coin.holders}</span>
                <span className="text-gray-400">TX {coin.tx}</span>
                {coin.badges.map((b, j) => (
                  <span
                    key={j}
                    className="ml-2 px-2 py-0.5 rounded bg-red-900 text-red-400 text-xs font-bold"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
            {/* Status icon */}
            <div>
              <button className="p-2 rounded-full bg-gmgn-gray-800">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path
                    d="M8 12l2 2 4-4"
                    stroke="#4ade80"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendsPage;
