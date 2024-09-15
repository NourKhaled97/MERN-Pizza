import axios from "axios";

export const placeOrder =
  (token: string, subtotal: number) => async (dispatch: any, getState: any) => {
    dispatch({ type: "PLACE_ORDER_REQUEST" });

    const currentUser = getState().loginUserReducer.currentUser;
    const cartItems = getState().cartReducer.cartItems;

    try {
      const response = await axios.post("/api/orders/placeholder", {
        token,
        subtotal,
        currentUser,
        cartItems,
      });
      console.log(response);
      dispatch({ type: "PLACE_ORDER_SUCCESS" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "PLACE_ORDER_FAILED" });
    }
  };

export const getUserOrders = () => async (dispatch: any, getState: any) => {
  const currentUser = getState().loginUserReducer.currentUser;

  dispatch({ type: "GET_USER_ORDERS_REQUEST" });

  try {
    const response = await axios.get("/api/orders/getuserorders", {
      params: {
        userId: currentUser._id,
      },
    });
    console.log(response);
    dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_USER_ORDERS_FAILED", payload: err });
  }
};

export const getAllOrders = () => async (dispatch: any, getState: any) => {
  dispatch({ type: "GET_ALL_ORDERS_REQUEST" });

  try {
    const response = await axios.get("/api/orders/getallorders");
    console.log(response);
    dispatch({ type: "GET_ALL_ORDERS_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_ALL_ORDERS_FAILED", payload: err });
  }
};

export const deliverOrder =
  (orderId: string) => async (dispatch: any, getState: any) => {
    dispatch({ type: "DELIVER_ORDER_REQUEST" });

    try {
      const response = await axios.post("/api/orders/deliverorder", {
        orderId,
      });
      alert("Order Delivered");
      console.log(response);
      window.location.reload();
    } catch (err) {
      alert("Something went wrong");
    }
  };
