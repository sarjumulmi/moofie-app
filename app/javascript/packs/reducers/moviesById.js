import { ADD_MOVIE, ADD_MOVIES, DELETE_MOVIE } from './../actions/types'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_MOVIE:
      return ({...state, ...action.movie})
    case ADD_MOVIES:
      return ({...action.movies})
    case DELETE_MOVIE:
      const {[action.id]: movieId, ...rest} = state
      return rest
    default:
      return state
  }
}
