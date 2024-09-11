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

const finalReducer = combineReducers({
  getAllPizzasReducer: getAllPizzasReducer,
  cartReducer: cartReducer,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems") || "{}")
  : [];

const initialState = {
  cartReducer: { cartItems: cartItems },
};

// const composeEnhancers = composeWithDevTools({});
const composeEnhancers = compose;

const store = legacy_createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
