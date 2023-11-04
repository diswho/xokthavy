// Global imports
import { useEffect, useState, useContext, FormEventHandler } from "react";

// Project dependencies
import { useLocation } from "react-router-dom";
import useApi from "../../hooks/api/useApi";
import { AuthData } from "../../hooks/api/apiData";
import AuthContext from "../../store/auth/AuthContextProvider";
import LogInForm from "./LogInForm";
import { validatePasswordLength, validateEmailFormat } from "./validations";
// import RegisterForm from "./RegisterForm";
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
        access_token: authData.user.access_token,
        user_id: authData.user.user_id,
        full_name: authData.user.full_name,
        email: authData.user.email,
        is_active: authData.user.is_active,
        is_superuser: authData.user.is_superuser,
      });
    }
  }, [authData, globalLogInDispatch]);
  const authHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Validations first!
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    const userName = data.get("name");
    try {
      if (
        !validateEmailFormat(userEmail?.toString() || "") ||
        !validatePasswordLength(userPassword?.toString() || "")
      ) {
        throw new Error("Incorrect credential format!");
      }
      // const endpoint = `/user/${isLogin ? 'login' : 'register'}`
      const endpoint = `${isLogin ? "/login/access-token" : "/user/register"}`;
      // const header = ${isLogin?{"Content-Type": "application/x-www-form-urlencoded"}:{"Content-Type": "application/json"}}
      var myHeaders = new Headers();
      var urlencoded = new URLSearchParams();
      if (isLogin) {
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        urlencoded.append("username", userEmail?.toString() || "");
        urlencoded.append("password", userPassword?.toString() || "");
        // console.log("-------isLogin - myHeaders")
      } else {
        myHeaders.append("Content-Type", "application/json");
        urlencoded.append("email", userEmail?.toString() || "");
        urlencoded.append("password", userPassword?.toString() || "");
        urlencoded.append("name", userName?.toString() || "");
        console.log("-------isNotLogin - myHeaders");
      }
      const params = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };

      await request(endpoint, params, setAuthData);
      // console.log("-------- AuthData")
    } catch (error: any) {
      setError(error.message || error);
    }
  };
  return (
    <>
      <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
      {/* {isLogin ? (<LogInForm onSubmit={authHandler} />) : (<RegisterForm onSubmit={authHandler} />)} */}
      <LogInForm onSubmit={authHandler} />
    </>
  );
};
