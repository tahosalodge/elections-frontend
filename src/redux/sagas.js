import { all } from 'redux-saga/effects';
import { registerSaga } from 'redux/state/register';
import { userSaga } from 'redux/state/user';
import { unitSaga } from 'redux/state/unit';
import { electionSaga } from 'redux/state/election';
import { toastsSaga } from 'redux/state/toasts';

export default function* RootSaga() {
  yield all([registerSaga(), userSaga(), unitSaga(), electionSaga(), toastsSaga()]);
}
