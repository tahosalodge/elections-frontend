import { call, put, takeLatest } from 'redux-saga/effects';
import { schema, normalize } from 'normalizr';
import { push } from 'react-router-redux';
import { apiRequest } from 'redux/helpers/api';
import { addToast } from 'redux/state/toasts';

export const UNIT_FETCH_REQUEST = 'UNIT_FETCH_REQUEST';
export const UNIT_FETCH_SUCCESS = 'UNIT_FETCH_SUCCESS';
export const UNIT_FETCH_FAILURE = 'UNIT_FETCH_FAILURE';

export const UNIT_GET_REQUEST = 'UNIT_GET_REQUEST';
export const UNIT_GET_SUCCESS = 'UNIT_GET_SUCCESS';
export const UNIT_GET_FAILURE = 'UNIT_GET_FAILURE';

export const UNIT_UPDATE_REQUEST = 'UNIT_UPDATE_REQUEST';
export const UNIT_UPDATE_SUCCESS = 'UNIT_UPDATE_SUCCESS';
export const UNIT_UPDATE_FAILURE = 'UNIT_UPDATE_FAILURE';

export const UNIT_CREATE_REQUEST = 'UNIT_CREATE_REQUEST';
export const UNIT_CREATE_SUCCESS = 'UNIT_CREATE_SUCCESS';
export const UNIT_CREATE_FAILURE = 'UNIT_CREATE_FAILURE';

export const UNIT_ENTITY = new schema.Entity('units', {}, { idAttribute: '_id' });
export const UNIT_SCHEMA = [UNIT_ENTITY];

const initialState = {
  messages: [],
  errors: [],
  items: {},
};

// Reducer
export default function unitReducer(state = initialState, action) {
  const { type, payload, error } = action;
  switch (type) {
    case UNIT_FETCH_SUCCESS:
      return {
        ...state,
        items: payload.data.units || {},
      };

    case UNIT_UPDATE_SUCCESS:
    case UNIT_GET_SUCCESS:
    case UNIT_CREATE_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [payload.data._id]: payload.data,
        },
      };

    case UNIT_FETCH_FAILURE:
    case UNIT_GET_FAILURE:
    case UNIT_UPDATE_FAILURE:
      return {
        ...state,
        errors: state.errors.concat([
          {
            body: error.toString(),
            time: new Date(),
          },
        ]),
      };

    default:
      return state;
  }
}

/**
 * UNIT_FETCH Actions
 */
export function unitsRequest() {
  return {
    type: UNIT_FETCH_REQUEST,
  };
}

function fetchSuccess(units) {
  return {
    type: UNIT_FETCH_SUCCESS,
    payload: {
      data: normalize(units, UNIT_SCHEMA).entities,
    },
  };
}

function fetchFailure(error) {
  return {
    type: UNIT_FETCH_FAILURE,
    error,
  };
}

/**
 * UNIT_GET Actions
 */

export function unitRequest(unitId) {
  return {
    type: UNIT_GET_REQUEST,
    payload: {
      unitId,
    },
  };
}

function getSuccess(unit) {
  return {
    type: UNIT_GET_SUCCESS,
    payload: {
      data: unit,
    },
  };
}

function getFailure(error) {
  return {
    type: UNIT_GET_SUCCESS,
    error,
  };
}

/**
 * UNIT_UPDATE Actions
 */

export function updateRequest(unitId, data) {
  return {
    type: UNIT_UPDATE_REQUEST,
    payload: {
      unitId,
      data,
    },
  };
}

function updateSuccess(unit) {
  return {
    type: UNIT_UPDATE_SUCCESS,
    payload: {
      data: unit,
    },
  };
}

function updateFailure(error) {
  return {
    type: UNIT_UPDATE_SUCCESS,
    error,
  };
}

/**
 * UNIT_CREATE Actions
 */

export function createRequest(data) {
  return {
    type: UNIT_CREATE_REQUEST,
    payload: {
      data,
    },
  };
}

function createSuccess(unit) {
  return {
    type: UNIT_CREATE_SUCCESS,
    payload: {
      data: unit,
    },
  };
}

function createFailure(error) {
  return {
    type: UNIT_CREATE_FAILURE,
    error,
  };
}

// Saga
function* fetchUnits() {
  try {
    const units = yield call(apiRequest, '/units');
    yield put(fetchSuccess(units));
  } catch (error) {
    yield put(fetchFailure(error));
    yield put(addToast(error.message));
  }
}

function* getUnit(action) {
  try {
    const { unitId } = action.payload;
    const unit = yield call(apiRequest, `/units/${unitId}`);
    yield put(getSuccess(unit));
  } catch (error) {
    yield put(getFailure(error));
    yield put(addToast(error.message));
  }
}

function* updateUnit(action) {
  try {
    const { unitId, data } = action.payload;
    const unit = yield call(apiRequest, `/units/${unitId}`, 'PUT', data);
    yield put(updateSuccess(unit));
    yield put(push(`/units/${unitId}`));
  } catch (error) {
    yield put(updateFailure(error));
    yield put(addToast(error.message));
  }
}

function* createUnit(action) {
  try {
    const { data } = action.payload;
    const unit = yield call(apiRequest, '/units/', 'POST', data);
    yield put(createSuccess(unit));
    yield put(push(`/units/${unit._id}`));
  } catch (error) {
    yield put(createFailure(error));
    yield put(addToast(error.message));
  }
}

export function* unitSaga() {
  yield takeLatest(UNIT_FETCH_REQUEST, fetchUnits);
  yield takeLatest(UNIT_GET_REQUEST, getUnit);
  yield takeLatest(UNIT_UPDATE_REQUEST, updateUnit);
  yield takeLatest(UNIT_CREATE_REQUEST, createUnit);
}
