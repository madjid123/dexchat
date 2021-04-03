// React
import { BrowserRouter as Router, Switch, Route, Redirect, Link, useHistory, withRouter } from "react-router-dom"
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
import io from 'socket.io-client'



function App() {

  const [username, setUsername] = useState("")
  const [id, setId] = useState("")
  const History = useHistory()
  axios.defaults.withCredentials = true
  if (id !== '')
    axios.get(Url.API_URL + '/loggedin').then((res) => {
      if (res.data.name) {
        setUsername(res.data.name)
        setId(res.data.id)
      }
    }).catch((err) => { console.log(err) })

  const changeUser = (uname, Id) => {
    setUsername(uname)
    setId(Id)
  }
  const logout = () => {
    axios.get(Url.API_URL + "/logout").then((response) => {
      if (response.data) { setUsername(""); setId("") }

    })

  }
  console.log(__filename, id)
  return (
    <>


      <Router history={History}>
        <NavBar username={username} logout={logout} history={History}></NavBar>
        {username !== "" && <Redirect to='/user'></Redirect>}
        <Switch>
          <Route path='/user'> <UserSpace username={username} id={id}> </UserSpace></Route>
          <Route path="/login"  ><Login changeUser={(user, id) => { changeUser(user, id) }}></Login></Route>
          <Route path="/register" ><Register > </Register></Route>
        </Switch>

      </Router>
    </>
  )
}

export default App;
