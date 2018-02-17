import { call, put, takeLatest } from 'redux-saga/effects';
import { schema, normalize } from 'normalizr';
import { push } from 'react-router-redux';
import apiRequest from 'redux/helpers/api';
import { addToast } from 'redux/state/toasts';
import routes from 'constants/routes';

export const CANDIDATE_FETCH_REQUEST = 'CANDIDATE_FETCH_REQUEST';
export const CANDIDATE_FETCH_SUCCESS = 'CANDIDATE_FETCH_SUCCESS';
export const CANDIDATE_FETCH_FAILURE = 'CANDIDATE_FETCH_FAILURE';

export const CANDIDATE_GET_REQUEST = 'CANDIDATE_GET_REQUEST';
export const CANDIDATE_GET_SUCCESS = 'CANDIDATE_GET_SUCCESS';
export const CANDIDATE_GET_FAILURE = 'CANDIDATE_GET_FAILURE';

export const CANDIDATE_CREATE_REQUEST = 'CANDIDATE_CREATE_REQUEST';
export const CANDIDATE_CREATE_SUCCESS = 'CANDIDATE_CREATE_SUCCESS';
export const CANDIDATE_CREATE_FAILURE = 'CANDIDATE_CREATE_FAILURE';

export const CANDIDATE_UPDATE_REQUEST = 'CANDIDATE_UPDATE_REQUEST';
export const CANDIDATE_UPDATE_SUCCESS = 'CANDIDATE_UPDATE_SUCCESS';
export const CANDIDATE_UPDATE_FAILURE = 'CANDIDATE_UPDATE_FAILURE';

export const CANDIDATE_ENTITY = new schema.Entity('candidates', {}, { idAttribute: '_id' });
export const CANDIDATE_SCHEMA = [CANDIDATE_ENTITY];

const initialState = {
  messages: [],
  errors: [],
  items: {},
};

// Reducer
export default function candidateReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CANDIDATE_FETCH_SUCCESS:
      return {
        ...state,
        items: payload.data.candidates || {},
      };

    case CANDIDATE_FETCH_FAILURE:
    case CANDIDATE_CREATE_FAILURE:
      return {
        ...state,
        errors: state.errors.concat([
          {
            body: action.error.toString(),
            time: new Date(),
          },
        ]),
      };

    case CANDIDATE_GET_SUCCESS:
    case CANDIDATE_UPDATE_SUCCESS:
    case CANDIDATE_CREATE_SUCCESS:
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
 * Get all candidates
 * @return {Object} Action
 */
export function fetchCandidates(electionId) {
  return {
    type: CANDIDATE_FETCH_REQUEST,
    payload: { electionId },
  };
}

export function candidateFetchSuccess(candidates) {
  return {
    type: CANDIDATE_FETCH_SUCCESS,
    payload: {
      data: normalize(candidates, CANDIDATE_SCHEMA).entities,
    },
  };
}

function candidateFetchFailure(error) {
  return {
    type: CANDIDATE_FETCH_FAILURE,
    error,
  };
}

/**
 * Candidate create action
 * @param  {String} electionId
 * @param  {Object} data       Parameters for candidate
 * @return {Object}            Action
 */
export function createCandidate(electionId, data) {
  return {
    type: CANDIDATE_CREATE_REQUEST,
    payload: {
      electionId,
      ...data,
    },
  };
}

function candidateCreateSuccess(candidate) {
  return {
    type: CANDIDATE_CREATE_SUCCESS,
    payload: {
      data: candidate,
    },
  };
}

function candidateCreateFailure(error) {
  return {
    type: CANDIDATE_FETCH_FAILURE,
    error,
  };
}

/**
 * Candidate update action
 * @param  {String} candidateId
 * @param  {Object} patch       Parameters to update
 * @return {Object}             Action
 */
export function updateCandidate(candidateId, patch) {
  return {
    type: CANDIDATE_UPDATE_REQUEST,
    payload: {
      candidateId,
      patch,
    },
  };
}

function candidateUpdateSuccess(candidates) {
  return {
    type: CANDIDATE_UPDATE_SUCCESS,
    payload: {
      data: normalize(candidates, CANDIDATE_SCHEMA).entities,
    },
  };
}

function candidateUpdateFailure(error) {
  return {
    type: CANDIDATE_UPDATE_FAILURE,
    error,
  };
}

/**
 * Candidate get action
 * @param  {String} candidateId
 * @return {Object}             Action
 */
export function getCandidate(candidateId) {
  return {
    type: CANDIDATE_GET_REQUEST,
    payload: {
      candidateId,
    },
  };
}

function candidateGetSuccess(candidate) {
  return {
    type: CANDIDATE_GET_SUCCESS,
    payload: {
      data: candidate,
    },
  };
}

function candidateGetFailure(error) {
  return {
    type: CANDIDATE_GET_FAILURE,
    error,
  };
}

// Saga
function* fetchSaga(action) {
  const { payload: { electionId } } = action;
  try {
    const response = yield call(apiRequest, `${routes.candidates}/?electionId=${electionId}`);
    yield put(candidateFetchSuccess(response));
  } catch (error) {
    yield put(candidateFetchFailure(error));
    yield put(addToast(error.message));
  }
}

function* getSaga(action) {
  const { payload: { candidateId } } = action;
  try {
    const candidate = yield call(apiRequest, `${routes.candidates}/${candidateId}`);
    yield put(candidateGetSuccess(candidate));
  } catch (error) {
    yield put(candidateGetFailure(error));
    yield put(addToast(error.message, { sticky: true }));
  }
}

function* createSaga(action) {
  const { payload } = action;
  try {
    const candidateData = {
      ...payload,
      status: 'Eligible',
    };
    const candidate = yield call(apiRequest, routes.candidates, 'POST', candidateData);
    yield put(candidateCreateSuccess(candidate));
    yield put(push(`${routes.elections}/${candidate.electionId}/candidate`));
    yield put(addToast(`Created candidate ${candidate.fname} ${candidate.lname} successfully.`));
  } catch (error) {
    yield put(candidateCreateFailure(error));
    yield put(addToast(error.message, { sticky: true }));
  }
}

function* updateSaga(action) {
  try {
    const { candidateId, patch } = action.payload;
    const candidate = yield call(apiRequest, `${routes.candidates}/${candidateId}`, 'PUT', patch);
    yield put(candidateUpdateSuccess(candidate));
    yield put(push(`${routes.candidates}/${candidateId}`));
    yield put(addToast(`Updated candidate ${candidate.fname} ${candidate.lname} successfully.`));
  } catch (error) {
    yield put(candidateUpdateFailure(error));
    yield put(addToast(error.message, { sticky: true }));
  }
}

export function* candidateSaga() {
  yield takeLatest(CANDIDATE_FETCH_REQUEST, fetchSaga);
  yield takeLatest(CANDIDATE_CREATE_REQUEST, createSaga);
  yield takeLatest(CANDIDATE_UPDATE_REQUEST, updateSaga);
  yield takeLatest(CANDIDATE_GET_REQUEST, getSaga);
}
