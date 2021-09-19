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
import Register from "./components/Auth/Register"
import NavBar from "./components/NavBar"
import Login from "./components/Auth/Login"
import UserSpace from "./components/UserSpace"

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthSelector, CheckisAuth } from "./features/user/authSlice"
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { MessageEndPointApi } from "./services/MessageApi";



const App = () => {
  const dispatch = useDispatch()
  const History = useHistory();
  const { isAuth } = useSelector(AuthSelector)
  useEffect(() => {
    dispatch(CheckisAuth())

  }, [isAuth])


  return (
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
  );
}

export default App;
