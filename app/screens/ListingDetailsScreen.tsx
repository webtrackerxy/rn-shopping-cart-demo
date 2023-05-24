// ListingDetailsScreen
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { useDispatch } from "react-redux";

import { Product } from "../types/product";
import colors from "../config/colors";
import { AppButton, RatingUI, Text } from "../components/index";
import { addCartItem as addItem } from "../store/actions/cartActions";

function ListingDetailsScreen({ route }: any) {
  const listing = route.params;
  const dispatch = useDispatch();

  const addCartItem = (product: Product, alert: boolean) =>
    dispatch(addItem(product, alert));

  return (
    <ScrollView>
      <View style={styles.detailsContainer}>
        <Image
          style={styles.image}
          tint="light"
          preview={{ uri: listing.image }}
          uri={listing.image}
        />
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.subTitle}>{listing.description}</Text>
        <Text style={styles.price}>£{listing.price}</Text>
        <View>
          <RatingUI
            rateValue={Number(listing?.rating?.rate?.toFixed(0)) || 0}
          />
        </View>
        <AppButton
          onPress={() => addCartItem(listing, false)}
          title="Add to Cart"
          color="secondary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
    backgroundColor: colors.white,
  },
  image: {
    width: 259,
    height: 413,
    alignSelf: "center",
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
  },
});

export default ListingDetailsScreen;
