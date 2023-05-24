// productActions.tsx
import { ProductState } from "../../types/product";
import { SET_PRODUCT_STATE, SORT_PRODUCTS } from "../types";

export const setProductState = (productState: ProductState) => ({
  type: SET_PRODUCT_STATE,
  payload: productState,
});

export const sortProducts = (sortType: string, ordering: string) => {
  console.log("sortProducts->actions", sortType, ordering);
  return {
    type: SORT_PRODUCTS,
    payload: { sortType, ordering },
  };
};
