import { cartReducer } from './cartReducer';
import { ADD_CART_ITEM, REMOVE_CART_ITEM, REMOVE_ALL_CART_ITEMS } from '../types';

describe('cartReducer', () => {
  const initialState = {
    items: [],
    totalCost: 0,
  };

  it('should return the initial state', () => {
    expect(cartReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_CART_ITEM', () => {
    const action = {
      type: ADD_CART_ITEM,
      payload: { product: { id: '1', title: 'Product 1', price: 100 } },
    };

    const expectedState = {
      items: [{ product: { id: '1', title: 'Product 1', price: 100 }, count: 1, cost: 100 }],
      totalCost: 100,
    };

    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle REMOVE_CART_ITEM', () => {
    const initialState = {
      items: [{ product: { id: '1', title: 'Product 1', price: 100 }, count: 2, cost: 200 }],
      totalCost: 200,
    };

    const action = {
      type: REMOVE_CART_ITEM,
      payload: { id: '1', price: 100 },
    };

    const expectedState = {
      items: [{ product: { id: '1', title: 'Product 1', price: 100 }, count: 1, cost: 100 }],
      totalCost: 100,
    };

    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle REMOVE_ALL_CART_ITEMS', () => {
    const initialState = {
      items: [{ product: { id: '1', title: 'Product 1', price: 100 }, count: 2, cost: 200 }],
      totalCost: 200,
    };

    const action = {
      type: REMOVE_ALL_CART_ITEMS,
      payload: { id: '1' },
    };

    const expectedState = {
      items: [],
      totalCost: 0,
    };

    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });
});
