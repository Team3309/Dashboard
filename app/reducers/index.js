import { combineReducers } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  routing: routeReducer,
});

export default rootReducer;