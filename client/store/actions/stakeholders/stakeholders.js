import {
  ADD_STAKEHOLDER_FAILURE,
  ADD_STAKEHOLDER_REQUEST,
  ADD_STAKEHOLDER_SUCCESS,
  EDIT_STAKEHOLDER_FAILURE,
  EDIT_STAKEHOLDER_REQUEST,
  EDIT_STAKEHOLDER_SUCCESS,
  REMOVE_STAKEHOLDER_FAILURE,
  REMOVE_STAKEHOLDER_REQUEST,
  REMOVE_STAKEHOLDER_SUCCESS,
} from '../../../constants/stakeholderDirectory';

export const addStakeholderRequest = (payload) => ({
  type: ADD_STAKEHOLDER_REQUEST,
  payload,
});

export const addStakeholderSuccess = (payload) => ({
  type: ADD_STAKEHOLDER_SUCCESS,
  payload,
});

export const addStakeholderFailure = (payload) => ({
  type: ADD_STAKEHOLDER_FAILURE,
  payload,
});

export const removeStakeholderFailure = (payload) => ({
  type: REMOVE_STAKEHOLDER_FAILURE,
  payload,
});

export const removeStakeholderSuccess = (payload) => ({
  type: REMOVE_STAKEHOLDER_SUCCESS,
  payload,
});

export const removeStakeholderRequest = (payload) => ({
  type: REMOVE_STAKEHOLDER_REQUEST,
  payload,
});

export const editStakeholderRequest = (payload) => ({
  type: EDIT_STAKEHOLDER_REQUEST,
  payload,
});

export const editStakeholderSuccess = (payload) => ({
  type: EDIT_STAKEHOLDER_SUCCESS,
  payload,
});

export const editStakeholderFailure = (payload) => ({
  type: EDIT_STAKEHOLDER_FAILURE,
  payload,
});
