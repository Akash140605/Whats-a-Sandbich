export const MENU_DATA = [
  {
    category: "Submarine Sandwiches - Veg",
    items: [
      { id:"subveg1", name:"Veggie Classic", priceMini:49, priceMonster:99, type:"veg", popular:true },
      { id:"subveg2", name:"Masala Veg", priceMini:99, priceMonster:199, type:"veg", popular:true },
      { id:"subveg3", name:"Aloo Masala", priceMini:139, priceMonster:279, type:"veg" },
      { id:"subveg4", name:"Veg Crispy", priceMini:149, priceMonster:299, type:"veg", popular:true },
      { id:"subveg5", name:"Spinach & Corn", priceMini:169, priceMonster:319, type:"veg" },
      { id:"subveg6", name:"Mozzarella Cheesy Fingers", priceMini:179, priceMonster:339, type:"veg", popular:true },
      { id:"subveg7", name:"Paneer Masala", priceMini:199, priceMonster:399, type:"veg", popular:true },
      { id:"subveg8", name:"Paneer Crackling", priceMini:199, priceMonster:399, type:"veg", popular:true }
    ]
  },

  {
    category: "Submarine Sandwiches - Chicken",
    items: [
      { id:"subchk1", name:"Chicken Chunks", priceSmall:149, priceMonster:299, type:"nonveg", popular:true },
      { id:"subchk2", name:"Chicken Crispy", priceSmall:179, priceMonster:359, type:"nonveg", popular:true },
      { id:"subchk3", name:"Chicken Super Patty", priceSmall:189, priceMonster:379, type:"nonveg" },
      { id:"subchk4", name:"Chicken Seekh Sub", priceSmall:189, priceMonster:379, type:"nonveg", popular:true },
      { id:"subchk5", name:"Chicken Masala Sub", priceSmall:199, priceMonster:399, type:"nonveg", popular:true },
      { id:"subchk6", name:"Chicken Crackling", priceSmall:229, priceMonster:459, type:"nonveg", popular:true }
    ]
  },

  {
    category: "Hero Wraps - Veg",
    items: [
      { id:"wrapveg1", name:"Dr. Doom Veg & Cheesy Hero Wrap", price:69, type:"veg" },
      { id:"wrapveg2", name:"Agent Aloo Masala Hero Wrap", price:99, type:"veg", popular:true },
      { id:"wrapveg3", name:"Avenger Aloo Masala Hero Wrap", price:139, type:"veg" },
      { id:"wrapveg4", name:"Captain Veg Cutlet Hero Wrap", price:149, type:"veg", popular:true },
      { id:"wrapveg5", name:"Popeye Spinach & Corn Hero Wrap", price:169, type:"veg" },
      { id:"wrapveg6", name:"Mr. Fantastic Cheesy Fingers Hero Wrap", price:179, type:"veg" },
      { id:"wrapveg7", name:"Professor X Paneer Masala Hero Wrap", price:199, type:"veg", popular:true },
      { id:"wrapveg8", name:"The Hulk Paneer Crackling Hero Wrap", price:199, type:"veg", popular:true }
    ]
  },

  {
    category: "Hero Wraps - Chicken",
    items: [
      { id:"wrapchk1", name:"Nuclear Chicken Nuggets Hero Wrap", price:149, type:"nonveg", popular:true },
      { id:"wrapchk2", name:"Colonel Chicken Cutlet Hero Wrap", price:179, type:"nonveg" },
      { id:"wrapchk3", name:"Super Duper Chicken Hero Wrap", price:189, type:"nonveg", popular:true },
      { id:"wrapchk4", name:"Spidey Seekh Hero Wrap", price:189, type:"nonveg", popular:true },
      { id:"wrapchk5", name:"Thanos Chicken Masala Hero Wrap", price:199, type:"nonveg", popular:true },
      { id:"wrapchk6", name:"Captain Fried Chicken Hero Wrap", price:229, type:"nonveg", popular:true }
    ]
  },

  {
    category: "Mini Hero & Sidekicks",
    items: [
      { id:"mini1", name:"Dr. Doom Veg & Cheesy Mini Hero", price:99, type:"veg" },
      { id:"mini2", name:"Professor X Paneer Masala Mini Hero", price:199, type:"veg", popular:true },
      { id:"mini3", name:"Thanos Chicken Masala Mini Hero", price:199, type:"nonveg", popular:true },
      { id:"mini4", name:"Captain Fried Chicken Mini Hero", price:229, type:"nonveg", popular:true }
    ]
  },

  {
    category: "Superhero Panini",
    items: [
      { id:"panini1", name:"Dr. Doom Veg & Cheesy Superhero", price:199, type:"veg" },
      { id:"panini2", name:"Agent Aloo Masala Superhero", price:329, type:"veg", popular:true },
      { id:"panini3", name:"Professor X Paneer Masala Superhero", price:339, type:"veg", popular:true },
      { id:"panini4", name:"Captain Veg Cutlet Superhero", price:339, type:"veg" },
      { id:"panini5", name:"Popeye Spinach & Corn Superhero", price:339, type:"veg" },
      { id:"panini6", name:"Mr. Fantastic Cheesy Fingers Superhero", price:339, type:"veg" },
      { id:"panini7", name:"The Hulk Paneer Crackling Superhero", price:399, type:"veg", popular:true },
      { id:"panini8", name:"Colonel Chicken Cutlet Superhero", price:299, type:"nonveg" },
      { id:"panini9", name:"Thanos Chicken Masala Superhero", price:359, type:"nonveg", popular:true },
      { id:"panini10", name:"Nuclear Chicken Nuggets Superhero", price:379, type:"nonveg", popular:true },
      { id:"panini11", name:"Super Duper Chicken Superhero", price:379, type:"nonveg" },
      { id:"panini12", name:"Spidey Chicken Seekh Superhero", price:399, type:"nonveg", popular:true },
      { id:"panini13", name:"Captain Fried Chicken Superhero", price:459, type:"nonveg", popular:true }
    ]
  },

  {
    category: "Burgers",
    items: [
      { id:"burger1", name:"Aloo Masala Burger", price:99, type:"veg" },
      { id:"burger2", name:"Veg Crispy Burger", price:149, type:"veg", popular:true },
      { id:"burger3", name:"Spinach & Corn Burger", price:159, type:"veg" },
      { id:"burger4", name:"Paneer Crackling Burger", price:189, type:"veg", popular:true },
      { id:"burger5", name:"Chicken Crispy Burger", price:159, type:"nonveg", popular:true },
      { id:"burger6", name:"Chicken Super Burger", price:169, type:"nonveg" },
      { id:"burger7", name:"Chicken Crackling Burger", price:199, type:"nonveg", popular:true }
    ]
  },

  {
    category: "Salads",
    items: [
      { id:"salad1", name:"Veggie Classic Salad", price:99, type:"veg" },
      { id:"salad2", name:"Veg Crispy Salad", price:169, type:"veg" },
      { id:"salad3", name:"Paneer Masala Salad", price:199, type:"veg", popular:true },
      { id:"salad4", name:"Paneer Crackling Salad", price:199, type:"veg", popular:true },
      { id:"salad5", name:"Chicken Masala Salad", price:179, type:"nonveg" },
      { id:"salad6", name:"Chicken Crispy Salad", price:189, type:"nonveg", popular:true },
      { id:"salad7", name:"Chicken Seekh Salad", price:299, type:"nonveg", popular:true },
      { id:"salad8", name:"Chicken Crackling Salad", price:299, type:"nonveg", popular:true }
    ]
  },

  {
    category: "Pav Burgers",
    items: [
      { id:"pav1", name:"Cheesy Masala Veg Pav Burger", price:59, type:"veg" },
      { id:"pav2", name:"Spicy Peri Peri Vada Pav Burger", price:99, type:"veg", popular:true },
      { id:"pav3", name:"Veg Crispy Pav Burger", price:149, type:"veg", popular:true },
      { id:"pav4", name:"Chicken Chunks Cheesy Pav Burger", price:149, type:"nonveg", popular:true },
      { id:"pav5", name:"Chicken Crispy Pav Burger", price:169, type:"nonveg" },
      { id:"pav6", name:"Chicken Crackling Pav Burger", price:229, type:"nonveg", popular:true }
    ]
  },

  {
    category: "Starters",
    items: [
      { id:"starter1", name:"Masala Mumbai Wada & Cheese Sauce", price:135, type:"veg" },
      { id:"starter2", name:"Veg Cutlet with Cheese Sauce", price:135, type:"veg" },
      { id:"starter3", name:"Spinach & Corn Cutlet with Cheese Sauce", price:135, type:"veg" },
      { id:"starter4", name:"Chicken Cutlet with Cheese Sauce", price:145, type:"nonveg" },
      { id:"starter5", name:"Chicken Chunks with Cheese Sauce", price:145, type:"nonveg", popular:true },
      { id:"starter6", name:"Chicken Seekh with Cheese Sauce", price:145, type:"nonveg", popular:true },
      { id:"starter7", name:"Chicken Crackling with Cheese Sauce", price:145, type:"nonveg", popular:true }
    ]
  },

  {
    category: "Loaded Fries",
    items: [
      { id:"fries1", name:"Regular French Fries", price:69, type:"veg" },
      { id:"fries2", name:"Loaded Cheesy Fries", price:129, type:"veg", popular:true },
      { id:"fries3", name:"Loaded Chilli Garlic Cheesy Fries", price:145, type:"veg" },
      { id:"fries4", name:"Cheesy Fingers & Loaded Fries", price:199, type:"veg", popular:true },
      { id:"fries5", name:"Chicken Chunks & Loaded Fries", price:219, type:"nonveg", popular:true },
      { id:"fries6", name:"Loaded Cheesy Chicken Crispy Fries", price:299, type:"nonveg", popular:true }
    ]
  },

  {
    category: "Dessert & Drinks",
    items: [
      { id:"drink1", name:"Coke", price:39, type:"veg", drink:true },
      { id:"dessert1", name:"Chocolate Walnut Brownie", price:99, type:"veg", popular:true }
    ]
  },

  {
    category: "Extra Add Ons",
    items: [
      { id:"addon1", name:"Mozzarella & Cheddar Cheese", price:99, type:"veg", addon:true },
      { id:"addon2", name:"Spicy Peri Peri Sauce", price:99, type:"veg", addon:true },
      { id:"addon3", name:"Extra Chicken Patty", price:99, type:"nonveg", addon:true },
      { id:"addon4", name:"Cheese Sauce", price:49, type:"veg", addon:true },
      { id:"addon5", name:"Extra Veg Patty", price:99, type:"veg", addon:true },
      { id:"addon6", name:"Coke", price:39, type:"veg", addon:true, drink:true }
    ]
  }
];
