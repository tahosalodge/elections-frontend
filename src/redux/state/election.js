import { call, put, takeLatest, select } from 'redux-saga/effects';
import { schema, normalize } from 'normalizr';
import { push } from 'react-router-redux';
import { apiRequest } from 'redux/helpers/api';
import { season } from 'constants/values';

export const ELECTION_FETCH_REQUEST = 'ELECTION_FETCH_REQUEST';
export const ELECTION_FETCH_SUCCESS = 'ELECTION_FETCH_SUCCESS';
export const ELECTION_FETCH_FAILURE = 'ELECTION_FETCH_FAILURE';

export const ELECTION_CREATE_REQUEST = 'ELECTION_CREATE_REQUEST';
export const ELECTION_CREATE_SUCCESS = 'ELECTION_CREATE_SUCCESS';
export const ELECTION_CREATE_FAILURE = 'ELECTION_CREATE_FAILURE';

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
    case ELECTION_CREATE_SUCCESS:
      return {
        ...state,
        items: payload.data.elections,
      };

    case ELECTION_FETCH_FAILURE:
    case ELECTION_CREATE_FAILURE:
      return {
        ...state,
        errors: state.errors.concat([
          {
            body: action.error.toString(),
            time: new Date(),
          },
        ]),
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

export function createElection(data) {
  return {
    type: ELECTION_CREATE_REQUEST,
    payload: data,
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

function electionCreateFailure(error) {
  return {
    type: ELECTION_FETCH_FAILURE,
    error,
  };
}

// Saga
function* fetchSaga() {
  try {
    const response = yield call(apiRequest, '/elections');
    yield put(electionFetchSuccess(response));
  } catch (error) {
    yield put(electionFetchFailure(error));
  }
}

function* createSaga(action) {
  try {
    const unit = yield select(state => state.user.unit);
    const electionData = {
      ...action.payload,
      status: 'requested',
      season,
      unit,
    };
    const election = yield call(apiRequest, '/elections', 'POST', electionData);
    yield put(electionCreateSuccess(election));
    yield put(push(`/elections/${election._id}`));
  } catch (error) {
    yield put(electionCreateFailure(error));
  }
}

export function* electionSaga() {
  yield takeLatest(ELECTION_FETCH_REQUEST, fetchSaga);
  yield takeLatest(ELECTION_CREATE_REQUEST, createSaga);
}
