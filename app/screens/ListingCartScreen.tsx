// ListingCartScreen.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, ScrollView, Text } from "react-native";

import colors from "../config/colors";
import { Card, Screen } from "../components/index";
import { Product } from "../types/product";
import {
  addCartItem as addItem,
  removeCartItem as removeItem,
  removeAllCartItems as removeAllItems,
} from "../store/actions/cartActions";

const ListingCartScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  const addCartItem = (product: Product) => dispatch(addItem(product, false));
  const removeCartItem = (product: Product) => dispatch(removeItem(product));
  const removeAllCartItem = (product: Product) =>
    dispatch(removeAllItems(product));

  return (
    <Screen style={styles.screen}>
      <ScrollView>
        {cartState.items.map((item, i) => (
          <Card
            product={item.product}
            type="listCard"
            key={i}
            qty={item.count}
            subTotal={Number(item.cost)}
            onPress={() => navigation.navigate("ListingDetails", item.product)}
            addToCart={() => addCartItem(item.product)}
            reduceCart={() => removeCartItem(item.product)}
            removeCart={() => removeAllCartItem(item.product)}
          />
        ))}
      </ScrollView>
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>
          Total: £{cartState.totalCost.toFixed(1)}
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.white,
  },
  detailsContainer: {},
  price: {
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default ListingCartScreen;
