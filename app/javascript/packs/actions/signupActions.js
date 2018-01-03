import fetch from 'isomorphic-fetch'

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
  }
}
