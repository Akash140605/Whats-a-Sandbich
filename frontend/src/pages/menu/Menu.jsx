import { useState, useEffect } from "react";
import { MENU_DATA } from "../../data/menu";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

/* FOOD IMAGE MAP */
const foodImages = {
  sandwich: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg",
  pizza: "https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg",
  burger: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
  fries: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg",
  wrap: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
  chicken: "https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg",
  dessert: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg",
  drink: "https://images.pexels.com/photos/616836/pexels-photo-616836.jpeg",
  default: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
};

const getFoodImage = (name = "") => {
  const key = name.toLowerCase();
  if (key.includes("sandwich")) return foodImages.sandwich;
  if (key.includes("pizza")) return foodImages.pizza;
  if (key.includes("burger")) return foodImages.burger;
  if (key.includes("fries")) return foodImages.fries;
  if (key.includes("wrap") || key.includes("roll")) return foodImages.wrap;
  if (key.includes("chicken")) return foodImages.chicken;
  if (key.includes("dessert") || key.includes("cake")) return foodImages.dessert;
  if (key.includes("drink") || key.includes("shake") || key.includes("juice")) return foodImages.drink;
  return foodImages.default;
};

export default function Menu() {
  const { addItem, cart, total } = useCart();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  const filteredMenu = MENU_DATA.map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        filter === "all" ||
        (filter === "veg" && item.type === "veg") ||
        (filter === "nonveg" && item.type === "nonveg") ||
        (filter === "drink" && item.drink) ||
        (filter === "dessert" && item.dessert);
      return matchSearch && matchFilter;
    }),
  }));

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* HEADER */}
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}
        className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">

          <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">
            What’s A Sandwich – Greater Noida
          </h1>

          <motion.input
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food"
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none"
          />

          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {['all','veg','nonveg','drink','dessert'].map((f) => (
              <FilterBtn key={f} active={filter === f} onClick={() => setFilter(f)}>
                {f.toUpperCase()}
              </FilterBtn>
            ))}
          </div>
        </div>
      </motion.div>

      {/* MENU */}
      <div className="max-w-7xl mx-auto px-3 py-6 space-y-12">
        {filteredMenu.map((section) => {
          if (!section.items.length) return null;

          return (
            <div key={section.category}>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                {section.category}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(loading ? [...Array(6)] : section.items).map((item, idx) =>
                  loading ? (
                    <SkeletonCard key={idx} />
                  ) : (
                    <motion.div key={item.id} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <FoodCard item={item} addItem={addItem} />
                    </motion.div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE CART BAR */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} transition={{ type: 'spring' }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t shadow p-4 flex justify-between items-center z-40">
            <div>
              <p className="text-xs text-gray-500">{cart.reduce((s, i) => s + i.qty, 0)} items</p>
              <p className="font-bold text-lg text-gray-800">₹{total}</p>
            </div>
            <button
              onClick={() => (window.location.href = "/cart")}
              className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg shadow"
            >
              View Cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FoodCard({ item, addItem }) {
  const hasSizes = item.priceMini || item.priceSmall || item.priceMonster;
  const [size, setSize] = useState("Regular");

  const price =
    size === "Mini"
      ? item.priceMini
      : size === "Monster"
      ? item.priceMonster
      : item.price || item.priceSmall || item.priceMini;

  return (
    <div className="bg-white border rounded-lg transition p-3 flex gap-3">
      <img
        src={getFoodImage(item.name)}
        alt={item.name}
        loading="lazy"
        className="w-24 h-24 object-cover rounded-md"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm md:text-base">{item.name}</h3>
          <p className="text-xs text-gray-500">Fresh • Hygienic • Tasty</p>

          {hasSizes && (
            <div className="mt-1 flex gap-1 flex-wrap">
              {item.priceMini && <SizeBtn active={size === "Mini"} onClick={() => setSize("Mini")}>Mini</SizeBtn>}
              <SizeBtn active={size === "Regular"} onClick={() => setSize("Regular")}>Reg</SizeBtn>
              {item.priceMonster && <SizeBtn active={size === "Monster"} onClick={() => setSize("Monster")}>Big</SizeBtn>}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="font-extrabold text-red-600">₹{price}</span>
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={() => addItem({ id: item.id, name: item.name, price, size, image: getFoodImage(item.name) })}
            className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md font-bold">
            Add
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function FilterBtn({ active, children, onClick }) {
  return (
    <motion.button whileTap={{ scale: 0.95 }} onClick={onClick}
      className={`px-4 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition ${active ? "bg-red-600 text-white shadow" : "bg-gray-100 hover:bg-gray-200"}`}>
      {children}
    </motion.button>
  );
}

function SizeBtn({ active, children, onClick }) {
  return (
    <motion.button whileTap={{ scale: 0.9 }} onClick={onClick}
      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition ${active ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-600 border-gray-300"}`}>
      {children}
    </motion.button>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white border rounded-lg p-3 animate-pulse flex gap-3">
      <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
}
