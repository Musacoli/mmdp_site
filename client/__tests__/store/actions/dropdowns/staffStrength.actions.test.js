import {
  FETCH_STAFF_STRENGTHS,
  UPDATE_STAFF_STRENGTHS,
  DELETE_STAFF_STRENGTH,
  CREATE_STAFF_STRENGTHS,
  STAFF_STRENGTHS_CREATED_SUCCESS,
  FETCHING_STAFF_STRENGTHS,
} from '../../../../constants/dropdowns/staffStrength';
import {
  fetchStaffStrengths,
  deleteStaffStrength,
  staffStrengthsCreatedSuccessfully,
  createStaffStrengths,
  updateStaffStrengths,
  fetchingStaffStrengths,
} from '../../../../store/actions';

describe('StaffStrength Actions Creators', () => {
  it('should dispatch TOGGLE_DELETE_STAFF_STRENGTH', () => {
    expect(deleteStaffStrength({}).type).toEqual(DELETE_STAFF_STRENGTH);
  });
  it('should dispatch UPDATE_STAFF_STRENGTH', () => {
    expect(updateStaffStrengths({}).type).toEqual(UPDATE_STAFF_STRENGTHS);
  });
  it('should dispatch FETCH_STAFF_STRENGTH', () => {
    expect(fetchStaffStrengths({}).type).toEqual(FETCH_STAFF_STRENGTHS);
  });
  it('should dispatch STAFF_STRENGTH_CREATED_SUCCESS', () => {
    expect(staffStrengthsCreatedSuccessfully({}).type).toEqual(
      STAFF_STRENGTHS_CREATED_SUCCESS,
    );
  });
  it('should dispatch FETCH_STAFF_STRENGTHS', () => {
    expect(fetchStaffStrengths({}).type).toEqual(FETCH_STAFF_STRENGTHS);
  });

  it('should dispatch fetchingStaffStrengths', () => {
    expect(fetchingStaffStrengths({}).type).toEqual(FETCHING_STAFF_STRENGTHS);
  });

  it('should dispatch CREATE_STAFF_STRENGTH', () => {
    expect(createStaffStrengths({}).type).toEqual(CREATE_STAFF_STRENGTHS);
  });
});
