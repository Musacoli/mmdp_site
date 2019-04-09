import { call, takeEvery, put } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import {
  ADD_AMOUNT,
  FETCH_AMOUNT,
  DELETE_AMOUNT,
} from '../../../constants/dropdowns/amountInvested';

import * as actions from '../../actions/dropdowns/amountInvested';

toastr.options = {
  preventDuplicates: true,
};

export function* addAmountAsync({ payload }) {
  try {
    const data = payload ? payload.data : {};
    const create = payload ? payload.new : {};
    let response;
    if (create) {
      response = yield call(api.dropdowns.amountInvested.create, data);
    } else {
      response = yield call(api.dropdowns.amountInvested.update, data);
    }
    yield put(actions.addAmountSuccess());
    yield put(actions.fetchAmount());
    const message = response
      ? response.data.message
      : 'Investment option added successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.addAmountFailure({}));
    const message = error.response
      ? error.response.data.error.data
      : 'Error adding Investment option';
    yield call(toastr.warning, message);
  }
}

export function* fetchAmountAsync() {
  try {
    const response = yield call(api.dropdowns.amountInvested.list);
    const data = response ? response.data : {};
    yield put(actions.fetchAmountSuccess(data));
  } catch (error) {
    yield put(actions.fetchAmountFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing Investment options';
    yield call(toastr.warning, message);
  }
}

export function* deleteAmountAsync({ payload }) {
  try {
    const response = yield call(
      api.dropdowns.amountInvested.delete,
      payload.id,
    );
    const data = response ? response.data : {};
    yield put(actions.deleteAmountSuccess(data));
    yield put(actions.fetchAmount({}));
    const message = response
      ? response.data.message
      : 'Investment option deleted successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.deleteAmountFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error deleting Investment option';
    yield call(toastr.warning, message);
  }
}

export function* watchAddAmount() {
  yield takeEvery(ADD_AMOUNT, addAmountAsync);
}

export function* watchFetchAmount() {
  yield takeEvery(FETCH_AMOUNT, fetchAmountAsync);
}

export function* watchDeleteAmount() {
  yield takeEvery(DELETE_AMOUNT, deleteAmountAsync);
}
