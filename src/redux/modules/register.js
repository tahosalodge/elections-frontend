import { call, put, takeLatest } from 'redux-saga/effects';
import handleApiErrors from '../helpers/handleApiErrors';

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
};

// Reducer
export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case 'REGISTER_REQUESTING':
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Signing up...', time: new Date() }],
        errors: [],
      };

    case 'REGISTER_SUCCESS':
      return {
        errors: [],
        messages: [
          {
            body: `Successfully created account for ${action.response.email}`,
            time: new Date(),
          },
        ],
        requesting: false,
        successful: true,
      };

    case 'REGISTER_ERROR':
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
export function registerRequest({
  fname, lname, email, password, chapter,
}) {
  return {
    type: 'REGISTER_REQUESTING',
    fname,
    lname,
    email,
    password,
    chapter,
  };
}

// API Request
function registerApi(fname, lname, email, password, chapter, capabilities = ['unit']) {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fname,
      lname,
      email,
      password,
      chapter,
      capabilities,
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
function* registerFlow(action) {
  try {
    const {
      fname, lname, email, password, chapter,
    } = action;
    const response = yield call(registerApi, fname, lname, email, password, chapter);
    yield put({ type: 'REGISTER_SUCCESS', response });
  } catch (error) {
    yield put({ type: 'REGISTER_ERROR', error });
  }
}

export function* registerSaga() {
  yield takeLatest('REGISTER_REQUESTING', registerFlow);
}
