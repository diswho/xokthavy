import { useState, useCallback, useContext } from "react";
import AuthContext from "../../store/auth/AuthContextProvider";
const BASE_URL = "http://127.0.0.1:8000/api/v1";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authState, globalLogOutDispatch } = useContext(AuthContext);
  const request = useCallback(
    async (
      endpoint: string,
      params: { [key: string]: any },
      handleSuccessResponse: (data: any) => void,
      handleErrorResponse?: (error: Error) => void
    ) => {
      setLoading(true);
      setError(null);

      try {
        // NOTE: If user is logged in, insert the auth token into request headers for authorization
        if (authState.isLoggedIn) {
          params.headers["x-access-token"] = authState.access_token;
        }
        const response = await fetch(BASE_URL + endpoint, { ...params });
        if (!response.ok) {
          const data = await response.json(); // Assume always json response
          console.log("=== Error", data.error);
          throw new Error(data.error);
        }
        const data = await response.json(); // Assume always json response
        console.log("=== data", data);
        // If response is okay and no errors, then successful request
        handleSuccessResponse && (await handleSuccessResponse(data));
      } catch (error: any) {
        console.log("=== catch Error", error.message);
        // NOTE: If it's unauthorized error, then we will auto log user out
        if (error && error.message && error.message === "Unauthorized") {
          globalLogOutDispatch();
        }

        // Handle error if specified
        if (handleErrorResponse) {
          handleErrorResponse(error.message || error.error || error);
        } else {
          setError(error.message || error.error || error);
        }
      }
      setLoading(false);
    },
    [authState.isLoggedIn, authState.access_token, globalLogOutDispatch]
  );
  return {
    loading: loading,
    error: error,
    request: request,
    setError: setError,
  };
};
export default useApi;
