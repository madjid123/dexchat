
// React
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useState } from 'react'

// Components
import Register from "./components/Register"
import NavBar from './components/NavBar'
import Contacts from './components/Contacts'
import Conversation from './components/Conversation'
import Login from './components/Login'

// Styling 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {

  const [username, setUsername] = useState("")

  const changeUser = (uname) => {
    console.log("I reached this ")
    setUsername(uname)
  }
  console.log(username)
  return (
    <>
      <NavBar username={username}></NavBar>


      <Router>

        <Switch>
          <Route path="/login"  ><Login changeUser={changeUser}></Login></Route>
          <Route path="/register" ><Register > </Register></Route>
        </Switch>

      </Router>
    </>
  )
}

export default App;
