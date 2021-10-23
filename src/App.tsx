// React
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { useEffect } from "react"

//Redux
import { useSelector, useDispatch } from "react-redux"
// Components
import Register from "./pages/Auth/Register/Register"
import NavBar from "./components/Navbar/NavBar"
import Login from "./pages/Auth/Login/Login"
import UserSpace from "./pages/Userspace/UserSpace"

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthSelector, CheckisAuth } from "./features/user/authSlice"
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { MessageEndPointApi } from "./services/MessageApi";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";


const Theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#A05656",
      paper: "#1C1D22"
    }
  },

})

const App = () => {
  const dispatch = useDispatch()
  const History = useHistory();
  const { isAuth } = useSelector(AuthSelector)
  useEffect(() => {
    dispatch(CheckisAuth())

  }, [isAuth])


  return (
    <ThemeProvider theme={Theme}>
      <Router >
        <NavBar history={History} ></NavBar>
        {isAuth && <Redirect to="/user"></Redirect>}
        <Switch>
          <Route path="/user">
            <UserSpace  ></UserSpace>
          </Route>
          <Route path="/login">
            <Login
            ></Login>
          </Route>
          <Route path="/register">
            <Register> </Register>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
