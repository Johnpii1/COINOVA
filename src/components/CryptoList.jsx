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
        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to load crypto prices.");
      } finally {
        setLoading(false);
      }
    }

    // Load immediately
    loadCoins();

    // Update every 30 seconds
    const interval = setInterval(loadCoins, 30000);

    // Clean up
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-12 md:px-8">
        <p className="text-gray-500">Loading crypto prices...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-12 md:px-8">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section id="crypto-market" className="px-3 py-12 sm:px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Cryptocurrency
          </h2>

          <p className="mt-2 text-sm text-white">
            Live cryptocurrency prices and market data
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl   bg-[#1a2235] shadow-sm">
          {/* ================= DESKTOP ================= */}
          <div className="hidden md:block">
            <table className="w-full text-left">
              <thead className="border-b border-gray-200 bg-[#1a2235]">
                <tr className="text-sm text-white">
                  <th className="px-5 py-4">#</th>

                  <th className="px-5 py-4">Name</th>

                  <th className="px-5 py-4">Price</th>

                  <th className="px-5 py-4">1h %</th>

                  <th className="px-5 py-4">24h %</th>

                  <th className="px-5 py-4">7d %</th>

                  <th className="px-5 py-4">Market Cap</th>

                  <th className="px-5 py-4">Volume (24h)</th>
                </tr>
              </thead>

              <tbody>
                {coins.map((coin, index) => (
                  <tr
                    key={coin.id}
                    className="border-b border-gray-100 transition hover:bg-gray-900 rounded-lg"
                  >
                    {/* NUMBER */}
                    <td className="px-5 py-5 text-sm text-white">
                      {index + 1}
                    </td>

                    {/* NAME */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="h-9 w-9"
                        />

                        <div>
                          <p className="font-semibold text-white">
                            {coin.name}
                          </p>

                          <p className="text-xs uppercase text-gray-400">
                            {coin.symbol}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* PRICE */}
                    <td className="px-5 py-5 font-semibold text-white/70">
                      $
                      {coin.current_price?.toLocaleString("en-US", {
                        maximumFractionDigits: 8,
                      })}
                    </td>

                    {/* 1H */}
                    <td className="px-5 py-5">
                      <Change
                        value={coin.price_change_percentage_1h_in_currency}
                      />
                    </td>

                    {/* 24H */}
                    <td className="px-5 py-5">
                      <Change value={coin.price_change_percentage_24h} />
                    </td>

                    {/* 7D */}
                    <td className="px-5 py-5">
                      <Change
                        value={coin.price_change_percentage_7d_in_currency}
                      />
                    </td>

                    {/* MARKET CAP */}
                    <td className="px-5 py-5 font-medium text-white/70">
                      ${coin.market_cap?.toLocaleString("en-US")}
                    </td>

                    {/* VOLUME */}
                    <td className="px-5 py-5 font-medium text-white/70">
                      ${coin.total_volume?.toLocaleString("en-US")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE ================= */}
          <div className="block overflow-x-hidden md:hidden">
            <table className="w-full table-fixed text-left">
              <thead className="border-b  bg-[#1a2235]">
                <tr className="text-xs text-white">
                  <th className="w-[8%] px-2 py-4">#</th>

                  <th className="w-[34%] px-2 py-4">Name</th>

                  <th className="w-[30%] px-2 py-4">Price</th>

                  <th className="w-[28%] px-2 py-4">24h %</th>
                </tr>
              </thead>

              <tbody>
                {coins.map((coin, index) => (
                  <tr key={coin.id} className="border-b border-gray-100">
                    {/* NUMBER */}
                    <td className="px-2 py-4 text-xs text-gray-400">
                      {index + 1}
                    </td>

                    {/* NAME */}
                    <td className="px-2 py-4">
                      <div className="flex min-w-0 items-center gap-2">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="h-7 w-7 shrink-0"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-white/70 sm:text-sm">
                            {coin.name}
                          </p>

                          <p className="text-[10px] uppercase text-white/70">
                            {coin.symbol}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* PRICE */}
                    <td className="truncate px-2 py-4 text-xs font-semibold text-white/70 sm:text-sm">
                      $
                      {coin.current_price?.toLocaleString("en-US", {
                        maximumFractionDigits: 6,
                      })}
                    </td>

                    {/* 24H */}
                    <td className="px-2 py-4">
                      <Change value={coin.price_change_percentage_24h} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CHANGE ================= */

function Change({ value }) {
  if (value === null || value === undefined) {
    return <span className="text-xs text-gray-400">—</span>;
  }

  const positive = value >= 0;

  return (
    <span
      className={
        positive
          ? "whitespace-nowrap text-xs font-medium text-green-500 sm:text-sm"
          : "whitespace-nowrap text-xs font-medium text-red-500 sm:text-sm"
      }
    >
      {positive ? "▲" : "▼"} {Math.abs(value).toFixed(2)}%
    </span>
  );
}
