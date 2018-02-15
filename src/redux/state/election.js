import { call, put, takeLatest } from 'redux-saga/effects';
import { schema, normalize } from 'normalizr';
import { push } from 'react-router-redux';
import { apiRequest } from 'redux/helpers/api';
import { addToast } from 'redux/state/toasts';
import { season } from 'constants/values';
import { candidateFetchSuccess } from 'redux/state/candidate';

export const ELECTION_FETCH_REQUEST = 'ELECTION_FETCH_REQUEST';
export const ELECTION_FETCH_SUCCESS = 'ELECTION_FETCH_SUCCESS';
export const ELECTION_FETCH_FAILURE = 'ELECTION_FETCH_FAILURE';

export const ELECTION_CREATE_REQUEST = 'ELECTION_CREATE_REQUEST';
export const ELECTION_CREATE_SUCCESS = 'ELECTION_CREATE_SUCCESS';
export const ELECTION_CREATE_FAILURE = 'ELECTION_CREATE_FAILURE';

export const ELECTION_UPDATE_REQUEST = 'ELECTION_UPDATE_REQUEST';
export const ELECTION_UPDATE_SUCCESS = 'ELECTION_UPDATE_SUCCESS';
export const ELECTION_UPDATE_FAILURE = 'ELECTION_UPDATE_FAILURE';

export const ELECTION_REPORT_REQUEST = 'ELECTION_REPORT_REQUEST';
export const ELECTION_REPORT_FAILURE = 'ELECTION_REPORT_FAILURE';

export const ELECTION_ENTITY = new schema.Entity('elections', {}, { idAttribute: '_id' });
export const ELECTION_SCHEMA = [ELECTION_ENTITY];

const initialState = {
  messages: [],
  errors: [],
  items: {},
};

// Reducer
export default function electionReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ELECTION_FETCH_SUCCESS:
      return {
        ...state,
        items: payload.data.elections || {},
      };

    case ELECTION_CREATE_SUCCESS:
    case ELECTION_UPDATE_SUCCESS:
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

// Action
export function fetchElections() {
  return {
    type: ELECTION_FETCH_REQUEST,
  };
}

function electionFetchSuccess(elections) {
  return {
    type: ELECTION_FETCH_SUCCESS,
    payload: {
      data: normalize(elections, ELECTION_SCHEMA).entities,
    },
  };
}

function electionFetchFailure(error) {
  return {
    type: ELECTION_FETCH_FAILURE,
    error,
  };
}

export function createElection(unitId, data) {
  return {
    type: ELECTION_CREATE_REQUEST,
    payload: {
      unitId,
      ...data,
    },
  };
}

function electionCreateSuccess(elections) {
  return {
    type: ELECTION_CREATE_SUCCESS,
    payload: {
      data: normalize(elections, ELECTION_SCHEMA).entities,
    },
  };
}

function electionCreateFailure(error) {
  return {
    type: ELECTION_FETCH_FAILURE,
    error,
  };
}

export function updateElection(electionId, patch) {
  return {
    type: ELECTION_UPDATE_REQUEST,
    payload: {
      electionId,
      patch,
    },
  };
}

function electionUpdateSuccess(elections) {
  return {
    type: ELECTION_UPDATE_SUCCESS,
    payload: {
      data: normalize(elections, ELECTION_SCHEMA).entities,
    },
  };
}

function electionUpdateFailure(error) {
  return {
    type: ELECTION_UPDATE_FAILURE,
    error,
  };
}

export function reportElection(electionId, patch) {
  return {
    type: ELECTION_REPORT_REQUEST,
    payload: {
      electionId,
      patch,
    },
  };
}

// Saga
function* fetchSaga() {
  try {
    const response = yield call(apiRequest, '/elections');
    yield put(electionFetchSuccess(response));
  } catch (error) {
    yield put(electionFetchFailure(error));
    yield put(addToast(error.message, { sticky: true }));
  }
}

function* createSaga(action) {
  try {
    const electionData = {
      ...action.payload,
      status: 'Requested',
      season,
    };
    const election = yield call(apiRequest, '/elections', 'POST', electionData);
    yield put(electionCreateSuccess(election));
    yield put(push(`/elections/${election._id}`));
  } catch (error) {
    yield put(electionCreateFailure(error));
    yield put(addToast(error.message, { sticky: true }));
  }
}

function* updateSaga(action) {
  try {
    const { electionId, patch } = action.payload;
    const election = yield call(apiRequest, `/elections/${electionId}`, 'PUT', patch);
    yield put(electionUpdateSuccess(election));
    yield put(push(`/elections/${electionId}`));
  } catch (error) {
    yield put(electionUpdateFailure(error));
    yield put(addToast(error.message, { sticky: true }));
  }
}

function* reportSaga(action) {
  try {
    const { electionId, patch } = action.payload;
    const { election, candidates } = yield call(
      apiRequest,
      `/elections/${electionId}/report`,
      'PUT',
      patch,
    );
    yield put(electionUpdateSuccess(election));
    yield put(candidateFetchSuccess(candidates));
    yield put(push(`/elections/${electionId}`));
  } catch (error) {
    yield put(electionUpdateFailure(error));
    yield put(addToast(error.message, { sticky: true }));
  }
}

export function* electionSaga() {
  yield takeLatest(ELECTION_FETCH_REQUEST, fetchSaga);
  yield takeLatest(ELECTION_CREATE_REQUEST, createSaga);
  yield takeLatest(ELECTION_UPDATE_REQUEST, updateSaga);
  yield takeLatest(ELECTION_REPORT_REQUEST, reportSaga);
}
