import axios from 'axios'
import { ADD_MOVIE, ADD_MOVIES } from './types'
import { setAuthorizationToken, formatMovieinDB } from './../client'

export function addMovies (movies) {
  return ({
    type: ADD_MOVIES,
    movies: movies
  })
}

export function fetchMovies () {
  setAuthorizationToken(window.localStorage.jwt)
  return (dispatch) => {
    return axios.get('/api/movies').then(response => {
      dispatch(addMovies(response.data))
      return response.data
    })
  }
}

export function addMovie (movie) {
  return ({
    type: ADD_MOVIE,
    movie: movie
  })
}

export function postMovie (movie) {
  setAuthorizationToken(window.localStorage.jwt)
  return (dispatch) => {
    return axios({
      method: 'post',
      url: '/api/movies',
      data: {
        movie: movie
      }
    }).then(response => {
      dispatch(addMovie(formatMovieinDB(response.data)))
      return response.data
    }
    )
  }
}
