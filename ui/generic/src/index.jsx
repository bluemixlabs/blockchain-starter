import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App.jsx'
import 'babel-polyfill'
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './store/configureStore.js'

require('isomorphic-fetch');

//This plugin is required for material-ui. Without it, clicking on the interface will not work.
injectTapEventPlugin();

let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
