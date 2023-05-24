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

      const sortType:string =  !action.payload?.sortType ? "price": action.payload.sortType;
      const ordering:string =  !action.payload?.ordering ? "descending" : action.payload.ordering

      if (
        !(
          sortType === "title" ||
          sortType === "price" ||
          sortType === "rating"
        ) ||
        !(ordering === "ascending" || ordering === "descending")
      ) {
        console.log("Invalid sortType or order",sortType,ordering );
        return;
      }
  
      const sortedProducts = state.items.sort((a, b) => {
        const valA =
        sortType === "rating"
            ? a[sortType].rate
            : sortType === "price"
            ? a[sortType]
            : a[sortType].toUpperCase();
        const valB =
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
