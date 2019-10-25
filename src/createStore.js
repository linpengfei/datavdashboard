/**
 * @author:lpf
 * @flow
 *
 **/
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import globalReducer from './globalReducer';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState = {}) {
  // Create the store with  middlewares
  // 1. thunkMiddleware: allow writting action creators that return a function instead of an action
  const middleware = [thunkMiddleware];
  const enhancers = [applyMiddleware(...middleware)];
  
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
      : compose;
  
  const store = createStore(
    combineReducers({ global: globalReducer }),
    initialState,
    composeEnhancers(...enhancers)
  );
  
  return store;
}