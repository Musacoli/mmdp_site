import { call, put, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import {
  ADD_PARTNERSHIP_TYPES,
  FETCH_PARTNERSHIP_TYPES,
  DELETE_PARTNERSHIP_TYPE,
} from '../../../constants';
import * as actions from '../../actions/dropdowns/partnershipType';

toastr.options = {
  preventDuplicates: true,
};

export function* addPartnershipTypesAsync({ payload }) {
  try {
    const data = payload ? payload.data : {};
    const create = payload ? payload.new : {};
    let response;
    if (create) {
      response = yield call(api.dropdowns.partnershipType.create, data);
    } else {
      response = yield call(api.dropdowns.partnershipType.update, data);
    }
    yield put(actions.addPartnershipTypeSuccess());
    yield put(actions.fetchPartnershipType());
    const message = response
      ? response.data.message
      : 'Partnership type(s) added successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.addPartnershipTypeFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error adding partnership type';
    yield call(toastr.warning, message);
  }
}

export function* fetchPartnershipTypesAsync() {
  try {
    const response = yield call(api.dropdowns.partnershipType.list);
    const data = response ? response.data.data : {};
    yield put(actions.fetchPartnershipTypeSuccess(data));
  } catch (error) {
    yield put(actions.fetchPartnershipTypeFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing states';
    yield call(toastr.warning, message);
  }
}

export function* deletePartnershipTypesAsync({ payload }) {
  try {
    const response = yield call(
      api.dropdowns.partnershipType.delete,
      payload.id,
    );
    const data = response ? response.data : {};
    yield put(actions.deletePartnershipTypeSuccess(data));
    yield put(actions.fetchPartnershipType({}));
    const message = response
      ? response.data.message
      : 'PartnershipType deleted successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.deletePartnershipTypeFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error deleting partnership type';
    yield call(toastr.warning, message);
  }
}

/** WATCHERS */
export function* watchAddPartnershipTypes() {
  yield takeEvery(ADD_PARTNERSHIP_TYPES, addPartnershipTypesAsync);
}

export function* watchFetchPartnershipTypes() {
  yield takeEvery(FETCH_PARTNERSHIP_TYPES, fetchPartnershipTypesAsync);
}

export function* watchDeletePartnershipTypes() {
  yield takeEvery(DELETE_PARTNERSHIP_TYPE, deletePartnershipTypesAsync);
}
