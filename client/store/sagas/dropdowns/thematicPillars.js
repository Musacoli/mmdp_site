import { takeEvery } from 'redux-saga/effects';
import { api } from '../../../utils/api';
import {
  ADD_THEMATIC_PILLAR,
  FETCH_THEMATIC_PILLARS,
  DELETE_THEMATIC_PILLAR,
} from '../../../constants/dropdowns/ThematicPillars';
import * as actions from '../../actions/dropdowns/ThematicPillars';
import {
  addAsyncCreator,
  fetchAsyncCreator,
  deleteAsyncCreator,
} from './helpers';

const addAsyncPayload = {
  createFunc: api.dropdowns.thematicPillars.create,
  updateFunc: api.dropdowns.thematicPillars.update,
  handleSuccessAction: actions.addThematicPillarSuccess,
  handleFailureAction: actions.addThematicPillarFailure,
  handleFetchAction: actions.fetchThematicPillars,
  customErrMessage: 'Error adding thematic pillar',
  customSuccessMessage: 'Thematic pillar added successfully',
};

export const addThematicPillarsAsync = addAsyncCreator(addAsyncPayload);

const fetchAsyncPayload = {
  fetchFunc: api.dropdowns.thematicPillars.list,
  handleSuccessAction: actions.fetchThematicPillarsSuccess,
  handleFailureAction: actions.fetchThematicPillarsFailure,
  customErrMessage: 'Error fetching thematic pillars',
};

export const fetchThematicPillarsAsync = fetchAsyncCreator(fetchAsyncPayload);

const deletePayload = {
  deleteFunc: api.dropdowns.thematicPillars.delete,
  handleSuccessAction: actions.deleteThematicPillarSuccess,
  handleFailureAction: actions.deleteThematicPillarFailure,
  handleFetchAction: actions.fetchThematicPillars,
  customErrMessage: 'Error deleting thematic pillars',
  customSuccessMessage: 'Thematic pillar has been successfully deleted!',
};

export const deleteThematicPillarsAsync = deleteAsyncCreator(deletePayload);

/** WATCHERS */
export function* watchAddThematicPillars() {
  yield takeEvery(ADD_THEMATIC_PILLAR, addThematicPillarsAsync);
}

export function* watchFetchThematicPillars() {
  yield takeEvery(FETCH_THEMATIC_PILLARS, fetchThematicPillarsAsync);
}

export function* watchDeleteThematicPillars() {
  yield takeEvery(DELETE_THEMATIC_PILLAR, deleteThematicPillarsAsync);
}
