import React from 'react';
import Home from './Pages/Home';
import Details from './Pages/Details';
import Detail from './Pages/Detail';
import './App.css';
import {Provider} from 'react-redux';
import store from './Redux/store'
import Auth from './Pages/Auth'
import History from './Pages/History'
import{BrowserRouter as Router,Route,Switch} from 'react-router-dom'
function App() {
  return (
    <Router>
      <Provider store={store}>
      <Switch>
      
        <Route path='/Detail' component={Detail}/>
        <Route path='/Details/:id' component={Details}/>
        <Route exact path='/' component={Home}/>
        <Route path='/History' component={History}/>
        <Route path='/Login' component={Auth}/>
        <Route path='/Register' component={Auth}/>
      </Switch>
      </Provider>
    </Router>
  );
}

export default App;
