/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Send, Calendar, MapPin, Phone, User, Check, Wallet, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, OrderDetails } from '../types';
import { DELIVER_INFO } from '../data';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  onOrderSuccess,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState<OrderDetails>({
    name: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'Cash on Delivery',
    deliveryTime: 'As soon as possible',
    scheduledTime: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
  const deliveryFee = subtotal >= 100 ? 0 : DELIVER_INFO.deliveryFee;
  const total = subtotal + deliveryFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSelect = (method: 'Cash on Delivery' | 'Mobile Money' | 'Bank Transfer') => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleDeliveryTimeSelect = (type: 'As soon as possible' | 'Schedule for later') => {
    setFormData((prev) => ({ ...prev, deliveryTime: type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all required fields (Name, Phone, and Address).');
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury progress indicator
    setTimeout(() => {
      // 1. Build the Whatsapp Message
      const header = `⚜️ *CHEF ARSÈNE GOURMET ORDER* ⚜️\n----------------------------------\n`;
      const customerSection = `*Customer:* ${formData.name}\n*Phone:* ${formData.phone}\n*Delivery Address:* ${formData.address}\n*Schedule:* ${formData.deliveryTime === 'As soon as possible' ? 'As soon as possible (30-45 mins)' : `Scheduled for ${formData.scheduledTime}`}\n*Payment Method:* ${formData.paymentMethod}\n`;
      const divider = `----------------------------------\n`;
      
      let itemsSection = `*Items Ordered:*\n`;
      cart.forEach((item) => {
        itemsSection += `• ${item.quantity}x ${item.menuItem.name} (RWF ${((item.menuItem.price * item.quantity) * 1000).toLocaleString()})\n`;
        if (item.notes) {
          itemsSection += `   _Notes: ${item.notes}_\n`;
        }
      });

      const totalsSection = `\n*Subtotal:* RWF ${(subtotal * 1000).toLocaleString()}\n*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `RWF ${(deliveryFee * 1000).toLocaleString()}`}\n*TOTAL AMOUNT:* RWF ${(total * 1000).toLocaleString()}\n`;
      
      let instructions = '';
      if (formData.notes) {
        instructions = `\n*Delivery/Kitchen Instructions:* \n"${formData.notes}"\n`;
      }
      
      const footer = `----------------------------------\n✨ _Thank you for choosing Chef Arsène. Please send this message to process your order immediately._`;

      const fullMessage = `${header}${customerSection}${divider}${itemsSection}${totalsSection}${instructions}${footer}`;

      // Clean phone number for WhatsApp deep link
      // Standard Chef phone in digits
      const whatsappPhone = DELIVER_INFO.phone.replace(/\D/g, '');
      const encodedMessage = encodeURIComponent(fullMessage);
      const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;

      // Open WhatsApp Link
      window.open(whatsappUrl, '_blank');

      setIsSubmitting(false);
      onOrderSuccess();
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          />
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl my-8"
            >
              {/* Gold Accented Glow Bar */}
              <div className="h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 w-full" />

              {/* Header */}
              <div className="p-6 border-b border-zinc-900/80 flex items-center justify-between bg-black/40">
                <div>
                  <h3 className="font-sans font-bold text-lg uppercase tracking-wider text-white">Complete Your Order</h3>
                  <p className="text-xs text-gray-500 font-mono">Routing gourmet dishes to your doorstep</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close Modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-medium text-amber-400/80 uppercase tracking-wider">
                      FULL NAME *
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Dominique Sterling"
                        className="w-full bg-zinc-900/50 border border-zinc-900 focus:border-amber-400/40 focus:outline-none focus:ring-0 text-white rounded-xl py-3 pl-10 pr-4 text-sm transition-colors placeholder-gray-600"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-medium text-amber-400/80 uppercase tracking-wider">
                      PHONE NUMBER (WHATSAPP preferred) *
                    </label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-zinc-900/50 border border-zinc-900 focus:border-amber-400/40 focus:outline-none focus:ring-0 text-white rounded-xl py-3 pl-10 pr-4 text-sm transition-colors placeholder-gray-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-medium text-amber-400/80 uppercase tracking-wider">
                    DELIVERY ADDRESS *
                  </label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street name, Apt #, City (e.g. 100 Beverly Hills Dr, Beverly Hills)"
                      className="w-full bg-zinc-900/50 border border-zinc-900 focus:border-amber-400/40 focus:outline-none focus:ring-0 text-white rounded-xl py-3 pl-10 pr-4 text-sm transition-colors placeholder-gray-600"
                    />
                  </div>
                </div>

                {/* Delivery Schedule Options (Apple-inspired toggle) */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-medium text-amber-400/80 uppercase tracking-wider">
                    DELIVERY TIMEFRAME
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleDeliveryTimeSelect('As soon as possible')}
                      className={`p-4 rounded-xl text-left border flex items-center justify-between transition-all ${
                        formData.deliveryTime === 'As soon as possible'
                          ? 'bg-amber-400/10 border-amber-400/40 text-white'
                          : 'bg-zinc-900/30 border-zinc-900 text-gray-400 hover:border-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Calendar size={16} className={formData.deliveryTime === 'As soon as possible' ? 'text-amber-400' : 'text-gray-500'} />
                        <div>
                          <p className="text-sm font-sans font-semibold">Deliver ASAP</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">Estimated: {DELIVER_INFO.deliveryTimeRange}</p>
                        </div>
                      </div>
                      {formData.deliveryTime === 'As soon as possible' && (
                        <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-black">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeliveryTimeSelect('Schedule for later')}
                      className={`p-4 rounded-xl text-left border flex items-center justify-between transition-all ${
                        formData.deliveryTime === 'Schedule for later'
                          ? 'bg-amber-400/10 border-amber-400/40 text-white'
                          : 'bg-zinc-900/30 border-zinc-900 text-gray-400 hover:border-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Calendar size={16} className={formData.deliveryTime === 'Schedule for later' ? 'text-amber-400' : 'text-gray-500'} />
                        <div>
                          <p className="text-sm font-sans font-semibold">Schedule Delivery</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">Pre-order for specific slot</p>
                        </div>
                      </div>
                      {formData.deliveryTime === 'Schedule for later' && (
                        <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-black">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  </div>

                  {formData.deliveryTime === 'Schedule for later' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-2"
                    >
                      <input
                        type="datetime-local"
                        name="scheduledTime"
                        required={formData.deliveryTime === 'Schedule for later'}
                        value={formData.scheduledTime}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900/50 border border-zinc-900 focus:border-amber-400/40 focus:outline-none focus:ring-0 text-white rounded-xl py-3 px-4 text-sm font-mono"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Payment Method Option (Sweetgreen inspired) */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-medium text-amber-400/80 uppercase tracking-wider">
                    PAYMENT METHOD
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(['Cash on Delivery', 'Mobile Money', 'Bank Transfer'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => handlePaymentSelect(method)}
                        className={`p-4 rounded-xl text-left border flex flex-col justify-between transition-all ${
                          formData.paymentMethod === method
                            ? 'bg-amber-400/10 border-amber-400/40 text-white'
                            : 'bg-zinc-900/30 border-zinc-900 text-gray-400 hover:border-zinc-800'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <Wallet size={16} className={formData.paymentMethod === method ? 'text-amber-400' : 'text-gray-500'} />
                          {formData.paymentMethod === method && (
                            <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-black">
                              <Check size={10} strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-sans font-bold uppercase tracking-wider">{method}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">
                            {method === 'Cash on Delivery' && 'Pay at your door'}
                            {method === 'Mobile Money' && 'Instant digital pay'}
                            {method === 'Bank Transfer' && 'Direct secure bank'}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-medium text-amber-400/80 uppercase tracking-wider">
                    SPECIAL DELIVERY / DIETARY INSTRUCTIONS
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="E.g. Leave with security guard, gate code is 2026, or severe nut allergy..."
                    className="w-full bg-zinc-900/50 border border-zinc-900 focus:border-amber-400/40 focus:outline-none focus:ring-0 text-white rounded-xl py-3 px-4 text-sm transition-colors placeholder-gray-600 resize-none"
                  />
                </div>

                {/* Invoice Breakout */}
                <div className="p-4 rounded-2xl bg-zinc-900/20 border border-zinc-900 space-y-2 text-xs font-mono text-gray-500">
                  <div className="flex justify-between">
                    <span>SELECTION SUBTOTAL:</span>
                    <span className="text-white">RWF {(subtotal * 1000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>INSULATED GOURMET SHIPPING:</span>
                    <span className={deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                      {deliveryFee === 0 ? 'FREE' : `RWF ${(deliveryFee * 1000).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t border-zinc-900/60 pt-2 text-white">
                    <span className="text-amber-400">TOTAL DUE VIA WHATSAPP:</span>
                    <span className="text-amber-400 font-sans">RWF {(total * 1000).toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-zinc-800 text-zinc-500 cursor-wait'
                      : 'bg-amber-400 hover:bg-amber-500 text-black shadow-[0_4px_20px_rgba(251,191,36,0.25)] hover:shadow-[0_4px_25px_rgba(251,191,36,0.35)]'
                  }`}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Formatting Invoice...' : 'Send Order to Chef Arsène'}</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 font-mono uppercase text-center">
                  <HelpCircle size={12} />
                  <span>How it works: A formatted order will open on WhatsApp. Send it to verify instantly!</span>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
