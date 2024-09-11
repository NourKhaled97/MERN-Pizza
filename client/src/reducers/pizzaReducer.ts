export const getAllPizzasReducer = (state = [], action: any) => {
  switch (action.type) {
    case "GET-PIZZAS-REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET-PIZZAS-SUCCESS":
      return {
        loading: false,
        pizzas: action.payload,
      };
    case "GET-PIZZAS-FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
