import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import _ from 'lodash';

import { api } from '../../../utils/api';
import * as actions from '../../actions/resources/Stakeholders';
import * as types from '../../../constants/resources/Stakeholders';

import { searchStakeHoldersDirectory } from '../../../utils/resources/stakeholderDirectory/Stakeholders';
import { deriveError } from '../../../utils/helper';
import {
  addStakeholderFailure,
  addStakeholderSuccess,
  editStakeholderFailure,
  editStakeholderSuccess,
  removeStakeholderFailure,
  removeStakeholderSuccess,
} from '../../actions/stakeholders/stakeholders';
import {
  ADD_STAKEHOLDER_REQUEST,
  EDIT_STAKEHOLDER_REQUEST,
  REMOVE_STAKEHOLDER_REQUEST,
} from '../../../constants/stakeholderDirectory';

export function* fetchStates() {
  try {
    const res = yield call(api.dropdowns.state.list);
    const states = res.data.data.data;
    const stateOptions = states.map((item) => ({
      key: item._id,
      text: item.stateName,
      value: item._id,
    }));

    const response = {
      status: 200,
      states: stateOptions,
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
    let res2;
    let options = [];
    if (states.payload) {
      res2 = yield call(
        api.manageDropdowns.localGovernmentArea.get,
        states.payload.stateId,
      );
    } else {
      res2 = yield call(api.manageDropdowns.localGovernmentArea.list);
    }

    if (res2.data) {
      options = res2.data.data.map((lga) => ({
        key: lga._id,
        text: lga.lgaName,
        value: lga._id,
      }));
    }

    const response = {
      status: 200,
      LGAs: options,
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
    const response = {
      stakeholders: res.data,
    };
    yield put(actions.searchStakeHoldersSucess(response));
  } catch (e) {
    const error = deriveError(e);
    toastr.warning(error);
    yield put(actions.searchStakeHoldersFailure(error));
  }
}

export function* updateFilteringStatus(payload) {
  yield put(actions.filterSearchResultsUpdate(payload.state));
}

const getError = (error) => {
  const res = error.response.data;
  return Array.isArray(res) ? res[0] : res.error || res.message;
};

export function* addStakeholder(inputData) {
  try {
    const stakeholder = yield call(
      api.stakeholdersDirectory.create,
      inputData.payload,
    );
    const { data } = stakeholder;
    yield put(addStakeholderSuccess(data));
    window.location.replace('/stakeholder-directory');
    toastr.success('Stakeholder successfully added');
  } catch (error) {
    yield put(addStakeholderFailure(error.response));
    toastr.error(getError(error));
  }
}

export function* editStakeholder(inputData) {
  try {
    const payload = _.cloneDeep(inputData);
    const id = payload.payload._id;
    delete payload.payload._id;
    const stakeholder = yield call(
      api.stakeholdersDirectory.edit,
      id,
      payload.payload,
    );
    const { data } = stakeholder;
    yield put(editStakeholderSuccess(data));
    window.location.replace('/stakeholder-directory');
    toastr.success('Stakeholder successfully edited');
  } catch (error) {
    yield put(editStakeholderFailure(error.response));
    toastr.error(getError(error));
  }
}

export function* removeStakeholder(payload) {
  try {
    const response = yield call(
      api.stakeholdersDirectory.delete,
      payload.payload,
    );
    yield put(removeStakeholderSuccess(response));
    yield put(
      actions.searchStakeHolders({ page: 1, searchQuery: '', perPage: 9 }),
    );
    toastr.success('Stakeholder successfully removed');
  } catch (error) {
    yield put(removeStakeholderFailure(error.response));
    toastr.error(getError(error));
  }
}

export function* watchStakeholdersDirectory() {
  yield takeLatest(types.GET_ALL_NIGERIAN_STATES, fetchStates);
  yield takeLatest(types.GET_ALL_NIGERIAN_LGAS, fetchStatesLGAs);
  yield takeLatest(types.FETCH_STAKEHOLDERS, searchStakeholders);
  yield takeLatest(types.FILTER_SEARCH_RESULTS, updateFilteringStatus);
  yield takeLatest(REMOVE_STAKEHOLDER_REQUEST, removeStakeholder);
  yield takeLatest(ADD_STAKEHOLDER_REQUEST, addStakeholder);
  yield takeLatest(EDIT_STAKEHOLDER_REQUEST, editStakeholder);
}
