import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCryptoMarkets } from "../api";

export default function Hero() {
  const [bitcoin, setBitcoin] = useState(null);

  useEffect(() => {
    async function loadBitcoin() {
      try {
        const data = await getCryptoMarkets();

        const btc = data.find((coin) => coin.id === "bitcoin");

        setBitcoin(btc);
      } catch (error) {
        console.error("Failed to load Bitcoin price:", error);
      }
    }

    loadBitcoin();

    // Update every 30 seconds
    const interval = setInterval(loadBitcoin, 30000);

    return () => clearInterval(interval);
  }, []);


  const words = ["Easy.", "Fast.", "Simple.", "Smart.", "Powerful."];

const [currentWord, setCurrentWord] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentWord((prev) => (prev + 1) % words.length);
  }, 2000);

  return () => clearInterval(interval);
}, []);

  return (
   <section className="relative min-h-screen overflow-hidden bg-transparent px-8 pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 py-20 lg:grid-cols-2">
        {/* LEFT */}
        <div>
          <p className="mb-5 inline-block rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
            🚀 REAL-TIME CRYPTO MARKET
          </p>

         <h1 className="max-w-3xl text-5xl font-bold leading-tight text-black md:text-6xl lg:text-7xl">
  Crypto Made
  <span
    key={currentWord}
    className="block animate-pulse text-blue-600"
  >
    {words[currentWord]}
  </span>
</h1>

<p className="mt-6 max-w-xl text-lg leading-8 text-gray-500">
  Track real-time crypto prices, discover market trends, and stay
  updated with fast, simple, and reliable market data.
</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/"
              className="rounded-xl bg-black px-7 py-3.5 font-semibold text-white transition hover:bg-gray-800"
            >
              Explore Market →
            </Link>

            <a
              href="#crypto-market"
              className="rounded-xl border border-gray-200 px-7 py-3.5 font-semibold text-black transition hover:bg-gray-100"
            >
              View Prices
            </a>
          </div>
        </div>

        {/* RIGHT - BITCOIN CARD */}
        <div className="relative">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {bitcoin && (
                  <img
                    src={bitcoin.image}
                    alt={bitcoin.name}
                    className="h-12 w-12"
                  />
                )}

                <div>
                  <p className="font-bold text-black">Bitcoin</p>

                  <p className="text-sm uppercase text-gray-400">BTC</p>
                </div>
              </div>

              {bitcoin && (
                <span
                  className={
                    bitcoin.price_change_percentage_24h >= 0
                      ? "rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-500"
                      : "rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-500"
                  }
                >
                  {bitcoin.price_change_percentage_24h >= 0 ? "+" : ""}
                  {bitcoin.price_change_percentage_24h.toFixed(2)}%
                </span>
              )}
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-400">Current Price</p>

              <h2 className="mt-1 text-4xl font-bold text-black">
                {bitcoin
                  ? `$${bitcoin.current_price.toLocaleString("en-US")}`
                  : "Loading..."}
              </h2>
              {/* Floating Ethereum Card */}
              <div className="absolute -bottom-14 -left-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-xl">
                    ◆
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-black">Ethereum</p>

                    <p className="text-sm text-gray-500">ETH</p>
                  </div>

                  <span className="text-sm font-medium text-green-500">
                    +1.20%
                  </span>
                </div>
              </div>
            </div>

            {/* Chart decoration */}
            <div className="mt-8 flex h-32 items-end gap-2">
              <div className="h-[35%] w-full rounded-t bg-blue-100" />
              <div className="h-[50%] w-full rounded-t bg-blue-200" />
              <div className="h-[40%] w-full rounded-t bg-blue-200" />
              <div className="h-[65%] w-full rounded-t bg-blue-300" />
              <div className="h-[55%] w-full rounded-t bg-blue-300" />
              <div className="h-[75%] w-full rounded-t bg-blue-400" />
              <div className="h-[90%] w-full rounded-t bg-blue-500" />
            </div>

            <div className="mt-4 flex justify-between text-xs text-gray-400">
              <span>24H</span>
              <span>7D</span>
              <span>30D</span>
              <span>1Y</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
