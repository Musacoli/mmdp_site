import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import axios from 'axios';
import { ADD_USER_RESEARCH } from '../../constants/resources/research';
import { addResearchSuccessfull } from '../../store/actions/resources/research';

toastr.options = {
  positionClass: 'toast-top-center',
  preventDuplicates: true,
};
const apiRequest = (url, data) => axios
  .post(url, data)
  .then(response => response.data)
  .catch((error) => {
    if (error.response) {
      const response = error.response.data;
      return response;
    }
  });

export function* addUserResearch(action) {
  try {
    const RESEARCH_URL = 'http://localhost:3000/api/v1/resources/research';
    const USERDETAILS = action.payload;
    const response = yield call(apiRequest, RESEARCH_URL, USERDETAILS);
    yield put(addResearchSuccessfull(response));
    if (response.status === 'success') {
      toastr.success(response.message);
    } else {
      toastr.warning(response.message);
    }
  } catch (error) {
    throw error;
  }
}

export default function* addUserResearchWatcher() {
  yield takeLatest(ADD_USER_RESEARCH, addUserResearch);
}
