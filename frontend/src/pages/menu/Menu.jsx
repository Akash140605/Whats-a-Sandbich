import { useState, useEffect, useRef, useMemo } from "react";
import { MENU_DATA } from "../../data/menu";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";

/* DEFAULT FALLBACK IMAGE (if item.image missing) */
const DEFAULT_IMAGE =
  "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg";

// Safe price parse (handles number / numeric string)
const parsePrice = (v) => {
  if (v == null) return 0;
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  const n = Number(String(v).replace(/[^0-9.-]+/g, ""));
  return Number.isFinite(n) ? n : 0;
};

// 30% discount helper
const applyDiscount = (originalPrice) => Math.round(parsePrice(originalPrice) * 0.7);

// Sizes
const SIZE_4 = "4 Inches";
const SIZE_8 = "8 Inches";

export default function Menu() {
  const { addItem, cart, total } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const initialCategory = location.state?.category ?? "All";
  const initialSearch = location.state?.search ?? "";

  const [search, setSearch] = useState(initialSearch);
  const [filter, setFilter] = useState("all"); // all | veg | nonveg
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [showFilters, setShowFilters] = useState(false);

  const sectionRefs = useRef({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const categories = useMemo(() => ["All", ...MENU_DATA.map((s) => s.category)], []);

  // Total items = sum of qty
  const totalItems = useMemo(() => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((s, i) => s + (Number(i?.qty) || 1), 0);
  }, [cart]);

  // qty map by id (your cart uses id = `${baseId}-${sizeKey}`)
  const qtyById = useMemo(() => {
    const m = new Map();
    (Array.isArray(cart) ? cart : []).forEach((it) => {
      const id = String(it?.id ?? "");
      const q = Number(it?.qty) || 1;
      if (!id) return;
      m.set(id, (m.get(id) || 0) + q);
    });
    return m;
  }, [cart]);

  const resetAll = () => {
    setSearch("");
    setFilter("all");
    setActiveCategory("All");
    setShowFilters(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearCategory = () => {
    setActiveCategory("All");
    setShowFilters(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearType = () => setFilter("all");
  const clearSearch = () => setSearch("");

  const scrollToCategory = (catName) => {
    setActiveCategory(catName);
    setShowFilters(false);

    if (catName === "All") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = sectionRefs.current[catName];
    if (el) {
      const headerOffset = 150;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!initialCategory || initialCategory === "All") return;
    const t = setTimeout(() => scrollToCategory(initialCategory), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory]);

  const filteredMenu = useMemo(() => {
    const q = search.trim().toLowerCase();

    return MENU_DATA.map((section) => {
      const categoryAllowed =
        activeCategory === "All" || section.category === activeCategory;

      const items = (section.items || []).filter((item) => {
        const matchSearch = !q || (item.name || "").toLowerCase().includes(q);

        const matchFilter =
          filter === "all" ||
          (filter === "veg" && item.type === "veg") ||
          (filter === "nonveg" && item.type === "nonveg");

        return categoryAllowed && matchSearch && matchFilter;
      });

      return { ...section, items };
    });
  }, [search, filter, activeCategory]);

  const hasAnyApplied =
    Boolean(search.trim()) || filter !== "all" || activeCategory !== "All";

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#fbd536] to-[#f9c130]"
      style={{ paddingBottom: "calc(var(--bottom-nav-h, 64px) + 180px)" }}
    >
      {/* HEADER */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/95 backdrop-blur-xl border-b sticky top-0 z-30 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">
              What's A Sandwich – Greater Noida
            </h1>

            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-extrabold shadow-lg hover:bg-red-700 hover:shadow-xl transition-all"
            >
              Cart ({totalItems})
            </button>
          </div>

          <motion.input
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food"
            className="w-full px-4 py-2 rounded-xl border-2 focus:ring-2 focus:ring-red-500 outline-none shadow-sm"
          />

          {/* VEG/NONVEG FILTERS + CATEGORY TOGGLE + CLEAR */}
          <div className="flex gap-2 items-center flex-wrap">
            {["all", "veg", "nonveg"].map((f) => (
              <FilterBtn key={f} active={filter === f} onClick={() => setFilter(f)}>
                {f === "all" ? "ALL" : f === "veg" ? "VEG" : "NON-VEG"}
              </FilterBtn>
            ))}

            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="ml-auto px-4 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <FiFilter />
              Categories
            </button>

            <button
              type="button"
              onClick={resetAll}
              className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-white text-gray-800 border-2 border-gray-200 hover:bg-gray-50 shadow-md flex items-center gap-2"
            >
              <FiX />
              Clear
            </button>
          </div>

          {/* Applied filters bar */}
          {hasAnyApplied && (
            <div className="flex gap-2 flex-wrap items-center pt-1">
              {activeCategory !== "All" && (
                <AppliedChip
                  label={`Category: ${activeCategory}`}
                  onRemove={clearCategory}
                />
              )}
              {filter !== "all" && (
                <AppliedChip
                  label={`Type: ${filter.toUpperCase()}`}
                  onRemove={clearType}
                />
              )}
              {Boolean(search.trim()) && (
                <AppliedChip label={`Search: ${search.trim()}`} onRemove={clearSearch} />
              )}

              <button
                type="button"
                onClick={resetAll}
                className="ml-auto text-xs font-extrabold text-red-700 hover:text-red-800 underline underline-offset-4"
              >
                Clear all
              </button>
            </div>
          )}

          {/* CATEGORY CHIPS (Dropdown) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 pt-2">
                  {categories.map((c) => (
                    <FilterBtn
                      key={c}
                      active={activeCategory === c}
                      onClick={() => scrollToCategory(c)}
                    >
                      {c.toUpperCase()}
                    </FilterBtn>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* MENU */}
      <div className="max-w-7xl mx-auto px-3 py-6 space-y-12">
        {filteredMenu.map((section) => {
          if (!section.items.length) return null;

          return (
            <div
              key={section.category}
              ref={(el) => {
                sectionRefs.current[section.category] = el;
              }}
            >
              <h2 className="text-lg md:text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-red-600 rounded-full" />
                {section.category}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(loading ? [...Array(6)] : section.items).map((item, idx) =>
                  loading ? (
                    <SkeletonCard key={idx} />
                  ) : (
                    <motion.div
                      key={item.id ?? `${section.category}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                    >
                      <FoodCard
                        item={item}
                        sectionCategory={section.category}   // ✅ important
                        addItem={addItem}
                        qtyById={qtyById}
                      />
                    </motion.div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FIXED MOBILE CART BAR */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed left-4 right-4 md:hidden z-[55]"
            style={{
              bottom:
                "calc(var(--bottom-nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 12px)",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/cart")}
              className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-4 flex justify-between items-center shadow-2xl border-2 border-white cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate("/cart");
              }}
              aria-label="Open cart"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-red-600 font-extrabold text-lg shadow-lg"
                >
                  {totalItems}
                </motion.div>

                <div>
                  <p className="text-white/90 text-xs font-bold">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </p>
                  <p className="text-white font-extrabold text-xl">₹{total}</p>
                </div>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-red-600 font-extrabold rounded-xl shadow-lg"
              >
                View Cart
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FoodCard({ item, sectionCategory, addItem, qtyById }) {
  const isSubmarine = sectionCategory === "Submarine Sandwich";
  const [size, setSize] = useState(SIZE_4);

  // For non-submarine legacy behavior
  const hasMonster = item?.priceMonster != null;
  const hasFourInchPrice = item?.priceMini != null || item?.priceSmall != null;

  const inferred8Only =
    !hasMonster &&
    !hasFourInchPrice &&
    item?.price != null &&
    /8\s*inch/i.test(String(item?.name ?? ""));

  // Show toggle rules
  const showSizeToggle = isSubmarine || hasMonster;

  // Select image based on size (supports your submarine new image fields)
  const getImageBySize = () => {
    if (isSubmarine) {
      if (size === SIZE_8) return item?.imageMonster || item?.image || DEFAULT_IMAGE;
      return item?.imageMini || item?.imageSmall || item?.image || DEFAULT_IMAGE;
    }
    return item?.image || DEFAULT_IMAGE;
  };

  // Select price based on size
  const getOriginalPrice = () => {
    if (isSubmarine) {
      const four = parsePrice(item?.priceMini ?? item?.priceSmall ?? item?.price ?? 0);
      const eight = parsePrice(item?.priceMonster ?? item?.price ?? four);
      return size === SIZE_8 ? eight : four;
    }

    const effectiveSize = inferred8Only ? SIZE_8 : size;

    return effectiveSize === SIZE_8
      ? parsePrice(item?.priceMonster ?? item?.price)
      : parsePrice(item?.priceMini ?? item?.priceSmall ?? item?.price ?? 0);
  };

  const originalPrice = getOriginalPrice();
  const discountedPrice = applyDiscount(originalPrice);

  // Variant id so 4-inch and 8-inch don't collide
  const baseId = String(item?.id ?? item?.name ?? "item");
  const sizeKey = size === SIZE_8 ? "8in" : "4in";
  const cartId = `${baseId}-${sizeKey}`;

  const currentQty = qtyById?.get(cartId) || 0;
  const cardImg = getImageBySize();

  return (
    <div className="bg-white border-2 rounded-2xl transition-all p-3 flex gap-3 hover:shadow-2xl relative group">
      {/* 30% OFF Badge */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-extrabold px-2 py-1 rounded-lg shadow-lg z-10"
      >
        30% OFF
      </motion.div>

      <img
        src={cardImg}
        alt={item?.name ?? "Food"}
        loading="lazy"
        className="w-24 h-24 object-cover rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform"
        onError={(e) => {
          e.currentTarget.src = DEFAULT_IMAGE;
        }}
      />

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-extrabold text-sm md:text-base truncate text-gray-900">
            {item?.name}
          </h3>
          <p className="text-xs text-gray-600">Fresh • Hygienic • Tasty</p>

          {showSizeToggle && (
            <div className="mt-2 flex gap-1 flex-wrap">
              <SizeBtn active={size === SIZE_4} onClick={() => setSize(SIZE_4)}>
                4 Inches
              </SizeBtn>

              <SizeBtn active={size === SIZE_8} onClick={() => setSize(SIZE_8)}>
                8 Inches
              </SizeBtn>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            <span className="text-xs text-gray-500 line-through mr-2">
              ₹{originalPrice}
            </span>
            <span className="font-extrabold text-red-600">₹{discountedPrice}</span>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              addItem({
                id: cartId,
                name: item?.name,
                price: discountedPrice,
                size: inferred8Only ? SIZE_8 : size,
                image: cardImg,
              })
            }
            className="px-3 py-1 text-xs bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-extrabold shadow-lg"
          >
            {currentQty > 0 ? `Add (${currentQty})` : "Add"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function FilterBtn({ active, children, onClick }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`px-4 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all shadow-md ${
        active
          ? "bg-red-600 text-white shadow-xl"
          : "bg-white text-gray-800 hover:bg-gray-100"
      }`}
    >
      {children}
    </motion.button>
  );
}

function AppliedChip({ label, onRemove }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border-2 border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition text-xs font-extrabold text-gray-800 max-w-full"
      title="Remove filter"
    >
      <span className="truncate max-w-[220px]">{label}</span>
      <span className="grid place-items-center w-5 h-5 rounded-full bg-red-50 text-red-700 group-hover:bg-red-100 transition">
        <FiX />
      </span>
    </button>
  );
}

function SizeBtn({ active, children, onClick }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border transition ${
        active
          ? "bg-red-600 text-white border-red-600"
          : "bg-white text-gray-700 border-gray-300"
      }`}
    >
      {children}
    </motion.button>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white border-2 rounded-2xl p-3 animate-pulse flex gap-3">
      <div className="w-24 h-24 bg-gray-200 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-6 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}
