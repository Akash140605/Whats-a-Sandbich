import { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MENU_DATA } from "../../data/menu";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FiSearch,
  FiStar,
  FiArrowRight,
  FiTrendingUp,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiAward,
} from "react-icons/fi";
import { RiDiscountPercentFill } from "react-icons/ri";
import {
  MdRestaurant,
  MdFastfood,
  MdLocalDining,
  MdSetMeal,
} from "react-icons/md";
import { GiHamburger, GiFrenchFries, GiBowlOfRice } from "react-icons/gi";
import { BiDish } from "react-icons/bi";

import carImg from "../../assets/car.jpeg";
import frioImg from "../../assets/frio.jpeg";

const DEFAULT_IMG =
  "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg";

const BRAND = {
  y1: "#FFF8D9",
  y2: "#F7D94C",
  y3: "#F5CC2F",
  r1: "#B93228",
  r2: "#6E2316",
  tomato: "#FF6347",
  white: "#FFFFFF",
  ink: "#1F1B16",
  muted: "#6B625D",
  chip: "#FFF6EA",
  chipBorder: "#EBCB9E",
};

const REMOVED_CATEGORIES = [
  "Hero and Sidekicks",
  "Mini Hero and Sidekicks",
  "Superhero Panini",
  "Panini",
  "Panini Wraps",
  "Starters",
  "Cheesy Panini",
  "Extra Addons",
];

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

function pickDefaultPrice(item) {
  return (
    item?.priceMini ??
    item?.priceSmall ??
    item?.price ??
    item?.priceMonster ??
    0
  );
}

function shortCategoryLabel(name) {
  const map = {
    "Submarine Sandwich": "Sandwich",
    "Cheese Tortilla Wraps": "Wraps",
    "Healthy Salad": "Salad",
  };
  return map[name] || name;
}

export default function Home() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [search, setSearch] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

  const filteredMenuData = useMemo(() => {
    return MENU_DATA.filter(
      (section) => !REMOVED_CATEGORIES.includes(section.category)
    );
  }, []);

  const categories = useMemo(() => {
    return filteredMenuData.map((section) => ({
      name: section.category,
      shortName: shortCategoryLabel(section.category),
      itemCount: section.items?.length || 0,
      icon: categoryIcons[section.category] || categoryIcons.default,
    }));
  }, [filteredMenuData]);

  const featuredItems = useMemo(() => {
    const list = [];
    for (const sec of filteredMenuData) {
      for (const item of sec.items || []) {
        if (list.length >= 8) break;
        list.push({
          id: item.id ?? `${sec.category}-${item.name}`,
          name: item.name,
          price: pickDefaultPrice(item),
          image: pickItemAnyImage(item),
          category: sec.category,
        });
      }
      if (list.length >= 8) break;
    }
    return list;
  }, [filteredMenuData]);

  const heroSlides = useMemo(
    () => [
      { id: 1, image: carImg },
      { id: 2, image: frioImg },
    ],
    []
  );

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

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

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div
      className="min-h-screen overflow-hidden relative font-sans antialiased"
      style={{
        background: `linear-gradient(135deg, ${BRAND.y1}, ${BRAND.y2}, ${BRAND.y3})`,
      }}
    >
      <div className="relative z-10 shadow-xl">
        <div
          className="px-4 sm:px-6 py-3.5 sm:py-4"
          style={{
            background: `linear-gradient(90deg, ${BRAND.r1}, ${BRAND.r2}, ${BRAND.r1})`,
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap text-center">
            <RiDiscountPercentFill className="text-2xl sm:text-3xl text-[#FBD536]" />
            <div>
              <p className="text-white/85 text-[10px] sm:text-xs font-bold tracking-[0.2em]">
                LIMITED TIME OFFER
              </p>
              <h2 className="text-white text-base sm:text-2xl md:text-3xl font-black tracking-tight">
                FLAT 15% OFF ON ALL ITEMS!
              </h2>
            </div>
          </div>
        </div>
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-lg sm:rounded-xl border border-white/70 bg-white/40 backdrop-blur-2xl shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
          <div className="relative p-2.5 sm:p-3">
            <div className="relative h-[220px] sm:h-[320px] md:h-[430px] rounded-md sm:rounded-lg overflow-hidden bg-[linear-gradient(135deg,#fffaf0,#fff2cc)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroSlides[activeSlide]?.image}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-6"
                >
                  <img
                    src={safeImg(heroSlides[activeSlide]?.image)}
                    alt="Featured food"
                    className="w-full h-full object-contain"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_IMG;
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 sm:p-4">
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-white/95 border border-white text-gray-900 grid place-items-center shadow-lg active:scale-95"
                  aria-label="Previous slide"
                >
                  <FiChevronLeft className="text-lg" />
                </button>

                <button
                  onClick={nextSlide}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-white/95 border border-white text-gray-900 grid place-items-center shadow-lg active:scale-95"
                  aria-label="Next slide"
                >
                  <FiChevronRight className="text-lg" />
                </button>
              </div>
            </div>

            <div className="mt-3 flex justify-center gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-sm transition-all ${
                    activeSlide === idx ? "w-7 bg-[#B93228]" : "w-2 bg-white/90"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6 pt-5 pb-6">
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            goMenuWithSearch();
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-xl shadow-[0_14px_36px_rgba(0,0,0,0.10)] rounded-lg sm:rounded-xl flex items-center gap-3 px-3 sm:px-5 py-3 border border-white/90"
        >
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-md grid place-items-center shadow-md flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${BRAND.r1}, ${BRAND.r2})`,
            }}
          >
            <FiSearch className="text-white text-base sm:text-lg" />
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sandwiches, burgers, wraps..."
            className="w-full min-w-0 px-1 py-2 outline-none text-sm sm:text-base bg-transparent font-semibold text-gray-900 placeholder:text-gray-400"
            aria-label="Search food"
          />

          <button
            type="submit"
            className="px-4 sm:px-5 py-2.5 rounded-md sm:rounded-lg text-white font-extrabold shadow-lg transition-all flex-shrink-0 text-sm sm:text-base"
            style={{
              background: `linear-gradient(90deg, ${BRAND.r1}, ${BRAND.r2})`,
            }}
          >
            Search
          </button>
        </motion.form>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 pb-8">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-5 sm:mb-6">
          <div>
            <h2
              className="text-2xl sm:text-4xl font-black flex items-center gap-3 tracking-tight"
              style={{ color: BRAND.r2 }}
            >
              <FiTrendingUp style={{ color: BRAND.r1 }} />
              Browse Categories
            </h2>
            <p className="text-sm font-bold mt-1 text-gray-900/70">
              Quick access to your favourites
            </p>
          </div>

          <button
            type="button"
            onClick={() => goMenu(null)}
            className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-md sm:rounded-lg bg-white border border-red-100 shadow-lg font-extrabold transition-all flex items-center gap-2"
            style={{ color: BRAND.r1 }}
          >
            View All <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3">
          {categories.map((category, i) => (
            <motion.button
              key={category.name}
              initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
              whileInView={
                reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: reduceMotion ? 0 : i * 0.03, duration: 0.22 }}
              whileHover={reduceMotion ? {} : { y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goMenu(category.name)}
              className="group"
            >
              <div
                className="h-[92px] sm:h-[100px] rounded-lg border shadow-[0_10px_22px_rgba(185,50,40,0.10)] px-2 py-2.5 flex flex-col items-center justify-center text-center transition-all"
                style={{
                  background: `linear-gradient(180deg, #ffffff, ${BRAND.chip})`,
                  borderColor: BRAND.chipBorder,
                }}
              >
                <motion.div
                  whileHover={reduceMotion ? {} : { scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14 }}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-md flex items-center justify-center text-white text-lg sm:text-xl shadow-md mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.r1}, ${BRAND.r2})`,
                  }}
                >
                  {category.icon}
                </motion.div>

                <p className="text-[10px] sm:text-xs font-black text-[#6E2316] leading-tight line-clamp-2 min-h-[24px] flex items-center">
                  {category.shortName}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-white/92 backdrop-blur-xl border border-white/90 shadow-[0_16px_35px_rgba(0,0,0,0.08)] p-5 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-md grid place-items-center text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${BRAND.r1}, ${BRAND.r2})` }}
            >
              <FiHeart className="text-xl" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">Loved Flavours</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-700/80">
                Tasty picks people keep coming back for
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-white/92 backdrop-blur-xl border border-white/90 shadow-[0_16px_35px_rgba(0,0,0,0.08)] p-5 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-md grid place-items-center text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${BRAND.y2}, ${BRAND.r1})` }}
            >
              <FiAward className="text-xl" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">Clean Quality</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-700/80">
                Bright, fresh and premium menu presentation
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-white/92 backdrop-blur-xl border border-white/90 shadow-[0_16px_35px_rgba(0,0,0,0.08)] p-5 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-md grid place-items-center text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${BRAND.r1}, ${BRAND.tomato})` }}
            >
              <FiStar className="text-xl" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900">Top Picks</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-700/80">
                Curated popular menu items for quick ordering
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 pb-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h3
              className="text-2xl sm:text-3xl font-black flex items-center gap-2 tracking-tight"
              style={{ color: BRAND.r2 }}
            >
              <FiStar style={{ color: BRAND.r1 }} /> Featured Picks
            </h3>
            <p className="text-sm font-bold text-gray-900/70 mt-1">
              Quick popular items to start with
            </p>
          </div>

          <button
            type="button"
            onClick={() => goMenu(null)}
            className="px-5 py-3 rounded-md sm:rounded-lg bg-white/95 backdrop-blur-xl border border-white/80 shadow-lg font-extrabold transition-all flex items-center gap-2"
            style={{ color: BRAND.r1 }}
          >
            Browse more <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {featuredItems.map((it) => (
            <motion.button
              key={it.id}
              type="button"
              onClick={() => goMenu(it.category)}
              whileHover={reduceMotion ? {} : { y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer rounded-lg bg-white/96 backdrop-blur-xl border border-white/90 shadow-[0_16px_34px_rgba(0,0,0,0.10)] transition-all overflow-hidden text-left w-full"
            >
              <div className="relative h-28 sm:h-40 overflow-hidden bg-[#fff7ef]">
                <img
                  src={safeImg(it.image)}
                  alt={it.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => (e.currentTarget.src = DEFAULT_IMG)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 pointer-events-none" />
                <span
                  className="absolute top-3 right-3 text-[10px] font-black text-white px-3 py-1 rounded-sm shadow-lg"
                  style={{
                    background: `linear-gradient(90deg, ${BRAND.r1}, ${BRAND.r2})`,
                  }}
                >
                  15% OFF
                </span>
              </div>

              <div className="p-3 sm:p-4">
                <p className="text-[10px] sm:text-xs font-extrabold" style={{ color: BRAND.r1 }}>
                  {it.category}
                </p>
                <h4 className="text-sm sm:text-base font-black text-gray-900 mt-1 truncate tracking-tight">
                  {it.name}
                </h4>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-black text-gray-900">₹{it.price}</span>
                  <span className="text-[11px] sm:text-xs font-extrabold" style={{ color: BRAND.r1 }}>
                    View
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}