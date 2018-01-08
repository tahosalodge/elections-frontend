import { call, put, takeLatest } from 'redux-saga/effects';
import { apiRequest } from 'redux/helpers/api';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

const initialState = {
  messages: [],
  errors: [],
};

// Reducer
export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        messages: [{ body: 'Signing up...', time: new Date() }],
        errors: [],
      };

    case REGISTER_SUCCESS:
      return {
        errors: [],
        messages: [
          {
            body: `Successfully created account for ${action.response.email}`,
            time: new Date(),
          },
        ],
      };

    case REGISTER_FAILURE:
      return {
        errors: state.errors.concat([
          {
            body: action.error.toString(),
            time: new Date(),
          },
        ]),
        messages: [],
      };

    default:
      return state;
  }
}

// Action
export function registerRequest({
  fname, lname, email, password, chapter,
}) {
  return {
    type: REGISTER_REQUEST,
    fname,
    lname,
    email,
    password,
    chapter,
  };
}

function registerSuccess(response) {
  return {
    type: REGISTER_SUCCESS,
    response,
  };
}

function registerFailure(error) {
  return {
    type: REGISTER_FAILURE,
    error,
  };
}

// Saga
function* registerFlow(action) {
  try {
    const response = yield call(apiRequest, '/auth/register', 'POST', action);
    yield put(registerSuccess(response));
  } catch (error) {
    yield put(registerFailure(error));
  }
}

export function* registerSaga() {
  yield takeLatest(REGISTER_REQUEST, registerFlow);
}
