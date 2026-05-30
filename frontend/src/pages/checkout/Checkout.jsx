import { useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";
import { FiAlertCircle, FiMapPin, FiPhone, FiUser, FiMessageSquare } from "react-icons/fi";

const SHOP = {
  phone: "919354840436",
  name: "What's A Sandwich®",
  address:
    "Shop No. 09, Fusion Homes Market, Tech Zone IV, Amrapali Dream Valley, Greater Noida, Uttar Pradesh 201318",
  shortLabel: "Fusion Homes Market, Tech Zone IV",
  googleMapsSearch:
    "https://www.google.com/maps/search/?api=1&query=Shop+No.+09%2C+Fusion+Homes+Market%2C+Tech+Zone+IV%2C+Amrapali+Dream+Valley%2C+Greater+Noida%2C+Uttar+Pradesh+201318",
};

const MINIMUM_ORDER = 150;

const Y1 = "#FFF6C9";
const Y2 = "#FAD945";
const Y3 = "#FBD536";
const R1 = "#C03327";
const R2 = "#7E2A17";

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
  const [error, setError] = useState("");

  const safeCart = useMemo(() => (Array.isArray(cart) ? cart : []), [cart]);
  const isMinimumNotMet = total < MINIMUM_ORDER && safeCart.length > 0;
  const amountShort = Math.max(MINIMUM_ORDER - total, 0);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  const validateForm = () => {
    if (!safeCart.length) {
      return "Your cart is empty.";
    }

    if (total < MINIMUM_ORDER) {
      return `Minimum order amount is ₹${MINIMUM_ORDER}. Please add items worth ₹${amountShort} more.`;
    }

    if (!form.name.trim()) {
      return "Please enter your full name.";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      return "Please enter a valid 10-digit phone number.";
    }

    if (!form.address.trim()) {
      return "Please enter your complete delivery address.";
    }

    return "";
  };

  const placeOrder = () => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const orderItems = safeCart
      .map((item, i) => {
        const extras = [
          item.size ? `Size: ${item.size}` : null,
          item.bread ? `Bread: ${item.bread}` : null,
          item.sauce ? `Sauce: ${item.sauce}` : null,
          item.extraSauce ? "Extra Sauce" : null,
        ]
          .filter(Boolean)
          .join(", ");

        return `${i + 1}. ${item.name}${extras ? ` (${extras})` : ""} × ${item.qty} = ₹${
          item.price * item.qty
        }`;
      })
      .join("\n");

    const message = `
*New Order - ${SHOP.name}*

*Customer Details*
Name: ${form.name.trim()}
Phone: ${form.phone.trim()}
Address: ${form.address.trim()}
Landmark: ${form.landmark.trim() || "-"}
Instructions: ${form.instructions.trim() || "-"}

*Outlet*
${SHOP.address}

*Order Items*
${orderItems}

*Total Payable:* ₹${total}

Please confirm the order.
    `.trim();

    const whatsappUrl = `https://wa.me/${SHOP.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      clearCart();
      setLoading(false);
    }, 700);
  };

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: `linear-gradient(135deg, ${Y1}, ${Y2}, ${Y3})` }}
    >
      <div className="bg-white/85 backdrop-blur-xl border-b border-black/10 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 py-3 sm:py-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">Checkout</h2>
          <p className="text-xs sm:text-sm text-gray-700/70">
            Enter delivery details and place your WhatsApp order
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-5 py-5 sm:py-6 space-y-5 sm:space-y-6">
        <OutletCard />

        {isMinimumNotMet && (
          <div className="bg-white/85 backdrop-blur-xl border border-black/10 rounded-2xl p-4 flex items-start gap-3 shadow-lg">
            <FiAlertCircle className="text-xl flex-shrink-0 mt-0.5" style={{ color: R1 }} />
            <div>
              <h4 className="font-extrabold text-sm sm:text-base" style={{ color: R2 }}>
                Minimum Order Not Met
              </h4>
              <p className="text-xs sm:text-sm text-gray-800/80 mt-1 leading-6">
                Minimum order amount is ₹{MINIMUM_ORDER}. Please add items worth{" "}
                <span className="font-extrabold" style={{ color: R1 }}>
                  ₹{amountShort}
                </span>{" "}
                more to proceed.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <FiAlertCircle className="text-lg mt-0.5 flex-shrink-0" style={{ color: R1 }} />
              <p className="text-sm font-semibold leading-6" style={{ color: R2 }}>
                {error}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white/88 backdrop-blur-xl border border-black/10 rounded-3xl p-4 sm:p-5 space-y-4 shadow-2xl">
              <h3 className="font-extrabold text-base sm:text-lg text-gray-900">
                Delivery Details
              </h3>

              <Input
                icon={<FiUser />}
                placeholder="Full Name *"
                value={form.name}
                onChange={handleChange("name")}
              />

              <Input
                icon={<FiPhone />}
                placeholder="Phone Number *"
                value={form.phone}
                onChange={handleChange("phone")}
                inputMode="numeric"
                maxLength={10}
              />

              <TextArea
                placeholder="Complete Delivery Address *"
                value={form.address}
                onChange={handleChange("address")}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  icon={<FiMapPin />}
                  placeholder="Landmark"
                  value={form.landmark}
                  onChange={handleChange("landmark")}
                />

                <Input
                  icon={<FiMessageSquare />}
                  placeholder="Instructions"
                  value={form.instructions}
                  onChange={handleChange("instructions")}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <OrderSummary
              cart={safeCart}
              total={total}
              isMinimumNotMet={isMinimumNotMet}
              amountShort={amountShort}
              loading={loading}
              onPlaceOrder={placeOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function OutletCard() {
  return (
    <div className="bg-white/88 backdrop-blur-xl border border-black/10 rounded-3xl p-4 sm:p-5 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-600">
            Outlet location
          </p>
          <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mt-1">
            {SHOP.shortLabel}
          </h3>
          <p className="text-sm text-gray-800/80 mt-1 leading-6">{SHOP.address}</p>
        </div>

        <a
          href={SHOP.googleMapsSearch}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-3 rounded-2xl text-white font-extrabold shadow-lg hover:shadow-xl transition md:flex-shrink-0"
          style={{ background: `linear-gradient(90deg, ${R1}, ${R2})` }}
        >
          Open Shop Location
        </a>
      </div>
    </div>
  );
}

function OrderSummary({
  cart,
  total,
  isMinimumNotMet,
  amountShort,
  loading,
  onPlaceOrder,
}) {
  return (
    <div className="bg-white/88 backdrop-blur-xl border border-black/10 rounded-3xl p-4 sm:p-5 shadow-2xl lg:sticky lg:top-24">
      <h3 className="font-extrabold text-base sm:text-lg mb-3 text-gray-900">
        Order Summary
      </h3>

      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {cart.length === 0 ? (
          <p className="text-sm text-gray-700">Your cart is empty.</p>
        ) : (
          cart.map((item) => {
            const meta = [item.size, item.bread, item.sauce].filter(Boolean).join(" • ");

            return (
              <div
                key={`${item.id}-${item.size ?? ""}-${item.bread ?? ""}-${item.sauce ?? ""}`}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <div className="min-w-0">
                  <p className="text-gray-900 font-semibold break-words">
                    {item.name} × {item.qty}
                  </p>
                  {meta && <p className="text-xs text-gray-600 mt-0.5">{meta}</p>}
                </div>

                <span className="font-extrabold text-gray-900 whitespace-nowrap">
                  ₹{item.price * item.qty}
                </span>
              </div>
            );
          })
        )}
      </div>

      <div className="border-t border-black/10 my-4" />

      <div className="flex justify-between font-extrabold text-lg">
        <span className="text-gray-900">Total</span>
        <span style={{ color: total >= MINIMUM_ORDER ? R2 : R1 }}>₹{total}</span>
      </div>

      <div className="mt-3 text-xs sm:text-sm text-gray-700/80 flex items-start gap-2">
        <FiAlertCircle className="text-sm mt-0.5 flex-shrink-0" style={{ color: R1 }} />
        <span>Minimum order: ₹{MINIMUM_ORDER}</span>
      </div>

      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={loading || isMinimumNotMet}
        className={`mt-5 w-full py-3.5 font-extrabold rounded-2xl shadow-lg transition active:scale-[0.98] ${
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
          ? `Add ₹${amountShort} more to place order`
          : "Place Order via WhatsApp"}
      </button>

      <p className="text-[11px] sm:text-xs text-center text-gray-800/60 font-semibold mt-3 leading-5">
        You will be redirected to WhatsApp to confirm your order
      </p>
    </div>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-base">
          {icon}
        </span>
      )}

      <input
        {...props}
        className={`w-full rounded-2xl ${
          icon ? "pl-11 pr-4" : "px-4"
        } py-3 outline-none transition bg-white/80 border border-black/10 text-gray-900 placeholder:text-gray-500 focus:ring-4 focus:ring-offset-0`}
        style={{ ["--tw-ring-color"]: "rgba(192,51,39,0.22)" }}
      />
    </div>
  );
}

function TextArea(props) {
  return (
    <textarea
      {...props}
      rows="4"
      className="w-full rounded-2xl px-4 py-3 outline-none transition bg-white/80 border border-black/10 text-gray-900 placeholder:text-gray-500 focus:ring-4 focus:ring-offset-0 resize-none"
      style={{ ["--tw-ring-color"]: "rgba(192,51,39,0.22)" }}
    />
  );
}