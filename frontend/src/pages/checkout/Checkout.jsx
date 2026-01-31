import { useState } from "react";
import { useCart } from "../../context/CartContext";

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

  const placeOrder = () => {
    if (!cart.length) return alert("Your cart is empty");
    if (!form.name || !form.phone || !form.address)
      return alert("Please fill all required details");

    setLoading(true);

    const orderItems = cart
      .map(
        (item, i) =>
          `${i + 1}. ${item.name} × ${item.qty} = ₹${
            item.price * item.qty
          }`
      )
      .join("%0A");

    const message = `*New Order - What’s A Sandwich®*%0A%0A
*Customer Details*%0A
Name: ${form.name}%0A
Phone: ${form.phone}%0A
Address: ${form.address}%0A
Landmark: ${form.landmark || "-"}%0A
Instructions: ${form.instructions || "-"}%0A%0A
*Order Items*%0A${orderItems}%0A%0A
*Total Payable:* ₹${total}%0A%0A
Please confirm the order.`;

    window.open(
      `https://wa.me/919068051876?text=${message}`,
      "_blank"
    );

    setTimeout(() => {
      clearCart();
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* HEADER */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <h2 className="text-lg font-extrabold">
            Checkout
          </h2>
          <p className="text-xs text-gray-500">
            Enter delivery details & place WhatsApp order
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-5 space-y-6">

        {/* DELIVERY DETAILS */}
        <div className="bg-white border rounded-xl p-4 space-y-4">

          <h3 className="font-bold text-base">
            Delivery Details
          </h3>

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
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <div className="grid grid-cols-2 gap-3">
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
        <div className="bg-white border rounded-xl p-4">

          <h3 className="font-bold text-base mb-3">
            Order Summary
          </h3>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div
                key={item.id + item.size}
                className="flex justify-between text-sm"
              >
                <span className="truncate">
                  {item.name} × {item.qty}
                </span>
                <span className="font-semibold">
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t my-3"></div>

          <div className="flex justify-between font-extrabold text-lg">
            <span>Total</span>
            <span className="text-green-600">
              ₹{total}
            </span>
          </div>
        </div>

        {/* PLACE ORDER BUTTON */}
        <button
          onClick={placeOrder}
          disabled={loading}
          className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl shadow-lg transition active:scale-95"
        >
          {loading ? "Sending on WhatsApp..." : "Place Order via WhatsApp"}
        </button>

        <p className="text-[11px] text-center text-gray-400">
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
      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
    />
  );
}
