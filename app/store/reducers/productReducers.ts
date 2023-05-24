// productReducers.ts
import { ProductState } from '../../types/product';
import {
  SET_PRODUCT_STATE,
  SORT_PRODUCTS
} from '../types';


const initialProductState: ProductState = {
  items: [],
  search_text: ''
};

export const productReducer = (state = initialProductState, action:any) => {
  switch (action.type) {

    case SET_PRODUCT_STATE: {
      // logic for setting product state
      console.log("SET_PRODUCT_STATE", action)
      return state;
    }

    case SORT_PRODUCTS: {
      // logic for sorting products
      console.log("SORT_PRODUCTS", action.payload.sortType, action.payload.ordering)

      if (!action.payload.sortType) action.payload.sortType="price";
      if (!action.payload.ordering) action.payload.ordering="descending";

      if (
        !(
          action.payload.sortType === "title" ||
          action.payload.sortType === "price" ||
          action.payload.sortType === "rating"
        ) ||
        !(action.payload.ordering === "ascending" || action.payload.ordering === "descending")
      ) {
        console.log("Invalid sortType or order");
        return;
      }
  
      let sortedProducts = state.items.sort((a, b) => {
        let valA =
        action.payload.sortType === "rating"
            ? a[action.payload.sortType].rate
            : action.payload.sortType === "price"
            ? a[action.payload.sortType]
            : a[action.payload.sortType].toUpperCase();
        let valB =
        action.payload.sortType === "rating"
            ? b[action.payload.sortType].rate
            : action.payload.sortType === "price"
            ? b[action.payload.sortType]
            : b[action.payload.sortType].toUpperCase();
  
        if (action.payload.ordering === "ascending") {
          return valA > valB ? 1 : valA < valB ? -1 : 0;
        } else {
          return valA < valB ? 1 : valA > valB ? -1 : 0;
        }
      });
  
      // console.log("sortedProducts", sortedProducts[0]);
      return {
        ...state,
        items: [...sortedProducts ],
      };
    }
    default:
      console.log("productReducer:default")
      return state;
  }
};
