import fetch from 'isomorphic-fetch'
import {login} from './authActions'

export function userSignupRequest (userData) {
  return (dispatch) => {
    const request = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({user: userData})
    }
    return fetch('/api/signup', request)
      .then((response) => {
        if (response.ok) {
          const auth = {
            identifier: userData.username,
            password: userData.password
          }
          dispatch(login(auth))
        }
        return response
      })
  }
}
