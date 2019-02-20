import { put, takeLatest, call } from 'redux-saga/effects';
import toastr from 'toastr';

import * as actions from '../../actions/resources/Stakeholders';
import * as types from '../../../constants/resources/Stakeholders';

import {
  fetchNigerianStates,
  fetchNigerianStatesLGAs,
  searchStakeHoldersDirectory,
} from '../../../utils/resources/Stakeholders';
import { deriveError } from '../../../utils/helper';

export function* fetchStates() {
  try {
    const res = fetchNigerianStates();
    const response = {
      status: 200,
      states: res,
    };
    yield put(actions.getNigerianStatesSucessful(response));
  } catch (e) {
    const error = deriveError(e);
    toastr.warning(error);
    yield put(actions.getNigerianStatesFailure(error));
  }
}

export function* fetchStatesLGAs(states) {
  try {
    const res = fetchNigerianStatesLGAs(states);
    const response = {
      status: 200,
      LGAs: res,
    };
    yield put(actions.getNigerianStateLGASSucess(response));
  } catch (e) {
    const error = deriveError(e);
    toastr.warning(error);
    yield put(actions.getNigerianStateLGASFailure(error));
  }
}

export function* searchStakeholders(payload) {
  try {
    const res = yield call(searchStakeHoldersDirectory, payload);
    // debugger;
    const response = {
      status: res.status,
      stakeholders: res.data,
    };
    yield put(actions.searchStakeHoldersSucess(response));
  } catch (e) {
    const error = deriveError(e);
    toastr.warning(error);
    yield put(actions.searchStakeHoldersFailure(error));
  }
}

export function* watchStakeholdersDirectory() {
  yield takeLatest(types.GET_ALL_NIGERIAN_STATES, fetchStates);
  yield takeLatest(types.GET_ALL_NIGERIAN_LGAS, fetchStatesLGAs);
  yield takeLatest(types.FETCH_STAKEHOLDERS, searchStakeholders);
}
