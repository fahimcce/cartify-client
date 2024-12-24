"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";

import { IProduct } from "../types/ProductTypes";
import { useAuth } from "../context/AuthContext";

interface CartContextType {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  replaceCart: (product: IProduct) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth(); // Get the logged-in user
  const [cart, setCart] = useState<IProduct[]>([]);

  // Load cart from local storage on mount
  useEffect(() => {
    if (user) {
      const storedCart = localStorage.getItem(`cart_${user.id}`);

      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, [user]);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = async (product: IProduct) => {
    if (!user) {
      toast.error("Please login first.");

      return;
    }

    setCart((prev) => {
      if (prev.length === 0) {
        return [{ ...product, quantity: 1 }];
      }

      if (prev[0].shop.vendorId !== product.shop.vendorId) {
        // Handle async outside the state updater
        Swal.fire({
          title: "Replace Cart?",
          text: "Your cart contains products from a different vendor. Replace the cart with the new product?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, replace it",
          cancelButtonText: "No, keep my cart",
        }).then((userConfirmed) => {
          if (userConfirmed.isConfirmed) {
            Swal.fire("Success!", "The cart has been replaced.", "success");
            setCart([{ ...product, quantity: 1 }]);
          }
        });

        // Return the current state until the confirmation resolves
        return prev;
      }

      const existingProduct = prev.find((item) => item.id === product.id);

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const replaceCart = (product: IProduct) => {
    setCart([{ ...product, quantity: 1 }]);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };
  const clearCart = () => {
    setCart([]);
    if (user) {
      localStorage.removeItem(`cart_${user.id}`);
    }
  };

  const totalPrice = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        replaceCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
