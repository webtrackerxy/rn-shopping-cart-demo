import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import { CartContextProvider } from "./app/contexts/CartContext";
import { ProductContextProvider } from "./app/contexts/ProductContext";

export default function App() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </CartContextProvider>
    </ProductContextProvider>
  );
}
