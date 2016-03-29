import { combineReducers } from 'redux'
import { reducer as todos } from '../purified'

const rootReducer = combineReducers({
  todos
})

export default rootReducer
