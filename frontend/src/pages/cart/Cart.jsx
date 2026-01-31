import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, addItem, removeItem, total } = useCart();
  const navigate = useNavigate();

  const delivery = total > 299 ? 0 : 40;
  const tax = Math.round(total * 0.05);
  const grandTotal = total + delivery + tax;

  if (!cart.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center pb-24">
        <h2 className="text-2xl font-extrabold text-gray-800">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mt-2 max-w-sm">
          Add delicious items from our menu and enjoy premium sandwiches & fast food.
        </p>
        <Link
          to="/menu"
          className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-[140px]">
      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Your Cart
            </h2>
            <p className="text-sm text-gray-500">
              Review your items before checkout
            </p>
          </div>
          <Link
            to="/menu"
            className="text-red-600 font-semibold hover:underline"
          >
            + Add Items
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <CartItem
                key={item.id + item.size}
                item={item}
                addItem={addItem}
                removeItem={removeItem}
              />
            ))}
          </div>

          {/* DESKTOP BILL */}
          <div className="hidden lg:block bg-white border rounded-lg shadow p-6 h-fit sticky top-24">

            <h3 className="font-extrabold text-lg mb-4">
              Bill Summary
            </h3>

            <div className="space-y-2 text-sm text-gray-600">
              <Row label="Item Total" value={`₹${total}`} />
              <Row label="Delivery" value={delivery ? `₹${delivery}` : "FREE"} green={!delivery} />
              <Row label="Tax (5%)" value={`₹${tax}`} />
            </div>

            <div className="border-t my-4"></div>

            <div className="flex justify-between font-extrabold text-xl">
              <span>Total</span>
              <span className="text-red-600">₹{grandTotal}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow transition"
            >
              Proceed to Checkout
            </button>

          </div>

        </div>
      </div>

      {/* MOBILE CHECKOUT BAR (SAFE ABOVE BOTTOM NAV) */}
      <div className="lg:hidden fixed bottom-[56px] left-0 right-0 bg-white border-t shadow-xl p-4 flex justify-between items-center z-40">

        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-extrabold text-gray-900">
            ₹{grandTotal}
          </p>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
        >
          Checkout
        </button>
      </div>

    </div>
  );
}

/* CART ITEM */
function CartItem({ item, addItem, removeItem }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow transition p-3 sm:p-4 flex gap-3 items-center">

      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 truncate">
          {item.name}
        </h3>

        {item.size && (
          <p className="text-xs text-gray-500">
            Size: {item.size}
          </p>
        )}

        <p className="text-sm text-gray-600 mt-1">
          ₹{item.price} × {item.qty}
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <button
          onClick={() => addItem(item)}
          className="w-8 h-8 bg-red-600 text-white rounded-md font-bold hover:bg-red-700 transition"
        >
          +
        </button>

        <span className="font-semibold">
          {item.qty}
        </span>

        <button
          onClick={() => removeItem(item.id, item.size)}
          className="w-8 h-8 border border-gray-300 rounded-md font-bold hover:bg-gray-100 transition"
        >
          −
        </button>
      </div>

    </div>
  );
}

/* ROW */
function Row({ label, value, green }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={`${green ? "text-green-600 font-semibold" : "font-semibold"}`}>
        {value}
      </span>
    </div>
  );
}
