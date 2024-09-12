import axios from "axios"

export const placeOrder = (token: string, subtotal: number) => async (dispatch: any, getState: any) => {
    dispatch({ type: "PLACE_ORDER_REQUEST" });

    const currentUser = getState().loginUserReducer.currentUser;
    const cartItems = getState().cartReducer.cartItems;

    try {
        const response = await axios.post('/api/orders/placeholder', { token, subtotal, currentUser, cartItems });
        console.log(response);
        dispatch({ type: "PLACE_ORDER_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ type: "PLACE_ORDER_FAILED" });
    }
}
