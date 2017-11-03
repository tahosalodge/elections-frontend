import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import register from './modules/register';
import login from './modules/login';

const rootReducer = combineReducers({
  routerReducer,
  form: reduxFormReducer,
  register,
  login,
});

export default rootReducer;
