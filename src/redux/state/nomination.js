import { call, put, takeLatest } from 'redux-saga/effects';
import { schema, normalize } from 'normalizr';
import { push } from 'react-router-redux';
import apiRequest from 'redux/helpers/api';
import { addToast } from 'redux/state/toasts';
import routes from 'constants/routes';

export const NOMINATION_FETCH_REQUEST = 'NOMINATION_FETCH_REQUEST';
export const NOMINATION_FETCH_SUCCESS = 'NOMINATION_FETCH_SUCCESS';
export const NOMINATION_FETCH_FAILURE = 'NOMINATION_FETCH_FAILURE';

export const NOMINATION_GET_REQUEST = 'NOMINATION_GET_REQUEST';
export const NOMINATION_GET_SUCCESS = 'NOMINATION_GET_SUCCESS';
export const NOMINATION_GET_FAILURE = 'NOMINATION_GET_FAILURE';

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

    case NOMINATION_GET_SUCCESS:
    case NOMINATION_UPDATE_SUCCESS:
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
export function fetchNominations(electionId) {
  return {
    type: NOMINATION_FETCH_REQUEST,
    payload: { electionId },
  };
}

export function nominationFetchSuccess(nominations) {
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
 * Nomination create action
 * @param  {String} electionId
 * @param  {Object} data       Parameters for nomination
 * @return {Object}            Action
 */
export function createNomination(electionId, data) {
  return {
    type: NOMINATION_CREATE_REQUEST,
    payload: {
      electionId,
      ...data,
    },
  };
}

function nominationCreateSuccess(nomination) {
  return {
    type: NOMINATION_CREATE_SUCCESS,
    payload: {
      data: nomination,
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
 * Nomination update action
 * @param  {String} nominationId
 * @param  {Object} patch       Parameters to update
 * @return {Object}             Action
 */
export function updateNomination(nominationId, patch) {
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

/**
 * Nomination get action
 * @param  {String} nominationId
 * @return {Object}             Action
 */
export function getNomination(nominationId) {
  return {
    type: NOMINATION_GET_REQUEST,
    payload: {
      nominationId,
    },
  };
}

function nominationGetSuccess(nomination) {
  return {
    type: NOMINATION_GET_SUCCESS,
    payload: {
      data: nomination,
    },
  };
}

function nominationGetFailure(error) {
  return {
    type: NOMINATION_GET_FAILURE,
    error,
  };
}

// Saga
function* fetchSaga(action) {
  const { payload: { electionId } } = action;
  try {
    const response = yield call(apiRequest, `${routes.nominations}/?electionId=${electionId}`);
    yield put(nominationFetchSuccess(response));
  } catch (error) {
    yield put(nominationFetchFailure(error));
    yield put(addToast(error.message));
  }
}

function* getSaga(action) {
  const { payload: { nominationId } } = action;
  try {
    const nomination = yield call(apiRequest, `${routes.nominations}/${nominationId}`);
    yield put(nominationGetSuccess(nomination));
  } catch (error) {
    yield put(nominationGetFailure(error));
    yield put(addToast(error.message, { sticky: true }));
  }
}

function* createSaga(action) {
  const { payload } = action;
  try {
    const nominationData = {
      ...payload,
      status: 'Pending Approval',
    };
    const nomination = yield call(apiRequest, routes.nominations, 'POST', nominationData);
    yield put(nominationCreateSuccess(nomination));
    yield put(push(`${routes.elections}/${nomination.electionId}/nomination`));
    yield put(addToast(`Created nomination ${nomination.fname} ${nomination.lname} successfully.`));
  } catch (error) {
    yield put(nominationCreateFailure(error));
    yield put(addToast(error.message, { sticky: true }));
  }
}

function* updateSaga(action) {
  try {
    const { nominationId, patch } = action.payload;
    const nomination = yield call(
      apiRequest,
      `${routes.nominations}/${nominationId}`,
      'PUT',
      patch,
    );
    yield put(nominationUpdateSuccess(nomination));
    yield put(push(`${routes.nominations}/${nominationId}`));
    yield put(addToast(`Updated nomination ${nomination.fname} ${nomination.lname} successfully.`));
  } catch (error) {
    yield put(nominationUpdateFailure(error));
    yield put(addToast(error.message, { sticky: true }));
  }
}

export function* nominationSaga() {
  yield takeLatest(NOMINATION_FETCH_REQUEST, fetchSaga);
  yield takeLatest(NOMINATION_CREATE_REQUEST, createSaga);
  yield takeLatest(NOMINATION_UPDATE_REQUEST, updateSaga);
  yield takeLatest(NOMINATION_GET_REQUEST, getSaga);
}
