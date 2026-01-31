import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function FloatingCart() {
  const { cart, total } = useCart();

  if (!cart.length) return null;

  return (
    <Link
      to="/cart"
      className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-3 animate-bounce"
    >
      🛒 {cart.length} Items • ₹{total}
    </Link>
  );
}
