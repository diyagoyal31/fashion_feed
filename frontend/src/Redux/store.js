// src/Redux/store.js
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducer";
import { orderReducer } from "./order/reducer"; // Add as needed
import { cartReducer } from "./bag/reducer";   // Add as needed
import { productReducer } from "./product/reducer"; // Add as needed

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  carts: cartReducer,
  orders: orderReducer,
  
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
