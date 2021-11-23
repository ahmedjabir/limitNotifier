import { applyMiddleware, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';

import reducers from './reducers';

const middlewares = [
  thunk,
];

// Apply logger if we are in debug mode.
if (__DEV__) {
  middlewares.push(logger);
}

const persistConfig = {
  key: 'root',
  blacklist: [],
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(thunk ,logger) );

export default store;
