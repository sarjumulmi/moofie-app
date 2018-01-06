import axios from 'axios'
import { MOVIE_DB_BASE_URL_MOVIE, formatMovies } from './../client'

export function getMovies (queryTerm) {
  return (dispatch) => {
    const url = `${MOVIE_DB_BASE_URL_MOVIE}${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${queryTerm}`
    return axios.get(url).then(resp => {
      return formatMovies(resp.data.results)
    })
  }
}
