export const LoginStart = (userCredentials) => ({ type: "LOGIN_START" });

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFaliure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});

export const logoutUser = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};
