import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import Login from './Login'
import Registers from './Registers'
import '../App.css'
import Slide from '../Component/Slide'
class Auth extends Component {
  render () {
    return (
      <div>
        {window.localStorage.length>0
          ?window.location='/'

          :
          <Router>
        <div className='App'>
          <div className='App__Aside'>
            <Slide />
          </div>
          <div className='App__Form'>
            <div className='PageSwitcher'>
              <NavLink
                to='/login'
                activeClassName='PageSwitcher__Item--Active'
                className='PageSwitcher__Item'
              >
                Signin
              </NavLink>
              <NavLink
                to='/Register'
                activeClassName='PageSwitcher__Item--Active'
                className='PageSwitcher__Item'
              >
                Signup
              </NavLink>
            </div>

            <Route path='/Login' component={Login} />
            <Route path='/Register' component={Registers} />
          </div>
        </div>
      </Router>
        }
      </div>
      
    )
  }
}

export default Auth
