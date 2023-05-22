
export interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}


export interface ProductState {
    items: Product[];
    search_text: string;
}
  
export interface ProductContextValue {
    productState: ProductState;
    setProductState: React.Dispatch<React.SetStateAction<ProductState>>;
    calculateRating: (productID: number, rate: number) => void;
    sortProducts: (sortType:string, ordering: string) => void;
}