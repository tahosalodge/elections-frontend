import { call, put, takeLatest } from 'redux-saga/effects';
import { schema, normalize } from 'normalizr';
import { push } from 'react-router-redux';
import { apiRequest } from '../helpers/api';

export const UNIT_ENTITY = new schema.Entity('units', {}, { idAttribute: '_id' });
export const UNIT_SCHEMA = [UNIT_ENTITY];

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  items: {},
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

    case 'UNIT_REQUESTING':
      return {
        ...state,
        requesting: true,
        successful: false,
      };

    case 'UNIT_UPDATE_REQUESTING':
      return {
        ...state,
        requesting: true,
        successful: false,
      };

    case 'UNIT_SUCCESS':
      return {
        ...state,
        requesting: false,
        successful: true,
        items: {
          ...state.items,
          [action.payload.data._id]: action.payload.data,
        },
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

function unitsError(error) {
  return {
    type: 'UNITS_ERROR',
    error,
  };
}

export function unitRequest(unitId) {
  return {
    type: 'UNIT_REQUESTING',
    payload: {
      unitId,
    },
  };
}

function unitSuccess(unit) {
  return {
    type: 'UNIT_SUCCESS',
    payload: {
      data: unit,
    },
  };
}

export function unitUpdateRequest(unitId, data) {
  return {
    type: 'UNIT_UPDATE_REQUESTING',
    payload: {
      unitId,
      data,
    },
  };
}

// Saga
function* getUnits() {
  try {
    const units = yield call(apiRequest, '/units');
    yield put(unitsSuccess(units));
  } catch (error) {
    yield put(unitsError(error));
  }
}

function* getUnit(action) {
  try {
    const { unitId } = action.payload;
    const unit = yield call(apiRequest, `/units/${unitId}`);
    yield put(unitSuccess(unit[0]));
  } catch (error) {
    yield put(unitsError(error));
  }
}

function* updateUnit(action) {
  try {
    const { unitId, data } = action.payload;
    const unit = yield call(apiRequest, `/units/${unitId}`, 'PUT', data);
    yield put(unitSuccess(unit));
    yield put(push(`/units/${unitId}`));
  } catch (error) {
    yield put(unitsError(error));
  }
}

export function* unitSaga() {
  yield takeLatest('UNITS_REQUESTING', getUnits);
  yield takeLatest('UNIT_REQUESTING', getUnit);
  yield takeLatest('UNIT_UPDATE_REQUESTING', updateUnit);
}
