import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import handleApiErrors from '../helpers/handleApiErrors';

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
};

// Reducer
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUESTING':
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Signing up...', time: new Date() }],
        errors: [],
      };

    case 'LOGIN_SUCCESS':
      return {
        errors: [],
        requesting: false,
        successful: true,
        token: action.response.token,
      };

    case 'LOGIN_ERROR':
      return {
        errors: state.errors.concat([
          {
            body: action.error.toString(),
            time: new Date(),
          },
        ]),
        messages: [],
        requesting: false,
        successful: false,
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
