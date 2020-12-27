
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
      <Login></Login>
      <Contacts ></Contacts>
      <Conversation></Conversation>


    </>
  )
}

export default App;
