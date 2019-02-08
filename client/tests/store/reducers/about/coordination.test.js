import coordinationReducer from '../../../../store/reducers/about/coordination';
import * as types from '../../../../constants/about';

describe('Coordination reducer test', () => {
  const initialState = {
    error: null,
    loading: true,
  };

  it('should update store', () => {
    expect(
      coordinationReducer(initialState, {
        type: types.COORDINATION_SUCCESS,
      }).loading,
    ).toEqual(false);
  });

  it('should update store', () => {
    expect(
      coordinationReducer(initialState, {
        type: types.COORDINATION_LOADING,
      }).loading,
    ).toEqual(true);
  });

  it('should update store', () => {
    expect(
      coordinationReducer(initialState, {
        type: types.COORDINATION_FAILURE,
      }).loading,
    ).toEqual(false);
  });
});
