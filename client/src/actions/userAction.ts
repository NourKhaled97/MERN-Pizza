import axios from "axios";

export const registerUser = (user: any) => async (dispatch: any) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });

  try {
    const response = await axios.post("/api/users/register", user);
    console.log(response);
    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: error });
  }
};

export const loginUser = (user: any) => async (dispatch: any) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });

  try {
    const response = await axios.post("/api/users/login", user);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
  }
};

export const logoutUser = () => async (dispatch: any) => {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
};

export const getAllUsers = () => async (dispatch: any, getState: any) => {
  dispatch({ type: "GET_ALL_USERS_REQUEST" });

  try {
    const response = await axios.get("/api/users/getallusers");
    dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_ALL_USERS_FAILED", payload: err });
  }
};

export const deleteUser = (userId: any) => async (dispatch: any) => {
  try {
    const response = await axios.delete("/api/users/deleteuser", {
      params: {
        userId,
      },
    });
    alert("User deleted successfully");
    console.log(response);
    window.location.reload();
  } catch (err) {
    alert("Something went wrong");
  }
};