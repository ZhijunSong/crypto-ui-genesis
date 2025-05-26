import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TokenDetail from "@/components/tokens/TokenDetail";

const CRYPTO_API_URL =
  "https://682fe7f8f504aa3c70f599c3.mockapi.io/api/web3gmgn/cryptocurrencies";

const TokenDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [token, setToken] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(CRYPTO_API_URL)
      .then((r) => r.json())
      .then((data) => {
        // Find by name (case-insensitive) or id
        const found = data.find(
          (t: any) =>
            t.name?.toLowerCase() === slug?.toLowerCase() || t.id === slug
        );
        setToken(found);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return <div className="p-8 text-center text-gray-400">Loading...</div>;
  if (!token)
    return <div className="p-8 text-center text-red-400">Token not found</div>;

  // Map API fields to TokenDetail props
  const tokenProps = {
    id: token.id,
    name: token.name,
    symbol: token.symbol,
    image: token.image || "/placeholder.svg",
    price: token.currentPriceUSD,
    priceChange: token.change24hPercentage,
    marketCap: token.marketCapUSD,
    totalLiquidity: token.liquidityPoolInfo?.poolValueUSD,
    holders: token.holders,
    totalSupply: token.totalSupply,
    poolCreated: token.poolCreated,
    warnings: token.warnings,
  };

  return <TokenDetail token={tokenProps} />;
};

export default TokenDetailPage;
