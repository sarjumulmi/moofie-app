import { combineReducers } from 'redux'
import moviesById from './reducers/moviesById'
import auth from './reducers/auth'

export default combineReducers({
  moviesById,
  auth
})
