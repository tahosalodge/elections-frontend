import { call, put, takeLatest } from 'redux-saga/effects';
import { schema, normalize } from 'normalizr';
import { push } from 'react-router-redux';
import { apiRequest } from 'redux/helpers/api';
import { addToast } from 'redux/state/toasts';
import { season } from 'constants/values';
import routes from 'constants/routes';

export const NOMINATION_FETCH_REQUEST = 'NOMINATION_FETCH_REQUEST';
export const NOMINATION_FETCH_SUCCESS = 'NOMINATION_FETCH_SUCCESS';
export const NOMINATION_FETCH_FAILURE = 'NOMINATION_FETCH_FAILURE';

export const NOMINATION_CREATE_REQUEST = 'NOMINATION_CREATE_REQUEST';
export const NOMINATION_CREATE_SUCCESS = 'NOMINATION_CREATE_SUCCESS';
export const NOMINATION_CREATE_FAILURE = 'NOMINATION_CREATE_FAILURE';

export const NOMINATION_UPDATE_REQUEST = 'NOMINATION_UPDATE_REQUEST';
export const NOMINATION_UPDATE_SUCCESS = 'NOMINATION_UPDATE_SUCCESS';
export const NOMINATION_UPDATE_FAILURE = 'NOMINATION_UPDATE_FAILURE';

export const NOMINATION_ENTITY = new schema.Entity('nominations', {}, { idAttribute: '_id' });
export const NOMINATION_SCHEMA = [NOMINATION_ENTITY];

const initialState = {
  messages: [],
  errors: [],
  items: {},
};

// Reducer
export default function nominationReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case NOMINATION_FETCH_SUCCESS:
      return {
        ...state,
        items: payload.data.nominations || {},
      };

    case NOMINATION_FETCH_FAILURE:
    case NOMINATION_CREATE_FAILURE:
      return {
        ...state,
        errors: state.errors.concat([
          {
            body: action.error.toString(),
            time: new Date(),
          },
        ]),
      };

    case NOMINATION_CREATE_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [payload.data._id]: payload.data,
        },
      };

    default:
      return state;
  }
}

/**
 * Get all nominations
 * @return {Object} Action
 */
export function fetchCandidates() {
  return {
    type: NOMINATION_FETCH_REQUEST,
  };
}

function nominationFetchSuccess(nominations) {
  return {
    type: NOMINATION_FETCH_SUCCESS,
    payload: {
      data: normalize(nominations, NOMINATION_SCHEMA).entities,
    },
  };
}

function nominationFetchFailure(error) {
  return {
    type: NOMINATION_FETCH_FAILURE,
    error,
  };
}

/**
 * Candidate create action
 * @param  {String} electionId
 * @param  {Object} data       Parameters for nomination
 * @return {Object}            Action
 */
export function createCandidate(electionId, data) {
  return {
    type: NOMINATION_CREATE_REQUEST,
    payload: {
      electionId,
      ...data,
    },
  };
}

function nominationCreateSuccess(nominations) {
  return {
    type: NOMINATION_CREATE_SUCCESS,
    payload: {
      data: normalize(nominations, NOMINATION_SCHEMA).entities,
    },
  };
}

function nominationCreateFailure(error) {
  return {
    type: NOMINATION_FETCH_FAILURE,
    error,
  };
}

/**
 * Candidate update action
 * @param  {String} nominationId
 * @param  {Object} patch       Parameters to update
 * @return {Object}             Action
 */
export function updateCandidate(nominationId, patch) {
  return {
    type: NOMINATION_UPDATE_REQUEST,
    payload: {
      nominationId,
      patch,
    },
  };
}

function nominationUpdateSuccess(nominations) {
  return {
    type: NOMINATION_UPDATE_SUCCESS,
    payload: {
      data: normalize(nominations, NOMINATION_SCHEMA).entities,
    },
  };
}

function nominationUpdateFailure(error) {
  return {
    type: NOMINATION_UPDATE_FAILURE,
    error,
  };
}

// Saga
function* fetchSaga() {
  try {
    const response = yield call(apiRequest, routes.nominations);
    yield put(nominationFetchSuccess(response));
  } catch (error) {
    yield put(nominationFetchFailure(error));
    yield put(addToast(error.message));
  }
}

function* createSaga(action) {
  try {
    const nominationData = {
      ...action.payload,
      status: 'Requested',
      season,
    };
    const nomination = yield call(apiRequest, routes.nominations, 'POST', nominationData);
    yield put(nominationCreateSuccess(nomination));
    yield put(push(`${routes.nominations}/${nomination._id}`));
  } catch (error) {
    yield put(nominationCreateFailure(error));
    yield put(addToast(error.message));
  }
}

function* updateSaga(action) {
  try {
    const { nominationId, patch } = action.payload;
    const unit = yield call(apiRequest, `${routes.nominations}/${nominationId}`, 'PUT', patch);
    yield put(nominationUpdateSuccess(unit));
    yield put(push(`${routes.nominations}/${nominationId}`));
  } catch (error) {
    yield put(nominationUpdateFailure(error));
    yield put(addToast(error.message));
  }
}

export function* nominationSaga() {
  yield takeLatest(NOMINATION_FETCH_REQUEST, fetchSaga);
  yield takeLatest(NOMINATION_CREATE_REQUEST, createSaga);
  yield takeLatest(NOMINATION_UPDATE_REQUEST, updateSaga);
}
