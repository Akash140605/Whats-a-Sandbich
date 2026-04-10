// Image imports using Vite's import.meta.glob
const submarineImages = import.meta.glob(
  "@/assets/items/Submarine Sandwiches/*.jpg",
  { eager: true, import: "default" }
);
const submarineImageMap = Object.fromEntries(
  Object.entries(submarineImages).map(([path, img]) => {
    const fileName = path.split("/").pop();
    return [fileName, img];
  })
);

const superheroImages = import.meta.glob(
  "@/assets/items/Superhero Panini/*.jpg",
  { eager: true, import: "default" }
);
const superheroImageMap = Object.fromEntries(
  Object.entries(superheroImages).map(([path, img]) => {
    const fileName = path.split("/").pop();
    return [fileName, img];
  })
);

const starterImages = import.meta.glob(
  "@/assets/items/What  A Starter/*.jpg",
  { eager: true, import: "default" }
);
const starterImageMap = Object.fromEntries(
  Object.entries(starterImages).map(([path, img]) => {
    const fileName = path.split("/").pop();
    return [fileName, img];
  })
);

const burgerImages = import.meta.glob(
  "@/assets/items/What A Burger/*.jpg",
  { eager: true, import: "default" }
);
const burgerImageMap = Object.fromEntries(
  Object.entries(burgerImages).map(([path, img]) => {
    const fileName = path.split("/").pop();
    return [fileName, img];
  })
);

const friesImages = import.meta.glob(
  "@/assets/items/What A Loaded Fries/*.jpg",
  { eager: true, import: "default" }
);
const friesImageMap = Object.fromEntries(
  Object.entries(friesImages).map(([path, img]) => {
    const fileName = path.split("/").pop();
    return [fileName, img];
  })
);

const pavImages = import.meta.glob(
  "@/assets/items/What A Pav/*.jpg",
  { eager: true, import: "default" }
);
const pavImageMap = Object.fromEntries(
  Object.entries(pavImages).map(([path, img]) => {
    const fileName = path.split("/").pop();
    return [fileName, img];
  })
);

const saladImages = import.meta.glob(
  "@/assets/items/What A Salad/*.jpg",
  { eager: true, import: "default" }
);
const saladImageMap = Object.fromEntries(
  Object.entries(saladImages).map(([path, img]) => {
    const fileName = path.split("/").pop();
    return [fileName, img];
  })
);

const slicedImages = import.meta.glob(
  "@/assets/items/What A Sliced Sandwich/*.jpg",
  { eager: true, import: "default" }
);
const slicedImageMap = Object.fromEntries(
  Object.entries(slicedImages).map(([path, img]) => {
    const fileName = path.split("/").pop();
    return [fileName, img];
  })
);

const wrapsImages = import.meta.glob(
  "@/assets/items/Cheese Tortilla Wraps/*.jpg",
  { eager: true, import: "default" }
);
const wrapsImageMap = Object.fromEntries(
  Object.entries(wrapsImages).map(([path, img]) => {
    const fileName = path.split("/").pop();
    return [fileName, img];
  })
);

const miniHeroImages = import.meta.glob(
  "@/assets/items/Mini Hero And Sidekicks/*.jpg",
  { eager: true, import: "default" }
);
const miniHeroImageMap = Object.fromEntries(
  Object.entries(miniHeroImages).map(([path, img]) => {
    const fileName = path.split("/").pop();
    return [fileName, img];
  })
);

const paniniWrapsImages = import.meta.glob(
  "@/assets/items/Cheesy Panini & Wraps/*.jpg",
  { eager: true, import: "default" }
);
const paniniWrapsImageMap = Object.fromEntries(
  Object.entries(paniniWrapsImages).map(([path, img]) => {
    const fileName = path.split("/").pop();
    return [fileName, img];
  })
);
// menu.js (top area)
const drinks = import.meta.glob("@assets/items/Drinks/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

export const MENU_DATA = [
 {
  category: "Submarine Sandwich",
  items: [
    // ================= VEG (4" Mini) =================
    {
      id: "subveg1",
      name: "Veggie Classic",
      type: "veg",
      popular: true,
      priceMini: 49,        // 4"
      priceMonster: 99,     // 8"
      imageMini: submarineImageMap["6. Veggie Classic 4_(mini monster).jpg"],
      // 8-inch image file not provided in your list -> fallback to 4-inch image
      imageMonster: submarineImageMap["6. Veggie Classic 4_(mini monster).jpg"],
      image: submarineImageMap["6. Veggie Classic 4_(mini monster).jpg"],
    },
    {
      id: "subveg2",
      name: "Masala Veg Sub",
      type: "veg",
      popular: true,
      priceMini: 99,
      priceMonster: 199,
      imageMini: submarineImageMap["7.Masala Veg Sub 4_(mini monster).jpg"],
      imageMonster: submarineImageMap["21.Masala Veg 8_monster (2).jpg"],
      image: submarineImageMap["7.Masala Veg Sub 4_(mini monster).jpg"],
    },
    {
      id: "subveg3",
      name: "Aloo Masala Sub",
      type: "veg",
      priceMini: 139,
      priceMonster: 279,
      imageMini: submarineImageMap["8.Aloo Tikki Sub 4_(mini monster).jpg"],
      imageMonster: submarineImageMap["22.Aloo Tikki 8_monster (2).jpg"],
      image: submarineImageMap["8.Aloo Tikki Sub 4_(mini monster).jpg"],
    },
    {
      id: "subveg4",
      name: "Veg Crispy Sub",
      type: "veg",
      popular: true,
      priceMini: 149,
      priceMonster: 299,
      imageMini: submarineImageMap["9.Veg Crispy 4_(mini monster).jpg"],
      imageMonster: submarineImageMap["23.veg crispy 8_monster.jpg"],
      image: submarineImageMap["9.Veg Crispy 4_(mini monster).jpg"],
    },
    {
      id: "subveg5",
      name: "Spinach & Corn Sub",
      type: "veg",
      priceMini: 169,
      priceMonster: 319,
      imageMini: submarineImageMap["10.Spinach _ Corn 4_(mini monster).jpg"],
      imageMonster: submarineImageMap["24. spinach _ corn 8_monster.jpg"],
      image: submarineImageMap["10.Spinach _ Corn 4_(mini monster).jpg"],
    },
    {
      id: "subveg6",
      name: "Mozzarella Cheesy Fingers Sub",
      type: "veg",
      popular: true,
      priceMini: 179,
      priceMonster: 339,
      imageMini: submarineImageMap["11.Mozzarella Cheesy Finger 4_(mini monster).jpg"],
      imageMonster: submarineImageMap["25..mozzarella cheesy finger 8_monseter.jpg"],
      image: submarineImageMap["11.Mozzarella Cheesy Finger 4_(mini monster).jpg"],
    },
    {
      id: "subveg7",
      name: "Paneer Masala Sub",
      type: "veg",
      popular: true,
      priceMini: 199,
      priceMonster: 399,
      imageMini: submarineImageMap["12.Paneer Tikka 4_mini monster.jpg"],
      imageMonster: submarineImageMap["26. paneer tikka 8_monster.jpg"],
      image: submarineImageMap["12.Paneer Tikka 4_mini monster.jpg"],
    },
    {
      id: "subveg8",
      name: "Paneer Crackling Sub",
      type: "veg",
      popular: true,
      priceMini: 199,
      priceMonster: 399,
      imageMini: submarineImageMap["13.Paneer Crackling 4_mini mnster.jpg"],
      imageMonster: submarineImageMap["27.paneer crakling 8_monster.jpg"],
      image: submarineImageMap["13.Paneer Crackling 4_mini mnster.jpg"],
    },

    // ================= NON-VEG (4" Small) =================
    {
      id: "subchk1",
      name: "Chicken Chunks Sub",
      type: "nonveg",
      popular: true,
      priceSmall: 149,
      priceMonster: 299,
      imageSmall: submarineImageMap["14.chicken chunks 4_mini monster (2).JPG"],
      imageMonster: submarineImageMap["28.Chicken Chunks 8_monster.jpg"],
      image: submarineImageMap["14.chicken chunks 4_mini monster (2).JPG"],
    },
    {
      id: "subchk2",
      name: "Chicken Crispy Sub",
      type: "nonveg",
      popular: true,
      priceSmall: 179,
      priceMonster: 359,
      imageSmall: submarineImageMap["15.chicken crispy sub 4_mini monster.jpg"],
      imageMonster: submarineImageMap["29.chicken crispy 8 inch monster.jpg"],
      image: submarineImageMap["15.chicken crispy sub 4_mini monster.jpg"],
    },
    {
      id: "subchk3",
      name: "Chicken Super Patty Sub",
      type: "nonveg",
      priceSmall: 189,
      priceMonster: 379,
      imageSmall: submarineImageMap["16.chicken super patty 4_mini monster.jpg"],
      imageMonster: submarineImageMap["30.chicken super monster sub 8_monster.jpg"],
      image: submarineImageMap["16.chicken super patty 4_mini monster.jpg"],
    },
    {
      id: "subchk4",
      name: "Chicken Seekh Sub",
      type: "nonveg",
      popular: true,
      priceSmall: 189,
      priceMonster: 379,
      imageSmall: submarineImageMap["18.chicken seekh 4_mini monster.jpg"],
      imageMonster: submarineImageMap["32.chicken Seekh sub 8_monster.jpg"],
      image: submarineImageMap["18.chicken seekh 4_mini monster.jpg"],
    },
    {
      id: "subchk5",
      name: "Chicken Masala Sub",
      type: "nonveg",
      popular: true,
      priceSmall: 199,
      priceMonster: 399,
      imageSmall: submarineImageMap["Chicken Masala 4 Inch.jpg"],
      imageMonster: submarineImageMap["Chicken Masala 8 Inch.jpg"],
      image: submarineImageMap["Chicken Masala 4 Inch.jpg"],
    },
    {
      id: "subchk6",
      name: "Chicken Crackling Sub",
      type: "nonveg",
      popular: true,
      priceSmall: 229,
      priceMonster: 459,
      imageSmall: submarineImageMap["19. chicken crackling sub 4_mini monster.jpg"],
      // 8-inch image file not provided in your list -> fallback to 4-inch image
      imageMonster: submarineImageMap["19. chicken crackling sub 4_mini monster.jpg"],
      image: submarineImageMap["19. chicken crackling sub 4_mini monster.jpg"],
    },

    // Optional: Agar tum Chicken Tikka bhi rakhna chahte ho (image me nahi dikh raha, but assets tumhare paas hain)
    {
      id: "subchk7",
      name: "Chicken Tikka Sub",
      type: "nonveg",
      priceSmall: 199,
      priceMonster: 399,
      imageSmall: submarineImageMap["17.chicken tikka sub 4_mini monster (2).jpg"],
      imageMonster: submarineImageMap["31.chicken tikka 8_monster.jpg"],
      image: submarineImageMap["17.chicken tikka sub 4_mini monster (2).jpg"],
    },
  ],
}
,
  {
    category: "Cheese Tortilla Wraps",
    items: [
      {
        id: "wrapveg1",
        name: "Dr. Doom Veg Wrap",
        price: 69,
        type: "veg",
        image: wrapsImageMap["43. Dr. Doom Veg Wrap.jpg"],
      },
      {
        id: "wrapveg2",
        name: "Paneer Tikka Wrap",
        price: 199,
        type: "veg",
        popular: true,
        image: wrapsImageMap["45.chicken tikka wrap.jpg"],
      },
      {
        id: "wrapveg3",
        name: "Agent Aloo Masala Hero Wrap",
        price: 99,
        type: "veg",
        image: wrapsImageMap["Agent Aloo Masala Hero Wrap.jpg"],
      },
      {
        id: "wrapveg4",
        name: "Avenger Aloo Tikki Hero Wrap",
        price: 139,
        type: "veg",
        image: wrapsImageMap["Avenger Aloo Tikki Hero Wrap.jpg"],
      },
      {
        id: "wrapveg5",
        name: "Captain Veg Cutlet Hero Wrap",
        price: 149,
        type: "veg",
        image: wrapsImageMap["Captain Veg Cutlet Hero Wrap (Best Seller).jpg"],
      },
      {
        id: "wrapveg6",
        name: "Popeye Spinach & Corn Hero Wrap",
        price: 169,
        type: "veg",
        image: wrapsImageMap["96. Popeye Spinach Corn Hero Wrap.jpg"],
      },
      {
        id: "wrapveg7",
        name: "Mr. Fantastic Cheesy Fingers Hero Wrap",
        price: 179,
        type: "veg",
        image: wrapsImageMap["Mr. Fantastic Cheesy Fingers Hero Wrap.jpg"],
      },
      {
        id: "wrapveg8",
        name: "Professor X Paneer Tikka Hero Wrap",
        price: 199,
        type: "veg",
        popular: true,
        image: wrapsImageMap["99.Professor X. Paneer Tikka Hero Wrap.jpg"],
      },
      {
        id: "wrapveg9",
        name: "The Hulk Paneer Crackling Hero Wrap",
        price: 199,
        type: "veg",
        popular: true,
        image: wrapsImageMap["98..The Hulk Paneer Crackling Hero Wrap.jpg"],
      },
      {
        id: "wrapchk1",
        name: "Nuclear Chicken Nuggets Hero Wrap",
        price: 149,
        type: "nonveg",
        popular: true,
        image: wrapsImageMap["Nuclear Chicken Nuggets Hero Wrap.jpg"],
      },
      {
        id: "wrapchk2",
        name: "Colonel Chicken Cutlet Hero Wrap",
        price: 179,
        type: "nonveg",
        image: wrapsImageMap["Colonel Chicken Cutlet Hero Wrap.jpg"],
      },
      {
        id: "wrapchk3",
        name: "Super Duper Chicken Hero Wrap",
        price: 189,
        type: "nonveg",
        popular: true,
        image: wrapsImageMap["104.Super Duper Chicken Hero Wrap.jpg"],
      },
      {
        id: "wrapchk4",
        name: "Spidey Seekh Hero Wrap",
        price: 189,
        type: "nonveg",
        popular: true,
        image: wrapsImageMap["Spidey Seekh Hero Wrap.jpg"],
      },
      {
        id: "wrapchk5",
        name: "Thanos Chicken Tikka Hero Wrap",
        price: 199,
        type: "nonveg",
        popular: true,
        image: wrapsImageMap["105.Thanos Chicken Tikka Hero Wrap.jpg"],
      },
      {
        id: "wrapchk6",
        name: "Captain Fried Chicken Hero Wrap",
        price: 229,
        type: "nonveg",
        popular: true,
        image: wrapsImageMap["103.Captain Fried Chicken Hero Wrap (Best Seller).jpg"],
      },
      {
        id: "wrapchk7",
        name: "Dr. Doom Veg and Cheesy Hero Wrap",
        price: 69,
        type: "veg",
        image: wrapsImageMap["92.Dr. Doom Veg and Cheesy Hero Wrap.jpg"],
      },
      {
        id: "wrapchk8",
        name: "Captain Veg Cutlet Hero Wrap (Best Seller)",
        price: 149,
        type: "veg",
        image: wrapsImageMap["95..Captain Veg Cutlet Hero Wrap (Best Seller).jpg"],
      },
      {
        id: "wrapchk9",
        name: "Chicken Tikka",
        price: 199,
        type: "nonveg",
        image: wrapsImageMap["Chicken Tikka.jpg"],
      },
      {
        id: "wrapchk10",
        name: "Paneer Tikka",
        price: 199,
        type: "veg",
        image: wrapsImageMap["Paneer Tikka (1).jpg"],
      },
      {
        id: "wrapchk11",
        name: "Sloppy Joe Sausage Hero Wrap",
        price: 189,
        type: "nonveg",
        image: wrapsImageMap["Sloppy Joe Sausage Hero Wrap.jpg"],
      },
      {
        id: "wrapchk12",
        name: "Popeye Spinach & Corn Hero Wrap",
        price: 169,
        type: "veg",
        image: wrapsImageMap["Popeye Spinach & Corn Hero Wrap.jpg"],
      },
      {
        id: "wrapchk13",
        name: "Paneer Masala Wrap",
        price: 199,
        type: "veg",
        image: wrapsImageMap["Paneer Masala Wrap.jpg"],
      },
      {
        id: "wrapchk14",
        name: "Dr. Doom Veg and Cheesy Hero Wrap",
        price: 69,
        type: "veg",
        image: wrapsImageMap["Dr. Doom Veg and Cheesy Hero Wrap.jpg"],
      },
      {
        id: "wrapchk15",
        name: "Professor X. Paneer Tikka Hero Wrap",
        price: 199,
        type: "veg",
        image: wrapsImageMap["Professor X. Paneer Tikka Hero Wrap.jpg"],
      },
      {
        id: "wrapchk16",
        name: "Chunks Cheesy Pav Burger",
        price: 149,
        type: "nonveg",
        image: wrapsImageMap["100.Colonel Chicken Cutlet Hero Wrap.jpg"],
      },
    ],
  },

  {
    category: "Mini Hero And Sidekicks",
    items: [
      {
        id: "mini1",
        name: "Dr. Doom Veg & Cheesy Mini Hero",
        price: 99,
        type: "veg",
        image: miniHeroImageMap["Dr. Doom Veg and Cheesy Mini Hero (Small).jpg"],
      },
      {
        id: "mini2",
        name: "Professor X Paneer Tikka Mini Hero",
        price: 199,
        type: "veg",
        popular: true,
        image: miniHeroImageMap["Professor. X Paneer Tikka Mini_Hero (BESTSELLER).jpg"],
      },
      {
        id: "mini3",
        name: "Thanos Chicken Tikka Mini Hero",
        price: 199,
        type: "nonveg",
        popular: true,
        image: miniHeroImageMap["Thanos Chicken Tikka Mini Hero Panini (Small).jpg"],
      },
      {
        id: "mini4",
        name: "Captain Fried Chicken Mini Hero",
        price: 229,
        type: "nonveg",
        popular: true,
        image: miniHeroImageMap["Captain Fried Chicken Mini Hero Panini (Best Seller) (Small).jpg"],
      },
    ],
  },

  {
    category: "Superhero Panini",
    items: [
      {
        id: "panini1",
        name: "Agent Aloo Masala Superhero",
        price: 329,
        type: "veg",
        popular: true,
        image: superheroImageMap["Agent Aloo Masalasupe Hero Panini (Large).jpg"],
      },
      {
        id: "panini2",
        name: "Professor X Paneer Tikka Superhero",
        price: 339,
        type: "veg",
        popular: true,
        image: superheroImageMap["Professor. X Paneer Tikka Mini_Hero (BESTSELLER).jpg"],
      },
      {
        id: "panini3",
        name: "Captain Fried Chicken Mini Hero Panini",
        price: 229,
        type: "nonveg",
        image: superheroImageMap["Captain Fried Chicken Mini Hero Panini (Best Seller) (Small).jpg"],
      },
      {
        id: "panini4",
        name: "Captain Fried Chicken Hero Panini",
        price: 459,
        type: "nonveg",
        image: superheroImageMap["Captain Fried Chicken Hero Panini (Best Seller) (Large).jpg"],
      },
      {
        id: "panini5",
        name: "Colonel Chicken Cutlet Super Hero Panini",
        price: 299,
        type: "nonveg",
        image: superheroImageMap["Colonel Chicken Cutlet Super Hero Panini (Large).jpg"],
      },
      {
        id: "panini6",
        name: "Dr. Doom Veg and Cheesy Super Hero Panini",
        price: 199,
        type: "veg",
        image: superheroImageMap["Dr. Doom Veg and Cheesy Super Hero Panini (Large).jpg"],
      },
      {
        id: "panini7",
        name: "Mr. Fantastic Cheesy Fingersuper Hero Panini",
        price: 339,
        type: "veg",
        image: superheroImageMap["Mr. Fantastic Cheesy Fingersuper Hero Panini (Large).jpg"],
      },
      {
        id: "panini8",
        name: "Nuclear Chicken Nuggets Super Hero Panini",
        price: 379,
        type: "nonveg",
        image: superheroImageMap["Nuclear Chicken Nuggets Super Hero Panini (Large).jpg"],
      },
      {
        id: "panini9",
        name: "Popeye Spinach & Corn Super Hero Panini",
        price: 339,
        type: "veg",
        image: superheroImageMap["Popeye Spinach & Corn Super Hero Panini (Large).jpg"],
      },
      {
        id: "panini10",
        name: "Prof X. Paneer Super Hero Panini",
        price: 339,
        type: "veg",
        image: superheroImageMap["Prof X. Paneer Tikka Super Hero Panini (Large).jpg"],
      },
      {
        id: "panini11",
        name: "Spidey Seekh Super Hero Panini",
        price: 399,
        type: "nonveg",
        image: superheroImageMap["Spidey Seekh Super Hero Panini (Large).jpg"],
      },
      {
        id: "panini12",
        name: "Super Duper Chicken Super Hero Panini",
        price: 379,
        type: "nonveg",
        image: superheroImageMap["Super Duper Chicken Super Hero Panini (Large).jpg"],
      },
      {
        id: "panini13",
        name: "The Hulk Paneer Crackling Super Hero Panini",
        price: 399,
        type: "veg",
        image: superheroImageMap["The Hulk Paneer Crackling Super Hero Panini (Large).jpg"],
      },
      {
        id: "panini14",
        name: "Thanos Chicken Tikka Super Hero Panini",
        price: 359,
        type: "nonveg",
        image: superheroImageMap["Thanos Chicken Tikka Super Hero Panini (Large).jpg"],
      },
    ],
  },

  {
    category: "Burger",
    items: [
      {
        id: "burger1",
        name: "Aloo Masala Burger",
        price: 99,
        type: "veg",
        image: burgerImageMap["36.aloo masala burger_.jpg"],
      },
      {
        id: "burger2",
        name: "Veg Crispy Burger",
        price: 149,
        type: "veg",
        popular: true,
        image: burgerImageMap["37.veg crispy burger_.jpg"],
      },
      {
        id: "burger3",
        name: "Spinach & Corn Burger",
        price: 159,
        type: "veg",
        image: burgerImageMap["38.spinach _ corn burger.jpg"],
      },
      {
        id: "burger4",
        name: "Paneer Crackling Burger",
        price: 189,
        type: "veg",
        popular: true,
        image: burgerImageMap["39.paneer crakcling burger.jpg"],
      },
      {
        id: "burger5",
        name: "Chicken Crispy Burger",
        price: 159,
        type: "nonveg",
        popular: true,
        image: burgerImageMap["40.chicken crispy burger.jpg"],
      },
      {
        id: "burger6",
        name: "Chicken Super Burger",
        price: 169,
        type: "nonveg",
        image: burgerImageMap["42.chicken super burger.jpg"],
      },
      {
        id: "burger7",
        name: "Chicken Crackling Burger",
        price: 199,
        type: "nonveg",
        popular: true,
        image: burgerImageMap["41.chicken crakcling burger.jpg"],
      },
      {
        id: "burger8",
        name: "Aloo Masala Burger",
        price: 99,
        type: "veg",
        image: burgerImageMap["Aloo Masala Burger.jpg"],
      },
      {
        id: "burger9",
        name: "Chicken Crackling Burger",
        price: 199,
        type: "nonveg",
        image: burgerImageMap["Chicken Crackling Burger.jpg"],
      },
      {
        id: "burger10",
        name: "Chicken Crispy Burger",
        price: 159,
        type: "nonveg",
        image: burgerImageMap["Chicken Crispy Burger.jpg"],
      },
      {
        id: "burger11",
        name: "Chicken Sausage Burger",
        price: 169,
        type: "nonveg",
        image: burgerImageMap["Chicken Sausage Burger.jpg"],
      },
      {
        id: "burger12",
        name: "Chicken Super Burger",
        price: 169,
        type: "nonveg",
        image: burgerImageMap["Chicken Super Burger.jpg"],
      },
      {
        id: "burger13",
        name: "Paneer Crackling Burger",
        price: 189,
        type: "veg",
        image: burgerImageMap["Paneer Crackling Burger.jpg"],
      },
      {
        id: "burger14",
        name: "Spinach & Corn Buger",
        price: 159,
        type: "veg",
        image: burgerImageMap["Spinach & Corn Buger.jpg"],
      },
      {
        id: "burger15",
        name: "Veg Crispy Burger",
        price: 149,
        type: "veg",
        image: burgerImageMap["Veg Crispy Burger.jpg"],
      },
    ],
  },

  {
    category: "Healthy Salad",
    items: [
      {
        id: "salad1",
        name: "Veggie Classic Salad",
        price: 99,
        type: "veg",
        image: saladImageMap["Veggi Classic Salad.jpg"],
      },
      {
        id: "salad2",
        name: "Veg Crispy Salad",
        price: 169,
        type: "veg",
        image: saladImageMap["Veg Crispy Salad.jpg"],
      },
      {
        id: "salad3",
        name: "Paneer Masala Salad",
        price: 199,
        type: "veg",
        popular: true,
        image: saladImageMap["Paneer Masala Salad.jpg"],
      },
      {
        id: "salad4",
        name: "Paneer Crackling Salad",
        price: 199,
        type: "veg",
        popular: true,
        image: saladImageMap["Paneer Crackling Salad.jpg"],
      },
      {
        id: "salad5",
        name: "Chicken Sausage Salad",
        price: 179,
        type: "nonveg",
        image: saladImageMap["Chicken Sausage Salad.jpg"],
      },
      {
        id: "salad6",
        name: "Chicken Crispy Salad",
        price: 189,
        type: "nonveg",
        popular: true,
        image: saladImageMap["Chicken Crispy Salad.jpg"],
      },
      {
        id: "salad7",
        name: "Chicken Seekh Salad",
        price: 299,
        type: "nonveg",
        popular: true,
        image: saladImageMap["Chicken Seekh Salad.jpg"],
      },
      {
        id: "salad8",
        name: "Chicken Crackling Salad",
        price: 299,
        type: "nonveg",
        popular: true,
        image: saladImageMap["Chicken Crackling Salad.jpg"],
      },
      {
        id: "salad9",
        name: "Chicken Tikka Salad",
        price: 299,
        type: "nonveg",
        image: saladImageMap["Chicken Tikka Salad.jpg"],
      },
    ],
  },

  {
    category: "Pav Burgers",
    items: [
      {
        id: "pav1",
        name: "Cheesy Masala Veg Pav Burger",
        price: 59,
        type: "veg",
        image: pavImageMap["Cheesy Masala Veg Pav Burger.jpg"],
      },
      {
        id: "pav2",
        name: "Spicy Peri Peri Vada Pav Burger",
        price: 99,
        type: "veg",
        popular: true,
        image: pavImageMap["Spicy Peri Peri Vada Pav Burger.jpg"],
      },
      {
        id: "pav3",
        name: "Veg Crispy Pav Burger",
        price: 149,
        type: "veg",
        popular: true,
        image: pavImageMap["Veg Crispy Pav Burger.jpg"],
      },
      {
        id: "pav4",
        name: "Chicken Chunks Cheesy Pav Burger",
        price: 149,
        type: "nonveg",
        popular: true,
        image: pavImageMap["Chicken Chunks Cheesy Pav Burger.jpg"],
      },
      {
        id: "pav5",
        name: "Chicken Crispy Pavburger",
        price: 169,
        type: "nonveg",
        image: pavImageMap["Chicken Crispy Pavburger.jpg"],
      },
      {
        id: "pav6",
        name: "Chicken Crackling Pav Burger",
        price: 229,
        type: "nonveg",
        popular: true,
        image: pavImageMap["Chicken Crackling Pav Burger.jpg"],
      },
      {
        id: "pav7",
        name: "1. Veg Crispy Pav Burgerr",
        price: 149,
        type: "veg",
        image: pavImageMap["1. Veg Crispy Pav Burgerr.jpg"],
      },
      {
        id: "pav8",
        name: "2.Spicy Peri Peri Vada Pav Burger",
        price: 99,
        type: "veg",
        image: pavImageMap["2.Spicy Peri Peri Vada Pav Burger.jpg"],
      },
      {
        id: "pav9",
        name: "3.Chunks Cheesy Pav Burger",
        price: 149,
        type: "nonveg",
        image: pavImageMap["3.Chunks Cheesy Pav Burger.jpg"],
      },
      {
        id: "pav10",
        name: "4.Chicken Crispy Pavburger",
        price: 169,
        type: "nonveg",
        image: pavImageMap["4.Chicken Crispy Pavburger.jpg"],
      },
      {
        id: "pav11",
        name: "5.Chicken Crackling Pav Burger",
        price: 229,
        type: "nonveg",
        image: pavImageMap["5.Chicken Crackling Pav Burger.jpg"],
      },
    ],
  },

  {
    category: "Starters",
    items: [
      {
        id: "starter1",
        name: "Masala Mumbai Vada with Cheese Sauce",
        price: 135,
        type: "veg",
        image: starterImageMap["56.masala mumbai wada with sause 2pcs.jpg"],
      },
      {
        id: "starter2",
        name: "Veg Cutlet with Cheese Sauce",
        price: 135,
        type: "veg",
        image: starterImageMap["57.veg cutlet with cheese sauce2pcs.jpg"],
      },
      {
        id: "starter3",
        name: "Spinach & Corn Cutlet with Cheese Sauce",
        price: 135,
        type: "veg",
        image: starterImageMap["58.spinach and corn cutlet with cheese sauce 2pcs.jpg"],
      },
      {
        id: "starter4",
        name: "Chicken Cutlet with Cheese Sauce",
        price: 145,
        type: "nonveg",
        image: starterImageMap["59.chicken cutlet with cheese sauce 2 pcs.jpg"],
      },
      {
        id: "starter5",
        name: "Chicken Chunks with Cheese Sauce",
        price: 145,
        type: "nonveg",
        popular: true,
        image: starterImageMap["60.chicken cracking starter with cheese sauce 2pcs.jpg"],
      },
      {
        id: "starter6",
        name: "Chicken Seekh with Cheese Sauce",
        price: 145,
        type: "nonveg",
        popular: true,
        image: starterImageMap["62.chicken seekh with cheese sauce 2pcs.jpg"],
      },
      {
        id: "starter7",
        name: "Chicken Crackling with Cheese Sauce",
        price: 145,
        type: "nonveg",
        popular: true,
        image: starterImageMap["61.chicken chunks with cheese sauce 5 pcs.jpg"],
      },
    ],
  },

  {
    category: "Fries",
    items: [
      {
        id: "fries1",
        name: "Regular French Fries",
        price: 69,
        type: "veg",
        image: friesImageMap["51.Regular fries.jpg"],
      },
      {
        id: "fries2",
        name: "Loaded Cheesy Fries",
        price: 129,
        type: "veg",
        popular: true,
        image: friesImageMap["52.cheesy finger 2pcs and loaded fries.jpg"],
      },
      {
        id: "fries3",
        name: "Loaded Chilli Garlic Cheesy Fries",
        price: 145,
        type: "veg",
        image: friesImageMap["53.loaded cheesy fries.jpg"],
      },
      {
        id: "fries4",
        name: "Cheesy Fingers & Loaded Fries",
        price: 199,
        type: "veg",
        popular: true,
        image: friesImageMap["54.cheesy chunks 3pcs and loaded fries_.jpg"],
      },
      {
        id: "fries5",
        name: "Chicken Chunks & Loaded Fries",
        price: 219,
        type: "nonveg",
        popular: true,
        image: friesImageMap["55.loaded cheesy chicken crispy fries_.jpg"],
      },
      {
        id: "fries6",
        name: "Loaded Cheesy Chicken Crispy Fries",
        price: 299,
        type: "nonveg",
        popular: true,
        image: friesImageMap["Loaded Creesy Chicken Crispy Fries.jpg"],
      },
      {
        id: "fries7",
        name: "Cheesy Chicken Chunks (3pc) & Loaded Fries",
        price: 219,
        type: "nonveg",
        image: friesImageMap["Cheesy Chicken Chunks (3pc) & Loaded Fries.jpg"],
      },
      {
        id: "fries8",
        name: "Cheesy Fingers (2Pc) & Loaded Fries",
        price: 199,
        type: "veg",
        image: friesImageMap["Cheesy Fingers (2Pc) & Loaded Fries.jpg"],
      },
      {
        id: "fries9",
        name: "Loaded Cheesy Fries",
        price: 129,
        type: "veg",
        image: friesImageMap["Loaded Cheesy Fries.jpg"],
      },
      {
        id: "fries10",
        name: "Regular Fries",
        price: 69,
        type: "veg",
        image: friesImageMap["Regular Fries.jpg"],
      },
    ],
  },

  {
    category: "Sliced Sandwich",
    items: [
      {
        id: "sliced1",
        name: "Simple Veg Sliced Sandwich",
        price: 49,
        type: "veg",
        image: slicedImageMap["46.Simple veg sliced sandwich (2).JPG"],
      },
      {
        id: "sliced2",
        name: "Aloo Masala Sliced Sandwich Toast",
        price: 99,
        type: "veg",
        image: slicedImageMap["47.aloo masala sliced sandwich toast (2).jpg"],
      },
      {
        id: "sliced3",
        name: "Cheese Sliced Sandwich",
        price: 129,
        type: "veg",
        image: slicedImageMap["48.cheese sliced sandwich toast (2).JPG"],
      },
      {
        id: "sliced4",
        name: "Chicken Crispy Sliced Sandwich Toast",
        price: 159,
        type: "nonveg",
        image: slicedImageMap["49.chicken crispy sliced sandwich toast (2).jpg"],
      },
      {
        id: "sliced5",
        name: "Chicken Crispy and Cheese Sliced Sandwich Toast",
        price: 179,
        type: "nonveg",
        image: slicedImageMap["50.chicken crispy and cheese sliced sandwich toast.jpg"],
      },
      {
        id: "sliced6",
        name: "Aloo-Masala-Grilled-Sandwich",
        price: 99,
        type: "veg",
        image: slicedImageMap["aloo-masala-grilled-sandwich-1.jpg"],
      },
      {
        id: "sliced7",
        name: "Cheese Toast",
        price: 129,
        type: "veg",
        image: slicedImageMap["cheese toast.jpg"],
      },
      {
        id: "sliced8",
        name: "Chicken Crispy and Cheese",
        price: 179,
        type: "nonveg",
        image: slicedImageMap["chicken crispy and cheese.jpg"],
      },
      {
        id: "sliced9",
        name: "Chicken Crispy",
        price: 159,
        type: "nonveg",
        image: slicedImageMap["chicken crispy.jpg"],
      },
      {
        id: "sliced10",
        name: "Simple Sliced Bread Sandwich",
        price: 49,
        type: "veg",
        image: slicedImageMap["simple sliced bread sandwich.jpg"],
      },
    ],
  },

  {
    category: "Cheesy Panini & Wraps",
    items: [
      {
        id: "panwrap1",
        name: "Chicken Masala Panini",
        price: 199,
        type: "nonveg",
        image: paniniWrapsImageMap["Chicken Masala Panini.jpg"],
      },
      {
        id: "panwrap2",
        name: "Chicken Masala Wrap",
        price: 199,
        type: "nonveg",
        image: paniniWrapsImageMap["Chicken Masala Wrap.jpg"],
      },
      {
        id: "panwrap3",
        name: "Paneer Cheesy Masala Panini",
        price: 199,
        type: "veg",
        image: paniniWrapsImageMap["Paneer Cheesy Masala Panini.jpg"],
      },
      {
        id: "panwrap4",
        name: "Paneer Masala Wrap",
        price: 199,
        type: "veg",
        image: paniniWrapsImageMap["Paneer Masala Wrap.jpg"],
      },
    ],
  },

  {
    category: "Combo",
    items: [
      { id: "combo1", name: "Veg Crispy Sub 4 Inch + Coke", price: 169, type: "veg" },
      { id: "combo2", name: "Paneer Masala Sub 4 Inch + Coke", price: 219, type: "veg", popular: true },
      { id: "combo3", name: "Chicken Crispy Sub 4 Inch + Coke", price: 199, type: "nonveg", popular: true },
      { id: "combo4", name: "Chicken Masala Sub 4 Inch + Coke", price: 219, type: "nonveg", popular: true },
    ],
  },

 {
  category: "Drinks",
  items: [
    { id: "drink1", name: "Coke",   price: 39, type: "veg", drink: true, image: drinks["/src/assets/items/Drinks/ck.jpeg"] },
    { id: "drink2", name: "Pepsi",  price: 39, type: "veg", drink: true, image: drinks["/src/assets/items/Drinks/ck.jpeg"] },
    { id: "drink3", name: "Sprite", price: 39, type: "veg", drink: true, image: drinks["/src/assets/items/Drinks/ck.jpeg"] },
    { id: "drink4", name: "Fanta",  price: 39, type: "veg", drink: true, image: drinks["/src/assets/items/Drinks/ck.jpeg"] },
  ],
},


  {
    category: "Extra Add Ons",
    items: [
      { id: "addon1", name: "Mozzarella & Cheddar Cheese", price: 99, type: "veg", addon: true },
      { id: "addon2", name: "Spicy Peri Peri Sauce", price: 99, type: "veg", addon: true },
      { id: "addon3", name: "Extra Chicken Patty", price: 99, type: "nonveg", addon: true },
      { id: "addon4", name: "Cheese Sauce", price: 49, type: "veg", addon: true },
      { id: "addon5", name: "Extra Veg Patty", price: 99, type: "veg", addon: true },
      { id: "addon6", name: "Coke", price: 39, type: "veg", addon: true, drink: true ,image: drinks["/src/assets/items/Drinks/ck.jpeg"] },
    ],
  },
];
