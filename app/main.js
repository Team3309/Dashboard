import 'styles/common.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Router, Route, Redirect, IndexRoute} from 'react-router'
import {browserHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

require("expose?React!react");

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


const store = createStore(
  combineReducers({
    routing: routerReducer
  })
)
window.store = store;

const history = syncHistoryWithStore(browserHistory, store)

import App from './components/App'
import Dash from './components/Dash'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path="/" component={Dash}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
);
