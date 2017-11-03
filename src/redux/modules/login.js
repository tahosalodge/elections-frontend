import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import handleApiErrors from '../helpers/handleApiErrors';

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  capability: 'loggedOut',
};

// Reducer
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUESTING':
      return {
        ...state,
        requesting: true,
        successful: false,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        requesting: false,
        successful: true,
        token: action.response.token,
        capability: action.response.capability,
      };

    case 'LOGIN_ERROR':
      return {
        ...state,
        errors: state.errors.concat([
          {
            body: action.error.toString(),
            time: new Date(),
          },
        ]),
        requesting: false,
      };

    default:
      return state;
  }
}

// Action
export function loginRequest({ email, password }) {
  return {
    type: 'LOGIN_REQUESTING',
    email,
    password,
  };
}

// API Request
function loginApi(email, password) {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {
      throw error;
    });
}

// Saga
function* loginFlow(action) {
  try {
    const { email, password } = action;
    const response = yield call(loginApi, email, password);
    localStorage.setItem('electionToken', response.token);
    yield put({ type: 'LOGIN_SUCCESS', response });
    yield put(push('/'));
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error });
  }
}

export function* loginSaga() {
  yield takeLatest('LOGIN_REQUESTING', loginFlow);
}
