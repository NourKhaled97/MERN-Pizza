export const cartReducer = (state = { cartItems: [] }, action: any) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const alreadyExist = state.cartItems.filter(
        (cart: any) => cart._id === action.payload._id
      );

      if (alreadyExist.length !== 0) {
        return {
          ...state,
          cartItems:
            state.cartItems &&
            Array.isArray(state.cartItems) &&
            state.cartItems.map((cart: any) =>
              cart._id === action.payload._id ? action.payload : cart
            ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cart: any) => cart._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
