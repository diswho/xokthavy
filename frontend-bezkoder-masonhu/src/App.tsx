import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AuthContext from "./store/auth/AuthContextProvider";
import "./App.css";
import { useContext } from "react";
import Auth from "./components/auth/Auth";

function App() {
  const { authState } = useContext(AuthContext);
  const location = useLocation();
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={authState.isLoggedIn ? location.pathname : "/user/login"}
            />
          }
        >
          {!authState.isLoggedIn && (
            <Route path="user">
              <Route path="register" element={<Auth />} />
              <Route path="login" element={<Auth />} />
            </Route>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
