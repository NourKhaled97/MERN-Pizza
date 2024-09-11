import axios from "axios";

export const getAllPizzas = () => async (dispatch: any) => {
  dispatch({ type: "GET-PIZZAS-REQUEST" });

  try {
    const response = await axios.get("/api/pizzas/getallpizzas");
    console.log(response);
    dispatch({ type: "GET-PIZZAS-SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET-PIZZAS-FAILED", payload: err });
  }
};
