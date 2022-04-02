import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MODE} from 'react-native-dotenv';
import reducers from '../reducers';

const persistConfig = {
  timeout: 0,
  key: 'assessment-azka',
  storage: AsyncStorage,
};

const reducer = persistReducer(persistConfig, reducers);

const middleware = MODE === 'DEVELOPMENT' ? [logger] : [];

let store = createStore(reducer, applyMiddleware(...middleware));

let persistor = persistStore(store);

module.exports = {store, persistor};
