import { useState, useEffect, useRef, useMemo } from "react";
import { MENU_DATA } from "../../data/menu";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";

const DEFAULT_IMAGE =
  "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg";

const parsePrice = (v) => {
  if (v == null) return 0;
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  const n = Number(String(v).replace(/[^0-9.-]+/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const applyDiscount = (originalPrice) =>
  Math.round(parsePrice(originalPrice) * 0.85);

const SIZE_4 = "4 Inches";
const SIZE_8 = "8 Inches";

const BREAD_REGULAR = "Regular";
const BREAD_BROWN = "Brown Bread";
const BREAD_ORGANIC = "Organic";
const BREAD_MULTIGRAINS = "Multigrains";

const FRIES_SMALL = "Small";
const FRIES_MEDIUM = "Medium";
const FRIES_LARGE = "Large";

const BREAD_EXTRA = 20;

const normalize = (v = "") => String(v).trim().toLowerCase();

const dedupeMenuData = (data) => {
  const seen = new Set();

  return (Array.isArray(data) ? data : []).map((section) => {
    const items = (section.items || []).filter((item, idx) => {
      const key = `${normalize(section.category)}|${normalize(item?.id ?? "")}|${normalize(
        item?.name ?? idx
      )}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return { ...section, items };
  });
};

export default function Menu() {
  const { addItem, cart, total } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const initialCategory = location.state?.category ?? "All";
  const initialSearch = location.state?.search ?? "";

  const [search, setSearch] = useState(initialSearch);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [showFilters, setShowFilters] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const sectionRefs = useRef({});

  const safeMenuData = useMemo(() => dedupeMenuData(MENU_DATA), []);
  const categories = useMemo(() => ["All", ...safeMenuData.map((s) => s.category)], [safeMenuData]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const totalItems = useMemo(() => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((s, i) => s + (Number(i?.qty) || 1), 0);
  }, [cart]);

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
  }, [initialCategory]);

  const filteredMenu = useMemo(() => {
    const q = search.trim().toLowerCase();

    return safeMenuData.map((section) => {
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
  }, [search, filter, activeCategory, safeMenuData]);

  const hasAnyApplied =
    Boolean(search.trim()) || filter !== "all" || activeCategory !== "All";

  const openCustomizeModal = (payload) => {
    setSelectedItem(payload);
    setModalOpen(true);
  };

  const closeCustomizeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedItem(null), 200);
  };

  const handleAddToCart = (payload) => {
    addItem(payload);
    closeCustomizeModal();
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#fbd536] to-[#f9c130]"
      style={{ paddingBottom: "calc(var(--bottom-nav-h, 64px) + 180px)" }}
    >
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
                      key={`${item.id ?? item.name ?? idx}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                    >
                      <FoodCard
                        item={item}
                        sectionCategory={section.category}
                        qtyById={qtyById}
                        openCustomizeModal={openCustomizeModal}
                      />
                    </motion.div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {modalOpen && selectedItem && (
          <CustomizeModal
            itemData={selectedItem}
            onClose={closeCustomizeModal}
            onAdd={handleAddToCart}
          />
        )}
      </AnimatePresence>

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

function FoodCard({ item, sectionCategory, qtyById, openCustomizeModal }) {
  const isSubmarine = sectionCategory === "Submarine Sandwich";
  const isFries = sectionCategory === "Fries";
  const isSliced = sectionCategory === "Sliced Sandwich";
  const isFryoTower = /fryo tower/i.test(String(item?.name ?? ""));

  const [size, setSize] = useState(SIZE_4);
  const [friesSize, setFriesSize] = useState(FRIES_SMALL);
  const [breadType, setBreadType] = useState(BREAD_REGULAR);

  const name = String(item?.name ?? "");
  const isSimpleVeg = /simple veg slice/i.test(name);
  const isLoadedCheesy = /loaded cheesy/i.test(name);
  const isRegularFries = /regular fries/i.test(name);

  const hasMonster = item?.priceMonster != null;
  const hasFourInchPrice = item?.priceMini != null || item?.priceSmall != null;

  const inferred8Only =
    !hasMonster &&
    !hasFourInchPrice &&
    item?.price != null &&
    /8\s*inch/i.test(String(item?.name ?? ""));

  const showSizeToggle = isSubmarine || hasMonster;
  const showBreadOptions = isSubmarine || isSliced;
  const showFriesOptions = isFries && isRegularFries;

  const getImageBySize = () => {
    if (isSubmarine) {
      if (size === SIZE_8) return item?.imageMonster || item?.image || DEFAULT_IMAGE;
      return item?.imageMini || item?.imageSmall || item?.image || DEFAULT_IMAGE;
    }
    return item?.image || DEFAULT_IMAGE;
  };

  const getBasePrice = () => {
    if (isSimpleVeg) return 39;
    if (isLoadedCheesy) return 89;

    if (showFriesOptions) {
      if (friesSize === FRIES_SMALL) return 69;
      if (friesSize === FRIES_MEDIUM) return 99;
      return 129;
    }

    if (isFryoTower) {
      return parsePrice(item?.price ?? 99);
    }

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

  const shouldApplyDiscount = () => {
    if (isFries) return false;
    if (isSimpleVeg) return false;
    if (isLoadedCheesy) return false;
    if (isSubmarine && size === SIZE_4) return false;
    if (!isSubmarine && size === SIZE_4 && !inferred8Only && hasFourInchPrice) return false;
    return true;
  };

  const breadExtra = showBreadOptions && breadType !== BREAD_REGULAR ? BREAD_EXTRA : 0;
  const baseOriginalPrice = getBasePrice();
  const discountedBasePrice = shouldApplyDiscount()
    ? applyDiscount(baseOriginalPrice)
    : baseOriginalPrice;
  const finalPrice = discountedBasePrice + breadExtra;
  const cardImg = getImageBySize();

  const variantParts = [];
  if (showFriesOptions) variantParts.push(friesSize);
  if (showSizeToggle) variantParts.push(inferred8Only ? SIZE_8 : size);
  if (showBreadOptions) variantParts.push(breadType);

  const baseId = String(item?.id ?? item?.name ?? "item");
  const cartId = `${baseId}-${variantParts.join("-").replace(/\s+/g, "_") || "default"}`;
  const currentQty = qtyById?.get(cartId) || 0;

  const handleOpen = () => {
    openCustomizeModal({
      item,
      sectionCategory,
      defaults: {
        size,
        friesSize,
        breadType,
        fryoVariant: item?.variants?.[0]?.label ?? "Classic Fryo Tower",
        fryoSauce: item?.sauces?.[0] ?? "White Cheese",
        extraSauce: false,
      },
      cardImg,
      hasMeta: {
        isSubmarine,
        isFries,
        isSliced,
        isSimpleVeg,
        isLoadedCheesy,
        isRegularFries,
        isFryoTower,
        showSizeToggle,
        showBreadOptions,
        showFriesOptions,
        inferred8Only,
        hasFourInchPrice,
      },
    });
  };

  return (
    <div className="bg-white border-2 rounded-2xl transition-all p-3 flex gap-3 hover:shadow-2xl relative group">
      {shouldApplyDiscount() && (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-extrabold px-2 py-1 rounded-lg shadow-lg z-10"
        >
          15% OFF
        </motion.div>
      )}

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

          {showSizeToggle && !showFriesOptions && !isFryoTower && (
            <div className="mt-2 flex gap-1 flex-wrap">
              <SizeBtn active={size === SIZE_4} onClick={() => setSize(SIZE_4)}>
                4 Inches
              </SizeBtn>
              <SizeBtn active={size === SIZE_8} onClick={() => setSize(SIZE_8)}>
                8 Inches
              </SizeBtn>
            </div>
          )}

          {showFriesOptions && (
            <div className="mt-2 flex gap-1 flex-wrap">
              <SizeBtn active={friesSize === FRIES_SMALL} onClick={() => setFriesSize(FRIES_SMALL)}>
                Small
              </SizeBtn>
              <SizeBtn active={friesSize === FRIES_MEDIUM} onClick={() => setFriesSize(FRIES_MEDIUM)}>
                Medium
              </SizeBtn>
              <SizeBtn active={friesSize === FRIES_LARGE} onClick={() => setFriesSize(FRIES_LARGE)}>
                Large
              </SizeBtn>
            </div>
          )}

          {isFryoTower && (
            <div className="mt-2">
              <span className="inline-block px-2 py-1 rounded-md bg-orange-50 text-orange-700 text-[10px] font-extrabold">
                3 Variants Available
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            {finalPrice !== baseOriginalPrice + breadExtra && (
              <span className="text-xs text-gray-500 line-through mr-2">
                ₹{baseOriginalPrice + breadExtra}
              </span>
            )}
            <span className="font-extrabold text-red-600">₹{finalPrice}</span>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleOpen}
            className="px-3 py-1 text-xs bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-extrabold shadow-lg"
          >
            {currentQty > 0 ? `Add (${currentQty})` : "Add"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function CustomizeModal({ itemData, onClose, onAdd }) {
  const { item, sectionCategory, defaults, hasMeta } = itemData;

  const [size, setSize] = useState(defaults?.size ?? SIZE_4);
  const [friesSize, setFriesSize] = useState(defaults?.friesSize ?? FRIES_SMALL);
  const [breadType, setBreadType] = useState(defaults?.breadType ?? BREAD_REGULAR);
  const [fryoVariant, setFryoVariant] = useState(
    defaults?.fryoVariant ?? item?.variants?.[0]?.label ?? "Classic Fryo Tower"
  );
  const [fryoSauce, setFryoSauce] = useState(
    defaults?.fryoSauce ?? item?.sauces?.[0] ?? "White Cheese"
  );
  const [extraSauce, setExtraSauce] = useState(defaults?.extraSauce ?? false);

  const {
    isSubmarine,
    isSliced,
    isSimpleVeg,
    isLoadedCheesy,
    isRegularFries,
    isFryoTower,
    showSizeToggle,
    showBreadOptions,
    showFriesOptions,
    inferred8Only,
    hasFourInchPrice,
  } = hasMeta;

  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, []);

  const getImageBySize = () => {
    if (isSubmarine) {
      if (size === SIZE_8) return item?.imageMonster || item?.image || DEFAULT_IMAGE;
      return item?.imageMini || item?.imageSmall || item?.image || DEFAULT_IMAGE;
    }
    return item?.image || DEFAULT_IMAGE;
  };

  const getBasePrice = () => {
    if (isSimpleVeg) return 39;
    if (isLoadedCheesy) return 89;

    if (showFriesOptions) {
      if (friesSize === FRIES_SMALL) return 69;
      if (friesSize === FRIES_MEDIUM) return 99;
      return 129;
    }

    if (isFryoTower) {
      const found = (item?.variants || []).find((v) => v.label === fryoVariant);
      return parsePrice(found?.price ?? item?.price ?? 99);
    }

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

  const shouldApplyDiscount = () => {
    if (normalize(sectionCategory) === "fries") return false;
    if (isSimpleVeg) return false;
    if (isLoadedCheesy) return false;
    if (isSubmarine && size === SIZE_4) return false;
    if (!isSubmarine && size === SIZE_4 && !inferred8Only && hasFourInchPrice) return false;
    return true;
  };

  const breadExtra = showBreadOptions && breadType !== BREAD_REGULAR ? BREAD_EXTRA : 0;
  const sauceExtra = isFryoTower && extraSauce ? parsePrice(item?.extraSaucePrice ?? 20) : 0;

  const basePrice = getBasePrice();
  const finalBasePrice = shouldApplyDiscount() ? applyDiscount(basePrice) : basePrice;
  const finalPrice = finalBasePrice + breadExtra + sauceExtra;
  const cardImg = getImageBySize();

  const variantParts = [];
  if (showFriesOptions) variantParts.push(friesSize);
  if (isFryoTower) {
    variantParts.push(fryoVariant);
    variantParts.push(fryoSauce);
    if (extraSauce) variantParts.push("ExtraSauce");
  }
  if (showSizeToggle && !isFryoTower) variantParts.push(inferred8Only ? SIZE_8 : size);
  if (showBreadOptions) variantParts.push(breadType);

  const baseId = String(item?.id ?? item?.name ?? "item");
  const cartId = `${baseId}-${variantParts.join("-").replace(/\s+/g, "_") || "default"}`;

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-black/60 flex items-end sm:items-center justify-center p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-5 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900">{item?.name}</h3>
            <p className="text-sm text-gray-500">Customize your order</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 text-gray-700 grid place-items-center"
          >
            <FiX />
          </button>
        </div>

        <img
          src={cardImg}
          alt={item?.name ?? "Food"}
          className="w-full h-44 object-cover rounded-2xl mt-4"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />

        {showFriesOptions && (
          <div className="mt-5">
            <p className="text-sm font-extrabold text-gray-900 mb-2">Choose Fries Size</p>
            <div className="flex gap-2 flex-wrap">
              <SizeBtn active={friesSize === FRIES_SMALL} onClick={() => setFriesSize(FRIES_SMALL)}>
                Small ₹69
              </SizeBtn>
              <SizeBtn active={friesSize === FRIES_MEDIUM} onClick={() => setFriesSize(FRIES_MEDIUM)}>
                Medium ₹99
              </SizeBtn>
              <SizeBtn active={friesSize === FRIES_LARGE} onClick={() => setFriesSize(FRIES_LARGE)}>
                Large ₹129
              </SizeBtn>
            </div>
          </div>
        )}

        {isFryoTower && (
          <>
            <div className="mt-5">
              <p className="text-sm font-extrabold text-gray-900 mb-2">Choose Variant</p>
              <div className="space-y-2">
                {(item?.variants || []).map((variant) => (
                  <label
                    key={variant.label}
                    className={`flex items-center justify-between border rounded-2xl px-4 py-3 cursor-pointer transition ${
                      fryoVariant === variant.label
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`fryo-variant-${baseId}`}
                        checked={fryoVariant === variant.label}
                        onChange={() => setFryoVariant(variant.label)}
                        className="accent-red-600"
                      />
                      <span className="font-bold text-sm text-gray-800">{variant.label}</span>
                    </div>
                    <span className="text-sm font-extrabold text-red-600">₹{variant.price}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-extrabold text-gray-900 mb-2">Choose Sauce</p>
              <div className="grid grid-cols-2 gap-2">
                {(item?.sauces || []).map((sauce) => (
                  <button
                    key={sauce}
                    type="button"
                    onClick={() => setFryoSauce(sauce)}
                    className={`px-3 py-2 rounded-xl text-xs font-extrabold border ${
                      fryoSauce === sauce
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {sauce}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center justify-between border rounded-2xl px-4 py-3 cursor-pointer">
                <div>
                  <p className="font-bold text-sm text-gray-800">Extra Sauce</p>
                  <p className="text-xs text-gray-500">Add one more sauce</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-extrabold text-red-600">
                    +₹{item?.extraSaucePrice ?? 20}
                  </span>
                  <input
                    type="checkbox"
                    checked={extraSauce}
                    onChange={(e) => setExtraSauce(e.target.checked)}
                    className="accent-red-600 w-4 h-4"
                  />
                </div>
              </label>
            </div>
          </>
        )}

        {showSizeToggle && !showFriesOptions && !isFryoTower && (
          <div className="mt-5">
            <p className="text-sm font-extrabold text-gray-900 mb-2">Choose Size</p>
            <div className="flex gap-2 flex-wrap">
              <SizeBtn active={size === SIZE_4} onClick={() => setSize(SIZE_4)}>
                4 Inches
              </SizeBtn>
              <SizeBtn active={size === SIZE_8} onClick={() => setSize(SIZE_8)}>
                8 Inches
              </SizeBtn>
            </div>
          </div>
        )}

        {showBreadOptions && (
          <div className="mt-5">
            <p className="text-sm font-extrabold text-gray-900 mb-2">Choose Bread Type</p>
            <div className="space-y-2">
              {(isSubmarine
                ? [BREAD_REGULAR, BREAD_ORGANIC, BREAD_MULTIGRAINS]
                : [BREAD_REGULAR, BREAD_BROWN]
              ).map((bread) => {
                const extra = bread === BREAD_REGULAR ? 0 : BREAD_EXTRA;
                return (
                  <label
                    key={bread}
                    className={`flex items-center justify-between border rounded-2xl px-4 py-3 cursor-pointer transition ${
                      breadType === bread
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`bread-${baseId}`}
                        checked={breadType === bread}
                        onChange={() => setBreadType(bread)}
                        className="accent-red-600"
                      />
                      <span className="font-bold text-sm text-gray-800">{bread}</span>
                    </div>
                    <span className="text-sm font-extrabold text-red-600">
                      {extra === 0 ? "Included" : `+₹${extra}`}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-200 p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-gray-600">Base Price</span>
            <span className="font-bold text-gray-900">₹{finalBasePrice}</span>
          </div>

          {showBreadOptions && breadExtra > 0 && (
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-gray-600">Bread Extra</span>
              <span className="font-bold text-gray-900">+₹{breadExtra}</span>
            </div>
          )}

          {isFryoTower && extraSauce && (
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-gray-600">Extra Sauce</span>
              <span className="font-bold text-gray-900">+₹{sauceExtra}</span>
            </div>
          )}

          <div className="flex justify-between text-base pt-2 border-t">
            <span className="font-extrabold text-gray-900">Total</span>
            <span className="font-extrabold text-red-600">₹{finalPrice}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onAdd({
              id: cartId,
              name: isFryoTower ? `${item?.name} - ${fryoVariant}` : item?.name,
              price: finalPrice,
              image: cardImg,
              size: showFriesOptions ? friesSize : inferred8Only ? SIZE_8 : size,
              bread: showBreadOptions ? breadType : undefined,
              sauce: isFryoTower ? fryoSauce : undefined,
              extraSauce: isFryoTower ? extraSauce : undefined,
            })
          }
          className="mt-5 w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-extrabold shadow-lg"
        >
          Add to Cart • ₹{finalPrice}
        </button>
      </motion.div>
    </motion.div>
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
      className={`px-2 py-1 rounded-md text-[10px] font-extrabold border transition ${
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