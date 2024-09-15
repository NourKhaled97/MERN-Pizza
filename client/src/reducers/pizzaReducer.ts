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

export const addPizzaReducer = (state = {}, action: any) => {
  switch (action.type) {
    case "ADD_PIZZA_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "ADD_PIZZA_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "ADD_PIZZA_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const editPizzaReducer = (state = {}, action: any) => {
  switch (action.type) {
    case "EDIT_PIZZA_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "EDIT_PIZZA_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "EDIT_PIZZA_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};