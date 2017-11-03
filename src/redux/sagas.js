import { all } from 'redux-saga/effects';
import { registerSaga } from './modules/register';
import { loginSaga } from './modules/login';

export default function* RootSaga() {
  yield all([registerSaga(), loginSaga()]);
}
