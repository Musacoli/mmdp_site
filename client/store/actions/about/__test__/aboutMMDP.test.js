/* eslint-env jest */
import * as types from '../../../../constants/about';
import * as aboutMMDPActions from '../aboutMMDP';

describe('About MMDP Actions Creators', () => {
  it('should dispatch CREATE_ABOUT_MMDP_REQUEST', () => {
    expect(aboutMMDPActions.createAboutMMDP({}).type).toEqual(
      types.CREATE_ABOUT_MMDP_REQUEST,
    );
  });
  it('should dispatch GET_ABOUT_MMDP_REQUEST', () => {
    expect(aboutMMDPActions.getAboutMMDP({}).type).toEqual(
      types.GET_ABOUT_MMDP_REQUEST,
    );
  });
  it('should dispatch UPDATE_ABOUT_MMDP_REQUEST', () => {
    expect(aboutMMDPActions.updateAboutMMDP({}).type).toEqual(
      types.UPDATE_ABOUT_MMDP_REQUEST,
    );
  });
});
