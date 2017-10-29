import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
});
const store = createStore(reducer, composeWithDevTools());

export default store;
