import {combineReducers} from 'redux';
import {homeReducer} from './homeReducer';
import favReducer from './favReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  homeReducer: homeReducer,
  favReducer: persistReducer(persistConfig, favReducer),
});

export default reducer;
