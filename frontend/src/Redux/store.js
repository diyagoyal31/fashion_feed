import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";

import thunk from "redux-thunk";
import { orderReducer } from "./order/reducer";
import { authReducer } from "./auth/reducer";
import { cartReducer } from "./bag/reducer";
import { productReducer } from "./product/reducer";

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
