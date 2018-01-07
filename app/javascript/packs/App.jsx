import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './views/home/'
import Navbar from './views/navbar/'
import SignupForm from './views/signup'
import LoginForm from './views/login'
import LogoutForm from './views/logout'
import { Header } from 'semantic-ui-react'

const App = () => (
  <div>
    <Navbar />
    <Switch>
      <Route path='/signup' component={SignupForm} />
      <Route path='/login' component={LoginForm} />
      <Route path='/logout' component={LogoutForm} />
      <Route path='/movies' component={Home} />
      <Route exact path='/' render={() => (
        <Redirect to='/movies' />
        )} />
      <Route render={({location}) => (
        <Header as='h2' style={{margin: '0 0 0 20px'}} textAlign='center' color='red'>
          Oooops!!! Nothing here. Gone Fishing!!!
        </Header>
        )} />
    </Switch>
  </div>
)

export default App
