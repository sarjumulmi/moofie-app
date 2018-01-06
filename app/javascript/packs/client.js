import axios from 'axios'

export const MOVIE_DB_BASE_URL_MOVIE = 'https://api.themoviedb.org/3/search/movie?api_key='

export const MOVIE_DB_POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w92'

// export const MOVIE_DB_POSTER_SIZES = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']

export function handleError (response) {
  if (!response.ok) {
    throw response
  }
  return response.json()
}

export function setErrors (errMsg) {
  const errors = {}
  const messages = errMsg.errors.messages
  for (var key in messages) {
    if (messages.hasOwnProperty(key)) {
      errors[key] = messages[key] ? `${key} ${messages[key].join(' ')}` : undefined
    }
  }
  return errors
}

export function formatErrorMessages (errors) {
  const errorMessage = Object.values(errors).map(msg => msg).join('. ')
  return errorMessage
}

export function setAuthorizationToken (token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export function formatMovies (movieResults) {
  let formattedMovies = {}
  movieResults.forEach(movie => {
    formattedMovies[movie.id] = {
      title: movie.title,
      poster_path: `${MOVIE_DB_POSTER_BASE_URL}${movie.poster_path}`,
      rating: movie.vote_average
    }
  })
  return formattedMovies
}
