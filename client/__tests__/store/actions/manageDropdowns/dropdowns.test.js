/* eslint-disable no-undef */
import * as types from '../../../../constants/manageDropdowns/dropdowns';
import * as actions from '../../../../store/actions/manageDropdowns/dropdowns';

describe('List dropdowns action tests', () => {
  it('should dispatch FETCH_DROPDOWNS', () => {
    expect(actions.fetchDropdowns({}).type).toEqual(types.FETCH_DROPDOWNS);
  });
  it('should dispatch FETCH_DROPDOWNS_SUCCESS', () => {
    expect(actions.fetchDropdownsSuccess({}).type).toEqual(
      types.FETCH_DROPDOWNS_SUCCESS,
    );
  });
  it('should dispatch FETCH_DROPDOWNS_FAILURE', () => {
    expect(actions.fetchDropdownsFailure({}).type).toEqual(
      types.FETCH_DROPDOWNS_FAILURE,
    );
  });
});

describe('Delete ward action tests', () => {
  it('should dispatch DELETE_DROPDOWNS', () => {
    expect(actions.deleteDropdowns({}).type).toEqual(types.DELETE_DROPDOWNS);
  });
  it('should dispatch DELETE_DROPDOWNS_SUCCESS', () => {
    expect(actions.deleteDropdownsSuccess({}).type).toEqual(
      types.DELETE_DROPDOWNS_SUCCESS,
    );
  });
  it('should dispatch DELETE_DROPDOWNS_FAILURE', () => {
    expect(actions.deleteDropdownsFailure({}).type).toEqual(
      types.DELETE_DROPDOWNS_FAILURE,
    );
  });
});
