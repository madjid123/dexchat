// React
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { } from "react-router"
import { Fragment, useEffect, useState } from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
// Components
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import UserSpace from "./pages/Userspace/UserSpace";
import Rooms from "./pages/Rooms/Rooms";
// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthSelector, CheckisAuth } from "./features/user/authSlice";
import { darkTheme, lightTheme } from "./components/Theme/Theme";
import { Home } from "./pages/Home/Home";
import { ThemeProvider } from "styled-components";
import Room from "./pages/Room/Room";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import DiscoverPage from "./pages/Discover/Discover";
import { Page } from "./components/Page/Page";
import { MyTabsContext } from "./contexts/TabsContext";
import { RequestsPage } from "./pages/Requests/Requests";
const App = () => {
  const dispatch = useDispatch();
  const AuthState = useSelector(AuthSelector);
  const { currentUser, isAuth, isLoading } = AuthState;
  const [currentEventKey, setCurrenEventKey] = useState("rooms")
  useEffect(() => {
    dispatch(CheckisAuth());
  }, [isAuth]);
  return (
    // <ThemeProvider theme={darkTheme}>
    <Fragment>
      <MyTabsContext.Provider value={{ currentEventKey: currentEventKey, setEventKey: setCurrenEventKey }}>
        <Routes>
          <Route path="/user" element={<UserSpace />}>
          </Route>
          <Route path="/login" element={(!isAuth) ? <Login /> : <Navigate to="/user" />}>
          </Route>
          <Route path="/register" element={<Register />}>
          </Route>
          <Route path="/rooms" element={<Page><Rooms /></Page>} />
          <Route path="/room/"
            element={<PrivateRoute />} >
            <Route path=":id" element={<Page><Room /></Page>} />
          </Route>
          <Route path="/discover/"
            element={<PrivateRoute />} >
            <Route path="" element={<Page><DiscoverPage /></Page>} />
          </Route>
          <Route path="/requests/"
            element={<PrivateRoute />} >
            <Route path="" element={<Page><RequestsPage /></Page>} />
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </MyTabsContext.Provider >
    </Fragment >

    // </ThemeProvider>
  );
};

export default App;
