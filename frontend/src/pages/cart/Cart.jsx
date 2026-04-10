import { useState, useMemo } from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

/**
 * Shop coordinates (from your Google Maps link center):
 * @28.6069241,77.4333633
 */
const SHOP = { lat: 28.6069241, lng: 77.4333633 };
const ALLOWED_KM = 6;

// Brand palette
const Y1 = "#FFF6C9";
const Y2 = "#FAD945";
const Y3 = "#FBD536";
const R1 = "#C03327";
const R2 = "#7E2A17";

export default function Cart() {
  const { cart, addItem, removeItem, total } = useCart();
  const navigate = useNavigate();

  const [checking, setChecking] = useState(false);
  const [locError, setLocError] = useState("");

  const delivery = total > 299 ? 0 : 40;
  const tax = Math.round(total * 0.05);
  const grandTotal = total + delivery + tax;

  const handleCheckout = () => {
    setLocError("");

    if (!navigator.geolocation) {
      setLocError("Location not supported in this browser/device.");
      return;
    }

    setChecking(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const user = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        const km = haversineKm(user, SHOP);
        setChecking(false);

        if (km <= ALLOWED_KM) {
          navigate("/checkout");
        } else {
          setLocError(
            `Checkout only available within ${ALLOWED_KM} km of the outlet. You are ~${km.toFixed(
              1
            )} km away.`
          );
        }
      },
      () => {
        setChecking(false);
        setLocError("Please allow location permission (and enable GPS) to proceed.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const safeCart = useMemo(() => (Array.isArray(cart) ? cart : []), [cart]);

  if (!safeCart.length) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 text-center pb-24"
        style={{ background: `linear-gradient(135deg, ${Y1}, ${Y2}, ${Y3})` }}
      >
        <div className="bg-white/80 backdrop-blur-xl border border-black/10 rounded-3xl p-8 shadow-2xl max-w-md w-full">
          <h2 className="text-2xl font-extrabold text-gray-900">Your cart is empty</h2>
          <p className="text-gray-700 mt-2 max-w-sm mx-auto">
            Add delicious items from our menu and enjoy premium sandwiches & fast food.
          </p>

          <Link
            to="/menu"
            className="mt-6 inline-flex px-6 py-3 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition"
            style={{ background: `linear-gradient(90deg, ${R1}, ${R2})` }}
          >
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pb-16"
      style={{ background: `linear-gradient(135deg, ${Y1}, ${Y2}, ${Y3})` }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Your Cart</h2>
            <p className="text-sm text-gray-800/70">Review your items before checkout</p>
          </div>

          <Link to="/menu" className="font-extrabold hover:underline" style={{ color: R1 }}>
            + Add Items
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT: ITEMS */}
          <div className="lg:col-span-2 space-y-3">
            {safeCart.map((item) => (
              <CartItem
                key={`${item.id}-${item.size ?? ""}`}
                item={item}
                addItem={addItem}
                removeItem={removeItem}
              />
            ))}

            {/* MOBILE: BILL SUMMARY (items ke niche) */}
            <BillSummary
              className="lg:hidden mt-4"
              total={total}
              delivery={delivery}
              tax={tax}
              grandTotal={grandTotal}
              locError={locError}
              checking={checking}
              onCheckout={handleCheckout}
            />
          </div>

          {/* RIGHT: DESKTOP BILL SUMMARY */}
          <div className="hidden lg:block">
            <BillSummary
              className="sticky top-24"
              total={total}
              delivery={delivery}
              tax={tax}
              grandTotal={grandTotal}
              locError={locError}
              checking={checking}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* BILL SUMMARY (reusable) */
function BillSummary({
  className = "",
  total,
  delivery,
  tax,
  grandTotal,
  locError,
  checking,
  onCheckout,
}) {
  return (
    <div
      className={`bg-white/90 backdrop-blur-xl border border-black/10 rounded-3xl shadow-2xl p-6 ${className}`}
    >
      <h3 className="font-extrabold text-lg mb-4 text-gray-900">Bill Summary</h3>

      <div className="space-y-2 text-sm text-gray-800/80">
        <Row label="Item Total" value={`₹${total}`} />
        <Row label="Delivery" value={delivery ? `₹${delivery}` : "FREE"} highlight={!delivery} />
        <Row label="Tax (5%)" value={`₹${tax}`} />
      </div>

      <div className="border-t border-black/10 my-4" />

      <div className="flex justify-between font-extrabold text-xl">
        <span className="text-gray-900">Total</span>
        <span style={{ color: R1 }}>₹{grandTotal}</span>
      </div>

      {locError && (
        <p className="mt-3 text-sm font-semibold" style={{ color: R1 }}>
          {locError}
        </p>
      )}

      <button
        onClick={onCheckout}
        disabled={checking}
        className="mt-5 w-full disabled:opacity-60 text-white font-extrabold py-3 rounded-2xl shadow-lg hover:shadow-xl transition"
        style={{ background: `linear-gradient(90deg, ${R1}, ${R2})` }}
      >
        {checking ? "Checking location..." : "Proceed to Checkout"}
      </button>

      <p className="mt-3 text-xs text-gray-700/80 font-semibold">Free delivery above ₹299</p>
    </div>
  );
}

/* CART ITEM */
function CartItem({ item, addItem, removeItem }) {
  return (
    <div className="bg-white/88 backdrop-blur-xl border border-black/10 rounded-3xl shadow-lg hover:shadow-2xl transition p-3 sm:p-4 flex gap-3 items-center">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border-2 border-white shadow-md"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg";
          }}
        />
        <span
          className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow"
          style={{ backgroundColor: Y3 }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-extrabold text-gray-900 truncate">{item.name}</h3>
        {item.size && <p className="text-xs text-gray-700/70">Size: {item.size}</p>}
        <p className="text-sm text-gray-800/80 mt-1 font-semibold">
          ₹{item.price} × {item.qty}
        </p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <button
          onClick={() => addItem(item)}
          className="w-9 h-9 text-white rounded-2xl font-extrabold shadow hover:shadow-lg transition"
          style={{ background: `linear-gradient(90deg, ${R1}, ${R2})` }}
          aria-label="Increase quantity"
        >
          +
        </button>

        <span className="font-extrabold text-gray-900">{item.qty}</span>

        <button
          onClick={() => removeItem(item.id, item.size)}
          className="w-9 h-9 rounded-2xl font-extrabold transition border-2 bg-white/70 hover:bg-white"
          style={{ borderColor: "rgba(0,0,0,0.12)", color: R1 }}
          aria-label="Decrease quantity"
        >
          −
        </button>
      </div>
    </div>
  );
}

/* ROW */
function Row({ label, value, highlight }) {
  return (
    <div className="flex justify-between">
      <span className="font-semibold text-gray-800">{label}</span>
      <span
        className={highlight ? "font-extrabold" : "font-extrabold text-gray-900"}
        style={highlight ? { color: R2 } : undefined}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * Great-circle distance (Haversine) in KM between two {lat,lng} points.
 */
function haversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;

  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}
