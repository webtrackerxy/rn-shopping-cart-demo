// cartActions.tsx
import { Product } from "../../types/product";
import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  REMOVE_ALL_CART_ITEMS,
} from "../types";

export const addCartItem = (product: Product, alert: boolean) => ({
  type: ADD_CART_ITEM,
  payload: { product, alert },
});

export const removeCartItem = (product: Product) => ({
  type: REMOVE_CART_ITEM,
  payload: product,
});

export const removeAllCartItems = (product: Product) => ({
  type: REMOVE_ALL_CART_ITEMS,
  payload: product,
});
