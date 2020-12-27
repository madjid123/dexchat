
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Register from "./components/Register"
import NavBar from './components/NavBar'
import Contacts from './components/Contacts'
import Conversation from './components/Conversation'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
  return (
    <>
      <NavBar ></NavBar>


      <Router>

        <Switch>
          <Route path="/login" component={Login} ><Login></Login></Route>
          <Route path="/register" component={Register}><Register> </Register></Route>
        </Switch>

      </Router>
    </>
  )
}

export default App;
