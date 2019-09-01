import {combineReducers} from 'redux';

import books from './books';
import login from './Login';
import Register from './Register';

const rootReducer = combineReducers ({
  books,
  login,
  Register,
});

export default rootReducer;
