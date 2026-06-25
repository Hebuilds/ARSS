/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'featured' | 'popular' | 'healthy' | 'beverages' | 'desserts' | 'offers';
  image: string;
  tags: string[];
  calories?: number;
  protein?: number; // grams
  carbs?: number; // grams
  fat?: number; // grams
  isFeatured?: boolean;
  isPopular?: boolean;
  isHealthy?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  dish: string;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  notes: string;
  paymentMethod: 'Cash on Delivery' | 'Mobile Money' | 'Bank Transfer';
  deliveryTime: 'As soon as possible' | 'Schedule for later';
  scheduledTime?: string;
}
