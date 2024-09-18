import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const placeOrder =
  (token: string, subtotal: number) => async (dispatch: any, getState: any) => {
    dispatch({ type: "PLACE_ORDER_REQUEST" });

    const currentUser = getState().loginUserReducer.currentUser;
    const cartItems = getState().cartReducer.cartItems;

    try {
      const response = await axios.post(`${apiUrl}/api/orders/placeholder`, {
        token,
        subtotal,
        currentUser,
        cartItems,
      });
      console.log(response);
      dispatch({ type: "PLACE_ORDER_SUCCESS" });
    } catch (error) {
      dispatch({ type: "PLACE_ORDER_FAILED" });
    }
  };

export const getUserOrders = () => async (dispatch: any, getState: any) => {
  const currentUser = getState().loginUserReducer.currentUser;

  dispatch({ type: "GET_USER_ORDERS_REQUEST" });

  try {
    const response = await axios.get(`${apiUrl}/api/orders/getuserorders`, {
      params: {
        userId: currentUser._id,
      },
    });
    dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_USER_ORDERS_FAILED", payload: err });
  }
};

export const getAllOrders = () => async (dispatch: any, getState: any) => {
  dispatch({ type: "GET_ALL_ORDERS_REQUEST" });

  try {
    const response = await axios.get(`${apiUrl}/api/orders/getallorders`);
    dispatch({ type: "GET_ALL_ORDERS_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_ALL_ORDERS_FAILED", payload: err });
  }
};

export const deliverOrder =
  (orderId: string) => async (dispatch: any, getState: any) => {
    dispatch({ type: "DELIVER_ORDER_REQUEST" });

    try {
      const response = await axios.post(`${apiUrl}/api/orders/deliverorder`, {
        orderId,
      });
      alert("Order Delivered");
      console.log(response);
      window.location.reload();
    } catch (err) {
      alert("Something went wrong");
    }
  };
