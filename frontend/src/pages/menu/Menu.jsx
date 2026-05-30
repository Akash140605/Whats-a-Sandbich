import { useState, useEffect, useRef, useMemo, memo } from "react";
import { MENU_DATA } from "../../data/menu";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";

const DEFAULT_IMAGE =
  "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg";

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

const parsePrice = (v) => {
  if (v == null) return 0;
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  const n = Number(String(v).replace(/[^0-9.-]+/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const getBreadExtra = (breadType) => {
  if (breadType === BREAD_MULTIGRAINS) return BREAD_EXTRA;
  return 0;
};

const dedupeMenuData = (data) => {
  const seen = new Set();

  return (Array.isArray(data) ? data : []).map((section) => {
    const items = (section.items || []).filter((item, idx) => {
      const key = `${normalize(section.category)}|${normalize(
        item?.id ?? ""
      )}|${normalize(item?.name ?? idx)}`;

      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return { ...section, items };
  });
};

const getItemMeta = (item, sectionCategory) => {
  const normalizedCategory = normalize(sectionCategory);
  const name = String(item?.name ?? "");

  const isSubmarine = normalizedCategory === "submarine sandwich";
  const isFries = normalizedCategory === "fries";
  const isDrinks = normalizedCategory === "drinks";
  const isSliced = normalizedCategory === "sliced sandwich";
  const isFryoTower = /fryo tower/i.test(name);

  const isSimpleVeg = /simple veg slice/i.test(name);
  const isLoadedCheesy = /loaded cheesy/i.test(name);
  const isRegularFries = /regular fries/i.test(name);

  const hasMonster = item?.priceMonster != null;
  const hasFourInchPrice = item?.priceMini != null || item?.priceSmall != null;

  const inferred8Only =
    !hasMonster &&
    !hasFourInchPrice &&
    item?.price != null &&
    /8\s*inch/i.test(name);

  const showSizeToggle = isSubmarine || hasMonster;
  const showBreadOptions = isSubmarine || isSliced;
  const showFriesOptions = isFries && isRegularFries;
  const showLoadedCheesySauceOptions = isLoadedCheesy;

  return {
    isSubmarine,
    isFries,
    isDrinks,
    isSliced,
    isFryoTower,
    isSimpleVeg,
    isLoadedCheesy,
    isRegularFries,
    hasMonster,
    hasFourInchPrice,
    inferred8Only,
    showSizeToggle,
    showBreadOptions,
    showFriesOptions,
    showLoadedCheesySauceOptions,
  };
};

const getItemImage = (item, meta, size) => {
  if (meta.isSubmarine) {
    if (size === SIZE_8) {
      return item?.imageMonster || item?.image || DEFAULT_IMAGE;
    }
    return item?.imageMini || item?.imageSmall || item?.image || DEFAULT_IMAGE;
  }
  return item?.image || DEFAULT_IMAGE;
};

const getBasePrice = ({ item, meta, size, friesSize, fryoVariant }) => {
  if (meta.isSimpleVeg) return 39;
  if (meta.isLoadedCheesy) return 89;

  if (meta.showFriesOptions) {
    if (friesSize === FRIES_SMALL) return 69;
    if (friesSize === FRIES_MEDIUM) return 99;
    return 129;
  }

  if (meta.isFryoTower) {
    const found = (item?.variants || []).find((v) => v.label === fryoVariant);
    return parsePrice(found?.price ?? item?.price ?? 99);
  }

  if (meta.isSubmarine) {
    const four = parsePrice(item?.priceMini ?? item?.priceSmall ?? item?.price ?? 0);
    const eight = parsePrice(item?.priceMonster ?? item?.price ?? four);
    return size === SIZE_8 ? eight : four;
  }

  const effectiveSize = meta.inferred8Only ? SIZE_8 : size;

  return effectiveSize === SIZE_8
    ? parsePrice(item?.priceMonster ?? item?.price)
    : parsePrice(item?.priceMini ?? item?.priceSmall ?? item?.price ?? 0);
};

export default function Menu() {
  const { addItem, cart, total } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const initialCategory = location.state?.category ?? "All";
  const initialSearch = location.state?.search ?? "";

  const [search, setSearch] = useState(initialSearch);
  const [filter, setFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [showFilters, setShowFilters] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const sectionRefs = useRef({});

  const safeMenuData = useMemo(() => dedupeMenuData(MENU_DATA), []);
  const categories = useMemo(
    () => ["All", ...safeMenuData.map((s) => s.category)],
    [safeMenuData]
  );

  const totalItems = useMemo(() => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((sum, item) => sum + (Number(item?.qty) || 1), 0);
  }, [cart]);

  const qtyById = useMemo(() => {
    const map = new Map();
    (Array.isArray(cart) ? cart : []).forEach((item) => {
      const id = String(item?.id ?? "");
      const qty = Number(item?.qty) || 1;
      if (!id) return;
      map.set(id, (map.get(id) || 0) + qty);
    });
    return map;
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
      const headerOffset = 140;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!initialCategory || initialCategory === "All") return;
    const t = setTimeout(() => scrollToCategory(initialCategory), 120);
    return () => clearTimeout(t);
  }, [initialCategory]);

  const filteredMenu = useMemo(() => {
    const q = search.trim().toLowerCase();

    return safeMenuData.map((section) => {
      const categoryAllowed =
        activeCategory === "All" || section.category === activeCategory;

      const items = (section.items || []).filter((item) => {
        const matchSearch = !q || (item?.name || "").toLowerCase().includes(q);
        const matchFilter =
          filter === "all" ||
          (filter === "veg" && item?.type === "veg") ||
          (filter === "nonveg" && item?.type === "nonveg");

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
    setTimeout(() => setSelectedItem(null), 120);
  };

  const handleAddToCart = (payload) => {
    addItem(payload);
    closeCustomizeModal();
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#fbd536] to-[#f9c130]"
      style={{ paddingBottom: "calc(var(--bottom-nav-h, 64px) + 170px)" }}
    >
      <motion.div
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.22 }}
        className="bg-white/95 backdrop-blur-xl border-b sticky top-0 z-30 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 leading-tight">
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
            initial={{ scale: 0.995 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.18 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food"
            className="w-full px-4 py-3 rounded-xl border-2 text-sm sm:text-base focus:ring-2 focus:ring-red-500 outline-none shadow-sm"
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
              className="ml-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <FiFilter />
              Categories
            </button>

            <button
              type="button"
              onClick={resetAll}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-white text-gray-800 border-2 border-gray-200 hover:bg-gray-50 shadow-md flex items-center gap-2"
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
                <AppliedChip
                  label={`Search: ${search.trim()}`}
                  onRemove={clearSearch}
                />
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
                transition={{ duration: 0.2 }}
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

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-6 space-y-10 sm:space-y-12">
        {filteredMenu.map((section) => {
          if (!section.items.length) return null;

          return (
            <section
              key={section.category}
              ref={(el) => {
                sectionRefs.current[section.category] = el;
              }}
            >
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-7 sm:h-8 bg-red-600 rounded-sm" />
                {section.category}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {section.items.map((item, idx) => (
                  <motion.div
                    key={`${item?.id ?? item?.name ?? idx}-${idx}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ delay: idx * 0.025, duration: 0.2 }}
                  >
                    <FoodCard
                      item={item}
                      sectionCategory={section.category}
                      qtyById={qtyById}
                      openCustomizeModal={openCustomizeModal}
                    />
                  </motion.div>
                ))}
              </div>
            </section>
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
            transition={{ type: "spring", damping: 22, stiffness: 310 }}
            className="fixed left-3 right-3 sm:left-4 sm:right-4 md:hidden z-[55]"
            style={{
              bottom:
                "calc(var(--bottom-nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 10px)",
            }}
          >
            <motion.div
              whileTap={{ scale: 0.985 }}
              onClick={() => navigate("/cart")}
              className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-3.5 sm:p-4 flex justify-between items-center shadow-2xl border-2 border-white cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate("/cart");
              }}
              aria-label="Open cart"
            >
              <div className="flex items-center gap-3 min-w-0">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-red-600 font-extrabold text-lg shadow-lg flex-shrink-0"
                >
                  {totalItems}
                </motion.div>

                <div className="min-w-0">
                  <p className="text-white/90 text-xs font-bold">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </p>
                  <p className="text-white font-extrabold text-lg sm:text-xl truncate">
                    ₹{total}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-red-600 font-extrabold rounded-xl shadow-lg text-sm sm:text-base flex-shrink-0"
              >
                View Cart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const FoodCard = memo(function FoodCard({
  item,
  sectionCategory,
  qtyById,
  openCustomizeModal,
}) {
  const meta = useMemo(() => getItemMeta(item, sectionCategory), [item, sectionCategory]);

  const [size, setSize] = useState(SIZE_4);
  const [friesSize, setFriesSize] = useState(FRIES_SMALL);
  const [breadType, setBreadType] = useState(BREAD_REGULAR);

  const cardImg = useMemo(() => getItemImage(item, meta, size), [item, meta, size]);

  const basePrice = useMemo(
    () =>
      getBasePrice({
        item,
        meta,
        size,
        friesSize,
        fryoVariant: item?.variants?.[0]?.label ?? "Classic Fryo Tower",
      }),
    [item, meta, size, friesSize]
  );

  const breadExtra = meta.showBreadOptions ? getBreadExtra(breadType) : 0;
  const finalPrice = basePrice + breadExtra;

  const variantParts = [];
  if (meta.showFriesOptions) variantParts.push(friesSize);
  if (meta.showSizeToggle) variantParts.push(meta.inferred8Only ? SIZE_8 : size);
  if (meta.showBreadOptions) variantParts.push(breadType);

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
        loadedCheesySauce: item?.sauces?.[0] ?? "Cheese Sauce",
        extraSauce: false,
      },
      cardImg,
      hasMeta: meta,
    });
  };

  return (
    <div className="bg-white border-2 rounded-2xl transition-all p-3 flex gap-3 hover:shadow-2xl relative group min-h-[128px]">
      <img
        src={cardImg}
        alt={item?.name ?? "Food"}
        loading="lazy"
        decoding="async"
        className="w-24 h-24 object-cover rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform"
        onError={(e) => {
          e.currentTarget.src = DEFAULT_IMAGE;
        }}
      />

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-extrabold text-sm sm:text-base text-gray-900 leading-tight line-clamp-2 pr-10">
            {item?.name}
          </h3>
          <p className="text-xs text-gray-600 mt-1">Fresh • Hygienic • Tasty</p>

          {meta.showSizeToggle && !meta.showFriesOptions && !meta.isFryoTower && (
            <div className="mt-2 flex gap-1 flex-wrap">
              <SizeBtn active={size === SIZE_4} onClick={() => setSize(SIZE_4)}>
                4 Inches
              </SizeBtn>
              <SizeBtn active={size === SIZE_8} onClick={() => setSize(SIZE_8)}>
                8 Inches
              </SizeBtn>
            </div>
          )}

          {meta.showFriesOptions && (
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

          {meta.isFryoTower && (
            <div className="mt-2">
              <span className="inline-block px-2 py-1 rounded-md bg-orange-50 text-orange-700 text-[10px] font-extrabold">
                3 Variants Available
              </span>
            </div>
          )}

          {meta.showLoadedCheesySauceOptions && (
            <div className="mt-2">
              <span className="inline-block px-2 py-1 rounded-md bg-orange-50 text-orange-700 text-[10px] font-extrabold">
                Sauce Options Available
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-3 gap-2">
          <div className="min-w-0">
            <span className="font-extrabold text-red-600 text-sm sm:text-base">
              ₹{finalPrice}
            </span>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.04 }}
            onClick={handleOpen}
            className="px-3 py-2 text-xs bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-extrabold shadow-lg flex-shrink-0 min-h-[40px]"
          >
            {currentQty > 0 ? `Add (${currentQty})` : "Add"}
          </motion.button>
        </div>
      </div>
    </div>
  );
});

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
  const [loadedCheesySauce, setLoadedCheesySauce] = useState(
    defaults?.loadedCheesySauce ?? item?.sauces?.[0] ?? "Cheese Sauce"
  );
  const [extraSauce, setExtraSauce] = useState(defaults?.extraSauce ?? false);

  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, []);

  const cardImg = getItemImage(item, hasMeta, size);

  const basePrice = getBasePrice({
    item,
    meta: hasMeta,
    size,
    friesSize,
    fryoVariant,
  });

  const breadExtra = hasMeta.showBreadOptions ? getBreadExtra(breadType) : 0;
  const sauceExtra =
    hasMeta.isFryoTower && extraSauce ? parsePrice(item?.extraSaucePrice ?? 20) : 0;

  const finalPrice = basePrice + breadExtra + sauceExtra;

  const variantParts = [];
  if (hasMeta.showFriesOptions) variantParts.push(friesSize);
  if (hasMeta.isFryoTower) {
    variantParts.push(fryoVariant);
    variantParts.push(fryoSauce);
    if (extraSauce) variantParts.push("ExtraSauce");
  }
  if (hasMeta.isLoadedCheesy) {
    variantParts.push(loadedCheesySauce);
  }
  if (hasMeta.showSizeToggle && !hasMeta.isFryoTower) {
    variantParts.push(hasMeta.inferred8Only ? SIZE_8 : size);
  }
  if (hasMeta.showBreadOptions) variantParts.push(breadType);

  const baseId = String(item?.id ?? item?.name ?? "item");
  const cartId = `${baseId}-${variantParts.join("-").replace(/\s+/g, "_") || "default"}`;

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.985 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.985 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 max-h-[92vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight">
              {item?.name}
            </h3>
            <p className="text-sm text-gray-500">Customize your order</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 text-gray-700 grid place-items-center flex-shrink-0"
          >
            <FiX />
          </button>
        </div>

        <img
          src={cardImg}
          alt={item?.name ?? "Food"}
          loading="lazy"
          decoding="async"
          className="w-full h-40 sm:h-44 object-cover rounded-2xl mt-4"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />

        {hasMeta.showFriesOptions && (
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

        {hasMeta.isFryoTower && (
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
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="radio"
                        name={`fryo-variant-${baseId}`}
                        checked={fryoVariant === variant.label}
                        onChange={() => setFryoVariant(variant.label)}
                        className="accent-red-600"
                      />
                      <span className="font-bold text-sm text-gray-800">
                        {variant.label}
                      </span>
                    </div>
                    <span className="text-sm font-extrabold text-red-600">
                      ₹{variant.price}
                    </span>
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
                    className={`px-3 py-2.5 rounded-xl text-xs font-extrabold border min-h-[42px] ${
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
              <label className="flex items-center justify-between border rounded-2xl px-4 py-3 cursor-pointer gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-sm text-gray-800">Extra Sauce</p>
                  <p className="text-xs text-gray-500">Add one more sauce</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
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

        {hasMeta.isLoadedCheesy && (
          <div className="mt-5">
            <p className="text-sm font-extrabold text-gray-900 mb-2">Choose Sauce</p>
            <div className="grid grid-cols-2 gap-2">
              {(
                item?.sauces || [
                  "White Cheese",
                  "Cheese Jalapeno",
                  "Peri Peri",
                  "Chili Garlic",
                  "Alfredo",
                  "Chipotle",
                  "Mint Mayo",
                ]
              ).map((sauce) => (
                <button
                  key={sauce}
                  type="button"
                  onClick={() => setLoadedCheesySauce(sauce)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-extrabold border min-h-[42px] ${
                    loadedCheesySauce === sauce
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {sauce}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasMeta.showSizeToggle && !hasMeta.showFriesOptions && !hasMeta.isFryoTower && (
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

        {hasMeta.showBreadOptions && (
          <div className="mt-5">
            <p className="text-sm font-extrabold text-gray-900 mb-2">Choose Bread Type</p>
            <div className="space-y-2">
              {(hasMeta.isSubmarine
                ? [BREAD_REGULAR, BREAD_ORGANIC, BREAD_MULTIGRAINS]
                : [BREAD_REGULAR, BREAD_BROWN]
              ).map((bread) => {
                const extra = getBreadExtra(bread);

                return (
                  <label
                    key={bread}
                    className={`flex items-center justify-between border rounded-2xl px-4 py-3 cursor-pointer transition ${
                      breadType === bread
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
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
            <span className="font-bold text-gray-900">₹{basePrice}</span>
          </div>

          {hasMeta.showBreadOptions && breadExtra > 0 && (
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-gray-600">Bread Extra</span>
              <span className="font-bold text-gray-900">+₹{breadExtra}</span>
            </div>
          )}

          {hasMeta.isFryoTower && extraSauce && (
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
              name: hasMeta.isFryoTower ? `${item?.name} - ${fryoVariant}` : item?.name,
              price: finalPrice,
              image: cardImg,
              size: hasMeta.showFriesOptions
                ? friesSize
                : hasMeta.inferred8Only
                ? SIZE_8
                : size,
              bread: hasMeta.showBreadOptions ? breadType : undefined,
              sauce: hasMeta.isFryoTower
                ? fryoSauce
                : hasMeta.isLoadedCheesy
                ? loadedCheesySauce
                : undefined,
              extraSauce: hasMeta.isFryoTower ? extraSauce : undefined,
            })
          }
          className="mt-5 w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-extrabold shadow-lg min-h-[48px]"
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
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all shadow-md min-h-[40px] ${
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
      className="group inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border-2 border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition text-xs font-extrabold text-gray-800 max-w-full"
      title="Remove filter"
    >
      <span className="truncate max-w-[200px] sm:max-w-[240px]">{label}</span>
      <span className="grid place-items-center w-5 h-5 rounded-full bg-red-50 text-red-700 group-hover:bg-red-100 transition flex-shrink-0">
        <FiX />
      </span>
    </button>
  );
}

function SizeBtn({ active, children, onClick }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-extrabold border transition min-h-[34px] ${
        active
          ? "bg-red-600 text-white border-red-600"
          : "bg-white text-gray-700 border-gray-300"
      }`}
    >
      {children}
    </motion.button>
  );
}