import objectivesReducer from '../../../store/reducers/about/objectives';
import * as types from '../../../constants/about';

describe('Objetcives reducer test', () => {
  const initialState = {
    error: [{ theEdoStateApproach: '"The Objetcives" is required' }],
    loading: true,
  };

  it('should update store', () => {
    expect(
      objectivesReducer(initialState, {
        type: types.OBJECTIVES_SUCCESS,
      }).loading,
    ).toEqual(false);
  });

  it('should update store', () => {
    expect(
      objectivesReducer(initialState, {
        type: types.OBJECTIVES_LOADING,
      }).loading,
    ).toEqual(true);
  });

  it('should update store', () => {
    expect(
      objectivesReducer(initialState, {
        type: types.OBJECTIVES_FAILURE,
      }).loading,
    ).toEqual(false);
  });
});
