import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-[100] bg-white px-8 py-3">
      <div className="flex items-center justify-between gap-7 rounded-2xl border border-gray-200 bg-white px-6 py-2 shadow-sm">

        {/* LOGO */}
        <Link to="/">
          <img
            src="/logo (3).png"
            alt="Coinova"
            className="h-16 w-auto cursor-pointer object-contain"
          />
        </Link>

        <h2 className="text-black">
          my name
        </h2>

      </div>
    </nav>
  );
}