// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import rootReducer from './rootReducer'
import { setAuthorizationToken } from './client'
import { setCurrentUser } from './actions/authActions'
import jwt from 'jsonwebtoken'
import App from './App'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

if (window.localStorage.jwt) {
  setAuthorizationToken(window.localStorage.jwt)
  store.dispatch(setCurrentUser(jwt.decode(window.localStorage.jwt)))
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
})
