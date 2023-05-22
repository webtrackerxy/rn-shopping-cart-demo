import {Product} from "./product"

export interface CartItem {
    product: Product;
    count: number;
    cost: number;
}
  
export interface CartState {
    items: CartItem[];
    totalCost: number;
}
  
export  interface CartContextValue {
    cartState: CartState;
    addCartItem: (product: Product, alert?: boolean) => void;
    removeCartItem: (product: Product) => void;
    removeAllCartItem: (product: Product) => void;
    calculateTotalCost: (items: CartItem[]) => number;
    calculateTotalCount: () => number;
}