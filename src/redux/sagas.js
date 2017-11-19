import { all } from 'redux-saga/effects';
import { registerSaga } from './modules/register';
import { userSaga } from './modules/user';
import { unitSaga } from './modules/unit';
import { electionSaga } from './modules/election';

export default function* RootSaga() {
  yield all([registerSaga(), userSaga(), unitSaga(), electionSaga()]);
}
