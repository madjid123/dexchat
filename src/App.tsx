// React
import { Route, Navigate, Routes } from "react-router-dom";
import {} from "react-router";
import { Fragment, useEffect, useState } from "react";

//Redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "./app/hooks";
// Components
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import UserSpace from "./pages/Userspace/UserSpace";
// Styling
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Appcss from "./App.css";
import "./tailwind.css";
import { AuthSelector, CheckisAuth } from "~/features/user/authSlice";
import { Home } from "~/pages/Home/Home";
import PrivateRoute from "~/components/PrivateRoute/PrivateRoute";
import { Layout } from "~/components/Layout/Layout";
import { MyTabsContext } from "./contexts/TabsContext";
const App = () => {
  const dispatch = useAppDispatch();
  const AuthState = useSelector(AuthSelector);
  const { isAuth } = AuthState;
  useEffect(() => {
    dispatch(CheckisAuth());
  }, [isAuth, dispatch]);
  return (
    // <ThemeProvider theme={darkTheme}>
    <Fragment>
      <Routes>
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserSpace />{" "}
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/register"
          element={!isAuth ? <Register /> : <Navigate to="/" />}
        ></Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </Fragment>

    // </ThemeProvider>
  );
};

export default App;
