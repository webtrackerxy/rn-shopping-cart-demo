import { createStore, combineReducers } from 'redux';
import { cartReducer } from './reducers/cartReducer';
import { productReducer } from './reducers/productReducers';

const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
});

export const store = createStore(rootReducer);
