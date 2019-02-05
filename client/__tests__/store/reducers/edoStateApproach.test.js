import edoStateApproachReducer from '../../../store/reducers/about/edoStateApproach';
import * as types from '../../../constants/about';

describe('Edo State Approach reducer test', () => {
  const initialState = {
    error: [{ theEdoStateApproach: '"The Edo State Approach" is required' }],
    loading: true,
  };

  it('should update store', () => {
    expect(
      edoStateApproachReducer(
        initialState,
        {
          type: types.EDO_STATE_APPROACH_SUCCESS,
        },
      ).loading,
    ).toEqual(false);
  });

  it('should update store', () => {
    expect(
      edoStateApproachReducer(
        initialState,
        {
          type: types.EDO_STATE_APPROACH_LOADING,
        },
      ).loading,
    ).toEqual(true);
  });

  it('should update store', () => {
    expect(
      edoStateApproachReducer(
        initialState,
        {
          type: types.EDO_STATE_APPROACH_FAILURE,
        },
      ).loading,
    ).toEqual(false);
  });
});
