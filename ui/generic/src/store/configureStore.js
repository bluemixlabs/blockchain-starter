import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/RootReducer'

const loggerMiddleware = createLogger()

/**
Configures the redux store and applies middleware.
**/
export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware, loggerMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

}
