import React from "react";

const MyWalletPage: React.FC = () => {
  // Placeholder/mock data
  const user = {
    avatar: "/placeholder.svg",
    address: "0x4CDMr...BDr",
    username: "4CDMrp",
    twitter: false,
    balances: [
      { symbol: "SOL", amount: 12.34, usd: 2200 },
      { symbol: "USDC", amount: 500, usd: 500 },
    ],
    recentActivity: [
      { type: "Buy", asset: "SOL", amount: 2, date: "2024-05-25" },
      { type: "Sell", asset: "USDC", amount: 100, date: "2024-05-24" },
    ],
  };

  return (
    <>
      <div className="p-6 max-w-2xl mx-auto text-white">
        <div className="flex items-center mb-6">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <div className="text-xl font-bold">{user.username}</div>
            <div className="text-gray-400 text-sm">{user.address}</div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Balances</h2>
          <div className="bg-gmgn-gray-900 rounded-lg p-4 flex flex-col gap-2">
            {user.balances.map((bal) => (
              <div key={bal.symbol} className="flex justify-between">
                <span>{bal.symbol}</span>
                <span>
                  {bal.amount} (${bal.usd})
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <div className="bg-gmgn-gray-900 rounded-lg p-4 flex flex-col gap-2">
            {user.recentActivity.map((act, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>
                  {act.type} {act.asset}
                </span>
                <span>
                  {act.amount} on {act.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyWalletPage;
