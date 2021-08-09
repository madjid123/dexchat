// React
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import Register from "./components/Auth/Register";
import NavBar from "./components/NavBar";
import Login from "./components/Auth/Login";
import UserSpace from "./components/UserSpace";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// http
import axios, { AxiosResponse } from "axios";

//API
import Url from "./URL";

axios.defaults.withCredentials = true;
const App = () => {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const History = useHistory();

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    let RawUser = localStorage.getItem("user");
    let user = isAuth === "true" && RawUser ? JSON.parse(RawUser) : "";
    console.log(user)
    axios
      .get(Url + "/loggedin")
      .then((data: AxiosResponse<any>) => {
        console.log(data);
      })
      .catch((err: Error) => console.error(err));
    if (user) {
      setUsername(user.username);
      setId(user.id);
    }
  }, [id, username]);
  const changeUser = (uname: string, Id: string) => {
    setUsername(uname);
    setId(Id);
  };
  const logout = () => {
    axios.get(Url + "/logout").then((response: AxiosResponse<any>) => {
      if (response.data) {
        setUsername("");
        setId("");
      }
    });
  };
  console.log(username)
  return (
    <>
      <Router>
        <NavBar username={username} logout={logout} history={History}></NavBar>
        {username !== "" && <Redirect to="/user"></Redirect>}
        <Switch>
          <Route path="/user">
            <UserSpace username={username} id={id}></UserSpace>
          </Route>
          <Route path="/login">
            <Login
              changeUser={(user: string, id: string) => {
                changeUser(user, id);
              }}
            ></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
