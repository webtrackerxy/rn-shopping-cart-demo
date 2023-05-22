import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-elements";

import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import AppButton from "./Button";
import RatingUI from "./RatingUI";
import Text from "./Text";
import { Product } from "../types/product";

interface CardProps {
  product: Product;
  type: string;
  subTitle?: string;
  qty?: number;
  subTotal?: number;
  onPress: () => void;
  addToCart?: () => void;
  reduceCart?: () => void;
  removeCart?: () => void;
  updateRating?: () => void;
}

const Card = ({
  product,
  type,
  subTitle,
  qty,
  subTotal,
  onPress,
  addToCart = () => {},
  reduceCart,
  removeCart,
  updateRating,
}: CardProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        {type == "listProduct" ? (
          <View>
            <Image
              style={styles.image}
              tint="light"
              preview={{ uri: product.image }}
              uri={product.image}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {product.title}
              </Text>
              <Text style={styles.subTitle} numberOfLines={1}>
                {subTitle}
              </Text>
              <View>
                <RatingUI
                  rateValue={Number(product?.rating?.rate?.toFixed(0)) || 0}
                />
              </View>
              <View>
                <AppButton
                  onPress={addToCart}
                  title="Add to Cart"
                  color="secondary"
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {product.title} (£{product.price})
              </Text>
              <Text style={styles.subTitle} numberOfLines={2}>
                Qty:{qty} Sub Total: £{subTotal}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 5,
                  alignSelf: "center",
                  padding: 10,
                }}
              >
                <View style={{ height: 40, width: 100 }}>
                  <Button
                    title="+ Qty"
                    buttonStyle={{
                      backgroundColor: "blue",
                      borderRadius: 10,
                    }}
                    onPress={addToCart}
                  />
                </View>
                <View style={{ width: 10 }} />
                <View style={{ height: 40, width: 100 }}>
                  <Button
                    title="- Qty"
                    buttonStyle={{
                      backgroundColor: "blue",
                      borderRadius: 10,
                    }}
                    onPress={reduceCart}
                  />
                </View>
                <View style={{ width: 10 }} />
                <View style={{ height: 40, width: 100 }}>
                  <Button
                    title="Remove"
                    buttonStyle={{
                      backgroundColor: "red",
                      borderRadius: 10,
                    }}
                    onPress={removeCart}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: 259,
    height: 259,
    alignSelf: "center",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
