import { combineReducers } from 'redux'
import moviesById from './reducers/moviesById'
import listsById from './reducers/listsById'
import auth from './reducers/auth'

export default combineReducers({
  moviesById,
  listsById,
  auth
})
