// src/Redux/auth/action.js
import * as types from "./types";
import axios from "axios";

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_USER_REQUEST });
    const response = await axios.post(
      `https://busy-rose-earthworm-cap.cyclic.app/user/new`,
      userData
    );
    dispatch({
      type: types.REGISTER_USER_SUCCESS,
      payload: {
        token: response.data.token,
        message: response.data.message,
        user: response.data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: types.REGISTER_USER_ERROR,
      payload: { message: error.message },
    });
  }
};

// Login User
export const authLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_USER_REQUEST });
    const response = await axios.post(
      "https://busy-rose-earthworm-cap.cyclic.app/user/login",
      data
    );
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    dispatch({
      type: types.LOGIN_USER_SUCCESS,
      payload: {
        token: response.data.token,
        message: response.data.message,
        user: response.data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: types.LOGIN_USER_ERROR,
      payload: { message: error.message },
    });
  }
};

// Edit User
export const editUser = (userData, id) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_USER_REQUEST });
    const response = await axios.put(
      `https://busy-rose-earthworm-cap.cyclic.app/user/update?id=${id}`,
      userData
    );
    localStorage.setItem("token", response.data.token);
    dispatch({
      type: types.UPDATE_USER_SUCCESS,
      payload: {
        token: response.data.token,
        message: response.data.message,
        user: response.data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_USER_ERROR,
      payload: { message: error.message },
    });
  }
};

// Logout
export const authLogout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: types.AUTH_LOGOUT,
  });
};
