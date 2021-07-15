import Register from './components/register/register';
import Login from './components/login/login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/home/home';

function App() {
  return (
   <Router>
    <div className="App">
      <Switch>
      <Route exact path="/">
          <Home/>
        </Route>
      <Route path="/register">
          <Register/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>
    </div>
   </Router>
  );
}

export default App;
