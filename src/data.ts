/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Review } from './types';

// Let's import the generated image paths. 
// We can use direct path strings in Vite.
export const IMAGES = {
  chefArsenePortrait:
    "https://res.cloudinary.com/dmqwlcjec/image/upload/f_auto,q_auto,w_900/v1782381864/ITS_MY_BIRTHDAY_YALL..._A_NIGGA_TURNED_25_YEARS_OLD_ITS_TIME_TO_GET_MORE_SERIOUS_ABO_zm4t9m.webp",
};

// New Cloudinary product images (5 links)
export const PRODUCT_IMAGES = [
  "https://res.cloudinary.com/dmqwlcjec/image/upload/v1782385099/images_c7ptnv.jpg",
  "https://res.cloudinary.com/dmqwlcjec/image/upload/v1782385080/images_ekpik6.jpg",
  "https://res.cloudinary.com/dmqwlcjec/image/upload/v1782385050/images_nf8uo5.jpg",
  "https://res.cloudinary.com/dmqwlcjec/image/upload/v1782385038/images_wb74lt.jpg",
  "https://res.cloudinary.com/dmqwlcjec/image/upload/v1782385025/images_c06w0r.jpg",
];

const img = (index: number) => PRODUCT_IMAGES[index % PRODUCT_IMAGES.length];

export const MENU_ITEMS: MenuItem[] = [
  // --- LIMITED TIME OFFERS (PNG CODES COPTED DESIGN) ---
  {
    id: 'l1',
    name: 'MEGA WING BOX',
    description: 'Crispy wings, golden fries, sauce & cold cola.',
    price: 15.00,
    category: 'offers',
    image: img(0),
    tags: ['Combo', 'Limited Time', 'Crispy Wings'],
  },
  {
    id: 'l2',
    name: 'FULLY LOADED BOX',
    description: 'Double-stack burger, tenders, fries & cold cola.',
    price: 18.50,
    category: 'offers',
    image: img(1),
    tags: ['Combo', 'Bestseller', 'Double Stack'],
  },
  {
    id: 'l3',
    name: 'CHEF\'S ZINGER BOX',
    description: 'Crispy chicken burger, onion rings, fries & drink.',
    price: 16.00,
    category: 'offers',
    image: img(2),
    tags: ['Burger', 'Spicy', 'Onion Rings'],
  },
  {
    id: 'l4',
    name: 'IMPERIAL SAVORY BOX',
    description: 'Roasted chicken thighs, waffle fries & premium juice.',
    price: 19.00,
    category: 'offers',
    image: img(3),
    tags: ['Roasted Chicken', 'Savory', 'Waffle Fries'],
  },

  // --- FEATURED MEALS ---
  {
    id: 'f1',
    name: 'Chef Arsène’s Imperial Ribeye',
    description: '45-day dry-aged Prime Ribeye brushed with white truffle butter, garnished with 24k edible gold leaf flakes, and served with charred asparagus.',
    price: 68.00,
    category: 'featured',
    image: img(4),
    tags: ['Signature', 'Gold Leaf', 'Dry-Aged'],
    isFeatured: true,
  },
  {
    id: 'f2',
    name: 'Black Ink Lobster Risotto',
    description: 'Creamy Acquerello Carnaroli rice infused with squid ink, topped with butter-poached Maine lobster tail and a drizzle of Meyer lemon gold herb oil.',
    price: 52.00,
    category: 'featured',
    image: img(5),
    tags: ['Seafood', 'Gluten-Free'],
    isFeatured: true,
  },
  {
    id: 'f3',
    name: 'White Truffle Tagliolini',
    description: 'Handmade egg pasta tossed in a rich, velvety Parmigiano-Reggiano emulsion, showered with freshly shaved Alba white truffles at the peak of their fragrance.',
    price: 58.00,
    category: 'featured',
    image: img(6),
    tags: ['Handmade', 'Truffle', 'Vegetarian'],
    isFeatured: true,
  },

  // --- POPULAR MENU ---
  {
    id: 'p1',
    name: 'Seared Wagyu A5 Steak',
    description: 'Perfectly seared Japanese Wagyu A5, sliced and finished with hand-harvested Fleur de Sel, gold flakes, and a rich shallot red wine reduction.',
    price: 95.00,
    category: 'popular',
    image: img(7),
    tags: ['Wagyu A5', 'Luxury', 'Chef Choice'],
    isPopular: true,
  },
  {
    id: 'p2',
    name: 'Truffle Glazed Roasted Duck',
    description: 'Slow-roasted crispy duck breast served over parsnip purée, with a decadent wild berry and black truffle glaze.',
    price: 45.00,
    category: 'popular',
    image: img(8),
    tags: ['Crispy Skin', 'Rich Flavor'],
    isPopular: true,
  },
  {
    id: 'p3',
    name: 'Arsène Signature Truffle Burger',
    description: 'Double-stack wagyu beef patties, melted aged Gruyère, caramelized onions, house-made truffle aioli, nested inside a gilded brioche bun. Served with truffle parmesan frites.',
    price: 32.00,
    category: 'popular',
    image: img(9),
    tags: ['Best Seller', 'Wagyu Patty'],
    isPopular: true,
  },
  {
    id: 'p4',
    name: 'Burrata & Heirloom Gold Salad',
    description: 'Creamy Italian burrata surrounded by heirloom cherry tomatoes, cold-pressed olive oil, aged balsamic glaze, and a dusting of gold dust.',
    price: 24.00,
    category: 'popular',
    image: img(10),
    tags: ['Fresh', 'Vegetarian', 'Gluten-Free'],
    isPopular: true,
  },

  // --- HEALTHY FITNESS MEALS ---
  {
    id: 'h1',
    name: 'Royal Salmon Protein Bowl',
    description: 'Crispy-skinned organic salmon fillet atop dynamic red quinoa and black wild rice, fresh avocado, edamame, and a warm ginger gold sesame drizzle.',
    price: 29.00,
    category: 'healthy',
    image: img(11),
    tags: ['Keto-Friendly', 'High Protein', 'Superfood'],
    calories: 620,
    protein: 48,
    carbs: 22,
    fat: 31,
    isHealthy: true,
  },
  {
    id: 'h2',
    name: 'Keto Herb beef Tenderloin Bowl',
    description: 'Pan-seared beef tenderloin medallions over garlic riced cauliflower, wilted baby spinach, roasted pine nuts, and herb chimichurri.',
    price: 38.00,
    category: 'healthy',
    image: img(12),
    tags: ['Low-Carb', 'Keto', 'High Protein'],
    calories: 540,
    protein: 52,
    carbs: 8,
    fat: 26,
    isHealthy: true,
  },
  {
    id: 'h3',
    name: 'Harvest Sesame Tofu & Avocado Bowl',
    description: 'Marinated and crisp-baked organic tofu over organic tri-color quinoa, roasted sweet potatoes, ribboned carrots, avocado, and liquid aminos gold dressing.',
    price: 23.00,
    category: 'healthy',
    image: img(13),
    tags: ['Vegan', 'Plant-Based', 'Gluten-Free'],
    calories: 450,
    protein: 21,
    carbs: 38,
    fat: 18,
    isHealthy: true,
  },

  // --- BEVERAGES ---
  {
    id: 'b1',
    name: 'Gilded Ginger Elixir',
    description: 'Fresh organic ginger root, fresh squeezed lime juice, raw wild honeycomb, sparkling spring water, and edible gold dust.',
    price: 12.00,
    category: 'beverages',
    image: img(14),
    tags: ['Organic', 'Cold-Pressed', 'Non-Alcoholic'],
  },
  {
    id: 'b2',
    name: 'Chef’s Cold Pressed Hibiscus Glow',
    description: 'A cooling organic infusion of wild hibiscus flowers, rose petals, citrus rind, sweetened lightly with blue agave.',
    price: 10.00,
    category: 'beverages',
    image: img(15),
    tags: ['Antioxidant-Rich', 'Vegan'],
  },

  // --- DESSERTS ---
  {
    id: 'd1',
    name: 'Arsène Golden Chocolate Sphere',
    description: 'A delicate single-origin dark chocolate sphere filled with hazelnut praline mousse. Melted warm gold-flecked caramel sauce is poured tableside.',
    price: 18.00,
    category: 'desserts',
    image: img(16),
    tags: ['Decadent', 'Signature Dessert'],
  },
  {
    id: 'd2',
    name: 'Saffron Mango Panna Cotta',
    description: 'Silky cream infused with premium Kashmiri saffron, topped with a fresh champagne mango purée and edible gold dust.',
    price: 16.00,
    category: 'desserts',
    image: img(17), // 17 items total, so index 17 gives img(17 % 5 = 2)
    tags: ['Exotic', 'Gluten-Free'],
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'dominique_st',
    rating: 5,
    text: 'Honestly, the best wagyu steak I\'ve ordered in Kigali. Arrived hot.',
    date: 'June 18, 2026',
    avatar: '',
    dish: ''
  },
  {
    id: 'r2',
    name: 'marcus_v',
    rating: 5,
    text: 'Amazing packaging, and the food actually tastes fresh.',
    date: 'June 12, 2026',
    avatar: '',
    dish: ''
  },
  {
    id: 'r3',
    name: 'elena_rostova',
    rating: 5,
    text: 'So simple to order. Will definitely be a regular here.',
    date: 'June 05, 2026',
    avatar: '',
    dish: ''
  }
];

export const DELIVER_INFO = {
  phone: '+1 (555) 789-9876', // WhatsApp number for orders
  hours: '11:30 AM – 10:00 PM',
  deliveryTimeRange: '30 – 45 mins',
  areas: 'Downtown, Beverly Hills, West Hollywood, Santa Monica, and Bel Air',
  minOrder: 35.00,
  deliveryFee: 5.00,
};
