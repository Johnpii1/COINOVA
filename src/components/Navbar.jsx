import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-[100] border-b border-gray-800 bg-[#0b1220]">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo (3).png"
            alt="Coinova"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* NAVIGATION */}
        <div className="hidden items-center gap-8 lg:flex">

          <Link
            to="/"
            className="font-semibold text-white transition hover:text-blue-400"
          >
            Cryptocurrencies
          </Link>

          <Link
            to="/"
            className="font-semibold text-gray-300 transition hover:text-white"
          >
            Markets
          </Link>

          <Link
            to="/"
            className="font-semibold text-gray-300 transition hover:text-white"
          >
            Exchanges
          </Link>

          <Link
            to="/"
            className="font-semibold text-gray-300 transition hover:text-white"
          >
            Watchlist
          </Link>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* SEARCH */}
          <div className="hidden items-center rounded-xl border border-gray-700 bg-[#1a2235] px-4 py-2 md:flex">
            <span className="mr-2 text-gray-400">⌕</span>

            <input
              type="text"
              placeholder="Search"
              className="w-32 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />

            <span className="ml-3 rounded bg-gray-700 px-2 py-1 text-xs text-gray-400">
              /
            </span>
          </div>

          {/* LOGIN */}
          <button className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-500">
            Login
          </button>

          {/* MENU */}
          <button className="rounded-xl border border-gray-700 bg-[#1a2235] px-3 py-2 text-xl text-white">
            ☰
          </button>

        </div>
      </div>
    </nav>
  );
}