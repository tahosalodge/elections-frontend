import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import register from './modules/register';
import user from './modules/user';
import unit from './modules/unit';
import election from './modules/election';

const rootReducer = combineReducers({
  routerReducer,
  form: reduxFormReducer,
  register,
  user,
  unit,
  election,
});

export default rootReducer;
