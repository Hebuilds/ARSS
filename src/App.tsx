/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Star, ShieldCheck, MapPin, Clock, ArrowRight, 
  Instagram, Twitter, Linkedin, Check, ChevronRight, ChevronLeft, BadgePercent, LayoutGrid, X, 
  Trash2, Heart, Award, Leaf, ShoppingBag, Plus, Info, Zap, ShoppingCart, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types & Data
import { MenuItem, CartItem } from './types';
import { MENU_ITEMS, REVIEWS, DELIVER_INFO, IMAGES } from './data';

// Components
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [quickNotes, setQuickNotes] = useState<{ [key: string]: string }>({});
  const [menuLimit, setMenuLimit] = useState(6);
  const [showCategoryPanel, setShowCategoryPanel] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Scrolled-to references for sections
  const popularRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 200;
      categoryScrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };
  const healthyRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Section scroll handler
  const handleScrollToSection = (sectionId: string) => {
    let targetRef: React.RefObject<HTMLDivElement | null> | null = null;
    if (sectionId === 'popular-section') targetRef = popularRef;
    if (sectionId === 'healthy-section') targetRef = healthyRef;
    if (sectionId === 'about-section') targetRef = aboutRef;
    if (sectionId === 'reviews-section') targetRef = reviewsRef;

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cart operations
  const handleAddToCart = (menuItem: MenuItem, notes?: string) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.menuItem.id === menuItem.id);
      if (existing) {
        return prevCart.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1, notes: notes || item.notes }
            : item
        );
      }
      return [...prevCart, { menuItem, quantity: 1, notes: notes || '' }];
    });
    // Trigger a brief gold pulse on the cart badge instead of forcing the drawer open,
    // so a person can keep adding multiple items without interruption.
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 700);

    // Trigger the plus-button feedback (icon swap + flash) on this specific item's button
    setJustAddedId(menuItem.id);
    setTimeout(() => setJustAddedId(null), 900);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.menuItem.id === id) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuItem.id === id ? { ...item, notes } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.menuItem.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOrderSuccess = () => {
    setCart([]); // Clear cart
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 8000); // Display for 8s
  };

  // Total item count in cart
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Categories list for filtering popular section
  const categories = [
    { value: 'all', label: 'All Selections' },
    { value: 'offers', label: 'Combo Boxes' },
    { value: 'popular', label: 'Signature Dishes' },
    { value: 'healthy', label: 'Fitness & Macro' },
    { value: 'beverages', label: 'Elixirs & Beverages' },
    { value: 'desserts', label: 'Desserts' },
  ];

  // Filtering logic
  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#C5A059] selection:text-black">
      {/* Dynamic Header */}
      <Header 
        cartCount={cartCount} 
        cartPulse={cartPulse}
        onCartClick={() => setIsCartOpen(true)} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* Spacer to offset the now-fixed header's height, since fixed elements no longer occupy layout space */}
      <div className="h-16 sm:h-20" />

      {/* Success Notification Banner */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
          >
            <div className="bg-zinc-950 border-2 border-[#C5A059] text-white p-5 rounded-2xl shadow-2xl flex items-start gap-4 backdrop-blur-lg">
              <div className="p-2 rounded-full bg-[#C5A059]/20 text-[#C5A059] shrink-0">
                <Check size={20} strokeWidth={3} />
              </div>
              <div className="flex-1">
                <h4 className="font-serif text-base font-bold text-[#C5A059] uppercase tracking-wider">Order Dispatched to WhatsApp!</h4>
                <p className="text-xs text-gray-400 mt-1">
                  We've prepared your high-end invoice and sent it to WhatsApp. Please press <strong className="text-white">"Send"</strong> in WhatsApp to verify your delivery address, pay via Mobile Money / Cash, and begin custom preparation.
                </p>
                <div className="mt-3 flex gap-3">
                  <button 
                    onClick={() => setShowSuccessToast(false)} 
                    className="text-[10px] font-mono text-[#C5A059] hover:underline uppercase"
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO SECTION WITH LUXURY BACKGROUND PHOTOGRAPHY */}
      <section className="relative overflow-hidden bg-[#050505] pt-6 pb-10 lg:pt-10 lg:pb-20 min-h-[auto] sm:min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between">
        {/* Full-bleed Background Image aligned to the right */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_85%] sm:bg-[center_70%] lg:bg-[right_65%] pointer-events-none"
          style={{ 
            backgroundImage: `url(https://res.cloudinary.com/dmqwlcjec/image/upload/f_auto,q_auto,w_1600/v1782252694/ChatGPT_Image_Jun_23_2026_09_30_14_PM_vli5ft.png)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full flex flex-col justify-between flex-grow">
          {/* Grid for centering the content and allowing the background chef on the right to shine */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-2 lg:mt-4 py-4">
            {/* Left side text column */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-4 md:space-y-6 flex flex-col items-start text-left">
              
              {/* Gold uppercase subtitle */}
              <div className="text-[#C5A059] text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase font-semibold">
                GOURMET DELIVERY REDEFINED
              </div>

              {/* Main serif title, left-aligned, no inline portrait */}
              <h1 className="font-editorial text-3xl sm:text-5xl lg:text-5xl xl:text-6xl leading-tight tracking-tight text-white font-medium text-left">
                <span>ARSS DELIVERY</span>
              </h1>

              {/* Gilded star separator */}
              <div className="flex items-center gap-4 w-full max-w-xs my-0.5 justify-start">
                <div className="h-[1px] bg-[#C5A059]/40 w-12" />
                <span className="text-[#C5A059] text-xs">✦</span>
              </div>

              {/* Paragraph - short, premium, mobile-safe */}
              <p className="text-gray-400 text-sm max-w-[15rem] sm:max-w-md leading-relaxed font-sans font-light text-left">
                Fine dining, delivered.
              </p>

              {/* Order and Explore buttons */}
              <div className="flex flex-row gap-3 sm:gap-4 w-full sm:w-auto pt-2 justify-start items-center">
                <button
                  onClick={() => handleScrollToSection('popular-section')}
                  className="px-6 py-3 rounded-full bg-[#C5A059] hover:bg-[#d4b06a] text-black font-extrabold text-[10px] sm:text-xs uppercase tracking-[0.15em] transition-all duration-300 ease-out flex items-center justify-center gap-1.5 shadow-[0_4px_20px_rgba(197,160,89,0.2)] hover:shadow-[0_6px_24px_rgba(197,160,89,0.4)] hover:-translate-y-0.5"
                >
                  <span>ORDER</span>
                  <ArrowRight size={12} strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => handleScrollToSection('popular-section')}
                  className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/40 hover:bg-white hover:text-black hover:border-white font-semibold text-[10px] sm:text-xs uppercase tracking-[0.15em] transition-all duration-300 ease-out flex items-center justify-center gap-1.5 hover:-translate-y-0.5 group"
                >
                  <span>MENU</span>
                  <ShoppingBag size={12} className="text-[#C5A059] group-hover:text-black transition-colors duration-300" />
                </button>
              </div>

            </div>

            {/* Empty column to keep the right side open on desktop */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6" />
          </div>

        </div>

        {/* Smooth, premium organic asymmetrical wave divider */}
        <div className="absolute -bottom-px left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg 
            viewBox="0 0 1440 160" 
            className="relative block w-full h-[61px] sm:h-[101px] lg:h-[151px]" 
            preserveAspectRatio="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M0,96 C288,192 576,0 864,96 C1152,192 1296,128 1440,96 L1440,161 L0,161 Z" 
              fill="#ffffff" 
            />
          </svg>
        </div>
      </section>

      {/* SECTION 2: MENU SELECTIONS */}
      <div id="popular-section" ref={popularRef} className="-mt-px py-24 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="text-left">
              <span className="text-[#C5A059] text-xs font-mono font-bold tracking-[0.3em] uppercase block mb-3">
                SELECT YOUR COURSE
              </span>
              <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest text-zinc-900 uppercase">
                Menu Selections
              </h2>
            </div>

            {/* Quick search input */}
            <div className="w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Wagyu, Duck, Salad, etc..."
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#C5A059]/40 focus:outline-none focus:ring-0 text-zinc-900 rounded-xl py-3 px-4 text-xs font-mono transition-colors placeholder-zinc-400 shadow-sm"
              />
            </div>
          </div>

          {/* Category Tabs - grid icon for full panel, scroll bar peeks at the edge as the swipe affordance */}
          <div className="relative mb-16 flex items-center gap-2">
            <button
              onClick={() => setShowCategoryPanel(true)}
              aria-label="View all categories"
              className="shrink-0 w-9 h-9 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-black hover:border-[#C5A059] transition-colors duration-300"
            >
              <LayoutGrid size={15} />
            </button>

            <div ref={categoryScrollRef} className="flex items-center gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory h-9">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => { setSelectedCategory(cat.value); setMenuLimit(6); }}
                  className={`shrink-0 snap-start h-9 px-3.5 rounded-full text-[10px] font-mono tracking-wide uppercase whitespace-nowrap transition-all duration-300 ease-out flex items-center ${
                    selectedCategory === cat.value
                      ? 'bg-[#C5A059] text-black font-bold shadow-[0_4px_16px_rgba(197,160,89,0.35)]'
                      : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-[#C5A059]/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Full Category Panel - sliding overlay, grid style (inspired by Awayah's category opener) */}
          <AnimatePresence>
            {showCategoryPanel && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowCategoryPanel(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                />
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                  className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[101] p-6 sm:p-8 max-h-[75vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-[#C5A059] text-[10px] font-mono font-bold tracking-[0.25em] uppercase block mb-1">Browse</span>
                      <h3 className="font-editorial text-2xl font-bold text-zinc-900">All Categories</h3>
                    </div>
                    <button
                      onClick={() => setShowCategoryPanel(false)}
                      aria-label="Close category panel"
                      className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => {
                          setSelectedCategory(cat.value);
                          setMenuLimit(6);
                          setShowCategoryPanel(false);
                        }}
                        className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
                          selectedCategory === cat.value
                            ? 'bg-[#C5A059] border-[#C5A059] text-black shadow-[0_4px_16px_rgba(197,160,89,0.35)]'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-[#C5A059]/50 hover:bg-white'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold uppercase tracking-wide block">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Menu Items Grid: 3 columns on desktop/tablet, 2 columns on phone */}
          {filteredMenuItems.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-zinc-500 font-mono text-sm">No gourmet creation matches your search criteria.</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setMenuLimit(6); }}
                className="mt-4 px-4 py-2 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] text-xs font-mono uppercase tracking-wider rounded-lg transition-colors"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2.5 sm:gap-6 gap-y-4 sm:gap-y-8 pb-4">
                {filteredMenuItems.slice(0, menuLimit).map((item) => (
                  <div 
                    key={item.id}
                    className="bg-[#0c0c0c] rounded-[1rem] sm:rounded-[2rem] border border-zinc-900/60 flex flex-col justify-between items-stretch text-left relative hover:shadow-[0_15px_35px_rgba(197,160,89,0.06)] hover:border-[#C5A059]/30 transition-all duration-300 group h-[185px] sm:h-[295px] w-full overflow-hidden shadow-xl"
                  >
                    {/* Food Photo Container */}
                    <div className="h-[90px] sm:h-[165px] w-full overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        referrerPolicy="no-referrer" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />

                      {/* Mockup-style Heart button at top right */}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleToggleFavorite(item.id); }}
                        className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-rose-500 shadow-md flex items-center justify-center transition-all duration-300 z-10 active:scale-90 border border-white/10"
                        aria-label="Add to Favorites"
                      >
                        <Heart 
                          size={12} 
                          fill={favorites.includes(item.id) ? '#ef4444' : 'none'} 
                          className={favorites.includes(item.id) ? 'text-rose-500' : 'text-white/80'} 
                        />
                      </button>
                    </div>

                    {/* Text Details Area */}
                    <div className="p-2 sm:p-4 flex-1 flex flex-col justify-between bg-[#0c0c0c]">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1">
                          <h3 className="font-syne font-extrabold text-white text-[10px] sm:text-xs uppercase tracking-wide line-clamp-1 group-hover:text-[#C5A059] transition-colors leading-tight truncate">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-[8px] sm:text-[10px] text-zinc-400 font-sans line-clamp-1 leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>

                      {/* Price & Gold Purchase Button Row */}
                      <div className="flex items-center justify-between mt-1 sm:mt-3 pt-1.5 sm:pt-2 border-t border-zinc-900/60">
                        <div>
                          <p className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">PRICE</p>
                          <p className="text-[10px] sm:text-sm font-bold text-[#C5A059] font-outfit tracking-tight">
                            RWF {(item.price * 1000).toLocaleString()}
                          </p>
                        </div>

                        {/* Custom Gold button - swaps to a checkmark + dark flash when item is added */}
                        <button
                          onClick={() => handleAddToCart(item)}
                          className={`w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-full shadow-md flex items-center justify-center transition-all duration-300 active:scale-95 shrink-0 ${
                            justAddedId === item.id
                              ? 'bg-emerald-500 scale-125 shadow-[0_0_0_6px_rgba(16,185,129,0.2)]'
                              : 'bg-[#C5A059] hover:bg-[#b08b47] hover:shadow-lg hover:scale-105'
                          }`}
                          aria-label="Add to cart"
                        >
                          {justAddedId === item.id ? (
                            <Check size={12} strokeWidth={3} className="text-black sm:w-3.5 sm:h-3.5" />
                          ) : (
                            <span className="text-xs sm:text-sm font-extrabold font-sans leading-none text-black">+</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show More / Show Less Button */}
              {filteredMenuItems.length > 6 && (
                <div className="flex justify-center mt-16">
                  <button
                    onClick={() => setMenuLimit(prev => prev >= filteredMenuItems.length ? 6 : prev + 6)}
                    className="px-6 py-3 border border-zinc-200 hover:border-[#C5A059] text-zinc-700 hover:text-black text-xs font-mono uppercase tracking-widest rounded-full transition-all duration-300 bg-white shadow-sm hover:shadow-md font-bold"
                  >
                    {menuLimit >= filteredMenuItems.length ? 'SHOW LESS CREATIONS' : 'VIEW MORE CREATIONS'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: HEALTHY FITNESS MEALS */}
      <div id="healthy-section" ref={healthyRef} className="py-24 bg-[#fafaf9] border-b border-zinc-100 relative">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="text-left">
              <span className="text-emerald-600 text-xs font-mono font-bold tracking-[0.3em] uppercase block mb-3 flex items-center gap-2">
                <Leaf size={14} />
                <span>NUTRITION ON POINT</span>
              </span>
              <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest text-zinc-900 uppercase">
                Healthy Fitness Creations
              </h2>
            </div>
            <p className="text-zinc-600 text-xs sm:text-sm max-w-md leading-relaxed md:text-right font-sans font-light">
              Premium macro-calculated plates created with raw ingredients, complex grains, and wild-harvested proteins. Zero processed sugar, zero additives.
            </p>
          </div>

          {/* Fitness Cards grid: 3 cards on laptop/tablet, 2 on phone */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2.5 sm:gap-6 gap-y-4 sm:gap-y-8 pb-4">
            {MENU_ITEMS.filter((item) => item.category === 'healthy').map((item) => (
              <div 
                key={item.id}
                className="bg-[#0c0c0c] rounded-[1rem] sm:rounded-[2rem] border border-zinc-900/60 flex flex-col justify-between items-stretch text-left relative hover:shadow-[0_15px_35px_rgba(16,185,129,0.04)] hover:border-emerald-500/20 transition-all duration-300 group h-[185px] sm:h-[295px] w-full overflow-hidden shadow-xl"
              >
                {/* Food Photo Container */}
                <div className="h-[90px] sm:h-[165px] w-full overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    referrerPolicy="no-referrer" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Mockup-style Heart button at top right */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleFavorite(item.id); }}
                    className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-rose-500 shadow-md flex items-center justify-center transition-all duration-300 z-10 active:scale-90 border border-white/10"
                    aria-label="Add to Favorites"
                  >
                    <Heart 
                      size={12} 
                      fill={favorites.includes(item.id) ? '#ef4444' : 'none'} 
                      className={favorites.includes(item.id) ? 'text-rose-500' : 'text-white/80'} 
                    />
                  </button>
                </div>

                {/* Text Details Area */}
                <div className="p-2 sm:p-4 flex-1 flex flex-col justify-between bg-[#0c0c0c]">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Flame size={8} className="text-emerald-400 shrink-0" />
                      <h3 className="font-syne font-extrabold text-white text-[10px] sm:text-xs uppercase tracking-wide line-clamp-1 group-hover:text-emerald-400 transition-colors leading-tight truncate">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-[7.5px] sm:text-[9.5px] text-emerald-400 font-mono font-bold uppercase tracking-wider block">
                      {item.calories} KCAL · {item.protein}G P
                    </p>
                    <p className="text-[8px] sm:text-[10px] text-zinc-400 font-sans line-clamp-1 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Gold Purchase Button Row */}
                  <div className="flex items-center justify-between mt-1 sm:mt-3 pt-1.5 sm:pt-2 border-t border-zinc-900/60">
                    <div>
                      <p className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">PRICE</p>
                      <p className="text-[10px] sm:text-sm font-bold text-[#C5A059] font-outfit tracking-tight">
                        RWF {(item.price * 1000).toLocaleString()}
                      </p>
                    </div>

                    {/* Custom Gold button - swaps to a checkmark + dark flash when item is added */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-full shadow-md flex items-center justify-center transition-all duration-300 active:scale-95 shrink-0 ${
                        justAddedId === item.id
                          ? 'bg-emerald-500 scale-125 shadow-[0_0_0_6px_rgba(16,185,129,0.2)]'
                          : 'bg-[#C5A059] hover:bg-[#b08b47] hover:shadow-lg hover:scale-105'
                      }`}
                      aria-label="Add to cart"
                    >
                      {justAddedId === item.id ? (
                        <Check size={12} strokeWidth={3} className="text-black sm:w-3.5 sm:h-3.5" />
                      ) : (
                        <span className="text-xs sm:text-sm font-extrabold font-sans leading-none text-black">+</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4: MEET CHEF ARSÈNE */}
      <div id="about-section" ref={aboutRef} className="py-24 bg-[#ffffff] border-b border-zinc-100 relative overflow-hidden">
        {/* Decorative backdrop mesh */}
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-zinc-100/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Chef image portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-zinc-200/50 shadow-2xl group bg-zinc-950 aspect-[4/5] max-w-md mx-auto">
                <img
                  src="https://res.cloudinary.com/dmqwlcjec/image/upload/f_auto,q_auto,w_800/v1782381864/ITS_MY_BIRTHDAY_YALL..._A_NIGGA_TURNED_25_YEARS_OLD_ITS_TIME_TO_GET_MORE_SERIOUS_ABO_zm4t9m.webp"
                  alt="Chef Arsène in culinary studio portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 chef-gradient"></div>
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <span className="text-[10px] font-mono tracking-[0.3em] text-[#C5A059] uppercase block mb-1">
                    FOUNDER & VISIONARY
                  </span>
                  <h3 className="font-editorial text-3xl font-bold text-white">Chef Arsène</h3>
                  <p className="text-xs text-gray-300 mt-1">Former Michelin-starred Sous Chef</p>
                </div>
              </div>
            </div>

            {/* Chef Story Copy */}
            <div className="lg:col-span-7 text-left space-y-6 lg:pl-6">
              <div className="space-y-3">
                <span className="text-[#C5A059] text-xs font-mono font-bold tracking-[0.3em] uppercase block">
                  THE SOUL OF MY KITCHEN
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 leading-tight">
                  Crafting experiences, <br className="hidden sm:inline" />
                  not just delivery.
                </h2>
              </div>

              <div className="space-y-5 text-zinc-600 text-sm sm:text-base font-sans font-light leading-relaxed">
                <p>
                  "Culinary perfection shouldn't be locked inside stiff, crowded dining rooms. I founded this kitchen to bring the fine dining experience directly to your table, curated and preserved with absolute care."
                </p>
                <p>
                  "We seal every dish using custom-engineered thermal technology and deliver with insulated precision. Whether it's our signature Wagyu or delicate dessert sphere, each course reaches you at the perfect serving temperature—preserving its rich texture, aroma, and soul."
                </p>
              </div>

              {/* Badges of Excellence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-100">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <Award className="text-[#C5A059] shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-zinc-900 text-xs font-bold uppercase tracking-wider font-mono">Artisanal Curation</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">Gilded details, custom plating presentation guides, and organic garnish.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <ShieldCheck className="text-[#C5A059] shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-zinc-900 text-xs font-bold uppercase tracking-wider font-mono">Premium Sourcing</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">Freshly handpicked ingredients, elite meats, and premium herbs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: CUSTOMER REVIEWS */}
      <div id="reviews-section" ref={reviewsRef} className="py-24 bg-[#fafaf9] border-b border-zinc-150">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[#C5A059] text-xs font-mono font-bold tracking-[0.3em] uppercase block">
              VERIFIED OPINIONS
            </span>
            <h2 className="font-editorial text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">
              Gourmet Praise
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm font-sans font-light">
              Read review logs from critics and local high-profile patrons who demand five-star perfection.
            </p>
          </div>

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div 
                key={review.id}
                className="bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 border border-zinc-150/80 shadow-sm hover:shadow-md hover:border-[#C5A059]/20 transition-all duration-300 text-left"
              >
                {/* Quote details */}
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-sm text-zinc-700 font-sans leading-relaxed italic font-light">
                    "{review.text}"
                  </p>
                </div>

                {/* User icon metadata */}
                <div className="flex items-center gap-2 pt-4 border-t border-zinc-100 text-left">
                  <Instagram size={14} className="text-[#C5A059]" />
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-semibold">icon</span>
                  <span className="text-zinc-300 font-mono text-xs">•</span>
                  <span className="text-zinc-900 font-mono font-bold text-xs">@{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 9: FOOTER */}
      <footer className="bg-[#050505] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left copy branding */}
            <div className="text-center md:text-left">
              <span className="font-editorial text-lg font-bold text-[#C5A059] tracking-tight block">CHEF ARSÈNE</span>
              <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1">CURATED ONLINE GASTRONOMY DELIVERY</p>
            </div>

            {/* Middle socials */}
            <div className="flex gap-4 items-center">
              <a 
                href="https://www.instagram.com/_chef_arsene/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-[#C5A059]/40 rounded-full text-gray-400 hover:text-white transition-all duration-300 text-xs font-mono flex items-center gap-2 uppercase tracking-wider" 
                aria-label="Chef Arsène Instagram"
              >
                <Instagram size={14} className="text-[#C5A059]" />
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.tiktok.com/@chef_arsene" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-[#C5A059]/40 rounded-full text-gray-400 hover:text-white transition-all duration-300 text-xs font-mono flex items-center gap-2 uppercase tracking-wider" 
                aria-label="Chef Arsène TikTok"
              >
                <svg className="w-3.5 h-3.5 text-[#C5A059]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.18 1.15 1.25 2.76 2.05 4.43 2.25v3.9c-1.74-.08-3.44-.75-4.82-1.84-.2-.16-.39-.32-.57-.5-.11.78-.1 1.56-.1 2.34v6.84c.06 1.7-.5 3.42-1.58 4.74-1.4 1.7-3.66 2.68-5.85 2.5-2.61-.13-5.07-1.87-6.04-4.32-.95-2.51-.4-5.49 1.4-7.47 1.45-1.56 3.6-2.39 5.73-2.18.02 1.3-.01 2.6.01 3.9-.99-.07-2.02.26-2.73 1.01-.65.73-.85 1.79-.51 2.7.32.96 1.18 1.69 2.19 1.83 1.02.11 2.11-.29 2.67-1.18.33-.56.45-1.22.44-1.87V0h2.12z"/>
                </svg>
                <span>TikTok</span>
              </a>
            </div>

            {/* Right compliance */}
            <div className="text-center md:text-right text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              <span>DESIGNED FOR EXCELLENCE</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            <span>CHEF ARSÈNE © 2026. All Rights Reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Privacy Protocol</a>
              <span>•</span>
              <a href="#" className="hover:text-white">Terms of Gastronomy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateNotes={handleUpdateNotes}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          // Direct phone call checkout - no WhatsApp number available yet,
          // so clicking checkout immediately dials Chef Arsène's line instead.
          window.location.href = 'tel:+250795453656';
        }}
      />
    </div>
  );
}
