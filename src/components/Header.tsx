/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, Menu, X, PhoneCall } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  cartPulse?: boolean;
  onCartClick: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ cartCount, cartPulse, onCartClick, onScrollToSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Signature Menu', id: 'popular-section' },
    { name: 'Fitness Meals', id: 'healthy-section' },
    { name: 'Chef Arsène', id: 'about-section' },
    { name: 'Reviews', id: 'reviews-section' },
  ];

  const handleNavLinkClick = (id: string) => {
    onScrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/85 backdrop-blur-md border-b border-white/5 h-16 sm:h-20 transition-all">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Brand Logo - serif gold */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-start focus:outline-none group text-left max-w-[145px] sm:max-w-none"
        >
          <span className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#C5A059] transition-all duration-300 group-hover:brightness-110 leading-none">
            CHEF ARSÈNE
          </span>
          <span className="text-[6.5px] sm:text-[8px] md:text-[9px] font-mono tracking-[0.22em] text-white/40 uppercase mt-1 leading-none truncate w-full">
            Haute Gastronomie Chez Vous
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavLinkClick(link.id)}
              className="text-xs uppercase tracking-[0.2em] font-medium text-white/60 hover:text-[#C5A059] transition-all duration-200"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Utility / Right actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Support Helpline link */}
          <a
            href="tel:+15557899876"
            className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase text-white/50 hover:text-white transition-colors py-1.5 px-3 border border-white/5 hover:border-white/10 rounded-full"
          >
            <PhoneCall size={10} className="text-[#C5A059]" />
            <span>Support</span>
          </a>

          {/* Cart Widget - premium styling, with gold pulse feedback on add */}
          <button
            onClick={onCartClick}
            id="cart-trigger"
            className={`relative px-2.5 sm:px-4 py-1.5 sm:py-2 border rounded-full flex items-center gap-1.5 sm:gap-2.5 bg-[#C5A059]/5 hover:bg-[#C5A059]/10 text-white transition-all duration-300 group hover:-translate-y-0.5 active:translate-y-0 shrink-0 ${
              cartPulse ? 'border-[#C5A059] shadow-[0_0_0_4px_rgba(197,160,89,0.25)]' : 'border-[#C5A059]/40 hover:border-[#C5A059]'
            }`}
            aria-label="Open Cart Selection"
          >
            {/* Expanding gold ring - fires once per add, doesn't loop */}
            {cartPulse && (
              <span className="absolute inset-0 rounded-full border-2 border-[#C5A059] animate-cart-ring pointer-events-none" />
            )}
            <ShoppingBag size={12} className="text-[#C5A059] sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-white/90">CART</span>
            <span className={`bg-[#C5A059] text-black font-sans font-black text-[10px] sm:text-xs w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0 ${cartPulse ? 'animate-cart-badge-pop' : ''}`}>
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-zinc-900 border border-zinc-900 rounded-xl transition-all"
            aria-label={isMobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-[65px] inset-x-0 bg-[#050505] border-b border-zinc-900 p-6 flex flex-col gap-5 z-40 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavLinkClick(link.id)}
                className="text-left text-sm uppercase tracking-widest font-semibold text-white/70 hover:text-[#C5A059] border-b border-zinc-950 pb-2 transition-all duration-200"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-3 border-t border-zinc-900">
            <div className="flex justify-between items-center text-xs font-mono text-white/40">
              <span>ESTIMATED DELIVERY</span>
              <span className="text-white">30 - 45 MINS</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono text-white/40">
              <span>MINIMUM BASKET</span>
              <span className="text-[#C5A059]">$35.00</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}