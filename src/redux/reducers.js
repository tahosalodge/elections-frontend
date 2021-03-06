import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import register from 'redux/state/register';
import user from 'redux/state/user';
import unit from 'redux/state/unit';
import election from 'redux/state/election';
import loading from 'redux/state/loading';
import toasts from 'redux/state/toasts';
import candidate from 'redux/state/candidate';
import nomination from 'redux/state/nomination';

const rootReducer = combineReducers({
  election,
  form: reduxFormReducer,
  routerReducer,
  loading,
  register,
  toasts,
  unit,
  user,
  candidate,
  nomination,
});

export default rootReducer;
