import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { MENU_DATA } from "../../data/menu";
import { motion } from "framer-motion";
import { FiShoppingCart, FiArrowRight, FiStar, FiClock, FiSearch } from "react-icons/fi";
import { MdLocalPizza, MdFastfood, MdRestaurant, MdIcecream } from "react-icons/md";
import { GiHamburger, GiFrenchFries } from "react-icons/gi";

/* IMAGE MAP */
const foodImages = {
  sandwich: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg",
  pizza: "https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg",
  burger: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
  fries: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg",
  chicken: "https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg",
  wrap: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
  dessert: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg",
  default: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
};

const categories = [
  { name: "Sandwich", icon: <MdRestaurant /> },
  { name: "Pizza", icon: <MdLocalPizza /> },
  { name: "Burger", icon: <GiHamburger /> },
  { name: "Wrap", icon: <MdFastfood /> },
  { name: "Fries", icon: <GiFrenchFries /> },
  { name: "Dessert", icon: <MdIcecream /> },
];

const getFoodImage = (name) => {
  const key = name.toLowerCase();
  if (key.includes("sandwich")) return foodImages.sandwich;
  if (key.includes("pizza")) return foodImages.pizza;
  if (key.includes("burger")) return foodImages.burger;
  if (key.includes("fries")) return foodImages.fries;
  if (key.includes("wrap")) return foodImages.wrap;
  if (key.includes("chicken")) return foodImages.chicken;
  if (key.includes("dessert")) return foodImages.dessert;
  return foodImages.default;
};

export default function Home() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [popular, setPopular] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const items = MENU_DATA.flatMap((cat) =>
      cat.items.map((it, ii) => ({ id: ii, ...it, image: getFoodImage(it.name) }))
    );
    setPopular(items.slice(0, 12));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFEF9F] via-[#FFD84D] to-[#FFC107] overflow-hidden">

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-6xl font-black leading-tight text-red-700">
            What’ A <span className="text-red-600">Sandwich!</span>
          </h1>
          <p className="mt-3 text-xl font-extrabold text-red-800 tracking-wide">Nutritious • Delicious • Affordable</p>
          <p className="mt-4 text-gray-800 max-w-xl text-lg leading-relaxed">
            Premium handcrafted sandwiches, burgers & wraps with authentic street taste.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/menu")}
              className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-bold shadow-xl rounded-2xl">
              Explore Menu
            </motion.button>

            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/cart")}
              className="px-10 py-4 border-2 border-red-700 text-red-700 text-lg font-bold bg-white/70 backdrop-blur-xl rounded-2xl flex items-center gap-2">
              <FiShoppingCart /> View Cart
            </motion.button>
          </div>

          <div className="mt-10 flex gap-6 text-sm text-red-700 font-semibold">
            <span className="flex items-center gap-1"><FiStar /> 4.9 Rating</span>
            <span className="flex items-center gap-1"><FiClock /> 30 min Delivery</span>
          </div>
        </motion.div>

        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}
          className="relative">
          <motion.img
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            src="https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg"
            className="rounded-[2.5rem] shadow-2xl border-4 border-white"
            alt="hero"
          />
        </motion.div>
      </section>

      {/* SEARCH */}
      <section className="relative -mt-20 max-w-5xl mx-auto px-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-3xl flex items-center px-6 py-4">
          <FiSearch className="text-xl text-red-600" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your favourite food..."
            className="w-full px-4 py-2 outline-none text-lg"
          />
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-black text-red-700 text-center mb-12">Explore Categories</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {categories.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.15, rotate: 2 }}
              onClick={() => navigate("/menu")}
              className="bg-white rounded-3xl p-7 text-center shadow-xl cursor-pointer border-4 border-red-100">
              <div className="text-5xl text-red-600">{c.icon}</div>
              <p className="mt-3 font-extrabold text-red-800 text-lg">{c.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* POPULAR */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <h2 className="text-4xl font-black text-red-700 mb-14 text-center">🔥 Trending Now</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
          {popular.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <FoodCard item={item} addItem={addItem} />
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

function FoodCard({ item, addItem }) {
  const price = item.price || item.priceMini || item.priceSmall || item.priceMonster;

  return (
    <motion.div whileHover={{ y: -12 }} className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-red-100">
      <div className="relative">
        <img src={item.image} className="h-48 w-full object-cover" alt={item.name} />
      </div>

      <div className="p-5">
        <h4 className="font-extrabold text-red-800 truncate">{item.name}</h4>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-black text-gray-900">₹{price}</span>

          <motion.button whileTap={{ scale: 0.85 }} onClick={() => addItem({ ...item, price })}
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl shadow-lg">
            ADD
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
