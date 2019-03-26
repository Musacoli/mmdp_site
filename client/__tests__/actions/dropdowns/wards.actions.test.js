/* eslint-disable no-undef */
import * as types from '../../../constants/dropdowns/ward';
import * as actions from '../../../store/actions/dropdowns/ward';

describe('List wards action tests', () => {
  it('should dispatch FETCH_WARDS', () => {
    expect(actions.fetchWards({}).type).toEqual(types.FETCH_WARDS);
  });
  it('should dispatch FETCH_WARDS_SUCCESS', () => {
    expect(actions.fetchWardsSuccess({}).type).toEqual(
      types.FETCH_WARDS_SUCCESS,
    );
  });
  it('should dispatch FETCH_WARDS_FAILURE', () => {
    expect(actions.fetchWardsFailure({}).type).toEqual(
      types.FETCH_WARDS_FAILURE,
    );
  });
});

describe('create wards action tests', () => {
  it('should dispatch ADD_WARDS', () => {
    expect(actions.addWards({}).type).toEqual(types.ADD_WARDS);
  });
  it('should dispatch ADD_WARDS_SUCCESS', () => {
    expect(actions.addWardsSuccess({}).type).toEqual(types.ADD_WARDS_SUCCESS);
  });
  it('should dispatch ADD_WARDS_FAILURE', () => {
    expect(actions.addWardsFailure({}).type).toEqual(types.ADD_WARDS_FAILURE);
  });
});
describe('Delete ward action tests', () => {
  it('should dispatch DELETE_WARD', () => {
    expect(actions.deleteWard({}).type).toEqual(types.DELETE_WARD);
  });
  it('should dispatch DELETE_WARD_SUCCESS', () => {
    expect(actions.deleteWardSuccess({}).type).toEqual(
      types.DELETE_WARD_SUCCESS,
    );
  });
  it('should dispatch DELETE_WARD_FAILURE', () => {
    expect(actions.deleteWardFailure({}).type).toEqual(
      types.DELETE_WARD_FAILURE,
    );
  });
});
