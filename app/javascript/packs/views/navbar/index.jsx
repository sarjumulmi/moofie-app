import React from 'react'
// import { isLoggedIn } from './../../client'
import {Route, Link} from 'react-router-dom'
import SignupForm from './../signup'

const Navbar = () => (
  <div>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign Up</Link>
    </nav>
    <Route path='/signup' component={SignupForm} />
    <Route path='/login' render={() => (
      <div>
        Login Form
      </div>
      )} />
  </div>
)
export default Navbar
