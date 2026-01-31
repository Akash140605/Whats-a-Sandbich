import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-extrabold text-white leading-tight">
            What’s A Sandwich
            <span className="block text-sm text-red-500 font-semibold">
              Greater Noida
            </span>
          </h2>

          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Premium handcrafted sandwiches, burgers, wraps and fast food made
            with fresh ingredients and delivered hot & fast.
          </p>

          <div className="flex gap-4 mt-4 text-lg">
            <a href="#" className="hover:text-white transition">Website</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Facebook</a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-white transition">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white transition">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:text-white transition">
                Checkout
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            Customer Support
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Phone: +91 9068051876</li>
            <li>Email: support@whatsasandwich.in</li>
            <li>Timings: 10:00 AM – 11:00 PM</li>
            <li>Fast Home Delivery</li>
          </ul>
        </div>

        {/* LOCATION */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            Our Location
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Shop No. ALGF 260, Gaur World Smart Street, Plot C-01,  
            Sector 16B Road, Greater Noida West,  
            Bhangel, Greater Noida, Ghaziabad,  
            Uttar Pradesh – 201318
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">
          What’s A Sandwich – Greater Noida
        </span>
        . All Rights Reserved.
        <br />
        Crafted with care for premium food experience.
      </div>
    </footer>
  );
}
