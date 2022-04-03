import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {MODE} from '@env';
import reducers from 'reducers';

const middleware = MODE === 'DEVELOPMENT' ? [thunk, logger] : [thunk];

let store = createStore(reducers, applyMiddleware(...middleware));

let persistor = persistStore(store);

module.exports = {store, persistor};
