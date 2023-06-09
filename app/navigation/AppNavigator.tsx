//AppNavigator.tsx
import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CartNavigator from "./CartNavigator";
import ProductNavigator from "./ProductNavigator";

import { CartItem, CartState } from "../types/cart";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

interface styleProps {
  color: string;
  size: number;
}
const AppNavigator = () => {
  const cartState = useSelector((state) => state.cart);

  const calculateTotalCount = (cart: CartState): number => {
    let totalCount = 0;
    cartState.items.map((obj: CartItem) => {
      totalCount += obj.count;
    });

    return totalCount;
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Product"
        component={ProductNavigator}
        options={{
          tabBarIcon: ({ color, size }: styleProps) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color, size }: styleProps) => (
            <View>
              <MaterialCommunityIcons name="home" color={color} size={size} />
              <View
                style={{
                  // position the badge absolute,
                  // to the top right
                  position: "absolute",
                  right: -8,
                  top: -2,
                  backgroundColor: "red",
                  borderRadius: 6,
                  width: 16,
                  height: 16,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                >
                  {calculateTotalCount(cartState)}
                </Text>
              </View>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
