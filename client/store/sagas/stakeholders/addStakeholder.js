import { put, call, takeLatest } from 'redux-saga/effects';
import toastr from '../../../utils/toastr';
import { ADD_STAKEHOLDER_REQUEST } from '../../../constants/stakeholderDirectory';
import {
  addStakeholderSuccess,
  addStakeholderFailure,
} from '../../actions/stakeholders/stakeholders';
import { apiRequest } from '../../../utils/stakeholders';

export function* addStakeholder(inputData) {
  try {
    const stakeholder = yield call(apiRequest.create, inputData.payload);
    const { data } = stakeholder;
    yield put(addStakeholderSuccess(data));
    window.location.replace('/stakeholder-directory');
    toastr.success('Stakeholder successfully added');
  } catch (error) {
    yield put(addStakeholderFailure(error.response));
    const errorMessage = error.response
      ? error.response.data.message || error.response.data[0]
      : 'Network error';
    toastr.error(errorMessage);
  }
}

export function* AddStakeholderWatcher() {
  yield takeLatest(ADD_STAKEHOLDER_REQUEST, addStakeholder);
}
