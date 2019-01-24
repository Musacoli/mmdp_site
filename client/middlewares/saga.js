import { all } from 'redux-saga/effects';
import loginSagaWatcher from './login/loginsaga';

export default function* root() {
  yield all([loginSagaWatcher()]);
}
