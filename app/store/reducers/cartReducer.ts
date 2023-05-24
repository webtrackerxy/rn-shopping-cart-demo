// cartReducer.ts
import { Alert } from "react-native";
import {CartItem , CartState} from '../../types/cart';

import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  REMOVE_ALL_CART_ITEMS
} from '../types';

const initialCartState: CartState = {
  items: [],
  totalCost: 0,
};

export const cartReducer = (state = initialCartState, action:any) => {

  const calculateTotalCost = (items: CartItem[]): number => {
    let totalCost = 0;
    items.map((obj) => {
      totalCost += obj.cost;
    });

    return totalCost;
  };

  switch (action.type) {
    case ADD_CART_ITEM: {
      // logic for adding item to cart
      console.log("ADD_CART_ITEM", action);
        const item = state.items.find((item) => item.product.id === action.payload.product.id);
        if (item) {
          const objIndex = state.items.findIndex(
            (obj) => obj.product.id == action.payload.product.id
          );
          state.items[objIndex].count++;
          state.items[objIndex].cost =
          state.items[objIndex].count * action.payload.product.price;
          if (action.alert)
            Alert.alert(
              "Product is updated in cart with total qty " +
              state.items[objIndex].count
            );
          return {
            ...state,
            items: [...state.items ],
            totalCost: calculateTotalCost(state.items),
          };
        } else {
          state.items.push({ product:  action.payload.product, count: 1, cost:  action.payload.product.price });
          if (action.alert) Alert.alert("Product is added in cart with total qty 1");
          return {
            ...state,
            items: [...state.items ],
            totalCost: calculateTotalCost(state.items),
          };
        }
    }
    case REMOVE_CART_ITEM: {
      // logic for removing item from cart
      console.log("REMOVE_CART_ITEM", action);
      const item = state.items.find((item) => item.product.id === action.payload.id);

      if (item) {
        const objIndex = state.items.findIndex(
          (obj) => obj.product.id == action.payload.id
        );
        const count = state.items[objIndex].count--;
        count <= 0
          ? (state.items[objIndex].count = 0)
          : state.items[objIndex].count;
          state.items[objIndex].cost =
          state.items[objIndex].count * action.payload.price;
        return {
          ...state,
          items: [...state.items ],
          totalCost: calculateTotalCost(state.items),
        };
      }
    }
    case REMOVE_ALL_CART_ITEMS: {
      // logic for removing all items from cart
      console.log("REMOVE_ALL_CART_ITEMS", action);
      const items = state.items.filter(
        (obj) => obj.product.id !== action.payload.id
      );
      return {
        ...state,
        items: [...items ],
        totalCost: calculateTotalCost(items),
      };
    }
    default:
      console.log("cartReducer:default", action)
      return state;
  }
};
