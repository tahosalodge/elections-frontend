import { all } from 'redux-saga/effects';
import { registerSaga } from 'redux/state/register';
import { userSaga } from 'redux/state/user';
import { unitSaga } from 'redux/state/unit';
import { electionSaga } from 'redux/state/election';
import { toastsSaga } from 'redux/state/toasts';
import { nominationSaga } from 'redux/state/nomination';
import { candidateSaga } from 'redux/state/candidate';
import { healthCheck } from 'redux/state/loading';

export default function* RootSaga() {
  yield all([
    healthCheck(),
    registerSaga(),
    userSaga(),
    unitSaga(),
    electionSaga(),
    toastsSaga(),
    nominationSaga(),
    candidateSaga(),
  ]);
}
