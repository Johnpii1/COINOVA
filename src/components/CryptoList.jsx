import { useEffect, useState } from "react";
import { getCryptoMarkets } from "../api";

export default function CryptoList() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
  async function loadCoins() {
    try {
      const data = await getCryptoMarkets();
      setCoins(data);
    } catch (err) {
      setError("Unable to load crypto prices.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Load immediately
  loadCoins();

  // Update every 30 seconds
  const interval = setInterval(() => {
    loadCoins();
  }, 30000);

  // Clean up when component is removed
  return () => clearInterval(interval);
}, []);


  if (loading) {
    return <p className="text-white">Loading crypto prices...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  return (
    <section className="px-8 py-12">
      <h2 className="mb-8 text-3xl font-bold text-black">
        Crypto Market
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center gap-3">
              <img
                src={coin.image}
                alt={coin.name}
                className="h-10 w-10"
              />

              <div>
                <h3 className="font-semibold text-white">
                  {coin.name}
                </h3>

                <p className="text-sm uppercase text-gray-400">
                  {coin.symbol}
                </p>
              </div>
            </div>

            {/* REAL CURRENT PRICE */}
            <p className="mt-5 text-2xl font-bold text-black">
              ${coin.current_price.toLocaleString("en-US")}
            </p>

            {/* 24 HOUR CHANGE */}
            <p
              className={
                coin.price_change_percentage_24h >= 0
                  ? "mt-2 text-green-400"
                  : "mt-2 text-red-400"
              }
            >
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}