/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Review } from './types';

// Let's import the generated image paths. 
// We can use direct path strings in Vite.
export const IMAGES = {
  heroGourmetDish: '/src/assets/images/hero_gourmet_dish_1782243248654.jpg',
  chefArsenePortrait: '/src/assets/images/chef_arsene_portrait_1782243266335.jpg',
  popularWagyuSteak: '/src/assets/images/popular_wagyu_steak_1782243284240.jpg',
  healthySalmonBowl: '/src/assets/images/healthy_salmon_bowl_1782243306453.jpg',
  megaWingBoxPng: '/src/assets/images/mega_wing_box_png_1782247987392.jpg',
  fullyLoadedBoxPng: '/src/assets/images/fully_loaded_box_png_1782248004377.jpg',
  chefsZingerBoxPng: '/src/assets/images/chefs_zinger_box_png_1782248018823.jpg',
  imperialSavoryBoxPng: '/src/assets/images/imperial_savory_box_png_1782248034043.jpg',
};

export const MENU_ITEMS: MenuItem[] = [
  // --- LIMITED TIME OFFERS (PNG CODES COPTED DESIGN) ---
  {
    id: 'l1',
    name: 'MEGA WING BOX',
    description: 'Crispy wings, golden fries, sauce & cold cola.',
    price: 15.00,
    category: 'offers',
    image: IMAGES.megaWingBoxPng,
    tags: ['Combo', 'Limited Time', 'Crispy Wings'],
  },
  {
    id: 'l2',
    name: 'FULLY LOADED BOX',
    description: 'Double-stack burger, tenders, fries & cold cola.',
    price: 18.50,
    category: 'offers',
    image: IMAGES.fullyLoadedBoxPng,
    tags: ['Combo', 'Bestseller', 'Double Stack'],
  },
  {
    id: 'l3',
    name: 'CHEF\'S ZINGER BOX',
    description: 'Crispy chicken burger, onion rings, fries & drink.',
    price: 16.00,
    category: 'offers',
    image: IMAGES.chefsZingerBoxPng,
    tags: ['Burger', 'Spicy', 'Onion Rings'],
  },
  {
    id: 'l4',
    name: 'IMPERIAL SAVORY BOX',
    description: 'Roasted chicken thighs, waffle fries & premium juice.',
    price: 19.00,
    category: 'offers',
    image: IMAGES.imperialSavoryBoxPng,
    tags: ['Roasted Chicken', 'Savory', 'Waffle Fries'],
  },

  // --- FEATURED MEALS ---
  {
    id: 'f1',
    name: 'Chef Arsène’s Imperial Ribeye',
    description: '45-day dry-aged Prime Ribeye brushed with white truffle butter, garnished with 24k edible gold leaf flakes, and served with charred asparagus.',
    price: 68.00,
    category: 'featured',
    image: IMAGES.heroGourmetDish,
    tags: ['Signature', 'Gold Leaf', 'Dry-Aged'],
    isFeatured: true,
  },
  {
    id: 'f2',
    name: 'Black Ink Lobster Risotto',
    description: 'Creamy Acquerello Carnaroli rice infused with squid ink, topped with butter-poached Maine lobster tail and a drizzle of Meyer lemon gold herb oil.',
    price: 52.00,
    category: 'featured',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800',
    tags: ['Seafood', 'Gluten-Free'],
    isFeatured: true,
  },
  {
    id: 'f3',
    name: 'White Truffle Tagliolini',
    description: 'Handmade egg pasta tossed in a rich, velvety Parmigiano-Reggiano emulsion, showered with freshly shaved Alba white truffles at the peak of their fragrance.',
    price: 58.00,
    category: 'featured',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=800',
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
    image: IMAGES.popularWagyuSteak,
    tags: ['Wagyu A5', 'Luxury', 'Chef Choice'],
    isPopular: true,
  },
  {
    id: 'p2',
    name: 'Truffle Glazed Roasted Duck',
    description: 'Slow-roasted crispy duck breast served over parsnip purée, with a decadent wild berry and black truffle glaze.',
    price: 45.00,
    category: 'popular',
    image: 'https://images.unsplash.com/photo-1514944224746-6bba5b09e5c2?auto=format&fit=crop&q=80&w=800',
    tags: ['Crispy Skin', 'Rich Flavor'],
    isPopular: true,
  },
  {
    id: 'p3',
    name: 'Arsène Signature Truffle Burger',
    description: 'Double-stack wagyu beef patties, melted aged Gruyère, caramelized onions, house-made truffle aioli, nested inside a gilded brioche bun. Served with truffle parmesan frites.',
    price: 32.00,
    category: 'popular',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    tags: ['Best Seller', 'Wagyu Patty'],
    isPopular: true,
  },
  {
    id: 'p4',
    name: 'Burrata & Heirloom Gold Salad',
    description: 'Creamy Italian burrata surrounded by heirloom cherry tomatoes, cold-pressed olive oil, aged balsamic glaze, and a dusting of gold dust.',
    price: 24.00,
    category: 'popular',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800',
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
    image: IMAGES.healthySalmonBowl,
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
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    tags: ['Organic', 'Cold-Pressed', 'Non-Alcoholic'],
  },
  {
    id: 'b2',
    name: 'Chef’s Cold Pressed Hibiscus Glow',
    description: 'A cooling organic infusion of wild hibiscus flowers, rose petals, citrus rind, sweetened lightly with blue agave.',
    price: 10.00,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=800',
    tags: ['Antioxidant-Rich', 'Vegan'],
  },

  // --- DESSERTS ---
  {
    id: 'd1',
    name: 'Arsène Golden Chocolate Sphere',
    description: 'A delicate single-origin dark chocolate sphere filled with hazelnut praline mousse. Melted warm gold-flecked caramel sauce is poured tableside.',
    price: 18.00,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800',
    tags: ['Decadent', 'Signature Dessert'],
  },
  {
    id: 'd2',
    name: 'Saffron Mango Panna Cotta',
    description: 'Silky cream infused with premium Kashmiri saffron, topped with a fresh champagne mango purée and edible gold dust.',
    price: 16.00,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800',
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
