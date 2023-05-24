import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ListingsScreen from "./app/screens/ListingsScreen";
import AppNavigator from "./app/navigation/AppNavigator";

const App = () => {
  return (
    <Provider store={store}>
      {/* <ListingsScreen /> */}
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
