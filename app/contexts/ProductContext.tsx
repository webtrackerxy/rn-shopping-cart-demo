import React, { useState, ReactNode, createContext } from "react";
import { ProductState, ProductContextValue } from "../types/product";

const initProductState: ProductState = {
  items: [],
  search_text: "",
};

const ProductContext = createContext<ProductContextValue>({
  productState: initProductState,
  setProductState: () => {},
  calculateRating: () => {},
  sortProducts: () => {},
});

interface ProductContextProviderProps {
  children: ReactNode;
}

const ProductContextProvider: React.FC<ProductContextProviderProps> = ({
  children,
}) => {
  const [productState, setProductState] =
    useState<ProductState>(initProductState);

  const calculateRating = (productID: number, rate: number) => {
    productState.items.map((product) => {
      if (product.id === productID) {
        product.rating.count = product.rating.count + 1;
        product.rating.rate =
          product.rating.rate + rate * (10 / product.rating.count);
        console.log("rate", product.rating);
        if (product.rating.rate >= 5) product.rating.rate = 5;
      }
    });

    setProductState({
      ...productState,
    });
  };

  const sortProducts = (
    sortType: string = "title",
    ordering: string = "ascending"
  ) => {
    if (
      !(
        sortType === "title" ||
        sortType === "price" ||
        sortType === "rating"
      ) ||
      !(ordering === "ascending" || ordering === "descending")
    ) {
      console.log("Invalid sortType or order");
      return;
    }

    let sortedProducts = productState.items.sort((a, b) => {
      let valA =
        sortType === "rating"
          ? a[sortType].rate
          : sortType === "price"
          ? a[sortType]
          : a[sortType].toUpperCase();
      let valB =
        sortType === "rating"
          ? b[sortType].rate
          : sortType === "price"
          ? b[sortType]
          : b[sortType].toUpperCase();

      if (ordering === "ascending") {
        return valA > valB ? 1 : valA < valB ? -1 : 0;
      } else {
        return valA < valB ? 1 : valA > valB ? -1 : 0;
      }
    });

    console.log("sortedProducts", sortedProducts[0]);
    setProductState({
      ...productState,
      items: sortedProducts,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        productState,
        setProductState,
        calculateRating,
        sortProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
