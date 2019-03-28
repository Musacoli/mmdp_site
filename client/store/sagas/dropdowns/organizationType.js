import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from '../../../utils/api';
import {
  ADD_ORGANIZATION_TYPE_REQUEST,
  GET_ORGANIZATION_TYPE_REQUEST,
  DELETE_ORGANIZATION_TYPE_REQUEST,
  UPDATE_ORGANIZATION_TYPE_REQUEST,
} from '../../../constants/dropdowns/organizationType';
import {
  getOrganizationTypeRequest,
  getOrganizationTypeSuccess,
  getOrganizationTypeFailure,
  updateOrganizationTypeFailure,
  updateOrganizationTypeSuccess,
  deleteOrganizationTypeFailure,
  deleteOrganizationTypeSuccess,
  addOrganizationTypeFailure,
  addOrganizationTypeSuccess,
} from '../../actions/dropdowns/organizationType';
import toastr from '../../../utils/toastr';

toastr.options = {
  preventDuplicates: true,
};

export function* addOrganizationTypes({ payload }) {
  try {
    const response = yield call(api.dropdowns.organizationType.create, payload);
    yield put(addOrganizationTypeSuccess(response.data));
    yield put(getOrganizationTypeRequest());
    toastr.success(response.data.message);
  } catch (error) {
    yield put(addOrganizationTypeFailure(error.response));
    const message = error.response
      ? error.response.data.message
      : 'An Error Occured Trying Again Later';
    toastr.error(message);
  }
}

export function* updateOrganizationTypes({ payload }) {
  try {
    const response = yield call(api.dropdowns.organizationType.update, payload);
    yield put(updateOrganizationTypeSuccess(response.data));
    yield put(getOrganizationTypeRequest());
    toastr.success(response.data.message);
  } catch (error) {
    yield put(updateOrganizationTypeFailure(error.response));
    const message = error.response
      ? error.response.data.message
      : 'An Error Occured Trying Again Later';
    toastr.error(message);
  }
}

export function* getAllOrganizationTypes() {
  try {
    const response = yield call(api.dropdowns.organizationType.list);
    yield put(getOrganizationTypeSuccess(response.data.data));
  } catch (error) {
    yield put(getOrganizationTypeFailure(error.response));
    const message = error.response
      ? error.response.data.message
      : 'An Error Occured Trying Again Later';
    toastr.error(message);
  }
}

export function* deleteOrganizationType({ payload }) {
  try {
    const response = yield call(
      api.dropdowns.organizationType.delete,
      payload.id,
    );
    yield put(deleteOrganizationTypeSuccess(response.data));
    yield put(getOrganizationTypeRequest());
    toastr.success(response.data.message);
  } catch (error) {
    yield put(deleteOrganizationTypeFailure(error.response));
    const message = error.response
      ? error.response.data.message
      : 'An Error Occured Trying Again Later';
    toastr.error(message);
  }
}

/** WATCHERS */
export function* deleteOrganizationTypewatcher() {
  yield takeEvery(DELETE_ORGANIZATION_TYPE_REQUEST, deleteOrganizationType);
}

export function* addOrganizationTypeWatcher() {
  yield takeEvery(ADD_ORGANIZATION_TYPE_REQUEST, addOrganizationTypes);
}

export function* updateOrganizationTypeWatcher() {
  yield takeEvery(UPDATE_ORGANIZATION_TYPE_REQUEST, updateOrganizationTypes);
}
export function* getOrganizationTypewatcher() {
  yield takeEvery(GET_ORGANIZATION_TYPE_REQUEST, getAllOrganizationTypes);
}
