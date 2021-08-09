// React
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import { useState, useEffect } from "react";


// Components
import Register from "./components/Auth/Register";
import NavBar from "./components/NavBar";
import Login from "./components/Auth/Login";
import UserSpace from "./components/UserSpace";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// http
import axios from "axios";

//API
import Url from "./URL";

axios.defaults.withCredentials = true;
const App = () => {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const History = useHistory();


  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth")
    let RawUser = localStorage.getItem("user");
<<<<<<< Updated upstream
<<<<<<< HEAD
    let user = (isAuth === 'true' && RawUser) ? JSON.parse(RawUser) : undefined
    axios.get(Url.API_URL + "/loggedin")
      .then((data) => {

=======
    let user = isAuth === "true" && RawUser ? JSON.parse(RawUser) : "";
    console.log(user)
    axios
      .get(Url + "/loggedin")
      .then((data: AxiosResponse<any>) => {
        console.log(data);
>>>>>>> 40a3d71737ddae967259d700ca1644783fca072e
      })
      .catch(err => console.error(err))
    if (user) {
<<<<<<< HEAD
      setUsername(user.name)
      setId(user.id)
=======
      setUsername(user.username);
      setId(user.id);
>>>>>>> 40a3d71737ddae967259d700ca1644783fca072e
=======
    let user = isAuth === "true" && RawUser ? JSON.parse(RawUser) : "";
    console.log(user)
    axios
      .get(Url + "/loggedin")
      .then((data) => {
        console.log(data);
      })
      .catch(err => console.error(err))
    if (user) {
      setUsername(user.username);
      setId(user.id);
>>>>>>> Stashed changes
    }
  }

    , [id, username])
  const changeUser = (uname: string, Id: string) => {
    setUsername(uname);
    setId(Id);
  };
  const logout = () => {
<<<<<<< Updated upstream
<<<<<<< HEAD
    axios.get(Url.API_URL + "/logout").then((response) => {
=======
    axios.get(Url + "/logout").then((response: AxiosResponse<any>) => {
>>>>>>> 40a3d71737ddae967259d700ca1644783fca072e
=======
    axios.get(Url + "/logout").then((response: AxiosResponse<any>) => {
>>>>>>> Stashed changes
      if (response.data) {
        setUsername("");
        setId("");
      }
    });
  };
  console.log(username)
  return (
    <>
      <Router >
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
            <Register> </Register>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
