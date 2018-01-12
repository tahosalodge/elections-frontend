import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { apiRequest } from 'redux/helpers/api';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_CHECK_TOKEN = 'USER_LOGIN_CHECK_TOKEN';

const initialState = {
  messages: [],
  errors: [],
  capability: 'loggedOut',
  chapter: null,
  unit: null,
};

// Reducer
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.response,
      };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        errors: [
          ...state.errors,
          {
            body: action.error.message,
            time: new Date(),
          },
        ],
      };

    default:
      return state;
  }
}

// Action
export function loginRequest({ email, password }) {
  return {
    type: USER_LOGIN_REQUEST,
    email,
    password,
  };
}

export function userVerifyRequest() {
  return {
    type: USER_LOGIN_CHECK_TOKEN,
  };
}

function loginSuccess(response) {
  return {
    type: USER_LOGIN_SUCCESS,
    response,
  };
}

function loginFailure(error) {
  return {
    type: USER_LOGIN_FAILURE,
    error,
  };
}

// Saga
function* loginFlow(action) {
  try {
    const { email, password } = action;
    const response = yield call(apiRequest, '/auth/login', 'POST', { email, password });
    localStorage.setItem('electionToken', response.token);
    yield put(loginSuccess(response));
    yield put(push('/'));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* checkToken() {
  try {
    if (!localStorage.getItem('electionToken')) {
      throw new Error('No token found.');
    }
    const response = yield call(apiRequest, '/auth/me');
    yield put(loginSuccess(response));
  } catch (error) {
    if (error.code !== 'NETWORK') {
      localStorage.removeItem('electionToken');
    }
    const { pathname } = window.location;
    if (pathname !== '/register' && pathname !== '/') {
      yield put(push('/login'));
    }
  }
}

export function* userSaga() {
  yield takeLatest(USER_LOGIN_CHECK_TOKEN, checkToken);
  yield takeLatest(USER_LOGIN_REQUEST, loginFlow);
}
