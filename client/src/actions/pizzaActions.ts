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

export const getFilterPizzas =
  (searchKey: any, searchCategory: any) => async (dispatch: any) => {
    var filteredPizzas;

    dispatch({ type: "GET-PIZZAS-REQUEST" });
    
    try {
      const response = await axios.get("/api/pizzas/getallpizzas");
      
      filteredPizzas = response.data.filter((pizza: any) =>
        pizza.name.toLowerCase().includes(searchKey)
      );

      if (searchCategory !== "all") {
        filteredPizzas = filteredPizzas.filter(
          (pizza: any) => pizza.category === searchCategory
        );
      }

      dispatch({ type: "GET-PIZZAS-SUCCESS", payload: filteredPizzas });
    } catch (err) {
      dispatch({ type: "GET-PIZZAS-FAILED", payload: err });
    }
  };
