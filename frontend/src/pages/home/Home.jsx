import { useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MENU_DATA } from "../../data/menu";
import { motion, useReducedMotion } from "framer-motion";
import { FiSearch, FiStar, FiClock, FiArrowRight, FiTrendingUp } from "react-icons/fi";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdRestaurant, MdFastfood, MdLocalDining, MdSetMeal } from "react-icons/md";
import { GiHamburger, GiFrenchFries, GiBowlOfRice } from "react-icons/gi";
import { BiDish } from "react-icons/bi";

import heroImg from "../../assets/lo.jpeg";

const DEFAULT_IMG = "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg";

const BRAND = {
  y1: "#FFF6C9",
  y2: "#FAD945",
  y3: "#FBD536",
  r1: "#C03327",
  r2: "#7E2A17",
  gold: "#D69E3D",
};

const categoryIcons = {
  "Submarine Sandwich": <MdRestaurant />,
  Burger: <GiHamburger />,
  "Cheese Tortilla Wraps": <MdFastfood />,
  Fries: <GiFrenchFries />,
  "Healthy Salad": <GiBowlOfRice />,
  Drinks: <MdLocalDining />,
  Combo: <MdSetMeal />,
  default: <BiDish />,
};

// Keep STATIC strings for Tailwind
const categoryGradients = {
  "Submarine Sandwich": "from-[#C03327] to-[#7E2A17]",
  Burger: "from-[#FBD536] to-[#D69E3D]",
  "Cheese Tortilla Wraps": "from-[#FAD945] to-[#C03327]",
  Fries: "from-[#FBD536] to-[#C03327]",
  "Healthy Salad": "from-[#FFF6C9] to-[#D69E3D]",
  Drinks: "from-[#FFF6C9] to-[#C03327]",
  Combo: "from-[#C03327] to-[#FBD536]",
  default: "from-[#FAD945] to-[#C03327]",
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function safeImg(src) {
  return src || DEFAULT_IMG;
}

function pickItemAnyImage(item) {
  return (
    item?.imageMini ||
    item?.imageSmall ||
    item?.imageMonster ||
    item?.image ||
    DEFAULT_IMG
  );
}

function pickCategoryThumb(section) {
  const items = section?.items || [];
  // Try to find any item with any kind of image field
  for (const i of items) {
    const img = pickItemAnyImage(i);
    if (img && img !== DEFAULT_IMG) return img;
  }
  // fallback
  return pickItemAnyImage(items[0]) || DEFAULT_IMG;
}

function pickDefaultPrice(item) {
  // default to 4-inch price if available
  return (
    item?.priceMini ??
    item?.priceSmall ??
    item?.price ??
    item?.priceMonster ??
    0
  );
}

export default function Home() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [search, setSearch] = useState("");

  const stats = useMemo(() => {
    const categoriesCount = MENU_DATA.length;
    const itemsCount = MENU_DATA.reduce((s, sec) => s + (sec.items?.length || 0), 0);
    return { categoriesCount, itemsCount };
  }, []);

  const categories = useMemo(() => {
    return MENU_DATA.map((section) => ({
      name: section.category,
      itemCount: section.items?.length || 0,
      icon: categoryIcons[section.category] || categoryIcons.default,
      gradient: categoryGradients[section.category] || categoryGradients.default,
      thumb: pickCategoryThumb(section),
    }));
  }, []);

  const featuredItems = useMemo(() => {
    const list = [];
    for (const sec of MENU_DATA) {
      for (const item of sec.items || []) {
        if (list.length >= 8) break;
        list.push({
          id: item.id ?? `${sec.category}-${item.name}`,
          name: item.name,
          price: pickDefaultPrice(item),
          image: pickItemAnyImage(item),
          category: sec.category,
          type: item.type,
        });
      }
      if (list.length >= 8) break;
    }
    return list;
  }, []);

  const goMenu = useCallback(
    (category) => {
      if (category) navigate("/menu", { state: { category } });
      else navigate("/menu");
    },
    [navigate]
  );

  const goMenuWithSearch = useCallback(() => {
    const q = search.trim();
    if (q) navigate("/menu", { state: { search: q } });
    else navigate("/menu");
  }, [navigate, search]);

  // Stable particles
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 10 + Math.random() * 18,
        duration: 3 + Math.random() * 3.2,
        delay: Math.random() * 2,
        drift: Math.random() * 50 - 25,
      })),
    []
  );

  return (
    <div
      className="min-h-screen overflow-hidden relative font-sans antialiased"
      style={{
        background: `linear-gradient(135deg, ${BRAND.y1}, ${BRAND.y2}, ${BRAND.y3})`,
      }}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { x: [0, 110, 0], y: [0, -90, 0], scale: [1, 1.22, 1] }
          }
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/45 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { x: [0, -85, 0], y: [0, 85, 0], scale: [1, 1.33, 1] }
          }
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute top-1/4 -right-32 h-80 w-80 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(192,51,39,0.25)" }}
        />
        <motion.div
          aria-hidden
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { x: [0, 65, 0], y: [0, -65, 0], scale: [1, 1.12, 1] }
          }
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
        />

        {particles.map((p) => (
          <motion.div
            key={p.id}
            aria-hidden
            animate={
              reduceMotion
                ? { opacity: 0.22 }
                : {
                    y: [0, -28, 0],
                    x: [0, p.drift, 0],
                    opacity: [0.14, 0.42, 0.14],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-white/25"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* TOP BANNER */}
      <motion.div
        initial={reduceMotion ? false : { y: -80, opacity: 0 }}
        animate={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="relative overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(90deg, ${BRAND.r1}, ${BRAND.r2}, ${BRAND.r1})` }}
          />
          <div className="absolute inset-0 pointer-events-none bg-black/10" />

          <motion.div
            aria-hidden
            animate={reduceMotion ? { opacity: 0 } : { x: ["-40%", "140%"] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "linear" }}
            className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
          />

          <div className="relative z-10 px-5 sm:px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap">
                <motion.div
                  aria-hidden
                  animate={reduceMotion ? { rotate: 0 } : { rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <RiDiscountPercentFill className="text-4xl text-[#FBD536] drop-shadow-lg" />
                </motion.div>

                <div className="text-center lg:text-left">
                  <p className="text-white/90 text-[11px] sm:text-xs font-bold tracking-[0.18em]">
                    LIMITED TIME OFFER
                  </p>
                  <motion.h2
                    animate={reduceMotion ? {} : { scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                    className="text-white text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none"
                    style={{ textShadow: "0 10px 25px rgba(0,0,0,0.35)" }}
                  >
                    FLAT 15% OFF ON ALL ITEMS!
                  </motion.h2>
                </div>

                <span className="inline-flex items-center rounded-full bg-white/15 border border-white/25 px-4 py-2 text-xs font-extrabold text-white shadow-lg">
                  Fast delivery • Best price
                </span>
              </div>

              <div className="flex justify-center lg:justify-end gap-3">
                <motion.button
                  whileHover={reduceMotion ? {} : { y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => goMenu(null)}
                  className="px-5 py-3 rounded-2xl bg-white text-gray-900 font-black shadow-xl hover:shadow-2xl transition focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                >
                  Explore Menu <FiArrowRight className="inline ml-2" />
                </motion.button>

                <motion.button
                  whileHover={reduceMotion ? {} : { y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/cart")}
                  className="px-5 py-3 rounded-2xl border border-white/35 bg-white/10 text-white font-black shadow-xl hover:bg-white/15 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                >
                  View Cart
                </motion.button>
              </div>
            </div>

            <p className="mt-2 text-center lg:text-left text-white/85 font-semibold text-xs sm:text-sm">
              Limited time offer! Order now and save big!
            </p>
          </div>
        </div>
      </motion.div>

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-5 sm:px-6 pt-10 sm:pt-14 pb-10 sm:pb-12 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Left */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10">
          <div className="rounded-[2rem] bg-white/65 backdrop-blur-xl border border-black/10 shadow-[0_30px_80px_rgba(0,0,0,0.16)] p-6 sm:p-9">
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs sm:text-sm font-extrabold shadow-lg border border-black/10"
              style={{ color: BRAND.r1 }}
            >
              <FiStar /> 4.9 Rated • Fast Delivery
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.02]"
              style={{ color: BRAND.r2 }}
            >
              What&apos;s A{" "}
              <span style={{ color: BRAND.r1, textShadow: "0 12px 32px rgba(0,0,0,0.18)" }}>
                Sandwich!
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-base sm:text-lg font-extrabold tracking-wide"
              style={{ color: BRAND.r2 }}
            >
              Nutritious • Delicious • Affordable
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-gray-900/80 max-w-xl text-sm sm:text-base leading-relaxed"
            >
              Premium handcrafted submarine sandwiches, burgers & cheese tortilla wraps with
              authentic street taste—fresh, crunchy, and made for your cravings.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-2xl bg-white/80 border border-black/10 px-4 py-2 text-xs sm:text-sm font-extrabold shadow-md"
                style={{ color: BRAND.r2 }}
              >
                <FiTrendingUp /> {stats.categoriesCount} Categories
              </span>
              <span
                className="inline-flex items-center gap-2 rounded-2xl bg-white/80 border border-black/10 px-4 py-2 text-xs sm:text-sm font-extrabold shadow-md"
                style={{ color: BRAND.r2 }}
              >
                <FiStar /> {stats.itemsCount}+ Items
              </span>
              <span
                className="inline-flex items-center gap-2 rounded-2xl bg-white/80 border border-black/10 px-4 py-2 text-xs sm:text-sm font-extrabold shadow-md"
                style={{ color: BRAND.r2 }}
              >
                <FiClock /> ~30 min Delivery
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex gap-3 sm:gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => goMenu(null)}
                className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-white text-base sm:text-lg font-black shadow-xl hover:shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/30"
                style={{ background: `linear-gradient(90deg, ${BRAND.r1}, ${BRAND.r2})` }}
              >
                Explore Menu
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl border-2 text-base sm:text-lg font-black bg-white/80 backdrop-blur-xl shadow-xl hover:bg-white hover:shadow-2xl transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/25"
                style={{ borderColor: BRAND.r2, color: BRAND.r2 }}
              >
                View Cart <FiArrowRight />
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: HERO IMAGE */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 18 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="absolute -inset-6 rounded-[3rem] blur-2xl" aria-hidden style={{ background: "rgba(255,255,255,0.22)" }} />

          <motion.div
            animate={reduceMotion ? {} : { y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="relative"
          >
            <div className="w-full max-w-[560px] mx-auto rounded-[2.75rem] shadow-2xl border-4 border-white bg-white/75 backdrop-blur-xl overflow-hidden">
              <div className="aspect-[4/5] p-3 grid place-items-center">
                <motion.img
                  whileHover={reduceMotion ? {} : { scale: 1.02, rotate: 0.4 }}
                  transition={{ duration: 0.25 }}
                  src={heroImg}
                  alt="hero"
                  loading="eager"
                  draggable={false}
                  className="w-full h-full object-contain rounded-[2.2rem]"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_IMG;
                  }}
                />
              </div>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-5 left-6 right-6"
            >
              <div className="rounded-2xl bg-white/92 backdrop-blur-xl border border-black/10 shadow-xl px-5 py-3 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-extrabold" style={{ color: BRAND.r1 }}>
                    Today’s Deal
                  </p>
                  <p className="text-sm font-black text-gray-900 truncate">
                    Flat 15% off on everything
                  </p>
                </div>
                <span
                  className="shrink-0 inline-flex items-center gap-2 rounded-full text-white px-4 py-2 text-xs font-black shadow-lg"
                  style={{ background: `linear-gradient(90deg, ${BRAND.r1}, ${BRAND.r2})` }}
                >
                  <RiDiscountPercentFill className="text-base" />
                  Save now
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* SEARCH */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 pb-10">
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            goMenuWithSearch();
          }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 10 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/92 backdrop-blur-xl shadow-2xl rounded-3xl flex items-center px-5 sm:px-6 py-3.5 sm:py-4 border border-black/10"
        >
          <FiSearch className="text-xl flex-shrink-0" style={{ color: BRAND.r1 }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your favourite food..."
            className="w-full px-4 py-2 outline-none text-sm sm:text-lg bg-transparent font-semibold text-gray-900 placeholder:text-gray-500"
            aria-label="Search food"
          />
          <button
            type="submit"
            className="ml-2 px-4 sm:px-5 py-2.5 rounded-2xl text-white font-extrabold shadow-lg hover:shadow-xl transition-all flex-shrink-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/30"
            style={{ background: `linear-gradient(90deg, ${BRAND.r1}, ${BRAND.r2})` }}
          >
            Search
          </button>
        </motion.form>
      </section>

      {/* CATEGORIES */}
      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pb-16">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8 sm:mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black flex items-center gap-3 tracking-tight" style={{ color: BRAND.r2 }}>
              <FiTrendingUp style={{ color: BRAND.r1 }} />
              Our Menu
            </h2>
            <p className="text-sm font-bold mt-1 text-gray-900/70">
              Explore our delicious categories
            </p>
          </div>

          <button
            type="button"
            onClick={() => goMenu(null)}
            className="px-5 py-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-black/10 shadow-lg font-extrabold hover:bg-white hover:shadow-xl transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/25"
            style={{ color: BRAND.r1 }}
          >
            View All <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: reduceMotion ? 0 : i * 0.06, duration: 0.45 }}
              whileHover={reduceMotion ? {} : { y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => goMenu(category.name)}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white/92 backdrop-blur-xl border border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.22)] transition-all duration-300">
                {/* background wash */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none`} />

                {/* photo */}
                <div className="absolute inset-0 opacity-[0.12] group-hover:opacity-[0.16] transition-opacity pointer-events-none">
                  <img
                    src={safeImg(category.thumb)}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = DEFAULT_IMG)}
                  />
                </div>

                {/* top badge */}
                <div className="absolute top-3 right-3 z-20">
                  <motion.span
                    animate={reduceMotion ? {} : { scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-extrabold text-white shadow-lg"
                    style={{ background: `linear-gradient(90deg, ${BRAND.r1}, ${BRAND.r2})` }}
                  >
                    15% OFF
                  </motion.span>
                </div>

                {/* content */}
                <div className="relative z-10 p-6 flex flex-col items-center text-center">
                  <motion.div
                    whileHover={reduceMotion ? {} : { rotate: 360, scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white text-4xl shadow-xl mb-4 transform-gpu`}
                    style={{
                      boxShadow: "0 10px 30px rgba(0,0,0,0.24), 0 0 0 4px rgba(255,255,255,0.18)",
                    }}
                  >
                    {category.icon}
                  </motion.div>

                  <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">
                    {category.name}
                  </h3>

                  <p className="text-sm font-extrabold mb-4" style={{ color: BRAND.r1 }}>
                    {category.itemCount} items available
                  </p>

                  <motion.button
                    type="button"
                    whileHover={reduceMotion ? {} : { scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className={`px-6 py-2.5 rounded-full bg-gradient-to-r ${category.gradient} text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.38)" }}
                  >
                    View Menu <FiArrowRight />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Picks */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 sm:mt-16"
        >
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black flex items-center gap-2 tracking-tight" style={{ color: BRAND.r2 }}>
                <FiStar style={{ color: BRAND.r1 }} /> Featured Picks
              </h3>
              <p className="text-sm font-bold text-gray-900/70 mt-1">
                Quick popular items to start with
              </p>
            </div>

            <button
              type="button"
              onClick={() => goMenu(null)}
              className="px-5 py-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-black/10 shadow-lg font-extrabold hover:bg-white hover:shadow-xl transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/25"
              style={{ color: BRAND.r1 }}
            >
              Browse more <FiArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {featuredItems.map((it) => (
              <button
                key={it.id}
                type="button"
                onClick={() => goMenu(it.category)}
                className="group cursor-pointer rounded-3xl bg-white/92 backdrop-blur-xl border border-white/70 shadow-[0_18px_50px_rgba(0,0,0,0.16)] hover:shadow-[0_26px_70px_rgba(0,0,0,0.22)] transition-all overflow-hidden text-left w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/25"
              >
                <div className="relative h-36">
                  <img
                    src={safeImg(it.image)}
                    alt={it.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = DEFAULT_IMG)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 pointer-events-none" />
                  <span
                    className="absolute top-3 right-3 text-[10px] font-black text-white px-3 py-1 rounded-full shadow-lg"
                    style={{ background: `linear-gradient(90deg, ${BRAND.r1}, ${BRAND.r2})` }}
                  >
                    15% OFF
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-xs font-extrabold" style={{ color: BRAND.r1 }}>
                    {it.category}
                  </p>
                  <h4 className="text-base font-black text-gray-900 mt-1 truncate tracking-tight">
                    {it.name}
                  </h4>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-black text-gray-900">₹{it.price}</span>
                    <span className="text-xs font-extrabold" style={{ color: BRAND.r1 }}>
                      View
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
