import {CartState} from "../types/cart"
import {ProductState} from "../types/product"


// Assuming RootState is the type for your entire Redux state
export interface RootState {
    cart: CartState;
    product: ProductState;
}