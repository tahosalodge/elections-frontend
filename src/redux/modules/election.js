import { call, put, takeLatest } from 'redux-saga/effects';
import { schema, normalize } from 'normalizr';
import { apiRequest } from '../helpers/api';

export const UNIT_ENTITY = new schema.Entity('elections', {}, { idAttribute: '_id' });
export const UNIT_SCHEMA = [UNIT_ENTITY];

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  items: {},
};

// Reducer
export default function electionReducer(state = initialState, action) {
  switch (action.type) {
    case 'ELECTIONS_REQUESTING':
      return {
        ...state,
        requesting: true,
        successful: false,
      };

    case 'ELECTIONS_SUCCESS':
      return {
        ...state,
        requesting: false,
        successful: true,
        items: action.payload.data.elections,
      };

    case 'ELECTIONS_ERROR':
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
export function electionsRequest() {
  return {
    type: 'ELECTIONS_REQUESTING',
  };
}

function electionsSuccess(units) {
  return {
    type: 'ELECTIONS_SUCCESS',
    payload: {
      data: normalize(units, UNIT_SCHEMA).entities,
    },
  };
}

// Saga
function* electionFlow() {
  try {
    const response = yield call(apiRequest, '/elections');
    yield put(electionsSuccess(response));
  } catch (error) {
    yield put({ type: 'ELECTIONS_ERROR', error });
  }
}

export function* electionSaga() {
  yield takeLatest('ELECTIONS_REQUESTING', electionFlow);
}
