import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import WorkoutsNavigator from "./navigation/WorkoutsNavigator";
import rootReducer from "./redux/reducers";

let store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <WorkoutsNavigator />
      </NavigationContainer>
    </Provider>
  );
}
