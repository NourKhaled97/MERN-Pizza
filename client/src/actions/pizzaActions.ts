import axios from "axios";

export const getAllPizzas = () => async (dispatch: any) => {
  dispatch({ type: "GET-PIZZAS-REQUEST" });

  try {
    const response = await axios.get("/api/pizzas/getallpizzas");
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

export const addPizza = (pizza: any) => async (dispatch: any) => {
  dispatch({ type: "ADD_PIZZA_REQUEST" });

  try {
    const response = await axios.post("/api/pizzas/addpizza", { pizza });
    console.log(response);
    dispatch({ type: "ADD_PIZZA_SUCCESS" });
  } catch (err) {
    dispatch({ type: "ADD_PIZZA_FAILED", payload: err });
  }
};

export const editPizza = (pizza: any) => async (dispatch: any) => {
  dispatch({ type: "EDIT_PIZZA_REQUEST" });

  try {
    const response = await axios.put("/api/pizzas/editpizza", { pizza });
    console.log(response);
    dispatch({ type: "EDIT_PIZZA_SUCCESS" });
    window.location.href = "/admin/pizzaslist";
  } catch (err) {
    dispatch({ type: "EDIT_PIZZA_FAILED", payload: err });
  }
};

export const deletePizza = (pizzaId: any) => async (dispatch: any) => {
  try {
    const response = await axios.delete("/api/pizzas/deletepizza", {
      params: {
        pizzaId,
      },
    });
    alert("Pizza deleted successfully");
    console.log(response);
    window.location.reload();
  } catch (err) {
    alert("Something went wrong");
  }
};
