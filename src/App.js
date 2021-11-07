import './App.css';
import Chatbar from './Chatbar';
import Sidebar from './Sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';




function App() {

  const [{ user }, dispatch] = useStateValue();
  return (
    //BEM naming convention
    <div className="app">
      {
        !user ? (
          <Login/>
        ) : (
            <div className="app__body">
      <Router>
          <Switch>
            <Route path = "/rooms/:roomId">
                <Sidebar/>
                <Chatbar/>
            </Route>
            <Route path = "/">
                <Sidebar/>

               <Chatbar/>
            </Route>
          </Switch>
      </Router>  
      </div>
        )
      }
      
    </div>
  );
}

export default App;
