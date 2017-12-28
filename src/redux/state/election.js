import { call, put, takeLatest, select } from 'redux-saga/effects';
import { schema, normalize } from 'normalizr';
import { push } from 'react-router-redux';
import { apiRequest } from 'redux/helpers/api';

export const ELECTION_ENTITY = new schema.Entity('elections', {}, { idAttribute: '_id' });
export const ELECTION_SCHEMA = [ELECTION_ENTITY];

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
    case 'ELECTION_FETCH_REQUEST':
      return {
        ...state,
        requesting: true,
        successful: false,
      };

    case 'ELECTION_SUCCESS':
      return {
        ...state,
        requesting: false,
        successful: true,
        items: action.payload.data.elections,
      };

    case 'ELECTION_CREATE_SUCCESS':
      return {
        ...state,
        requesting: false,
        successful: true,
        items: action.payload.data.elections,
      };

    case 'ELECTION_ERROR':
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
export function fetchElections() {
  return {
    type: 'ELECTION_FETCH_REQUEST',
  };
}

export function createElection(data) {
  return {
    type: 'ELECTION_CREATE_REQUEST',
    payload: data,
  };
}

function electionSuccess(elections) {
  return {
    type: 'ELECTION_SUCCESS',
    payload: {
      data: normalize(elections, ELECTION_SCHEMA).entities,
    },
  };
}

function electionError(error) {
  return {
    type: 'ELECTION_ERROR',
    error,
  };
}

// Saga
function* fetchSaga() {
  try {
    const response = yield call(apiRequest, '/elections');
    yield put(electionSuccess(response));
  } catch (error) {
    yield put(electionError(error));
  }
}

function* createSaga(action) {
  try {
    const unit = yield select(state => state.user.unit);
    const electionData = {
      ...action.payload,
      status: 'requested',
      unit,
    };
    const election = yield call(apiRequest, '/elections', 'POST', electionData);
    yield put(electionSuccess(election));
    yield put(push(`/elections/${election._id}`));
  } catch (error) {
    yield put(electionError(error));
  }
}

export function* electionSaga() {
  yield takeLatest('ELECTION_FETCH_REQUEST', fetchSaga);
  yield takeLatest('ELECTION_CREATE_REQUEST', createSaga);
}
