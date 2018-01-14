import axios from 'axios'
import posterPath from './public/images/default-pic.jpg'

export const MOVIE_DB_BASE_URL_MOVIE = 'https://api.themoviedb.org/3/search/movie?api_key='
export const MOVIE_DB_DETAIL_URL = 'https://api.themoviedb.org/3/movie/'
export const MOVIE_DB_POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w92'

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

export function formatMovies (results) {
  let formattedMovies = {}
  results.forEach(result => {
    let movie = result.data
    formattedMovies[movie.id] = {
      title: movie.title,
      tagline: movie.tagline,
      url: movie.homepage,
      poster_path: movie.poster_path ? `${MOVIE_DB_POSTER_BASE_URL}${movie.poster_path}` : `${posterPath}`,
      rating: movie.vote_average,
      genres: getInnerProperties(movie, 'genres', ' | '),
      overview: movie.overview,
      release_year: movie.release_date.slice(0, 4) || 'Unreleased',
      production_companies: getInnerProperties(movie, 'production_companies', '/'),
      runtime: `${movie.runtime} mins`
    }
  }
  )
  return formattedMovies
}

function getInnerProperties (movie, property, separator) {
  return (movie[property].map(property => property.name).join(separator) || 'Not found')
}

export function formatMovieinDB (movie) {
  return ({
    [movie.id]: {
      ext_id: movie.ext_id,
      title: movie.title,
      tagline: movie.tagline,
      url: movie.url,
      poster_path: movie.poster_path,
      rating: movie.rating,
      genres: movie.genres,
      overview: movie.overview,
      release_year: movie.release_year,
      production_companies: movie.production_companies,
      runtime: movie.runtime
    }
  })
}
