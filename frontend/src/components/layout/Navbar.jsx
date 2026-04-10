import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiHome,
  FiGrid,
  FiSearch,
  FiPhone,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// ✅ Put your logo here (example path)
import logo from "../../assets/lo.jpeg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useCart();
  const navigate = useNavigate();

  const cartCount = (Array.isArray(cart) ? cart : []).reduce(
    (sum, item) => sum + (Number(item?.qty) || 1),
    0
  );

  // Scroll progress for navbar shadow + yellow tint bg
  const { scrollY } = useScroll();
  const navShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 4px 6px rgba(0,0,0,0.06)", "0 10px 30px rgba(0,0,0,0.18)"]
  );
  const navBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(251, 213, 54, 0.85)", "rgba(251, 213, 54, 0.98)"]
  );

  // ✅ Stop body scroll when drawer open
  useEffect(() => {
    if (open || searchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open, searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/menu", { state: { search: searchQuery.trim() } });
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <>
      <motion.header
        style={{ boxShadow: navShadow, backgroundColor: navBg }}
        className="sticky top-0 z-50 border-b-2 border-[#C03327]/15 backdrop-blur-lg"
      >
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* BRAND WITH IMAGE LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.5, type: "spring" }}
              className="h-12 w-12 rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow bg-white border-2 border-[#C03327]/15 overflow-hidden grid place-items-center"
            >
              <motion.img
                src={logo}
                alt="What's A Sandwich logo"
                className="h-full w-full object-contain p-1"
                draggable={false}
                whileHover={{ scale: 1.1 }}
              />
            </motion.div>

            <div className="leading-tight">
              <motion.span
                className="block text-lg sm:text-xl font-black tracking-tight text-gray-900 group-hover:text-[#C03327] transition-colors"
                whileHover={{ x: 2 }}
              >
                What's A Sandwich
              </motion.span>
              <span className="block text-[11px] text-[#C03327] -mt-1 tracking-wide font-bold">
                Greater Noida
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6 font-bold text-gray-800">
            <NavLink to="/" className={navClass}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                    isActive ? "bg-white/60 text-[#C03327]" : "hover:bg-white/40"
                  }`}
                >
                  <FiHome className="text-lg" />
                  <span>Home</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #C03327, #7E2A17, #C03327)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>

            <NavLink to="/menu" className={navClass}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                    isActive ? "bg-white/60 text-[#C03327]" : "hover:bg-white/40"
                  }`}
                >
                  <FiGrid className="text-lg" />
                  <span>Menu</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #C03327, #7E2A17, #C03327)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>

            {/* SEARCH BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/40 transition-all"
              aria-label="Search"
            >
              <FiSearch className="text-lg" />
              <span>Search</span>
            </motion.button>

            {/* CART */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/cart"
                className="relative flex items-center gap-2 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                style={{
                  background: "linear-gradient(90deg, #C03327, #7E2A17)",
                }}
              >
                <FiShoppingCart className="text-lg" />
                <span className="font-bold">Cart</span>

                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="absolute -top-2 -right-2 text-gray-900 text-xs font-black px-2.5 py-1 rounded-full shadow-lg border-2 border-white"
                      style={{ backgroundColor: "#FBD536" }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          </div>

          {/* MOBILE BUTTONS */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(true)}
              className="text-xl text-gray-900 p-2 hover:bg-white/40 rounded-xl transition-colors"
              aria-label="Search"
            >
              <FiSearch />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen(true)}
              className="text-2xl text-gray-900 p-2 hover:bg-white/40 rounded-xl transition-colors relative"
              aria-label="Open menu"
            >
              <FiMenu />
              {cartCount > 0 && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1 text-[10px] font-black px-1.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: "#C03327" }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl rounded-2xl shadow-2xl z-50 p-6 border-2"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,246,201,0.92))",
                borderColor: "rgba(192,51,39,0.20)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-gray-900">Search Menu</h3>
                <motion.button
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  onClick={() => setSearchOpen(false)}
                  className="text-2xl p-2 hover:bg-black/5 rounded-xl transition-colors"
                  aria-label="Close search"
                >
                  <FiX />
                </motion.button>
              </div>

              <form onSubmit={handleSearch} className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sandwiches, burgers, wraps..."
                  autoFocus
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 rounded-xl outline-none transition-all bg-white/85"
                  style={{
                    borderColor: "rgba(0,0,0,0.12)",
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
                  style={{
                    background: "linear-gradient(90deg, #C03327, #7E2A17)",
                  }}
                >
                  Search
                </motion.button>
              </form>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Sandwich", "Burger", "Wraps", "Fries", "Drinks"].map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSearchQuery(tag);
                      handleSearch({ preventDefault: () => {} });
                    }}
                    className="px-4 py-2 rounded-lg font-bold text-sm transition-colors border"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.70)",
                      borderColor: "rgba(192,51,39,0.20)",
                      color: "#7E2A17",
                    }}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* OVERLAY FOR MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-80 shadow-2xl z-50"
            style={{ background: "linear-gradient(180deg, #FFF6C9, #ffffff)" }}
            aria-label="Mobile menu"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b-2 border-black/10 bg-gradient-to-r from-[#FFF6C9] via-[#FAD945] to-[#FBD536]">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="h-14 w-14 rounded-xl shadow-lg bg-white border-2 border-[#C03327]/15 overflow-hidden grid place-items-center"
                  >
                    <img
                      src={logo}
                      alt="What's A Sandwich logo"
                      className="h-full w-full object-contain p-1.5"
                      draggable={false}
                    />
                  </motion.div>

                  <div>
                    <p className="font-black text-gray-900 leading-tight text-lg">
                      What's A Sandwich
                    </p>
                    <p className="text-xs text-[#C03327] font-bold">Greater Noida</p>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  onClick={() => setOpen(false)}
                  className="text-2xl p-2 hover:bg-black/5 rounded-xl transition-colors"
                  aria-label="Close menu"
                >
                  <FiX />
                </motion.button>
              </div>

              {/* Quick Info Bar */}
              <div className="p-4 bg-white border-b-2 border-black/10">
                <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                  <span className="flex items-center gap-1">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                    Open Now
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="text-[#7E2A17]" />
                    11:30 AM - 10 PM
                  </span>
                </div>
              </div>

              {/* Links (scrollable area) */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col p-4 gap-2 font-bold text-gray-800">
                  <NavLink onClick={() => setOpen(false)} to="/" className={mobileClass}>
                    {({ isActive }) => (
                      <motion.div
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center gap-3 py-4 px-4 rounded-xl transition-all border-2 ${
                          isActive
                            ? "bg-gradient-to-r from-[#FFF6C9] to-white text-[#C03327] shadow-md border-[#C03327]/20"
                            : "hover:bg-black/5 border-transparent"
                        }`}
                      >
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          className={`p-2 rounded-lg ${
                            isActive ? "bg-[#FBD536]/40" : "bg-black/5"
                          }`}
                        >
                          <FiHome className="text-xl" />
                        </motion.div>
                        <span className="text-lg">Home</span>
                        {isActive && (
                          <motion.div
                            layoutId="mobile-indicator"
                            className="ml-auto w-2 h-2 rounded-full shadow-lg"
                            style={{ backgroundColor: "#C03327" }}
                          />
                        )}
                      </motion.div>
                    )}
                  </NavLink>

                  <NavLink onClick={() => setOpen(false)} to="/menu" className={mobileClass}>
                    {({ isActive }) => (
                      <motion.div
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center gap-3 py-4 px-4 rounded-xl transition-all border-2 ${
                          isActive
                            ? "bg-gradient-to-r from-[#FFF6C9] to-white text-[#C03327] shadow-md border-[#C03327]/20"
                            : "hover:bg-black/5 border-transparent"
                        }`}
                      >
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          className={`p-2 rounded-lg ${
                            isActive ? "bg-[#FBD536]/40" : "bg-black/5"
                          }`}
                        >
                          <FiGrid className="text-xl" />
                        </motion.div>
                        <span className="text-lg">Menu</span>
                        {isActive && (
                          <motion.div
                            layoutId="mobile-indicator"
                            className="ml-auto w-2 h-2 rounded-full shadow-lg"
                            style={{ backgroundColor: "#C03327" }}
                          />
                        )}
                      </motion.div>
                    )}
                  </NavLink>

                  {/* Cart */}
                  <motion.div whileTap={{ scale: 0.97 }} className="mt-2">
                    <Link
                      onClick={() => setOpen(false)}
                      to="/cart"
                      className="flex items-center justify-between text-white py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all border-2"
                      style={{
                        background: "linear-gradient(90deg, #C03327, #7E2A17)",
                        borderColor: "#7E2A17",
                      }}
                    >
                      <span className="flex items-center gap-3 font-bold text-lg">
                        <motion.div
                          whileHover={{ rotate: [0, -15, 15, 0] }}
                          className="p-2 bg-white/20 rounded-lg"
                        >
                          <FiShoppingCart className="text-xl" />
                        </motion.div>
                        Cart
                      </span>

                      <AnimatePresence>
                        {cartCount > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.12, 1] }}
                            exit={{ scale: 0 }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-gray-900 text-base font-black px-3 py-1.5 rounded-full shadow-lg border-2 border-white"
                            style={{ backgroundColor: "#FBD536" }}
                          >
                            {cartCount}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                </div>

                {/* Promo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 mx-4 p-4 rounded-xl border-2 shadow-lg"
                  style={{
                    background: "linear-gradient(90deg, #FFF6C9, #FAD945, #FBD536)",
                    borderColor: "rgba(0,0,0,0.10)",
                  }}
                >
                  <motion.p
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-center font-black text-gray-900"
                  >
                    FLAT <span className="text-[#C03327] text-xl">30% OFF</span>
                  </motion.p>
                  <p className="text-center text-xs text-gray-800 mt-1 font-bold">
                    On all items • Limited time offer
                  </p>
                </motion.div>

                {/* Stats */}
                <div className="mt-4 mx-4 grid grid-cols-2 gap-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-3 rounded-xl border-2 text-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.8)", borderColor: "rgba(0,0,0,0.10)" }}
                  >
                    <p className="text-2xl font-black text-[#7E2A17]">30min</p>
                    <p className="text-xs text-gray-700 font-bold">Fast Delivery</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-3 rounded-xl border-2 text-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.8)", borderColor: "rgba(0,0,0,0.10)" }}
                  >
                    <p className="text-2xl font-black text-[#C03327]">4.9★</p>
                    <p className="text-xs text-gray-700 font-bold">Top Rated</p>
                  </motion.div>
                </div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 mx-4 p-4 rounded-xl border-2"
                  style={{ backgroundColor: "rgba(255,255,255,0.85)", borderColor: "rgba(0,0,0,0.10)" }}
                >
                  <p className="text-xs font-black text-gray-900 mb-3">CONTACT US</p>
                  <div className="space-y-2 text-sm text-gray-800">
                    <p className="flex items-center gap-2">
                      <FiPhone className="text-[#C03327]" />
                      <span className="font-semibold">+91 9354840436</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <FiMapPin className="text-[#C03327] mt-0.5 flex-shrink-0" />
                      <span className="text-xs font-semibold">
                        Gaur World Smart Street, Greater Noida West
                      </span>
                    </p>
                  </div>
                </motion.div>

                <div className="h-6" />
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-4 border-t-2 border-black/10"
                style={{ background: "linear-gradient(180deg, rgba(255,246,201,0.9), rgba(255,255,255,0.95))" }}
              >
                <p className="text-center text-xs text-gray-800 font-semibold">
                  Made with love in Greater Noida
                </p>
                <p className="text-center text-xs text-gray-600 mt-1">
                  © 2026 What's A Sandwich
                </p>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

/* ACTIVE LINK STYLE */
const navClass = ({ isActive }) =>
  `relative transition-colors ${isActive ? "text-[#C03327]" : "text-gray-900"} hover:text-[#C03327]`;

/* keep same (your mobile items are custom-rendered above) */
const mobileClass = () => "";
