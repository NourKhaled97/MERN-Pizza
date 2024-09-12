// create the store, and put all reducer in the store
import {
  combineReducers,
  applyMiddleware,
  legacy_createStore,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { getAllPizzasReducer } from "./reducers/pizzaReducer";
import { cartReducer } from "./reducers/cartReducer";
import { registerUserReducer, loginUserReducer } from "./reducers/userReducer";
import { placeOrderReducer } from "./reducers/orderReducer";

const finalReducer = combineReducers({
  getAllPizzasReducer: getAllPizzasReducer,
  cartReducer: cartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  placeOrderReducer: placeOrderReducer,
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
const composeEnhancers = compose;

const store = legacy_createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
