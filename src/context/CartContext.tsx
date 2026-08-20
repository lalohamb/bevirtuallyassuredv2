import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Package } from '@/lib/supabase';

export type CartItem = {
  slug: string;
  name: string;
  price_cents: number;
  billing_period: string | null;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addPackage: (pkg: Package) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
  totalCents: number;
  count: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addPackage = (pkg: Package) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === pkg.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === pkg.slug ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          slug: pkg.slug,
          name: pkg.name,
          price_cents: pkg.price_cents,
          billing_period: pkg.billing_period,
          quantity: 1,
        },
      ];
    });
  };

  const removeItem = (slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  };

  const clear = () => setItems([]);

  const totalCents = items.reduce((sum, i) => sum + i.price_cents * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addPackage, removeItem, clear, totalCents, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
