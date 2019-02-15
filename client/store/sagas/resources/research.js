import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import { ADD_USER_RESEARCH } from '../../../constants/resources/research';
import {
  addResearchSuccessfull,
  addResearchFailure,
} from '../../actions/resources/research';
import { createResearch } from '../../../utils/resources/research';

toastr.options = {
  positionClass: 'toast-top-center',
  preventDuplicates: true,
};
export function* addUserResearch(action) {
  try {
    const response = yield call(createResearch.create, action.payload);
    yield put(addResearchSuccessfull(response.data));
    if (response.data.status === 'success') {
      toastr.success(response.data.message);
    }
  } catch (error) {
    let newError;
    yield put(addResearchFailure(error.response.data));
    if (error.response.data.error.files) {
      newError = error.response.data.error.files;
    } else {
      newError = error.response.data.message;
    }
    toastr.warning(newError);
  }
}

export function* addUserResearchWatcher() {
  yield takeLatest(ADD_USER_RESEARCH, addUserResearch);
}
