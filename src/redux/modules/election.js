import { call, put, takeLatest } from 'redux-saga/effects';
import handleApiErrors from '../helpers/handleApiErrors';

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  elections: [],
};

// Reducer
export default function electionReducer(state = initialState, action) {
  switch (action.type) {
    case 'ELECTION_REQUESTING':
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
        data: action.response[0],
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
export function electionRequest({ id }) {
  return {
    type: 'ELECTION_REQUESTING',
    id,
  };
}

// API Request
function electionApi(id) {
  return fetch(`${process.env.REACT_APP_API_URL}/elections/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {
      throw error;
    });
}

// Saga
function* electionFlow(action) {
  try {
    const { id } = action.payload;
    const response = yield call(electionApi, id);
    yield put({ type: 'ELECTION_SUCCESS', response });
  } catch (error) {
    yield put({ type: 'ELECTION_ERROR', error });
  }
}

export function* electionSaga() {
  yield takeLatest('ELECTION_REQUESTING', electionFlow);
}
