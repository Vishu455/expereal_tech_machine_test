/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";

// Load cart from localStorage
const loadCart = () => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

// Cart state atom
export const cartAtom = atom(loadCart());

// Action atoms
export const addToCartAtom = atom(null, (get, set, product: any) => {
  const cart = get(cartAtom);
  const existingItem = cart.find((item: any) => item.id === product.id);
  
  let updatedCart;
  if (existingItem) {
    updatedCart = cart.map((item: any) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    updatedCart = [...cart, { ...product, quantity: 1 }];
  }

  set(cartAtom, updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
});

export const removeFromCartAtom = atom(null, (get, set, productId) => {
  const updatedCart = get(cartAtom).filter((item: any) => item.id !== productId);
  set(cartAtom, updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
});

export const updateQuantityAtom = atom(null, (get, set, { productId, change }) => {
  const updatedCart = get(cartAtom).map((item: any) =>
    item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
  );
  set(cartAtom, updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
});