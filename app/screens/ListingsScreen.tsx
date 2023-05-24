// ListingScreen.tsx
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import useApi from "../hooks/useApi";
import listingsApi from "../api/listings";
import { Product } from "../types/product";
import colors from "../config/colors";

import { AppText, Text, Screen, Card, SortingUI } from "../components/index";

import { addCartItem } from "../store/actions/cartActions";
import { sortProducts } from "../store/actions/productActions";

const ListingsScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  // console.log(
  //   "state=>",
  //   useSelector((state) => state)
  // );
  const productState = useSelector((state) => state.product);
  // const cartState = useSelector((state) => state.cart);

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
      productState.items.filter((item: Product) =>
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
          <SortingUI
            sortFunc={(sortType: string, ordering: string) =>
              dispatch(sortProducts(sortType, ordering))
            }
          />
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
                addToCart={() => dispatch(addCartItem(item, false))}
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
