// React
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  useNavigate,
} from "react-router-dom";
import { } from "react-router"
import { Fragment, useEffect } from "react";

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
import { useAuthContext, MyAuthContext } from "./contexts/authentication/AuthContext";
import DiscoverPage from "./pages/Discover/Discover";
const App = () => {
  const dispatch = useDispatch();
  const AuthState = useSelector(AuthSelector);
  const { currentUser, isAuth, isLoading } = AuthState;
  useEffect(() => {
    dispatch(CheckisAuth());
    // console.log(isAuth)
  }, [isAuth]);
  return (
    // <ThemeProvider theme={darkTheme}>
    <Fragment>
      <MyAuthContext.Provider value={{ authState: AuthState, setAuth: () => { } }}>
        <Routes>
          <Route path="/user" element={<UserSpace />}>
          </Route>
          <Route path="/login" element={(!isAuth) ? <Login /> : <Navigate to="/user" />}>
          </Route>
          <Route path="/register" element={<Register />}>
          </Route>
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/"
            element={<PrivateRoute />} >
            <Route path=":id" element={<Room />} />
          </Route>

          <Route path="/discover/"
            element={<PrivateRoute />} >
            <Route path=":id" element={<DiscoverPage />} />
          </Route>
          <Route path="/requests/"
            element={<PrivateRoute />} >
            <Route path=":id" element={<DiscoverPage />} />
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </MyAuthContext.Provider>
    </Fragment >


    // </ThemeProvider>
  );
};

export default App;
