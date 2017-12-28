import { all } from 'redux-saga/effects';
import { registerSaga } from 'redux/state/register';
import { userSaga } from 'redux/state/user';
import { unitSaga } from 'redux/state/unit';
import { electionSaga } from 'redux/state/election';

export default function* RootSaga() {
  yield all([registerSaga(), userSaga(), unitSaga(), electionSaga()]);
}
