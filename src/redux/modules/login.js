import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import handleApiErrors from '../helpers/handleApiErrors';

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  capability: 'loggedOut',
  chapter: null,
  unit: null,
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
        chapter: action.response.chapter,
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

export function loginVerifyRequest() {
  return {
    type: 'LOGIN_CHECK_TOKEN',
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

function tokenVerify(token) {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

function* checkToken() {
  try {
    const token = localStorage.getItem('electionToken');
    const response = yield call(tokenVerify, token);
    yield put({ type: 'LOGIN_SUCCESS', response });
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error });
  }
}

export function* loginSaga() {
  yield takeLatest('LOGIN_CHECK_TOKEN', checkToken);
  yield takeLatest('LOGIN_REQUESTING', loginFlow);
}
