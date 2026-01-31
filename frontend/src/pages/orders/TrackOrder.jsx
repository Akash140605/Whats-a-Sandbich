import { useParams, useNavigate } from "react-router-dom";

const steps = ["Order Placed", "Preparing", "Picked", "On the Way", "Delivered"];

export default function TrackOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy current status (later backend se ayega)
  const currentStep = 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-10">

        <button
          onClick={() => navigate(-1)}
          className="text-red-600 font-semibold hover:underline"
        >
          ← Back to Orders
        </button>

        <h2 className="text-3xl font-extrabold text-gray-900 mt-4">
          Tracking Order #{id} 📍
        </h2>

        {/* ETA */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mt-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Estimated Delivery</p>
            <p className="font-bold text-lg text-gray-800">25–30 mins</p>
          </div>

          <div className="text-4xl">🚴‍♂️</div>
        </div>

        {/* TRACKING TIMELINE */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mt-6">

          <h3 className="font-bold text-lg mb-6">
            Order Status
          </h3>

          <div className="space-y-5">
            {steps.map((step, idx) => (
              <TimelineStep
                key={idx}
                label={step}
                active={idx <= currentStep}
                last={idx === steps.length - 1}
              />
            ))}
          </div>

        </div>

        {/* MAP PLACEHOLDER */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mt-6 text-center">
          <h3 className="font-bold text-lg mb-3">Live Tracking Map 🗺️</h3>
          <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-500">
            Google Maps Integration Here
          </div>
        </div>

      </div>
    </div>
  );
}

/* TIMELINE STEP */
function TimelineStep({ label, active, last }) {
  return (
    <div className="flex items-start gap-4">

      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full ${active ? "bg-red-600" : "bg-gray-300"}`}
        ></div>
        {!last && (
          <div
            className={`w-1 h-10 ${active ? "bg-red-300" : "bg-gray-200"}`}
          ></div>
        )}
      </div>

      <div>
        <p className={`font-semibold ${active ? "text-gray-900" : "text-gray-400"}`}>
          {label}
        </p>
        <p className="text-xs text-gray-400">
          {active ? "Completed" : "Pending"}
        </p>
      </div>

    </div>
  );
}
