import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import register from 'redux/state/register';
import user from 'redux/state/user';
import unit from 'redux/state/unit';
import election from 'redux/state/election';
import loading from 'redux/state/loading';

const rootReducer = combineReducers({
  routerReducer,
  form: reduxFormReducer,
  register,
  user,
  unit,
  election,
  loading,
});

export default rootReducer;
