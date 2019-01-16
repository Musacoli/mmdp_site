import aboutMMDPReducer from '../aboutMMDP';
import * as types from '../../../../constants/about';



describe('About MMDP reducer test', () => {

  const initialState = {
    error: [{ about: '"About" is requires' }],
    loading: true,
  };

  it('should update store', () => {
    expect(
      aboutMMDPReducer(
        initialState, 
        {
          type: types.ABOUT_MMDP_SUCCESS
        }).loading
    ).toEqual(false);
  });

  it('should update store', () => {
    expect(
      aboutMMDPReducer(
        initialState, 
        {
          type: types.ABOUT_MMDP_LOADING
        }).loading
    ).toEqual(true);
  });

  it('should update store', () => {
    expect(
      aboutMMDPReducer(
        initialState, 
        {
          type: types.ABOUT_MMDP_FAILURE
        }).loading
    ).toEqual(false);
  });

});


