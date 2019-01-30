/* eslint-env jest */
import * as types from '../../../../constants/about';
import * as coordinaitonActions from '../../../../store/actions/about/coordination';

describe('Coordination Actions Creators', () => {
  it('should dispatch CREATE_COORDINATION_REQUEST', () => {
    expect(coordinaitonActions.createCoordination({}).type).toEqual(
      types.CREATE_COORDINATION_REQUEST,
    );
  });
  it('should dispatch GET_COORDINATION_REQUEST', () => {
    expect(coordinaitonActions.getCoordination({}).type).toEqual(
      types.GET_COORDINATION_REQUEST,
    );
  });
  it('should dispatch UPDATE_COORDINATION_REQUEST', () => {
    expect(coordinaitonActions.updateCoordination({}).type).toEqual(
      types.UPDATE_COORDINATION_REQUEST,
    );
  });
});
