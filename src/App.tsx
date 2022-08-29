// React
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  useNavigate,
} from "react-router-dom";
import { } from "react-router"
import { useEffect } from "react";

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

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isAuth } = useSelector(AuthSelector);
  useEffect(() => {
    dispatch(CheckisAuth());
  }, [isAuth]);
  return (
    <ThemeProvider theme={darkTheme}>
      {/* {isAuth && <Navigate to="/user"></Navigate>} */}
      <Routes>
        <Route path="/user" element={<UserSpace />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/register" element={<Register />}>
        </Route>
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </ThemeProvider>
  );
};

export default App;
