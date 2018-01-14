import { ADD_MOVIE, ADD_MOVIES } from './../actions/types'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_MOVIE:
      return ({...state, ...action.movie})
    case ADD_MOVIES:
      return ({...action.movies})
    default:
      return state
  }
}
