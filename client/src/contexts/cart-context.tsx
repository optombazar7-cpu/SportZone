import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { CartItemWithProduct } from '@/lib/types';

interface CartContextType {
  cartItems: CartItemWithProduct[];
  isLoading: boolean;
  addToCart: (productId: string, quantity?: number, size?: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  sessionId: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [sessionId] = useState(() => {
    const stored = localStorage.getItem('cartSessionId');
    if (stored) return stored;
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('cartSessionId', newSessionId);
    return newSessionId;
  });

  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ['/api/cart', sessionId],
    enabled: !!sessionId,
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity = 1, size }: { productId: string; quantity?: number; size?: string }) => {
      const response = await apiRequest('POST', '/api/cart', {
        sessionId,
        productId,
        quantity,
        size,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) => {
      const response = await apiRequest('PUT', `/api/cart/${cartItemId}`, { quantity });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (cartItemId: string) => {
      const response = await apiRequest('DELETE', `/api/cart/${cartItemId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('DELETE', `/api/cart/session/${sessionId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
    },
  });

  const addToCart = async (productId: string, quantity = 1, size?: string) => {
    await addToCartMutation.mutateAsync({ productId, quantity, size });
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    await updateQuantityMutation.mutateAsync({ cartItemId, quantity });
  };

  const removeFromCart = async (cartItemId: string) => {
    await removeFromCartMutation.mutateAsync(cartItemId);
  };

  const clearCart = async () => {
    await clearCartMutation.mutateAsync();
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isLoading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getTotalItems,
      getTotalPrice,
      sessionId,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
