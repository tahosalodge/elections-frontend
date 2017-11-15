import { call, put, takeLatest } from 'redux-saga/effects';
import handleApiErrors from '../helpers/handleApiErrors';

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  units: [],
};

// Reducer
export default function unitReducer(state = initialState, action) {
  switch (action.type) {
    case 'UNITS_REQUESTING':
      return {
        ...state,
        requesting: true,
        successful: false,
      };

    case 'UNITS_SUCCESS':
      return {
        ...state,
        requesting: false,
        successful: true,
        units: action.response,
      };

    case 'UNITS_ERROR':
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
export function unitsRequest() {
  return {
    type: 'UNITS_REQUESTING',
  };
}

// API Request
function unitApi() {
  return fetch(`${process.env.REACT_APP_API_URL}/units/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
function* unitFlow() {
  try {
    const response = yield call(unitApi);
    yield put({ type: 'UNITS_SUCCESS', response });
  } catch (error) {
    yield put({ type: 'UNITS_ERROR', error });
  }
}

export function* unitSaga() {
  yield takeLatest('UNITS_REQUESTING', unitFlow);
}
