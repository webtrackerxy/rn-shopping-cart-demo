import React, { useContext } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";

import colors from "../config/colors";
import {Card, Screen} from "../components/index";
import { CartContext } from "../contexts/CartContext";

const ListingCartScreen = ({
  navigation,
}: {
  navigation: any;
}) => {
  const { cartState, addCartItem, removeCartItem, removeAllCartItem } =
    useContext(CartContext);

  return (
    <Screen style={styles.screen}>
      <ScrollView>
        {cartState.items.map((item, i) => {
          // Log the current item
          // console.log(`Item at index ${i}:`, item);
          return (
            <Card
              product={item.product}
              type="listCard"
              key={i}
              qty={item.count}
              subTotal={Number(item.cost)}
              onPress={() =>
                navigation.navigate("ListingDetails", item.product)
              }
              addToCart={() => addCartItem(item.product)}
              reduceCart={() => removeCartItem(item.product)}
              removeCart={() => removeAllCartItem(item.product)}
            />
          );
        })}
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
