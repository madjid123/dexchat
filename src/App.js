

// React
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useState } from 'react'

// Components
import Register from "./components/Register"
import NavBar from './components/NavBar'
import Login from './components/Login'
import UserSpace from './components/UserSpace';

// Styling 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


// http 
import axios from 'axios'

//API
import Url from "./URL"
import io from 'socket.io'




function App() {

  const [username, setUsername] = useState("")
  axios.defaults.withCredentials = true
  axios.get(Url.API_URL + '/loggedin').then((res) => {
    if (res.data.name) {
      setUsername(res.data.name)
    }
  }).catch((err) => { console.log(err) })
  const changeUser = (uname) => {


    setUsername(uname)
  }
  const logout = () => {
    axios.get(Url.API_URL + "/logout").then((response) => {
      if (response.data) setUsername("")
    })
  }
  return (
    <>
      <NavBar username={username} logout={logout}></NavBar>

      <Router>

        <Switch>
          {(username !== "") && <Route path='/user'> <UserSpace username={username}> </UserSpace></Route>}
          <Route path="/login"  ><Login changeUser={changeUser}></Login></Route>
          <Route path="/register" ><Register > </Register></Route>
        </Switch>

      </Router>
    </>
  )
}

export default App;
