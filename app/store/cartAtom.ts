import { atom } from "jotai";
import { CartProduct, Product } from "../types";

const loadCart = () => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

export const cartAtom = atom(loadCart());

export const addToCartAtom = atom(null, (get, set, product: Product) => {
  const cart = get(cartAtom);
  const existingItem = cart.find((item: CartProduct) => item.id === product.id);
  
  let updatedCart;
  if (existingItem) {
    updatedCart = cart.map((item: CartProduct) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    updatedCart = [...cart, { ...product, quantity: 1 }];
  }

  set(cartAtom, updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
});

export const removeFromCartAtom = atom(null, (get, set, productId) => {
  const updatedCart = get(cartAtom).filter((item: CartProduct) => item.id !== productId);
  set(cartAtom, updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
});

export const updateQuantityAtom = atom(null, (get, set, { productId, change }) => {
  const updatedCart = get(cartAtom).map((item: CartProduct) =>
    item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
  );
  set(cartAtom, updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
});