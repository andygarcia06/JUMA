import { createStore, combineReducers } from 'redux';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
