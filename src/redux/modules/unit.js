import { call, put, takeLatest } from 'redux-saga/effects';
import { schema, normalize } from 'normalizr';
import { apiRequest } from '../helpers/api';

export const UNIT_ENTITY = new schema.Entity('units', {}, { idAttribute: '_id' });
export const UNIT_SCHEMA = [UNIT_ENTITY];

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  items: [],
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
        items: action.payload.data.units,
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

function unitsSuccess(units) {
  return {
    type: 'UNITS_SUCCESS',
    payload: {
      data: normalize(units, UNIT_SCHEMA).entities,
    },
  };
}

// Saga
function* unitFlow() {
  try {
    const units = yield call(apiRequest, '/units');
    yield put(unitsSuccess(units));
  } catch (error) {
    yield put({ type: 'UNITS_ERROR', error });
  }
}

export function* unitSaga() {
  yield takeLatest('UNITS_REQUESTING', unitFlow);
}
