import axios from 'axios'
import { MOVIE_DB_BASE_URL_MOVIE, MOVIE_DB_DETAIL_URL, formatMovies } from './../client'

export function getMovies (queryTerm) {
  return (dispatch) => {
    const url = `${MOVIE_DB_BASE_URL_MOVIE}${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${queryTerm}`
    return axios.get(encodeURI(url))
      .then(resp => {
        if (resp.status !== 200) {
          throw Error(resp)
        }
        const results = resp.data.results.map(result => ({key: result.id, title: result.title, release_date: result.release_date}))
        return (results)
      }
    )
    .catch(err => {
      console.log(err)
    }
    )
  }
}

export function getMovieDetails (queryTerm) {
  return (dispatch) => {
    return dispatch(getMovies(queryTerm)).then(results => {
      let promises = []
      results.forEach(result => {
        let url = `${MOVIE_DB_DETAIL_URL}${result.key}?api_key=${process.env.MOVIE_DB_API_KEY}`
        delete axios.defaults.headers.common['Authorization']
        promises.push(axios.get(encodeURI(url)))
      })
      return axios.all(promises).then(results => {
        return formatMovies(results)
      })
    })
  }
}
