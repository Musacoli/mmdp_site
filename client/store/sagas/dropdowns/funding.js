import { call, takeEvery, put } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import {
  ADD_FUNDING,
  FETCH_FUNDING,
  DELETE_FUNDING,
} from '../../../constants/dropdowns/funding';

import * as actions from '../../actions/dropdowns/funding';

toastr.options = {
  preventDuplicates: true,
};

export function* addFundingAsync({ payload }) {
  try {
    const data = payload ? payload.data : {};
    const create = payload ? payload.new : {};
    let response;
    if (create) {
      response = yield call(api.dropdowns.funding.create, data);
    } else {
      response = yield call(api.dropdowns.funding.update, data);
    }
    yield put(actions.addFundingSuccess());
    yield put(actions.fetchFunding());
    const message = response
      ? response.data.message
      : 'Source of funding added successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.addFundingFailure({}));
    const message = error.response
      ? error.response.data.error.data
      : 'Error adding source of funding';
    yield call(toastr.warning, message);
  }
}

export function* fetchFundingAsync() {
  try {
    const response = yield call(api.dropdowns.funding.list);
    const data = response ? response.data : {};
    yield put(actions.fetchFundingSuccess(data));
  } catch (error) {
    yield put(actions.fetchFundingFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing source of fundings';
    yield call(toastr.warning, message);
  }
}

export function* deleteFundingAsync({ payload }) {
  try {
    const response = yield call(api.dropdowns.funding.delete, payload.id);
    const data = response ? response.data : {};
    yield put(actions.deleteFundingSuccess(data));
    yield put(actions.fetchFunding({}));
    const message = response
      ? response.data.message
      : 'Source of funding deleted successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.deleteFundingFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error deleting source of funding';
    yield call(toastr.warning, message);
  }
}

export function* watchAddFunding() {
  yield takeEvery(ADD_FUNDING, addFundingAsync);
}

export function* watchFetchFunding() {
  yield takeEvery(FETCH_FUNDING, fetchFundingAsync);
}

export function* watchDeleteFunding() {
  yield takeEvery(DELETE_FUNDING, deleteFundingAsync);
}
