import { call, put, takeEvery } from 'redux-saga/effects';
import toastr from 'toastr';
import { api } from '../../../utils/api';
import {
  ADD_IMPACT_TYPES,
  FETCH_IMPACT_TYPES,
  DELETE_IMPACT_TYPE,
} from '../../../constants';
import * as actions from '../../actions/dropdowns/impactTypes';

toastr.options = {
  preventDuplicates: true,
};

export function* addImpactTypeAsync({ payload }) {
  try {
    const data = payload ? payload.data : {};
    const create = payload ? payload.new : {};
    let response;
    if (create) {
      response = yield call(api.dropdowns.impactType.create, data);
    } else {
      response = yield call(api.dropdowns.impactType.update, data);
    }
    yield put(actions.addImpactTypesSuccess());
    yield put(actions.fetchImpactTypes());
    const message = response
      ? response.data.message
      : 'Impact Types added successfully';
    yield call(toastr.success, message);
  } catch (error) {
    yield put(actions.addImpactTypesFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error adding Impact Types';
    toastr.warning(message);
  }
}

export function* fetchImpactTypesAsync() {
  try {
    const response = yield call(api.dropdowns.impactType.list);
    const data = response ? response.data.data : {};
    yield put(actions.fetchImpactTypesSuccess(data));
  } catch (error) {
    yield put(actions.fetchImpactTypesFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error listing impact types';
    toastr.warning(message);
  }
}

export function* deleteImpactTypeAsync({ payload }) {
  try {
    const response = yield call(api.dropdowns.impactType.delete, payload.id);
    const data = response ? response.data : {};
    yield put(actions.deleteImpactTypeSuccess(data));
    yield put(actions.fetchImpactTypes({}));
    const message = response
      ? response.data.message
      : 'Impact Types deleted successfully';
    toastr.success(message);
  } catch (error) {
    yield put(actions.deleteImpactTypeFailure({}));
    const message = error.response
      ? error.response.data.message
      : 'Error deleting impact types';
    toastr.warning(message);
  }
}

/** WATCHERS */
export function* watchAddImpactType() {
  yield takeEvery(ADD_IMPACT_TYPES, addImpactTypeAsync);
}

export function* watchFetchImpactTypes() {
  yield takeEvery(FETCH_IMPACT_TYPES, fetchImpactTypesAsync);
}

export function* watchDeleteImpactType() {
  yield takeEvery(DELETE_IMPACT_TYPE, deleteImpactTypeAsync);
}
