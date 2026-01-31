import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../services/orderService";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrders().then(res => setOrders(res.data || []));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-10">

        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          My Orders 📦
        </h2>

        {!orders.length ? (
          <div className="text-center mt-20">
            <div className="text-7xl">🛍️</div>
            <h3 className="text-xl font-bold text-gray-700 mt-4">
              No orders yet
            </h3>
            <p className="text-gray-500 mt-2">
              Once you place an order, it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((o) => (
              <OrderCard key={o.id} order={o} onTrack={() => navigate(`/track/${o.id}`)} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

/* ORDER CARD */
function OrderCard({ order, onTrack }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-5 border border-gray-100">

      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-gray-800">
          Order #{order.id}
        </h3>
        <StatusBadge status={order.status} />
      </div>

      <p className="text-sm text-gray-500 mt-1">
        {order.date || "Today"} • {order.items || "Multiple items"}
      </p>

      <div className="border-t my-4"></div>

      <div className="flex justify-between items-center">
        <span className="font-bold text-lg text-gray-900">
          ₹{order.total}
        </span>

        <button
          onClick={onTrack}
          className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm font-semibold rounded-xl shadow transition active:scale-95"
        >
          Track Order 🚀
        </button>
      </div>
    </div>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Preparing: "bg-blue-100 text-blue-700",
    Picked: "bg-purple-100 text-purple-700",
    "On the Way": "bg-orange-100 text-orange-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}
