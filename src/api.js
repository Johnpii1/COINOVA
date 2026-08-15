const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

export async function getCryptoMarkets() {
  const url = new URL(API_URL);

  url.searchParams.set("vs_currency", "usd");
  url.searchParams.set("order", "market_cap_desc");
  url.searchParams.set("per_page", "10");
  url.searchParams.set("page", "1");
  url.searchParams.set("sparkline", "false");

  const response = await fetch(url, {
    headers: {
      "x-cg-demo-api-key":
        process.env.REACT_APP_COINGECKO_API_KEY,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || `API request failed: ${response.status}`
    );
  }

  return response.json();
}