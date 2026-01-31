import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* RESPONSIVE BRAND */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-red-600 to-pink-600 text-white font-extrabold flex items-center justify-center rounded-lg shadow">
            W
          </div>

          <div className="leading-tight">
            <span className="block text-lg sm:text-xl font-extrabold tracking-tight text-gray-900">
              What’s A Sandwich
            </span>
            <span className="block text-[11px] text-red-600 -mt-1 tracking-wide">
              Greater Noida
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-gray-700">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/menu" className={navClass}>
            Menu
          </NavLink>

          {/* CART */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            <FiShoppingCart />
            <span>Cart</span>

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold px-2 py-0.5 rounded-full shadow animate-pulse">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-2xl text-gray-800"
        >
          <FiMenu />
        </button>
      </nav>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-red-600 to-pink-600 text-white font-extrabold flex items-center justify-center rounded-lg">
              W
            </div>
            <div>
              <p className="font-extrabold text-gray-900 leading-tight">
                What’s A Sandwich
              </p>
              <p className="text-xs text-red-600 -mt-0.5">Greater Noida</p>
            </div>
          </div>

          <button onClick={() => setOpen(false)} className="text-2xl">
            <FiX />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-3 font-semibold text-gray-700">
          <NavLink
            onClick={() => setOpen(false)}
            to="/"
            className={mobileClass}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/menu"
            className={mobileClass}
          >
            Menu
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to="/cart"
            className="flex items-center justify-between bg-red-600 text-white py-3 px-4 rounded-lg shadow"
          >
            <span className="flex items-center gap-2">
              <FiShoppingCart /> Cart
            </span>
            <span className="bg-white text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

/* ACTIVE LINK STYLE */
const navClass = ({ isActive }) =>
  `hover:text-red-600 transition ${
    isActive ? "text-red-600 border-b-2 border-red-600" : ""
  }`;

const mobileClass = ({ isActive }) =>
  `py-3 px-4 rounded-lg hover:bg-gray-100 transition ${
    isActive ? "bg-gray-100 text-red-600" : ""
  }`;
