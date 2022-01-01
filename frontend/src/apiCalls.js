import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const { data } = await axios.post("/api/auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    // console.log("data:", data);
    // localStorage.setItem("user", data);
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
