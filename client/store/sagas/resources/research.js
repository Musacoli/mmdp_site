import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import {
  ADD_USER_RESEARCH,
  GET_SINGLE_RESEARCH_REQUEST,
  UPDATE_RESEARCH_REQUEST,
} from '../../../constants/resources/research';
import {
  addResearchSuccessfull,
  addResearchFailure,
  getResearchFailure,
  getResearchSuccess,
  updateInputData,
  updateResearchFailure,
  updateResearchSUccess,
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

export function* getSingleResearch(action) {
  try {
    const res = yield call(createResearch.get, action.payload);
    const { data } = res;
    yield put(getResearchSuccess(data));
    yield put(
      updateInputData({
        ...data.data,
        Filename: data.data.researchFile.filename,
      }),
    );
  } catch (error) {
    yield put(getResearchFailure(error.response));
    const errorMessage = error.response
      ? error.response.data.message
      : 'Network error';
    toastr.warning(errorMessage);
  }
}

export function* updateResearch(action) {
  try {
    const { formData, id } = action.payload;
    const res = yield call(createResearch.update, formData, id);
    yield put(updateResearchSUccess(res.data));
    toastr.success(res.data.message);
  } catch (error) {
    yield put(updateResearchFailure(error.response));
    const errorMessage = error.response
      ? error.response.data.message
      : 'Network error';
    toastr.warning(errorMessage);
  }
}

export function* addUserResearchWatcher() {
  yield takeLatest(ADD_USER_RESEARCH, addUserResearch);
  yield takeLatest(GET_SINGLE_RESEARCH_REQUEST, getSingleResearch);
  yield takeLatest(UPDATE_RESEARCH_REQUEST, updateResearch);
}
