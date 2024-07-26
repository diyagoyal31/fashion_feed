// src/Redux/auth/reducer.js
import * as types from "./types";

const TOKEN = localStorage.getItem("token");
const initialState = {
  userLogin: { loading: false, error: false, message: "" },
  userRegister: { loading: false, error: false, message: "" },
  userUpdate: { loading: false, error: false, message: "" },
  data: {
    isAuthenticated: !!TOKEN,
    token: TOKEN,
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
};

export function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.LOGIN_USER_REQUEST:
      return {
        ...state,
        userLogin: { loading: true, error: false },
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        userLogin: { loading: false, error: false, message: payload.message },
        data: {
          isAuthenticated: true,
          token: payload.token,
          user: payload.user,
        },
      };
    case types.LOGIN_USER_ERROR:
      return {
        ...state,
        userLogin: { loading: false, error: true, message: payload.message },
      };

    case types.REGISTER_USER_REQUEST:
      return {
        ...state,
        userRegister: { loading: true, error: false },
      };
    case types.REGISTER_USER_SUCCESS:
      return {
        ...state,
        userRegister: {
          loading: false,
          error: false,
          message: payload.message,
        },
        data: {
          isAuthenticated: true,
          token: payload.token,
          user: payload.user,
        },
      };
    case types.REGISTER_USER_ERROR:
      return {
        ...state,
        userRegister: { loading: false, error: true, message: payload.message },
      };

    case types.UPDATE_USER_REQUEST:
      return {
        ...state,
        userUpdate: { loading: true, error: false },
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        userUpdate: { loading: false, error: false, message: payload.message },
        data: {
          ...state.data,
          user: payload.user,
        },
      };
    case types.UPDATE_USER_ERROR:
      return {
        ...state,
        userUpdate: { loading: false, error: true, message: payload.message },
      };

    case types.AUTH_LOGOUT:
      return {
        ...state,
        data: {
          isAuthenticated: false,
          token: null,
          user: null,
        },
      };

    default:
      return state;
  }
}
