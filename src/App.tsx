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
import Rooms from "./pages/Rooms/Rooms";
// Styling
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Appcss from "./App.css";
import "./tailwind.css";
import { AuthSelector, CheckisAuth } from "~/features/user/authSlice";
import { Home } from "~/pages/Home/Home";
import Room from "~/pages/Room/Room";
import PrivateRoute from "~/components/PrivateRoute/PrivateRoute";
import DiscoverPage from "~/pages/Discover/Discover";
import { Layout } from "~/components/Layout/Layout";
import { MyTabsContext } from "./contexts/TabsContext";
import { RequestsPage } from "./pages/Requests/Requests";
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
        <Route
          path="/rooms"
          element={
            <Layout>
              <Rooms />
            </Layout>
          }
        />
        <Route path="/room/">
          <Route
            path=":id"
            element={
              <PrivateRoute>
                <Layout>
                  <Room />
                </Layout>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/discover/">
          <Route
            path=""
            element={
              <PrivateRoute>
                <Layout>
                  <DiscoverPage />
                </Layout>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/requests/">
          <Route
            path=""
            element={
              <Layout>
                <RequestsPage />
              </Layout>
            }
          />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </Fragment>

    // </ThemeProvider>
  );
};

export default App;
