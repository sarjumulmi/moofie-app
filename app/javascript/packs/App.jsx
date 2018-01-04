import React from 'react'
import { Route } from 'react-router-dom'
import Home from './views/home/'
import Navbar from './views/navbar/'
import SignupForm from './views/signup'
import LoginForm from './views/login'
import LogoutForm from './views/logout'

const App = () => (
  <div>
    <Navbar />
    <Route exact path='/' component={Home} />
    <Route path='/signup' component={SignupForm} />
    <Route path='/login' component={LoginForm} />
    <Route path='/logout' component={LogoutForm} />
  </div>
)

export default App
