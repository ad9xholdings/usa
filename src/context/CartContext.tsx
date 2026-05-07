import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  showCart: boolean;
  hasPaid: boolean;
  skyIvyBalance: string;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  markPaid: () => void;
  totalXRP: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  showCart: false,
  hasPaid: false,
  skyIvyBalance: '0',
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  openCart: () => {},
  closeCart: () => {},
  markPaid: () => {},
  totalXRP: 0,
  itemCount: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [skyIvyBalance] = useState('21000000000000');

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setShowCart(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setShowCart(true), []);
  const closeCart = useCallback(() => setShowCart(false), []);

  const markPaid = useCallback(() => {
    setHasPaid(true);
    setItems([]);
    setShowCart(false);
  }, []);

  const totalXRP = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + (isNaN(price) ? 0 : price) * item.quantity;
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, showCart, hasPaid, skyIvyBalance,
      addItem, removeItem, clearCart,
      openCart, closeCart, markPaid,
      totalXRP, itemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
