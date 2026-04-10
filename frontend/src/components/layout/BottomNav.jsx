import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";
import { useMemo } from "react";
import { useCart } from "../../context/CartContext";

export default function BottomNav() {
  const { cart } = useCart();

  // Better than cart.length: total quantity
  const totalItems = useMemo(() => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((sum, item) => sum + (Number(item?.qty) || 1), 0);
  }, [cart]);

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-xl border-t border-black/5 shadow-[0_-10px_30px_rgba(0,0,0,0.10)] md:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)", // safe-area support [web:41]
      }}
    >
      <div className="grid grid-cols-3 py-2">
        <NavItem to="/" icon={<Home size={22} />} label="Home" />
        <NavItem to="/menu" icon={<ShoppingBag size={22} />} label="Menu" />
        <NavItem
          to="/cart"
          icon={<ShoppingCart size={24} />}
          label="Cart"
          badge={totalItems}
        />
      </div>
    </nav>
  );
}

function NavItem({ to, icon, label, badge = 0 }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "relative flex flex-col items-center justify-center gap-1",
          "min-h-[52px] py-2", // better touch target
          "text-[11px] font-semibold transition-all select-none",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/25",
          isActive ? "text-red-600" : "text-gray-600 hover:text-red-500",
        ].join(" ")
      }
    >
      <div className="relative">
        {icon}

        {badge > 0 && (
          <span
            className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold min-w-5 h-5 px-1 flex items-center justify-center rounded-full shadow-md"
            aria-label={`${badge} items in cart`}
          >
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </div>

      <span>{label}</span>
    </NavLink>
  );
}
