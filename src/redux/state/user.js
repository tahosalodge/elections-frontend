import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { apiRequest } from 'redux/helpers/api';
import { addToast } from 'redux/state/toasts';

const { Raven } = window;

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_CHECK_TOKEN = 'USER_LOGIN_CHECK_TOKEN';
export const USER_LOGOUT = 'USER_LOGOUT';

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

    case USER_LOGOUT:
      return initialState;

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

export function userLogoutRequest() {
  return {
    type: USER_LOGOUT,
  };
}

// Saga
function* login(action) {
  try {
    const { email, password } = action;
    const response = yield call(apiRequest, '/auth/login', 'POST', { email, password });
    localStorage.setItem('electionToken', response.token);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error));
    yield put(addToast(error.message, { sticky: true }));
  }
}

function* checkToken() {
  const { pathname } = window.location;
  try {
    if (pathname === '/logout') {
      return;
    }
    if (!localStorage.getItem('electionToken')) {
      throw new Error('No token found.');
    }
    const response = yield call(apiRequest, '/auth/me');
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error));
    if (error.code !== 'NETWORK') {
      localStorage.removeItem('electionToken');
    }
    if (pathname.indexOf('register') === -1 && pathname !== '/') {
      yield put(push('/login'));
    }
  }
}

function* logout() {
  localStorage.removeItem('electionToken');
  yield put(push('/login'));
  yield put(addToast('Logged out successfully.'));
}

function* loginRedirect(action) {
  const { capability, unit } = action.response;
  try {
    if (capability === 'unit') {
      yield put(push(`/units/${unit}`));
    } else {
      yield put(push('/election-list'));
    }
  } catch (error) {
    yield put(addToast(error.message), { sticky: true });
  }
}

function sentryUserContext(action) {
  const { response: { token, ...response } } = action;
  Raven.setUserContext({
    ...response,
  });
}

export function* userSaga() {
  yield takeLatest(USER_LOGOUT, logout);
  yield takeLatest(USER_LOGIN_CHECK_TOKEN, checkToken);
  yield takeLatest(USER_LOGIN_REQUEST, login);
  yield takeLatest(USER_LOGIN_SUCCESS, loginRedirect);
  yield takeLatest(USER_LOGIN_SUCCESS, sentryUserContext);
}
