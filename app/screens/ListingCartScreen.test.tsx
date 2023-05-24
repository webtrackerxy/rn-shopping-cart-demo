import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ListingCartScreen from "./ListingCartScreen";

describe("ListingCartScreen", () => {
  const mockStore = configureStore([]);
  const navigation = { navigate: jest.fn() };

  it("should render with given state from Redux store", () => {
    const store = mockStore({
      cart: {
        items: [
          {
            product: { id: "1", title: "Product 1", price: 100 },
            count: 1,
            cost: 100,
          },
        ],
        totalCost: 100,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <ListingCartScreen navigation={navigation} />
      </Provider>
    );

    expect(getByText(/Qty:\s*1\s*Sub Total: £\s*100/)).toBeDefined();
    // expect(getByText("Product 1")).toBeDefined(); // fail
    expect(getByText(/Product 1\s*\(\s*£\s*100\s*\)/)).toBeDefined(); // ok
  });
});
