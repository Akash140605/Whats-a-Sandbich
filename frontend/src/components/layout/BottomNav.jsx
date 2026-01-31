import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function BottomNav() {
  const { cart } = useCart();
  const totalItems = cart.length;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-[0_-4px_15px_rgba(0,0,0,0.08)] md:hidden">
      <div className="grid grid-cols-3 py-2">

        <NavItem to="/" icon={<Home size={22} />} label="Home" />

        <NavItem to="/menu" icon={<ShoppingBag size={22} />} label="Menu" />

        {/* CART WITH LIVE BADGE */}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative flex flex-col items-center gap-1 text-[11px] font-semibold transition-all
            ${isActive ? "text-red-600 scale-110" : "text-gray-500 hover:text-red-500"}`
          }
        >
          <div className="relative">
            <ShoppingCart size={24} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-pulse">
                {totalItems}
              </span>
            )}
          </div>
          <span>Cart</span>
        </NavLink>

      </div>
    </div>
  );
}

/* NAV ITEM */
function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 text-[11px] font-semibold transition-all
        ${isActive ? "text-red-600 scale-110" : "text-gray-500 hover:text-red-500"}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
