import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiInstagram,
  FiFacebook,
  FiGlobe,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiArrowUp,
  FiPackage,
  FiClock,
  FiUsers,
  FiStar,
} from "react-icons/fi";

const SHOP = {
  name: "What's A Sandwich",
  city: "Greater Noida",
  phone: "+91 9354840436",
  email: "support@whatsasandwich.in",
  address:
    "Shop No. 09, Fusion Homes Market, Tech Zone IV, Amrapali Dream Valley, Greater Noida, Uttar Pradesh 201318",
  shortAddress: "Fusion Homes Market, Tech Zone IV, Greater Noida",
  mapsAppLink: "https://maps.app.goo.gl/m2QPpFzDL4KBKgci9",
  googleMapsLink:
    "https://www.google.com/maps/search/?api=1&query=Shop+No.+09%2C+Fusion+Homes+Market%2C+Tech+Zone+IV%2C+Amrapali+Dream+Valley%2C+Greater+Noida%2C+Uttar+Pradesh+201318",
};

export default function Footer() {
  const year = new Date().getFullYear();
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [stats, setStats] = useState({ orders: 0, customers: 0, rating: 0 });

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const target = { orders: 5000, customers: 2500, rating: 4.9 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let current = 0;

    const timer = setInterval(() => {
      current++;

      setStats({
        orders: Math.floor((target.orders / steps) * current),
        customers: Math.floor((target.customers / steps) * current),
        rating: Number((target.rating / steps) * current).toFixed(1),
      });

      if (current >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email.trim()) {
      alert(`Subscribed: ${email}`);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 4 + Math.random() * 8,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <footer className="relative overflow-hidden text-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBD536] via-[#FAD945] to-[#FFF6C9]" />

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={reduceMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.25, 0.35, 0.25] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-600/25 blur-3xl"
        />

        <motion.div
          animate={reduceMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute top-8 -right-28 h-80 w-80 rounded-full bg-white/30 blur-3xl"
        />

        <motion.div
          animate={reduceMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#C03327]/20 blur-3xl"
        />

        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={
              reduceMotion
                ? { opacity: 0.2 }
                : { y: [0, -25, 0], opacity: [0.15, 0.35, 0.15] }
            }
            transition={{
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-white/45"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <div className="relative h-[3px] w-full bg-gradient-to-r from-transparent via-[#C03327] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 rounded-3xl border border-black/10 bg-white/55 backdrop-blur-xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
        >
          <div className="text-center">
            <motion.div
              className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-black text-gray-900"
              key={stats.orders}
            >
              <FiPackage className="text-[#C03327]" />
              <span>{stats.orders.toLocaleString()}+</span>
            </motion.div>
            <p className="text-xs font-bold text-gray-700 mt-1">Orders Delivered</p>
          </div>

          <div className="text-center sm:border-x border-black/10">
            <motion.div
              className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-black text-gray-900"
              key={stats.customers}
            >
              <FiUsers className="text-[#7E2A17]" />
              <span>{stats.customers.toLocaleString()}+</span>
            </motion.div>
            <p className="text-xs font-bold text-gray-700 mt-1">Happy Customers</p>
          </div>

          <div className="text-center">
            <motion.div
              className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-black text-gray-900"
              key={stats.rating}
            >
              <FiStar className="text-[#C03327]" />
              <span>{stats.rating}</span>
            </motion.div>
            <p className="text-xs font-bold text-gray-700 mt-1">Average Rating</p>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl border border-black/10 bg-white/55 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-5 sm:p-6 md:p-8 mb-10 sm:mb-12 relative overflow-hidden"
        >
          <motion.div
            animate={
              reduceMotion
                ? {}
                : {
                    background: [
                      "radial-gradient(circle at 20% 50%, rgba(192,51,39,0.18) 0%, transparent 55%)",
                      "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.30) 0%, transparent 55%)",
                      "radial-gradient(circle at 20% 50%, rgba(192,51,39,0.18) 0%, transparent 55%)",
                    ],
                  }
            }
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute inset-0 pointer-events-none"
          />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-6">
            <div>
              <motion.p
                animate={reduceMotion ? {} : { opacity: [1, 0.7, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-xs font-extrabold tracking-widest text-[#C03327]"
              >
                DEAL ALERT
              </motion.p>

              <h3 className="mt-1 text-2xl md:text-3xl font-black text-gray-900">
                Get updates & offers
              </h3>

              <p className="mt-2 text-sm text-gray-700/90 max-w-xl">
                New items, combos, and limited-time offers—directly to your inbox.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full lg:w-auto flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1 min-w-0 sm:min-w-[260px]">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700/80" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-2xl bg-white/80 border border-black/10 pl-12 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:ring-4 focus:ring-[#C03327]/15 focus:border-[#C03327]/30 transition"
                />
              </div>

              <motion.button
                whileHover={reduceMotion ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="rounded-2xl px-6 py-3 text-sm font-extrabold text-white shadow-lg hover:shadow-xl transition flex items-center gap-2 justify-center bg-gradient-to-r from-[#C03327] to-[#7E2A17]"
              >
                <FiSend />
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-10"
        >
          <motion.div
            variants={
              reduceMotion
                ? {}
                : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
            }
            className="sm:col-span-2 xl:col-span-1"
          >
            <h2 className="text-2xl font-black text-gray-900 leading-tight">
              {SHOP.name}
              <span className="block text-sm text-[#C03327] font-extrabold tracking-wide mt-1">
                {SHOP.city}
              </span>
            </h2>

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              Premium handcrafted sandwiches, burgers, wraps and fast food made with
              fresh ingredients and delivered hot and fast.
            </p>

            <div className="mt-6 flex items-center gap-3" aria-label="Social links">
              {[
                { icon: FiGlobe, label: "Website", href: "#" },
                { icon: FiInstagram, label: "Instagram", href: "#" },
                { icon: FiFacebook, label: "Facebook", href: "#" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={reduceMotion ? {} : { scale: 1.08, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-2xl bg-white/60 border border-black/10 hover:bg-white/80 hover:border-black/15 transition"
                >
                  <social.icon className="text-lg text-gray-900" />
                </motion.a>
              ))}
            </div>

            <div className="mt-6 space-y-3 text-sm text-gray-700">
              <motion.a
                href={`tel:${SHOP.phone.replace(/\s+/g, "")}`}
                whileHover={reduceMotion ? {} : { x: 4 }}
                className="flex items-center gap-2"
              >
                <FiPhone className="text-[#C03327]" />
                <span>{SHOP.phone}</span>
              </motion.a>

              <motion.a
                href={`mailto:${SHOP.email}`}
                whileHover={reduceMotion ? {} : { x: 4 }}
                className="flex items-center gap-2 break-all"
              >
                <FiMail className="text-[#C03327]" />
                <span>{SHOP.email}</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            variants={
              reduceMotion
                ? {}
                : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
            }
          >
            <h3 className="text-base font-black text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/menu", label: "Menu" },
                { to: "/cart", label: "Cart" },
                { to: "/checkout", label: "Checkout" },
              ].map((link) => (
                <motion.li key={link.to} whileHover={reduceMotion ? {} : { x: 4 }}>
                  <Link className="hover:text-black transition text-gray-800" to={link.to}>
                    → {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={
              reduceMotion
                ? {}
                : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
            }
          >
            <h3 className="text-base font-black text-gray-900 mb-4">Customer Support</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <motion.span
                  animate={reduceMotion ? {} : { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="inline-flex h-2 w-2 rounded-full bg-[#C03327]"
                />
                Timings: 12:00 PM – 10:30 PM
              </li>
              <li className="flex items-center gap-2">
                <FiClock className="text-[#7E2A17]" />
                Fast home delivery
              </li>
              <li className="flex items-center gap-2">
                <FiPackage className="text-[#C03327]" />
                Easy checkout and quick support
              </li>
              <li className="flex items-center gap-2">
                <FiStar className="text-[#C03327]" />
                Fresh and hygienic packaging
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={
              reduceMotion
                ? {}
                : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
            }
          >
            <h3 className="text-base font-black text-gray-900 mb-4">Our Location</h3>

            <p className="text-sm leading-relaxed text-gray-700">
              <span className="inline-flex items-start gap-2">
                <FiMapPin className="mt-0.5 text-[#C03327] flex-shrink-0" />
                <span>{SHOP.address}</span>
              </span>
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <motion.a
                href={SHOP.mapsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-extrabold text-gray-900 bg-white/80 border border-black/10 shadow-md hover:shadow-lg transition"
              >
                <FiMapPin />
                Open App Link
              </motion.a>

              <motion.a
                href={SHOP.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? {} : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-extrabold text-white bg-gradient-to-r from-[#C03327] to-[#7E2A17] shadow-lg hover:shadow-xl transition"
              >
                <FiMapPin />
                Open in Maps
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-gray-700"
        >
          <p className="text-center lg:text-left">
            © {year}{" "}
            <span className="text-gray-900 font-extrabold">
              {SHOP.name} – {SHOP.city}
            </span>
            . All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            {[
              { to: "/privacy", label: "Privacy" },
              { to: "/terms", label: "Terms" },
              { to: "/refund", label: "Refund" },
            ].map((link) => (
              <motion.span key={link.to} whileHover={reduceMotion ? {} : { y: -2 }}>
                <Link to={link.to} className="hover:text-black transition text-gray-800">
                  {link.label}
                </Link>
              </motion.span>
            ))}

            <span className="hidden sm:inline text-black/10">|</span>
            <span className="text-gray-600">
              Crafted for a premium food experience.
            </span>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={
          showScrollTop
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0, pointerEvents: "none" }
        }
        whileHover={reduceMotion ? {} : { scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full text-white shadow-2xl transition bg-gradient-to-r from-[#C03327] to-[#7E2A17]"
        aria-label="Scroll to top"
      >
        <FiArrowUp className="text-xl" />
      </motion.button>
    </footer>
  );
}