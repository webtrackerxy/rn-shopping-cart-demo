import React, { useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import { AppButton, RatingUI, Text } from "../components/index";
import { CartContext } from "../contexts/CartContext";

function ListingDetailsScreen({ route }: any) {
  const listing = route.params;
  const { addCartItem } = useContext(CartContext);
  // console.log("ListingDetailsScreen", listing);

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
        <Text style={styles.subTitle}>{listing.description} </Text>
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
