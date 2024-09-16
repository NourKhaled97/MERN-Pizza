// create the store, and put all reducer in the store
import {
  combineReducers,
  applyMiddleware,
  legacy_createStore,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import {
  getAllPizzasReducer,
  addPizzaReducer,
  editPizzaReducer,
} from "./reducers/pizzaReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  registerUserReducer,
  loginUserReducer,
  getAllUsersReducer,
} from "./reducers/userReducer";
import {
  placeOrderReducer,
  getUserOrdersReducer,
  getAllOrdersReducer,
} from "./reducers/orderReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const finalReducer = combineReducers({
  getAllPizzasReducer: getAllPizzasReducer,
  cartReducer: cartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducer: getUserOrdersReducer,
  addPizzaReducer: addPizzaReducer,
  editPizzaReducer: editPizzaReducer,
  getAllOrdersReducer: getAllOrdersReducer,
  getAllUsersReducer: getAllUsersReducer,
});

//#region initial state
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") || "{}")
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser") || "")
  : null;

const initialState = {
  cartReducer: { cartItems: cartItems },
  loginUserReducer: {
    currentUser: currentUser,
  },
};
//#endregion

// const composeEnhancers = composeWithDevTools({});
// const composeEnhancers = compose;
const composeEnhancers =
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = legacy_createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
