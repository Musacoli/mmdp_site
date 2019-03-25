import {
  FETCH_STAFF_STRENGTHS,
  FETCHING_STAFF_STRENGTHS,
  CREATE_STAFF_STRENGTHS,
  DELETE_STAFF_STRENGTH,
  EDIT_STAFF_STRENGTH,
  STAFF_STRENGTHS_CREATED_SUCCESS,
  UPDATE_STAFF_STRENGTHS,
} from '../../../constants/dropdowns/staffStrength';

export const fetchStaffStrengths = (payload) => ({
  type: FETCH_STAFF_STRENGTHS,
  payload,
});

export const fetchingStaffStrengths = (payload) => ({
  type: FETCHING_STAFF_STRENGTHS,
  payload,
});

export const createStaffStrengths = (payload) => ({
  type: CREATE_STAFF_STRENGTHS,
  payload,
});

export const updateStaffStrengths = (payload) => ({
  type: UPDATE_STAFF_STRENGTHS,
  payload,
});

export const staffStrengthsCreatedSuccessfully = (payload) => ({
  type: STAFF_STRENGTHS_CREATED_SUCCESS,
  payload,
});

export const deleteStaffStrength = (payload) => ({
  type: DELETE_STAFF_STRENGTH,
  payload,
});

export default fetchStaffStrengths;
