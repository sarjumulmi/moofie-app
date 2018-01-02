import React from 'react'
import { Route } from 'react-router-dom'
import Home from './views/home/'
import Navbar from './views/navbar/'

const App = () => (
  <div>
    <Navbar />
    <Route exact path='/' component={Home} />
  </div>
)

export default App
