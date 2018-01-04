import axios from 'axios'
import jwt from 'jsonwebtoken'
import { setAuthorizationToken } from './../client'
import { SET_CURRENT_USER } from './types'

export function setCurrentUser (user) {
  return {
    type: SET_CURRENT_USER,
    user: user
  }
}

export function login (authData) {
  return (dispatch) => {
    const data = {auth: authData}
    return axios.post('/api/user_token', data).then(resp => {
      const token = resp.data.jwt
      window.localStorage.setItem('jwt', token)
      setAuthorizationToken(token)
      dispatch(setCurrentUser(jwt.decode(token)))
    })
  }
}
