import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import {
  GET_COUNTRY_DROPDOWN_REQUEST,
  UPDATE_COUNTRY_DROPDOWN_REQUEST,
  DELETE_USER_COUNTRY_DROPDOWN,
} from '../../../../constants/dropdowns/country';
import {
  getCountryDropDownSuccess,
  getCountryDropDownFailure,
  updateCountryDropDownSuccess,
  updateCountryDropDownFailure,
  deleteCountryDropDownSuccess,
  deleteCountryDropDownFailure,
} from '../../../actions/dropdowns/country';
import { country } from '../../../../utils/dropdowns/country';

toastr.options = {
  positionClass: 'toast-top-center',
  preventDuplicates: true,
};
export function* getCountryDropDownSaga(action) {
  try {
    const response = yield call(country.getAll, action.payload);
    yield put(getCountryDropDownSuccess(response.data));
  } catch (error) {
    toastr.warning(error.response.data.message);
    yield put(getCountryDropDownFailure(error.response.data));
  }
}

export function* getCountryDropDownSagaWatcher() {
  yield takeLatest(GET_COUNTRY_DROPDOWN_REQUEST, getCountryDropDownSaga);
}

export function* updateCountryDropDownSaga(action) {
  try {
    console.log(action.payload);
    const data = { data: action.payload };
    const response = yield call(country.update, data);
    toastr.success(response.data);
    yield put(updateCountryDropDownSuccess(data));
  } catch (error) {
    toastr.warning(error.response.data.message);
    yield put(updateCountryDropDownFailure(error.response.data));
  }
}

export function* updateCountryDropDownSagaWatcher() {
  yield takeLatest(UPDATE_COUNTRY_DROPDOWN_REQUEST, updateCountryDropDownSaga);
}
export function* deleteCountryDropDownSaga(action) {
  try {
    const _id = action.payload;

    yield call(country.delete, _id);
    toastr.success('Country dropdown deleted successfully');
    yield put(deleteCountryDropDownSuccess(action.payload));
  } catch (error) {
    toastr.warning(error.response.data.message);
    yield put(deleteCountryDropDownFailure(error.response.data));
  }
}

export function* deleteCountryDropDownSagaWatcher() {
  yield takeLatest(DELETE_USER_COUNTRY_DROPDOWN, deleteCountryDropDownSaga);
}
