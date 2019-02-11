import {
  ADD_STAKEHOLDER_REQUEST,
  ADD_STAKEHOLDER_SUCCESS,
  ADD_STAKEHOLDER_FAILURE,
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
