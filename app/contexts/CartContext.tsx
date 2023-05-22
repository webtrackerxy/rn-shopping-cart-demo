import React, { useState, ReactNode, createContext } from "react";
import { Alert } from "react-native";
import { Product } from "../types/product";
import { CartItem, CartState, CartContextValue } from "../types/cart";

const initCartState: CartState = {
  items: [],
  totalCost: 0,
};

const CartContext = createContext<CartContextValue>({
  cartState: {
    items: [],
    totalCost: 0,
  },
  addCartItem: () => {},
  removeCartItem: () => {},
  removeAllCartItem: () => {},
  calculateTotalCost: () => 0,
  calculateTotalCount: () => 0,
});

interface CartContextProviderProps {
  children: ReactNode;
}

const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [cartState, setCartState] = useState<CartState>(initCartState);

  const addCartItem = (product: Product, alert: boolean = false) => {
    const item = cartState.items.find((item) => item.product.id === product.id);

    if (item) {
      const objIndex = cartState.items.findIndex(
        (obj) => obj.product.id == product.id
      );
      cartState.items[objIndex].count++;
      cartState.items[objIndex].cost =
        cartState.items[objIndex].count * product.price;
      setCartState({
        ...cartState,
        totalCost: calculateTotalCost(cartState.items),
      });
      if (alert)
        Alert.alert(
          "Product is updated in cart with total qty " +
            cartState.items[objIndex].count
        );
    } else {
      cartState.items.push({ product: product, count: 1, cost: product.price });
      setCartState({
        ...cartState,
        totalCost: calculateTotalCost(cartState.items),
      });
      if (alert) Alert.alert("Product is added in cart with total qty 1");
    }
  };

  const removeCartItem = (product: Product) => {
    const item = cartState.items.find((item) => item.product.id === product.id);

    if (item) {
      const objIndex = cartState.items.findIndex(
        (obj) => obj.product.id == product.id
      );
      const count = cartState.items[objIndex].count--;
      count <= 0
        ? (cartState.items[objIndex].count = 0)
        : cartState.items[objIndex].count;
      cartState.items[objIndex].cost =
        cartState.items[objIndex].count * product.price;
      setCartState({
        ...cartState,
        totalCost: calculateTotalCost(cartState.items),
      });
    }
  };

  const removeAllCartItem = (product: Product) => {
    const items = cartState.items.filter(
      (obj) => obj.product.id !== product.id
    );
    setCartState({
      ...cartState,
      items: items,
      totalCost: calculateTotalCost(items),
    });
  };

  const calculateTotalCost = (items: CartItem[]): number => {
    let totalCost = 0;
    items.map((obj) => {
      totalCost += obj.cost;
    });

    return totalCost;
  };

  const calculateTotalCount = () => {
    let totalCount = 0;
    cartState.items.map((obj) => {
      totalCount += obj.count;
    });

    return totalCount;
  };

  return (
    <CartContext.Provider
      value={{
        cartState: {
          ...cartState,
        },
        addCartItem,
        removeCartItem,
        removeAllCartItem,
        calculateTotalCost,
        calculateTotalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
