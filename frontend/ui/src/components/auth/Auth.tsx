// Global imports
import { useEffect, useState, useContext, FormEventHandler } from "react";

// Project dependencies
import useApi from "../../hooks/api/useApi";
import { AuthData } from "../../hooks/api/apiData";
import { useLocation } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import AuthContext from "../../store/auth/AuthContextProvider";
import { validatePasswordLength, validateEmailFormat } from "./validations";
import LogInForm from "./LogInForm";

const Auth = () => {
  const [authData, setAuthData] = useState<AuthData>();
  const { request, setError } = useApi();
  const { globalLogInDispatch } = useContext(AuthContext);
  const location = useLocation();
  const currentPathArray = location.pathname.split("/");
  const isLogin = currentPathArray[currentPathArray.length - 1] === "login";

  // Upon successful response from the api for login user, dispatch global auth LOG_IN event
  useEffect(() => {
    if (authData && "success" in authData) {
      globalLogInDispatch({
        authToken: authData.user.auth_token,
        userId: authData.user.user_id,
        full_name: authData.user.full_name,
        email: authData.user.email,
      });
    }
  }, [authData, globalLogInDispatch]);

  const authHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Validations first!
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    var urlencoded = new URLSearchParams();
    // const userName = data.get("name");
    try {
      if (
        !validateEmailFormat(userEmail?.toString() || "") ||
        !validatePasswordLength(userPassword?.toString() || "")
      ) {
        throw new Error("Incorrect credential format!");
      }
      urlencoded.append("username", userEmail ? userEmail.toString() : "");
      urlencoded.append(
        "password",
        userPassword ? userPassword.toString() : ""
      );
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlencoded,
        // body: JSON.stringify({
        //   username: userEmail,
        //   password: userPassword,
        //   // name: userName,
        // }),
      };

      const endpoint = `${isLogin ? "/login/access-token" : "/user/register"}`;
      // const endpoint = `/user/${isLogin ? "login" : "register"}`;
      // /api/v1/login/access-token
      await request(endpoint, params, setAuthData);
    } catch (error: any) {
      setError(error.message || error);
    }
  };
  // params.headers["Content-Type"] = "application/x-www-form-urlencoded";
  return (
    <>
      <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
      {isLogin ? (
        <LogInForm onSubmit={authHandler} />
      ) : (
        <RegisterForm onSubmit={authHandler} />
      )}
    </>
  );
};
export default Auth;
