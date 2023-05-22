import React, { useEffect, useContext, useState } from "react";
import { FlatList, StyleSheet, TextInput, View, Button } from "react-native";

import useApi from "../hooks/useApi";
import listingsApi from "../api/listings";
import { Product } from "../types/product";
import colors from "../config/colors";

import { AppText, Text, Screen, Card, SortingUI } from "../components/index";

import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";

const ListingsScreen = ({ navigation }: any) => {
  const { productState, sortProducts } = useContext(ProductContext);
  const { addCartItem } = useContext(CartContext);

  const getListingsApi = useApi(
    listingsApi.getListings as unknown as () => Promise<{
      ok: boolean;
      data: any;
    }>
  );

  useEffect(() => {
    getListingsApi.request();
  }, []);

  productState.items = getListingsApi.data;

  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState<Array<Product>>(productState.items);

  useEffect(() => {
    searchTextFunction();
  }, [searchText]);

  const searchTextFunction = () => {
    setProducts(
      productState.items.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  return (
    <>
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={getListingsApi.request} />
          </>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Text>Search</Text>
          <TextInput
            style={styles.input}
            onChangeText={setSearchText}
            placeholder="SanDisk"
            value={searchText}
          />
          <SortingUI sortFunc={sortProducts} />
        </View>
        <FlatList
          data={searchText.length > 0 ? products : productState.items}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Card
                product={item}
                type="listProduct"
                subTitle={"£" + item.price}
                onPress={() => navigation.navigate("ListingDetails", item)}
                addToCart={() => addCartItem(item, false)}
              />
            </View>
          )}
        />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.white,
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ListingsScreen;
