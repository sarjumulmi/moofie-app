import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './views/home/'
import Navbar from './views/navbar/'
import SignupForm from './views/signup'
import LoginForm from './views/login'
import LogoutForm from './views/logout'

const App = () => (
  <div>
    <Navbar />
    <Switch>
      <Route path='/signup' component={SignupForm} />
      <Route path='/login' component={LoginForm} />
      <Route path='/logout' component={LogoutForm} />
      <Route path='/movies' component={Home} />
      <Route path='/' render={() => (
        <Redirect to='/movies' />
        )} />
    </Switch>
  </div>
)

export default App
