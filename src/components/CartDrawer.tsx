/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Plus, Minus, Trash2, ShoppingBag, MessageSquareText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { DELIVER_INFO } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onUpdateNotes,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  const subtotal = cart.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
  const deliveryFee = subtotal >= 100 || subtotal === 0 ? 0 : DELIVER_INFO.deliveryFee;
  const total = subtotal + deliveryFee;
  
  const meetsMinOrder = subtotal >= DELIVER_INFO.minOrder;
  const minOrderDiff = DELIVER_INFO.minOrder - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-45"
          />

          {/* Cart Drawer */}
          <motion.div
            id="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-zinc-950 border-l border-zinc-900 z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-900 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h2 className="font-sans font-bold text-lg text-white uppercase tracking-wider">Your Gourmet Selection</h2>
                  <p className="text-xs text-gray-500 font-mono">
                    {cart.length === 0 ? 'Empty' : `${cart.length} item(s) selected`}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-gray-400 hover:text-white transition-colors"
                aria-label="Close Cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 rounded-full bg-zinc-900 border border-zinc-800 text-gray-600 mb-4"
                  >
                    <ShoppingBag size={36} />
                  </motion.div>
                  <p className="font-sans font-medium text-gray-400">Your basket is completely empty.</p>
                  <p className="text-xs text-gray-600 max-w-xs mt-1">
                    Select culinary creations from Chef Arsène’s menu to start your luxury delivery.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 rounded-xl border border-amber-400/40 hover:border-amber-400 text-amber-400 text-xs font-mono tracking-widest uppercase transition-all"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.menuItem.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800/80 transition-all flex flex-col gap-3 group"
                    >
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0 relative">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="font-sans font-bold text-sm text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                                {item.menuItem.name}
                              </h3>
                              <span className="font-sans font-bold text-sm text-amber-400">
                                RWF {((item.menuItem.price * item.quantity) * 1000).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                              {item.menuItem.description}
                            </p>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Buttons */}
                            <div className="flex items-center gap-1 bg-black/60 border border-zinc-800 rounded-lg p-1">
                              <button
                                onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                                className="p-1 text-gray-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                                aria-label="Decrease Quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-xs font-mono font-bold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                                className="p-1 text-gray-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                                aria-label="Increase Quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => onRemoveItem(item.menuItem.id)}
                              className="text-gray-500 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                              aria-label="Remove Item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Specialized Kitchen Notes */}
                      <div className="flex items-center gap-2 mt-1 pt-2 border-t border-zinc-900/60">
                        <MessageSquareText size={12} className="text-gray-500 flex-shrink-0" />
                        <input
                          type="text"
                          value={item.notes || ''}
                          onChange={(e) => onUpdateNotes(item.menuItem.id, e.target.value)}
                          placeholder="Culinary notes (e.g. medium rare, no sesame...)"
                          className="w-full text-xs bg-transparent border-none text-gray-400 focus:text-white focus:outline-none placeholder-gray-600 py-0.5"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Checkout Sticky Panel */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-900 bg-black/60 backdrop-blur-md space-y-4">
                {/* Min Order Guard */}
                {!meetsMinOrder && (
                  <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 font-medium">MINIMUM ORDER AMOUNT:</span>
                      <span className="text-gray-400 font-bold">RWF {(DELIVER_INFO.minOrder * 1000).toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1 mt-1.5 overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${(subtotal / DELIVER_INFO.minOrder) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Add <span className="text-amber-400 font-bold">RWF {(minOrderDiff * 1000).toLocaleString()}</span> worth of dishes to process delivery.
                    </p>
                  </div>
                )}

                {/* Pricing Summary */}
                <div className="space-y-2 text-sm font-sans font-medium text-gray-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">RWF {(subtotal * 1000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      Delivery Charge
                      {subtotal >= 100 && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-mono font-bold uppercase">
                          FREE OVER RWF 100,000
                        </span>
                      )}
                    </span>
                    <span className={subtotal >= 100 ? 'text-emerald-400 font-bold font-mono' : 'text-white'}>
                      {deliveryFee === 0 ? 'FREE' : `RWF ${(deliveryFee * 1000).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-zinc-900 text-base font-bold text-white">
                    <span>Total Amount</span>
                    <span className="text-amber-400 font-extrabold">RWF {(total * 1000).toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  disabled={!meetsMinOrder}
                  onClick={onProceedToCheckout}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                    meetsMinOrder
                      ? 'bg-amber-400 hover:bg-amber-500 text-black shadow-[0_4px_20px_rgba(251,191,36,0.25)] hover:shadow-[0_4px_25px_rgba(251,191,36,0.35)] transform active:scale-[0.98]'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-900'
                  }`}
                >
                  <span>Proceed to Checkout</span>
                </button>

                <div className="text-center">
                  <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                    Secure checkout • Final order routed instantly via WhatsApp
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
