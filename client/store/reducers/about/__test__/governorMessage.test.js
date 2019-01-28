import governorMessageReducer from '../governorMessage';
import * as types from '../../../../constants/about';


describe('About MMDP reducer test', () => {
  const initialState = {
    error: [{ about: '"About" is requires' }],
    loading: true,
  };

  it('should update store', () => {
    expect(
      governorMessageReducer(
        initialState,
        {
          type: types.GOVERNOR_MESSAGE_SUCCESS,
        },
      ).loading,
    ).toEqual(false);
  });

  it('should update store', () => {
    expect(
      governorMessageReducer(
        initialState,
        {
          type: types.GOVERNOR_MESSAGE_LOADING,
        },
      ).loading,
    ).toEqual(true);
  });

  it('should update store', () => {
    expect(
      governorMessageReducer(
        initialState,
        {
          type: types.GOVERNOR_MESSAGE_FAILURE,
        },
      ).loading,
    ).toEqual(false);
  });
});
