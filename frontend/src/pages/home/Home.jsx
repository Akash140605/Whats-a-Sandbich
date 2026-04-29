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

import heroImg from "../../assets/lo.jpeg";

const DEFAULT_IMG =
  "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg";

const BRAND = {
  y1: "#FFF6C9",
  y2: "#FAD945",
  y3: "#FBD536",
  r1: "#C03327",
  r2: "#7E2A17",
  tomato: "#FF6347",
  soft: "#FFF8F7",
  white: "#FFFFFF",
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

function pickCategoryThumb(section) {
  const items = section?.items || [];
  for (const i of items) {
    const img = pickItemAnyImage(i);
    if (img && img !== DEFAULT_IMG) return img;
  }
  return pickItemAnyImage(items[0]) || DEFAULT_IMG;
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
      thumb: pickCategoryThumb(section),
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
          type: item.type,
        });
      }
      if (list.length >= 8) break;
    }
    return list;
  }, [filteredMenuData]);

  const heroSlides = useMemo(() => {
    const firstThreeItems = featuredItems.slice(0, 3);

    return [
      {
        id: 1,
        title: "What's A Sandwich!",
        image: heroImg,
        badge: "Flat 15% OFF",
      },
      {
        id: 2,
        title: firstThreeItems[0]?.name || "Loaded Burger",
        image: firstThreeItems[0]?.image || DEFAULT_IMG,
        badge: "Best Seller",
      },
      {
        id: 3,
        title: firstThreeItems[1]?.name || "Cheesy Wrap",
        image: firstThreeItems[1]?.image || DEFAULT_IMG,
        badge: "Chef Special",
      },
    ];
  }, [featuredItems]);

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
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
      {/* OFFER BAR */}
      <div className="relative z-10 shadow-2xl">
        <div
          className="px-4 sm:px-6 py-4"
          style={{
            background: `linear-gradient(90deg, ${BRAND.r1}, ${BRAND.r2}, ${BRAND.r1})`,
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap text-center">
            <RiDiscountPercentFill className="text-3xl text-[#FBD536]" />
            <div>
              <p className="text-white/85 text-[10px] sm:text-xs font-bold tracking-[0.2em]">
                LIMITED TIME OFFER
              </p>
              <h2 className="text-white text-lg sm:text-3xl font-black tracking-tight">
                FLAT 15% OFF ON ALL ITEMS!
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* HERO CAROUSEL */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/35 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
          <div className="relative p-3 sm:p-4">
            <div className="relative h-[220px] sm:h-[280px] md:h-[320px] rounded-[1.7rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroSlides[activeSlide]?.image}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={safeImg(heroSlides[activeSlide]?.image)}
                    alt={heroSlides[activeSlide]?.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_IMG;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-black/25" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] sm:text-xs font-black text-white shadow-lg backdrop-blur-md"
                  style={{
                    background: "rgba(0,0,0,0.25)",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <RiDiscountPercentFill className="text-sm" />
                  {heroSlides[activeSlide]?.badge}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 border border-white/70 text-gray-900 grid place-items-center shadow-lg active:scale-95"
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 border border-white/70 text-gray-900 grid place-items-center shadow-lg active:scale-95"
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>

              <div className="absolute left-3 right-3 bottom-3">
                <div className="rounded-[1.3rem] bg-white/88 backdrop-blur-xl border border-white/80 shadow-[0_14px_35px_rgba(0,0,0,0.18)] px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="text-[11px] sm:text-xs font-extrabold tracking-[0.18em] uppercase"
                      style={{ color: BRAND.r1 }}
                    >
                      Fresh • Premium
                    </p>
                    <h3 className="text-sm sm:text-lg font-black text-gray-900 truncate">
                      {heroSlides[activeSlide]?.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => goMenu(null)}
                    className="shrink-0 px-4 sm:px-5 py-2.5 rounded-2xl text-white text-xs sm:text-sm font-black shadow-lg active:scale-[0.98]"
                    style={{
                      background: `linear-gradient(90deg, ${BRAND.r1}, ${BRAND.r2})`,
                    }}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeSlide === idx ? "w-8 bg-[#C03327]" : "w-2.5 bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-5 pb-6">
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            goMenuWithSearch();
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white/96 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.12)] rounded-[1.6rem] sm:rounded-[1.8rem] flex items-center px-4 sm:px-6 py-3 sm:py-4 border border-white/80"
        >
          <div
            className="w-11 h-11 rounded-2xl grid place-items-center shadow-md"
            style={{
              background: `linear-gradient(135deg, ${BRAND.r1}, ${BRAND.r2})`,
            }}
          >
            <FiSearch className="text-white text-lg" />
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sandwiches, burgers, wraps..."
            className="w-full px-4 py-2 outline-none text-sm sm:text-lg bg-transparent font-semibold text-gray-900 placeholder:text-gray-500"
            aria-label="Search food"
          />

          <button
            type="submit"
            className="ml-2 px-4 sm:px-5 py-2.5 rounded-2xl text-white font-extrabold shadow-lg transition-all flex-shrink-0"
            style={{
              background: `linear-gradient(90deg, ${BRAND.r1}, ${BRAND.r2})`,
            }}
          >
            Search
          </button>
        </motion.form>
      </section>

      {/* CATEGORY SECTION */}
    {/* CATEGORY SECTION */}
<section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-8">
  <div className="flex items-center justify-between gap-4 flex-wrap mb-5 sm:mb-7">
    <div>
      <h2
        className="text-2xl sm:text-4xl font-black flex items-center gap-3 tracking-tight"
        style={{ color: BRAND.r2 }}
      >
        <FiTrendingUp style={{ color: BRAND.r1 }} />
        Browse Categories
      </h2>
      <p className="text-sm font-bold mt-1 text-gray-900/70">
        Pick your favourite and start ordering
      </p>
    </div>

    <button
      type="button"
      onClick={() => goMenu(null)}
      className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white border border-red-100 shadow-lg font-extrabold transition-all flex items-center gap-2"
      style={{ color: BRAND.r1 }}
    >
      View All <FiArrowRight />
    </button>
  </div>

  <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-3">
    {categories.map((category, i) => (
      <motion.button
        key={category.name}
        initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
        whileInView={
          reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
        }
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: reduceMotion ? 0 : i * 0.04, duration: 0.3 }}
        whileHover={reduceMotion ? {} : { y: -4, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => goMenu(category.name)}
        className="group text-center"
      >
        <div className="relative overflow-hidden rounded-[1.4rem] border border-red-200 bg-white shadow-[0_10px_24px_rgba(192,51,39,0.12)] px-2 py-3 sm:px-3 sm:py-4 min-h-[132px] sm:min-h-[142px]">
          <div className="absolute inset-x-0 top-0 h-11 bg-gradient-to-b from-red-50 to-white" />

          <div className="relative z-10 flex flex-col items-center">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl shadow-[0_10px_20px_rgba(192,51,39,0.28)] border-4 border-white group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #E53935, #B71C1C)",
              }}
            >
              {category.icon}
            </div>

            <h3 className="mt-3 text-[11px] sm:text-sm font-black text-[#7E2A17] leading-tight line-clamp-2 min-h-[30px] sm:min-h-[36px]">
              {category.shortName}
            </h3>

            <p className="mt-1 text-[10px] sm:text-xs font-bold text-red-600">
              {category.itemCount} items
            </p>
          </div>
        </div>
      </motion.button>
    ))}
  </div>
</section>


      {/* FEATURE STRIP */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-[1.6rem] bg-white/92 backdrop-blur-xl border border-white/90 shadow-[0_16px_35px_rgba(0,0,0,0.09)] p-5 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl grid place-items-center text-white shadow-lg"
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

          <div className="rounded-[1.6rem] bg-white/92 backdrop-blur-xl border border-white/90 shadow-[0_16px_35px_rgba(0,0,0,0.09)] p-5 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl grid place-items-center text-white shadow-lg"
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

          <div className="rounded-[1.6rem] bg-white/92 backdrop-blur-xl border border-white/90 shadow-[0_16px_35px_rgba(0,0,0,0.09)] p-5 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl grid place-items-center text-white shadow-lg"
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

      {/* FEATURED PICKS */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16">
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
            className="px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-lg font-extrabold transition-all flex items-center gap-2"
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
              whileHover={reduceMotion ? {} : { y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer rounded-[1.7rem] bg-white/96 backdrop-blur-xl border border-white/90 shadow-[0_18px_40px_rgba(0,0,0,0.10)] transition-all overflow-hidden text-left w-full"
            >
              <div className="relative h-28 sm:h-40 overflow-hidden">
                <img
                  src={safeImg(it.image)}
                  alt={it.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = DEFAULT_IMG)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 pointer-events-none" />
                <span
                  className="absolute top-3 right-3 text-[10px] font-black text-white px-3 py-1 rounded-full shadow-lg"
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
