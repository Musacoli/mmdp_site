import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import { GET_USER_RESEARCH } from '../../../constants/resources/research';
import {
  getResearchSuccess,
  getResearchFailure,
} from '../../actions/resources/getResearch';
import { createResearch } from '../../../utils/resources/research';

toastr.options = {
  positionClass: 'toast-top-center',
  preventDuplicates: true,
};
export function* getUserResearch(action) {
  try {
    const response = yield call(createResearch.getall, action.payload);
    yield put(getResearchSuccess(response.data));
  } catch (error) {
    toastr.warning(error.response.data.message);
    yield put(getResearchFailure(error.response.data));
  }
}

export function* getUserResearchWatcher() {
  yield takeLatest(GET_USER_RESEARCH, getUserResearch);
}
