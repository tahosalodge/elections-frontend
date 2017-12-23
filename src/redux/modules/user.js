import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { apiRequest } from '../helpers/api';

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
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return {
        ...state,
        requesting: true,
        successful: false,
      };

    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        requesting: false,
        successful: true,
        ...action.response,
      };

    case 'USER_LOGIN_ERROR':
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
    type: 'USER_LOGIN_REQUEST',
    email,
    password,
  };
}

export function userVerifyRequest() {
  return {
    type: 'USER_LOGIN_CHECK_TOKEN',
  };
}

// Saga
function* loginFlow(action) {
  try {
    const { email, password } = action;
    const response = yield call(apiRequest, '/auth/login', 'POST', { email, password });
    localStorage.setItem('electionToken', response.token);
    yield put({ type: 'USER_LOGIN_SUCCESS', response });
    yield put(push('/'));
  } catch (error) {
    yield put({ type: 'USER_LOGIN_ERROR', error });
  }
}

function* checkToken() {
  try {
    if (!localStorage.getItem('electionToken')) {
      throw new Error('No token found.');
    }
    const response = yield call(apiRequest, '/auth/me');
    yield put({ type: 'USER_LOGIN_SUCCESS', response });
  } catch (error) {
    yield put({ type: 'USER_LOGIN_ERROR', error });
    if (error.code !== 'NETWORK') {
      localStorage.removeItem('electionToken');
    }
    if (window.location.pathname !== '/register') {
      yield put(push('/login'));
    }
  }
}

export function* userSaga() {
  yield takeLatest('USER_LOGIN_CHECK_TOKEN', checkToken);
  yield takeLatest('USER_LOGIN_REQUEST', loginFlow);
}
