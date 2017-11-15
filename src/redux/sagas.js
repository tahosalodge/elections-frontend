import { all } from 'redux-saga/effects';
import { registerSaga } from './modules/register';
import { loginSaga } from './modules/login';
import { unitSaga } from './modules/unit';
import { electionSaga } from './modules/election';

export default function* RootSaga() {
  yield all([registerSaga(), loginSaga(), unitSaga(), electionSaga()]);
}
