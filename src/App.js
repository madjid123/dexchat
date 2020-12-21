
import NavBar from './components/NavBar'
import Contacts from './components/Contacts'
import Conversation from './components/Conversation'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
  return (

    <>
      <NavBar ></NavBar>
      <Conversation></Conversation>
      <Contacts style={{ height: '100%' }}></Contacts>



    </>
  )
}

export default App;
