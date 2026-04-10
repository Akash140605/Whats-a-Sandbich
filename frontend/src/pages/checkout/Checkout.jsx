import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { FiAlertCircle } from "react-icons/fi";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    instructions: "",
  });

  const [loading, setLoading] = useState(false);

  const MINIMUM_ORDER = 150;

  // Theme palette
  const Y1 = "#FFF6C9";
  const Y2 = "#FAD945";
  const Y3 = "#FBD536";
  const R1 = "#C03327";
  const R2 = "#7E2A17";

  const placeOrder = () => {
    if (!cart.length) return alert("Your cart is empty");

    if (total < MINIMUM_ORDER) {
      return alert(
        `Minimum order amount is ₹${MINIMUM_ORDER}. Please add items worth ₹${
          MINIMUM_ORDER - total
        } more.`
      );
    }

    if (!form.name || !form.phone || !form.address) {
      return alert("Please fill all required details");
    }

    setLoading(true);

    const orderItems = cart
      .map((item, i) => `${i + 1}. ${item.name} × ${item.qty} = ₹${item.price * item.qty}`)
      .join("%0A");

    const message = `*New Order - What's A Sandwich®*%0A%0A
*Customer Details*%0A
Name: ${form.name}%0A
Phone: ${form.phone}%0A
Address: ${form.address}%0A
Landmark: ${form.landmark || "-"}%0A
Instructions: ${form.instructions || "-"}%0A%0A
*Order Items*%0A${orderItems}%0A%0A
*Total Payable:* ₹${total}%0A%0A
Please confirm the order.`;

    window.open(`https://wa.me/919354840436?text=${message}`, "_blank");

    setTimeout(() => {
      clearCart();
      setLoading(false);
    }, 700);
  };

  const isMinimumNotMet = total < MINIMUM_ORDER && cart.length > 0;

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: `linear-gradient(135deg, ${Y1}, ${Y2}, ${Y3})` }}
    >
      {/* HEADER */}
      <div className="bg-white/85 backdrop-blur-xl border-b border-black/10 sticky top-0 z-40">
        <div className="px-4 py-3">
          <h2 className="text-lg font-extrabold text-gray-900">Checkout</h2>
          <p className="text-xs text-gray-700/70">
            Enter delivery details & place WhatsApp order
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-5 space-y-6">
        {/* MINIMUM ORDER WARNING */}
        {isMinimumNotMet && (
          <div className="bg-white/85 backdrop-blur-xl border border-black/10 rounded-2xl p-4 flex items-start gap-3 shadow-lg">
            <FiAlertCircle className="text-xl flex-shrink-0 mt-0.5" style={{ color: R1 }} />
            <div>
              <h4 className="font-extrabold text-sm" style={{ color: R2 }}>
                Minimum Order Not Met
              </h4>
              <p className="text-xs text-gray-800/80 mt-1">
                Minimum order amount is ₹{MINIMUM_ORDER}. Please add items worth{" "}
                <span className="font-extrabold" style={{ color: R1 }}>
                  ₹{MINIMUM_ORDER - total}
                </span>{" "}
                more to proceed.
              </p>
            </div>
          </div>
        )}

        {/* DELIVERY DETAILS */}
        <div className="bg-white/88 backdrop-blur-xl border border-black/10 rounded-3xl p-4 space-y-4 shadow-2xl">
          <h3 className="font-extrabold text-base text-gray-900">Delivery Details</h3>

          <Input
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            placeholder="Phone Number *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <textarea
            rows="3"
            placeholder="Complete Delivery Address *"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full rounded-2xl px-4 py-3 outline-none transition bg-white/80 border border-black/10 text-gray-900 placeholder:text-gray-500 focus:ring-4 focus:ring-offset-0"
            style={{ ["--tw-ring-color"]: "rgba(192,51,39,0.22)" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              placeholder="Landmark"
              value={form.landmark}
              onChange={(e) => setForm({ ...form, landmark: e.target.value })}
            />

            <Input
              placeholder="Instructions"
              value={form.instructions}
              onChange={(e) => setForm({ ...form, instructions: e.target.value })}
            />
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white/88 backdrop-blur-xl border border-black/10 rounded-3xl p-4 shadow-2xl">
          <h3 className="font-extrabold text-base mb-3 text-gray-900">Order Summary</h3>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id + (item.size ?? "")} className="flex justify-between text-sm">
                <span className="truncate text-gray-900">
                  {item.name} × {item.qty}
                </span>
                <span className="font-extrabold text-gray-900">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-black/10 my-3" />

          <div className="flex justify-between font-extrabold text-lg">
            <span className="text-gray-900">Total</span>
            <span style={{ color: total >= MINIMUM_ORDER ? R2 : R1 }}>₹{total}</span>
          </div>

          <div className="mt-3 text-xs text-gray-700/70 flex items-center gap-1">
            <FiAlertCircle className="text-sm" style={{ color: R1 }} />
            <span>Minimum order: ₹{MINIMUM_ORDER}</span>
          </div>
        </div>

        {/* PLACE ORDER BUTTON */}
        <button
          onClick={placeOrder}
          disabled={loading || isMinimumNotMet}
          className={`w-full py-3.5 font-extrabold rounded-2xl shadow-lg transition active:scale-95 ${
            isMinimumNotMet ? "bg-black/20 text-black/50 cursor-not-allowed" : "text-white"
          }`}
          style={
            isMinimumNotMet
              ? {}
              : { background: `linear-gradient(90deg, ${R1}, ${R2})` }
          }
        >
          {loading
            ? "Sending on WhatsApp..."
            : isMinimumNotMet
            ? `Add ₹${MINIMUM_ORDER - total} more to place order`
            : "Place Order via WhatsApp"}
        </button>

        <p className="text-[11px] text-center text-gray-800/60 font-semibold">
          You will be redirected to WhatsApp to confirm your order
        </p>
      </div>
    </div>
  );
}

/* INPUT */
function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl px-4 py-3 outline-none transition bg-white/80 border border-black/10 text-gray-900 placeholder:text-gray-500 focus:ring-4 focus:ring-offset-0"
      style={{ ["--tw-ring-color"]: "rgba(192,51,39,0.22)" }}
    />
  );
}
