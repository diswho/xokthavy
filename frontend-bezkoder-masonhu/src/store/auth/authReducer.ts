import { Reducer } from "react";
import { AuthAction } from "./authActions";

export interface AuthState {
  isLoggedIn: boolean;
  access_token?: string;
  user_id?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  full_name?: string;
  email?: string;
}
export const defaultAuthState: AuthState = {
  isLoggedIn: false,
};

const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  // user successfully authenticated
  if (action.type === "LOG_IN") {
    localStorage.setItem("user", JSON.stringify(action.payload));
    return {
      ...state,
      isLoggedIn: true,
      authToken: action.payload.access_token,
      user_id: action.payload.user_id,
      full_name: action.payload.full_name,
      email: action.payload.email,
      is_active: action.payload.is_active,
      is_superuser: action.payload.is_superuser,
    };
  }

  // log out user
  if (action.type === "LOG_OUT") {
    localStorage.removeItem("user");
    return defaultAuthState;
  }

  return defaultAuthState;
};
export default authReducer;
