import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

// Project dependencies
import { AuthActionEnum } from "./authActions";
import authReducer, { AuthState, defaultAuthState } from "./authReducer";

type AuthProviderProps = {
  children: React.ReactElement;
};

export type UserData = {
  access_token: string;
  user_id: string;
  full_name: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
};

export interface AuthContext {
  authState: AuthState;
  globalLogInDispatch: (props: UserData) => void;
  globalLogOutDispatch: () => void;
}

// Auth context
const authCtx = createContext<AuthContext>({
  authState: defaultAuthState,
  globalLogInDispatch: () => {},
  globalLogOutDispatch: () => {},
});
export const AuthContextProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [authState, authDispatch] = useReducer(authReducer, defaultAuthState);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData: UserData = JSON.parse(user);
      authDispatch({ type: AuthActionEnum.LOG_IN, payload: userData });
    }
  }, []);
  const globalLogInDispatch = useCallback(
    (props: UserData) => {
      const {
        access_token,
        email,
        full_name,
        user_id,
        is_active,
        is_superuser,
      } = props;
      authDispatch({
        type: AuthActionEnum.LOG_IN,
        payload: {
          access_token,
          user_id,
          full_name,
          email,
          is_active,
          is_superuser,
        },
      });
      navigate("/resource");
    },
    [navigate]
  );
  const globalLogOutDispatch = useCallback(() => {
    authDispatch({ type: AuthActionEnum.LOG_OUT, payload: null });
    navigate("/user/login");
  }, [navigate]);
  // context values to be passed down to children
  const ctx = {
    authState,
    globalLogInDispatch,
    globalLogOutDispatch,
  };

  return <authCtx.Provider value={ctx}>{children}</authCtx.Provider>;
};
export default authCtx;
